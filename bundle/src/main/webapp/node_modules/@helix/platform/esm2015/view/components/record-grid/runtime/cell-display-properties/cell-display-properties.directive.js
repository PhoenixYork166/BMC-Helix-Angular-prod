import { Directive, HostBinding, Input } from '@angular/core';
import { RxGridCellBgColorCssMap, RxGridCellFontColorCssMap, RxGridCellFontSize, RxGridCellIconPosition } from '../../common/types/cell-display-properties.types';
import { RxExpressionEvaluatorService } from '@helix/platform/view/api';
import { set } from 'lodash';
import { RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
export class CellDisplayPropertiesDirective {
    constructor(rxExpressionEvaluatorService, rxObjectUtilsService) {
        this.rxExpressionEvaluatorService = rxExpressionEvaluatorService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.evaluationData = {};
    }
    ngOnInit() {
        this.updateCellClasses();
    }
    ngOnChanges(changes) {
        if (!changes.rxCellDisplayPropsDataItem.firstChange &&
            changes.rxCellDisplayPropsDataItem.currentValue !== changes.rxCellDisplayPropsDataItem.previousValue) {
            this.updateCellClasses();
        }
    }
    getActiveProps(items) {
        return (items.find((props) => this.rxExpressionEvaluatorService.tryEvaluate(props.fieldValueCondition, this.evaluationData)) || null);
    }
    getCellCssClasses(props) {
        const result = [];
        if (!props.displayAsBadge) {
            if (props.bold) {
                result.push('font-weight-bold');
            }
            if (props.italic) {
                result.push('font-italic');
            }
            if (props.fontSize === RxGridCellFontSize.Small) {
                result.push('small');
            }
            else if (props.fontSize === RxGridCellFontSize.Large) {
                result.push('large');
            }
            if (props.textColor) {
                result.push(RxGridCellFontColorCssMap[props.textColor]);
            }
            if (props.backgroundColor) {
                result.push(RxGridCellBgColorCssMap[props.backgroundColor]);
            }
            if (props.icon) {
                if (props.iconPosition === RxGridCellIconPosition.ReplaceText) {
                    result.push(`d-icon-${props.icon}`);
                }
                else {
                    result.push(`d-icon-${props.iconPosition}-${props.icon}`);
                }
            }
        }
        return result;
    }
    getSpanCssClasses(props) {
        if (props.displayAsBadge) {
            return ['badge', `badge-${props.badgeColor}`];
        }
        else if (props.iconPosition === RxGridCellIconPosition.ReplaceText) {
            return ['hidden'];
        }
        else {
            return [];
        }
    }
    updateCellClasses() {
        var _a;
        if ((_a = this.rxCellDisplayProps) === null || _a === void 0 ? void 0 : _a.length) {
            let cssClasses = '';
            const expandedRxCellDisplayPropsDataItem = Object.assign(Object.assign({}, this.rxCellDisplayPropsDataItem), this.rxObjectUtilsService.expandProperties(this.rxCellDisplayPropsDataItem));
            set(this.evaluationData, `view.components.grid.clickableRow`, expandedRxCellDisplayPropsDataItem);
            const activeProps = this.getActiveProps(this.rxCellDisplayProps);
            if (activeProps) {
                const cellClasses = this.getCellCssClasses(activeProps);
                cssClasses = cellClasses.join(' ');
            }
            if (this.rxCellDisplayPropsBadgeElem) {
                const spanClasses = activeProps ? this.getSpanCssClasses(activeProps) : [];
                this.rxCellDisplayPropsBadgeElem.classList.value = '';
                this.rxCellDisplayPropsBadgeElem.classList.add(...spanClasses);
            }
            this.cssClasses = cssClasses;
        }
    }
}
CellDisplayPropertiesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CellDisplayPropertiesDirective, deps: [{ token: i1.RxExpressionEvaluatorService }, { token: i2.RxObjectUtilsService }], target: i0.ɵɵFactoryTarget.Directive });
CellDisplayPropertiesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: CellDisplayPropertiesDirective, selector: "[rxCellDisplayProps]", inputs: { rxCellDisplayProps: "rxCellDisplayProps", rxCellDisplayPropsBadgeElem: "rxCellDisplayPropsBadgeElem", rxCellDisplayPropsDataItem: "rxCellDisplayPropsDataItem" }, host: { properties: { "class": "this.cssClasses" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CellDisplayPropertiesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxCellDisplayProps]'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionEvaluatorService }, { type: i2.RxObjectUtilsService }]; }, propDecorators: { rxCellDisplayProps: [{
                type: Input
            }], rxCellDisplayPropsBadgeElem: [{
                type: Input
            }], rxCellDisplayPropsDataItem: [{
                type: Input
            }], cssClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=cell-display-properties.directive.js.map