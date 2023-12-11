import { ExpressionOperatorRowsByGroup, ExpressionOperatorGroup, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { of } from 'rxjs';
import { RxExpressionHelperService } from '@helix/platform/view/api';
export class RxViewExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxExpressionHelperService = this.injector.get(RxExpressionHelperService);
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { dataDictionary$: this.commonDataDictionary$, operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient), validateExpression: (propertyName, expression) => {
                let isValid = true;
                const expressionEvaluator = this.getExpressionEvaluator(propertyName);
                try {
                    expressionEvaluator.parseExpression(this.rxExpressionHelperService.prepare(expression));
                }
                catch (e) {
                    isValid = false;
                }
                return of(isValid);
            } });
    }
}
//# sourceMappingURL=view-expression-configurator.class.js.map