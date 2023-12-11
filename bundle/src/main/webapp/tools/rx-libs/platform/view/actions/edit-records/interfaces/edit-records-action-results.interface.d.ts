export interface IEditRecordsActionResults {
    details: string;
    summary: {
        errorCount: number;
        successCount: number;
        warningCount: number;
    };
}
