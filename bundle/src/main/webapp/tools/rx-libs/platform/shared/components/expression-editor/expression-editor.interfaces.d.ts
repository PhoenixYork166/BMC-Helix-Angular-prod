import { IExpressionConfigurator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
export interface IExpressionEditorConfig {
    property: IExpressionEditorProperty;
    expressionConfigurator: IExpressionConfigurator;
    expressionPropertyNavigator?: IExpressionEditorPropertyNavigator;
    isReadOnly?: boolean;
    legend?: IExpressionEditorLegendItem[];
}
export interface IExpressionEditorLegendItem {
    icon: string;
    label: string;
}
export interface IExpressionEditorPropertyChange {
    path: string;
    value: string;
}
export interface IExpressionEditorProperty {
    path: string;
    value: string;
    label: string;
}
export interface IExpressionEditorPropertyNavigator {
    getProperties: () => Observable<IExpressionEditorProperty[]>;
}
