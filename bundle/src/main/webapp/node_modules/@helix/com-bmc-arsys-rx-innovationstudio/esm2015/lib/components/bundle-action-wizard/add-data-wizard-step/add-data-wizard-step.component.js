import { Component, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxExpressionEditorService, RxWizardModalComponent } from '@helix/platform/shared/components';
import { RecordGridComponent, RowSelectionMode, RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { assign, chain, cloneDeep, find, head, includes, isArray, isEmpty, keys } from 'lodash';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import { AX_ADD_DATA_WIZARD_STEP } from './add-data-wizard-step.constant';
import { DataFilterColumnExpressionConfiguratorClass } from './components/data-filter-column-expression-configurator.class';
import { GlobalDataFilterExpressionConfiguratorClass } from './components/global-data-filter-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/view/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/common";
export class AddDataWizardStepComponent {
    constructor(injector, rxDefinitionNameService, rxExpressionEditorService, rxRecordDefinitionCacheService, rxRecordGridUtilsService, rxWizardModalComponent, translateService) {
        this.injector = injector;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.duplicateDataActionTypeOptions = keys(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes);
        this.recordDefinitions = [];
        this.duplicateConfigurationDataActionTypeOptions = chain(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes)
            .pick(['THROW_ERROR', 'REPLACE'])
            .keys()
            .value();
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
    }
    isDeleteButtonDisabled() {
        let isDeleteButtonDisabled = true;
        if (this.definitionsDataGrid) {
            const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
            isDeleteButtonDisabled = !selectedRows.length || Boolean(find(selectedRows, 'shouldExportData'));
        }
        return isDeleteButtonDisabled;
    }
    ngOnInit() {
        this.dataFilterColumnExpressionConfigurator = new DataFilterColumnExpressionConfiguratorClass(this.injector);
        this.globalDataFilterExpressionConfigurator = new GlobalDataFilterExpressionConfiguratorClass(this.injector);
        this.globalDataFilterExpressionConfigurator.configureForProperty({
            propertyPath: 'globalDataFilter',
            operators: this.globalDataFilterExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
            dataDictionary$: this.globalDataFilterExpressionConfigurator.commonDataDictionary$
        });
        this.globalDataFilterExpressionFormControlOptions = {
            isLabelHidden: true,
            dataDictionary$: this.globalDataFilterExpressionConfigurator.getDataDictionary('globalDataFilter'),
            operators: this.globalDataFilterExpressionConfigurator.getOperators(),
            clickToBuildExpressionLabel: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.global-data-filter.click-to-build-expression.label')
        };
        const gridColumns = [
            {
                fieldId: 'dataSource',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-source.label'),
                wrapText: true
            },
            {
                fieldId: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.name.label'),
                wrapText: true,
                visible: false,
                cellTemplate: this.recordNameCellTemplate
            },
            {
                fieldId: 'aliasName',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.alias-name.label'),
                visible: false
            },
            {
                fieldId: 'dataFilterExpression',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                cellTemplate: this.dataFilterCellTemplate
            },
            {
                fieldId: 'dataFilterColumnExpressionFormControlOptions',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label'),
                visible: false
            },
            {
                fieldId: 'ignoreRuleExecution',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.ignore-rules.label'),
                cellTemplate: this.ignoreRulesCellTemplate
            },
            {
                fieldId: 'duplicateDataActionType',
                title: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.duplicates.label'),
                cellTemplate: this.duplicateDataActionTypeCellTemplate
            }
        ].filter((column) => includes(this.options.gridConfig.columns, column.fieldId));
        const gridRecordDefinition = {
            fieldDefinitions: [
                {
                    id: 'dataSource',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'aliasName',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterExpression',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'dataFilterColumnExpressionFormControlOptions',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.object
                },
                {
                    id: 'ignoreRuleExecution',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: 'duplicateDataActionType',
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ].filter((definition) => includes(this.options.gridConfig.columns, definition.id))
        };
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            context.cache.recordDefinitions.forEach((recordDefinition) => {
                this.dataFilterColumnExpressionConfigurator.configureForProperty({
                    propertyPath: `dataFilterExpression:${recordDefinition.name}`,
                    operators: this.dataFilterColumnExpressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All),
                    dataDictionary$: this.dataFilterColumnExpressionConfigurator.commonDataDictionary$.pipe(switchMap((commonDataDictionary) => this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinition.name).pipe(switchMap((associationDescriptors) => forkJoin([
                        this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinition.name),
                        ...associationDescriptors.map((associationDescriptor) => this.rxRecordDefinitionCacheService.getRecordDefinition(associationDescriptor.recordDefinitionName))
                    ]).pipe(map((definitions) => [
                        commonDataDictionary[0],
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.data-dictionary.values.definition-fields.title', {
                                definitionName: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
                            }),
                            expanded: true,
                            children: [
                                ...chain(definitions)
                                    .find({ name: recordDefinition.name })
                                    .get('fieldDefinitions')
                                    .map((fieldDefinition) => ({
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-field_text',
                                    expression: `'${fieldDefinition.id}'`
                                }))
                                    .value(),
                                isEmpty(associationDescriptors)
                                    ? []
                                    : {
                                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition-associations.title'),
                                        children: associationDescriptors.map((associationDescriptor) => ({
                                            label: `${this.rxDefinitionNameService.getDisplayName(associationDescriptor.recordDefinitionName)} (${associationDescriptor.label})`,
                                            children: this.getAssociationsDataDictionary(definitions, associationDescriptor.recordDefinitionName, associationDescriptor)
                                        }))
                                    }
                            ]
                        }
                    ]))))))
                });
            });
            const recordDefinitions = [];
            this.recordDefinitions = context.cache.recordDefinitions
                .filter((recordDefinition) => recordDefinition.type !== RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
                .map((recordDefinition) => {
                const newRecordDefinition = {
                    duplicateDataActionType: [this.options.gridConfig.defaultDuplicateDataActionType],
                    name: recordDefinition.name,
                    dataSource: recordDefinition.aliasName || this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                    shouldExportData: recordDefinition.shouldExportData,
                    ignoreRuleExecution: false,
                    disabled: recordDefinition.shouldExportData,
                    selected: recordDefinition.shouldExportData
                };
                if (newRecordDefinition.selected) {
                    recordDefinitions.push(newRecordDefinition);
                }
                return newRecordDefinition;
            });
            this.addDataForm = new FormGroup({
                globalDataFilter: new FormControl(null),
                isConfigurationDataIncluded: new FormControl(context.deploymentPackageDescriptor.isConfigurationDataIncluded),
                duplicateConfigurationDataActionType: new FormControl([
                    context.deploymentPackageDescriptor.duplicateDataActionTypeForConfigurationData
                ]),
                recordDefinitions: new FormControl(recordDefinitions)
            });
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(recordDefinitions)
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            }, false);
        });
        this.addDataForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            const isConfigurationDataIncluded = newDeploymentPackageDescriptor.isConfigurationDataIncluded;
            assign(newDeploymentPackageDescriptor, {
                isConfigurationDataIncluded: value.isConfigurationDataIncluded,
                duplicateDataActionTypeForConfigurationData: head(value.duplicateConfigurationDataActionType),
                dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(value.recordDefinitions)
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            });
            if (isConfigurationDataIncluded === value.isConfigurationDataIncluded) {
                this.definitionsDataGrid.api.refresh().subscribe();
            }
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: false,
            recordIdField: 'dataSource',
            styles: 'flex-fill',
            useExternalFiltering: false,
            actionButtons: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.remove.label'),
                    style: 'tertiary',
                    iconCls: 'trash',
                    disabled: this.isDeleteButtonDisabled.bind(this),
                    actions: [
                        {
                            name: this.deleteDefinitionsDataFromSelection.bind(this)
                        }
                    ]
                }
            ],
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.addDataForm.controls.recordDefinitions.value,
                totalSize: this.addDataForm.controls.recordDefinitions.value.length
            })
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(recordDefinitionData) {
        return recordDefinitionData.dataSource;
    }
    duplicateDataActionTypesOptionFormatter(option) {
        return AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes[option];
    }
    openDataFilterColumnExpressionEditor(dataItem, columnField) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: `dataFilterExpression:${dataItem.name}`,
                value: dataItem[columnField],
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.data-filter.label')
            },
            expressionConfigurator: this.dataFilterColumnExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.expression-editor.legend.activity-result.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            const recordDefinitions = this.addDataForm.controls.recordDefinitions.value;
            const recordDefinition = find(recordDefinitions, { name: dataItem.name });
            recordDefinition.dataFilterExpression = expression.value;
            this.addDataForm.controls.recordDefinitions.setValue(recordDefinitions);
        });
    }
    openGlobalDataFilterExpressionEditor() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'globalDataFilter',
                value: this.addDataForm.controls.globalDataFilter.value,
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.global-data-filter-expression-editor.label')
            },
            expressionConfigurator: this.globalDataFilterExpressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .subscribe((expression) => {
            this.addDataForm.controls.globalDataFilter.setValue(expression.value);
        });
    }
    deleteDefinitionsDataFromSelection() {
        const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
        this.addDataForm.controls.recordDefinitions.patchValue(this.addDataForm.controls.recordDefinitions.value.filter((recordDefinition) => !find(selectedRows, { dataSource: recordDefinition.dataSource })));
    }
    updateDataImportOptionsByRecordDefinitionName(cellValue, recordDefinitionName, optionName) {
        const newDeploymentPackageDescriptor = cloneDeep(this.context.deploymentPackageDescriptor);
        newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName[recordDefinitionName][optionName] = isArray(cellValue)
            ? head(cellValue)
            : cellValue;
        this.rxWizardModalComponent.api.updateContext({
            deploymentPackageDescriptor: newDeploymentPackageDescriptor
        });
    }
    getAssociationsDataDictionary(recordDefinitions, recordDefinitionName, parentAssociation) {
        const fieldDefinitions = find(recordDefinitions, {
            name: recordDefinitionName
        }).fieldDefinitions;
        return fieldDefinitions.map((fieldDefinition) => ({
            label: fieldDefinition.name,
            icon: 'd-icon-field_text',
            expression: `'recordContext._associations.${parentAssociation.associationDefinition.guid}.${parentAssociation.nodeSide}[0].${fieldDefinition.id}'`
        }));
    }
    getDataImportOptionsByRecordDefinitionName(recordDefinitions) {
        return recordDefinitions.reduce((result, recordDefinition) => {
            const dataImportOptionsByRecordDefinitionName = {
                duplicateDataActionType: head(recordDefinition.duplicateDataActionType),
                ignoreRuleExecution: recordDefinition.ignoreRuleExecution
            };
            result[recordDefinition.name] = dataImportOptionsByRecordDefinitionName;
            return result;
        }, {});
    }
}
/** @nocollapse */ AddDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepComponent, deps: [{ token: i0.Injector }, { token: i1.RxDefinitionNameService }, { token: i2.RxExpressionEditorService }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.RxRecordGridUtilsService }, { token: i2.RxWizardModalComponent }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AddDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddDataWizardStepComponent, selector: "ax-add-data-wizard-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "definitionsDataGrid", first: true, predicate: ["definitionsDataGrid"], descendants: true }, { propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "dataFilterCellTemplate", first: true, predicate: ["dataFilterCellTemplate"], descendants: true, static: true }, { propertyName: "ignoreRulesCellTemplate", first: true, predicate: ["ignoreRulesCellTemplate"], descendants: true, static: true }, { propertyName: "duplicateDataActionTypeCellTemplate", first: true, predicate: ["duplicateDataActionTypeCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title' | translate }}</h5>\n  <div>\n    {{ options?.countTitle | translate: { count: addDataForm?.controls?.recordDefinitions?.value?.length } }}\n  </div>\n</div>\n\n<div class=\"mb-3\">{{ options?.descriptionTitle | translate }}</div>\n\n<ng-container [formGroup]=\"addDataForm\">\n  <div class=\"d-flex mb-3 justify-content-between\">\n    <adapt-rx-select\n      [formControl]=\"addDataForm.controls.recordDefinitions\"\n      [options]=\"recordDefinitions\"\n      [optionFormatter]=\"optionFormatter\"\n      [multiple]=\"true\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [enableFilter]=\"true\"\n      class=\"add-data-record-definitions-select\"\n    >\n    </adapt-rx-select>\n\n    <rx-expression-form-control\n      class=\"d-flex\"\n      *ngIf=\"options?.showGlobalFilterExpressionEditor\"\n      [options]=\"globalDataFilterExpressionFormControlOptions\"\n      (events)=\"openGlobalDataFilterExpressionEditor()\"\n      [formControl]=\"addDataForm.controls.globalDataFilter\"\n    >\n    </rx-expression-form-control>\n  </div>\n\n  <rx-record-grid class=\"mb-3\" [config]=\"recordGridConfig$\" #definitionsDataGrid></rx-record-grid>\n\n  <div class=\"d-flex pb-3\">\n    <adapt-rx-checkbox\n      class=\"add-data-is-configuration-data-included-checkbox pr-3\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.include-configuration-data-in-the-package.label'\n          | translate\n      \"\n      formControlName=\"isConfigurationDataIncluded\"\n    ></adapt-rx-checkbox>\n\n    <adapt-rx-select\n      *ngIf=\"addDataForm.controls.isConfigurationDataIncluded.value\"\n      class=\"flex-grow-1\"\n      appendToBody=\"true\"\n      [options]=\"duplicateConfigurationDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      formControlName=\"duplicateConfigurationDataActionType\"\n    ></adapt-rx-select>\n  </div>\n</ng-container>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #dataFilterCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <rx-expression-form-control\n      [options]=\"dataItem.dataFilterColumnExpressionFormControlOptions\"\n      (events)=\"openDataFilterColumnExpressionEditor(dataItem, column.field)\"\n      [(ngModel)]=\"dataItem[column.field]\"\n    >\n    </rx-expression-form-control>\n  </div>\n</ng-template>\n\n<ng-template #ignoreRulesCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-switch\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem.name, 'ignoreRuleExecution')\"\n    ></adapt-rx-switch>\n  </div>\n</ng-template>\n\n<ng-template #duplicateDataActionTypeCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-select\n      appendToBody=\"true\"\n      [options]=\"duplicateDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem.name, 'duplicateDataActionType')\"\n    >\n    </adapt-rx-select>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}.add-data-record-definitions-select,.add-data-is-configuration-data-included-checkbox{width:400px}\n"], components: [{ type: i6.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i4.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i6.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i5.TranslatePipe, "rxDefinitionNamePipe": i1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-add-data-wizard-step',
                    templateUrl: 'add-data-wizard-step.component.html',
                    styleUrls: ['./add-data-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxDefinitionNameService }, { type: i2.RxExpressionEditorService }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.RxRecordGridUtilsService }, { type: i2.RxWizardModalComponent }, { type: i5.TranslateService }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], definitionsDataGrid: [{
                type: ViewChild,
                args: ['definitionsDataGrid']
            }], recordNameCellTemplate: [{
                type: ViewChild,
                args: ['recordNameCellTemplate', { static: true }]
            }], dataFilterCellTemplate: [{
                type: ViewChild,
                args: ['dataFilterCellTemplate', { static: true }]
            }], ignoreRulesCellTemplate: [{
                type: ViewChild,
                args: ['ignoreRulesCellTemplate', { static: true }]
            }], duplicateDataActionTypeCellTemplate: [{
                type: ViewChild,
                args: ['duplicateDataActionTypeCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=add-data-wizard-step.component.js.map