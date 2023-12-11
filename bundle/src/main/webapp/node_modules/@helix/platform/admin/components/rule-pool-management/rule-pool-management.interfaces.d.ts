import { ColumnConfig, RowDataItem, TableCustomTexts } from '@bmc-ux/adapt-table';
export interface IRuleConflictOccurrences {
    rule: string;
    noOfTimesDelayed: number;
}
export interface IRuleStatistics {
    avgExecutionTime: number;
    avgWaitTime: number;
    conflictingRules: {
        delayedByRules: IRuleConflictOccurrences[];
        delaysOtherRules: IRuleConflictOccurrences[];
    };
    designTimePoolNumber: number;
    guid: string;
    isEditable?: boolean;
    isRuleWithIssues?: boolean;
    lastEndTime: string;
    lastStartTime: string;
    name: string;
    numberOfRuns: number;
    remedyEscalation: boolean;
    timeCriteria: {
        resourceType: string;
    };
}
export interface IRulePoolStatistics {
    executionPoolNumber: number;
    hasRulesWithIssues: boolean;
    isDefaultPool: boolean;
    rules: IRuleStatistics[];
}
export interface IRuleConflictsTableConfig {
    columns: ColumnConfig[];
    data: RowDataItem[];
    texts: TableCustomTexts;
}
