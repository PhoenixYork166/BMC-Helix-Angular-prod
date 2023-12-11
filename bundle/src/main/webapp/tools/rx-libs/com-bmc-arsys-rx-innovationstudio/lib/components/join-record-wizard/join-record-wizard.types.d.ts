import { IFieldDefinition } from '@helix/platform/record/api';
export interface IJoinRecordWizardContext {
    primaryRecordDefinitionName?: string;
    secondaryRecordDefinitionName?: string;
    joinType?: 'INNER' | 'OUTER';
    joinCriteria?: string;
    selectedFields?: IFieldDefinition[];
}
export interface IJoinRecordDesignerOptions {
    primaryRecordDefinitionName: string;
    secondaryRecordDefinitionName: string;
    joinCriteria: string;
    joinType: 'INNER' | 'OUTER';
    resourceType: string;
    fieldDefinitions: IFieldDefinition[];
}
