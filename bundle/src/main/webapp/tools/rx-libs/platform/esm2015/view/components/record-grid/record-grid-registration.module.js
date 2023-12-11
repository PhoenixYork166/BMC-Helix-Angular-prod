import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RX_AVAILABLE_ON_DEVICES_PROP_DESC, RX_VIEW_DEFINITION, RxViewComponentRegistryService, ViewComponentPropertyType, RxRecordQueryExpressionEvaluatorService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RX_VIEW_DESIGNER } from '@helix/platform/view/designer';
import { RecordGridModule } from './runtime/record-grid.module';
import { RecordGridComponent } from './runtime/record-grid.component';
import { RecordGridDesignModule } from './design/record-grid-design.module';
import { RecordGridDesignModel } from './design/record-grid-design.model';
import { RecordGridDesignComponent } from './design/record-grid-design.component';
import { RxRecordGridQueryExpressionEvaluatorService } from './runtime/services/record-grid-query-expression-evaluator.service';
import { RX_RECORD_GRID } from './record-grid.constant';
import { RecordGridExpressionConfigurator } from './design/record-grid-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "./runtime/services/record-grid-query-expression-evaluator.service";
export class RecordGridRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService, rxRecordGridQueryExpressionEvaluatorService, rxRecordQueryExpressionEvaluatorService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.rxRecordGridQueryExpressionEvaluatorService = rxRecordGridQueryExpressionEvaluatorService;
        this.rxRecordQueryExpressionEvaluatorService = rxRecordQueryExpressionEvaluatorService;
        rxViewComponentRegistryService.register({
            type: RX_RECORD_GRID.type,
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordGridComponent),
            properties: [
                {
                    name: 'recordDefinitionName',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'enableRowSelection',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'enableFiltering',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'getDataForHiddenColumns',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'requiredFilters',
                    type: ViewComponentPropertyType.Number,
                    designType: ViewComponentPropertyType.Number,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'showDataForAllLocales',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'expandable',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'bordered',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'striped',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'defaultFilterPreset',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'filters',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'filterExpression',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxRecordGridQueryExpressionEvaluatorService
                },
                {
                    name: 'selectedRows',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'firstSelectedRow',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'clickableRow',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'selectedRowCount',
                    type: ViewComponentPropertyType.Number
                },
                {
                    name: 'totalRowCount',
                    type: ViewComponentPropertyType.Number
                },
                {
                    name: 'isUserAllowedToDeleteRecords',
                    type: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'associationDefinitionName',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'associatedRecordNodeSide',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'associatedRecordId',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'associatedRoleName',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'enableFilterPresets',
                    type: ViewComponentPropertyType.Boolean,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'queryExpression',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'lastRefreshTime',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'viewPresetSelector',
                    enableExpressionEvaluation: true
                },
                RX_AVAILABLE_ON_DEVICES_PROP_DESC
            ],
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                },
                {
                    name: RX_RECORD_GRID.rowActionsOutletName
                }
            ],
            name: 'Record grid',
            group: RX_VIEW_DESIGNER.stencilGroups.basicComponents.label,
            icon: 'table',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RecordGridDesignComponent),
            designComponentModel: RecordGridDesignModel,
            expressionConfigurator: RecordGridExpressionConfigurator,
            bundleId: RX_APPLICATION.platformBundleId
        }, {
            type: RX_RECORD_GRID.components.column,
            configPropertyName: 'columns',
            properties: [
                {
                    name: 'title',
                    type: ViewComponentPropertyType.String,
                    localizable: true
                },
                {
                    name: 'fieldId',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'visible',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'sortable',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'filterable',
                    type: ViewComponentPropertyType.String,
                    designType: ViewComponentPropertyType.Boolean,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'clickable',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true
                },
                {
                    name: 'index',
                    type: ViewComponentPropertyType.Number
                },
                {
                    name: 'alignment',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'cellDisplayProperties',
                    designType: ViewComponentPropertyType.Array,
                    type: ViewComponentPropertyType.Array
                },
                {
                    name: 'wrapText',
                    type: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'typeaheadKeystrokeCount',
                    type: ViewComponentPropertyType.Number
                },
                {
                    name: 'additionalQueryCriteria',
                    type: ViewComponentPropertyType.String,
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxRecordQueryExpressionEvaluatorService
                }
            ],
            isDataComponent: true,
            isContainerComponent: true
        }, {
            type: RX_RECORD_GRID.components.filter,
            configPropertyName: 'recordGridFilters',
            properties: [
                {
                    name: 'value',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'fieldId',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: '$DISPLAYVALUE$',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'label',
                    localizable: true
                }
            ],
            isDataComponent: true
        }, {
            type: RX_RECORD_GRID.components.filterPreset,
            configPropertyName: 'predefinedFilterPresets',
            properties: [
                {
                    name: 'title',
                    type: ViewComponentPropertyType.String,
                    localizable: true
                },
                {
                    name: 'filters',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'filterExpression',
                    enableExpressionEvaluation: true,
                    evaluatorService: this.rxRecordGridQueryExpressionEvaluatorService
                }
            ],
            isDataComponent: true,
            isContainerComponent: true
        }, {
            type: RX_RECORD_GRID.components.viewPreset,
            configPropertyName: 'viewPresets',
            properties: [
                {
                    name: 'viewPresetGuid',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'filters',
                    type: ViewComponentPropertyType.String
                }
            ],
            isDataComponent: true,
            isContainerComponent: true
        }, {
            type: RX_RECORD_GRID.components.columnViewPreset,
            configPropertyName: 'columnViewPresets',
            properties: [
                {
                    name: 'fieldId',
                    type: ViewComponentPropertyType.String
                },
                {
                    name: 'index',
                    designType: ViewComponentPropertyType.Number,
                    type: ViewComponentPropertyType.Number
                },
                {
                    name: 'visible',
                    designType: ViewComponentPropertyType.Boolean,
                    type: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'sortable',
                    designType: ViewComponentPropertyType.Object,
                    type: ViewComponentPropertyType.Object
                }
            ],
            isDataComponent: true,
            isContainerComponent: true
        });
    }
}
RecordGridRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }, { token: i2.RxRecordGridQueryExpressionEvaluatorService }, { token: i1.RxRecordQueryExpressionEvaluatorService }], target: i0.ɵɵFactoryTarget.NgModule });
RecordGridRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRegistrationModule, imports: [RecordGridModule, RecordGridDesignModule] });
RecordGridRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRegistrationModule, imports: [[RecordGridModule, RecordGridDesignModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RecordGridModule, RecordGridDesignModule]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }, { type: i2.RxRecordGridQueryExpressionEvaluatorService }, { type: i1.RxRecordQueryExpressionEvaluatorService }]; } });
//# sourceMappingURL=record-grid-registration.module.js.map