import { Tooltip } from '@helix/platform/shared/api';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { getStandardPropsInspectorConfigs, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { take } from 'rxjs/operators';
import { RX_STANDARD_PROPS_DEFAULT_VALUES } from '@helix/platform/view/api';
export class RichTextDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.html$ = this.sandbox.getComponentPropertyValue('html');
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ name: null, html: null }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.sandbox.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
        });
        this.sandbox.componentProperties$.subscribe((properties) => {
            const validationIssues = properties.html ? [] : [this.sandbox.createError('Rich text value cannot be blank.')];
            validationIssues.push(...validateStandardProps(properties));
            this.sandbox.setValidationIssues(validationIssues);
        });
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
    getInspector() {
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
                                tooltip: new Tooltip('Enter a name to uniquely identify the Rich text component')
                            }
                        },
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
    updateComponentProperties(props) {
        this.sandbox.updateComponentProperties(props);
    }
}
//# sourceMappingURL=rich-text-design.model.js.map