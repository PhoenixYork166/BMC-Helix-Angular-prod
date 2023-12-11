export interface IProcessInstancePreviewConfig {
    onClick: ({ processDefinition: {}, processInstance: {}, cellView: {} }: {
        processDefinition: {};
        processInstance: {};
        cellView: {};
    }) => void;
    processDefinitionName?: string;
    processInstanceId?: string;
    zoomToFit?: boolean;
}
