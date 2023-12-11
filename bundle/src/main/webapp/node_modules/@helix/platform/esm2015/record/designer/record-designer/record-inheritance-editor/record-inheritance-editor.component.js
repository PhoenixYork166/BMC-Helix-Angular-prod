import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RxNotificationService } from '@helix/platform/shared/api';
import { forEach, includes, isEmpty, keys, map as _map, pick, remove, some, union } from 'lodash';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxFieldDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionPickerScope, RxDefinitionPickerType, ValueAccessor } from '@helix/platform/shared/components';
import { BehaviorSubject, combineLatest, iif, of, ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RxFieldDefinitionManagerService } from '../services/field-definition-manager.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RxGuidService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "../services/field-definition-manager.service";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
export class RecordInheritanceEditorComponent extends ValueAccessor {
    constructor(translateService, rxFieldDefinitionManagerService, rxRecordDefinitionCacheService, rxNotificationService, rxGuidService, rxFieldDefinitionService) {
        super();
        this.translateService = translateService;
        this.rxFieldDefinitionManagerService = rxFieldDefinitionManagerService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxNotificationService = rxNotificationService;
        this.rxGuidService = rxGuidService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.inheritanceDescriptor = {
            inheritingFrom: '',
            isInheritingRules: true,
            isInheritingFieldPermissions: true,
            isInheritingAssociations: true,
            isInheritingFieldAuditOptions: true
        };
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.record-to-inherit.label'),
            definitionType: RxDefinitionPickerType.InheritableRecord,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            }
        };
        this.destroyed$ = new ReplaySubject(1);
        this.isReadOnlySubject = new BehaviorSubject(false);
        this.isSharedInstanceStorageLockedSubject = new BehaviorSubject(true);
        this.inheritingFromSubject = new BehaviorSubject('');
        this.isMakeFinalDisabledSubject = new BehaviorSubject(false);
        this.isSharedInstanceStorageDisabled$ = combineLatest([
            this.isReadOnlySubject,
            this.isSharedInstanceStorageLockedSubject
        ]).pipe(map(([isReadOnly, isSharedInstanceStorage]) => isReadOnly || isSharedInstanceStorage));
        this.inheritFromRecordDefinition$ = this.inheritingFromSubject.pipe(switchMap((recordDefinitionName) => iif(() => Boolean(recordDefinitionName), this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName), of(null))), tap((recordDefinition) => {
            if (recordDefinition) {
                this.inheritFromRecordDefinition = recordDefinition;
                this.isInheritingCoreFields = false;
                if (recordDefinition.isSharedInstanceStorage) {
                    this.inheritanceOptions.isSharedInstanceStorage = true;
                    this.updateInheritanceOptions();
                    this.state.inheritCoreFieldsAutomatically = true;
                    this.isInheritingCoreFields = true;
                }
                else {
                    if (this.isNew) {
                        this.inheritanceOptions.isSharedInstanceStorage = false;
                    }
                    this.state.inheritCoreFieldsAutomatically = false;
                }
                this.inheritanceDescriptor.isInheritingRules = true;
                this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(recordDefinition);
                forEach(recordDefinition.securityLabels, function (securityLabel) {
                    securityLabel.inherited = true;
                });
                this.setValue();
            }
        }));
        this.isCoreFieldsOptionDisabled$ = combineLatest([this.isReadOnlySubject, this.inheritFromRecordDefinition$]).pipe(map(([isReadOnly, inheritingFromRecordDefinition]) => !this.inheritFrom ||
            isReadOnly ||
            this.state.inheritCoreFieldsAutomatically ||
            this.state.lockCoreFieldInheritanceOption));
        this.vm$ = combineLatest([
            this.isReadOnlySubject,
            this.isSharedInstanceStorageDisabled$,
            this.isMakeFinalDisabledSubject,
            this.isCoreFieldsOptionDisabled$
        ]).pipe(map(([isReadOnly, isSharedInstanceStorageDisabled, isMakeFinalDisabled, isCoreFieldsOptionDisabled]) => ({
            isReadOnly,
            isSharedInstanceStorageDisabled,
            isMakeFinalDisabled,
            isCoreFieldsOptionDisabled
        })));
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    updateInheritanceOptions() {
        this.isMakeFinalDisabledSubject.next(this.isReadOnlySubject.value ||
            (this.inheritanceOptions.isSharedInstanceStorage && !this.inheritingFromSubject.value));
        if (this.inheritanceOptions.isSharedInstanceStorage &&
            this.inheritanceOptions.isFinal &&
            !this.inheritFromRecordDefinition) {
            this.inheritanceOptions.isFinal = false;
        }
    }
    onInheritanceOptionsChange() {
        this.updateInheritanceOptions();
        this.setValue();
    }
    onInheritanceDescriptorChange() {
        if (this.inheritanceDescriptor.isInheritingFieldPermissions) {
            this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
        }
        this.setValue();
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    onRecordDefinitionNameChange(recordDefinitionName) {
        this.rxNotificationService.addInfoMessage(this.translateService.instant('com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherited-fields-remaining-info.message'));
        if (recordDefinitionName) {
            this.inheritingFromSubject.next(recordDefinitionName);
        }
        else {
            this.inheritedFieldDefinitions = [];
            this.setValue();
        }
    }
    onInheritCoreFieldsChange() {
        this.inheritedFieldDefinitions = this.getInheritedFieldDefinitions(this.inheritFromRecordDefinition);
        this.setValue();
    }
    getInheritedFieldDefinitions(recordDefinition) {
        var _a;
        const newFieldProperties = union(keys(this.rxFieldDefinitionManagerService.getNewFieldDefinitionModel(RX_RECORD_DEFINITION.resourceTypes.character, null)), [
            'isInherited',
            'anyUserAllowedToSubmit',
            'displayType',
            'explicitPermissions',
            'fieldMapping',
            'fieldTypeName',
            'maxLength',
            'maxSize',
            'maxValue',
            'minValue',
            'namedListDefinition',
            'optionNamesById',
            'optionLabelsById',
            'precision',
            'resourceType',
            'searchable',
            'shouldPersistEncrypted',
            'shouldPersistHashed',
            'tags',
            'version'
        ]);
        if ((_a = this.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.isInheritingFieldPermissions) {
            newFieldProperties.push('permissions');
        }
        const inheritedFieldDefinitions = _map(recordDefinition.fieldDefinitions, (fieldDefinition) => {
            fieldDefinition.isInherited = true;
            return Object.assign(Object.assign({}, pick(fieldDefinition, newFieldProperties)), { guid: this.rxGuidService.generate(), isCoreField: this.rxFieldDefinitionService.isCoreField(fieldDefinition), selectionFieldOptionProperties: fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                    ? {
                        defaultValue: null,
                        optionNamesById: fieldDefinition.optionNamesById,
                        optionLabelsById: fieldDefinition.optionLabelsById
                    }
                    : null });
        });
        if (!this.isInheritingCoreFields) {
            remove(inheritedFieldDefinitions, function (fieldDefinition) {
                return includes(RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
            });
        }
        return inheritedFieldDefinitions;
    }
    updateValues() {
        var _a;
        if (this.options) {
            const recordDefinition = this.options.recordDefinition;
            this.inheritanceOptions = Object.assign({}, recordDefinition.recordInheritanceSelector.inheritanceOptions);
            if (recordDefinition.recordInheritanceSelector.inheritanceDescriptor) {
                this.inheritanceDescriptor = Object.assign({}, recordDefinition.recordInheritanceSelector.inheritanceDescriptor);
                this.inheritFrom = this.inheritanceDescriptor.inheritingFrom;
            }
            this.isNew = !recordDefinition.lastUpdateTime;
            this.isReadOnlySubject.next(this.options.isReadOnly);
            this.isSharedInstanceStorageLockedSubject.next(!this.isNew || !isEmpty(this.inheritFrom));
            if ((_a = recordDefinition.inheritanceDescriptor) === null || _a === void 0 ? void 0 : _a.inheritingFrom) {
                this.isSharedInstanceStorageLockedSubject.next(true);
                this.rxRecordDefinitionCacheService
                    .getRecordDefinition(recordDefinition.inheritanceDescriptor.inheritingFrom)
                    .pipe(take(1))
                    .subscribe((inheritFromRecordDefinition) => {
                    if (inheritFromRecordDefinition.isSharedInstanceStorage) {
                        this.state.inheritCoreFieldsAutomatically = true;
                        this.isInheritingCoreFields = true;
                    }
                    else {
                        var fieldDefinitions = recordDefinition.fields;
                        this.isInheritingCoreFields = some(fieldDefinitions, function (fieldDefinition) {
                            return fieldDefinition.isInherited && includes(RX_RECORD_DEFINITION.arCoreFieldIds, fieldDefinition.id);
                        });
                    }
                });
            }
            this.state = {
                editMode: !this.isNew,
                inheritCoreFieldsAutomatically: false,
                lockCoreFieldInheritanceOption: !this.isNew
            };
        }
    }
    setValue() {
        this.value = {
            inheritanceOptions: this.inheritanceOptions,
            inheritanceDescriptor: this.inheritFrom
                ? Object.assign(Object.assign({}, this.inheritanceDescriptor), { inheritingFrom: this.inheritFrom }) : null,
            isInheritingCoreFields: this.inheritFrom ? this.isInheritingCoreFields : null,
            inheritedFieldDefinitions: this.inheritedFieldDefinitions
        };
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.isReadOnlySubject.complete();
        this.isSharedInstanceStorageLockedSubject.complete();
        this.inheritingFromSubject.complete();
        this.isMakeFinalDisabledSubject.complete();
    }
}
RecordInheritanceEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxFieldDefinitionManagerService }, { token: i3.RxRecordDefinitionCacheService }, { token: i4.RxNotificationService }, { token: i5.RxGuidService }, { token: i3.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
RecordInheritanceEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInheritanceEditorComponent, selector: "rx-record-inheritance-selector", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordInheritanceEditorComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <adapt-rx-checkbox\n    label=\"{{\n      'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.label' | translate\n    }}\"\n    [(ngModel)]=\"inheritanceOptions.isSharedInstanceStorage\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isSharedInstanceStorageDisabled\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content:\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.share-data-with-inheritors.tooltip'\n        | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isAbstract\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-abstract.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <adapt-rx-checkbox\n    label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.label' | translate }}\"\n    [(ngModel)]=\"inheritanceOptions.isFinal\"\n    (ngModelChange)=\"onInheritanceOptionsChange()\"\n    [disabled]=\"vm.isMakeFinalDisabled || vm.isReadOnly\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.make-final.tooltip' | translate,\n      placement: 'bottom',\n      popoverMode: true\n    }\"\n  >\n  </adapt-rx-checkbox>\n\n  <rx-definition-picker\n    class=\"form-group d-block\"\n    name=\"inherit-from\"\n    rx-id=\"record-definition-name-field\"\n    [options]=\"recordDefinitionPickerOptions\"\n    [(ngModel)]=\"inheritFrom\"\n    (ngModelChange)=\"onRecordDefinitionNameChange($event)\"\n    [disabled]=\"vm.isReadOnly\"\n  >\n  </rx-definition-picker>\n\n  <div *ngIf=\"inheritFrom\">\n    <label>\n      <span>{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.inherit.label' | translate }}</span>\n    </label>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.core-fields.label' | translate }}\"\n      [(ngModel)]=\"isInheritingCoreFields\"\n      (ngModelChange)=\"onInheritCoreFieldsChange()\"\n      [disabled]=\"vm.isCoreFieldsOptionDisabled\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.rules.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingRules\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.field-permissions.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldPermissions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.associations.label' | translate }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingAssociations\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n\n    <adapt-rx-checkbox\n      label=\"{{\n        'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.audit-field-properties.label' | translate\n      }}\"\n      [(ngModel)]=\"inheritanceDescriptor.isInheritingFieldAuditOptions\"\n      [disabled]=\"vm.isReadOnly\"\n      (ngModelChange)=\"onInheritanceDescriptorChange()\"\n    >\n    </adapt-rx-checkbox>\n  </div>\n</ng-container>\n", components: [{ type: i6.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i7.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i8.AsyncPipe, "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInheritanceEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-inheritance-selector',
                    templateUrl: './record-inheritance-editor.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordInheritanceEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxFieldDefinitionManagerService }, { type: i3.RxRecordDefinitionCacheService }, { type: i4.RxNotificationService }, { type: i5.RxGuidService }, { type: i3.RxFieldDefinitionService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-inheritance-editor.component.js.map