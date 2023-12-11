import { RxAttachmentFieldDefinitionService } from './attachment-field-definition.service';
import { RxBooleanFieldDefinitionService } from './boolean-field-definition.service';
import { RxCharacterFieldDefinitionService } from './character-field-definition.service';
import { RxDateOnlyFieldDefinitionService } from './date-only-field-definition.service';
import { RxDateTimeFieldDefinitionService } from './date-time-field-definition.service';
import { RxDecimalFieldDefinitionService } from './decimal-field-definition.service';
import { RxIntegerFieldDefinitionService } from './integer-field-definition.service';
import { RxLocalizedCharacterFieldDefinitionService } from './localized-character-field-definition.service';
import { RxRealFieldDefinitionService } from './real-field-definition.service';
import { RxSelectionFieldDefinitionService } from './selection-field-definition.service';
import { RxTimeOnlyFieldDefinitionService } from './time-only-field-definition.service';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { IValidationIssue } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxFieldDefinitionManagerService {
    private fieldServices;
    constructor(rxAttachmentFieldDefinitionService: RxAttachmentFieldDefinitionService, rxBooleanFieldDefinitionService: RxBooleanFieldDefinitionService, rxCharacterFieldDefinitionService: RxCharacterFieldDefinitionService, rxLocalizedCharacterFieldDefinitionService: RxLocalizedCharacterFieldDefinitionService, rxDateTimeFieldDefinitionService: RxDateTimeFieldDefinitionService, rxDateOnlyFieldDefinitionService: RxDateOnlyFieldDefinitionService, rxTimeOnlyFieldDefinitionService: RxTimeOnlyFieldDefinitionService, rxIntegerFieldDefinitionService: RxIntegerFieldDefinitionService, rxDecimalFieldDefinitionService: RxDecimalFieldDefinitionService, rxRealFieldDefinitionService: RxRealFieldDefinitionService, rxSelectionFieldDefinitionService: RxSelectionFieldDefinitionService);
    getNewFieldDefinitionModel(resourceType: string, fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFieldDefinitionManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxFieldDefinitionManagerService>;
}
