import { IFieldDefinition, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import * as i0 from "@angular/core";
export declare class RxFieldDefinitionInspectorHelperService {
    private rxFieldDefinitionService;
    private rxRecordDefinitionService;
    constructor(rxFieldDefinitionService: RxFieldDefinitionService, rxRecordDefinitionService: RxRecordDefinitionService);
    isFieldEditable(fieldDefinition: IFieldDefinition): boolean;
    isNameEditable(fieldDefinition: IFieldDefinition): boolean;
    isDescriptionEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isRequiredEditable(fieldDefinition: IFieldDefinition): boolean;
    isSubmitEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    arePermissionsEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isAuditingEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isFieldIdDisabled(fieldDefinition: IFieldDefinition, skipValidate?: boolean): boolean;
    isDefaultValueEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isLengthEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isStoreEncryptedVisible(fieldDefinition: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): boolean;
    isStoreEncryptedEditable(fieldDefinition: IFieldDefinition): boolean;
    isStoreHashedVisible(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isStoreHashedEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isNamedListEditable(fieldDefinition: IFieldDefinition, definitionModel: IRecordDefinitionModel): boolean;
    isFieldMappingEditable(fieldDefinition: IFieldDefinition): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFieldDefinitionInspectorHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFieldDefinitionInspectorHelperService>;
}
