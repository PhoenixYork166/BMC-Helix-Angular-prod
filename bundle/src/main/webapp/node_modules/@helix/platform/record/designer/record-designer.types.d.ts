import { IInheritanceSelectorControlValue } from './record-designer/record-inheritance-editor/record-inheritance-editor.interfaces';
import { IRecordCustomizationControlValue } from './record-designer/record-customization-options/record-customization-options.interfaces';
import { IArchiveDescriptor, IAuditDescriptor, IFieldDefinition, IIndexDefinition, IRecordDefinition, RecordFieldOption } from '@helix/platform/record/api';
import { ISelectionFieldOptionProperties } from '@helix/platform/shared/components';
export interface IIndexDefinitionModel extends IIndexDefinition {
    isAutomaticIndex: boolean;
}
export interface IRecordDefinitionModel extends Omit<IRecordDefinition, 'fieldDefinitions' | 'archiveDescriptor' | 'auditDescriptor'>, Omit<IArchiveDescriptor, 'isEnabled' | 'description'>, Omit<IAuditDescriptor, 'isEnabled'> {
    recordInheritanceSelector: IInheritanceSelectorControlValue;
    recordSearchFields: IRecordFieldDefinitionModel[];
    customizationOptions: IRecordCustomizationControlValue;
    fields: IRecordFieldDefinitionModel[];
    isAuditingEnabled: boolean;
    isArchivingEnabled: boolean;
    archiveDescription: string;
    overlayOperation: string;
    indexDefinitions: IIndexDefinitionModel[];
    weightedRelevancyTitle: number;
    weightedRelevancyKeywords: number;
    weightedRelevancyEnvironment: number;
}
export interface IRecordFieldDefinitionModel extends Omit<IFieldDefinition, 'optionLabelsById' | 'optionNamesById' | 'auditOption'> {
    guid: string;
    isNewField: boolean;
    audit: boolean;
    copy: boolean;
    selectionFieldOptionProperties: ISelectionFieldOptionProperties;
    isCoreField: boolean;
}
export interface IRecordFieldDefinitionGridRow {
    guid: string;
    name: string;
    id: number | string;
    isInherited: boolean;
    resourceType: string;
    fieldOption: RecordFieldOption;
    defaultValue: string;
    isCoreField: boolean;
}
