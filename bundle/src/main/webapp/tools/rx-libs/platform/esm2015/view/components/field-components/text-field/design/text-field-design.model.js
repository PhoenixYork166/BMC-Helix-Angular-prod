import { map, switchMap } from 'rxjs/operators';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RX_DEFINITION_PICKER, SwitchFormControlComponent } from '@helix/platform/shared/components';
import { NamedListFilterExpressionConfigurator } from '@helix/platform/view/designer';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
import { omit } from 'lodash';
import { Tooltip } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
export class TextFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.character];
        this.translateService = this.injector.get(TranslateService);
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign(Object.assign({}, BaseRecordEditorFieldDesign.getInitialProperties()), { enableMultiSelection: null, additionalQueryCriteria: null }), initialProperties);
    }
    getInspectorConfig() {
        return this.selectedFieldDefinition$.pipe(switchMap((fieldDefinition) => super
            .getInspectorConfig()
            .pipe(map((inspectorConfig) => (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.namedListDefinition)
            ? this.getNamedListInspectorConfig(inspectorConfig, fieldDefinition)
            : inspectorConfig))));
    }
    getNamedListInspectorConfig(inspectorConfig, fieldDefinition) {
        const namedListFilterExpressionConfigurator = new NamedListFilterExpressionConfigurator(fieldDefinition, this.injector);
        const enableMultiSelectionControl = {
            name: 'enableMultiSelection',
            component: SwitchFormControlComponent,
            options: {
                label: 'Enable multi-selection'
            }
        };
        const additionalQueryCriteriaControls = [
            {
                name: 'namedListDefinitionName',
                component: RxDefinitionPickerComponent,
                isDisabled: true,
                options: {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.named-list.label'),
                    definitionType: RX_DEFINITION_PICKER.definitionTypes.namedList.type
                }
            },
            {
                name: 'additionalQueryCriteria',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Additional named list filter',
                    tooltip: new Tooltip('Build a filter to apply at runtime in addition to the filter, if any, specified in the named list definition.'),
                    dataDictionary$: namedListFilterExpressionConfigurator.getDataDictionary(),
                    operators: namedListFilterExpressionConfigurator.getOperators()
                }
            }
        ];
        inspectorConfig.inspectorSectionConfigs[0].controls.push(enableMultiSelectionControl);
        inspectorConfig.inspectorSectionConfigs[0].controls.push(...additionalQueryCriteriaControls);
        // update the named list name for named list inspector control
        this.sandbox.updateComponentProperties({ namedListDefinitionName: fieldDefinition.namedListDefinition });
        return inspectorConfig;
    }
    getPropertiesByName(properties) {
        return omit(super.getPropertiesByName(properties), 'namedListDefinitionName');
    }
}
//# sourceMappingURL=text-field-design.model.js.map