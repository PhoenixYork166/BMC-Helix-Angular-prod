import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep, flatten, forEach, isRegExp, isUndefined, sortBy } from 'lodash';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from './expression-configurator-operator.types';
export class RxExpressionConfigurator {
    constructor() {
        this.expressionConfigs = [];
    }
    getDefaultConfig() {
        return {
            dataDictionary$: this.commonDataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.Math),
            validateExpression: (propertyPath, expression) => of(true)
        };
    }
    configureForProperty(config) {
        this.expressionConfigs.push(Object.assign(Object.assign({}, this.getDefaultConfig()), config));
    }
    getDataDictionary(propertyPath) {
        return this.getExpressionConfig(propertyPath).dataDictionary$.pipe(map((dataDictionary) => this.sortDataDictionary(dataDictionary)));
    }
    getOperators(propertyPath) {
        return flatten(this.getOperatorRows(propertyPath));
    }
    getOperatorRows(propertyPath) {
        return this.getExpressionConfig(propertyPath).operators;
    }
    getOperatorRowsByGroup(group) {
        return cloneDeep(ExpressionOperatorRowsByGroup.get(group));
    }
    getExpressionConfig(propertyPath) {
        return (this.expressionConfigs.find((config) => isRegExp(config.propertyPath) ? config.propertyPath.test(propertyPath) : config.propertyPath === propertyPath) || Object.assign({ propertyPath }, this.getDefaultConfig()));
    }
    validateProperty(propertyPath, propertyValue) {
        return propertyValue
            ? this.getExpressionConfig(propertyPath).validateExpression(propertyPath, propertyValue)
            : of(true);
    }
    sortDataDictionary(dataDictionary) {
        forEach(dataDictionary, (node) => {
            if (node.children) {
                node.children = this.sortDataDictionary(sortBy(node.children, [(child) => !isUndefined(child.expression), 'label']));
            }
        });
        return dataDictionary;
    }
}
//# sourceMappingURL=expression-configurator.class.js.map