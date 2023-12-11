import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ConfigDesignerActions from './config-designer.actions';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ErrorHandler, Injectable } from '@angular/core';
import { RxConfigDefinitionService } from '@helix/platform/config/api';
import { RxGuidService } from '@helix/platform/utils';
import { RX_CONFIG_DESIGNER } from '../../config-designer.constant';
import { FieldDefinitionManagerService } from '../../services/field-definition-manager.service';
import { Store } from '@ngrx/store';
import { bundleIdSelector, definitionModelFromDefinitionSelector, definitionModelSelector, definitionNameSelector } from './config-designer.selectors';
import { noop, some } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { RxDefinitionNameService, RxGlobalCacheService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { ConfigDesignerService } from '../../config-designer.service';
import { from, of } from 'rxjs';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { FieldGroupsEditorComponent } from '../field-groups-editor/field-groups-editor.component';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "../../config-designer.service";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@ngx-translate/core";
import * as i7 from "../../services/field-definition-manager.service";
import * as i8 from "@helix/platform/utils";
import * as i9 from "@helix/platform/config/api";
export class ConfigDesignerEffects {
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
        this.initConfigDesigner$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.init), map((action) => ConfigDesignerActions.loadParentComponents())));
        this.loadParentComponents$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.loadParentComponents), switchMap(() => this.rxConfigDefinitionService.getComponents()), map((parentComponents) => ConfigDesignerActions.loadParentComponentsSuccess({ parentComponents }))));
        this.setParentComponents$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.loadParentComponentsSuccess), map(() => ConfigDesignerActions.loadDefinition())));
        this.loadDefinition$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.loadDefinition), withLatestFrom(this.store$.select(bundleIdSelector)), switchMap(([_, bundleId]) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), withLatestFrom(this.store$.select(definitionNameSelector)), switchMap(([bundleDescriptor, definitionName]) => definitionName
            ? this.rxConfigDefinitionService.get(this.rxDefinitionNameService.getDisplayName(definitionName))
            : this.rxConfigDefinitionService.getNew(bundleDescriptor.isApplication)), map((definition) => ConfigDesignerActions.loadDefinitionSuccess({
            definition
        }))));
        this.loadDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.loadDefinitionSuccess), map((action) => {
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
            return ConfigDesignerActions.initDefinitionModel({
                definitionModelFromDefinition
            });
        })));
        this.markPristine$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.initDefinitionModel, ConfigDesignerActions.saveDefinition, ConfigDesignerActions.saveDefinitionSuccess), map(() => ConfigDesignerActions.markDesignerPristine())));
        this.clearSelectedField$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.initDefinitionModel, ConfigDesignerActions.deleteSelectedFieldSuccess), map(() => ConfigDesignerActions.clearSelectedFieldGuid())));
        this.markDirty$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.updateDefinitionModelFromDesigner, ConfigDesignerActions.updateSelectedFieldModel, ConfigDesignerActions.addFieldModel, ConfigDesignerActions.deleteSelectedFieldSuccess, ConfigDesignerActions.saveDefinitionError), map(() => ConfigDesignerActions.markDesignerDirty())));
        this.createNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.createNewFieldModel), withLatestFrom(this.store$.select(definitionModelSelector)), map(([action, definitionModel]) => {
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
            return ConfigDesignerActions.addFieldModel({ newFieldModel });
        })));
        this.addNewFieldModel$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.addFieldModel), map((action) => ConfigDesignerActions.setSelectedFieldGuid({ guid: action.newFieldModel.guid }))));
        this.editFieldGroups$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.editFieldGroups), withLatestFrom(this.store$.select(definitionModelSelector)), switchMap(([_, definitionModel]) => from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.edit-field-groups.label'),
            content: FieldGroupsEditorComponent,
            data: { fields: definitionModel.fields },
            size: OpenViewActionModalSize.Large
        })
            .catch(noop))), filter(Boolean), withLatestFrom(this.store$.select(definitionModelSelector)), map(([response, definitionModel]) => {
            const fields = definitionModel.fields.map((field) => {
                const updatedField = response.fields.find((item) => item.guid === field.guid);
                return Object.assign(Object.assign({}, field), { fieldOrder: updatedField.fieldOrder, localeList: [
                        Object.assign(Object.assign({}, field.localeList[0]), { fieldGrouping: updatedField.groupName })
                    ] });
            });
            return ConfigDesignerActions.updateDefinitionModelFromDesigner({
                definitionModelFromDesigner: Object.assign(Object.assign({}, definitionModel), { fields })
            });
        })));
        this.deleteSelectedField$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.deleteSelectedField), switchMap(() => from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.designer.delete-fields-warning.message')
        }))), filter(Boolean), map(() => ConfigDesignerActions.deleteSelectedFieldSuccess())));
        this.saveDefinition$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.saveDefinition), withLatestFrom(this.store$.select(definitionModelFromDefinitionSelector), this.store$.select(definitionModelSelector), this.store$.select(definitionNameSelector), this.store$.select(bundleIdSelector)), switchMap(([action, definitionModelFromDefinition, definitionModel, definitionName, bundleId]) => {
            const definition = this.configDesignerService.getDefinitionFromDefinitionModel(definitionModel);
            if (!definitionName) {
                return this.rxConfigDefinitionService.create(definition).pipe(map((response) => ConfigDesignerActions.saveDefinitionSuccess({
                    savedDefinitionName: `${bundleId}:${definitionModel.componentName}`
                })), catchError((error) => {
                    this.errorHandler.handleError(error);
                    return of(ConfigDesignerActions.saveDefinitionError());
                }));
            }
            else if (definitionModelFromDefinition.impactRowVisibility !== definitionModel.impactRowVisibility ||
                definitionModelFromDefinition.parentComponentName !== definitionModel.parentComponentName ||
                definitionModelFromDefinition.supportsMultiple !== definitionModel.supportsMultiple) {
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.config-designer.setting-data-will-be-deleted-warning.message')
                })).pipe(filter(Boolean), map(() => ConfigDesignerActions.updateDefinition({ definition })));
            }
            else {
                return [ConfigDesignerActions.updateDefinition({ definition })];
            }
        })));
        this.updateDefinition$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.updateDefinition), switchMap((action) => this.rxConfigDefinitionService.update(action.definition.componentName, action.definition).pipe(map((response) => ConfigDesignerActions.saveDefinitionSuccess({
            savedDefinitionName: `${action.definition.componentName}`
        })), catchError((error) => {
            this.errorHandler.handleError(error);
            return of(ConfigDesignerActions.saveDefinitionError());
        })))));
        this.saveDefinitionSuccess$ = createEffect(() => this.actions$.pipe(ofType(ConfigDesignerActions.saveDefinitionSuccess), withLatestFrom(this.store$.select(definitionNameSelector)), tap(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-saved-successfully.message', {
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.config-definition.label')
            }));
        }), filter(([_, definitionName]) => !!definitionName), map(() => ConfigDesignerActions.loadDefinition())));
    }
}
ConfigDesignerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects, deps: [{ token: i1.Store }, { token: i2.Actions }, { token: i0.ErrorHandler }, { token: i3.ConfigDesignerService }, { token: i4.RxModalService }, { token: i5.RxNotificationService }, { token: i6.TranslateService }, { token: i7.FieldDefinitionManagerService }, { token: i8.RxGuidService }, { token: i9.RxConfigDefinitionService }, { token: i5.RxGlobalCacheService }, { token: i5.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigDesignerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.Actions }, { type: i0.ErrorHandler }, { type: i3.ConfigDesignerService }, { type: i4.RxModalService }, { type: i5.RxNotificationService }, { type: i6.TranslateService }, { type: i7.FieldDefinitionManagerService }, { type: i8.RxGuidService }, { type: i9.RxConfigDefinitionService }, { type: i5.RxGlobalCacheService }, { type: i5.RxDefinitionNameService }]; } });
//# sourceMappingURL=config-designer.effects.js.map