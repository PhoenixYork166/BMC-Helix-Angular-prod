export declare const RX_COPY_DEFINITION: {
    resourceType: string;
};
export declare enum CopyDefinitionType {
    Document = "document",
    Event = "event",
    EventStatistics = "event-statistics",
    NamedList = "named-list",
    Process = "process",
    Record = "record",
    Rule = "rule",
    View = "view",
    WebApi = "web-api"
}
export declare const copyDefinitionTypeMap: {
    document: string;
    event: string;
    "event-statistics": string;
    "named-list": string;
    process: string;
    record: string;
    rule: string;
    view: string;
    "web-api": string;
};
export interface ICopyConfig {
    definitionName: string;
    definitionType: string;
    editFragment?: string;
}
