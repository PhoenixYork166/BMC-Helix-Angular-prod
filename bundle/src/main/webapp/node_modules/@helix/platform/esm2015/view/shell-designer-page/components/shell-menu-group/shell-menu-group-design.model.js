import { RX_PERMISSION, Tooltip } from '@helix/platform/shared/api';
import { RxComponentPermissionEditorWidgetComponent, validateCssClassName, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { SwitchFormControlComponent, TagsFormControlComponent, TextFormControlComponent } from '@helix/platform/shared/components';
import { trim } from 'lodash';
import { pluck } from 'rxjs/operators';
export class RxShellMenuGroupDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.label$ = this.componentProperties$.pipe(pluck('menuGroupName'));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ menuGroupName: 'Menu group', hidden: false, styles: null }, initialProperties);
    }
    static getDefaultPermissions() {
        const defaultPermissions = [
            {
                ownerId: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                type: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
            }
        ];
        return defaultPermissions;
    }
    rxInit() {
        this.sandbox.updateInspectorConfig(this.getInspector());
        this.componentProperties$.subscribe((props) => {
            this.sandbox.setValidationIssues(this.validate(props));
        });
        this.sandbox.getComponentPropertyValue('menuGroupName').subscribe((menuGroupName) => {
            this.sandbox.setBreadcrumbs(menuGroupName);
        });
    }
    validate(props) {
        const validationIssues = [];
        if (!trim(props.menuGroupName)) {
            validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuGroupName'));
        }
        validationIssues.push(...validateCssClassNames(props.styles));
        return validationIssues;
    }
    getInspector() {
        return {
            inspectorSectionConfigs: [
                {
                    label: 'Properties',
                    controls: [
                        {
                            name: 'menuGroupName',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Label',
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
    }
}
//# sourceMappingURL=shell-menu-group-design.model.js.map