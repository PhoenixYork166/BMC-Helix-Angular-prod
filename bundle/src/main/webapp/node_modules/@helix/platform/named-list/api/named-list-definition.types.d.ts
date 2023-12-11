import { IDefinition } from '@helix/platform/shared/api';
export interface INamedListDefinition extends IDefinition {
    allowOverlay?: boolean;
    fields?: INamedListField[];
    guid?: string;
    labelFieldId?: number;
    queryCriteria?: string | null;
    recordDefinitionName?: string;
    searchBehavior?: string;
    valueFieldId?: number;
}
export interface INamedListField {
    id: number;
    searchable: Boolean;
    visible: Boolean;
}
