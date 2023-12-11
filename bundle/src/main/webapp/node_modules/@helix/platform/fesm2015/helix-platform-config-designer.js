import * as i9$1 from '@helix/platform/config/api';
import { ShowInLocationOptions, ImpactRowVisibility } from '@helix/platform/config/api';
import * as i10 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import * as i6$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i7 from '@bmc-ux/adapt-angular';
import { AdaptSidebarComponent, DismissReasons, AdaptAccordionModule, AdaptButtonModule, AdaptDropdownModule, AdaptRxTextfieldModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptAlertModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptBusyModule, AdaptRxCounterModule, AdaptCodeViewerModule, AdaptSidebarModule, AdaptRxListBuilderModule } from '@bmc-ux/adapt-angular';
import * as i9 from '@bmc-ux/adapt-table';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RX_RECORD_DEFINITION, RxRecordDefinitionResourceTypePipeModule } from '@helix/platform/record/api';
import * as i2 from '@helix/platform/shared/api';
import { RX_PERMISSION, RxDefinitionModule, RX_APPLICATION } from '@helix/platform/shared/api';
import * as i6 from '@helix/platform/shared/components';
import { TextFormControlComponent, SelectFormControlComponent, SwitchFormControlComponent, CounterFormControlComponent, ColorPickerFormControlComponent, DateFormControlComponent, SelectionFieldOptionsComponent, LabelFormControlComponent, BooleanFormControlComponent, RxPermissionEditorComponent, FormControlsModule, RxDesignerHeaderModule, RxFormBuilderModule, RxDefinitionPickerModule, ExpressionFormControlModule } from '@helix/platform/shared/components';
import * as i4$1 from '@helix/platform/ui-kit';
import { ValidationIssueType, RxModalClass, RX_MODAL, RxBladeModule, RxValidationIssuesModule, RxJsonViewerModule, RxLineLoaderModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import * as i4 from '@ngx-translate/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i1$1 from '@ngrx/store';
import { createAction, props, createFeatureSelector, createSelector, createReducer, on, StoreModule } from '@ngrx/store';
import { isNil, trim, isEmpty, some, toUpper, find, isNull, chain, filter, uniqBy, reverse, cloneDeep, findIndex, remove, reject, noop } from 'lodash';
import { ReplaySubject, Subject, combineLatest, of, from } from 'rxjs';
import { switchMap, map, startWith, shareReplay, withLatestFrom, skip, takeUntil, take, filter as filter$1, catchError, tap } from 'rxjs/operators';
import * as i1 from '@helix/platform/utils';
import { RX_NUMBER } from '@helix/platform/utils';
import * as i2$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { ComponentStore } from '@ngrx/component-store';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import * as i1$2 from '@angular/router';

const RX_CONFIG_DESIGNER = {
    featureSelector: 'configDesigner',
    settingAccessOptions: {
        application: {
            label: 'Application',
            value: ShowInLocationOptions.Application
        },
        innovationStudio: {
            label: 'Innovation Studio',
            value: ShowInLocationOptions.InnovationStudio
        },
        both: {
            value: ShowInLocationOptions.Both
        },
        none: {
            value: ShowInLocationOptions.None
        }
    },
    dataTypes: {
        attachment: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.attachment.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.AttachmentFieldDefinition'
        },
        color: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.color.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.ColorChooserFieldDefinition'
        },
        secure: {
            labelKey: 'com.bmc.arsys.rx.client.common.data-types.secure.label',
            resourceType: 'com.bmc.arsys.rx.admin-settings.SecureDataFieldDefinition'
        }
    }
};

class ConfigDesignerService {
    getDefinitionFromDefinitionModel(model) {
        return {
            componentName: model.componentName,
            showInLocation: model.isSettingAccessibleInApplication && model.isSettingAccessibleInInnovationStudio
                ? RX_CONFIG_DESIGNER.settingAccessOptions.both.value
                : model.isSettingAccessibleInApplication
                    ? RX_CONFIG_DESIGNER.settingAccessOptions.application.value
                    : model.isSettingAccessibleInInnovationStudio
                        ? RX_CONFIG_DESIGNER.settingAccessOptions.innovationStudio.value
                        : RX_CONFIG_DESIGNER.settingAccessOptions.none.value,
            supportsMultiple: model.supportsMultiple,
            parentComponentName: model.parentComponentName,
            impactRowVisibility: isNil(model.parentComponentName) && model.supportsMultiple
                ? model.impactRowVisibility
                : ImpactRowVisibility.None,
            permissions: model.permissions,
            registeredModuleName: model.registeredModuleName,
            viewComponent: model.viewComponent,
            externalLink: model.externalLink,
            viewToOpen: model.viewToOpen,
            localeList: [
                {
                    componentLabel: model.componentLabel,
                    firstMenu: isNil(model.parentComponentName) &&
                        (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                        ? model.firstMenu
                        : null,
                    secondMenu: isNil(model.parentComponentName) &&
                        (model.isSettingAccessibleInApplication || model.isSettingAccessibleInInnovationStudio)
                        ? model.secondMenu
                        : null,
                    locale: 'en-US'
                }
            ],
            settingMetaData: model.fields.map((field) => {
                var _a, _b;
                return ({
                    dataType: field.dataType,
                    defaultValue: field.dataType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                        ? field.selectionFieldOptionProperties.defaultValue
                        : field.defaultValue,
                    minValue: field.minValue,
                    maxValue: field.maxValue,
                    fieldOrder: field.fieldOrder,
                    id: field.id,
                    keySetting: field.keySetting,
                    required: field.required,
                    optionNamesById: (_a = field.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById,
                    optionLabelsById: (_b = field.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionLabelsById,
                    localeList: [
                        Object.assign(Object.assign({}, field.localeList[0]), { settingLabel: field.settingLabel })
                    ]
                });
            })
        };
    }
}
ConfigDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfigDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BaseFieldDefinitionService {
    constructor(injector) {
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.defaultFieldGroupName = this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label');
    }
    getNewFieldDefinitionModel(fieldProperties) {
        return Object.assign({ dataType: this.dataType, required: false, defaultValue: null, localeList: [
                {
                    locale: 'en',
                    fieldGrouping: this.defaultFieldGroupName,
                    settingLabel: fieldProperties.id
                }
            ] }, fieldProperties);
    }
    getFieldInspectorConfig(options) {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'id',
                        component: TextFormControlComponent,
                        isDisabled: !options.isNew,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'settingLabel',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label'),
                            required: true
                        }
                    },
                    {
                        name: 'dataType',
                        component: SelectFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                            options: [
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.character.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey)
                                },
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.color.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey)
                                },
                                {
                                    id: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType,
                                    name: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey)
                                },
                                {
                                    id: RX_RECORD_DEFINITION.dataTypes.selection.resourceType,
                                    name: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey)
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.details.label'),
                controls: [
                    {
                        name: 'required',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.required-field.label')
                        }
                    },
                    {
                        name: 'keySetting',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.key-field.label')
                        }
                    }
                ]
            }
        ];
    }
    validate(fieldModel) {
        const validationIssues = [];
        if (!trim(fieldModel.id)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label')
                }),
                data: {
                    propertyName: 'id',
                    guid: fieldModel.guid
                }
            });
        }
        if (!trim(fieldModel.settingLabel)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.field-label.label')
                }),
                data: {
                    propertyName: 'settingLabel',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}

class AttachmentFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Removed 'Key field for repeated setting' control from Details section
        inspectorConfig[1].controls.pop();
        // Adding controls specific to attachment field to Details section
        inspectorConfig[1].controls.push({
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.max-file-size.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        });
        return inspectorConfig;
    }
}
AttachmentFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
AttachmentFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class BooleanFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.boolean.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to boolean field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'defaultValue',
            component: SelectFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                emptyOption: true,
                options: [
                    {
                        id: 'true',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.true')
                    },
                    {
                        id: 'false',
                        name: this.translateService.instant('com.bmc.arsys.rx.client.common.false')
                    }
                ]
            }
        });
        return inspectorConfig;
    }
}
BooleanFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
BooleanFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class CharacterFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.dataType = RX_RECORD_DEFINITION.dataTypes.character.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to character field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        }, {
            name: 'defaultValue',
            component: TextFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel) {
        const validationIssues = super.validate(fieldModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) && Number(fieldModel.minValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) && Number(fieldModel.maxValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
CharacterFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
CharacterFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CharacterFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });

class ColorFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_CONFIG_DESIGNER.dataTypes.color.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to color field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'defaultValue',
            component: ColorPickerFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
ColorFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
ColorFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class DateOnlyFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to date only field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'defaultValue',
            component: DateFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
DateOnlyFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
DateOnlyFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateOnlyFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class NumericFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    validate(fieldModel) {
        const validationIssues = super.validate(fieldModel);
        if (fieldModel.minValue && Number(fieldModel.minValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) < this.minValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.minValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.defaultValue && Number(fieldModel.defaultValue) > this.maxValue) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.maxValue
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            Number(fieldModel.defaultValue) >= this.minValue &&
            Number(fieldModel.defaultValue) < Number(fieldModel.minValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-small-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    minValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.defaultValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.defaultValue) <= this.maxValue &&
            Number(fieldModel.defaultValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'defaultValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
NumericFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NumericFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
NumericFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NumericFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NumericFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });

class DecimalFieldDefinitionService extends NumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.decimal.resourceType;
        this.minValue = RX_NUMBER.minDecimal;
        this.maxValue = RX_NUMBER.maxDecimal;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to decimal field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        }, {
            name: 'defaultValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                minValue: RX_NUMBER.minDecimal,
                maxValue: RX_NUMBER.maxDecimal
            }
        });
        return inspectorConfig;
    }
}
DecimalFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DecimalFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DecimalFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class IntegerFieldDefinitionService extends NumericFieldDefinitionService {
    constructor() {
        super(...arguments);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.integer.resourceType;
        this.minValue = RX_NUMBER.minInteger;
        this.maxValue = RX_NUMBER.maxInteger;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Adding controls specific to integer field to Details section
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-min-value.label'),
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                allowIntegerOnly: true
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.designer.field-properties.integer-max-value.label'),
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                allowIntegerOnly: true
            }
        }, {
            name: 'defaultValue',
            component: CounterFormControlComponent,
            options: {
                allowIntegerOnly: true,
                minValue: RX_NUMBER.minInteger,
                maxValue: RX_NUMBER.maxInteger,
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label')
            }
        });
        return inspectorConfig;
    }
}
IntegerFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
IntegerFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IntegerFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class SecureFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector, rxNumberUtilsService) {
        super(injector);
        this.rxNumberUtilsService = rxNumberUtilsService;
        this.dataType = RX_CONFIG_DESIGNER.dataTypes.secure.resourceType;
    }
    getFieldInspectorConfig(options) {
        const inspectorConfig = super.getFieldInspectorConfig(options);
        // Removed 'Key field for repeated setting' control from Details section
        inspectorConfig[1].controls.pop();
        // Adding controls specific to secure field to Details section
        inspectorConfig[1].controls.splice(inspectorConfig[1].controls.length, 0, {
            name: 'minValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        }, {
            name: 'maxValue',
            component: CounterFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                allowIntegerOnly: true,
                minValue: 0,
                maxValue: RX_NUMBER.maxInteger
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel) {
        const validationIssues = super.validate(fieldModel);
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) && Number(fieldModel.minValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-min-length-error.message'),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) && Number(fieldModel.maxValue) < 0) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-max-length-error.message'),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.minValue && Number(fieldModel.minValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (fieldModel.maxValue && Number(fieldModel.maxValue) > RX_NUMBER.maxInteger) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label'),
                    maxValue: RX_NUMBER.maxInteger
                }),
                data: {
                    propertyName: 'maxValue',
                    guid: fieldModel.guid
                }
            });
        }
        if (this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.minValue) &&
            this.rxNumberUtilsService.isFiniteOrNumberString(fieldModel.maxValue) &&
            Number(fieldModel.minValue) > Number(fieldModel.maxValue)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.value-is-too-large-error.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.min-length.label'),
                    maxValue: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.max-length.label')
                }),
                data: {
                    propertyName: 'minValue',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
SecureFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SecureFieldDefinitionService, deps: [{ token: i0.Injector }, { token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
SecureFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SecureFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SecureFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxNumberUtilsService }]; } });

class SelectionFieldDefinitionService extends BaseFieldDefinitionService {
    constructor(injector) {
        super(injector);
        this.dataType = RX_RECORD_DEFINITION.dataTypes.selection.resourceType;
    }
    getFieldInspectorConfig(options) {
        var _a, _b, _c;
        const inspectorConfig = super.getFieldInspectorConfig(options);
        inspectorConfig[1].controls.splice(1, 0, {
            name: 'selectionFieldOptionProperties',
            component: SelectionFieldOptionsComponent,
            options: {
                defaultValue: (_a = options.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.defaultValue,
                optionNamesById: (_b = options.selectionFieldOptionProperties) === null || _b === void 0 ? void 0 : _b.optionNamesById,
                optionLabelsById: (_c = options.selectionFieldOptionProperties) === null || _c === void 0 ? void 0 : _c.optionLabelsById
            }
        });
        return inspectorConfig;
    }
    validate(fieldModel) {
        var _a;
        const validationIssues = super.validate(fieldModel);
        if (isEmpty((_a = fieldModel.selectionFieldOptionProperties) === null || _a === void 0 ? void 0 : _a.optionNamesById)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.options.label') }),
                data: {
                    propertyName: 'selectionFieldOptionProperties',
                    guid: fieldModel.guid
                }
            });
        }
        return validationIssues;
    }
}
SelectionFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
SelectionFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class FieldDefinitionManagerService {
    constructor(attachmentFieldDefinitionService, booleanFieldDefinitionService, characterFieldDefinitionService, colorFieldDefinitionService, dateOnlyFieldDefinitionService, decimalFieldDefinitionService, integerFieldDefinitionService, secureFieldDefinitionService, selectionFieldDefinitionService) {
        this.fieldServices = new Map();
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType, attachmentFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, booleanFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.character.resourceType, characterFieldDefinitionService);
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.color.resourceType, colorFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType, dateOnlyFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.decimal.resourceType, decimalFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.integer.resourceType, integerFieldDefinitionService);
        this.fieldServices.set(RX_CONFIG_DESIGNER.dataTypes.secure.resourceType, secureFieldDefinitionService);
        this.fieldServices.set(RX_RECORD_DEFINITION.dataTypes.selection.resourceType, selectionFieldDefinitionService);
    }
    getNewFieldDefinitionModel(resourceType, fieldProperties) {
        return this.fieldServices.get(resourceType).getNewFieldDefinitionModel(fieldProperties);
    }
    getFieldInspectorConfig(resourceType, options) {
        return this.fieldServices.get(resourceType).getFieldInspectorConfig(options);
    }
    validate(fieldModel) {
        return this.fieldServices.get(fieldModel.dataType).validate(fieldModel);
    }
}
FieldDefinitionManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, deps: [{ token: AttachmentFieldDefinitionService }, { token: BooleanFieldDefinitionService }, { token: CharacterFieldDefinitionService }, { token: ColorFieldDefinitionService }, { token: DateOnlyFieldDefinitionService }, { token: DecimalFieldDefinitionService }, { token: IntegerFieldDefinitionService }, { token: SecureFieldDefinitionService }, { token: SelectionFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
FieldDefinitionManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldDefinitionManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: AttachmentFieldDefinitionService }, { type: BooleanFieldDefinitionService }, { type: CharacterFieldDefinitionService }, { type: ColorFieldDefinitionService }, { type: DateOnlyFieldDefinitionService }, { type: DecimalFieldDefinitionService }, { type: IntegerFieldDefinitionService }, { type: SecureFieldDefinitionService }, { type: SelectionFieldDefinitionService }]; } });

const init = createAction('[Config Designer] Init', props());
const loadParentComponents = createAction('[Config Designer] Load Parent Components');
const loadParentComponentsSuccess = createAction('[Config Designer] Load Parent Components Success', props());
const loadDefinition = createAction('[Config Designer] Load Definition');
const loadDefinitionSuccess = createAction('[Config Designer] Load Definition Success', props());
const initDefinitionModel = createAction('[Config Designer] Init Definition Model', props());
const markDesignerPristine = createAction('[Config Designer] Mark Designer Pristine');
const markDesignerDirty = createAction('[Config Designer] Mark Designer Dirty');
const updateDefinitionModelFromDesigner = createAction('[Config Designer] Update Definition Model From Designer', props());
const updateSelectedFieldModel = createAction('[Config Designer] Update Selected Field Model', props());
const createNewFieldModel = createAction('[Config Designer] Create New Field Model', props());
const addFieldModel = createAction('[Config Designer] Add Field Model', props());
const clearSelectedFieldGuid = createAction('[Config Designer] Clear Selected Field GUID');
const setSelectedFieldGuid = createAction('[Config Designer] Set Selected Field GUID', props());
const deleteSelectedField = createAction('[Config Designer] Delete Selected Field');
const deleteSelectedFieldSuccess = createAction('[Config Designer] Delete Selected Field Success');
const toggleDesignMode = createAction('[Config Designer] Toggle Design Mode');
const editFieldGroups = createAction('[Config Designer] Edit Field Groups');
const setInspectorTabIndex = createAction('[Config Designer] Set Inspector Tab Index', props());
const saveDefinition = createAction('[Config Designer] Save Definition');
const updateDefinition = createAction('[Config Designer] Update Definition', props());
const saveDefinitionSuccess = createAction('[Config Designer] Save Definition Success', props());
const saveDefinitionError = createAction('[Config Designer] Save Definition Error');
const destroy = createAction('[Config Designer] Destroy');

const configDesignerStateSelector = createFeatureSelector(RX_CONFIG_DESIGNER.featureSelector);
const configDesignerModelSelector = createSelector(configDesignerStateSelector, (configDesignerState) => configDesignerState.model);
const bundleIdSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.bundleId);
const definitionNameSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionName);
const isDesignModeSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.isDesignMode);
const inspectorTabIndexSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.inspectorTabIndex);
const parentComponentsSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.parentComponents);
const selectedFieldGuidSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.selectedFieldGuid);
const definitionModelFromDefinitionSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionModelFromDefinition);
const definitionModelSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.definitionModel);
const isDirtySelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.isDirty);
const savedDefinitionNameSelector = createSelector(configDesignerModelSelector, (configDesignerModel) => configDesignerModel.savedDefinitionName);

class ConfigDesignerComponent {
    constructor(store$, configDesignerService, rxGlobalCacheService, translateService, rxDefinitionNameService, fieldDefinitionManagerService) {
        this.store$ = store$;
        this.configDesignerService = configDesignerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.fieldDefinitionManagerService = fieldDefinitionManagerService;
        this.definitionSaved = new EventEmitter();
        this.definitionErrorLoading = new EventEmitter();
        this.closeDesigner = new EventEmitter();
        this.newTitle = `<${this.translateService.instant('com.bmc.arsys.rx.client.config-designer.new-configuration.title')}>`;
        this.dataTypes = [
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.attachment.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.attachment.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.boolean.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
            },
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.color.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.color.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.character.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.dateOnly.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.dateOnly.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.integer.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.integer.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.selection.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.selection.resourceType
            },
            {
                displayName: this.translateService.instant(RX_RECORD_DEFINITION.dataTypes.decimal.labelKey),
                dataType: RX_RECORD_DEFINITION.dataTypes.decimal.resourceType
            },
            {
                displayName: this.translateService.instant(RX_CONFIG_DESIGNER.dataTypes.secure.labelKey),
                dataType: RX_CONFIG_DESIGNER.dataTypes.secure.resourceType
            }
        ].sort((a, b) => a.displayName.localeCompare(b.displayName));
        this.trueLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.true');
        this.falseLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.false');
        this.yesLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label');
        this.noLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.no.label');
        this.destroyed$ = new ReplaySubject(1);
        this.isApplication$ = this.store$.select(bundleIdSelector).pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), map((bundleDescriptor) => bundleDescriptor.isApplication));
        this.inspectorTabIndexSubject = new Subject();
        this.inspectorTabIndex$ = this.store$.select(inspectorTabIndexSelector);
        this.selectedFieldGuid$ = this.store$.select(selectedFieldGuidSelector);
        this.parentComponents$ = this.store$.select(parentComponentsSelector);
        this.isDirty$ = this.store$.select(isDirtySelector);
        this.bundleFriendlyName$ = this.store$
            .select(bundleIdSelector)
            .pipe(switchMap((bundleId) => this.rxGlobalCacheService.getBundleFriendlyName(bundleId)));
        this.definitionModel$ = this.store$.select(definitionModelSelector);
        this.definitionDisplayName$ = this.definitionModel$.pipe(map((definitionModel) => definitionModel.componentName), startWith(null));
        this.validationIssues$ = this.definitionModel$.pipe(map((definitionModel) => this.validate(definitionModel)), shareReplay(1));
        this.hasValidationErrors$ = this.validationIssues$.pipe(map((issueSections) => some(issueSections, {
            issues: [{ type: ValidationIssueType.Error }]
        })));
        this.isSaveButtonDisabled$ = combineLatest([this.hasValidationErrors$, this.isDirty$]).pipe(map(([hasValidationErrors, isDirty]) => hasValidationErrors || !isDirty), startWith(true));
        this.definitionInspectorConfig$ = combineLatest([
            this.parentComponents$,
            this.bundleFriendlyName$,
            this.isApplication$,
            this.definitionModel$
        ]).pipe(map(([parentComponents, bundleFriendlyName, isApplication, definitionModel]) => this.getDefinitionInspectorConfig(parentComponents, bundleFriendlyName, isApplication, definitionModel)));
        this.inspectorFocusEditorSubject = new Subject();
        this.inspectorFocusEditor$ = this.inspectorFocusEditorSubject.asObservable();
        this.fieldGridRows$ = this.definitionModel$.pipe(map((model) => model.fields.map((field) => {
            var _a, _b;
            return ({
                id: field.id,
                guid: field.guid,
                required: field.required ? this.yesLabel : this.noLabel,
                defaultValue: field.dataType === RX_RECORD_DEFINITION.dataTypes.boolean.resourceType
                    ? this.getBooleanDisplayValue(field.defaultValue)
                    : field.dataType === RX_CONFIG_DESIGNER.dataTypes.color.resourceType
                        ? toUpper(field.defaultValue)
                        : field.dataType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                            ? (_a = field.selectionFieldOptionProperties.optionNamesById) === null || _a === void 0 ? void 0 : _a[field.selectionFieldOptionProperties.defaultValue]
                            : field.defaultValue,
                keySetting: field.keySetting ? this.yesLabel : this.noLabel,
                dataType: this.getDataTypeName(field.dataType),
                fieldGrouping: (_b = field.localeList[0]) === null || _b === void 0 ? void 0 : _b.fieldGrouping
            });
        })));
        this.selectedFieldGridRows$ = this.selectedFieldGuid$.pipe(withLatestFrom(this.fieldGridRows$), map(([guid, fieldGridRows]) => (guid ? [find(fieldGridRows, { guid })] : [])), startWith([]));
        this.selectedFieldModel$ = combineLatest([
            this.selectedFieldGuid$,
            this.definitionModel$
        ]).pipe(map(([guid, definitionModel]) => find(definitionModel.fields, { guid })), startWith(null), shareReplay(1));
        this.selectedFieldInspectorConfig$ = this.selectedFieldModel$.pipe(map((fieldModel) => fieldModel
            ? this.fieldDefinitionManagerService.getFieldInspectorConfig(fieldModel.dataType, {
                isNew: fieldModel.isNew,
                selectionFieldOptionProperties: fieldModel.selectionFieldOptionProperties
            })
            : null));
        this.breadcrumbItems$ = combineLatest([
            this.definitionDisplayName$,
            this.selectedFieldModel$
        ]).pipe(map(([definitionDisplayName, selectedFieldModel]) => [
            {
                data: null,
                label: this.rxDefinitionNameService.getDisplayName(this.configuration.definitionName) ||
                    definitionDisplayName ||
                    this.newTitle
            },
            { data: null, label: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.id }
        ].filter((item) => item.label)));
        this.definitionFromDefinitionModel$ = this.definitionModel$.pipe(map((definitionModel) => this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel)));
        this.isDesignMode$ = this.store$.select(isDesignModeSelector);
        this.definitionForJsonViewer$ = this.isDesignMode$.pipe(switchMap((isDesignMode) => (isDesignMode ? of(null) : this.definitionFromDefinitionModel$)));
        this.vm$ = combineLatest([
            this.breadcrumbItems$,
            this.bundleFriendlyName$,
            this.definitionDisplayName$,
            this.definitionForJsonViewer$,
            this.definitionInspectorConfig$,
            this.definitionModel$,
            this.fieldGridRows$,
            this.hasValidationErrors$,
            this.isSaveButtonDisabled$,
            this.selectedFieldGridRows$,
            this.selectedFieldGuid$,
            this.selectedFieldInspectorConfig$,
            this.selectedFieldModel$,
            this.validationIssues$
        ]).pipe(map(([breadcrumbItems, bundleFriendlyName, definitionDisplayName, definitionForJsonViewer, definitionInspectorConfig, definitionModel, fieldGridRows, hasValidationErrors, isSaveButtonDisabled, selectedFieldGridRows, selectedFieldGuid, selectedFieldInspectorConfig, selectedFieldModel, validationIssues]) => ({
            breadcrumbItems,
            bundleFriendlyName,
            definitionDisplayName,
            definitionForJsonViewer,
            definitionInspectorConfig,
            definitionModel,
            fieldGridRows,
            hasValidationErrors,
            isSaveButtonDisabled,
            selectedFieldGridRows,
            selectedFieldGuid,
            selectedFieldInspectorConfig,
            selectedFieldModel,
            validationIssues
        })));
        this.columns = [
            {
                field: 'id',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label'),
                filterable: false
            },
            {
                field: 'dataType',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.data-type.label'),
                filterable: false
            },
            {
                field: 'required',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.required-field.title'),
                filterable: false
            },
            {
                field: 'defaultValue',
                header: this.translateService.instant('com.bmc.arsys.rx.client.common.default-value.label'),
                filterable: false
            },
            {
                field: 'fieldGrouping',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.field-group.title'),
                filterable: false
            },
            {
                field: 'keySetting',
                header: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.grid.column.key-field.title'),
                filterable: false
            }
        ];
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue) {
            this.store$.dispatch(init({ payload: this.configuration }));
        }
    }
    ngOnInit() {
        this.inspectorTabIndexSubject.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex }));
        });
        this.inspectorTabIndex$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe((inspectorTabIndex) => {
            if (!isNull(inspectorTabIndex)) {
                this.adaptSidebarComponent.openPanel(inspectorTabIndex);
            }
        });
        this.store$
            .select(savedDefinitionNameSelector)
            .pipe(skip(1), takeUntil(this.destroyed$))
            .subscribe((savedDefinitionName) => {
            this.definitionSaved.emit(savedDefinitionName);
        });
    }
    onSelectionChange(selectedFieldModel) {
        this.store$.dispatch(setSelectedFieldGuid({ guid: selectedFieldModel === null || selectedFieldModel === void 0 ? void 0 : selectedFieldModel.guid }));
    }
    canDeactivate() {
        let canDeactivate = true;
        this.isDirty$.pipe(take(1)).subscribe((isDirty) => {
            canDeactivate = !isDirty;
        });
        return canDeactivate;
    }
    saveDefinition() {
        this.store$.dispatch(saveDefinition());
    }
    onCorrectIssue(validationIssue) {
        if (validationIssue.data.noFieldAdded) {
            this.createNewFieldDropdown.open();
        }
        if (validationIssue.data.guid) {
            this.store$.dispatch(setSelectedFieldGuid({ guid: validationIssue.data.guid }));
        }
        else {
            this.store$.dispatch(setInspectorTabIndex({ inspectorTabIndex: 0 }));
        }
        if (validationIssue.data.editFieldGroups) {
            this.store$.dispatch(editFieldGroups());
        }
        setTimeout(() => this.inspectorFocusEditorSubject.next({
            editorName: validationIssue.data.propertyName,
            data: validationIssue.data.data
        }), 10);
    }
    onDefinitionModelChange(newDefinitionModel) {
        this.store$.dispatch(updateDefinitionModelFromDesigner({
            definitionModelFromDesigner: newDefinitionModel
        }));
    }
    onSelectedFieldModelChange(newSelectedFieldModel) {
        this.store$.dispatch(updateSelectedFieldModel({ selectedFieldModel: newSelectedFieldModel }));
    }
    validate(definitionModel) {
        const duplicateFieldErrorMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', { propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.field-name.label') });
        const definitionValidationIssues = [];
        const fieldValidationIssueSections = [];
        chain(definitionModel.fields)
            .clone()
            .reverse()
            .forEach((fieldModel, index, fieldModels) => {
            let issues = [];
            if (find(fieldModels, (model) => fieldModel.id === model.id, index + 1)) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: duplicateFieldErrorMsg,
                    data: {
                        propertyName: 'id',
                        guid: fieldModel.guid
                    }
                });
            }
            if (!fieldModel.localeList[0].fieldGrouping) {
                issues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-has-no-group.message'),
                    data: {
                        editFieldGroups: true,
                        guid: fieldModel.guid
                    }
                });
            }
            issues = issues.concat(this.fieldDefinitionManagerService.validate(fieldModel));
            if (issues.length) {
                fieldValidationIssueSections.push({
                    title: fieldModel.id,
                    issues: issues
                });
            }
        })
            .value();
        if (isEmpty(trim(definitionModel.componentName))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label')
                }),
                data: {
                    propertyName: 'componentName'
                }
            });
        }
        if (isEmpty(trim(definitionModel.componentLabel))) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label')
                }),
                data: {
                    propertyName: 'componentLabel'
                }
            });
        }
        if (isNil(definitionModel.parentComponentName) &&
            (definitionModel.isSettingAccessibleInInnovationStudio || definitionModel.isSettingAccessibleInApplication) &&
            !definitionModel.firstMenu) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label')
                }),
                data: {
                    propertyName: 'firstMenu'
                }
            });
        }
        if (!definitionModel.fields.length) {
            definitionValidationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-has-no-fields-error.message'),
                data: { noFieldAdded: true }
            });
        }
        if (definitionModel.impactRowVisibility === ImpactRowVisibility.User) {
            const keySettingsCount = filter(definitionModel.fields, { keySetting: true }).length;
            if (keySettingsCount > 1) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-key-fields-not-allowed-error.message'),
                    data: {
                        propertyName: 'keySetting'
                    }
                });
            }
        }
        if (!isNil(definitionModel.parentComponentName)) {
            const uniqFieldGroups = uniqBy(definitionModel.fields, 'localeList[0].fieldGrouping');
            if (uniqFieldGroups.length > 1) {
                definitionValidationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.multiple-field-groups-not-allowed-error.message'),
                    data: {
                        propertyName: 'parentComponentName'
                    }
                });
            }
        }
        let issues = [];
        if (definitionValidationIssues.length) {
            issues.push({
                title: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title'),
                issues: definitionValidationIssues
            });
        }
        issues = issues.concat(reverse(fieldValidationIssueSections));
        return issues;
    }
    addNewField(resourceType, isLoginNameField = false) {
        this.store$.dispatch(createNewFieldModel({ resourceType: resourceType, isLoginNameField }));
    }
    editFieldGroups() {
        this.store$.dispatch(editFieldGroups());
    }
    getDataTypeName(dataType) {
        return find(this.dataTypes, { dataType }).displayName;
    }
    onBreadcrumbSelected() {
        this.store$.dispatch(clearSelectedFieldGuid());
    }
    toggleDesignMode() {
        this.store$.dispatch(toggleDesignMode());
    }
    onSidebarToggle(event) {
        this.inspectorTabIndexSubject.next(event.id);
    }
    getDefinitionInspectorConfig(parentComponents, bundleFriendlyName, isApplication, definitionModel) {
        const configs = [];
        const generalControls = [];
        generalControls.push({
            name: 'componentName',
            component: TextFormControlComponent,
            isDisabled: Boolean(this.configuration.definitionName),
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-name.label'),
                required: true
            }
        });
        if (isNil(definitionModel.parentComponentName)) {
            generalControls.push({
                name: '',
                component: LabelFormControlComponent,
                options: {
                    labelKey: 'com.bmc.arsys.rx.client.config-designer.config-properties.enable-access-from.label'
                }
            });
            generalControls.push({
                name: 'isSettingAccessibleInInnovationStudio',
                component: BooleanFormControlComponent,
                options: {
                    label: 'Innovation Studio',
                    shouldDisplayAsCheckbox: true
                }
            });
            if (isApplication) {
                generalControls.push({
                    name: 'isSettingAccessibleInApplication',
                    component: BooleanFormControlComponent,
                    options: {
                        label: bundleFriendlyName,
                        shouldDisplayAsCheckbox: true
                    }
                });
            }
        }
        generalControls.push({
            name: 'componentLabel',
            component: TextFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.component-label.label'),
                required: true
            }
        });
        generalControls.push({
            name: 'supportsMultiple',
            component: SwitchFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.repeat-setting.label')
            }
        });
        generalControls.push({
            name: 'parentComponentName',
            component: SelectFormControlComponent,
            options: {
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.parent-setting.label'),
                options: parentComponents
                    .filter((componentName) => componentName !== definitionModel.componentName)
                    .map((item) => ({ id: item, name: item })),
                emptyOption: true
            }
        });
        if (isNil(definitionModel.parentComponentName) && definitionModel.supportsMultiple) {
            generalControls.push({
                name: 'impactRowVisibility',
                component: SelectFormControlComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.label'),
                    options: [
                        {
                            id: ImpactRowVisibility.None,
                            name: this.translateService.instant('com.bmc.arsys.rx.client.common.none.label')
                        },
                        {
                            id: ImpactRowVisibility.User,
                            name: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.visibility.options.user.label')
                        }
                    ],
                    beforeValueChange: (oldValue, newValue) => {
                        if (newValue === ImpactRowVisibility.User) {
                            const isLoginNameFieldExists = find(definitionModel.fields, {
                                id: 'LoginName',
                                dataType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                            });
                            if (!isLoginNameFieldExists) {
                                setTimeout(() => {
                                    this.addNewField(RX_RECORD_DEFINITION.dataTypes.character.resourceType, true);
                                });
                            }
                        }
                        return Promise.resolve(true);
                    }
                }
            });
        }
        if (definitionModel.impactRowVisibility !== ImpactRowVisibility.User) {
            generalControls.push({
                name: 'permissions',
                component: RxPermissionEditorComponent,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.permissions.label'),
                    type: 'config',
                    permissionScope: RX_PERMISSION.permissionScope.all
                }
            });
        }
        configs.push({
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
            controls: generalControls
        });
        if (isNil(definitionModel.parentComponentName) &&
            (definitionModel.isSettingAccessibleInApplication || definitionModel.isSettingAccessibleInInnovationStudio)) {
            configs.push({
                label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.navigation-section.label'),
                controls: [
                    {
                        name: 'firstMenu',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.first-menu.label'),
                            required: true
                        }
                    },
                    {
                        name: 'secondMenu',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.config-properties.second-menu.label')
                        }
                    }
                ]
            });
        }
        return configs;
    }
    getBooleanDisplayValue(defaultValue) {
        if (defaultValue === 'true') {
            return this.trueLabel;
        }
        else if (defaultValue === 'false') {
            return this.falseLabel;
        }
        else {
            return null;
        }
    }
    deleteSelectedField() {
        this.store$.dispatch(deleteSelectedField());
    }
    onFormInitialized() {
        this.inspectorFocusEditorSubject.next({
            editorName: 'componentName',
            data: {}
        });
    }
    destroyConfigDesigner() {
        this.store$.dispatch(destroy());
    }
    ngOnDestroy() {
        this.inspectorTabIndexSubject.complete();
        this.inspectorFocusEditorSubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.destroyConfigDesigner();
    }
}
ConfigDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerComponent, deps: [{ token: i1$1.Store }, { token: ConfigDesignerService }, { token: i2.RxGlobalCacheService }, { token: i4.TranslateService }, { token: i2.RxDefinitionNameService }, { token: FieldDefinitionManagerService }], target: i0.ɵɵFactoryTarget.Component });
ConfigDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerComponent, selector: "rx-config-designer", inputs: { configuration: "configuration" }, outputs: { definitionSaved: "definitionSaved", definitionErrorLoading: "definitionErrorLoading", closeDesigner: "closeDesigner" }, viewQueries: [{ propertyName: "adaptSidebarComponent", first: true, predicate: AdaptSidebarComponent, descendants: true }, { propertyName: "createNewFieldDropdown", first: true, predicate: ["createNewFieldDropdown"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <rx-designer-header\n    [bundleName]=\"vm.bundleFriendlyName\"\n    [isSaveButtonDisabled]=\"vm.isSaveButtonDisabled\"\n    (save)=\"saveDefinition()\"\n    (closeDesigner)=\"closeDesigner.emit()\"\n    [breadcrumbItems]=\"vm.breadcrumbItems\"\n    (breadcrumbSelected)=\"onBreadcrumbSelected()\"\n    (toggleDesignMode)=\"toggleDesignMode()\"\n    [isDesignMode]=\"!vm.definitionForJsonViewer\"\n  ></rx-designer-header>\n\n  <adapt-sidebar\n    [openedId]=\"0\"\n    [adjustMainContainerWidth]=\"true\"\n    position=\"right\"\n    class=\"h-100\"\n    [hidden]=\"vm.definitionForJsonViewer\"\n    (isPanelOpenedCurrently)=\"onSidebarToggle($event)\"\n  >\n    <adapt-sidebar-item\n      iconClass=\"d-icon-pencil\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.config-designer.config-properties.title.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.definitionInspectorConfig\"\n        [model]=\"vm.definitionModel\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n        (modelChange)=\"onDefinitionModelChange($event)\"\n        (formInitialized)=\"onFormInitialized()\"\n      ></rx-form-builder>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      iconClass=\"d-icon-gear\"\n      [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n      [tooltipText]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    >\n      <rx-form-builder\n        [config]=\"vm.selectedFieldInspectorConfig\"\n        [model]=\"vm.selectedFieldModel\"\n        (modelChange)=\"onSelectedFieldModelChange($event)\"\n        [guid]=\"vm.selectedFieldGuid\"\n        [focusEditor$]=\"inspectorFocusEditor$\"\n      ></rx-form-builder>\n\n      <adapt-alert\n        [hidden]=\"vm.selectedFieldModel\"\n        class=\"p-3\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.designer.validation.no-field-selected.message' | translate,\n          variant: 'info',\n          type: 'inline'\n        }\"\n      ></adapt-alert>\n    </adapt-sidebar-item>\n\n    <adapt-sidebar-item\n      [iconClass]=\"vm.hasValidationErrors ? 'd-icon-exclamation_triangle text-danger' : 'd-icon-exclamation_triangle'\"\n      headerTitle=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n      tooltipText=\"{{ 'com.bmc.arsys.rx.client.designer.validation-issues.label' | translate }}\"\n    >\n      <rx-validation-issues\n        (correctIssue)=\"onCorrectIssue($event)\"\n        [issueSections]=\"vm.validationIssues\"\n        [definitionTypeDisplayName]=\"'com.bmc.arsys.rx.client.config-definition.label' | translate\"\n      ></rx-validation-issues>\n    </adapt-sidebar-item>\n\n    <div class=\"main h-100 d-flex flex-column\">\n      <h1 class=\"mt-0\">\n        {{ (configuration.definitionName | rxDefinitionNamePipe) || vm.definitionDisplayName || newTitle }}\n      </h1>\n\n      <section class=\"h-100 d-flex flex-column\">\n        <div class=\"d-flex border border-bottom-0\">\n          <div class=\"dropdown\" adaptDropdown #createNewFieldDropdown>\n            <button\n              adapt-button\n              adaptDropdownToggle\n              type=\"button\"\n              btn-type=\"tertiary\"\n              class=\"d-icon-plus_circle\"\n              rx-id=\"new-field-button\"\n            >\n              {{ 'com.bmc.arsys.rx.client.designer.new-field.button.label' | translate }}\n            </button>\n\n            <div class=\"dropdown-menu\" adaptDropdownMenu>\n              <button *ngFor=\"let dataType of dataTypes\" class=\"dropdown-item\" (click)=\"addNewField(dataType.dataType)\">\n                {{ dataType.displayName }}\n              </button>\n            </div>\n          </div>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-list_ordered\"\n            (click)=\"editFieldGroups()\"\n            rx-id=\"edit-field-groups-button\"\n            [disabled]=\"!vm.fieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.config-designer.edit-field-groups.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            type=\"button\"\n            btn-type=\"tertiary\"\n            class=\"d-icon-trash\"\n            (click)=\"deleteSelectedField()\"\n            rx-id=\"delete-field-button\"\n            [disabled]=\"!vm.selectedFieldGridRows.length\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.delete.label' | translate }}\n          </button>\n        </div>\n\n        <adapt-table\n          [value]=\"vm.fieldGridRows\"\n          [selection]=\"vm.selectedFieldGridRows\"\n          [columns]=\"columns\"\n          [scrollable]=\"true\"\n          scrollHeight=\"flex\"\n          [sortable]=\"true\"\n          [resizableColumns]=\"false\"\n          [bordered]=\"true\"\n          [dataKey]=\"'guid'\"\n          [selectionMode]=\"'single'\"\n          (selectionChange)=\"onSelectionChange($event)\"\n        >\n        </adapt-table>\n      </section>\n    </div>\n  </adapt-sidebar>\n\n  <adapt-code-viewer\n    *ngIf=\"vm.definitionForJsonViewer\"\n    [code]=\"vm.definitionForJsonViewer | json\"\n    [lang]=\"'javascript'\"\n    [hasToolbar]=\"false\"\n    [theme]=\"'light'\"\n    class=\"full-size\"\n  ></adapt-code-viewer>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;height:100%;width:100%}:host ::ng-deep .has-validation-errors .nav-link .d-icon-exclamation_triangle{color:#f83200}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper{border-top:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .adapt-sidebar-panel-content{padding:0}:host ::ng-deep adapt-sidebar .adapt-sidebar-wrapper .card{border-left:0;border-right:0}\n"], components: [{ type: i6.RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: ["bundleName", "breadcrumbItems", "isDesignMode", "isPreviewAvailable", "isSaveButtonDisabled"], outputs: ["breadcrumbSelected", "toggleDesignMode", "showPreview", "save", "closeDesigner"] }, { type: i7.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i7.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i7.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i4$1.RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: ["definitionTypeDisplayName", "issueSections"], outputs: ["correctIssue"] }, { type: i7.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i9.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i7.AdaptCodeViewerComponent, selector: "adapt-code-viewer", inputs: ["code", "theme", "lang", "texts", "hasToolbar"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i10.AsyncPipe, "translate": i4.TranslatePipe, "rxDefinitionNamePipe": i2.RxDefinitionNamePipe, "json": i10.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-config-designer',
                    templateUrl: './config-designer.component.html',
                    styleUrls: ['./config-designer.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: ConfigDesignerService }, { type: i2.RxGlobalCacheService }, { type: i4.TranslateService }, { type: i2.RxDefinitionNameService }, { type: FieldDefinitionManagerService }]; }, propDecorators: { adaptSidebarComponent: [{
                type: ViewChild,
                args: [AdaptSidebarComponent, { static: false }]
            }], createNewFieldDropdown: [{
                type: ViewChild,
                args: ['createNewFieldDropdown', { static: false }]
            }], configuration: [{
                type: Input
            }], definitionSaved: [{
                type: Output
            }], definitionErrorLoading: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

const initialModel = {
    componentLabel: null,
    componentName: null,
    externalLink: null,
    firstMenu: null,
    impactRowVisibility: ImpactRowVisibility.None,
    isSettingAccessibleInApplication: false,
    isSettingAccessibleInInnovationStudio: false,
    parentComponentName: null,
    permissions: [],
    registeredModuleName: null,
    secondMenu: null,
    supportsMultiple: false,
    viewComponent: false,
    viewToOpen: null,
    fields: []
};
const initialState = {
    bundleId: null,
    definitionName: null,
    isDesignMode: true,
    inspectorTabIndex: 0,
    selectedFieldGuid: null,
    definitionModel: initialModel,
    definitionModelFromDefinition: initialModel,
    parentComponents: [],
    isDirty: false,
    savedDefinitionName: null
};
const reducer = createReducer(initialState, on(init, (state, { payload }) => (Object.assign(Object.assign({}, initialState), { bundleId: payload.bundleId, definitionName: payload.definitionName }))), on(initDefinitionModel, (state, { definitionModelFromDefinition }) => (Object.assign(Object.assign({}, state), { definitionModelFromDefinition, definitionModel: definitionModelFromDefinition }))), on(markDesignerPristine, (state) => (Object.assign(Object.assign({}, state), { isDirty: false }))), on(markDesignerDirty, (state) => (Object.assign(Object.assign({}, state), { isDirty: true }))), on(loadParentComponentsSuccess, (state, { parentComponents }) => (Object.assign(Object.assign({}, state), { parentComponents }))), on(setInspectorTabIndex, (state, { inspectorTabIndex }) => (Object.assign(Object.assign({}, state), { inspectorTabIndex }))), on(setSelectedFieldGuid, (state, { guid }) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: guid, inspectorTabIndex: guid && !isNull(state.inspectorTabIndex) ? 1 : state.inspectorTabIndex }))), on(clearSelectedFieldGuid, (state) => (Object.assign(Object.assign({}, state), { selectedFieldGuid: null, inspectorTabIndex: !isNull(state.inspectorTabIndex) ? 0 : state.inspectorTabIndex }))), on(toggleDesignMode, (state) => (Object.assign(Object.assign({}, state), { isDesignMode: !state.isDesignMode }))), on(updateDefinitionModelFromDesigner, (state, { definitionModelFromDesigner }) => (Object.assign(Object.assign({}, state), { definitionModel: Object.assign(Object.assign({}, state.definitionModel), definitionModelFromDesigner) }))), on(updateSelectedFieldModel, (state, { selectedFieldModel }) => {
    const definitionModel = cloneDeep(state.definitionModel);
    const fieldIndex = findIndex(definitionModel.fields, { guid: state.selectedFieldGuid });
    definitionModel.fields[fieldIndex] = selectedFieldModel;
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(addFieldModel, (state, { newFieldModel }) => {
    const definitionModel = cloneDeep(state.definitionModel);
    definitionModel.fields.push(newFieldModel);
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(deleteSelectedFieldSuccess, (state) => {
    const definitionModel = cloneDeep(state.definitionModel);
    remove(definitionModel.fields, { guid: state.selectedFieldGuid });
    return Object.assign(Object.assign({}, state), { definitionModel });
}), on(saveDefinitionSuccess, (state, { savedDefinitionName }) => (Object.assign(Object.assign({}, state), { savedDefinitionName }))), on(destroy, (state) => (Object.assign({}, initialState))));
function configDesignerModelReducer(state, action) {
    return reducer(state, action);
}

class FieldGroupsEditorStore extends ComponentStore {
    constructor() {
        super({ fields: [], isDirty: false, groups: [], selectedGroupName: null });
        this.fields$ = this.select((state) => state.fields);
        this.groups$ = this.select((state) => state.groups);
        this.selectedGroupName$ = this.select((state) => state.selectedGroupName);
        this.availableFields$ = this.select(this.fields$, this.selectedGroupName$, (fields, selectedGroupName) => fields
            .filter((field) => field.groupName !== selectedGroupName)
            .map((field, index) => ({
            name: field.name,
            id: index,
            guid: field.guid,
            checked: field.checked
        })));
        this.checkedAvailableFields$ = this.select(this.availableFields$, (fields) => fields.filter((field) => field.checked));
        this.selectedFields$ = this.select(this.fields$, this.selectedGroupName$, (fields, selectedGroupName) => chain(fields)
            .filter((field) => field.groupName === selectedGroupName)
            .sortBy('fieldOrder')
            .map((field, index) => ({
            name: field.name,
            id: index,
            guid: field.guid,
            selected: field.checked
        }))
            .value());
        this.checkedSelectedFields$ = this.select(this.selectedFields$, (fields) => fields.filter((field) => field.selected));
        this.isDirty$ = this.select((state) => state.isDirty);
        this.vm$ = this.select(this.groups$, this.fields$, this.availableFields$, this.checkedAvailableFields$, this.selectedFields$, this.checkedSelectedFields$, this.isDirty$, (groups, fields, availableFields, checkedAvailableFields, selectedFields, checkedSelectedFields, isDirty) => ({
            groups,
            fields,
            availableFields,
            checkedAvailableFields,
            selectedFields,
            checkedSelectedFields,
            isDirty
        }));
        this.selectGroup = this.updater((state, groupName) => {
            const groups = state.groups.map((group) => (Object.assign(Object.assign({}, group), { selected: group.name === groupName })));
            return Object.assign(Object.assign({}, state), { groups, selectedGroupName: groupName });
        });
        this.markDirty = this.updater((state) => (Object.assign(Object.assign({}, state), { isDirty: true })));
        this.checkField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: true }) : field)) })));
        this.uncheckField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => (field.guid === guid ? Object.assign(Object.assign({}, field), { checked: false }) : field)) })));
        this.sortSelectedFields = this.updater((state, guids) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => {
                const index = guids.indexOf(field.guid);
                return index > -1 ? Object.assign(Object.assign({}, field), { fieldOrder: index }) : field;
            }) })));
        this.assignCheckedFields = this.updater((state) => {
            const selectedFields = state.fields.filter((field) => field.groupName === state.selectedGroupName);
            let fieldOrder = selectedFields.length;
            return Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.checked
                    ? Object.assign(Object.assign({}, field), { checked: false, groupName: state.selectedGroupName, fieldOrder: fieldOrder++ }) : field), isDirty: true });
        });
        this.unassignCheckedFields = this.updater((state) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.checked ? Object.assign(Object.assign({}, field), { checked: false, fieldOrder: null, groupName: null }) : field), isDirty: true })));
        this.removeField = this.updater((state, guid) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.guid === guid ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field), isDirty: true })));
        this.removeGroup = this.updater((state, groupName) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.groupName === groupName ? Object.assign(Object.assign({}, field), { groupName: null, fieldOrder: null }) : field), groups: reject(state.groups, { name: groupName }), isDirty: true })));
        this.renameGroup = this.updater((state, group) => (Object.assign(Object.assign({}, state), { fields: state.fields.map((field) => field.groupName === group.oldName ? Object.assign(Object.assign({}, field), { groupName: group.newName }) : field), isDirty: true })));
    }
}
FieldGroupsEditorStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FieldGroupsEditorStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class FieldGroupsEditorComponent extends RxModalClass {
    constructor(fieldGroupsEditorStore, translateService, rxNotificationService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.fieldGroupsEditorStore = fieldGroupsEditorStore;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.activeModalRef = activeModalRef;
        this.destroyed$ = new ReplaySubject(1);
        this.listBuilderTexts = {
            searchPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.field-groups-list.placeholder')
        };
        this.duplicateGroupMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
        this.itemValidation = (itemName, items, isEdit) => some(items, (item) => trim(item.name) === trim(itemName)) ? this.duplicateGroupMsg : null;
        this.vm$ = this.fieldGroupsEditorStore.vm$;
    }
    ngOnInit() {
        super.ngOnInit();
        this.fieldGroupsEditorStore.isDirty$.pipe(filter$1(Boolean), take(1)).subscribe(() => {
            this.markAsDirty();
        });
        const fields = this.activeModalRef.getData().fields.map((field) => ({
            guid: field.guid,
            name: field.id,
            groupName: field.localeList[0].fieldGrouping,
            fieldOrder: field.fieldOrder,
            checked: false
        }));
        const groups = chain(fields)
            .map((field, index) => ({ name: field.groupName, id: index, guid: field.guid }))
            .filter((group) => !!group.name)
            .uniqBy('name')
            .sort((a, b) => a.name.localeCompare(b.name))
            .value();
        this.fieldGroupsEditorStore.patchState({ fields, groups });
    }
    onGroupChange(groups) {
        var _a;
        this.fieldGroupsEditorStore.selectGroup((_a = groups.find((field) => field.selected)) === null || _a === void 0 ? void 0 : _a.name);
    }
    onGroupAdd(addedGroup, groups) {
        groups.forEach((group) => {
            group.selected = group === addedGroup;
        });
    }
    onGroupRemove(removedGroup) {
        this.fieldGroupsEditorStore.removeGroup(removedGroup.name);
    }
    onGroupRename([oldGroup, newGroup]) {
        this.fieldGroupsEditorStore.renameGroup({ oldName: oldGroup.name, newName: newGroup.name });
    }
    onAvailableFieldsChange(checkedFields, availableFields) {
        availableFields.forEach((field) => {
            if (some(checkedFields, { guid: field.guid })) {
                this.fieldGroupsEditorStore.checkField(field.guid);
            }
            else {
                this.fieldGroupsEditorStore.uncheckField(field.guid);
            }
        });
    }
    onSelectedFieldsChange(fields) {
        fields.forEach((field) => {
            if (field.selected) {
                this.fieldGroupsEditorStore.checkField(field.guid);
            }
            else {
                this.fieldGroupsEditorStore.uncheckField(field.guid);
            }
        });
        this.fieldGroupsEditorStore.sortSelectedFields(fields.map((field) => field.guid));
    }
    onDragEnd() {
        this.fieldGroupsEditorStore.markDirty();
    }
    moveToSelected() {
        this.fieldGroupsEditorStore.assignCheckedFields();
    }
    moveToAvailable() {
        this.fieldGroupsEditorStore.unassignCheckedFields();
    }
    onFieldRemove(removedField) {
        this.fieldGroupsEditorStore.removeField(removedField.guid);
    }
    alphabeticSort(a, b) {
        return a.name.localeCompare(b.name);
    }
    optionFormatter(field) {
        return field.name;
    }
    saveFieldGroups() {
        this.fieldGroupsEditorStore.fields$.pipe(take(1)).subscribe((fields) => {
            this.activeModalRef.close({ fields });
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
FieldGroupsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorComponent, deps: [{ token: FieldGroupsEditorStore }, { token: i4.TranslateService }, { token: i2.RxNotificationService }, { token: i7.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FieldGroupsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldGroupsEditorComponent, selector: "rx-field-groups-editor", providers: [FieldGroupsEditorStore], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n    <div class=\"d-flex h-100 flex-fill\">\n      <adapt-rx-list-builder\n        class=\"flex-grow-1 mr-3\"\n        [ngModel]=\"vm.groups\"\n        selectionMode=\"single\"\n        (listItemAdd)=\"onGroupAdd($event, vm.groups)\"\n        (listItemRemove)=\"onGroupRemove($event)\"\n        (listItemUpdate)=\"onGroupRename($event)\"\n        (ngModelChange)=\"onGroupChange($event)\"\n        [customSort]=\"alphabeticSort\"\n        [hideListAreaLabel]=\"true\"\n        [texts]=\"listBuilderTexts\"\n        [itemValidation]=\"itemValidation\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.field-groups.label' | translate }}\"\n        rx-id=\"field-groups-list\"\n      ></adapt-rx-list-builder>\n\n      <adapt-rx-select\n        class=\"flex-grow-1 h-100 d-flex flex-column\"\n        popupMaxHeight=\"100%\"\n        [options]=\"vm.availableFields\"\n        [ngModel]=\"vm.checkedAvailableFields\"\n        [deselectAllButton]=\"true\"\n        [selectAllButton]=\"true\"\n        [enableFilter]=\"true\"\n        [inline]=\"true\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.available-fields.label' | translate }}\"\n        [multiple]=\"true\"\n        [singleSelectStyle]=\"'marker'\"\n        [optionFormatter]=\"optionFormatter\"\n        (ngModelChange)=\"onAvailableFieldsChange($event, vm.availableFields)\"\n        rx-id=\"available-fields-list\"\n      ></adapt-rx-select>\n\n      <div class=\"mx-2 d-flex flex-column\">\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_right mt-auto mb-2\"\n          btn-type=\"secondary\"\n          (click)=\"moveToSelected()\"\n          [disabled]=\"!vm.checkedAvailableFields.length\"\n          rx-id=\"move-to-selected-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          adapt-button\n          class=\"d-icon-right-angle_left mb-auto\"\n          btn-type=\"secondary\"\n          (click)=\"moveToAvailable()\"\n          [disabled]=\"!vm.checkedSelectedFields.length\"\n          rx-id=\"move-to-available-button\"\n        ></button>\n      </div>\n\n      <adapt-rx-list-builder\n        class=\"flex-grow-1\"\n        [ngModel]=\"vm.selectedFields\"\n        selectionMode=\"multiple\"\n        (listItemRemove)=\"onFieldRemove($event)\"\n        [hideSearchField]=\"true\"\n        [hideListAreaLabel]=\"true\"\n        [hideEdit]=\"true\"\n        (ngModelChange)=\"onSelectedFieldsChange($event)\"\n        (dragend)=\"onDragEnd()\"\n        label=\"{{ 'com.bmc.arsys.rx.client.config-designer.selected-fields.label' | translate }}\"\n        rx-id=\"selected-fields-list\"\n      ></adapt-rx-list-builder>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-field-groups-button\"\n      (click)=\"saveFieldGroups()\"\n      [disabled]=\"!vm.isDirty\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host ::ng-deep adapt-rx-select{width:30%;overflow:auto}:host ::ng-deep adapt-rx-select .rx-select__options-wrapper{flex:1 1 auto}:host ::ng-deep adapt-rx-list-builder{overflow:auto;width:30%}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder{height:100%}:host ::ng-deep adapt-rx-list-builder .adapt-list-container{flex-grow:1}:host ::ng-deep adapt-rx-list-builder .adapt-list-builder,:host ::ng-deep adapt-rx-list-builder .adapt-list-builder__wrp{display:flex;flex-direction:column;height:100%}\n"], components: [{ type: i7.AdaptRxListBuilderComponent, selector: "adapt-rx-list-builder", inputs: ["hideSearchField", "hideEdit", "hideDelete", "hideListAreaLabel", "customSort", "texts", "menuHeight", "listItemMaxLength", "generateListItemId", "itemValidation", "disabled", "treeStructure", "listItemFormatter", "listItemSetterProp", "listItemContentTemplate", "selectionMode"], outputs: ["listItemAdd", "listItemEdit", "listItemUpdate", "listItemRemove"] }, { type: i7.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i10.AsyncPipe, "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldGroupsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-field-groups-editor',
                    templateUrl: './field-groups-editor.component.html',
                    styleUrls: ['./field-groups-editor.component.scss'],
                    providers: [FieldGroupsEditorStore]
                }]
        }], ctorParameters: function () { return [{ type: FieldGroupsEditorStore }, { type: i4.TranslateService }, { type: i2.RxNotificationService }, { type: i7.ActiveModalRef }, { type: i0.Injector }]; } });

class ConfigDesignerEffects {
    constructor(store$, actions$, errorHandler, configDesignerService, rxModalService, rxNotificationService, translateService, fieldDefinitionManagerService, rxGuidService, rxConfigDefinitionService, rxGlobalCacheService, rxDefinitionNameService) {
        this.store$ = store$;
        this.actions$ = actions$;
        this.errorHandler = errorHandler;
        this.configDesignerService = configDesignerService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.fieldDefinitionManagerService = fieldDefinitionManagerService;
        this.rxGuidService = rxGuidService;
        this.rxConfigDefinitionService = rxConfigDefinitionService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.initConfigDesigner$ = createEffect(() => this.actions$.pipe(ofType(init), map((action) => loadParentComponents())));
        this.loadParentComponents$ = createEffect(() => this.actions$.pipe(ofType(loadParentComponents), switchMap(() => this.rxConfigDefinitionService.getComponents()), map((parentComponents) => loadParentComponentsSuccess({ parentComponents }))));
        this.setParentComponents$ = createEffect(() => this.actions$.pipe(ofType(loadParentComponentsSuccess), map(() => loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(loadDefinition), withLatestFrom(this.store$.select(bundleIdSelector)), switchMap(([_, bundleId]) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([bundleDescriptor, definitionName]) => definitionName
            ? this.rxConfigDefinitionService.get(this.rxDefinitionNameService.getDisplayName(definitionName))
            : this.rxConfigDefinitionService.getNew(bundleDescriptor.isApplication)), map((definition) => loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(loadDefinitionSuccess), map((action) => {
            const definitionModelFromDefinition = {
                externalLink: action.definition.externalLink,
                impactRowVisibility: action.definition.impactRowVisibility,
                parentComponentName: action.definition.parentComponentName,
                registeredModuleName: action.definition.registeredModuleName,
                supportsMultiple: action.definition.supportsMultiple,
                viewComponent: action.definition.viewComponent,
                viewToOpen: action.definition.viewToOpen,
                componentName: action.definition.componentName,
                permissions: action.definition.permissions,
                componentLabel: action.definition.localeList[0].componentLabel,
                firstMenu: action.definition.localeList[0].firstMenu,
                secondMenu: action.definition.localeList[0].secondMenu,
                isSettingAccessibleInInnovationStudio: action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.innovationStudio.value ||
                    action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.both.value,
                isSettingAccessibleInApplication: action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.application.value ||
                    action.definition.showInLocation === RX_CONFIG_DESIGNER.settingAccessOptions.both.value,
                fields: action.definition.settingMetaData.map((field) => {
                    var _a, _b, _c;
                    return ({
                        dataType: field.dataType,
                        defaultValue: (_a = field.defaultValue) !== null && _a !== void 0 ? _a : null,
                        fieldOrder: field.fieldOrder,
                        id: field.id,
                        keySetting: field.keySetting,
                        localeList: field.localeList,
                        guid: this.rxGuidService.generate(),
                        maxValue: (_b = field.maxValue) !== null && _b !== void 0 ? _b : null,
                        minValue: (_c = field.minValue) !== null && _c !== void 0 ? _c : null,
                        selectionFieldOptionProperties: {
                            defaultValue: field.defaultValue,
                            optionNamesById: field.optionNamesById,
                            optionLabelsById: field.optionLabelsById
                        },
                        required: field.required,
                        settingLabel: field.localeList[0].settingLabel,
                        isNew: false
                    });
                })
            };
            return initDefinitionModel({
                definitionModelFromDefinition
            });
        })));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionModel, saveDefinition, saveDefinitionSuccess), map(() => markDesignerPristine())));
        this.clearSelectedField$ = createEffect(() => this.actions$.pipe(ofType(initDefinitionModel, deleteSelectedFieldSuccess), map(() => clearSelectedFieldGuid())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(updateDefinitionModelFromDesigner, updateSelectedFieldModel, addFieldModel, deleteSelectedFieldSuccess, saveDefinitionError), map(() => markDesignerDirty())));
        this.createNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(createNewFieldModel), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => {
            let newFieldName;
            let fieldNameSuffix = 0;
            const defaultFieldName = this.translateService.instant('com.bmc.arsys.rx.client.designer.default-field-name.label');
            do {
                newFieldName = `${defaultFieldName} ${++fieldNameSuffix}`;
            } while (some(definitionModel.fields, { id: newFieldName }));
            const guid = this.rxGuidService.generate();
            const newFieldModel = this.fieldDefinitionManagerService.getNewFieldDefinitionModel(action.resourceType, {
                id: action.isLoginNameField ? 'LoginName' : newFieldName,
                isNew: true,
                guid,
                keySetting: action.isLoginNameField,
                settingLabel: action.isLoginNameField
                    ? this.translateService.instant('com.bmc.arsys.rx.client.config-designer.login-name-field.label')
                    : newFieldName,
                minValue: null,
                maxValue: null,
                selectionFieldOptionProperties: action.resourceType === RX_RECORD_DEFINITION.dataTypes.selection.resourceType
                    ? { defaultValue: null, optionNamesById: null, optionLabelsById: null }
                    : null
            });
            return addFieldModel({ newFieldModel });
        })));
        this.addNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(addFieldModel), map((action) => setSelectedFieldGuid({ guid: action.newFieldModel.guid }))));
        this.editFieldGroups$ = createEffect(() => this.actions$.pipe(ofType(editFieldGroups), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([_, definitionModel]) => from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.edit-field-groups.label'),
            content: FieldGroupsEditorComponent,
            data: { fields: definitionModel.fields },
            size: OpenViewActionModalSize.Large
        })
            .catch(noop))), filter$1(Boolean), withLatestFrom(this.store$.select(definitionModelSelector)), map(([response, definitionModel]) => {
            const fields = definitionModel.fields.map((field) => {
                const updatedField = response.fields.find((item) => item.guid === field.guid);
                return Object.assign(Object.assign({}, field), { fieldOrder: updatedField.fieldOrder, localeList: [
                        Object.assign(Object.assign({}, field.localeList[0]), { fieldGrouping: updatedField.groupName })
                    ] });
            });
            return updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { fields })
            });
        })));
        this.deleteSelectedField$ = createEffect(() => this.actions$.pipe(ofType(deleteSelectedField), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.designer.delete-fields-warning.message')
        }))), filter$1(Boolean), map(() => deleteSelectedFieldSuccess())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(saveDefinition), withLatestFrom(this.store$.select(definitionModelFromDefinitionSelector), this.store$.select(definitionModelSelector), this.store$.select(definitionNameSelector), this.store$.select(bundleIdSelector)), switchMap(([action, definitionModelFromDefinition, definitionModel, definitionName, bundleId]) => {
            const definition = this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel);
            if (!definitionName) {
                return this.rxConfigDefinitionService.create(definition).pipe(map((response) => saveDefinitionSuccess({
                    savedDefinitionName: `${bundleId}:${definitionModel.componentName}`
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(saveDefinitionError());
                }));
            }
            else if (definitionModelFromDefinition.impactRowVisibility !== definitionModel.impactRowVisibility ||
                definitionModelFromDefinition.parentComponentName !== definitionModel.parentComponentName ||
                definitionModelFromDefinition.supportsMultiple !== definitionModel.supportsMultiple) {
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-data-will-be-deleted-warning.message')
                })).pipe(filter$1(Boolean), map(() => updateDefinition({ definition })));
            }
            else {
                return [updateDefinition({ definition })];
            }
        })));
        this.updateDefinition$ = createEffect(() => this.actions$.pipe(ofType(updateDefinition), switchMap((action) => this.rxConfigDefinitionService.update(action.definition.componentName, action.definition).pipe(map((response) => saveDefinitionSuccess({
            savedDefinitionName: `${action.definition.componentName}`
        })), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(saveDefinitionError());
        })))));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.config-definition.label')
            }));
        }), filter$1(([_, definitionName]) => !!definitionName), map(() => loadDefinition())));
    }
}
ConfigDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects, deps: [{ token: i1$1.Store }, { token: i2$1.Actions }, { token: i0.ErrorHandler }, { token: ConfigDesignerService }, { token: i4$1.RxModalService }, { token: i2.RxNotificationService }, { token: i4.TranslateService }, { token: FieldDefinitionManagerService }, { token: i1.RxGuidService }, { token: i9$1.RxConfigDefinitionService }, { token: i2.RxGlobalCacheService }, { token: i2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2$1.Actions }, { type: i0.ErrorHandler }, { type: ConfigDesignerService }, { type: i4$1.RxModalService }, { type: i2.RxNotificationService }, { type: i4.TranslateService }, { type: FieldDefinitionManagerService }, { type: i1.RxGuidService }, { type: i9$1.RxConfigDefinitionService }, { type: i2.RxGlobalCacheService }, { type: i2.RxDefinitionNameService }]; } });

class ConfigDesignerModule {
}
ConfigDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxTextfieldModule,
        RecordGridModule,
        CommonModule,
        FormsModule,
        FormControlsModule,
        RxDesignerHeaderModule,
        RxBladeModule,
        RxValidationIssuesModule,
        RxJsonViewerModule,
        RxFormBuilderModule,
        AdaptRxCheckboxModule,
        AdaptRxLabelModule,
        TranslateModule,
        RecordGridModule,
        RxRecordDefinitionResourceTypePipeModule,
        AdaptAlertModule,
        RxLineLoaderModule,
        AdaptTableModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        ExpressionFormControlModule,
        AdaptBusyModule,
        AdaptRxCounterModule,
        AdaptCodeViewerModule,
        AdaptSidebarModule,
        RxDefinitionModule,
        AdaptRxListBuilderModule, i1$1.StoreFeatureModule, i2$1.EffectsFeatureModule], exports: [ConfigDesignerComponent] });
ConfigDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxTextfieldModule,
            RecordGridModule,
            CommonModule,
            FormsModule,
            FormControlsModule,
            RxDesignerHeaderModule,
            RxBladeModule,
            RxValidationIssuesModule,
            RxJsonViewerModule,
            RxFormBuilderModule,
            AdaptRxCheckboxModule,
            AdaptRxLabelModule,
            TranslateModule,
            RecordGridModule,
            RxRecordDefinitionResourceTypePipeModule,
            AdaptAlertModule,
            RxLineLoaderModule,
            AdaptTableModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            ExpressionFormControlModule,
            AdaptBusyModule,
            AdaptRxCounterModule,
            AdaptCodeViewerModule,
            AdaptSidebarModule,
            RxDefinitionModule,
            AdaptRxListBuilderModule,
            StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                model: configDesignerModelReducer
            }),
            EffectsModule.forFeature([ConfigDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent],
                    exports: [ConfigDesignerComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxTextfieldModule,
                        RecordGridModule,
                        CommonModule,
                        FormsModule,
                        FormControlsModule,
                        RxDesignerHeaderModule,
                        RxBladeModule,
                        RxValidationIssuesModule,
                        RxJsonViewerModule,
                        RxFormBuilderModule,
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule,
                        TranslateModule,
                        RecordGridModule,
                        RxRecordDefinitionResourceTypePipeModule,
                        AdaptAlertModule,
                        RxLineLoaderModule,
                        AdaptTableModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        ExpressionFormControlModule,
                        AdaptBusyModule,
                        AdaptRxCounterModule,
                        AdaptCodeViewerModule,
                        AdaptSidebarModule,
                        RxDefinitionModule,
                        AdaptRxListBuilderModule,
                        StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                            model: configDesignerModelReducer
                        }),
                        EffectsModule.forFeature([ConfigDesignerEffects])
                    ]
                }]
        }] });

class ConfigDesignerPageComponent {
    constructor(activatedRoute, rxBundleCacheService, rxDefinitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
        this.activatedRoute = activatedRoute;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxPageTitleService = rxPageTitleService;
        this.router = router;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.isInitialized = false;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewConfig = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { definitionName: definitionName, bundleId: this.rxBundleCacheService.bundleId });
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewConfig) {
            this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'config-definitions'
        ]);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.configDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
ConfigDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageComponent, deps: [{ token: i1$2.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i4$1.RxUtilityModalsService }, { token: i2.RxPageTitleService }, { token: i1$2.Router }, { token: i4.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Component });
ConfigDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerPageComponent, selector: "rx-config-designer-page", viewQueries: [{ propertyName: "configDesignerComponent", first: true, predicate: ConfigDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-config-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-config-designer>\n", components: [{ type: ConfigDesignerComponent, selector: "rx-config-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-config-designer-page',
                    templateUrl: './config-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i4$1.RxUtilityModalsService }, { type: i2.RxPageTitleService }, { type: i1$2.Router }, { type: i4.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }]; }, propDecorators: { configDesignerComponent: [{
                type: ViewChild,
                args: [ConfigDesignerComponent]
            }] } });

class ConfigDesignerPageModule {
}
ConfigDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, declarations: [ConfigDesignerPageComponent], imports: [CommonModule, ConfigDesignerModule], exports: [ConfigDesignerPageComponent] });
ConfigDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, imports: [[CommonModule, ConfigDesignerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigDesignerPageComponent],
                    exports: [ConfigDesignerPageComponent],
                    imports: [CommonModule, ConfigDesignerModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ConfigDesignerComponent, ConfigDesignerModule, ConfigDesignerPageComponent, ConfigDesignerPageModule, RX_CONFIG_DESIGNER };
//# sourceMappingURL=helix-platform-config-designer.js.map
