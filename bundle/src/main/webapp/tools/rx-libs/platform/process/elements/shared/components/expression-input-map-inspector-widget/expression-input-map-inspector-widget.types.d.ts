import { IExpressionConfigurator } from '@helix/platform/shared/api';
import { IExpressionFormControlOptions } from '@helix/platform/shared/components';
export interface IExpressionInputMapInspectorOptions {
    name: string;
    label: string;
}
export interface IExpressionInputMapInspectorWidgetOptions {
    expressionConfigurator: IExpressionConfigurator;
    expressionInputMapInspectorOptions: IExpressionInputMapInspectorOptions[];
}
export interface IExpressionInputMapInspectorConfig {
    name: string;
    options: IExpressionFormControlOptions;
}
