import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { ExpressionFormControlComponent } from '@helix/platform/shared/components';
import { distinctUntilChanged, pluck, take } from 'rxjs/operators';
import { RxSetPropertyViewActionExpressionConfigurator } from './set-property-view-action-expression-configurator.class';
export class RxSetPropertyViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.expressionConfigurator = new RxSetPropertyViewActionExpressionConfigurator(this.injector, this.sandbox.descriptor.name, this.guid);
        this.sandbox.actionProperties$
            .pipe(take(1))
            .subscribe(() => this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig()));
        this.sandbox.actionProperties$.pipe(pluck('propertyPath'), distinctUntilChanged()).subscribe((propertyPath) => {
            let componentApi = null;
            if (propertyPath && propertyPath.length) {
                // Extract <ID> from ${view.components.<ID>.<Path>}
                const matches = propertyPath.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                if (matches && matches[1]) {
                    componentApi = `\${view.components.${matches[1]}.api}`;
                }
            }
            this.sandbox.updateActionProperties({
                componentApi
            });
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ componentApi: null, propertyPath: null, propertyValue: null }, initialProperties);
    }
    getActionEditorConfig() {
        return [
            {
                name: 'propertyPath',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Property path',
                    dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyPath'),
                    operators: this.expressionConfigurator.getOperators('propertyPath'),
                    isRequired: true
                }
            },
            {
                name: 'propertyValue',
                component: ExpressionFormControlComponent,
                options: {
                    label: 'Property value',
                    dataDictionary$: this.expressionConfigurator.getDataDictionary('propertyValue'),
                    operators: this.expressionConfigurator.getOperators('propertyValue')
                }
            }
        ];
    }
}
//# sourceMappingURL=set-property-view-action-design-model.class.js.map