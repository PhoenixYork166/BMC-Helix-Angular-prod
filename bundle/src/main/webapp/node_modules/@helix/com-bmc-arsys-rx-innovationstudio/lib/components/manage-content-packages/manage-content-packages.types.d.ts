export interface IBundleDeployPackageRegistryEntry {
    [fieldId: number]: string | number;
}
export interface IBundleDeployPackageDescriptor {
    customPackageName?: string;
    definitionsToDeployByType?: {
        [definitionType: string]: any[];
    }[];
    dataImportOptionsByRecordDefinitionName?: {
        [definitionName: string]: {};
    }[];
}
