import { RX_SHELL } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { omit } from 'lodash';
import { SwitchFormControlComponent } from '@helix/platform/shared/components';
import { RxShellGlobalSearchRecordsControlComponent } from './controls/shell-global-search-records-control/shell-global-search-records-control.component';
import { RxShellMenuItemsControlComponent } from './controls/shell-menu-items-control/shell-menu-items-control.component';
export class RxShellDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.allowAppSwitching$ = this.sandbox.getComponentPropertyValue('allowAppSwitching');
        this.globalSearchEnabled$ = this.sandbox.getComponentPropertyValue('globalSearchEnabled');
        this.menuItems$ = this.sandbox.getChildComponentsTree();
        this.childMenuItemsCount$ = this.sandbox
            .getChildComponentGuids((component) => component.type === RX_SHELL.navBar.menuItem, true)
            .pipe(map((items) => items.length), distinctUntilChanged());
    }
    static getInitialProperties(initialProperties) {
        const result = Object.assign(Object.assign({ allowAppSwitching: true, globalSearchDisabled: true, globalSearchRecords: [] }, initialProperties), { 
            // removing custom search state if definition saved in old designer
            // as custom state not supported anymore
            globalSearchUseDefault: true, globalSearchCustomSearchState: null });
        // additional inverted design field
        result.globalSearchEnabled = !result.globalSearchDisabled;
        return result;
    }
    rxInit() {
        this.sandbox.getComponentPropertyValue('globalSearchDisabled').subscribe((globalSearchDisabled) => {
            this.sandbox.updateInspectorConfig(this.getInspector(globalSearchDisabled));
        });
        this.globalSearchEnabled$.subscribe((globalSearchEnabled) => {
            this.sandbox.updateComponentProperties({ globalSearchDisabled: !globalSearchEnabled });
        });
        combineLatest([
            this.sandbox.getComponentPropertyValue('globalSearchRecords'),
            this.sandbox.getComponentPropertyValue('globalSearchDisabled'),
            this.childMenuItemsCount$
        ]).subscribe(([globalSearchRecords, globalSearchDisabled, childMenuItemsCount]) => {
            this.sandbox.setValidationIssues(this.validate(globalSearchRecords, globalSearchDisabled, childMenuItemsCount));
        });
    }
    getPropertiesByName(props) {
        return omit(props, 'globalSearchEnabled');
    }
    removeMenuItem(guid) {
        this.sandbox.removeComponents([guid]);
    }
    selectMenuItem(guid) {
        this.sandbox.selectComponent(guid);
    }
    validate(globalSearchRecords, globalSearchDisabled, childMenuItemsCount) {
        const validationIssues = [];
        if (childMenuItemsCount === 0) {
            validationIssues.push(this.sandbox.createError('Please add at least one menu item.'));
        }
        if (!globalSearchDisabled && globalSearchRecords.length === 0) {
            validationIssues.push(this.sandbox.createError('Please include at least one record in the global search results view.', 'globalSearchRecords'));
        }
        return validationIssues;
    }
    getInspector(globalSearchDisabled) {
        const globalSearchSectionItems = [
            {
                name: 'globalSearchEnabled',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Enable global search'
                }
            }
        ];
        if (!globalSearchDisabled) {
            globalSearchSectionItems.push({
                name: 'globalSearchRecords',
                component: RxShellGlobalSearchRecordsControlComponent
            });
        }
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'allowAppSwitching',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Enable application launcher'
                            }
                        }
                    ]
                },
                {
                    label: 'Global search',
                    controls: globalSearchSectionItems
                },
                {
                    label: 'Menu items',
                    controls: [
                        {
                            component: RxShellMenuItemsControlComponent,
                            options: {
                                model: this
                            }
                        }
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=shell-design.model.js.map