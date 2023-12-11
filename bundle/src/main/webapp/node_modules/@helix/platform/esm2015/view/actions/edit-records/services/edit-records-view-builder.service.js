import { Injectable } from '@angular/core';
import { assign } from 'lodash';
import { RxGuidService } from '@helix/platform/utils';
import { RX_VIEW_DEFINITION, RxViewComponentType } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { ContainerRowWrap, RecordEditorMode, RxAssociationEditingMode, RxDefaultRecordEditorInputType } from '@helix/platform/view/components';
import { RX_ADMINISTRATION, RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/view/components";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/api";
export class RxEditRecordsViewBuilder {
    constructor(rxGuidService, rxDefaultRecordEditorInputType, rxFieldDefinitionService, translateService, rxSystemConfigurationService) {
        this.rxGuidService = rxGuidService;
        this.rxDefaultRecordEditorInputType = rxDefaultRecordEditorInputType;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.translateService = translateService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
    }
    getViewDefinition(recordDefinitionName, columnDescriptors) {
        const closeButtonId = this.rxGuidService.generate(), containerId = this.rxGuidService.generate(), recordEditorId = this.rxGuidService.generate(), recordInstanceId = null, saveButtonId = this.rxGuidService.generate(), viewDefinitionId = this.rxGuidService.generate(), recordEditorComponentDefinitions = this.getComponentDefinitions(columnDescriptors, recordEditorId);
        return {
            guid: viewDefinitionId,
            layout: JSON.stringify({
                outlets: [
                    {
                        name: RX_VIEW_DEFINITION.defaultOutletName,
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
                        recordInstanceId: `${recordInstanceId}`,
                        mode: RecordEditorMode.BulkEdit,
                        recordDefinitionName: recordDefinitionName,
                        styles: 'p-0 border-0'
                    },
                    componentDefinitions: recordEditorComponentDefinitions,
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: RX_VIEW_DEFINITION.defaultOutletName,
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
                                name: RX_VIEW_DEFINITION.defaultOutletName,
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
                                label: this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'),
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
                                        name: 'rxCloseViewAction',
                                        actAsCancel: 'false'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    getComponentDefinitions(columnDescriptors, recordEditorId) {
        const submitterMode = this.rxSystemConfigurationService.getConfigurationSync('Submitter-Mode');
        if (submitterMode === RX_ADMINISTRATION.submitterModes.locked) {
            columnDescriptors = columnDescriptors.filter((columnDescriptor) => Number(columnDescriptor.fieldId) !== RX_RECORD_DEFINITION.coreFieldIds.createdBy);
        }
        const fieldContainerComponentDefinitions = this.getFieldContainerComponentDefinitions(columnDescriptors, recordEditorId);
        return [
            {
                resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                guid: this.rxGuidService.generate(),
                type: RxViewComponentType.Container,
                propertiesByName: {
                    rowWrap: ContainerRowWrap.Sm,
                    columnCount: '1'
                },
                componentDefinitions: fieldContainerComponentDefinitions,
                layout: JSON.stringify({
                    outlets: [
                        {
                            name: RX_VIEW_DEFINITION.defaultOutletName,
                            columns: [
                                {
                                    children: fieldContainerComponentDefinitions.map((componentDefinition) => componentDefinition.guid)
                                }
                            ]
                        }
                    ]
                })
            }
        ];
    }
    getFieldContainerComponentDefinitions(columnDescriptors, recordEditorId) {
        return columnDescriptors
            .filter((columnDescriptor) => !this.rxFieldDefinitionService.isSystemField(columnDescriptor.fieldDefinition))
            .map((columnDescriptor) => {
            let resourceType, componentType;
            const isAssociated = Boolean(columnDescriptor.associationDescriptor);
            if (isAssociated) {
                resourceType = RX_VIEW_DEFINITION.resourceTypes.containerViewComponent;
                componentType = RxViewComponentType.Association;
            }
            else {
                resourceType = RX_VIEW_DEFINITION.resourceTypes.viewComponent;
                componentType = this.rxDefaultRecordEditorInputType.getFieldTypeByFieldDefinition(columnDescriptor.fieldDefinition);
            }
            const componentDefinition = {
                resourceType: resourceType,
                guid: this.rxGuidService.generate(),
                type: componentType,
                propertiesByName: {
                    fieldId: columnDescriptor.fieldDefinition.id,
                    recordDefinition: '${view.components.' + recordEditorId + '.recordDefinition}',
                    recordInstance: '${view.components.' + recordEditorId + '.recordInstance}',
                    label: columnDescriptor.title,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.optional
                }
            };
            if (isAssociated) {
                componentDefinition.componentDefinitions = [];
                assign(componentDefinition.propertiesByName, {
                    associatedRecordNodeSide: columnDescriptor.associationDescriptor.nodeSide,
                    editingMode: RxAssociationEditingMode.Dropdown,
                    associationDefinitionName: columnDescriptor.associationDescriptor.associationDefinition.name,
                    recordDefinitionName: columnDescriptor.associationDescriptor.recordDefinitionName
                });
            }
            return componentDefinition;
        })
            .reduce((fieldContainerComponentDefinitions, fieldComponentDefinition, index, fieldComponentDefinitions) => {
            if (index % 2 === 0) {
                fieldContainerComponentDefinitions.push({
                    resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
                    guid: this.rxGuidService.generate(),
                    type: RxViewComponentType.Container,
                    propertiesByName: {
                        rowWrap: ContainerRowWrap.Sm,
                        columnCount: '2'
                    },
                    componentDefinitions: fieldComponentDefinitions.slice(index, index + 2),
                    layout: JSON.stringify({
                        outlets: [
                            {
                                name: RX_VIEW_DEFINITION.defaultOutletName,
                                columns: [
                                    {
                                        children: [fieldComponentDefinition.guid],
                                        span: '6'
                                    },
                                    {
                                        children: fieldComponentDefinitions.length > index + 1
                                            ? [fieldComponentDefinitions[index + 1].guid]
                                            : [],
                                        span: '6'
                                    }
                                ]
                            }
                        ]
                    })
                });
            }
            return fieldContainerComponentDefinitions;
        }, []);
    }
}
RxEditRecordsViewBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, deps: [{ token: i1.RxGuidService }, { token: i2.RxDefaultRecordEditorInputType }, { token: i3.RxFieldDefinitionService }, { token: i4.TranslateService }, { token: i5.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEditRecordsViewBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEditRecordsViewBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }, { type: i2.RxDefaultRecordEditorInputType }, { type: i3.RxFieldDefinitionService }, { type: i4.TranslateService }, { type: i5.RxSystemConfigurationService }]; } });
//# sourceMappingURL=edit-records-view-builder.service.js.map