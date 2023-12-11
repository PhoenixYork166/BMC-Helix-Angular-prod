import { Tooltip } from '@helix/platform/shared/api';
import { SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
import { getStandardPropsInspectorConfigs, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { isEmpty, values } from 'lodash';
import { map, take } from 'rxjs/operators';
import { RX_BUTTON_BAR, RxButtonBarAlignment } from '../button-bar.types';
export class ButtonBarDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.hasChildren$ = this.sandbox.getChildComponentGuids().pipe(map((guids) => !isEmpty(guids)));
        this.componentProperties$ = this.sandbox.componentProperties$;
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ alignment: RxButtonBarAlignment.Left, name: null }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
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
        this.componentProperties$.subscribe((props) => {
            this.validate(props);
        });
    }
    dropPredicate(data) {
        return data.draggedViewComponentDescriptor.type === RxViewComponentType.ActionButton;
    }
    validate(model) {
        this.sandbox.setValidationIssues(validateStandardProps(model));
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
                                tooltip: new Tooltip('Enter a name to uniquely identify the Button bar.')
                            }
                        },
                        {
                            name: 'alignment',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Alignment',
                                options: values(RX_BUTTON_BAR.alignmentOptions),
                                sortAlphabetically: false
                            }
                        },
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=button-bar-design.model.js.map