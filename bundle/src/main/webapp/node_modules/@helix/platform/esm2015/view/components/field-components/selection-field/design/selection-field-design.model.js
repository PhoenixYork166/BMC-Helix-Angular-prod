import { findIndex } from 'lodash';
import { map } from 'rxjs/operators';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { SelectFormControlComponent } from '@helix/platform/shared/components';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
import { RX_SELECTION_FIELD } from '../selection-field.constant';
export class SelectionFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.selection];
        this.editingMode$ = this.sandbox.componentProperties$.pipe(map((componentProperties) => componentProperties.editingMode));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign(Object.assign({}, BaseRecordEditorFieldDesign.getInitialProperties()), { editingMode: RX_SELECTION_FIELD.editingModeValue.dropdown }), initialProperties);
    }
    getInspectorConfig() {
        return super
            .getInspectorConfig()
            .pipe(map((inspectorConfig) => this.editInspectorConfig(inspectorConfig)));
    }
    editInspectorConfig(inspectorConfig) {
        const valueControlIndex = findIndex(inspectorConfig.inspectorSectionConfigs[0].controls, (item) => item.name === 'value');
        const editingModeControl = {
            name: 'editingMode',
            component: SelectFormControlComponent,
            options: {
                label: 'Editing mode',
                required: false,
                options: [
                    {
                        id: RX_SELECTION_FIELD.editingModeValue.dropdown,
                        name: RX_SELECTION_FIELD.editingMode.dropdown
                    },
                    {
                        id: RX_SELECTION_FIELD.editingModeValue.radioButtons,
                        name: RX_SELECTION_FIELD.editingMode.radioButtons
                    }
                ]
            }
        };
        if (valueControlIndex !== -1) {
            inspectorConfig.inspectorSectionConfigs[0].controls.splice(valueControlIndex, 0, editingModeControl);
        }
        return inspectorConfig;
    }
}
//# sourceMappingURL=selection-field-design.model.js.map