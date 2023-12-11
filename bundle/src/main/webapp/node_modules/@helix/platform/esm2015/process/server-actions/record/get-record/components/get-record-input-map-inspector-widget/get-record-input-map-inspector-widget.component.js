import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck, take, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { RxIdService } from '@helix/platform/utils';
import { InspectorWidgetBase, RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RX_RECORD_SERVER_ACTION } from '../../../record-server-action.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class RxGetRecordInputMapInspectorWidgetComponent extends InspectorWidgetBase {
    constructor(rxExpressionEditorService, rxIdService, translateService, injector) {
        super(injector);
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxIdService = rxIdService;
        this.translateService = translateService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.elementModel$ = this.designerItemModel.pipe(pluck('elementModel'), takeUntil(this.destroyed$));
        this.isDynamicRecordDefinitionName$ = this.elementModel$.pipe(map((elementModel) => elementModel === null || elementModel === void 0 ? void 0 : elementModel.inputMap.recordDefinitionName), distinctUntilChanged(), map((recordDefinitionName) => {
            return RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex.test(recordDefinitionName);
        }));
        this.graph$ = this.designerItemModel.pipe(pluck('graph'), takeUntil(this.destroyed$));
        this.patchOptions(this.options);
    }
    ngOnChanges(changes) {
        if (!isEqual(changes.options.currentValue, changes.options.previousValue)) {
            this.patchOptions(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onRecordDefinitionChange(recordDefinitionName, elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
            selectedElementCell.prop(`elementModel/inputMap/recordDefinitionName`, recordDefinitionName);
        });
    }
    onSampleRecordDefinitionChange(sampleRecordDefinitionName, elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
            selectedElementCell.prop(`elementModel/inputMap/sampleRecordDefinitionName`, sampleRecordDefinitionName);
        });
    }
    openExpressionEditor(elementModel) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            this.rxExpressionEditorService
                .openEditor({
                expressionConfigurator: this.options.expressionConfigurator,
                isReadOnly: false,
                legend: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field-name.label'),
                        icon: 'd-icon-arrow_right_square_input'
                    }
                ],
                property: {
                    path: 'inputMap/recordID',
                    value: elementModel.inputMap.recordID,
                    label: 'Record ID'
                }
            })
                .pipe(takeUntil(this.destroyed$))
                .subscribe((expression) => {
                const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop(`elementModel/inputMap/recordID`, expression.value);
            });
        });
    }
    patchOptions(options) {
        this.recordDefinitionPickerOptions = {
            label: 'Record definition name',
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.sampleRecordDefinitionPickerOptions = {
            label: 'Sample record definition name',
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.recordIDExpressionOptions = {
            label: 'Record ID',
            dataDictionary$: options.expressionConfigurator.getDataDictionary('inputMap/recordID'),
            operators: options.expressionConfigurator.getOperators('inputMap/recordID'),
            isRequired: true
        };
    }
}
RxGetRecordInputMapInspectorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetComponent, deps: [{ token: i1.RxExpressionEditorService }, { token: i2.RxIdService }, { token: i3.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxGetRecordInputMapInspectorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxGetRecordInputMapInspectorWidgetComponent, selector: "rx-get-record-input-map-inspector-widget", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"elementModel$ | async as elementModel\">\n  <rx-definition-picker\n    name=\"recordDefinition\"\n    rx-id=\"record-definition\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.recordDefinitionName\"\n    (ngModelChange)=\"onRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-definition-picker\n    *ngIf=\"isDynamicRecordDefinitionName$ | async\"\n    name=\"sampleRecordDefinition\"\n    rx-id=\"sample-record-definition\"\n    [options]=\"sampleRecordDefinitionPickerOptions\"\n    [ngModel]=\"elementModel.inputMap.sampleRecordDefinitionName\"\n    (ngModelChange)=\"onSampleRecordDefinitionChange($event, elementModel)\"\n  >\n  </rx-definition-picker>\n\n  <rx-expression-form-control\n    rx-id=\"record-id\"\n    [options]=\"recordIDExpressionOptions\"\n    [propertyPath]=\"'inputMap/recordID'\"\n    [ngModel]=\"elementModel.inputMap.recordID\"\n    (events)=\"openExpressionEditor(elementModel)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host::ng-deep rx-definition-picker .dropdown{margin-bottom:15px}\n"], components: [{ type: i1.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGetRecordInputMapInspectorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-get-record-input-map-inspector-widget',
                    templateUrl: './get-record-input-map-inspector-widget.component.html',
                    styleUrls: ['./get-record-input-map-inspector-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxExpressionEditorService }, { type: i2.RxIdService }, { type: i3.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=get-record-input-map-inspector-widget.component.js.map