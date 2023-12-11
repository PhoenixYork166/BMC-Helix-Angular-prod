import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { Tooltip } from '@helix/platform/shared/api';
import { ExpressionInspectorControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent, StepperWithUnitsFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { getStandardPropsInspectorConfigs, validateAvailableOnDevicesProp, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { combineLatest, of } from 'rxjs';
import { compact, flatten } from 'lodash';
import { map, skip, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ImageAlignment, RX_IMAGE_ALIGNMENT_OPTIONS } from '../image.types';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_STANDARD_PROPS_DEFAULT_VALUES } from '@helix/platform/view/api';
export class ImageDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.recordDefinitionName$ = this.sandbox.getComponentPropertyValue('recordDefinitionName');
        this.attachmentFields$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName ? this.getAttachmentFieldsFromRecordDefinition(recordDefinitionName) : of([])));
        this.rxModalService = this.injector.get(RxModalService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.maxWidthUnits = [
            {
                name: 'pixels',
                id: 'px'
            },
            {
                name: '%',
                id: '%'
            }
        ];
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ name: null, recordDefinitionName: null, recordInstanceId: null, fieldId: null, maxWidth: null, alignment: ImageAlignment.Left }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.sandbox.componentProperties$.pipe(take(1)).subscribe((componentProperties) => {
            this.sandbox.updateInspectorConfig(this.getInspector(componentProperties));
        });
        this.recordDefinitionName$
            .pipe(skip(1), withLatestFrom(this.sandbox.componentProperties$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([recordDefinitionName, properties]) => {
            const newProperties = Object.assign(Object.assign({}, properties), { recordInstanceId: null, fieldId: null });
            this.sandbox.updateComponentProperties(newProperties);
            this.sandbox.updateInspectorConfig(this.getInspector(newProperties));
        });
        this.attachmentFields$
            .pipe(withLatestFrom(this.sandbox.componentProperties$), takeUntil(this.sandbox.destroyed$))
            .subscribe(([attachmentFields, properties]) => {
            this.sandbox.updateInspectorConfig(this.getInspector(properties, attachmentFields));
        });
        combineLatest([
            this.validateEmptyProp('recordDefinitionName', 'Record definition name cannot be blank.'),
            this.validateEmptyProp('recordInstanceId', 'Record instance ID cannot be blank.'),
            this.validateEmptyProp('fieldId', 'Field ID cannot be blank.'),
            this.sandbox.getComponentPropertyValue('maxWidth').pipe(map((value) => this.validateMaxWidth(value))),
            this.sandbox.getComponentPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.sandbox
                .getComponentPropertyValue(RX_AVAILABLE_ON_DEVICES_PROP_NAME)
                .pipe(map(validateAvailableOnDevicesProp))
        ])
            .pipe(map(flatten), map(compact), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => this.sandbox.setValidationIssues(validationIssues));
        this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
            const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;
            this.sandbox.setSettablePropertiesDataDictionary(componentName, [
                {
                    label: 'Hidden',
                    expression: this.getExpressionForProperty('hidden')
                }
            ]);
        });
    }
    getAttachmentFieldsFromRecordDefinition(recordDefinitionName) {
        return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName).pipe(map((recordDefinition) => recordDefinition.fieldDefinitions
            .filter((definition) => definition.resourceType === RX_RECORD_DEFINITION.dataTypes.attachment.resourceType)
            .map(({ id, name }) => ({
            id: id.toString(),
            name
        }))));
    }
    getInspector(props, attachmentFields = []) {
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'name',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Name',
                                tooltip: new Tooltip('Enter a name to uniquely identify the Image view component.')
                            }
                        },
                        {
                            name: 'recordDefinitionName',
                            component: RxDefinitionPickerComponent,
                            options: {
                                label: 'Record definition name',
                                definitionType: RxDefinitionPickerType.RegularRecord,
                                beforeValueChange: (oldValue, newValue) => {
                                    if (Boolean(oldValue) && props.recordInstanceId && props.fieldId) {
                                        return this.rxModalService.confirm({
                                            title: 'Warning',
                                            modalStyle: RX_MODAL.modalStyles.warning,
                                            message: 'Record Instance ID and Field ID will be cleared. Do you want to continue?'
                                        });
                                    }
                                    else {
                                        return Promise.resolve(true);
                                    }
                                },
                                required: true
                            }
                        },
                        {
                            name: 'fieldId',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Field name',
                                options: attachmentFields,
                                required: true
                            }
                        },
                        {
                            name: 'recordInstanceId',
                            component: ExpressionInspectorControlComponent,
                            options: {
                                label: 'Record ID',
                                isRequired: true
                            }
                        },
                        {
                            name: 'alignment',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Horizontal alignment',
                                options: RX_IMAGE_ALIGNMENT_OPTIONS
                            }
                        },
                        {
                            name: 'maxWidth',
                            component: StepperWithUnitsFormControlComponent,
                            options: {
                                label: 'Maximum width',
                                defaultUnit: 'px',
                                units: this.maxWidthUnits,
                                stepperOptionByUnits: {
                                    px: {
                                        minValue: 0
                                    },
                                    '%': {
                                        minValue: 0,
                                        maxValue: 100,
                                        defaultValue: 100
                                    }
                                }
                            }
                        },
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
    validateEmptyProp(propertyName, description) {
        return this.sandbox
            .getComponentPropertyValue(propertyName)
            .pipe(map((value) => (value ? null : this.sandbox.createError(description, propertyName))));
    }
    validateMaxWidth(maxWidth) {
        if (maxWidth) {
            const matches = maxWidth.match(/^([+-]?\d+(?:\.\d+)?)(.*)/);
            if (matches) {
                const numberValue = Number(matches[1]);
                const unitValue = matches[2];
                if (unitValue === '%' && numberValue > 100) {
                    return this.sandbox.createError('Maximum width cannot be greater than 100%.');
                }
                else if (numberValue < 0) {
                    return this.sandbox.createError('Maximum width should be a positive number.');
                }
            }
        }
    }
}
//# sourceMappingURL=image-design.model.js.map