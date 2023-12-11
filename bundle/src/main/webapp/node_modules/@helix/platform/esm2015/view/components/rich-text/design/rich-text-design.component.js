import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, NgZone, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpressionParserToken, RxExpressionParserService } from '@helix/platform/shared/api';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxTreeService } from '@helix/platform/utils';
import { CKEditorComponent } from 'ckeditor4-angular';
import { escape } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, skip, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { RX_RICH_TEXT } from '@helix/platform/view/api';
import { RX_CKEDITOR_CONFIG } from './ckeditor-config.constant';
import { RichTextDesignModel } from './rich-text-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "ckeditor4-angular";
import * as i5 from "@angular/forms";
export class RichTextDesignComponent {
    constructor(rxExpressionEditorService, rxTreeService, rxExpressionParserService, renderer2, document, ngZone) {
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxTreeService = rxTreeService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.renderer2 = renderer2;
        this.document = document;
        this.ngZone = ngZone;
        this.type = "inline" /* INLINE */;
        this.ckConfig = RX_CKEDITOR_CONFIG;
        this.formControl = new FormControl(null);
        this.destroyed$ = new ReplaySubject(1);
        // remove inner span with expression title and content value, e.g.:
        // "<p>text<span contenteditable="false" rx-expression="${foo}"><span title="Foo">Foo</span></span></p>" ->
        // "<p>text<span contenteditable="false" rx-expression="${foo}"></span></p>"
        this.removeExpressionLabels = this.setExpressionLabelHtml.bind(this, null);
        // set inner span with expression title and content value, e.g.:
        // "<p>text<span contenteditable="false" rx-expression="${foo}"></span></p>" ->
        // "<p>text<span contenteditable="false" rx-expression="${foo}"><span title="Foo">Foo</span></span></p>"
        this.addExpressionLabels = this.setExpressionLabelHtml.bind(this, this.getExpressionWithLabels.bind(this));
    }
    ngOnInit() {
        const dataDictionary$ = this.model.expressionConfigurator.getDataDictionary();
        dataDictionary$
            .pipe(withLatestFrom(this.model.html$), takeUntil(this.destroyed$))
            .subscribe(([dataDictionary, html]) => {
            this.flatDataDictionary = this.rxTreeService.flatten({
                children: dataDictionary
            });
            this.formControl.setValue(this.addExpressionLabels(html));
        });
        this.formControl.valueChanges
            .pipe(map((value) => this.removeExpressionLabels(value)), distinctUntilChanged(), skip(1), takeUntil(this.destroyed$))
            .subscribe((html) => {
            this.model.updateComponentProperties({ html });
        });
        // set initial value
        this.model.html$.pipe(take(1), takeUntil(this.destroyed$)).subscribe((html) => {
            this.formControl.setValue(this.addExpressionLabels(html));
        });
    }
    onEditorReady(event) {
        if (this.isReadOnly) {
            this.ckConfig.toolbar = [];
            this.document.getElementById(`${event.editor.id}_top`).style.display = 'none';
        }
        this.ckEditor.instance.on('openExpressionEditor', (evt) => {
            const initialValue = evt.data && evt.data.getAttribute(RX_RICH_TEXT.expressionAttributeName);
            this.ngZone.runTask(() => this.rxExpressionEditorService
                .openEditor({
                property: {
                    path: 'html',
                    value: initialValue,
                    label: 'Rich Text'
                },
                expressionConfigurator: this.model.expressionConfigurator
            })
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                next: ({ path, value }) => {
                    if (value) {
                        const labelHtmlString = this.getExpressionWithLabels(value);
                        if (initialValue) {
                            evt.data.setAttribute(RX_RICH_TEXT.expressionAttributeName, value);
                            evt.data.setHtml(labelHtmlString);
                            // trigger change event in CKEDITOR, ref: https://stackoverflow.com/a/24599219/4449154
                            this.ckEditor.instance.fire('saveSnapshot');
                        }
                        else {
                            this.ckEditor.instance.insertHtml(`<span contenteditable="false" ${RX_RICH_TEXT.expressionAttributeName}="${escape(value)}">${labelHtmlString}</span>`);
                        }
                    }
                    else {
                        evt.data.remove();
                        // trigger change event in CKEDITOR, ref: https://stackoverflow.com/a/24599219/4449154
                        this.ckEditor.instance.fire('saveSnapshot');
                    }
                    this.moveCursorToEnd();
                },
                error: () => {
                    this.moveCursorToEnd();
                }
            }));
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    getExpressionWithLabels(expressionValue) {
        return this.rxExpressionParserService.parse(expressionValue, (token, expression) => {
            if (token !== ExpressionParserToken.RxStringExpression) {
                const node = this.flatDataDictionary.find((item) => item.expression === expression);
                const label = node && node.label ? escape(node.label) : expression;
                return `<span title="${label}">${label}</span>`;
            }
            return expression;
        });
    }
    moveCursorToEnd() {
        const range = this.ckEditor.instance.createRange();
        range.moveToElementEditEnd(range.root);
        this.ckEditor.instance.getSelection().selectRanges([range]);
    }
    setExpressionLabelHtml(predicate, htmlString) {
        const tempElement = this.renderer2.createElement('div');
        tempElement.innerHTML = htmlString;
        tempElement
            .querySelectorAll(`span[${RX_RICH_TEXT.expressionAttributeName}]`)
            .forEach((el) => (el.innerHTML = predicate ? predicate(el.getAttribute(RX_RICH_TEXT.expressionAttributeName)) : null));
        return tempElement.innerHTML.replace(/<br>/g, '<br />');
    }
}
RichTextDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignComponent, deps: [{ token: i1.RxExpressionEditorService }, { token: i2.RxTreeService }, { token: i3.RxExpressionParserService }, { token: i0.Renderer2 }, { token: DOCUMENT }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
RichTextDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichTextDesignComponent, selector: "rx-rich-text-design", inputs: { model: "model", isReadOnly: "isReadOnly" }, viewQueries: [{ propertyName: "ckEditor", first: true, predicate: CKEditorComponent, descendants: true, static: true }], ngImport: i0, template: "<ckeditor\n  class=\"border\"\n  [class.border-transparent]=\"formControl.value\"\n  [formControl]=\"formControl\"\n  [config]=\"ckConfig\"\n  [type]=\"type\"\n  (ready)=\"onEditorReady($event)\"\n  [readOnly]=\"isReadOnly\"\n></ckeditor>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}ckeditor{min-height:42px;display:block;border:1px solid #d6d7d8}ckeditor.border-transparent{border-color:transparent!important}ckeditor ::ng-deep [rx-expression]{padding:2px 5px;display:inline-block;color:#7c7f81;background-color:#f0f1f1;border-radius:2px;-webkit-user-select:all;user-select:all}ckeditor ::ng-deep [rx-expression] span{padding:2px 5px;background-color:#d6d7d8;border-radius:2px}ckeditor ::ng-deep .cke_editable{padding:5px;outline:none}\n"], components: [{ type: i4.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-text-design',
                    templateUrl: './rich-text-design.component.html',
                    styleUrls: ['./rich-text-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionEditorService }, { type: i2.RxTreeService }, { type: i3.RxExpressionParserService }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.NgZone }]; }, propDecorators: { model: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], ckEditor: [{
                type: ViewChild,
                args: [CKEditorComponent, { static: true }]
            }] } });
//# sourceMappingURL=rich-text-design.component.js.map