import { IAssociationDefinition } from '@helix/platform/association/api';
export interface IAssociationDefinitionGridData extends IAssociationDefinition {
    shouldCascadeDeleteString: string;
    cardinalityString: string;
    firstRecord: string;
    secondRecord: string;
}
