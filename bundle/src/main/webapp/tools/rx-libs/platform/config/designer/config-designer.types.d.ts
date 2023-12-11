import { ISelectionFieldOptionProperties } from '@helix/platform/shared/components';
import { IConfigDefinition, IConfigFieldDefinition } from '@helix/platform/config/api';
export interface IConfigFieldDefinitionModel extends Omit<IConfigFieldDefinition, 'optionLabelsById' | 'optionNamesById'> {
    guid: string;
    isNew: boolean;
    selectionFieldOptionProperties: ISelectionFieldOptionProperties;
    settingLabel: string;
}
export interface IConfigDefinitionModel extends Omit<IConfigDefinition, 'settingMetaData' | 'showInLocation' | 'localeList'> {
    componentLabel: string;
    firstMenu: string;
    secondMenu: string;
    isSettingAccessibleInInnovationStudio: boolean;
    isSettingAccessibleInApplication: boolean;
    fields: IConfigFieldDefinitionModel[];
}
export interface IConfigFieldDataType {
    displayName: string;
    dataType: string;
}
