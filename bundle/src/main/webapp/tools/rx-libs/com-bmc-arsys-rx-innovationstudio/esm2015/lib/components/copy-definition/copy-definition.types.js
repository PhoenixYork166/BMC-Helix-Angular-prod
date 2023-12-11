export const RX_COPY_DEFINITION = {
    resourceType: 'com.bmc.arsys.rx.application.common.CopyDefinitionCommand'
};
export var CopyDefinitionType;
(function (CopyDefinitionType) {
    CopyDefinitionType["Document"] = "document";
    CopyDefinitionType["Event"] = "event";
    CopyDefinitionType["EventStatistics"] = "event-statistics";
    CopyDefinitionType["NamedList"] = "named-list";
    CopyDefinitionType["Process"] = "process";
    CopyDefinitionType["Record"] = "record";
    CopyDefinitionType["Rule"] = "rule";
    CopyDefinitionType["View"] = "view";
    CopyDefinitionType["WebApi"] = "web-api";
})(CopyDefinitionType || (CopyDefinitionType = {}));
export const copyDefinitionTypeMap = {
    [CopyDefinitionType.Document]: 'DOCUMENT_DEFINITION',
    [CopyDefinitionType.Event]: 'EVENT_DEFINITION',
    [CopyDefinitionType.EventStatistics]: 'EVENT_STATISTICS_DEFINITION',
    [CopyDefinitionType.NamedList]: 'NAMED_LIST',
    [CopyDefinitionType.Process]: 'PROCESS_DEFINITION',
    [CopyDefinitionType.Record]: 'RECORD_DEFINITION',
    [CopyDefinitionType.Rule]: 'RULE_DEFINITION',
    [CopyDefinitionType.View]: 'VIEW_DEFINITION',
    [CopyDefinitionType.WebApi]: 'WEBAPI_DEFINITION'
};
//# sourceMappingURL=copy-definition.types.js.map