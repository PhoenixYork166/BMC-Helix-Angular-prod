import { RxViewComponentExpressionConfigurator } from '../expression-configurator';
export class ViewDesignerComponentModel {
    constructor(injector, sandbox) {
        this.injector = injector;
        this.sandbox = sandbox;
    }
    get expressionConfigurator() {
        if (!this._expressionConfigurator) {
            this._expressionConfigurator = new (this.sandbox.descriptor.expressionConfigurator ||
                RxViewComponentExpressionConfigurator)(this.injector, this.sandbox.guid, this, this.sandbox.descriptor.type);
        }
        return this._expressionConfigurator;
    }
    getExpressionForProperty(propertyPath) {
        return `\${view.components.${this.sandbox.guid}.${propertyPath}}`;
    }
}
//# sourceMappingURL=view-designer-component-model.class.js.map