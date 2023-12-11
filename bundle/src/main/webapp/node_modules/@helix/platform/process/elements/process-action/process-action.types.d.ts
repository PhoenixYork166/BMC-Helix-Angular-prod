import { Observable } from 'rxjs';
import { IAssignmentExpression, IDataDictionaryBranch, IDesignerElementService, IExpressionConfigurator, IFormWidgetBuilderConfig, IPlainObject, IProcessActionElementModel, IServiceParameter } from '@helix/platform/shared/api';
import { IServiceTaskDefinition } from '@helix/platform/process/api';
export interface IOutputDataDictionaryBranch {
    children?: IOutputDataDictionaryBranch[];
    expression?: string | string[];
    label: string;
    outputPropertyPath?: string | number | (string | number)[];
}
export interface IProcessActionElementService extends IDesignerElementService {
    buildDataDictionaryBranch(model: IProcessActionElementModel): Observable<IDataDictionaryBranch>;
    buildOutputDataDictionaryBranch(model: IProcessActionElementModel, outputParams?: IServiceParameter[]): Observable<IOutputDataDictionaryBranch[]>;
    getClass(): any;
    getDefinitionInputMapParam(inputParamName: string, inputParamValue: string): IAssignmentExpression;
    getElementType(actionTypeName: string): string;
    getExpressionConfigurator(): IExpressionConfigurator;
    getExpressionConfiguratorClass(): any;
    getInputMapFromDefinition(definition: IServiceTaskDefinition): IPlainObject;
    getInputMapInspectorWidgetConfig(model?: IProcessActionElementModel): IFormWidgetBuilderConfig;
}
