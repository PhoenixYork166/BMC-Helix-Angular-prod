import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { ExpressionInspectorControlComponent, SelectFormControlComponent, TextFormControlComponent, ValidationFormControlComponent } from '@helix/platform/shared/components';
import { getDisabledFieldInspectorConfig, getStandardPropsInspectorConfigs, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { find, includes, isEmpty, isEqual } from 'lodash';
import { combineLatest, EMPTY, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, mergeMap, pairwise, shareReplay, startWith, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { RecordEditorMode } from '../../../record-editor/common/record-editor.types';
import { RX_DISABLED_PROP_DEFAULT_VALUE, RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
export class BaseRecordEditorFieldDesign extends ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxFieldDefinitionService = this.injector.get(RxFieldDefinitionService);
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign(Object.assign({ fieldId: null, label: null, value: null }, RX_DISABLED_PROP_DEFAULT_VALUE), RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.pipeline();
    }
    pipeline() {
        this.parentGuid$ = this.sandbox.getParentComponentGuid(RxViewComponentType.RecordEditor).pipe(take(1));
        this.recordEditorMode$ = this.parentGuid$.pipe(switchMap((recordEditorGuid) => {
            return this.sandbox.getComponentPropertyValue('mode', recordEditorGuid);
        }));
        this.recordDefinitionName$ = this.parentGuid$.pipe(switchMap((recordEditorGuid) => {
            return this.sandbox.getComponentPropertyValue('recordDefinitionName', recordEditorGuid);
        }), shareReplay(1));
        this.recordDefinition$ = this.recordDefinitionName$.pipe(switchMap((recordDefinitionName) => {
            if (recordDefinitionName) {
                return this.rxRecordDefinitionCacheService
                    .getRecordDefinition(recordDefinitionName)
                    .pipe(catchError((error) => EMPTY));
            }
            else {
                return of(null);
            }
        }), distinctUntilChanged());
        this.selectedFieldDefinition$ = this.sandbox.getComponentPropertyValue('fieldId').pipe(switchMap((fieldId) => this.recordDefinition$.pipe(map((recordDefinition) => {
            if (recordDefinition && fieldId) {
                return (recordDefinition.fieldDefinitions.find((fieldDefinition) => fieldDefinition.id === Number(fieldId)) || null);
            }
            else {
                return null;
            }
        }))), shareReplay(1));
        this.isRequired$ = this.selectedFieldDefinition$.pipe(map((selectedFieldDefinition) => selectedFieldDefinition && selectedFieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required));
        this.isSystemField$ = this.selectedFieldDefinition$.pipe(startWith(false), map((selectedFieldDefinition) => this.rxFieldDefinitionService.isSystemField(selectedFieldDefinition)));
        // set field label
        this.selectedFieldDefinition$
            .pipe(pairwise(), withLatestFrom(this.sandbox.componentProperties$), filter(([[oldField, newField], componentProperties]) => newField && ((oldField && oldField.name === componentProperties.label) || !componentProperties.label)), map(([[oldField, newField]]) => newField.name))
            .subscribe((label) => {
            this.sandbox.updateComponentProperties({ label });
        });
        this.availableFieldDefinitions$ = combineLatest([this.recordDefinition$, this.recordEditorMode$]).pipe(map(([recordDefinition, recordEditorMode]) => {
            if (recordDefinition && recordDefinition.fieldDefinitions) {
                return recordDefinition.fieldDefinitions
                    .filter((fieldDefinition) => includes(this.fieldResourceTypes, fieldDefinition.resourceType))
                    .filter((fieldDefinition) => {
                    const isSystemField = this.rxFieldDefinitionService.isSystemField(fieldDefinition);
                    return !isSystemField || (isSystemField && recordEditorMode === RecordEditorMode.Edit);
                });
            }
            else {
                return [];
            }
        }), shareReplay(1));
        this.label$ = this.sandbox.componentProperties$.pipe(map((componentProperties) => {
            return componentProperties && componentProperties.fieldId ? componentProperties.label : '<No field selected>';
        }));
        this.sandbox.componentProperties$
            .pipe(mergeMap((componentProperties) => this.validate(componentProperties)), distinctUntilChanged(isEqual))
            .subscribe((validationIssues) => {
            this.sandbox.setValidationIssues(validationIssues);
        });
        this.availableFieldDefinitions$
            .pipe(switchMap(() => this.getInspectorConfig()))
            .subscribe((inspectorConfig) => {
            this.sandbox.updateInspectorConfig(inspectorConfig);
        });
        this.sandbox.componentProperties$
            .pipe(switchMap(() => this.getBreadcrumb()), distinctUntilChanged())
            .subscribe((breadcrumb) => {
            this.sandbox.setBreadcrumbs(breadcrumb);
        });
        combineLatest([this.sandbox.getComponentPropertyValue('label'), this.selectedFieldDefinition$])
            .pipe(map(([label, fieldDefinition]) => label || (fieldDefinition ? `[${fieldDefinition.name}]` : `[${this.sandbox.descriptor.name}]`)), distinctUntilChanged())
            .subscribe((componentName) => {
            this.sandbox.setSettablePropertiesDataDictionary(componentName, this.getSettableProperties());
        });
    }
    getPropertiesByName(properties) {
        const result = Object.assign({}, properties);
        if (!result.styles) {
            delete result.styles;
        }
        return result;
    }
    validate(componentProperties) {
        const validationIssues = [];
        if (isEmpty(componentProperties.fieldId)) {
            validationIssues.push(this.sandbox.createError('Field name cannot be blank.', 'fieldId'));
        }
        validationIssues.push(...validateStandardProps(componentProperties));
        return of(validationIssues);
    }
    getBreadcrumb() {
        return of(null).pipe(withLatestFrom(this.sandbox.componentProperties$), map(([initial, componentProperties]) => componentProperties.label));
    }
    getInspectorConfig() {
        return of(null).pipe(withLatestFrom(this.availableFieldDefinitions$, this.recordDefinitionName$, this.parentGuid$, this.isSystemField$), map(([initial, recordFieldsSelectItems, recordDefinitionName, parentGuid, isSystemField]) => {
            return this.getBaseInspectorConfig(recordFieldsSelectItems, recordDefinitionName, parentGuid, isSystemField);
        }));
    }
    getSettableProperties() {
        const disabledPropDataDictionary = find(this.sandbox.descriptor.properties, { name: 'disabled' })
            ? [
                {
                    label: 'Disabled',
                    expression: `\${view.components.${this.sandbox.guid}.disabled}`
                }
            ]
            : [];
        const hiddenPropDataDictionary = find(this.sandbox.descriptor.properties, { name: 'disabled' })
            ? [
                {
                    label: 'Hidden',
                    expression: `\${view.components.${this.sandbox.guid}.hidden}`
                }
            ]
            : [];
        return [...disabledPropDataDictionary, ...hiddenPropDataDictionary];
    }
    getBaseInspectorFields(selectedFieldDefinitions, isSystemField) {
        return [].concat([
            {
                name: 'fieldId',
                component: SelectFormControlComponent,
                options: {
                    label: 'Field name',
                    required: true,
                    options: selectedFieldDefinitions.map((definition) => ({
                        name: definition.name,
                        id: String(definition.id)
                    }))
                }
            },
            {
                name: 'label',
                component: TextFormControlComponent,
                options: {
                    label: 'Display label'
                }
            }
        ], isSystemField
            ? []
            : [
                {
                    name: 'value',
                    component: ExpressionInspectorControlComponent,
                    options: {
                        label: 'Value'
                    }
                },
                getDisabledFieldInspectorConfig()
            ], getStandardPropsInspectorConfigs());
    }
    getBaseInspectorConfig(recordFieldsSelectItems, recordDefinitionName, parentGuid, isSystemField) {
        const displayName = this.rxDefinitionNameService.getDisplayName(recordDefinitionName || '');
        let controls;
        if (recordDefinitionName) {
            if (recordFieldsSelectItems.length) {
                controls = this.getBaseInspectorFields(recordFieldsSelectItems, isSystemField);
            }
            else {
                controls = [
                    {
                        component: ValidationFormControlComponent,
                        options: {
                            text: `${displayName} does not have fields that can be bound to this field type.`,
                            componentGuid: parentGuid,
                            propertyName: 'recordDefinitionName'
                        }
                    }
                ];
            }
        }
        else {
            controls = [
                {
                    component: ValidationFormControlComponent,
                    options: {
                        text: 'You must select a Record definition before editing field component.',
                        componentGuid: parentGuid,
                        propertyName: 'recordDefinitionName' // todo remove that hardcode
                    }
                }
            ];
        }
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls
                }
            ]
        };
    }
}
//# sourceMappingURL=base-record-editor-field-design.class.js.map