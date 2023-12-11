export declare enum LogCategory {
    Sql = "sql",
    Api = "api",
    Rule = "rule",
    Process = "process",
    Bundle = "bundle",
    Cli = "cli",
    All = "all"
}
export declare const RX_LOG: {
    serverLogCategories: LogCategory[];
    clientLogCategories: LogCategory[];
};
