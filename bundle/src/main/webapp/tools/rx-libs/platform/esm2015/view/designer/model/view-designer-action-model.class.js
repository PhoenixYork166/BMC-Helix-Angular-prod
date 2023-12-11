import { RxViewActionExpressionConfigurator } from '../expression-configurator/view-action-expression-configurator.class';
export class RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        this.injector = injector;
        this.sandbox = sandbox;
        this.guid = this.sandbox.guid;
        this.expressionConfigurator = new RxViewActionExpressionConfigurator(this.injector, this.sandbox.descriptor.name, this.sandbox.guid);
    }
    getExpressionConfigurator() {
        return this.expressionConfigurator;
    }
    getPropertiesByName() {
        return this.sandbox.getActionProperties();
    }
    getChildren() {
        return this.sandbox.getChildren();
    }
    getOutputExpressionForPropertyPath(propertyPath) {
        return `\${view.components.${this.guid}.output.${propertyPath}}`;
    }
}
//# sourceMappingURL=view-designer-action-model.class.js.map