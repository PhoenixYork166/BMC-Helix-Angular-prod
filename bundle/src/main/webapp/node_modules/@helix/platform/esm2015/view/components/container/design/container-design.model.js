import { Tooltip } from '@helix/platform/shared/api';
import { SelectFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { RX_STANDARD_PROPS_DEFAULT_VALUES, RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import { getAvailableOnDevicesInspectorConfig, getHiddenFieldInspectorConfig, getStylesFieldInspectorConfig, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { isEmpty, times, values } from 'lodash';
import { map, skip, take, takeUntil } from 'rxjs/operators';
import { RX_CONTAINER } from '../container.constant';
import { ContainerRowWrap } from '../container.types';
const cssClassesAutocompleteValues = RX_VIEW_DEFINITION.styles.map((style) => ({ text: style.name, data: { value: style.id } }));
export class ContainerDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.hasChildren$ = this.sandbox.getChildComponentGuids().pipe(map((guids) => !isEmpty(guids)));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ name: null, rowWrap: ContainerRowWrap.Sm, columnCount: '1' }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
        });
        this.componentProperties$.subscribe((componentProperties) => this.validate(componentProperties));
        this.sandbox
            .getComponentPropertyValue('columnCount')
            .pipe(skip(1), takeUntil(this.sandbox.destroyed$))
            .subscribe((columnCount) => {
            this.sandbox.setLayout(this.getDefaultColumnSpans(Number(columnCount)));
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
    validate(model) {
        this.sandbox.setValidationIssues(validateStandardProps(model));
    }
    getPropertiesByName(properties) {
        const result = Object.assign({}, properties);
        if (!result.styles) {
            delete result.styles;
        }
        return result;
    }
    setContainerLayout(columnSizes) {
        this.sandbox.setLayout(columnSizes);
    }
    getDefaultColumnSpans(columnCount) {
        const columnSpans = [];
        const span = Math.floor(RX_CONTAINER.maxColumnSpan / columnCount);
        times(columnCount, () => columnSpans.push(span));
        columnSpans[columnSpans.length - 1] = (RX_CONTAINER.maxColumnSpan % columnCount) + span;
        return columnSpans;
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
                                tooltip: new Tooltip('Enter a name to uniquely identify the Container.')
                            }
                        },
                        {
                            name: 'columnCount',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Number of columns',
                                required: true,
                                tooltip: new Tooltip('Resize container columns on the canvas by dragging the dashed column separator line.'),
                                options: times(6, (index) => ({ id: (++index).toString(), name: index.toString() }))
                            }
                        },
                        {
                            name: 'rowWrap',
                            component: SelectFormControlComponent,
                            options: {
                                label: 'Row wrap',
                                sortAlphabetically: false,
                                options: values(RX_CONTAINER.rowWrapOptions),
                                tooltip: new Tooltip(`The Row wrap property controls the layout of multi-column containers based on
                    the width of the view. When the width of the view is decreased to a width less
                    than the selected Row wrap value, each container column after the first one
                    wraps onto a new line.`)
                            }
                        },
                        getHiddenFieldInspectorConfig(),
                        getAvailableOnDevicesInspectorConfig(),
                        getStylesFieldInspectorConfig(cssClassesAutocompleteValues)
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=container-design.model.js.map