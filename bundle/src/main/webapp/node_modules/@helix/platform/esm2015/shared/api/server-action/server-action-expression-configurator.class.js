import { of } from 'rxjs';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from '../expression-configurator/expression-configurator-operator.types';
import { RxExpressionConfigurator } from '../expression-configurator/expression-configurator.class';
export class RxServerActionExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.dataDictionaryService = this.getDataDictionaryService();
        this.commonDataDictionary$ = this.dataDictionaryService.commonDataDictionary$;
        this.configureForProperty({
            propertyPath: /inputMap\/.*/,
            dataDictionary$: this.getInputMapDataDictionary(),
            validateExpression: (propertyPath, expression) => this.validateInputMapExpression(propertyPath, expression),
            operators: this.getOperatorRowsByGroup(ExpressionOperatorGroup.Math)
        });
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { dataDictionary$: this.commonDataDictionary$, operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
    getInputMapDataDictionary() {
        return this.commonDataDictionary$;
    }
    validateInputMapExpression(propertyPath, expression) {
        return of(true);
    }
}
//# sourceMappingURL=server-action-expression-configurator.class.js.map