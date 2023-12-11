import { Component, HostBinding, Inject, Injector, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { endsWith, flow, includes, isArray, isEmpty, last, noop, reduce, startsWith, trim, uniqueId } from 'lodash';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { CKEditorComponent } from 'ckeditor4-angular';
import { ExpressionOperator, ExpressionParserToken, RxDataDictionaryUtils, RxExpressionParserService, RxThemingService, RX_THEMING } from '@helix/platform/shared/api';
import { DOCUMENT } from '@angular/common';
import { RxObjectUtilsService, RxTreeService } from '@helix/platform/utils';
import { RX_DATA_DICTIONARY_ITEM_PLUGIN } from '../data-dictionary-item-plugin.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "ckeditor4-angular";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
const narrowOperatorButtons = new Set([
    ExpressionOperator.LeftGrouping,
    ExpressionOperator.RightGrouping,
    ExpressionOperator.DoubleQuote,
    ExpressionOperator.Add,
    ExpressionOperator.Subtract,
    ExpressionOperator.Multiply,
    ExpressionOperator.Divide,
    ExpressionOperator.Remainder,
    ExpressionOperator.GreaterThan,
    ExpressionOperator.LessThan,
    ExpressionOperator.Equal,
    ExpressionOperator.NotEqual,
    ExpressionOperator.GreaterThanOrEqual,
    ExpressionOperator.LessThanOrEqual
]);
export class RichExpressionEditorComponent {
    constructor(injector, document, rxTreeService, rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxThemingService) {
        this.injector = injector;
        this.document = document;
        this.rxTreeService = rxTreeService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxThemingService = rxThemingService;
        this.type = "inline" /* INLINE */;
        this.ckConfig = {
            startupFocus: true,
            allowedContent: true,
            extraPlugins: RX_DATA_DICTIONARY_ITEM_PLUGIN.name,
            toolbar: [],
            skin: 'expression-editor',
            title: false,
            entities: false
        };
        this.operatorRows = [];
        this.class = 'd-flex flex-column h-100 border';
        this.operatorsByGroup = { custom: [], platform: [] };
        this.isCkEditorInstanceReady = false;
        this.menuItems = {};
        // Keep operators in descending order by length to find compound operator for autocomplete launch.
        this.autocompleteTriggers = [
            ExpressionOperator.NotEqual,
            ExpressionOperator.GreaterThanOrEqual,
            ExpressionOperator.LessThanOrEqual,
            ExpressionOperator.LessThan,
            ExpressionOperator.GreaterThan,
            ExpressionOperator.Equal
        ];
    }
    ngOnInit() {
        this.control = this.injector.get(NgControl).control;
    }
    ngOnChanges(changes) {
        if (changes.dataDictionary) {
            this.dataDictionaryExpressionsMap = flow((dataDictionary) => this.rxDataDictionaryUtils.addTooltips(dataDictionary), (dataDictionary) => this.rxTreeService.flatten({
                children: dataDictionary
            }), (dataDictionary) => reduce(dataDictionary, (dictionary, node) => {
                if (isArray(node.expression)) {
                    node.expression.forEach((expressionItem) => {
                        dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                    });
                }
                else {
                    dictionary.push(node);
                }
                return dictionary;
            }, []), (dataDictionary) => this.rxObjectUtilsService.mapFromArray(dataDictionary, 'expression'))(this.dataDictionary);
        }
    }
    writeValue(value) {
        if (value) {
            // encode all HTML tags to avoid their rendering by CKEDITOR, i.e.
            // html entered by user should be rendered as plain text
            // For example, <b>STRING</b> should be displayed in the editor exactly the same, as <b>STRING</b>
            value = CKEDITOR.tools.htmlEncode(value);
            value = this.normalizeExpression(value);
        }
        else {
            value = null;
        }
        // Ckeditor instance is not ready on first "writeValue" call.
        if (this.isCkEditorInstanceReady) {
            this.ckComponent.instance.setData(value);
        }
        else {
            this.initialValue = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onCkEditorInstanceReady(event) {
        this.isCkEditorInstanceReady = true;
        // Even if toolbar doesn't have any items, outer container is displayed and needs to be hidden.
        this.document.getElementById(`${event.editor.id}_top`).style.display = 'none';
        this.ckComponent.instance.on('change', () => {
            const value = trim(this.ckComponent.instance.getData());
            if (this.control.value !== value && !this.ckComponent.instance.gettingCursorPosition) {
                this.onChange(value);
                if (value) {
                    const { position, x, y } = this.getCursor();
                    const expressionBeforeCursor = value.substr(0, position);
                    const autocompleteTrigger = this.autocompleteTriggers.find((trigger) => endsWith(expressionBeforeCursor, trigger));
                    if (autocompleteTrigger) {
                        // Remove autocomplete trigger from expression, e.g '${foo} >=' -> '${foo} '.
                        const expressionToParse = expressionBeforeCursor.slice(0, -autocompleteTrigger.length);
                        const node = this.dataDictionaryExpressionsMap.get(this.getLastExpressionFragment(expressionToParse));
                        if (node === null || node === void 0 ? void 0 : node.autocompleteOptions) {
                            this.launchAutocomplete(node.autocompleteOptions, x, y);
                        }
                    }
                }
            }
        });
        this.ckComponent.instance.on('getData', (evt) => {
            evt.data.dataValue = evt.data.dataValue.replace(/<p>|<span>|<\/p>|<\/span>|<br \/>/g, '');
            evt.data.dataValue = CKEDITOR.tools.htmlDecode(evt.data.dataValue);
            // convert 160 and 8203 charCode space to 32 which supported by server
            evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
            evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(8203), 'g'), ' ');
        }, null, null, 15);
        this.ckComponent.instance.on('key', (evt) => {
            if (evt.data.keyCode === 13) {
                // Enter key
                evt.cancel();
            }
        });
        this.ckComponent.instance.on('paste', (evt) => {
            if (evt.data.method === 'drop') {
                const value = evt.data.dataTransfer.getData('value');
                if (value) {
                    evt.data.dataValue = value;
                }
            }
            if (evt.data.type === 'html') {
                const container = new CKEDITOR.dom.element('div');
                container.appendHtml(evt.data.dataValue);
                // When selected range with widget is copied to clipboard, start node of bookmark remains unremoved there
                let elementToRemove = container.findOne('[id*="cke_bm_"]');
                if (elementToRemove) {
                    if (CKEDITOR.env.gecko && container.getChildCount() > 1) {
                        elementToRemove = elementToRemove.getParent();
                    }
                    elementToRemove.remove();
                    evt.data.dataValue = container.getHtml();
                }
                container.remove();
            }
        });
        this.ckComponent.instance.on('toHtml', (evt) => {
            // Check if data value has already been converted to html,
            // e.g. while dragging a pill from one position to another withing the expression
            // there is no need to convert it to HTML again
            if (!includes(evt.data.dataValue, 'rx-id="rx-data-dictionary-item"')) {
                evt.data.dataValue = this.rxExpressionParserService.parse(evt.data.dataValue, this.transformToTag.bind(this));
            }
            if (endsWith(evt.data.dataValue, '</span>')) {
                evt.data.dataValue += '<span>&nbsp;</span>';
            }
        }, null, null, 4);
        // Set initial value when "toHtml" listener is already added.
        this.ckComponent.instance.setData(this.initialValue);
        this.ckComponent.instance.contextMenu.addListener(() => this.menuItems);
        this.ckComponent.instance.contextMenu.onHide = () => {
            this.iFrameContentWindow.removeEventListener('keydown', this.keydownHandler);
            this.menuItems = {};
        };
        this.control.statusChanges
            .pipe(map(() => this.control.disabled), startWith(this.control.disabled), distinctUntilChanged())
            .subscribe((disabled) => {
            this.ckComponent.instance.setReadOnly(disabled);
        });
        delete this.ckComponent.instance._.menuItems.paste;
        delete this.ckComponent.instance._.menuItems.cut;
        delete this.ckComponent.instance._.menuItems.copy;
    }
    insertHtml(html) {
        this.ckComponent.instance.insertHtml(html);
    }
    isNarrowOperator(operator) {
        return narrowOperatorButtons.has(operator);
    }
    addOperator(value) {
        if (value !== ExpressionOperator.DoubleQuote && !startsWith(value, '$')) {
            value += '&nbsp;';
        }
        this.insertHtml(value);
    }
    launchAutocomplete(options, x, y) {
        CKEDITOR.skin.loadPart('rx-suggestions', noop);
        const group = 'suggestions';
        this.ckComponent.instance.addMenuGroup(group);
        options.forEach((option, index) => {
            const suggestionBoxItem = 'suggestionBox suggestionBoxItem' + index;
            this.menuItems[suggestionBoxItem] = CKEDITOR.TRISTATE_OFF;
            this.ckComponent.instance.addMenuItem(suggestionBoxItem, {
                label: option.label,
                group,
                onClick: () => {
                    this.ckComponent.instance.focus();
                    this.ckComponent.instance.insertHtml(option.expression);
                }
            });
        });
        this.ckComponent.instance.contextMenu.show(this.ckComponent.instance.document.getBody(), null, x, y);
        const menuPanel = this.ckComponent.instance.contextMenu._.panel;
        menuPanel.element.addClass('rx-suggestions-panel');
        this.iFrameContentWindow = menuPanel._.iframe.$.contentWindow;
        this.iFrameContentWindow.document.documentElement.classList.add('rx-suggestions-panel_container');
        this.rxThemingService.copyCssVariables(RX_THEMING.cssVariablesForCkEditor, this.iFrameContentWindow.document);
        this.iFrameContentWindow.addEventListener('keydown', this.keydownHandler);
    }
    transformToTag(token, expression) {
        let tag = expression;
        if ([
            ExpressionParserToken.ArExpression,
            ExpressionParserToken.RxExpression,
            ExpressionParserToken.SingleQuoteRxExpression,
            ExpressionParserToken.SingleQuoteTextExpression
        ].includes(token)) {
            const node = this.dataDictionaryExpressionsMap.get(expression);
            if (node) {
                tag = [
                    `<span class="expression-node" rx-id="rx-data-dictionary-item" ${RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName}="${expression}" title="${node.tooltip}">`,
                    `<span class="expression-node-icon ${node.icon || 'd-icon-arrow_right_square_input'}">&nbsp;</span>`,
                    `<span class="expression-node-label">${node.label}</span>`,
                    '</span>'
                ].join('');
            }
        }
        return tag;
    }
    normalizeExpression(expression) {
        return this.rxExpressionParserService.parse(expression, (token, expressionFragment) => {
            if (token === ExpressionParserToken.RxStringExpression) {
                // since multiple \x20 spaces get collapsed to a single space in HTML. we have to convert them to
                // non-breaking spaces (&nbsp;) in order to preserve them in expression's literals
                return expressionFragment.replace(/ /g, '&nbsp;');
            }
            else if (token === ExpressionParserToken.ArExpression) {
                return expressionFragment.replace('\\', '');
            }
            else {
                return expressionFragment;
            }
        });
    }
    // parse and get last expression, e.g.
    // '${foo} + ${bar}' -> '${bar}'
    // '${foo} + ${bar}  ' -> '${bar}'
    // '${foo} + "bar"' -> undefined
    getLastExpressionFragment(expression) {
        const expressionMap = new Map();
        const lastExpressionFragment = last(this.rxExpressionParserService
            .parse(expression, (token, expressionFragment) => {
            if (token !== ExpressionParserToken.RxStringExpression) {
                const node = `$$rx-${uniqueId()}-rx$$`;
                expressionMap.set(node, expressionFragment);
                expressionFragment = node;
            }
            return expressionFragment;
        })
            .split(/(\$\$rx-[\d]+-rx\$\$)/g)
            .filter((element) => !isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element)));
        return expressionMap.get(lastExpressionFragment);
    }
    // prevent navigation to the previous page in Edge and Firefox when the user presses the Backspace key
    keydownHandler(event) {
        if (event.code === 'Backspace') {
            event.preventDefault();
        }
    }
    // Insert a dummy element into current position of caret
    // in order to get coordinates of caret and expression fragment before the caret
    // https://ckeditor.com/old/comment/65868#comment-65868
    getCursor() {
        this.ckComponent.instance.gettingCursorPosition = true;
        const dummyElement = this.ckComponent.instance.document.createElement('span');
        const range = this.ckComponent.instance.getSelection().getRanges()[0];
        range.trim(false, true);
        const startContainer = range.startContainer;
        const nextNode = startContainer.getChild(range.startOffset);
        if (nextNode) {
            dummyElement.insertBefore(nextNode);
        }
        else {
            startContainer.append(dummyElement);
        }
        let x = 0;
        let y = 0;
        let nodeElement = dummyElement.$;
        while (nodeElement.offsetParent) {
            x += nodeElement.offsetLeft;
            y += nodeElement.offsetTop;
            nodeElement = nodeElement.offsetParent;
        }
        x += nodeElement.offsetLeft;
        y += nodeElement.offsetTop;
        y += 30;
        dummyElement.setText(this.ckComponent.instance.id);
        const position = this.ckComponent.instance.getData().indexOf(this.ckComponent.instance.id);
        dummyElement.remove();
        this.ckComponent.instance.gettingCursorPosition = false;
        return {
            x,
            y,
            position
        };
    }
}
RichExpressionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichExpressionEditorComponent, deps: [{ token: i0.Injector }, { token: DOCUMENT }, { token: i1.RxTreeService }, { token: i2.RxExpressionParserService }, { token: i1.RxObjectUtilsService }, { token: i2.RxDataDictionaryUtils }, { token: i2.RxThemingService }], target: i0.ɵɵFactoryTarget.Component });
RichExpressionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: { dataDictionary: "dataDictionary", operatorRows: "operatorRows" }, host: { properties: { "class": "this.class" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RichExpressionEditorComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "ckComponent", first: true, predicate: CKEditorComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ckeditor\n  class=\"flex-grow-1 position-relative form-control border\"\n  [config]=\"ckConfig\"\n  [type]=\"type\"\n  (ready)=\"onCkEditorInstanceReady($event)\"\n  [ngClass]=\"{ 'invalid-expression-border': control.invalid }\"\n></ckeditor>\n\n<adapt-rx-feedback [errors]=\"control.errors\"></adapt-rx-feedback>\n\n<div class=\"border-top bg-gray-200 pt-3 pb-1 px-2\" *ngIf=\"control.enabled\">\n  <div class=\"d-flex flex-wrap justify-content-center\" *ngFor=\"let row of operatorRows\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      class=\"mx-1 mb-2 bg-white\"\n      [ngClass]=\"isNarrowOperator(operator.value) ? 'narrow-operator' : 'wide-operator'\"\n      (click)=\"addOperator(operator.value)\"\n      [adaptPopover]=\"operator.tooltip ? tooltipContent : null\"\n      [popoverTitle]=\"operator.tooltip?.title\"\n      triggers=\"mouseover:mouseout\"\n      placement=\"auto\"\n      *ngFor=\"let operator of row\"\n    >\n      {{ operator.displayValue }}\n\n      <ng-template #tooltipContent>\n        <span [innerHtml]=\"operator?.tooltip?.content\"></span>\n      </ng-template>\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep ckeditor{border-color:transparent!important}:host::ng-deep ckeditor>div{padding:20px;overflow-y:auto;outline:0;position:absolute;top:0;bottom:0;left:0;right:0}:host::ng-deep ckeditor>textarea{display:none}:host::ng-deep .expression-node{margin-bottom:.25rem}.wide-operator{min-width:6.5rem}.narrow-operator{width:3rem}.invalid-expression-border{border-color:#f83200!important}\n"], components: [{ type: i3.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }, { type: i4.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichExpressionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-expression-editor',
                    templateUrl: 'rich-expression-editor.component.html',
                    styleUrls: ['rich-expression-editor.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RichExpressionEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.RxTreeService }, { type: i2.RxExpressionParserService }, { type: i1.RxObjectUtilsService }, { type: i2.RxDataDictionaryUtils }, { type: i2.RxThemingService }]; }, propDecorators: { dataDictionary: [{
                type: Input
            }], operatorRows: [{
                type: Input
            }], ckComponent: [{
                type: ViewChild,
                args: [CKEditorComponent, { static: true }]
            }], class: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=rich-expression-editor.component.js.map