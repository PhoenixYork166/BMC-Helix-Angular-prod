import { IFieldInstance } from '@helix/platform/record/api';
export interface IPreparedRecordInstance {
    resourceType: string;
    recordDefinitionName: string;
    fieldInstances: {
        [fieldId: number]: IFieldInstance;
    };
}
