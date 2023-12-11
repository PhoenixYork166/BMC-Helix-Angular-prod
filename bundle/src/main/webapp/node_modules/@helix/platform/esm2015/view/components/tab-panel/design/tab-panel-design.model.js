import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { getStandardPropsInspectorConfigs, validateStandardProps, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { Tooltip } from '@helix/platform/shared/api';
import { RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
import { combineLatest, ReplaySubject } from 'rxjs';
export class TabPanelDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.tabContainerGuids$ = this.sandbox.getChildComponentGuids().pipe(shareReplay(1));
        this.tabContainerComponents$ = this.sandbox
            .getChildComponents((component) => component.type === RxViewComponentType.TabContainer)
            .pipe(shareReplay(1), takeUntil(this.sandbox.destroyed$));
        this.selectedTabGuid$ = new ReplaySubject(null);
    }
    static getInitialProperties(initialProperties) {
        return Object.assign(Object.assign({ name: null }, RX_STANDARD_PROPS_DEFAULT_VALUES), initialProperties);
    }
    rxInit() {
        this.sandbox.componentProperties$.pipe(take(1)).subscribe(() => {
            this.sandbox.updateInspectorConfig(this.getInspector());
        });
        this.sandbox.componentProperties$.subscribe((componentProperties) => this.validate(componentProperties));
        this.tabContainerGuids$
            .pipe(map((guids) => !isEmpty(guids)), take(1))
            .subscribe((hasChildComponents) => {
            if (!hasChildComponents) {
                this.sandbox.setChildren([
                    {
                        type: RxViewComponentType.TabContainer,
                        data: {
                            label: 'Tab 1'
                        }
                    },
                    {
                        type: RxViewComponentType.TabContainer,
                        data: {
                            label: 'Tab 2'
                        }
                    }
                ]);
            }
        });
        this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
            const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;
            this.sandbox.setSettablePropertiesDataDictionary(componentName, [
                {
                    label: 'Hidden',
                    expression: this.getExpressionForProperty('hidden')
                },
                {
                    label: 'Active Tab Index',
                    expression: this.getExpressionForProperty('activeTabIndex')
                }
            ]);
        });
    }
    addTab() {
        this.sandbox.addComponent({
            type: RxViewComponentType.TabContainer,
            propertiesByName: {
                label: 'New tab'
            }
        });
    }
    removeTab(guid) {
        this.sandbox.removeComponents([guid]);
        combineLatest([this.selectedTabGuid$, this.tabContainerGuids$])
            .pipe(take(1), takeUntil(this.sandbox.destroyed$))
            .subscribe(([selectedTabGuid, tabContainerGuids]) => {
            if (guid === selectedTabGuid) {
                this.selectTab(tabContainerGuids[0]);
            }
        });
    }
    selectTab(guid, skipSelectComponent = false) {
        this.selectedTabGuid$.next(guid);
        if (!skipSelectComponent) {
            setTimeout(() => {
                this.sandbox.selectComponent(guid);
            });
        }
    }
    dropPredicate() {
        return false;
    }
    moveComponent(guid, insertIndex) {
        this.sandbox.moveComponent(guid, insertIndex, this.sandbox.guid);
    }
    validate(properties) {
        this.sandbox.setValidationIssues(validateStandardProps(properties));
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
                                tooltip: new Tooltip('Enter a name to uniquely identify the Tab panel')
                            }
                        },
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=tab-panel-design.model.js.map