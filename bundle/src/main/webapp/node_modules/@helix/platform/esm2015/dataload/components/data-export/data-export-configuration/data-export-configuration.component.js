import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { RX_DEFINITION_PICKER, RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { AdaptModalService, DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { DataExportFiltersExpressionConfigurator } from '../data-export-filters-expression-configurator';
import { DL_DATA_EXPORT } from '../data-export.constant';
import { ExpressionOperatorGroup, RxDefinitionNameService, RxNotificationService } from '@helix/platform/shared/api';
import { BehaviorSubject, iif, of, ReplaySubject } from 'rxjs';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService, RxRecordInstanceService } from '@helix/platform/record/api';
import { cloneDeep, forEach, map as _map, noop, some } from 'lodash';
import { ExportDataPreviewComponent } from '../export-data-preview/export-data-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class DataExportConfigurationComponent extends RxModalClass {
    constructor(rxFieldDefinitionService, rxRecordInstanceService, rxRecordDefinitionService, adaptModalService, rxNotificationService, rxExpressionEditorService, translateService, changeDetectorRef, definitionNameService, dockedPanelContext, injector) {
        super(dockedPanelContext, injector);
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.adaptModalService = adaptModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.translateService = translateService;
        this.changeDetectorRef = changeDetectorRef;
        this.definitionNameService = definitionNameService;
        this.dockedPanelContext = dockedPanelContext;
        this.injector = injector;
        this.index$ = new BehaviorSubject(null);
        this.recordDefinitionNames$ = [];
        this.definitionFields$ = [];
        this.destroyed$ = new ReplaySubject(1);
        this.exportConfiguration = {
            exportConfigName: null,
            exportConfigDescription: null,
            definitions: []
        };
        this.recordPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            },
            required: true
        };
        this.associationPickerOptions = {
            label: '',
            definitionType: RxDefinitionPickerType.Association,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RX_DEFINITION_PICKER.definitionScopes.all],
                search: RX_DEFINITION_PICKER.definitionScopes.all
            },
            required: true
        };
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
    }
    ngOnInit() {
        super.ngOnInit();
        this.expressionConfigurator = new DataExportFiltersExpressionConfigurator(this.injector);
        this.expressionConfigurator.configureForProperty({
            propertyPath: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
            dataDictionary$: this.index$.pipe(switchMap((index) => this.recordDefinitionNames$[index].pipe(switchMap((recordDefinitionName) => this.expressionConfigurator.geDataDefinitionField(this.exportConfiguration.definitions[index].type, recordDefinitionName))))),
            operators: this.expressionConfigurator.getOperatorRowsByGroup(ExpressionOperatorGroup.All)
        });
        this.dataFilterExpressionOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label'),
            dataDictionary$: this.expressionConfigurator.getDataDictionary(DL_DATA_EXPORT.associationDefinitionDataFilterProperty),
            operators: this.expressionConfigurator.getOperators(DL_DATA_EXPORT.associationDefinitionDataFilterProperty)
        };
    }
    addDefinition() {
        this.markAsDirty();
        const nextRowIndex = this.exportConfiguration.definitions.length;
        this.recordDefinitionNames$[nextRowIndex] = new BehaviorSubject(null);
        this.definitionFields$[nextRowIndex] = this.recordDefinitionNames$[nextRowIndex].pipe(takeUntil(this.destroyed$), switchMap((definitionName) => {
            return iif(() => definitionName && this.exportConfiguration.definitions[nextRowIndex].type === this.definitionTypes.record, this.rxRecordDefinitionService.get(definitionName), of({ fieldDefinitions: [] }));
        }), map((response) => {
            return response.fieldDefinitions
                .sort((a, b) => {
                if (this.rxFieldDefinitionService.isCoreField(a)) {
                    return -1;
                }
                if (this.rxFieldDefinitionService.isCoreField(b)) {
                    return 1;
                }
                if (a.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    return -1;
                }
                if (b.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                    return 1;
                }
                return Number(a.id) - Number(b.id);
            })
                .map((fieldDefinition, index) => ({
                name: fieldDefinition.name,
                id: fieldDefinition.id,
                disabled: fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required &&
                    fieldDefinition.defaultValue === null,
                visibleOnPreviewPriority: index
            }));
        }), tap((criteriaFields) => {
            this.exportConfiguration.definitions[nextRowIndex].criteria.fields = criteriaFields
                .filter((criteriaField) => criteriaField.disabled)
                .map((criteriaField) => (Object.assign({}, criteriaField)));
        }));
        this.exportConfiguration.definitions.push({
            type: 'record',
            name: null,
            criteria: {
                filter: null,
                fields: []
            }
        });
    }
    remove(index) {
        this.exportConfiguration.definitions.splice(index, 1);
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    onDefinitionChange(definitionName, rowIndex) {
        if (definitionName && !this.definitionNameService.getBundleId(definitionName)) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.dataload.global-record-not-allowed.message'));
            this.changeDetectorRef.detectChanges();
            this.exportConfiguration.definitions[rowIndex].name = null;
        }
        else {
            this.exportConfiguration.definitions[rowIndex].criteria.filter = null;
            this.index$.next(rowIndex);
            this.recordDefinitionNames$[rowIndex].next(definitionName);
        }
    }
    onExpressionEvent(rowIndex) {
        this.index$.next(rowIndex);
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: DL_DATA_EXPORT.associationDefinitionDataFilterProperty,
                value: this.exportConfiguration.definitions[rowIndex].criteria.filter,
                label: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.data-filters.label')
            },
            expressionConfigurator: this.expressionConfigurator,
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
            this.exportConfiguration.definitions[rowIndex].criteria.filter = expression.value || null;
        });
    }
    isSaveButtonDisabled() {
        return (this.isSaveInProgress ||
            !this.exportConfiguration.definitions.length ||
            some(this.exportConfiguration.definitions, (definition) => {
                return ((definition.type === this.definitionTypes.record &&
                    (!definition.name || !definition.criteria.fields.length)) ||
                    (definition.type === this.definitionTypes.association && !definition.name));
            }));
    }
    saveExportConfiguration() {
        this.isSaveInProgress = true;
        this.rxRecordInstanceService
            .getNew(DL_DATA_EXPORT.recordDefinitionName)
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.name, this.exportConfiguration.exportConfigName);
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configDescription, this.exportConfiguration.exportConfigDescription);
            recordInstance.setFieldValue(DL_DATA_EXPORT.fields.configurations, JSON.stringify({
                definitions: _map(cloneDeep(this.exportConfiguration.definitions), (definition) => {
                    definition.criteria.fields = _map(definition.criteria.fields, (field) => ({
                        id: field.id,
                        name: field.name
                    }));
                    return definition;
                })
            }));
            return this.rxRecordInstanceService.create(recordInstance);
        }), finalize(() => {
            this.isSaveInProgress = false;
        }))
            .subscribe(() => {
            this.dockedPanelContext.close(null);
        });
    }
    clearFieldsSelection(index) {
        this.exportConfiguration.definitions[index].name = null;
        this.exportConfiguration.definitions[index].criteria.filter = null;
        this.exportConfiguration.definitions[index].criteria.fields = [];
    }
    openExportingDataPreview(definition) {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label'),
            content: ExportDataPreviewComponent,
            size: 'lg',
            data: {
                definitionName: definition.name,
                selectedFields: definition.criteria.fields,
                queryFilter: definition.criteria.filter
            }
        })
            .catch(noop);
    }
    isPreviewDisabled(definition) {
        return !definition.name || !definition.criteria.fields.length;
    }
    ngOnDestroy() {
        forEach(this.recordDefinitionNames$, (name$) => name$.complete());
        this.index$.complete();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    optionFormatter(field) {
        return field.name;
    }
}
DataExportConfigurationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportConfigurationComponent, deps: [{ token: i1.RxFieldDefinitionService }, { token: i1.RxRecordInstanceService }, { token: i1.RxRecordDefinitionService }, { token: i2.AdaptModalService }, { token: i3.RxNotificationService }, { token: i4.RxExpressionEditorService }, { token: i5.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i3.RxDefinitionNameService }, { token: i2.DockedPanelContext }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
DataExportConfigurationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataExportConfigurationComponent, selector: "dl-data-export-configuration", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-name\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n    name=\"exportConfigName\"\n    [(ngModel)]=\"exportConfiguration.exportConfigName\"\n    [required]=\"true\"\n    maxlength=\"254\"\n    [autofocus]=\"true\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigName=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <adapt-rx-textfield\n    class=\"form-group d-block\"\n    rx-id=\"export-config-description\"\n    label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n    name=\"exportConfigDescription\"\n    [(ngModel)]=\"exportConfiguration.exportConfigDescription\"\n    maxlength=\"254\"\n    (ngModelChange)=\"markAsDirty()\"\n    #exportConfigDescription=\"ngModel\"\n  >\n  </adapt-rx-textfield>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0\"\n    rx-id=\"add-definition-button\"\n    (click)=\"addDefinition()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.add-definition-button.label' | translate }}\n  </button>\n\n  <adapt-accordion [multiselect]=\"true\">\n    <div\n      *ngFor=\"let definition of exportConfiguration.definitions; let $index = index\"\n      class=\"position-relative form-group\"\n    >\n      <span class=\"actions\">\n        <button\n          class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n          adapt-button\n          size=\"small\"\n          type=\"button\"\n          (click)=\"remove($index)\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n        </button>\n      </span>\n\n      <adapt-accordion-tab class=\"w-100 d-block\" isOpen=\"true\">\n        <adapt-rx-radiobutton-group\n          [(ngModel)]=\"definition.type\"\n          label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.definition.label' | translate }}\"\n          [required]=\"true\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let definitionType of definitionTypeOptions; let index = index\"\n            class=\"radio-inline m-0\"\n            [value]=\"definitionType.value\"\n            [label]=\"definitionType.displayValue\"\n            [ngClass]=\"{ 'mr-3': index === 0 }\"\n            (checkedChange)=\"clearFieldsSelection($index)\"\n          ></adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.record\"\n          [options]=\"recordPickerOptions\"\n          rx-id=\"record-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          *ngIf=\"definition.type === definitionTypes.association\"\n          [options]=\"associationPickerOptions\"\n          rx-id=\"association-definition-picker\"\n          [(ngModel)]=\"definition.name\"\n          (ngModelChange)=\"onDefinitionChange($event, $index)\"\n        >\n        </rx-definition-picker>\n\n        <div [hidden]=\"!definition.name\">\n          <div *ngIf=\"definitionFields$[$index] | async as options\">\n            <adapt-rx-select\n              class=\"d-block form-group\"\n              [(ngModel)]=\"definition.criteria.fields\"\n              *ngIf=\"definition.type === definitionTypes.record\"\n              label=\"{{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.fields.label' | translate }}\"\n              [options]=\"options\"\n              [required]=\"true\"\n              [multiple]=\"true\"\n              [enableFilter]=\"true\"\n              [selectAllButton]=\"true\"\n              [deselectAllButton]=\"true\"\n              [optionFormatter]=\"optionFormatter\"\n              [attr.rx-id]=\"'definition-' + $index + '_fields'\"\n            >\n            </adapt-rx-select>\n          </div>\n\n          <rx-expression-form-control\n            class=\"d-block form-group\"\n            rx-id=\"data-filter\"\n            [options]=\"dataFilterExpressionOptions\"\n            [(ngModel)]=\"definition.criteria.filter\"\n            (events)=\"onExpressionEvent($index)\"\n          ></rx-expression-form-control>\n\n          <button\n            type=\"button\"\n            adapt-button\n            btn-type=\"secondary\"\n            rx-id=\"preview-button\"\n            (click)=\"openExportingDataPreview(definition)\"\n            *ngIf=\"definition.type === definitionTypes.record\"\n            [disabled]=\"isPreviewDisabled(definition)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.dataload.export.new-configuration.preview-data.label' | translate }}\n          </button>\n        </div>\n      </adapt-accordion-tab>\n    </div>\n  </adapt-accordion>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [adaptInlineLoader]=\"isSaveInProgress\"\n    [disabled]=\"exportConfigName.invalid || exportConfigDescription.invalid || isSaveButtonDisabled()\"\n    (click)=\"saveExportConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [".actions{position:absolute;top:4px;right:35px;z-index:1}\n"], components: [{ type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i2.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i6.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i5.TranslatePipe, "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataExportConfigurationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'dl-data-export-configuration',
                    templateUrl: './data-export-configuration.component.html',
                    styleUrls: ['./data-export-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFieldDefinitionService }, { type: i1.RxRecordInstanceService }, { type: i1.RxRecordDefinitionService }, { type: i2.AdaptModalService }, { type: i3.RxNotificationService }, { type: i4.RxExpressionEditorService }, { type: i5.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i3.RxDefinitionNameService }, { type: i2.DockedPanelContext }, { type: i0.Injector }]; } });
//# sourceMappingURL=data-export-configuration.component.js.map