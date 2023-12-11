import { getDisabledFieldInspectorConfig, getStandardPropsInspectorConfigs, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { ValidationFormControlComponent } from '@helix/platform/shared/components';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { filter as _filter, find, flow, isEmpty, map as _map, omit, pick, reject, sortBy, uniqBy } from 'lodash';
import { combineLatest, EMPTY, of } from 'rxjs';
import { FieldSetFormControlComponent } from './field-set-form-control.component';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_DISABLED_PROP_DEFAULT_VALUE, RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RecordEditorMode } from '../../../record-editor/common/record-editor.types';
export class SelectGroupDesignModel extends ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxFieldDefinitionService = this.injector.get(RxFieldDefinitionService);
        this.recordEditorGuid$ = this.sandbox
            .getParentComponentGuid(RxViewComponentType.RecordEditor)
            .pipe(take(1), shareReplay(1));
        this.recordEditorMode$ = this.recordEditorGuid$.pipe(switchMap((recordEditorGuid) => {
            return this.sandbox.getComponentPropertyValue('mode', recordEditorGuid);
        }));
        this.recordDefinitionName$ = this.recordEditorGuid$.pipe(switchMap((recordEditorGuid) => {
            return this.sandbox.getComponentPropertyValue('recordDefinitionName', recordEditorGuid);
        }), shareReplay(1));
        this.fieldDefinitions$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => {
            if (recordDefinitionName) {
                return this.rxRecordDefinitionCacheService
                    .getRecordDefinition(recordDefinitionName)
                    .pipe(catchError((error) => EMPTY));
            }
            else {
                return of(null);
            }
        }), distinctUntilChanged(), map((recordDefinition) => {
            if (recordDefinition && recordDefinition.fieldDefinitions) {
                return _filter(recordDefinition.fieldDefinitions, {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                });
            }
            else {
                return [];
            }
        }), shareReplay(1));
        this.inspectorTargetFieldOptions$ = combineLatest([this.fieldDefinitions$, this.recordEditorMode$]).pipe(map(([fieldDefinitions, recordEditorMode]) => [
            _filter(fieldDefinitions, { resourceType: RX_RECORD_DEFINITION.resourceTypes.character }),
            recordEditorMode
        ]), map(([characterFieldDefinitions, recordEditorMode]) => flow((fieldDefinitions) => _filter(fieldDefinitions, (definition) => {
            const isSystemField = this.rxFieldDefinitionService.isSystemField(definition);
            return !isSystemField || (isSystemField && recordEditorMode === RecordEditorMode.Edit);
        }), (fieldDefinitions) => _map(fieldDefinitions, (definition) => ({
            name: definition.name,
            id: String(definition.id)
        })), (options) => sortBy(options, 'name'))(characterFieldDefinitions)), shareReplay(1));
        this.fieldsDesignData$ = this.sandbox.getChildComponents();
        this.fieldProperties$ = this.fieldsDesignData$.pipe(map((fieldComponentsDesignData) => _map(fieldComponentsDesignData, (field) => (Object.assign(Object.assign({}, field.data), { guid: field.guid })))));
        // initial inspector configuration and component properties set
        combineLatest([this.recordDefinitionName$, this.inspectorTargetFieldOptions$, this.recordEditorGuid$])
            .pipe(take(1))
            .subscribe(([recordDefinitionName, inspectorTargetFieldOptions, recordEditorGuid]) => {
            this.sandbox.updateInspectorConfig(this.getBaseInspectorConfig(inspectorTargetFieldOptions, recordDefinitionName, recordEditorGuid));
        });
        this.inspectorTargetFieldOptions$
            .pipe(withLatestFrom(this.recordDefinitionName$, this.recordEditorGuid$))
            .subscribe(([inspectorTargetFieldOptions, recordDefinitionName, recordEditorGuid]) => {
            this.sandbox.updateInspectorConfig(this.getBaseInspectorConfig(inspectorTargetFieldOptions, recordDefinitionName, recordEditorGuid));
        });
        combineLatest([this.sandbox.componentProperties$, this.fieldProperties$])
            .pipe(switchMap(([componentProperties, fieldProperties]) => this.validate(componentProperties, fieldProperties)))
            .subscribe((validationIssues) => {
            this.sandbox.setValidationIssues(validationIssues);
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign(Object.assign({}, RX_DISABLED_PROP_DEFAULT_VALUE), RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    onFieldPropertiesChange(fieldProperties) {
        const fieldComponentPayloads = this.getFieldComponentPayloads(fieldProperties);
        this.sandbox.setChildren(fieldComponentPayloads);
    }
    isFieldRequired(field) {
        return this.fieldDefinitions$.pipe(map((fieldDefinitions) => {
            const fieldDefinition = field.data.fieldId && find(fieldDefinitions, { id: Number(field.data.fieldId) });
            return Boolean(fieldDefinition) && fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required;
        }));
    }
    getPropertiesByName(properties) {
        return pick(properties, ['disabled', 'hidden', 'styles', RX_AVAILABLE_ON_DEVICES_PROP_NAME]);
    }
    validate(componentProperties, fieldProperties) {
        const validationErrorMessages = [];
        if (isEmpty(fieldProperties)) {
            validationErrorMessages.push('Field set cannot be empty.');
        }
        else {
            const fieldsWithLabel = _filter(fieldProperties, (model) => model.label);
            if (fieldsWithLabel.length !== fieldProperties.length) {
                validationErrorMessages.push('Display label cannot be blank.');
            }
            if (uniqBy(fieldsWithLabel, 'label').length !== fieldsWithLabel.length) {
                validationErrorMessages.push('Display labels must be unique.');
            }
            if (reject(fieldProperties, (model) => model.namedListDefinitionName).length) {
                validationErrorMessages.push('Named list for options cannot be blank.');
            }
            if (reject(fieldProperties, (model) => model.fieldId).length) {
                validationErrorMessages.push('Field for storing selected option value cannot be blank.');
            }
        }
        const validationIssues = validationErrorMessages
            .map((message) => this.sandbox.createError(message))
            .concat(validateStandardProps(componentProperties));
        return of(validationIssues);
    }
    getFieldComponentPayloads(fieldProperties) {
        return _map(fieldProperties, (model) => ({
            type: RxViewComponentType.SelectGroupField,
            guid: model.guid,
            data: omit(model, 'guid')
        }));
    }
    getBaseInspectorConfig(targetFieldOptions, recordDefinitionName, recordEditorGuid) {
        const generalGroup = {
            label: 'General',
            controls: []
        };
        if (recordDefinitionName) {
            generalGroup.controls = [getDisabledFieldInspectorConfig(), ...getStandardPropsInspectorConfigs()];
        }
        else {
            generalGroup.controls = [
                {
                    component: ValidationFormControlComponent,
                    options: {
                        text: 'You must select a Record definition before editing field component.',
                        propertyName: 'recordDefinitionName',
                        componentGuid: recordEditorGuid
                    }
                }
            ];
        }
        return {
            inspectorSectionConfigs: recordDefinitionName
                ? [
                    generalGroup,
                    {
                        label: 'Field set',
                        controls: [
                            {
                                component: FieldSetFormControlComponent,
                                options: {
                                    targetFieldOptions: targetFieldOptions
                                }
                            }
                        ]
                    }
                ]
                : [generalGroup]
        };
    }
}
//# sourceMappingURL=select-group-design.model.js.map