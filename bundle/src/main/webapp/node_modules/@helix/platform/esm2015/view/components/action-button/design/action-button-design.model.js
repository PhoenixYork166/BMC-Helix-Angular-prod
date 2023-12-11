import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { Tooltip } from '@helix/platform/shared/api';
import { ExpressionInspectorControlComponent, IconPickerFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_DISABLED_PROP_DEFAULT_VALUE, RX_STANDARD_PROPS_DEFAULT_VALUES } from '@helix/platform/view/api';
import { ActionListWidgetComponent, getDisabledFieldInspectorConfig, getStandardPropsInspectorConfigs, RxViewActionValidatorService, validateAvailableOnDevicesProp, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { TranslateService } from '@ngx-translate/core';
import { flatten, map as _map } from 'lodash';
import { combineLatest, EMPTY, of } from 'rxjs';
import { catchError, map, pairwise, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ActionButtonIconAlignment, ActionButtonSize, ActionButtonStyle } from '../action-button.types';
const ACTIONS_KEY = 'actions';
export class ActionButtonDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.viewActionValidatorService = this.injector.get(RxViewActionValidatorService);
        this.translateService = this.injector.get(TranslateService);
        this.label$ = this.sandbox.getComponentPropertyValue('labelKey').pipe(switchMap((labelKey) => labelKey ? of(this.translateService.instant(labelKey)) : this.sandbox.getComponentPropertyValue('label')), takeUntil(this.sandbox.destroyed$));
        this.style$ = this.sandbox.getComponentPropertyValue('style');
        this.size$ = this.sandbox.getComponentPropertyValue('size');
        this.icon$ = this.sandbox.getComponentPropertyValue('icon');
        this.iconAlignment$ = this.sandbox.getComponentPropertyValue('iconAlignment');
        this.fieldDefinitions$ = this.sandbox.getComponentPropertyValue('recordDefinitionName').pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(map((recordDefinition) => recordDefinition.fieldDefinitions), catchError(() => of([])))
            : of([])));
    }
    static getInitialProperties(props) {
        return Object.assign(Object.assign(Object.assign({ iconAlignment: ActionButtonIconAlignment.Left, label: 'New button', size: ActionButtonSize.Default, icon: null, style: ActionButtonStyle.Primary, recordDefinitionName: null, fieldId: null, recordInstance: null }, RX_DISABLED_PROP_DEFAULT_VALUE), RX_STANDARD_PROPS_DEFAULT_VALUES), props);
    }
    rxInit() {
        // Set initial inspector config.
        combineLatest([this.sandbox.componentProperties$, this.fieldDefinitions$])
            .pipe(map(([componentProperties, fieldDefinitions]) => this.getInspectorConfig(componentProperties, fieldDefinitions)), take(1), takeUntil(this.sandbox.destroyed$))
            .subscribe((inspectorConfig) => {
            this.sandbox.updateInspectorConfig(inspectorConfig);
        });
        const actions$ = this.sandbox.getChildComponents();
        combineLatest([
            actions$.pipe(switchMap((actions) => this.viewActionValidatorService.validate(actions, ACTIONS_KEY))),
            this.sandbox.getComponentPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.sandbox
                .getComponentPropertyValue(RX_AVAILABLE_ON_DEVICES_PROP_NAME)
                .pipe(map(validateAvailableOnDevicesProp))
        ])
            .pipe(map(flatten), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => {
            this.setValidationIssues(validationIssues);
        });
        // update field names when Record Definition Name changed
        this.fieldDefinitions$
            .pipe(withLatestFrom(this.componentProperties$), map(([fieldDefinitions, properties]) => this.getInspectorConfig(properties, fieldDefinitions)))
            .subscribe((inspector) => this.sandbox.updateInspectorConfig(inspector));
        // clear fieldId and recordInstance if recordDefinitionName changed
        this.sandbox
            .getComponentPropertyValue('recordDefinitionName')
            .pipe(pairwise())
            .subscribe(([oldName, newName]) => {
            if (oldName && oldName !== newName) {
                this.sandbox.updateComponentProperties({
                    fieldId: null,
                    recordInstance: null
                });
            }
        });
        this.label$.subscribe((label) => {
            this.sandbox.setBreadcrumbs(label);
        });
        this.sandbox
            .getComponentPropertyValue('action')
            .pipe(switchMap((action) => (action ? EMPTY : this.label$)), takeUntil(this.sandbox.destroyed$))
            .subscribe((label) => {
            // Don't build settable properties if 'action' property is not empty.
            // In this case button threads as a child of association component only.
            this.sandbox.setSettablePropertiesDataDictionary(label, [
                {
                    label: 'Disabled',
                    expression: this.getExpressionForProperty('disabled')
                },
                {
                    label: 'Hidden',
                    expression: this.getExpressionForProperty('hidden')
                }
            ]);
        });
    }
    setValidationIssues(issues) {
        this.sandbox.setValidationIssues(issues);
    }
    getInspectorConfig(props, fieldDefinitions) {
        const securitySectionControls = [
            {
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Record definition name',
                    tooltip: new Tooltip('The view component will be hidden if the user has no access to the specified record definition.'),
                    definitionType: RxDefinitionPickerType.StandardDataRecord
                }
            }
        ];
        if (props.recordDefinitionName) {
            securitySectionControls.push({
                name: 'fieldId',
                component: SelectFormControlComponent,
                options: {
                    label: 'Field name',
                    tooltip: new Tooltip('The view component will be hidden if the user has no access to the specified field, or disabled if the user only has View permission ' +
                        'for the specified field. <br><br> Record definition name, Field name, and Record instance must all be ' +
                        'specified in order to control the disabled/hidden state of the view component using field permissions.'),
                    options: fieldDefinitions.map((definition) => ({ name: definition.name, id: String(definition.id) })),
                    emptyOption: true
                }
            }, {
                name: 'recordInstance',
                component: ExpressionInspectorControlComponent,
                options: {
                    label: 'Record instance',
                    tooltip: new Tooltip('Expression pointing to a record instance that provides the field permission details.')
                }
            });
        }
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'label',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Label'
                            }
                        },
                        {
                            name: 'style',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Style',
                                required: true,
                                options: _map(ActionButtonStyle, (value, name) => ({
                                    id: value,
                                    name
                                }))
                            }
                        },
                        {
                            name: 'size',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Size',
                                options: _map(ActionButtonSize, (value, name) => ({
                                    id: value,
                                    name
                                })),
                                sortAlphabetically: false
                            }
                        },
                        {
                            name: 'icon',
                            component: IconPickerFormControlComponent,
                            options: {
                                label: 'Icon'
                            }
                        },
                        {
                            name: 'iconAlignment',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Icon alignment',
                                options: _map(ActionButtonIconAlignment, (value, name) => ({
                                    id: value,
                                    name
                                }))
                            }
                        },
                        getDisabledFieldInspectorConfig(),
                        ...getStandardPropsInspectorConfigs()
                    ]
                },
                {
                    label: 'Actions',
                    controls: [
                        {
                            widgetName: ACTIONS_KEY,
                            component: ActionListWidgetComponent
                        }
                    ]
                },
                {
                    label: 'Security',
                    controls: securitySectionControls
                }
            ]
        };
    }
}
//# sourceMappingURL=action-button-design.model.js.map