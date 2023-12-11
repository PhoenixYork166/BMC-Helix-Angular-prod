import { Injectable } from '@angular/core';
import { reject } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION, RxViewComponentType } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { ContainerRowWrap, RecordEditorMode, RxDefaultRecordEditorInputType } from '@helix/platform/view/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/view/components";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@ngx-translate/core";
export class RxRecordEditorBuilder {
    constructor(rxGuidService, rxDefaultRecordEditorInputType, rxFieldDefinitionService, translateService) {
        this.rxGuidService = rxGuidService;
        this.rxDefaultRecordEditorInputType = rxDefaultRecordEditorInputType;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
    }
    getViewDefinition(recordDefinition, recordInstanceId, isEditable = true) {
        const closeButtonId = this.rxGuidService.generate();
        const containerId = this.rxGuidService.generate();
        const recordEditorId = this.rxGuidService.generate();
        const saveButtonId = this.rxGuidService.generate();
        const viewDefinitionId = this.rxGuidService.generate();
        const recordEditorMode = recordInstanceId ? RecordEditorMode.Edit : RecordEditorMode.Create;
        const recordEditorComponentDefinitions = this.getComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId);
        return {
            guid: viewDefinitionId,
            layout: JSON.stringify({
                outlets: [
                    {
                        name: 'DEFAULT',
                        columns: [
                            {
                                children: [recordEditorId]
                            }
                        ]
                    },
                    {
                        name: 'footer',
                        height: 60,
                        columns: [
                            {
                                children: [containerId]
                            }
                        ]
                    }
                ]
            }),
            outputParams: [
                {
                    name: 'recordInstance',
                    source: '${view.components.' + recordEditorId + '.recordInstance}'
                }
            ],
            inputParams: [],
            componentDefinitions: [
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: recordEditorId,
                    type: RxViewComponentType.RecordEditor,
                    propertiesByName: {
                        recordInstanceId: `"${recordInstanceId}"`,
                        mode: recordEditorMode,
                        recordDefinitionName: recordDefinition.name,
                        styles: 'p-0 border-0',
                        allowEdit: isEditable ? '1' : '0'
                    },
                    componentDefinitions: recordEditorComponentDefinitions,
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: 'DEFAULT',
                                columns: [
                                    {
                                        children: recordEditorComponentDefinitions.map((componentDefinition) => componentDefinition.guid)
                                    }
                                ]
                            }
                        ]
                    })
                },
                {
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: containerId,
                    type: RxViewComponentType.ButtonBar,
                    propertiesByName: {
                        alignment: 'right',
                        hidden: '0'
                    },
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: 'DEFAULT',
                                columns: [
                                    {
                                        children: [saveButtonId, closeButtonId]
                                    }
                                ]
                            }
                        ]
                    }),
                    componentDefinitions: [
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: closeButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: isEditable
                                    ? this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label')
                                    : this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'),
                                style: 'secondary',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxCloseViewAction',
                                        actAsCancel: 'true'
                                    }
                                }
                            ]
                        },
                        {
                            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                            guid: saveButtonId,
                            type: RxViewComponentType.ActionButton,
                            propertiesByName: {
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.save.label'),
                                hidden: isEditable ? '0' : '1',
                                style: 'primary',
                                disabled: 'NOT${view.components.' + recordEditorId + '.canSave}',
                                size: 'default'
                            },
                            componentDefinitions: [
                                {
                                    resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                                    guid: this.rxGuidService.generate(),
                                    type: RxViewComponentType.Action,
                                    propertiesByName: {
                                        viewApi: '${view.api}',
                                        name: 'rxSaveAction',
                                        targetApi: '${view.api}',
                                        closeAfterSave: true
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    getComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId) {
        const fieldGroupFilters = [RX_RECORD_DEFINITION.fieldOptions.required, RX_RECORD_DEFINITION.fieldOptions.optional];
        if (recordEditorMode === RecordEditorMode.Edit) {
            fieldGroupFilters.push(RX_RECORD_DEFINITION.fieldOptions.system);
        }
        const componentDefinitions = [];
        for (let i = 0; i < fieldGroupFilters.length; i++) {
            const recordFieldsComponentDefinitions = this.getFieldComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId, fieldGroupFilters[i]);
            componentDefinitions.push({
                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                guid: this.rxGuidService.generate(),
                type: RxViewComponentType.Container,
                propertiesByName: {
                    rowWrap: ContainerRowWrap.Sm,
                    columnCount: '2',
                    styles: i + 1 !== fieldGroupFilters.length ? 'border-bottom pb-4' : ''
                },
                componentDefinitions: recordFieldsComponentDefinitions,
                layout: JSON.stringify({
                    outlets: [
                        {
                            name: 'DEFAULT',
                            columns: [
                                {
                                    children: recordFieldsComponentDefinitions
                                        .filter((componentDefinition, index) => index % 2 === 0)
                                        .map((componentDefinition) => componentDefinition.guid),
                                    span: '6'
                                },
                                {
                                    children: recordFieldsComponentDefinitions
                                        .filter((componentDefinition, index) => index % 2 === 1)
                                        .map((componentDefinition) => componentDefinition.guid),
                                    span: '6'
                                }
                            ]
                        }
                    ]
                })
            });
        }
        return componentDefinitions;
    }
    getFieldComponentDefinitions(recordDefinition, recordEditorMode, recordEditorId, fieldGroupFilter) {
        return reject(recordDefinition.fieldDefinitions, (fieldDefinition) => recordEditorMode === RecordEditorMode.Create && this.rxFieldDefinitionService.isSystemField(fieldDefinition))
            .filter((fieldDefinition) => fieldDefinition.fieldOption === fieldGroupFilter)
            .map((fieldDefinition) => {
            const componentDefinition = {
                resourceType: RX_VIEW_DEFINITION.resourceTypes.viewComponent,
                guid: this.rxGuidService.generate(),
                type: this.rxDefaultRecordEditorInputType.getFieldTypeByFieldDefinition(fieldDefinition),
                propertiesByName: {
                    fieldId: fieldDefinition.id,
                    recordDefinition: '${view.components.' + recordEditorId + '.recordDefinition}',
                    recordInstance: '${view.components.' + recordEditorId + '.recordInstance}',
                    label: fieldDefinition.name
                }
            };
            if (fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.character.resourceType &&
                fieldDefinition.namedListDefinition) {
                componentDefinition.propertiesByName.enableMultiSelection = 'true';
            }
            return componentDefinition;
        })
            .sort((a, b) => a.propertiesByName.label.localeCompare(b.propertiesByName.label));
    }
}
/** @nocollapse */ RxRecordEditorBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, deps: [{ token: i1.RxGuidService }, { token: i2.RxDefaultRecordEditorInputType }, { token: i3.RxFieldDefinitionService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxRecordEditorBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordEditorBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxDefaultRecordEditorInputType }, { type: i3.RxFieldDefinitionService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=record-editor-builder.service.js.map