import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { RX_DEFINITION_PICKER, RxDefinitionPickerType, RxWizardModalComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { RecordFieldOption, RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxAssociationDefinitionService } from '@helix/platform/association/api';
import { cloneDeep, compact, filter as _filter, find, flatten, flow, forEach, get, includes, intersectionBy, lowerCase, map as _map, some, sortBy } from 'lodash';
import { RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { iif, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { DataExportService } from '../../data-export/data-export.service';
import { DataImportService } from '../data-import.service';
import { NgForm } from '@angular/forms';
import { DL_DATA_IMPORT } from '../data-import.constant';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "../data-import.service";
import * as i2 from "../../data-export/data-export.service";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@helix/platform/shared/api";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@helix/platform/association/api";
import * as i9 from "@bmc-ux/adapt-angular";
import * as i10 from "@angular/forms";
import * as i11 from "@angular/common";
export class DataImportMappingStepComponent {
    constructor(dataImportService, dataExportService, rxRecordDefinitionCacheService, changeDetectorRef, rxModalService, rxWizardModalComponent, definitionNameService, translateService, rxAssociationDefinitionService, rxNotificationService) {
        this.dataImportService = dataImportService;
        this.dataExportService = dataExportService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.changeDetectorRef = changeDetectorRef;
        this.rxModalService = rxModalService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.definitionNameService = definitionNameService;
        this.translateService = translateService;
        this.rxAssociationDefinitionService = rxAssociationDefinitionService;
        this.rxNotificationService = rxNotificationService;
        this.sourceFieldNameList = [];
        this.targetFieldList = [];
        this.definitionTypes = {
            record: 'record',
            association: 'association'
        };
        this.definitionTypeOptions = [
            {
                value: this.definitionTypes.record,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.record.label')
            },
            {
                value: this.definitionTypes.association,
                displayValue: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.association.label')
            }
        ];
        this.recordPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            }
        };
        this.associationPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Association,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            }
        };
        this.destroyed$ = new ReplaySubject(1);
        this.duplicateHandlingOptions = [
            {
                id: DL_DATA_IMPORT.mergeOptions.generateNewIds,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-all')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.generateNewIdsForDuplicates,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.generating-new-id-for-duplicates')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.rejectDuplicates,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.rejecting-duplicate')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.replaceRecords,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.replacing-existing-records')
            },
            {
                id: DL_DATA_IMPORT.mergeOptions.updateRecords,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.updating-old-with-new')
            }
        ];
        this.dataOptions = [
            {
                id: 1,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-leading-spaces-and-tabs'),
                isSelected: false
            },
            {
                id: 2,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.remove-trailing-spaces-and-tabs'),
                isSelected: false
            },
            {
                id: 3,
                name: this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.truncate-long-strings'),
                isSelected: false
            }
        ];
        this.matchDuplicateByFields = [];
        this.selectedMatchDuplicateByFields = [];
        this.dateTimeFormatOptions = [
            {
                id: 1,
                name: 'dd/MM/yy',
                example: '25/11/21'
            },
            {
                id: 2,
                name: 'dd/MM/yyyy',
                example: '25/11/2021'
            },
            {
                id: 3,
                name: 'MM/dd/yyyy',
                example: '11/25/2021'
            },
            {
                id: 4,
                name: 'yyyy/MM/dd',
                example: '2021/11/25'
            },
            {
                id: 5,
                name: `yyyy-MM-dd'T'HH:mm:ss:SSSZ`,
                example: '2021-11-25T11:12:13:000+0530'
            }
        ];
    }
    ngOnInit() {
        this.excelSheetName = this.options.sheetName;
        this.currentSheetDataImportMapping = this.dataImportService.getEmptyCurrentSheetDataMapConfig(this.excelSheetName);
        this.currentExcelSheetConfiguration = this.context.excelSheetsConfiguration[this.excelSheetName];
        this.sourceFieldNameList = _map(this.currentExcelSheetConfiguration.fields, 'name');
        this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy = [
            find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })
        ];
        const isCloningConfig = Boolean(this.context.clonedConfigurationInstanceId);
        if (isCloningConfig && this.context.isClonedConfigMatched) {
            this.currentSheetDataImportMapping = cloneDeep(this.getRefactoredClonedConfiguration(find(this.context.dataImportContext.dataImportConfigurations.sheets, {
                name: this.excelSheetName
            })));
            setTimeout(() => this.updateDataChangesToSheetMapContext());
            if (this.getRecordDefinitionName()) {
                this.loadTargetAndOtherFields(false, false);
            }
            else {
                this.setTypeFromExcelSheet();
            }
        }
        else {
            this.setTypeFromExcelSheet();
        }
    }
    ngAfterViewInit() {
        this.dataImportConfigurationForm.control.valueChanges
            .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((values) => setTimeout(() => this.updateDataChangesToSheetMapContext()));
    }
    removeMapping(index) {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.splice(index, 1);
    }
    addFieldMapping(sourceFieldName = null, targetField = null) {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.push({
            sourceField: { fieldName: sourceFieldName ? [sourceFieldName] : null },
            targetField: targetField ? [targetField] : null
        });
        this.updateWizardButtons();
    }
    setDefinitionTypeNameFromExcelSheet() {
        this.setTypeFromExcelSheet();
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name =
            this.currentExcelSheetConfiguration.definition.value;
    }
    setTypeFromExcelSheet() {
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type =
            this.getTypeFromExcelSheet();
    }
    autoMapping() {
        this.clearMappingFields();
        this.setDefinitionTypeNameFromExcelSheet();
        this.loadTargetAndOtherFields(true);
    }
    loadTargetAndOtherFields(isAutoMapping = false, autoPopulateRequiredFields = false) {
        this.areFieldsLoading = true;
        this.requiredFieldNames = [];
        iif(() => this.isDefinitionTypeRecord(), this.rxRecordDefinitionCacheService.getRecordDefinition(this.getRecordDefinitionName()), this.rxAssociationDefinitionService.get(this.getRecordDefinitionName()))
            .pipe(map((definitionResponse) => {
            if (this.dataExportService.isRecordDefinitionResponse(definitionResponse)) {
                this.targetFieldList = definitionResponse.fieldDefinitions
                    .sort(function (a, b) {
                    if (a.fieldOption === RecordFieldOption.Required && !a.defaultValue) {
                        return -1;
                    }
                    else {
                        b.name.localeCompare(a.name);
                    }
                })
                    .map((fieldDefinition) => {
                    if (this.isMappingFieldDefinitionRequired(fieldDefinition)) {
                        this.requiredFieldNames.push(fieldDefinition.name);
                        if (autoPopulateRequiredFields) {
                            this.addFieldMapping(null, {
                                name: fieldDefinition.name,
                                _fieldId: fieldDefinition.id
                            });
                        }
                    }
                    return {
                        name: fieldDefinition.name,
                        _fieldId: fieldDefinition.id
                    };
                });
            }
            else {
                this.targetFieldList = [
                    {
                        name: definitionResponse.nodeAName || '',
                        _fieldId: definitionResponse.nodeAKeys[0] || ''
                    },
                    {
                        name: definitionResponse.nodeBName || '',
                        _fieldId: definitionResponse.nodeBKeys[0]
                    }
                ].filter((field) => field.name);
            }
        }), tap(() => {
            if (isAutoMapping) {
                this.generateAutoMappingFields();
            }
        }), finalize(() => {
            this.areFieldsLoading = false;
        }))
            .subscribe(() => {
            this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = sortBy(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, (fieldMap) => get(fieldMap, 'targetField[0].name'));
        });
    }
    isMappingFieldDefinitionRequired(fieldDefinition) {
        return fieldDefinition.fieldOption === RecordFieldOption.Required && !fieldDefinition.defaultValue;
    }
    generateAutoMappingFields() {
        forEach(this.sourceFieldNameList, (sourceFieldName) => {
            const matchedTargetField = this.targetFieldList.find((targetField) => sourceFieldName === targetField.name || sourceFieldName === String(targetField._fieldId));
            if (matchedTargetField) {
                this.addFieldMapping(sourceFieldName, matchedTargetField);
            }
            else {
                this.addFieldMapping(sourceFieldName, null);
            }
        });
        const targetFieldMappings = flatten(_map(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, 'targetField'));
        forEach(this.targetFieldList, (targetField) => {
            if (!find(targetFieldMappings, { name: targetField.name }) && this.isRequiredTargetField(targetField)) {
                this.addFieldMapping(null, targetField);
            }
        });
    }
    onDefinitionChange(definitionName) {
        this.clearMappingFields();
        if (definitionName) {
            if (!this.definitionNameService.getBundleId(definitionName)) {
                this.showInvalidDefinitionSelectedMsg();
            }
            else {
                this.loadTargetAndOtherFields(false, true);
            }
        }
    }
    clearMappingFields() {
        this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings = [];
    }
    getRecordDefinitionName(isAutoMapping) {
        return isAutoMapping
            ? this.currentExcelSheetConfiguration.definition.value
            : this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name;
    }
    clearDefinitionSelection() {
        this.changeDetectorRef.detectChanges();
        this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name = null;
    }
    onDefinitionTypeChange() {
        this.clearMappingFields();
        this.clearDefinitionSelection();
    }
    showInvalidDefinitionSelectedMsg() {
        this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
        this.clearDefinitionSelection();
    }
    isDefinitionTypeRecord() {
        return (this.currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===
            this.definitionTypes.record);
    }
    optionFormatter(field) {
        return field.name;
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    isStepActive() {
        var _a;
        return this.rxWizardModalComponent.api.isCurrentStepActive((_a = this.currentExcelSheetConfiguration) === null || _a === void 0 ? void 0 : _a.stepId);
    }
    onTargetFieldSelection($event, index) {
        const isFieldAlreadySelected = flow((fields) => _filter(fields, (value, key) => key !== index), (alreadySelectedFields) => find(alreadySelectedFields, (fieldMap) => { var _a, _b; return fieldMap.targetField && ((_a = fieldMap === null || fieldMap === void 0 ? void 0 : fieldMap.targetField[0]) === null || _a === void 0 ? void 0 : _a.name) === ((_b = $event.options[0]) === null || _b === void 0 ? void 0 : _b.name); }), (fieldMap) => fieldMap)(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
        if (isFieldAlreadySelected) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.import.wizard.target-field-already-selected.message.title'));
            $event.preventDefault();
        }
        else {
            setTimeout(() => this.updateDataChangesToSheetMapContext());
        }
    }
    isRequiredTargetField(targetField) {
        return includes(this.requiredFieldNames, (targetField === null || targetField === void 0 ? void 0 : targetField.name) || get(targetField, '[0].name'));
    }
    shouldGenerateNewIdForDuplicateRecords() {
        var _a;
        return (this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy &&
            ((_a = this.currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy[0]) === null || _a === void 0 ? void 0 : _a.id) === 1);
    }
    onTabActivated(event) {
        if (event.index === 1) {
            this.matchDuplicateByFields = flow((fields) => _map(fields, 'targetField'), compact, flatten)(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings);
            const defaultMatchByField = find(this.matchDuplicateByFields, { _fieldId: RX_RECORD_DEFINITION.coreFieldIds.id });
            if (defaultMatchByField && !this.selectedMatchDuplicateByFields.length) {
                this.selectedMatchDuplicateByFields = [defaultMatchByField];
            }
            this.selectedMatchDuplicateByFields = intersectionBy(this.matchDuplicateByFields, this.selectedMatchDuplicateByFields, 'name');
        }
    }
    getTypeFromExcelSheet() {
        return lowerCase(this.currentExcelSheetConfiguration.definition.name);
    }
    get timeFormatExample() {
        var _a;
        return (this.currentSheetDataImportMapping.configurations.timeFormatOptions &&
            ((_a = this.currentSheetDataImportMapping.configurations.timeFormatOptions[0]) === null || _a === void 0 ? void 0 : _a.example));
    }
    areFieldMappingsInvalid() {
        return some(this.currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings, (fieldMap) => !fieldMap.sourceField.fieldName || !fieldMap.targetField);
    }
    updateWizardButtons() {
        this.rxWizardModalComponent.config.options.allowFinish =
            this.rxWizardModalComponent.activeTabIndex === this.rxWizardModalComponent.config.options.steps.length - 1;
        if (this.dataImportConfigurationForm.invalid || this.areFieldMappingsInvalid()) {
            this.rxWizardModalComponent.api.disableNextButton();
            this.rxWizardModalComponent.api.disableFinishButton();
        }
        else {
            this.rxWizardModalComponent.api.enableNextButton();
            this.rxWizardModalComponent.api.enableFinishButton();
        }
    }
    updateDataChangesToSheetMapContext() {
        this.updateWizardButtons();
        this.rxWizardModalComponent.api.markDirty();
        const currentConfigurations = cloneDeep(this.currentSheetDataImportMapping.configurations);
        _filter(currentConfigurations.definitionMappings.fieldMappings, (field) => field.targetField).forEach((field) => {
            field.sourceField = { fieldName: get(field.sourceField, 'fieldName[0]') };
            field.targetField = field.targetField[0];
        });
        currentConfigurations.duplicateHandlingOptions.handleDuplicateBy = get(currentConfigurations.duplicateHandlingOptions.handleDuplicateBy, '[0].id');
        if (this.shouldGenerateNewIdForDuplicateRecords()) {
            currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = [];
        }
        else {
            currentConfigurations.duplicateHandlingOptions.matchDuplicateBy = _map(this.selectedMatchDuplicateByFields, (field) => ({
                _fieldId: field._fieldId,
                name: field.name
            }));
        }
        currentConfigurations.dataHandlingOptions = this.dataOptions
            .filter((option) => option.isSelected)
            .map((option) => option.id);
        currentConfigurations.timeFormatOptions = get(currentConfigurations.timeFormatOptions, '[0].name');
        const sheetImportConfig = find(this.context.dataImportContext.dataImportConfigurations.sheets, {
            name: this.excelSheetName
        });
        sheetImportConfig.configurations = currentConfigurations;
    }
    getRefactoredClonedConfiguration(configuration) {
        forEach(configuration.configurations.definitionMappings.fieldMappings, (fieldMap) => {
            fieldMap.targetField = [fieldMap.targetField];
            fieldMap.sourceField.fieldName = [fieldMap.sourceField.fieldName];
        });
        this.dataOptions.forEach((option) => {
            option.isSelected = includes(configuration.configurations.dataHandlingOptions, option.id);
        });
        configuration.configurations.timeFormatOptions = configuration.configurations.timeFormatOptions
            ? [
                find(this.dateTimeFormatOptions, {
                    name: configuration.configurations.timeFormatOptions
                })
            ]
            : [];
        configuration.configurations.duplicateHandlingOptions.handleDuplicateBy = configuration.configurations
            .duplicateHandlingOptions.handleDuplicateBy
            ? [
                find(this.duplicateHandlingOptions, {
                    id: configuration.configurations.duplicateHandlingOptions.handleDuplicateBy
                })
            ]
            : [find(this.duplicateHandlingOptions, { id: DL_DATA_IMPORT.mergeOptions.generateNewIds })];
        if (configuration.configurations.duplicateHandlingOptions.matchDuplicateBy.length) {
            this.selectedMatchDuplicateByFields = configuration.configurations.duplicateHandlingOptions.matchDuplicateBy;
        }
        return configuration;
    }
}
DataImportMappingStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportMappingStepComponent, deps: [{ token: i1.DataImportService }, { token: i2.DataExportService }, { token: i3.RxRecordDefinitionCacheService }, { token: i0.ChangeDetectorRef }, { token: i4.RxModalService }, { token: i5.RxWizardModalComponent }, { token: i6.RxDefinitionNameService }, { token: i7.TranslateService }, { token: i8.RxAssociationDefinitionService }, { token: i6.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
DataImportMappingStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataImportMappingStepComponent, selector: "dl-data-import-mapping-step", inputs: { context: "context", options: "options" }, viewQueries: [{ propertyName: "dataImportConfigurationForm", first: true, predicate: ["dataImportConfigurationForm"], descendants: true }], ngImport: i0, template: "<form #dataImportConfigurationForm=\"ngForm\">\n  <adapt-tabset type=\"pills\" [tab-active]=\"0\" (tab-active-changed)=\"onTabActivated($event)\">\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.title' | translate }}\"\n    >\n      <div *ngIf=\"isStepActive()\" class=\"mt-2\">\n        <button\n          adapt-button\n          btn-type=\"primary\"\n          type=\"button\"\n          rx-id=\"auto-mapping\"\n          (click)=\"autoMapping()\"\n          size=\"small\"\n          class=\"d-icon-left-arrow_schema form-group\"\n          [disabled]=\"areFieldsLoading\"\n        >\n          {{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.auto-mapping.label' | translate }}\n        </button>\n\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type\"\n          (ngModelChange)=\"onDefinitionTypeChange()\"\n          name=\"definitionType\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.definition.label' | translate }}\"\n          rx-id=\"definition-type\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.record\n          \"\n          class=\"d-block form-group\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"recordDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          *ngIf=\"\n            currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.type ===\n            definitionTypes.association\n          \"\n          class=\"d-block form-group\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\"\n          (ngModelChange)=\"onDefinitionChange($event)\"\n          name=\"associationDefinitionName\"\n        >\n        </rx-definition-picker>\n\n        <div *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.targetDefinition.name\">\n          <div class=\"row border-bottom form-group\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.mapping-title.title' | translate\n                }}\"\n              >\n              </adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6\">\n              <button\n                class=\"d-icon-left-plus_circle float-right py-0 px-2\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"add-mapping\"\n                (click)=\"addFieldMapping()\"\n              >\n                {{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.types.manual-mapping.label'\n                    | translate\n                }}\n              </button>\n            </div>\n          </div>\n\n          <div class=\"row\" *ngIf=\"currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings.length\">\n            <div class=\"col-6\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.source-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n\n            <div class=\"col-6 pl-0\">\n              <adapt-rx-control-label\n                label=\"{{\n                  'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.data-mapping.target-fields.label' | translate\n                }}\"\n              ></adapt-rx-control-label>\n            </div>\n          </div>\n\n          <div class=\"loader-container\" *ngIf=\"areFieldsLoading\">\n            <div class=\"loader-section\"></div>\n          </div>\n\n          <div\n            class=\"row no-gutters\"\n            *ngFor=\"\n              let fieldMapping of currentSheetDataImportMapping.configurations.definitionMappings.fieldMappings;\n              let $index = index\n            \"\n          >\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.sourceField.fieldName\"\n                [options]=\"sourceFieldNameList\"\n                [required]=\"true\"\n                [enableFilter]=\"true\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                (ngModelChange)=\"updateDataChangesToSheetMapContext()\"\n                rx-id=\"source-field-names\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 d-icon-arrow_right text-tertiary mt-2 text-center\"></div>\n\n            <div class=\"col-5\">\n              <adapt-rx-select\n                class=\"d-block form-group\"\n                [(ngModel)]=\"fieldMapping.targetField\"\n                [options]=\"targetFieldList\"\n                [optionFormatter]=\"optionFormatter\"\n                [required]=\"true\"\n                (onSelectionChange)=\"onTargetFieldSelection($event, $index)\"\n                [enableFilter]=\"true\"\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngModelOptions]=\"{ standalone: true }\"\n                rx-id=\"target-fields\"\n              >\n              </adapt-rx-select>\n            </div>\n\n            <div class=\"col-1 pl-3\">\n              <button\n                [disabled]=\"isRequiredTargetField(fieldMapping.targetField)\"\n                [ngClass]=\"{ 'text-tertiary': isRequiredTargetField(fieldMapping.targetField) }\"\n                class=\"d-icon-minus_circle text-danger form-group px-0\"\n                adapt-button\n                btn-type=\"tertiary\"\n                type=\"button\"\n                rx-id=\"remove-mapping-button\"\n                (click)=\"removeMapping($index)\"\n              ></button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.title' | translate }}\"\n    >\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.handle-by.label' | translate\n        }}\"\n        class=\"d-block form-group mt-2\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.duplicateHandlingOptions.handleDuplicateBy\"\n        [options]=\"duplicateHandlingOptions\"\n        name=\"handleDuplicatesBy\"\n        rx-id=\"handle-duplicates-by\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        label=\"{{\n          'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.duplicate-handling.match-by.label' | translate\n        }}\"\n        *ngIf=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        class=\"d-block form-group\"\n        [(ngModel)]=\"selectedMatchDuplicateByFields\"\n        [options]=\"matchDuplicateByFields\"\n        [multiple]=\"true\"\n        [enableFilter]=\"true\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [optionFormatter]=\"optionFormatter\"\n        [required]=\"!shouldGenerateNewIdForDuplicateRecords()\"\n        name=\"matchDuplicatesBy\"\n        rx-id=\"match-duplicates-by\"\n      >\n      </adapt-rx-select>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\">\n      <adapt-rx-checkbox\n        *ngFor=\"let dataOption of dataOptions; let index = index\"\n        [(ngModel)]=\"dataOption.isSelected\"\n        label=\"{{ dataOption.name }}\"\n        [ngClass]=\"{ 'd-block form-group': index === 2 }\"\n        name=\"{{ 'data-option' + dataOption.id }}\"\n        [attr.rx-id]=\"'data-option' + dataOption.id\"\n      ></adapt-rx-checkbox>\n\n      <adapt-rx-select\n        label=\"{{ 'com.bmc.arsys.rx.client.dataload.import.wizard.tabs.options.date-format.label' | translate }}\"\n        class=\"d-block mb-1\"\n        [(ngModel)]=\"currentSheetDataImportMapping.configurations.timeFormatOptions\"\n        [options]=\"dateTimeFormatOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [optionContentTemplate]=\"optionTemplate\"\n        name=\"dateFormat\"\n        rx-id=\"date-format\"\n      >\n      </adapt-rx-select>\n\n      <div class=\"text-tertiary\" *ngIf=\"timeFormatExample\">\n        {{ 'com.bmc.arsys.rx.client.common.example.label' | translate }}:\n        {{ timeFormatExample }}\n      </div>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</form>\n\n<ng-template #optionTemplate let-option>\n  <strong>{{ option.name }}</strong>\n\n  <div class=\"text-tertiary\">e.g. {{ option.example }}</div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep adapt-rx-radiobutton .radio{margin:8px 0}:host::ng-deep .dropdown-item{white-space:normal;word-break:break-all}adapt-rx-select,rx-definition-picker{max-width:400px}\n"], components: [{ type: i9.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i9.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i9.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i9.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i5.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i9.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i9.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i9.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i10.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i10.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i10.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataImportMappingStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-import-mapping-step',
                    templateUrl: './data-import-mapping-step.component.html',
                    styleUrls: ['./data-import-mapping-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DataImportService }, { type: i2.DataExportService }, { type: i3.RxRecordDefinitionCacheService }, { type: i0.ChangeDetectorRef }, { type: i4.RxModalService }, { type: i5.RxWizardModalComponent }, { type: i6.RxDefinitionNameService }, { type: i7.TranslateService }, { type: i8.RxAssociationDefinitionService }, { type: i6.RxNotificationService }]; }, propDecorators: { context: [{
                type: Input
            }], options: [{
                type: Input
            }], dataImportConfigurationForm: [{
                type: ViewChild,
                args: ['dataImportConfigurationForm']
            }] } });
//# sourceMappingURL=data-import-mapping-step.component.js.map