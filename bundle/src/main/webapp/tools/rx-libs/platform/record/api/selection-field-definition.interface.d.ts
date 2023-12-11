import { IFieldDefinition } from './field-definition.interfaces';
export interface ISelectionFieldDefinition extends IFieldDefinition {
    optionNamesById: {
        [id: string]: string;
    };
    optionLabelsById: {
        [id: string]: string;
    };
}
