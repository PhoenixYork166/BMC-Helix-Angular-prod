export var LogCategory;
(function (LogCategory) {
    LogCategory["Sql"] = "sql";
    LogCategory["Api"] = "api";
    LogCategory["Rule"] = "rule";
    LogCategory["Process"] = "process";
    LogCategory["Bundle"] = "bundle";
    LogCategory["Cli"] = "cli";
    LogCategory["All"] = "all";
})(LogCategory || (LogCategory = {}));
export const RX_LOG = {
    serverLogCategories: [LogCategory.Sql, LogCategory.Api, LogCategory.Rule, LogCategory.Process, LogCategory.Bundle],
    clientLogCategories: [LogCategory.Cli]
};
//# sourceMappingURL=log.types.js.map