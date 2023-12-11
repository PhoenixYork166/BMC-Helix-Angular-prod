import { Observable } from 'rxjs';
import { IDataDictionary } from '../data-dictionary';
import { ExpressionOperatorGroup, IExpressionOperator, IExpressionOperatorRow } from './expression-configurator-operator.types';
export interface IExpressionConfigurator {
    getDataDictionary: (propertyPath?: string) => Observable<IDataDictionary>;
    getOperators: (propertyPath?: string) => IExpressionOperator[];
    getOperatorRows: (propertyPath?: string) => IExpressionOperatorRow[];
    getOperatorRowsByGroup: (groupName: ExpressionOperatorGroup) => IExpressionOperatorRow[];
    configureForProperty: (config: IExpressionConfiguratorPropertyConfig) => void;
    validateProperty: (propertyPath: string, propertyValue: string) => Observable<boolean>;
}
export interface IExpressionConfiguratorDefaultPropertyConfig {
    dataDictionary$: Observable<IDataDictionary>;
    operators: IExpressionOperatorRow[];
    validateExpression: (propertyPath: string, expression: string) => Observable<boolean>;
}
export interface IExpressionConfiguratorPropertyConfig extends Partial<IExpressionConfiguratorDefaultPropertyConfig> {
    propertyPath: string | RegExp;
}
export interface IExpressionConfiguratorProvider {
    expressionConfigurator: IExpressionConfigurator;
}
