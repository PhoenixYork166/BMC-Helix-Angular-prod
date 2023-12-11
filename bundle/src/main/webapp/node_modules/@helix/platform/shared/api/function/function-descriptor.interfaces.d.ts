interface IFunctionDescriptorInputParams {
    dataType: string;
    description: string;
    name: string;
}
export interface IFunctionDescriptor {
    description: string;
    displayName: string;
    inputParams: IFunctionDescriptorInputParams[];
    name: string;
    outputDataType: string;
    type: string;
}
export {};
