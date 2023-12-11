export interface IBundleDefinition {
    displayName: string;
    name: string;
    isPublic: boolean;
}
export interface IBundleWithDefinitions {
    id: string;
    name: string;
    isExpanded: boolean;
    isPublic: boolean;
    definitions: IBundleDefinition[];
}
