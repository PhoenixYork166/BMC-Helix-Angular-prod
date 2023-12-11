import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { chain, cloneDeep, concat, includes, intersection, map as _map } from 'lodash';
import { combineLatest, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, shareReplay, startWith, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
export class FieldSelectionStepComponent {
    constructor(rxWizardModalComponent, translateService, rxDefinitionNameService, rxFieldDefinitionService, rxGuidService, rxRecordDefinitionService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxGuidService = rxGuidService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.notificationMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.notification.message');
        this.destroyed$ = new ReplaySubject(1);
        this.alertConfig = {
            content: this.notificationMessage,
            variant: 'info',
            type: 'inline',
            dismissible: false
        };
        this.selectTexts = {
            headerText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.header'),
            numberOptionsText: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.fields.label'),
            checked: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.selected.label')
        };
        this.primarySelectedFieldsFormControl = new FormControl([]);
        this.secondarySelectedFieldsFormControl = new FormControl([]);
    }
    ngOnInit() {
        this.rxWizardModalComponent.api.enableFinishButton();
        const context$ = this.rxWizardModalComponent.context$.pipe(tap((context) => {
            if (!context.selectedFields) {
                this.primarySelectedFieldsFormControl.setValue([]);
                this.secondarySelectedFieldsFormControl.setValue([]);
            }
        }), shareReplay(1), takeUntil(this.destroyed$));
        const primaryRecordDefinitionName$ = context$.pipe(pluck('primaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), shareReplay(1));
        const secondaryRecordDefinitionName$ = context$.pipe(pluck('secondaryRecordDefinitionName'), distinctUntilChanged(), filter(Boolean), shareReplay(1));
        combineLatest([primaryRecordDefinitionName$, secondaryRecordDefinitionName$]).subscribe(([primaryRecordDefinitionName, secondaryRecordDefinitionName]) => {
            this.selectLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.select.label', {
                primaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName),
                secondaryRecordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName)
            });
        });
        this.primaryAvailableFields$ = primaryRecordDefinitionName$.pipe(switchMap((primaryRecordDefinitionName) => this.rxRecordDefinitionService.get(primaryRecordDefinitionName, {}, true)), map((recordDefinition) => this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.primary)));
        this.secondaryAvailableFields$ = secondaryRecordDefinitionName$.pipe(switchMap((secondaryRecordDefinitionName) => this.rxRecordDefinitionService.get(secondaryRecordDefinitionName, {}, true)), map((recordDefinition) => this.getJoinFieldDefinitions(recordDefinition, RX_RECORD_DEFINITION.sourceRecordTypes.secondary)));
        const primarySelectedFields$ = this.primarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        const secondarySelectedFields$ = this.secondarySelectedFieldsFormControl.valueChanges.pipe(startWith([]));
        const duplicateNames$ = combineLatest([primarySelectedFields$, secondarySelectedFields$]).pipe(map(([primarySelectedFields, secondarySelectedFields]) => {
            const selectedPrimaryFieldNames = _map(primarySelectedFields, 'name');
            const selectedSecondaryFieldNames = _map(secondarySelectedFields, 'name');
            return intersection(selectedPrimaryFieldNames, selectedSecondaryFieldNames).concat(intersection(_map(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields, 'name'), selectedPrimaryFieldNames.concat(selectedSecondaryFieldNames)));
        }), shareReplay(1));
        this.hasDuplicates$ = duplicateNames$.pipe(map((duplicateNames) => !!duplicateNames.length));
        combineLatest([primarySelectedFields$, secondarySelectedFields$])
            .pipe(withLatestFrom(duplicateNames$, primaryRecordDefinitionName$, secondaryRecordDefinitionName$), takeUntil(this.destroyed$))
            .subscribe(([[primarySelectedFields, secondarySelectedFields], duplicateNames, primaryRecordDefinitionName, secondaryRecordDefinitionName]) => {
            const nonRetainableFieldIds = chain(primarySelectedFields)
                .concat(secondarySelectedFields)
                .map('fieldMapping.sourceFieldId')
                .filter((fieldId, index, selectedFieldIds) => includes(selectedFieldIds, fieldId, index + 1))
                .union(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds)
                .value();
            const primaryRecordDisplayName = this.rxDefinitionNameService.getDisplayName(primaryRecordDefinitionName);
            const secondaryRecordDisplayName = this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinitionName);
            this.rxWizardModalComponent.api.updateContext({
                selectedFields: concat(primarySelectedFields, secondarySelectedFields)
                    .filter((fieldDefinition) => this.rxFieldDefinitionService.isJoinedField(fieldDefinition))
                    .map((fieldDefinition) => {
                    const field = cloneDeep(fieldDefinition);
                    if (includes(duplicateNames, field.name)) {
                        if (field.fieldMapping.source === RX_RECORD_DEFINITION.sourceRecordTypes.primary) {
                            field.name = `${field.name} - ${primaryRecordDisplayName}`;
                        }
                        else {
                            field.name = `${field.name} - ${secondaryRecordDisplayName}`;
                        }
                    }
                    if (!includes(nonRetainableFieldIds, field.fieldMapping.sourceFieldId)) {
                        field.customId = field.fieldMapping.sourceFieldId;
                    }
                    return field;
                })
                    .concat(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFields)
            });
        });
    }
    optionFormatter(field) {
        return field.name;
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
/** @nocollapse */ FieldSelectionStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.TranslateService }, { token: i3.RxDefinitionNameService }, { token: i4.RxFieldDefinitionService }, { token: i5.RxGuidService }, { token: i4.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ FieldSelectionStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldSelectionStepComponent, selector: "ax-field-selection-step", ngImport: i0, template: "<div class=\"d-flex flex-column mh-100\">\n  <div>\n    <adapt-alert *ngIf=\"hasDuplicates$ | async\" class=\"mb-3\" [config]=\"alertConfig\"></adapt-alert>\n  </div>\n\n  <label>{{ selectLabel }}</label>\n\n  <div class=\"d-flex flex-row select-container\">\n    <adapt-rx-select\n      class=\"d-flex flex-column h-100\"\n      *ngIf=\"primaryAvailableFields$ | async as primaryAvailableFields\"\n      [inline]=\"true\"\n      [multiple]=\"true\"\n      [options]=\"primaryAvailableFields\"\n      [optionFormatter]=\"optionFormatter\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [texts]=\"selectTexts\"\n      [popupMaxHeight]=\"'100%'\"\n      [formControl]=\"primarySelectedFieldsFormControl\"\n      [label]=\"'com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.primary-record.label' | translate\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"ml-4 d-flex flex-column h-100\"\n      *ngIf=\"secondaryAvailableFields$ | async as secondaryAvailableFields\"\n      [inline]=\"true\"\n      [multiple]=\"true\"\n      [options]=\"secondaryAvailableFields\"\n      [optionFormatter]=\"optionFormatter\"\n      [selectAllButton]=\"true\"\n      [deselectAllButton]=\"true\"\n      [texts]=\"selectTexts\"\n      [popupMaxHeight]=\"'100%'\"\n      [formControl]=\"secondarySelectedFieldsFormControl\"\n      [label]=\"\n        'com.bmc.arsys.rx.innovation-studio.join-record-wizard.field-selection.secondary-record.label' | translate\n      \"\n    >\n    </adapt-rx-select>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;position:relative;height:100%}:host ::ng-deep adapt-rx-select{width:100%;max-width:400px}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto;overflow:auto}.select-container{overflow:auto}\n"], components: [{ type: i6.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i6.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i7.AsyncPipe, "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldSelectionStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-field-selection-step',
                    templateUrl: './field-selection-step.component.html',
                    styleUrls: ['./field-selection-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.TranslateService }, { type: i3.RxDefinitionNameService }, { type: i4.RxFieldDefinitionService }, { type: i5.RxGuidService }, { type: i4.RxRecordDefinitionService }]; } });
//# sourceMappingURL=field-selection-step.component.js.map