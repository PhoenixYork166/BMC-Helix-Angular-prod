import { Observable } from 'rxjs';
import { IDataDictionary } from '../data-dictionary/data-dictionary.types';
import { IExpressionConfigurator, IExpressionConfiguratorDefaultPropertyConfig, IExpressionConfiguratorPropertyConfig } from './expression-configurator.interfaces';
import { ExpressionOperatorGroup, IExpressionOperator, IExpressionOperatorRow } from './expression-configurator-operator.types';
export declare abstract class RxExpressionConfigurator implements IExpressionConfigurator {
    abstract commonDataDictionary$: Observable<IDataDictionary>;
    private expressionConfigs;
    protected getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
    configureForProperty(config: IExpressionConfiguratorPropertyConfig): void;
    getDataDictionary(propertyPath?: string): Observable<IDataDictionary>;
    getOperators(propertyPath?: string): IExpressionOperator[];
    getOperatorRows(propertyPath?: string): IExpressionOperatorRow[];
    getOperatorRowsByGroup(group: ExpressionOperatorGroup): IExpressionOperatorRow[];
    protected getExpressionConfig(propertyPath: string): IExpressionConfiguratorPropertyConfig;
    validateProperty(propertyPath: string, propertyValue: string): Observable<boolean>;
    private sortDataDictionary;
}
