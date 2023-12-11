import { IFieldDefinitionPermission } from './field-definition-permission.interface';
import { IDefinition, IPlainObject } from '@helix/platform/shared/api';
import { IFieldDefinitionOption } from './field-definition-option.interface';
import { RecordFieldOption } from './record-definition.constant';
import BigNumber from 'bignumber.js';
export interface IFieldDefinition extends IDefinition {
    allowPermissionsEdit?: boolean;
    allowOtherPropertiesOverlay?: boolean;
    allowPermissionsOverlay?: boolean;
    anyUserAllowedToSubmit?: boolean;
    auditOption?: 'AUDIT' | 'COPY' | 'AUDIT_AND_COPY';
    defaultValue?: string;
    defaultValueByLocale?: IPlainObject;
    explicitPermissions?: IFieldDefinitionPermission[];
    fieldMapping?: any;
    fieldOption?: RecordFieldOption;
    fieldTypeName?: string;
    id: number | string;
    customId?: number;
    isInherited?: boolean;
    minValue?: number | BigNumber;
    maxValue?: number | BigNumber;
    maxLength?: number;
    maxSize?: number;
    precision?: number;
    namedListDefinition?: string;
    permissions?: IFieldDefinitionPermission[];
    resourceType?: string;
    searchDefinition?: ISearchDefinition;
    shouldPersistHashed?: boolean;
    shouldPersistEncrypted?: boolean;
    optionsById?: {
        [id: string]: IFieldDefinitionOption;
    };
    optionNamesById?: {
        [id: string]: string;
    };
    optionLabelsById?: {
        [id: string]: string;
    };
    pattern?: string;
}
export interface IFieldDefinitionsById {
    [id: string]: IFieldDefinition;
}
export interface ISearchDefinition {
    enableFTSSearch: boolean;
    enableCognitiveSearch: boolean;
    enableLiteralSearch: boolean;
    searchCategoryName: boolean;
    stripTagsForSearch: boolean;
}
