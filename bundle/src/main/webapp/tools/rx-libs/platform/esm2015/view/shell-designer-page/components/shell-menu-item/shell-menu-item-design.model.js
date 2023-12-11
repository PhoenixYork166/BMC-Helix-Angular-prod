import { RX_PERMISSION, Tooltip } from '@helix/platform/shared/api';
import { OpenViewActionLaunchBehavior, OpenViewActionModalSize, OpenViewActionType, RX_LAUNCH_BEHAVIOR, RX_SHELL, RxViewDefinitionCacheService, RxViewLayout } from '@helix/platform/view/api';
import { RxComponentPermissionEditorWidgetComponent, validateCssClassName, validateCssClassNames, ViewDesignerComponentModel, ViewDesignerFacade } from '@helix/platform/view/designer';
import { IconPickerFormControlComponent, SelectFormControlComponent, SwitchFormControlComponent, TagsFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { forEach, isEmpty, keys, map as _map, pick, reject, transform, trim } from 'lodash';
import { map, pairwise, pluck, skip, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { RxOpenViewModelHelperService } from '@helix/platform/view/actions';
export class RxShellMenuItemDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.label$ = this.componentProperties$.pipe(pluck('menuItemName'));
        this.isActionItem$ = this.sandbox.getParentComponentGuid().pipe(switchMap((guid) => this.sandbox.getLayout(guid)), map((layout) => this.isActionItem(layout)));
        this.menuItemIcon$ = this.sandbox.getComponentPropertyValue('menuItemIcon');
        this.iconClass$ = this.menuItemIcon$.pipe(map((className) => (className ? `d-icon-left-${className}` : '')));
        this.menuItemNameLabel = 'Label';
        this.rxViewDefinitionCacheService = this.injector.get(RxViewDefinitionCacheService);
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.rxOpenViewModelHelperService = this.injector.get(RxOpenViewModelHelperService);
        this.shellActions = {
            [RX_SHELL.actions.launchURL]: {
                name: RX_SHELL.actions.launchURL,
                label: 'Launch URL',
                parameters: [
                    {
                        name: 'url',
                        component: TextFormControlComponent,
                        options: {
                            label: 'URL',
                            required: true
                        }
                    },
                    {
                        name: 'launchBehavior',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Launch behavior',
                            options: _map(RX_LAUNCH_BEHAVIOR, (value) => ({
                                name: value.content,
                                id: value.value
                            })),
                            required: true,
                            sortAlphabetically: false
                        }
                    }
                ],
                requiredParams: {
                    url: 'URL',
                    launchBehavior: 'Launch behavior'
                },
                defaultParams: {
                    url: null,
                    launchBehavior: RX_LAUNCH_BEHAVIOR.newWindow.value
                }
            },
            [RX_SHELL.actions.navigateToView]: {
                name: RX_SHELL.actions.navigateToView,
                label: 'Open view',
                requiredParams: {
                    viewDefinitionName: 'View'
                },
                defaultParams: {
                    viewDefinitionName: null,
                    'viewParams.*': null,
                    'presentation.type': OpenViewActionType.FullWidth,
                    'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow,
                    'presentation.modalSize': null,
                    'presentation.title': null
                }
            },
            [RX_SHELL.actions.navigateToSmartReporting]: {
                name: RX_SHELL.actions.navigateToSmartReporting,
                label: 'Navigate to Smart Reporting'
            }
        };
        this.viewDefinitionName$ = this.sandbox.getComponentPropertyValue('viewDefinitionName');
        this.inputParams$ = this.viewDefinitionName$.pipe(switchMap((viewDefinitionName) => this.getViewInputParams(viewDefinitionName)), map((params) => _map(params, 'name')), tap((currentViewInputNames) => {
            this.currentViewInputNames = currentViewInputNames;
        }));
        this.currentViewInputNames = [];
        this.isInShellRoot$ = this.sandbox.getParentComponentGuid().pipe(switchMap((guid) => this.viewDesignerFacade.getComponentType(guid)), map((type) => type === RX_SHELL.componentName), tap((isInShellRoot) => (this.isInShellRoot = isInShellRoot)));
    }
    static getInitialProperties(initialProperties) {
        const result = Object.assign({ menuItemName: 'New menu item', menuItemIcon: null, hidden: false, styles: null, actionName: RX_SHELL.actions.navigateToView, 'presentation.type': OpenViewActionType.FullWidth, 'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
        // navigateToState not supported anymore, so converting to navigateToView
        if (result.actionName === RX_SHELL.actions.navigateToState) {
            result.actionName = RX_SHELL.actions.navigateToView;
            delete result.state;
        }
        if (result.actionName === RX_SHELL.actions.navigateToView) {
            result['presentation.modalSize'] = OpenViewActionModalSize.Medium;
        }
        return result;
    }
    static getDefaultPermissions() {
        return [
            {
                ownerId: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                type: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
            }
        ];
    }
    rxInit() {
        combineLatest([this.componentProperties$, this.inputParams$, this.isInShellRoot$, this.isActionItem$]).subscribe(([props, inputParams, isInShellRoot, isActionItem]) => {
            this.sandbox.updateInspectorConfig(this.getInspector(props, inputParams, isInShellRoot, isActionItem));
            this.sandbox.setValidationIssues(this.validate(props));
        });
        // clear view input params after viewDefinitionName is changed
        this.viewDefinitionName$
            .pipe(skip(1), withLatestFrom(this.componentProperties$))
            .subscribe(([viewDefinitionName, props]) => {
            const viewParams = this.getEmptyViewParams(props);
            if (!isEmpty(viewParams)) {
                this.sandbox.updateComponentProperties(viewParams);
            }
        });
        this.sandbox.getComponentPropertyValue('menuItemName').subscribe((menuGroupName) => {
            this.sandbox.setBreadcrumbs(menuGroupName);
        });
        // clear previous action properties after actionName is changed
        this.sandbox
            .getComponentPropertyValue('actionName')
            .pipe(pairwise(), withLatestFrom(this.componentProperties$))
            .subscribe(([[prevActionName, actionName], props]) => {
            const prevProps = this.getActionDefaultProps(prevActionName, props);
            const nextProps = this.getActionDefaultProps(actionName, props);
            const result = Object.assign(Object.assign({}, prevProps), nextProps);
            if (!isEmpty(result)) {
                this.sandbox.updateComponentProperties(result);
            }
        });
    }
    getPropertiesByName(props) {
        const componentProps = ['menuItemName', 'menuItemIcon', 'hidden', 'styles', 'actionName'];
        const viewParams = props.actionName === RX_SHELL.actions.navigateToView
            ? this.currentViewInputNames.map((name) => `viewParams.${name}`)
            : [];
        const actionProps = reject(this.getActionProps(props.actionName, props), (prop) => {
            return props['presentation.type'] === OpenViewActionType.FullWidth
                ? prop === 'presentation.modalSize' || prop === 'presentation.title'
                : prop === 'presentation.launchBehavior';
        });
        return pick(props, ...componentProps, ...actionProps, ...viewParams);
    }
    getEmptyViewParams(props) {
        return transform(props, (result, value, key) => {
            if (key.startsWith('viewParams')) {
                result[key] = null;
            }
        }, {});
    }
    getActionDefaultProps(actionName, props) {
        const currentAction = this.shellActions[actionName];
        return transform(currentAction.defaultParams, (res, value, name) => {
            if (name.endsWith('.*')) {
                const key = name.replace('*', '');
                forEach(props, (propValue, propName) => {
                    if (propName.startsWith(key)) {
                        res[propName] = value;
                    }
                });
            }
            else {
                res[name] = value;
            }
        }, {});
    }
    getActionProps(actionName, props) {
        const currentAction = this.shellActions[actionName];
        return transform(currentAction.defaultParams, (res, value, name) => {
            if (!name.endsWith('.*')) {
                res.push(name);
            }
        }, []);
    }
    getInspector(props, viewInputParamNames, isInShellRoot, isActionItem = false) {
        var _a;
        const inspector = {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'menuItemName',
                            component: TextFormControlComponent,
                            options: {
                                label: this.menuItemNameLabel,
                                required: true
                            }
                        },
                        {
                            name: 'hidden',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Hidden'
                            }
                        },
                        {
                            name: 'styles',
                            component: TagsFormControlComponent,
                            options: {
                                label: 'CSS classes',
                                placeholder: 'Add CSS classes',
                                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                                errorCheck: validateCssClassName
                            }
                        },
                        {
                            component: RxComponentPermissionEditorWidgetComponent,
                            options: {
                                label: 'Permissions',
                                type: 'view',
                                componentGuid: this.sandbox.guid
                            }
                        }
                    ]
                }
            ]
        };
        const menuItemIconControl = {
            name: 'menuItemIcon',
            component: IconPickerFormControlComponent,
            options: {
                label: 'Icon'
            }
        };
        if (!isInShellRoot || isActionItem) {
            inspector.inspectorSectionConfigs[0].controls.splice(1, 0, menuItemIconControl);
        }
        const actionSection = {
            label: 'Action',
            controls: [
                {
                    name: 'actionName',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Action name',
                        options: _map(this.shellActions, (actionDescriptor) => ({
                            name: actionDescriptor.label,
                            id: actionDescriptor.name
                        }))
                    }
                }
            ]
        };
        inspector.inspectorSectionConfigs.push(actionSection);
        if (props.actionName) {
            const actionDescriptor = this.shellActions[props.actionName];
            if ((_a = actionDescriptor === null || actionDescriptor === void 0 ? void 0 : actionDescriptor.parameters) === null || _a === void 0 ? void 0 : _a.length) {
                actionSection.controls.push(...actionDescriptor.parameters);
            }
            if (props.actionName === RX_SHELL.actions.navigateToView) {
                actionSection.controls.push(...this.rxOpenViewModelHelperService.getOpenViewInspector(viewInputParamNames.map((name) => ({ name })), props['presentation.type'], props['presentation.modalSize'], this.expressionConfigurator));
            }
        }
        return inspector;
    }
    validate(props) {
        const validationIssues = [];
        if (!trim(props.menuItemName)) {
            validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuItemName'));
        }
        validationIssues.push(...this.validateActionParams(props), ...validateCssClassNames(props.styles));
        return validationIssues;
    }
    validateActionParams(props) {
        const validationIssues = [];
        const currentAction = this.shellActions[props.actionName];
        (keys(currentAction.requiredParams) || [])
            .filter((param) => !props[param])
            .forEach((param) => {
            validationIssues.push(this.sandbox.createError(`${currentAction.requiredParams[param] || param} cannot be blank.`, param));
        });
        return validationIssues;
    }
    getViewInputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('inputParams'))
            : of([]);
    }
    isActionItem(layout) {
        const actionOutlet = layout === null || layout === void 0 ? void 0 : layout.outlets.find((outlet) => outlet.name === RX_SHELL.outlets.actions);
        return (actionOutlet && RxViewLayout.outletHasChild(actionOutlet, this.sandbox.guid)) || false;
    }
}
//# sourceMappingURL=shell-menu-item-design.model.js.map