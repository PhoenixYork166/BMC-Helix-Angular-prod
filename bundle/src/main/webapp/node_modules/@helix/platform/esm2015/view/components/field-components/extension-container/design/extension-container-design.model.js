import { getStandardPropsInspectorConfigs, validateAvailableOnDevicesProp, validateCssClassNames, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { first, map, take, takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Tooltip } from '@helix/platform/shared/api';
import { RX_AVAILABLE_ON_DEVICES_PROP_NAME, RX_STANDARD_PROPS_DEFAULT_VALUES, RxViewComponentType } from '@helix/platform/view/api';
import { compact, flatten, isEmpty } from 'lodash';
export class ExtensionContainerDesignModel extends ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.parentGuid$ = this.sandbox.getParentComponentGuid(RxViewComponentType.RecordEditor).pipe(take(1));
        this.initialProperties = Object.assign({ name: '', recordDefinition: '', recordInstance: '' }, RX_STANDARD_PROPS_DEFAULT_VALUES);
        combineLatest([this.parentGuid$, this.componentProperties$])
            .pipe(first())
            .subscribe(([parentGuid, componentProperties]) => {
            const properties = Object.assign(Object.assign(Object.assign({}, this.initialProperties), componentProperties), { recordInstance: `\${view.components.${parentGuid}.recordInstance}`, recordDefinition: `\${view.components.${parentGuid}.recordDefinition}` });
            this.sandbox.updateComponentProperties(properties);
            this.sandbox.updateInspectorConfig(this.getInspectorConfig());
        });
        combineLatest([
            this.sandbox.getComponentPropertyValue('name').pipe(map((value) => {
                if (isEmpty(value)) {
                    return this.sandbox.createError('Name cannot be blank.', 'name');
                }
            })),
            this.sandbox.getComponentPropertyValue('styles').pipe(map(validateCssClassNames)),
            this.sandbox
                .getComponentPropertyValue(RX_AVAILABLE_ON_DEVICES_PROP_NAME)
                .pipe(map(validateAvailableOnDevicesProp))
        ])
            .pipe(map(flatten), map(compact), takeUntil(this.sandbox.destroyed$))
            .subscribe((validationIssues) => this.sandbox.setValidationIssues(validationIssues));
    }
    getInspectorConfig() {
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
                                required: true,
                                tooltip: new Tooltip('Enter a name to uniquely identify the Extension container')
                            }
                        },
                        ...getStandardPropsInspectorConfigs()
                    ]
                }
            ]
        };
    }
}
//# sourceMappingURL=extension-container-design.model.js.map