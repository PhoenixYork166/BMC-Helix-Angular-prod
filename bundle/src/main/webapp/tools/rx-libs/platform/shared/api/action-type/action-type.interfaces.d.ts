export interface IServiceParameter {
    dataType: string;
    dataTypeDetail: IServiceParameter[];
    displayName: string;
    localizable: boolean;
    name: string;
    required: boolean;
}
export interface IActionType {
    actionTypeName: string;
    deprecatedText: string;
    displayName: string;
    inputParams: IServiceParameter[];
    isDeprecated: boolean;
    operationType: string;
    outputParams: IServiceParameter[];
    scope: string;
    serviceName: string;
}
