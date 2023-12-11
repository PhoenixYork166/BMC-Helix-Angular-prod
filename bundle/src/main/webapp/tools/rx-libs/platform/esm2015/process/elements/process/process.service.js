import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { isEmpty } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { RxDefinitionNameService, Tooltip } from '@helix/platform/shared/api';
import { CustomizationOptionsComponent, RxPermissionEditorComponent, RxRevertCustomizationComponent, SelectFormControlComponent, SwitchFormControlComponent, TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxProcess } from './process.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@ngx-translate/core";
export class RxProcessService {
    constructor(rxDefinitionNameService, rxStringService, translateService) {
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
    }
    // TODO-VS: update when variable editor is implemented
    getDefinitionFromModel(definitionModel) {
        return {
            allowOverlay: definitionModel.customizationOptions.allowOverlay,
            contextKeyParam: definitionModel.contextKeyParam,
            description: definitionModel.description,
            guid: definitionModel.guid,
            inputParams: definitionModel.inputParams,
            isEnabled: definitionModel.isEnabled,
            localVariables: definitionModel.localVariables,
            name: this.rxDefinitionNameService.getDefinitionName(definitionModel.bundleId, definitionModel.name),
            outputParams: definitionModel.outputParams,
            overlayDescriptor: definitionModel.overlayDescriptor,
            overlayGroupId: definitionModel.overlayGroupId,
            permissions: definitionModel.permissions,
            runAsUser: RX_PROCESS_DEFINITION.runAsUser[definitionModel.runAsUser].definitionValue,
            scope: definitionModel.customizationOptions.scope
        };
    }
    getInspectorConfig(definitionModel) {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'name',
                        component: TextFormControlComponent,
                        isDisabled: Boolean(definitionModel.lastUpdateTime),
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label'),
                            required: true
                        }
                    },
                    {
                        name: 'description',
                        component: TextareaFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.description.label'),
                            rows: 3
                        }
                    },
                    {
                        name: 'guid',
                        component: TextFormControlComponent,
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label')
                        }
                    },
                    {
                        name: 'owner',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.owner),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.owner.label')
                        }
                    },
                    {
                        name: 'lastUpdateTime',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.lastUpdateTime),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-date.label')
                        }
                    },
                    {
                        name: 'lastChangedBy',
                        component: TextFormControlComponent,
                        hidden: !Boolean(definitionModel.lastChangedBy),
                        isDisabled: true,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.modified-by.label')
                        }
                    },
                    {
                        component: RxRevertCustomizationComponent,
                        options: {
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    },
                    {
                        name: 'customizationOptions',
                        component: CustomizationOptionsComponent,
                        options: {
                            definitionTypeDisplayName: this.translateService
                                .instant('com.bmc.arsys.rx.client.process-definition.label')
                                .toLowerCase(),
                            allowOverlay: definitionModel.customizationOptions.allowOverlay,
                            scope: definitionModel.customizationOptions.scope,
                            overlayGroupId: definitionModel.overlayGroupId,
                            overlayDescriptor: definitionModel.overlayDescriptor
                        }
                    },
                    {
                        name: 'isEnabled',
                        component: SwitchFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.process-enabled.label')
                        }
                    },
                    {
                        name: 'runAsUser',
                        component: SelectFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.label'),
                            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.run-as.tooltip')),
                            options: [
                                {
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.administrator.label'),
                                    id: RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
                                },
                                {
                                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.current-user.label'),
                                    id: RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                                }
                            ]
                        }
                    }
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.variables.label'),
                controls: [
                // TODO-VS: add variables editor
                ]
            },
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                controls: [
                    {
                        name: 'permissions',
                        component: RxPermissionEditorComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
                            type: 'process'
                        }
                    }
                ]
            }
        ];
    }
    // TODO-VS: update when variable editor is implemented
    getModelFromDefinition(definition, bundleId) {
        return {
            bundleId,
            contextKeyParam: definition.contextKeyParam,
            customizationOptions: {
                allowOverlay: definition.allowOverlay,
                scope: definition.scope
            },
            description: definition.description,
            guid: definition.guid,
            inputParams: definition.inputParams,
            isEnabled: definition.isEnabled,
            lastChangedBy: definition.lastChangedBy,
            lastUpdateTime: definition.lastUpdateTime,
            localVariables: definition.localVariables,
            name: Boolean(definition.lastUpdateTime)
                ? this.rxDefinitionNameService.getDisplayName(definition.name)
                : definition.name,
            outputParams: definition.outputParams,
            overlayDescriptor: null,
            overlayGroupId: definition.overlayGroupId,
            owner: definition.owner,
            permissions: definition.permissions,
            runAsUser: definition.runAsUser
                ? RX_PROCESS_DEFINITION.runAsUser.currentUser.modelValue
                : RX_PROCESS_DEFINITION.runAsUser.administrator.modelValue
        };
    }
    getShape(options) {
        return new RxProcess(options);
    }
    validate(definitionModel, availableCells) {
        const validationIssues = [];
        if (this.rxStringService.isEmptySafe(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name',
                    inspectorTabIndex: 0
                }
            });
        }
        if (definitionModel.name && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(definitionModel.name)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.invalid-definition-name.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.name.label')
                }),
                data: {
                    propertyName: 'name',
                    inspectorTabIndex: 0
                }
            });
        }
        const startEvents = availableCells.filter((cell) => cell.prop('type') === RX_PROCESS_DEFINITION.processElementTypes.startEvent);
        if (startEvents.length != 1) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.single-start-event.message'),
                data: {
                    inspectorTabIndex: 0
                }
            });
        }
        const endEvents = availableCells.filter((cell) => cell.prop('type') === RX_PROCESS_DEFINITION.processElementTypes.endEvent);
        if (isEmpty(endEvents)) {
            validationIssues.push({
                type: ValidationIssueType.Error,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.process.validation.no-end-event.label'),
                data: {
                    inspectorTabIndex: 0
                }
            });
        }
        return of(validationIssues);
    }
}
RxProcessService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, deps: [{ token: i1.RxDefinitionNameService }, { token: i2.RxStringService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionNameService }, { type: i2.RxStringService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=process.service.js.map