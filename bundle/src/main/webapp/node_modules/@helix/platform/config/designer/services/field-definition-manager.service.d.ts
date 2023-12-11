import { IFieldOptions } from '@helix/platform/config/api';
import { IConfigFieldDefinitionModel } from '../config-designer.types';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { AttachmentFieldDefinitionService } from './attachment-field-definition.service';
import { BooleanFieldDefinitionService } from './boolean-field-definition.service';
import { CharacterFieldDefinitionService } from './character-field-definition.service';
import { ColorFieldDefinitionService } from './color-field-definition.service';
import { DateOnlyFieldDefinitionService } from './date-only-field-definition.service';
import { DecimalFieldDefinitionService } from './decimal-field-definition.service';
import { IntegerFieldDefinitionService } from './integer-field-definition.service';
import { SecureFieldDefinitionService } from './secure-field-definition.service';
import { SelectionFieldDefinitionService } from './selection-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class FieldDefinitionManagerService {
    private fieldServices;
    constructor(attachmentFieldDefinitionService: AttachmentFieldDefinitionService, booleanFieldDefinitionService: BooleanFieldDefinitionService, characterFieldDefinitionService: CharacterFieldDefinitionService, colorFieldDefinitionService: ColorFieldDefinitionService, dateOnlyFieldDefinitionService: DateOnlyFieldDefinitionService, decimalFieldDefinitionService: DecimalFieldDefinitionService, integerFieldDefinitionService: IntegerFieldDefinitionService, secureFieldDefinitionService: SecureFieldDefinitionService, selectionFieldDefinitionService: SelectionFieldDefinitionService);
    getNewFieldDefinitionModel(resourceType: string, fieldProperties: Partial<IConfigFieldDefinitionModel>): IConfigFieldDefinitionModel;
    getFieldInspectorConfig(resourceType: string, options: IFieldOptions): IFormBuilderConfig;
    validate(fieldModel: IConfigFieldDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldDefinitionManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldDefinitionManagerService>;
}
