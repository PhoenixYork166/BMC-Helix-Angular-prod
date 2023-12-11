import { ExpressionFormControlComponent } from '@helix/platform/shared/components';
import { RxViewDesignerActionModel } from './view-designer-action-model.class';
import { take } from 'rxjs/operators';
export class RxViewDesignerDefaultActionModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.defaultProps = this.sandbox.descriptor.parameters.reduce((initialProps, param) => {
            initialProps[param.name] = param.defaultValue;
            return initialProps;
        }, {});
        this.sandbox.actionProperties$.pipe(take(1)).subscribe((props) => {
            this.sandbox.updateActionProperties(Object.assign(Object.assign({}, this.defaultProps), props));
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig());
        });
    }
    getActionEditorConfig() {
        return this.sandbox.descriptor.parameters
            .filter((param) => param.editor)
            .map((param) => ({
            name: param.name,
            component: param.editor,
            options: Object.assign({ label: param.label, isRequired: param.isRequired, tooltip: param.tooltip }, (param.editor === ExpressionFormControlComponent
                ? {
                    dataDictionary$: this.expressionConfigurator.getDataDictionary(param.name),
                    operators: this.expressionConfigurator.getOperators(param.name)
                }
                : param.editorOptions || {}))
        }));
    }
}
//# sourceMappingURL=view-designer-default-action-model.class.js.map