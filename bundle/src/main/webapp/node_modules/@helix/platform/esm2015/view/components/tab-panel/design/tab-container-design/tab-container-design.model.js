import { getStandardPropsInspectorConfigs, validateAvailableOnDevicesProp, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Tooltip } from '@helix/platform/shared/api';
import { SelectFormControlComponent, SwitchFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { compact, flatten, times, values } from 'lodash';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, skip, take, takeUntil } from 'rxjs/operators';
import { RX_CONTAINER } from '../../../container/container.constant';
import { ContainerRowWrap } from '../../../container/container.types';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_STANDARD_PROPS_DEFAULT_VALUES } from '@helix/platform/view/api';
export class TabContainerDesignModel extends ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.hiddenOnCanvas$ = new BehaviorSubject(false);
        this.selectedTabGuid$ = new Subject();
        this.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
        });
        combineLatest([
            this.sandbox
                .getComponentPropertyValue('label')
                .pipe(map((value) => (value ? null : this.sandbox.createError('Label cannot be blank.', 'label')))),
            this.sandbox.getComponentPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.sandbox
                .getComponentPropertyValue(RX_AVAILABLE_ON_DEVICES_PROP_NAME)
                .pipe(map(validateAvailableOnDevicesProp))
        ])
            .pipe(map(flatten), map(compact))
            .subscribe((validationIssues) => this.sandbox.setValidationIssues(validationIssues));
        this.selectedTabGuid$.pipe(takeUntil(this.sandbox.destroyed$)).subscribe((selectedTabGuid) => {
            this.hiddenOnCanvas$.next(this.sandbox.guid !== selectedTabGuid);
        });
        this.sandbox
            .getComponentPropertyValue('columnCount')
            .pipe(skip(1))
            .subscribe((columnCount) => {
            this.sandbox.setLayout(this.getDefaultColumnSpans(Number(columnCount)));
        });
        this.sandbox.getComponentPropertyValue('label').subscribe((label) => {
            const componentName = label ? `${this.sandbox.descriptor.name} (${label})` : this.sandbox.descriptor.name;
            this.sandbox.setSettablePropertiesDataDictionary(componentName, [
                {
                    label: 'Hidden',
                    expression: this.getExpressionForProperty('hidden')
                }
            ]);
            this.sandbox.setBreadcrumbs(label);
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ columnCount: '1', enableLazyLoading: false, label: '', rowWrap: ContainerRowWrap.Sm }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
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
                            name: 'label',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Label',
                                required: true
                            }
                        },
                        {
                            name: 'enableLazyLoading',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Enable lazy loading'
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
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=tab-container-design.model.js.map