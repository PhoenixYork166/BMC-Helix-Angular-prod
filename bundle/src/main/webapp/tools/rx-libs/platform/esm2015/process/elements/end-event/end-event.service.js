import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { isEmpty, some } from 'lodash';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { TextareaFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@ngx-translate/core";
export class RxEndEventService {
    constructor(rxStringService, translateService) {
        this.rxStringService = rxStringService;
        this.translateService = translateService;
    }
    getDefinitionFromModel(model) {
        return {
            description: model.description,
            guid: model.guid,
            name: model.name,
            resourceType: model.resourceType
        };
    }
    // TODO-VS: add position and size inspector groups
    getInspectorConfig() {
        return [
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                controls: [
                    {
                        name: 'label',
                        component: TextFormControlComponent,
                        options: {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
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
                    }
                ]
            }
        ];
    }
    // TODO-VS: update logic and types
    getModelFromDefinition(definition) {
        let elementModel = {
            description: '',
            guid: null,
            label: '',
            name: RX_PROCESS_DEFINITION.processElementDisplayNames.endEvent,
            resourceType: RX_PROCESS_DEFINITION.processElementResourceTypes.endEvent,
            type: RX_PROCESS_DEFINITION.processElementTypes.endEvent
        };
        if (definition) {
            elementModel = Object.assign(Object.assign({}, elementModel), { description: definition.description, guid: definition.guid, label: definition.name, name: definition.name, resourceType: definition.resourceType });
        }
        return elementModel;
    }
    getShape(options) {
        return new joint.shapes.rx.EndEvent({
            elementModel: this.getModelFromDefinition(),
            position: options.position
        });
    }
    setCommonDataDictionaryBranch(guid, dataDictionaryBranch) { }
    validate(model, availableCells) {
        const validationIssues = [];
        const inboundLinks = availableCells.filter((cell) => cell.prop('targetNode') === model.guid);
        if (inboundLinks.length < 1) {
            validationIssues.push({
                type: ValidationIssueType.Warning,
                description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.is-required.message', {
                    propertyName: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.inbound-sequence-flow.label')
                }),
                data: {
                    guid: model.guid,
                    inspectorTabIndex: 1
                }
            });
        }
        const outboundLinks = availableCells.filter((cell) => cell.prop('sourceNode') === model.guid);
        if (!isEmpty(outboundLinks)) {
            validationIssues.push({
                type: ValidationIssueType.Warning,
                description: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.elements.end-event.validation.outbound-sequence-flow.message'),
                data: {
                    guid: model.guid,
                    inspectorTabIndex: 1
                }
            });
        }
        if (this.rxStringService.isEmptySafe(model.label)) {
            if (some(availableCells, (cell) => cell.prop('label') === model.label)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.must-be-unique.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1,
                        propertyName: 'label'
                    }
                });
            }
        }
        return of(validationIssues);
    }
}
RxEndEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, deps: [{ token: i1.RxStringService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEndEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEndEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=end-event.service.js.map