import { map } from 'rxjs/operators';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { SelectFormControlComponent } from '@helix/platform/shared/components';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
import { BooleanFieldEditingMode } from '../boolean-field.types';
import { findIndex, map as _map } from 'lodash';
import { Tooltip } from '@helix/platform/shared/api';
export class BooleanFieldDesignModel extends BaseRecordEditorFieldDesign {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.fieldResourceTypes = [RX_RECORD_DEFINITION.resourceTypes.boolean];
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign(Object.assign({}, BaseRecordEditorFieldDesign.getInitialProperties()), { editingMode: BooleanFieldEditingMode.Switch }), initialProperties);
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
                tooltip: new Tooltip('An optional Boolean field will always be displayed as a Switch.'),
                required: false,
                options: _map(BooleanFieldEditingMode, (value, name) => ({
                    id: value,
                    name
                }))
            }
        };
        if (valueControlIndex !== -1) {
            inspectorConfig.inspectorSectionConfigs[0].controls.splice(valueControlIndex, 0, editingModeControl);
        }
        return inspectorConfig;
    }
}
//# sourceMappingURL=boolean-field-design.model.js.map