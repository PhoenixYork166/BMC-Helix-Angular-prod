import { Component, EventEmitter, HostBinding, Input, Output, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat, EMPTY, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, finalize, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { flow, isArray, isEmpty, isNil, map, reduce, uniqueId } from 'lodash';
import { ExpressionParserToken, RxDataDictionaryUtils, RxExpressionParserService } from '@helix/platform/shared/api';
import { RxObjectUtilsService, RxTreeService } from '@helix/platform/utils';
import { RX_EXPRESSION_EDITOR } from '../../expression-editor';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
export class ExpressionFormControlComponent extends ValueAccessor {
    constructor(rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxTreeService, changeDetectorRef) {
        super();
        this.rxExpressionParserService = rxExpressionParserService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxTreeService = rxTreeService;
        this.changeDetectorRef = changeDetectorRef;
        this.events = new EventEmitter();
        this.nodes = [];
        this.valueSubject = new Subject();
        this.expressionNodeMap = new Map();
        this.destroyed$ = new ReplaySubject(1);
        this.isTouched = false;
    }
    get propertyLabel() {
        var _a, _b;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.expressionEditorPropertyName) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.label) || null;
    }
    ngOnInit() {
        this.dataDictionary$ = this.options.dataDictionary$.pipe(takeUntil(this.destroyed$));
        (isNil(this.value) ? this.valueSubject.asObservable() : concat(of(this.value), this.valueSubject.asObservable()))
            .pipe(distinctUntilChanged(), switchMap((value) => 
        // When value is not defined don't subscribe to data dictionary observable.
        value
            ? this.dataDictionary$.pipe(tap(this.onDataDictionaryChange.bind(this)), 
            // Unsubscribe from data dictionary observable when value is removed.
            takeWhile(() => Boolean(this.value)))
            : EMPTY.pipe(finalize(() => this.updateNodes()))), takeUntil(this.destroyed$))
            .subscribe();
    }
    onWriteValue(value) {
        this.valueSubject.next(value);
    }
    openEditor() {
        this.isTouched = true;
        this.events.emit({
            type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
            payload: {
                propertyPath: this.propertyPath,
                propertyLabel: this.propertyLabel,
                isReadOnly: this.isDisabled
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onDataDictionaryChange(dataDictionary) {
        this.dataDictionaryExpressionMap = flow((dictionary) => this.rxDataDictionaryUtils.addTooltips(dictionary), (dictionary) => this.rxTreeService.flatten({
            children: dictionary
        }), (dictionary) => reduce(dictionary, (dictionary, node) => {
            if (isArray(node.expression)) {
                node.expression.forEach((expressionItem) => {
                    dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                });
            }
            else {
                dictionary.push(node);
            }
            return dictionary;
        }, []), (dictionary) => this.rxObjectUtilsService.mapFromArray(dictionary, 'expression'))(dataDictionary);
        this.updateNodes();
    }
    getExpressionNode(token, expression) {
        const node = {
            id: `$$rx-${uniqueId()}-rx$$`,
            expression
        };
        const isArExpression = token === ExpressionParserToken.ArExpression;
        if (token === ExpressionParserToken.RxExpression ||
            token === ExpressionParserToken.SingleQuoteRxExpression ||
            token === ExpressionParserToken.SingleQuoteTextExpression ||
            isArExpression) {
            const dataDictionaryItem = this.dataDictionaryExpressionMap.get(expression);
            if (dataDictionaryItem) {
                node.label = dataDictionaryItem.label;
                node.tooltip = dataDictionaryItem.tooltip;
            }
            else if (isArExpression || token === ExpressionParserToken.SingleQuoteTextExpression) {
                node.label = expression;
            }
            else {
                node.isInvalid = true;
            }
        }
        return node;
    }
    updateNodes() {
        if (this.dataDictionaryExpressionMap) {
            this.expressionNodeMap.clear();
            this.nodes = this.value
                ? map(this.rxExpressionParserService
                    .parse(this.value, (token, expression) => {
                    if (token !== ExpressionParserToken.RxStringExpression) {
                        if (token === ExpressionParserToken.ArExpression) {
                            expression = expression.replace('\\', '');
                        }
                        const node = this.getExpressionNode(token, expression);
                        this.expressionNodeMap.set(node.id, node);
                        expression = node.id;
                    }
                    return expression;
                }, this.options.operators)
                    .split(/(\$\$rx-[\d]+-rx\$\$)/g)
                    .filter((element) => !isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element)), (nodeId) => this.expressionNodeMap.get(nodeId) || {
                    id: nodeId,
                    expression: nodeId
                })
                : [];
            this.changeDetectorRef.markForCheck();
        }
    }
}
ExpressionFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlComponent, deps: [{ token: i1.RxExpressionParserService }, { token: i2.RxObjectUtilsService }, { token: i1.RxDataDictionaryUtils }, { token: i2.RxTreeService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ExpressionFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: { options: "options", isDisabled: "isDisabled", propertyPath: "propertyPath" }, outputs: { events: "events" }, host: { properties: { "attr.property-path": "this.propertyPath", "attr.property-label": "this.propertyLabel" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label\n  *ngIf=\"!options.isLabelHidden\"\n  [label]=\"options.label\"\n  [showRequiredLabel]=\"options.isRequired\"\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: popoverContent,\n          popoverMode: options.tooltip.popoverMode,\n          placement: options.tooltip.placement,\n          iconName: options.tooltip.iconName\n        }\n      : null\n  \"\n></adapt-rx-control-label>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n\n<button\n  type=\"button\"\n  adapt-button\n  [btn-type]=\"'tertiary'\"\n  [ngClass]=\"{ 'bg-hover': nodes.length }\"\n  class=\"position-relative text-left overflow-hidden w-100 rounded p-0\"\n  (click)=\"openEditor()\"\n  [disabled]=\"isDisabled && !nodes.length\"\n>\n  <ng-container *ngIf=\"!nodes.length\">{{\n    options.clickToBuildExpressionLabel ||\n      'com.bmc.arsys.rx.client.expression-form-control.click-to-build-expression.label' | translate\n  }}</ng-container>\n\n  <ng-container *ngFor=\"let node of nodes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        node.isInvalid ? invalidExpression : node.label ? expression : plainText;\n        context: { $implicit: node }\n      \"\n    ></ng-container>\n  </ng-container>\n\n  <span class=\"fade-line position-absolute w-100 text-center\"><span class=\"d-icon-ellipsis_horizontal\"></span></span>\n</button>\n\n<ng-template #plainText let-node>\n  <span class=\"py-1 ml-1 rounded d-inline-block rx-ellipsis\">{{ node.expression }}</span>\n</ng-template>\n\n<ng-template #expression let-node>\n  <span\n    [adaptTooltip]=\"node.tooltip\"\n    placement=\"auto\"\n    class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-gray-300 text-default\"\n    >{{ node.label }}</span\n  >\n</ng-template>\n\n<ng-template #invalidExpression>\n  <span adaptTooltip=\"Error\" placement=\"auto\" class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-danger text-white\">\n    {{ 'com.bmc.arsys.rx.client.common.error.label' | translate }}\n  </span>\n</ng-template>\n\n<div *ngIf=\"options.isRequired && !nodes.length && isTouched\" class=\"text-danger\">\n  {{ 'com.bmc.arsys.rx.client.expression-form-control.validation.required.message' | translate }}\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}button{max-height:7rem;white-space:normal}.fade-line{top:5rem;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.fade-line:before{position:absolute;transition:opacity .25s var(--ease-transition-in-out);background-image:linear-gradient(0deg,#f0f1f1 50%,rgba(255,255,255,0));z-index:-1;top:0;left:0;right:0;bottom:0;opacity:0;content:\"\"}.d-icon-ellipsis_horizontal:before{position:absolute;bottom:.25rem}.bg-hover:hover{background-color:#f0f1f1!important}.bg-hover:hover .fade-line:before{opacity:1}\n"], components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-form-control',
                    templateUrl: 'expression-form-control.component.html',
                    styleUrls: ['./expression-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionParserService }, { type: i2.RxObjectUtilsService }, { type: i1.RxDataDictionaryUtils }, { type: i2.RxTreeService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], propertyPath: [{
                type: HostBinding,
                args: ['attr.property-path']
            }, {
                type: Input
            }], propertyLabel: [{
                type: HostBinding,
                args: ['attr.property-label']
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=expression-form-control.component.js.map