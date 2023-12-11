import { Component, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxExpressionEditorService, RxWizardModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode, RxRecordGridUtilsService } from '@helix/platform/view/components';
import { TranslateService } from '@ngx-translate/core';
import { assign, chain, cloneDeep, differenceBy, find, head, includes, isArray, isEmpty, keys, reduce, reject } from 'lodash';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { map, pairwise, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import { AX_ADD_DATA_WIZARD_STEP } from './add-bundle-content-data-wizard-step.constant';
import { DataFilterColumnExpressionConfiguratorClass } from './components/data-filter-column-expression-configurator.class';
import { GlobalDataFilterExpressionConfiguratorClass } from './components/global-data-filter-expression-configurator.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/view/components";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
export class AddBundleContentDataWizardStepComponent {
    constructor(injector, rxDefinitionNameService, rxExpressionEditorService, rxModalService, rxRecordDefinitionCacheService, rxRecordGridUtilsService, rxWizardModalComponent, translateService) {
        this.injector = injector;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxModalService = rxModalService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.recordDefinitionsFormControl = new FormControl();
        this.duplicateDataActionTypeOptions = keys(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes);
        this.recordDefinitions = [];
        this.selectedDataSources = {};
        this.selectedDefinitions = [];
        this.duplicateConfigurationDataActionTypeOptions = chain(AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes)
            .pick(['THROW_ERROR', 'REPLACE'])
            .keys()
            .value();
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = this.optionFormatter.bind(this);
        this.titleFormatter = this.titleFormatter.bind(this);
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
                wrapText: true,
                cellTemplate: this.recordNameCellTemplate
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
                wrapText: true,
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
            let recordDefinitions = [];
            let preSelectedRecordDefinitions = [];
            const recordDefinitionsByBundles = context.cache.recordDefinitions
                .filter((recordDefinition) => recordDefinition.type !== RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
                .reduce((result, recordDefinition) => {
                const newRecordDefinition = {
                    duplicateDataActionType: [this.options.gridConfig.defaultDuplicateDataActionType],
                    aliasName: recordDefinition.aliasName,
                    name: recordDefinition.name,
                    dataSource: recordDefinition.aliasName || this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                    shouldExportData: recordDefinition.shouldExportData,
                    ignoreRuleExecution: false,
                    disabled: recordDefinition.disabled || recordDefinition.selected,
                    selected: recordDefinition.selected,
                    dataFilter: recordDefinition.dataFilter,
                    dataFilterExpression: recordDefinition.dataFilterExpression || null,
                    defaultFilter: recordDefinition.defaultFilter || null,
                    dataFilterColumnExpressionFormControlOptions: {
                        isLabelHidden: true,
                        operators: this.dataFilterColumnExpressionConfigurator.getOperators(),
                        dataDictionary$: this.dataFilterColumnExpressionConfigurator.getDataDictionary(`dataFilterExpression:${recordDefinition.name}`)
                    }
                };
                const bundleFriendlyName = context.bundleFriendlyNamesById[this.rxDefinitionNameService.getBundleId(newRecordDefinition.name)];
                result[bundleFriendlyName] = result[bundleFriendlyName] || [];
                result[bundleFriendlyName].push(newRecordDefinition);
                return result;
            }, {});
            this.recordDefinitions = reduce(recordDefinitionsByBundles, (result, recordDefinitionList, bundleName) => {
                result.push({ name: bundleName, children: recordDefinitionList });
                preSelectedRecordDefinitions = preSelectedRecordDefinitions.concat(recordDefinitionList.filter((recordDefinition) => recordDefinition.selected));
                recordDefinitions = recordDefinitions.concat(recordDefinitionList);
                return result;
            }, []);
            this.addDataForm = new FormGroup({
                globalDataFilter: new FormControl(null),
                isConfigurationDataIncluded: new FormControl(context.deploymentPackageDescriptor.isConfigurationDataIncluded),
                duplicateConfigurationDataActionType: new FormControl([
                    context.deploymentPackageDescriptor.duplicateDataActionTypeForConfigurationData
                ])
            });
            this.recordDefinitionsFormControl.valueChanges
                .pipe(startWith(null), pairwise(), takeUntil(this.destroyed$))
                .subscribe(([prev, next]) => {
                const selectedRows = this.definitionsDataGrid.api.getSelectedRows();
                let newRows;
                if (prev && prev.length !== next.length) {
                    this.definitionsDataGrid.api.refresh().subscribe();
                }
                if (prev) {
                    newRows = differenceBy(next, prev, 'dataSource');
                }
                else {
                    newRows = next.filter((recordDefinition) => !recordDefinition.selected);
                }
                this.definitionsDataGrid.api.setSelectedRows([
                    ...newRows,
                    ...selectedRows.filter((row) => find(next, { dataSource: row.dataSource }))
                ]);
            });
            this.recordDefinitionsFormControl.patchValue(preSelectedRecordDefinitions);
            this.definitionsDataGrid.rowSelectionChanged.pipe(takeUntil(this.destroyed$)).subscribe((selectedRows) => {
                const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
                const singleSelectDataSource = find(selectedRows, 'isSingleSelect');
                this.selectedDataSources = {};
                this.selectedDefinitions = [];
                selectedRows.forEach((row) => {
                    this.selectedDataSources[row.dataSource] = true;
                    this.selectedDefinitions.push(find(recordDefinitions, { dataSource: row.dataSource }));
                });
                if (selectedRows.length > 1 && singleSelectDataSource) {
                    if (this.isSingleSelectDataSourceSelected) {
                        this.rxModalService
                            .alert({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.single-select-data-source-selected.message', { dataSource: singleSelectDataSource.dataSource })
                        })
                            .then(() => {
                            this.definitionsDataGrid.api.setSelectedRows([singleSelectDataSource]);
                        });
                    }
                    else {
                        this.rxModalService
                            .confirm({
                            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                            modalStyle: RX_MODAL.modalStyles.warning,
                            message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.single-select-data-source-selection-confirmation.message', { dataSource: singleSelectDataSource.dataSource })
                        })
                            .then((response) => {
                            if (response) {
                                this.isSingleSelectDataSourceSelected = true;
                                this.definitionsDataGrid.api.setSelectedRows([singleSelectDataSource]);
                            }
                            else {
                                this.isSingleSelectDataSourceSelected = false;
                                this.definitionsDataGrid.api.setSelectedRows(reject(selectedRows, singleSelectDataSource));
                            }
                        });
                    }
                }
                else {
                    if (this.isSingleSelectDataSourceSelected && !singleSelectDataSource) {
                        this.isSingleSelectDataSourceSelected = false;
                    }
                    assign(newDeploymentPackageDescriptor, {
                        dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(this.selectedDefinitions)
                    });
                    this.rxWizardModalComponent.api.updateContext({
                        deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                        isPackageDataModified: true
                    }, selectedRows.length > 0);
                }
            });
        });
        this.addDataForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                isConfigurationDataIncluded: value.isConfigurationDataIncluded,
                duplicateDataActionTypeForConfigurationData: head(value.duplicateConfigurationDataActionType)
            });
            if (value.globalDataFilter) {
                assign(newDeploymentPackageDescriptor, {
                    dataImportOptionsByRecordDefinitionName: this.getDataImportOptionsByRecordDefinitionName(this.selectedDefinitions)
                });
            }
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor,
                isPackageDataModified: true
            });
        });
        this.recordGridConfig$ = of({
            columns: gridColumns,
            enableRowSelection: RowSelectionMode.Multiple,
            enableFiltering: false,
            recordIdField: 'dataSource',
            styles: 'flex-fill',
            useExternalFiltering: false,
            getRecordDefinition: () => of(gridRecordDefinition),
            getData: () => of({
                data: this.recordDefinitionsFormControl.value,
                totalSize: this.recordDefinitionsFormControl.value.length
            })
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(recordDefinitionData) {
        return this.rxDefinitionNameService.getDisplayName(recordDefinitionData.dataSource);
    }
    titleFormatter(selectedOptions) {
        const title = chain(selectedOptions).map(this.optionFormatter).join(', ').truncate({ length: 200 }).value();
        return title || this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
    }
    duplicateDataActionTypesOptionFormatter(option) {
        return AX_ADD_DATA_WIZARD_STEP.duplicateDataActionTypes[option];
    }
    openDataFilterColumnExpressionEditor(dataItem, columnField) {
        // To simplify implementation we mark wizard as dirty as soon as we open expression builder.
        this.rxWizardModalComponent.api.markDirty();
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
            .pipe(tap((expression) => {
            dataItem[columnField] = expression.value;
            this.updateDataImportOptionsByRecordDefinitionName(expression.value, dataItem, columnField);
        }))
            .subscribe();
    }
    openGlobalDataFilterExpressionEditor() {
        // To simplify implementation we mark wizard as dirty as soon as we open expression builder.
        this.rxWizardModalComponent.api.markDirty();
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
    updateDataImportOptionsByRecordDefinitionName(cellValue, recordDefinitionData, columnField) {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            const recordDefinitions = this.recordDefinitionsFormControl.value;
            const recordDefinition = find(recordDefinitions, { dataSource: recordDefinitionData.dataSource });
            newDeploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName[recordDefinition.name][columnField] =
                isArray(cellValue) ? head(cellValue) : cellValue;
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            });
            recordDefinition[columnField] = cellValue;
            this.recordDefinitionsFormControl.setValue(recordDefinitions);
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
            var _a, _b;
            const dataImportOptionsByRecordDefinitionName = {
                duplicateDataActionType: head(recordDefinition.duplicateDataActionType),
                ignoreRuleExecution: recordDefinition.ignoreRuleExecution
            };
            dataImportOptionsByRecordDefinitionName.defaultFilter = recordDefinition.defaultFilter;
            dataImportOptionsByRecordDefinitionName.dataFilterExpression = recordDefinition.dataFilterExpression;
            dataImportOptionsByRecordDefinitionName.dataFilterColumnExpressionFormControlOptions =
                recordDefinition.dataFilterColumnExpressionFormControlOptions;
            const combinedExpression = chain([
                recordDefinition.defaultFilter,
                recordDefinition.dataFilterExpression,
                this.addDataForm.controls.globalDataFilter.value
            ])
                .compact()
                .map((expression) => `(${expression})`)
                .join(' AND ')
                .value();
            if (combinedExpression) {
                if ((_a = result[recordDefinition.name]) === null || _a === void 0 ? void 0 : _a.dataFilter) {
                    dataImportOptionsByRecordDefinitionName.dataFilter = `${(_b = result[recordDefinition.name]) === null || _b === void 0 ? void 0 : _b.dataFilter} OR (${combinedExpression})`;
                }
                else {
                    dataImportOptionsByRecordDefinitionName.dataFilter = combinedExpression;
                }
            }
            result[recordDefinition.name] = dataImportOptionsByRecordDefinitionName;
            return result;
        }, {});
    }
}
/** @nocollapse */ AddBundleContentDataWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepComponent, deps: [{ token: i0.Injector }, { token: i1.RxDefinitionNameService }, { token: i2.RxExpressionEditorService }, { token: i3.RxModalService }, { token: i4.RxRecordDefinitionCacheService }, { token: i5.RxRecordGridUtilsService }, { token: i2.RxWizardModalComponent }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AddBundleContentDataWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddBundleContentDataWizardStepComponent, selector: "ax-add-bundle-content-data-wizard-step", inputs: { options: "options" }, viewQueries: [{ propertyName: "definitionsDataGrid", first: true, predicate: ["definitionsDataGrid"], descendants: true, static: true }, { propertyName: "recordNameCellTemplate", first: true, predicate: ["recordNameCellTemplate"], descendants: true, static: true }, { propertyName: "dataFilterCellTemplate", first: true, predicate: ["dataFilterCellTemplate"], descendants: true, static: true }, { propertyName: "ignoreRulesCellTemplate", first: true, predicate: ["ignoreRulesCellTemplate"], descendants: true, static: true }, { propertyName: "duplicateDataActionTypeCellTemplate", first: true, predicate: ["duplicateDataActionTypeCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"d-flex justify-content-between\">\n  <h5 class=\"mt-0\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.title' | translate }}\n    <span\n      class=\"d-icon-right-question_circle_o\"\n      [adaptPopover]=\"tooltipContentTemplate\"\n      placement=\"bottom\"\n      appendToBody=\"true\"\n      maxWidth=\"400\"\n    ></span>\n  </h5>\n  <div>\n    {{ options?.countTitle | translate: { count: selectedDefinitions.length } }}\n  </div>\n</div>\n\n<ng-template #tooltipContentTemplate>\n  <div\n    [innerHTML]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-bundle-content-data.tooltip' | translate\"\n  ></div>\n</ng-template>\n\n<div class=\"mb-3\">{{ options?.descriptionTitle | translate }}</div>\n\n<ng-container [formGroup]=\"addDataForm\">\n  <div class=\"d-flex mb-3 justify-content-between\">\n    <adapt-rx-select\n      [formControl]=\"recordDefinitionsFormControl\"\n      [options]=\"recordDefinitions\"\n      [optionFormatter]=\"optionFormatter\"\n      [multiple]=\"true\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [enableFilter]=\"true\"\n      [titleFormatter]=\"titleFormatter\"\n      class=\"add-data-record-definitions-select\"\n    >\n    </adapt-rx-select>\n\n    <rx-expression-form-control\n      class=\"d-flex ml-4\"\n      *ngIf=\"options?.showGlobalFilterExpressionEditor\"\n      [options]=\"globalDataFilterExpressionFormControlOptions\"\n      (events)=\"openGlobalDataFilterExpressionEditor()\"\n      [formControl]=\"addDataForm.controls.globalDataFilter\"\n    >\n    </rx-expression-form-control>\n  </div>\n\n  <rx-record-grid class=\"mb-3\" [config]=\"recordGridConfig$\" #definitionsDataGrid></rx-record-grid>\n\n  <div class=\"d-flex pb-3\">\n    <adapt-rx-checkbox\n      class=\"add-data-is-configuration-data-included-checkbox pr-3\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.add-data.include-configuration-data-in-the-package.label'\n          | translate\n      \"\n      formControlName=\"isConfigurationDataIncluded\"\n    ></adapt-rx-checkbox>\n\n    <adapt-rx-select\n      *ngIf=\"addDataForm.controls.isConfigurationDataIncluded.value\"\n      class=\"flex-grow-1\"\n      appendToBody=\"true\"\n      [options]=\"duplicateConfigurationDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      formControlName=\"duplicateConfigurationDataActionType\"\n    ></adapt-rx-select>\n  </div>\n</ng-container>\n\n<ng-template #recordNameCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  {{ dataItem[column.field] | rxDefinitionNamePipe }}\n</ng-template>\n\n<ng-template #dataFilterCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <rx-expression-form-control\n      [options]=\"dataItem.dataFilterColumnExpressionFormControlOptions\"\n      (events)=\"openDataFilterColumnExpressionEditor(dataItem, column.field)\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    >\n    </rx-expression-form-control>\n  </div>\n</ng-template>\n\n<ng-template #ignoreRulesCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-switch\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem, column.field)\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    ></adapt-rx-switch>\n  </div>\n</ng-template>\n\n<ng-template #duplicateDataActionTypeCellTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <div>\n    <adapt-rx-select\n      appendToBody=\"true\"\n      [options]=\"duplicateDataActionTypeOptions\"\n      [optionFormatter]=\"duplicateDataActionTypesOptionFormatter\"\n      [(ngModel)]=\"dataItem[column.field]\"\n      (ngModelChange)=\"updateDataImportOptionsByRecordDefinitionName($event, dataItem, column.field)\"\n      [disabled]=\"!selectedDataSources[dataItem.dataSource]\"\n    >\n    </adapt-rx-select>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%}rx-record-grid{height:100%}.add-data-record-definitions-select,.add-data-is-configuration-data-included-checkbox{width:400px}\n"], components: [{ type: i7.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i5.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i7.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i7.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i7.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe, "rxDefinitionNamePipe": i1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddBundleContentDataWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-add-bundle-content-data-wizard-step',
                    templateUrl: 'add-bundle-content-data-wizard-step.component.html',
                    styleUrls: ['./add-bundle-content-data-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxDefinitionNameService }, { type: i2.RxExpressionEditorService }, { type: i3.RxModalService }, { type: i4.RxRecordDefinitionCacheService }, { type: i5.RxRecordGridUtilsService }, { type: i2.RxWizardModalComponent }, { type: i6.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], definitionsDataGrid: [{
                type: ViewChild,
                args: ['definitionsDataGrid', { static: true }]
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
//# sourceMappingURL=add-bundle-content-data-wizard-step.component.js.map