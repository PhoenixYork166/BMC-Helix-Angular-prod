export interface ISummarizationRecord {
    texts: string[];
    source: string;
    summarizationPercentage: number;
    recordDefinitionName?: string;
    recordID?: string;
    inputFieldId?: number;
    outputFieldId?: number;
}
