import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { ExpressionFormControlComponent, SelectFormControlComponent } from '@helix/platform/shared/components';
import { RX_LAUNCH_BEHAVIOR } from '@helix/platform/view/api';
import { map } from 'lodash';
export class RxLaunchUrlViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ url: null, launchBehavior: RX_LAUNCH_BEHAVIOR.newWindow.value }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'url',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'URL',
                    isRequired: true,
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                    operators: this.expressionConfigurator.getOperators()
                }
            },
            {
                name: 'launchBehavior',
                component: SelectFormControlComponent,
                options: {
                    label: 'Launch behavior',
                    options: map(RX_LAUNCH_BEHAVIOR, (value) => ({
                        name: value.content,
                        id: value.value
                    })),
                    sortAlphabetically: false
                }
            }
        ];
    }
}
//# sourceMappingURL=launch-url-view-action-design-model.class.js.map