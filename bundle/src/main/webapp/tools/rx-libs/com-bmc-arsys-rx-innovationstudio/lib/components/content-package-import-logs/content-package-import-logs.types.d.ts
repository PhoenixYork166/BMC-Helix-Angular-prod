export interface IBundleDeployPackageRegistryEntry {
    [fieldId: number]: string | number;
}
export interface IBundleDeployPackageDescriptor {
    definitionsToDeployByType?: {
        [definitionType: string]: any[];
    }[];
    dataImportOptionsByRecordDefinitionName?: {
        [recordDefinitionName: string]: {};
    }[];
    overallImportSummary?: {
        data: {
            errorCount: number;
            messages: string[];
            recordDefinitionName: string;
            successCount: number;
            warningCount: number;
        }[];
        definition: {
            definitionType: string;
            status: {
                messageType: string;
                messages: string[];
                name: string;
            }[];
        }[];
    };
}
export interface IBundleDeployPackageData {
    dataSource: string;
    errorCount: number;
    messages?: string[];
    recordDefinitionName?: string;
    successCount: number;
    warningCount: number;
    definitionType?: string;
    statuses?: {
        name: string;
        messages: string[];
    }[];
}
