import { Injectable } from '@angular/core';
import { OpenViewActionModalSize, OpenViewActionType } from '@helix/platform/view/api';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { Tooltip } from '@helix/platform/shared/api';
import { RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS, RX_OPEN_VIEW_MODAL_SIZE_OPTIONS, RX_OPEN_VIEW_TYPE_OPTIONS } from './open-view-action.types';
import * as i0 from "@angular/core";
export class RxOpenViewModelHelperService {
    getOpenViewInspector(inputParams, presentationType, presentationModalSize, expressionConfigurator) {
        const viewInputControls = inputParams.map((param) => ({
            name: `viewParams.${param.name}`,
            component: ExpressionFormControlComponent,
            options: {
                label: param.name,
                dataDictionary$: expressionConfigurator.getDataDictionary(param.name),
                operators: expressionConfigurator.getOperators(param.name)
            }
        }));
        const isFullWidthType = presentationType === OpenViewActionType.FullWidth;
        const isCenteredModalWithFullSize = presentationType === OpenViewActionType.CenteredModal &&
            presentationModalSize === OpenViewActionModalSize.FullSize;
        return [
            {
                name: 'viewDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'View',
                    required: true,
                    definitionType: RxDefinitionPickerType.View
                }
            },
            ...viewInputControls,
            {
                name: 'presentation.type',
                component: SelectFormControlComponent,
                options: {
                    label: 'Presentation',
                    tooltip: new Tooltip('Select how to display the view in the application.'),
                    options: RX_OPEN_VIEW_TYPE_OPTIONS,
                    sortAlphabetically: false
                }
            },
            ...(isFullWidthType
                ? [
                    {
                        name: 'presentation.launchBehavior',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Launch behavior',
                            options: RX_OPEN_VIEW_LAUNCH_BEHAVIOR_OPTIONS,
                            sortAlphabetically: true
                        }
                    }
                ]
                : [
                    {
                        name: 'presentation.modalSize',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Size',
                            options: presentationType === OpenViewActionType.CenteredModal
                                ? RX_OPEN_VIEW_MODAL_SIZE_OPTIONS
                                : RX_OPEN_VIEW_MODAL_SIZE_OPTIONS.filter((option) => option.id !== OpenViewActionModalSize.FullSize),
                            sortAlphabetically: false
                        }
                    },
                    ...(isCenteredModalWithFullSize
                        ? []
                        : [
                            {
                                name: 'presentation.title',
                                component: TextFormControlComponent,
                                options: {
                                    label: 'Title'
                                }
                            }
                        ])
                ])
        ];
    }
}
RxOpenViewModelHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxOpenViewModelHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOpenViewModelHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=open-view-model-helper.service.js.map