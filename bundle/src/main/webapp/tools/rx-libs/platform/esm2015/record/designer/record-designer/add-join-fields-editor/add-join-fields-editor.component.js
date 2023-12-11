import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { chain, cloneDeep, includes, intersection, map as _map, concat, get, orderBy } from 'lodash';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class AddJoinFieldsEditorComponent extends RxModalClass {
    constructor(translateService, rxGuidService, rxRecordDefinitionService, activeModalRef, rxDefinitionNameService, rxFieldDefinitionService, injector) {
        super(activeModalRef, injector);
        this.translateService = translateService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.activeModalRef = activeModalRef;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.injector = injector;
        this.notificationMessage = this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.notification.message');
        this.destroyed$ = new ReplaySubject(1);
        this.primaryRecordDefinitionName = this.activeModalRef.getData().primaryRecordDefinitionName;
        this.secondaryRecordDefinitionName = this.activeModalRef.getData().secondaryRecordDefinitionName;
        this.selectLabel = this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.label', {
            primaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(this.primaryRecordDefinitionName),
            secondaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(this.secondaryRecordDefinitionName)
        });
        this.addedPrimaryFields = this.activeModalRef
            .getData()
            .addedFields.filter((field) => !includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
            get(field, 'fieldMapping.source') === RX_RECORD_DEFINITION.sourceRecordTypes.primary);
        this.addedSecondaryFields = this.activeModalRef
            .getData()
            .addedFields.filter((field) => !includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, field.id) &&
            get(field, 'fieldMapping.source') === RX_RECORD_DEFINITION.sourceRecordTypes.secondary);
        this.primarySelectedFieldsFormControl = new FormControl([]);
        this.secondarySelectedFieldsFormControl = new FormControl([]);
        this.primarySelectedFields$ = this.primarySelectedFieldsFormControl.valueChanges.pipe(startWith([]), shareReplay(1));
        this.secondarySelectedFields$ = this.secondarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        this.primaryAvailableFields$ = this.rxRecordDefinitionService
            .get(this.primaryRecordDefinitionName, {}, true)
            .pipe(map((recordDefinition) => orderBy(this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.primary).filter((field) => !includes(_map(this.addedPrimaryFields, this.getSourceFieldId), this.getSourceFieldId(field))), ['name'], ['asc'])));
        this.secondaryAvailableFields$ = this.rxRecordDefinitionService
            .get(this.secondaryRecordDefinitionName, {}, true)
            .pipe(map((recordDefinition) => orderBy(this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.secondary).filter((field) => !includes(_map(this.addedSecondaryFields, this.getSourceFieldId), this.getSourceFieldId(field))), ['name'], ['asc'])));
        this.duplicateNames$ = combineLatest([this.primarySelectedFields$, this.secondarySelectedFields$]).pipe(map(([primarySelectedFields, secondarySelectedFields]) => {
            const selectedPrimaryFieldNames = [
                ..._map(primarySelectedFields, 'name'),
                ..._map(this.addedPrimaryFields, 'name')
            ];
            const selectedSecondaryFieldNames = [
                ..._map(secondarySelectedFields, 'name'),
                ..._map(this.addedSecondaryFields, 'name')
            ];
            return intersection(selectedPrimaryFieldNames, selectedSecondaryFieldNames).concat(intersection(_map(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields, 'name'), selectedPrimaryFieldNames.concat(selectedSecondaryFieldNames)));
        }), shareReplay(1));
        this.hasDuplicates$ = this.duplicateNames$.pipe(map((duplicateNames) => !!duplicateNames.length));
        this.selectedFields$ = combineLatest([
            this.primarySelectedFields$,
            this.secondarySelectedFields$,
            this.duplicateNames$
        ]).pipe(map(([primarySelectedFields, secondarySelectedFields, duplicateNames]) => {
            const nonRetainableFieldIds = chain(primarySelectedFields)
                .concat(secondarySelectedFields)
                .map('fieldMapping.sourceFieldId')
                .filter((fieldId, index, selectedFieldIds) => includes(selectedFieldIds, fieldId, index + 1))
                .value();
            return concat(primarySelectedFields, secondarySelectedFields)
                .filter((fieldDefinition) => this.rxFieldDefinitionService.isJoinedField(fieldDefinition))
                .map((fieldDefinition) => {
                const field = cloneDeep(fieldDefinition);
                if (includes(duplicateNames, field.name)) {
                    if (field.fieldMapping.source === RX_RECORD_DEFINITION.sourceRecordTypes.primary) {
                        field.name = `${field.name} - ${this.rxDefinitionNameService.getDisplayName(this.primaryRecordDefinitionName)}`;
                    }
                    else {
                        field.name = `${field.name} - ${this.rxDefinitionNameService.getDisplayName(this.secondaryRecordDefinitionName)}`;
                    }
                }
                if (!includes(nonRetainableFieldIds, field.fieldMapping.sourceFieldId)) {
                    field.customId = field.fieldMapping.sourceFieldId;
                }
                return field;
            });
        }), shareReplay(1));
        this.vm$ = combineLatest([
            this.primaryAvailableFields$,
            this.secondaryAvailableFields$,
            this.hasDuplicates$,
            this.selectedFields$
        ]).pipe(map(([primaryAvailableFields, secondaryAvailableFields, hasDuplicates, selectedFields]) => ({
            primaryAvailableFields,
            secondaryAvailableFields,
            hasDuplicates,
            selectedFields
        })));
        this.alertConfig = {
            content: this.notificationMessage,
            variant: 'info',
            type: 'inline',
            dismissible: false
        };
        this.selectTexts = {
            headerText: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.header.label'),
            numberOptionsText: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.fields.label'),
            checked: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.definition-properties.select.selected.label'),
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.selectedFields$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((selectedFields) => (this.selectedFields = selectedFields));
    }
    save() {
        this.activeModalRef.close(this.selectedFields);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    optionFormatter(field) {
        return field.name;
    }
    getSourceFieldId(field) {
        return field.fieldMapping.sourceFieldId;
    }
    getJoinFieldDefinitions(record, sourceType) {
        return _map(record === null || record === void 0 ? void 0 : record.fieldDefinitions, (fieldDefinition) => {
            const joinFieldDefinition = cloneDeep(fieldDefinition);
            joinFieldDefinition.fieldMapping = {
                resourceType: RX_RECORD_DEFINITION.joinFieldMapping,
                sourceFieldId: fieldDefinition.id,
                source: sourceType
            };
            joinFieldDefinition.id = this.rxGuidService.generate('rx-');
            // Join record should not carry forward FTS properties from primary and secondary record.
            if (joinFieldDefinition.searchDefinition) {
                joinFieldDefinition.searchDefinition = null;
            }
            delete joinFieldDefinition.lastUpdateTime;
            return joinFieldDefinition;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
AddJoinFieldsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddJoinFieldsEditorComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxGuidService }, { token: i3.RxRecordDefinitionService }, { token: i4.ActiveModalRef }, { token: i5.RxDefinitionNameService }, { token: i3.RxFieldDefinitionService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AddJoinFieldsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AddJoinFieldsEditorComponent, selector: "rx-add-join-fields-editor", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"modal-body d-flex flex-column mh-100\">\n    <div>\n      <adapt-alert *ngIf=\"vm.hasDuplicates\" class=\"mb-3\" [config]=\"alertConfig\"></adapt-alert>\n    </div>\n\n    <label>{{ selectLabel }}</label>\n\n    <div class=\"d-flex flex-row select-container\">\n      <adapt-rx-select\n        rx-id=\"primary-fields\"\n        class=\"d-flex flex-column h-100\"\n        *ngIf=\"vm.primaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.primaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"primarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.primary.label' | translate\"\n      >\n      </adapt-rx-select>\n\n      <adapt-rx-select\n        rx-id=\"secondary-fields\"\n        class=\"ml-3 d-flex flex-column h-100\"\n        *ngIf=\"vm.secondaryAvailableFields\"\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"vm.secondaryAvailableFields\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [texts]=\"selectTexts\"\n        [popupMaxHeight]=\"'100%'\"\n        [formControl]=\"secondarySelectedFieldsFormControl\"\n        enableFilter=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.record-designer.definition-properties.secondary.label' | translate\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      [disabled]=\"vm.selectedFields.length === 0\"\n      (click)=\"save()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button adapt-button type=\"button\" btn-type=\"secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;position:relative;height:100%}:host .modal-body{height:645px!important}:host ::ng-deep adapt-rx-select{width:100%;max-width:400px}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;height:625px}.select-container{overflow:auto}\n"], components: [{ type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i6.AsyncPipe, "translate": i1.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AddJoinFieldsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-add-join-fields-editor',
                    templateUrl: './add-join-fields-editor.component.html',
                    styleUrls: ['./add-join-fields-editor.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxGuidService }, { type: i3.RxRecordDefinitionService }, { type: i4.ActiveModalRef }, { type: i5.RxDefinitionNameService }, { type: i3.RxFieldDefinitionService }, { type: i0.Injector }]; } });
//# sourceMappingURL=add-join-fields-editor.component.js.map