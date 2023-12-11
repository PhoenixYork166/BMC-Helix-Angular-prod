export declare enum ElementVisibilityOptions {
    Always = "Always",
    Never = "Never"
}
export interface ICallActivityDescriptor {
    displayName: string;
    processDefinitionName: string;
    callActivityManagerServiceName: string;
    visibility: ElementVisibilityOptions;
}
export interface ICallActivityElement {
    processDefinitionName: string;
    displayName: string;
}
export interface ISelectedElementInspectorDesignerItemModel<TSelectedElementModel> {
    elementModel: TSelectedElementModel;
    graph: any;
}
