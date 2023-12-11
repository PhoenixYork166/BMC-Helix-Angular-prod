import { IRecordDefinition } from './record-definition.types';
import { IRecordInstance, IRxFieldValidationResult, IRxValidationResult } from './record-instance.types';
import { IFieldDefinition } from './field-definition.interfaces';
export declare class RecordInstanceValidation {
    fieldValidatorsByType: {
        'com.bmc.arsys.rx.standardlib.record.CharacterFieldDefinition': any;
        'com.bmc.arsys.rx.standardlib.record.IntegerFieldDefinition': ((value: any, fieldDefinition: IFieldDefinition) => IRxFieldValidationResult)[];
        'com.bmc.arsys.rx.standardlib.record.DateTimeFieldDefinition': any;
        'com.bmc.arsys.rx.standardlib.record.SelectionFieldDefinition': any;
        'com.bmc.arsys.rx.standardlib.record.DecimalFieldDefinition': ((value: any, fieldDefinition: IFieldDefinition) => IRxFieldValidationResult)[];
        'com.bmc.arsys.rx.standardlib.record.RealFieldDefinition': ((value: any, fieldDefinition: IFieldDefinition) => IRxFieldValidationResult)[];
        'com.bmc.arsys.rx.standardlib.record.TimeOnlyFieldDefinition': any;
        'com.bmc.arsys.rx.standardlib.record.DateOnlyFieldDefinition': any;
    };
    private fieldDefinitions;
    private fieldInstances;
    validate(recordInstance: IRecordInstance, recordDefinition: IRecordDefinition): IRxValidationResult;
    validateSingleField(fieldId: number, value: any): IRxFieldValidationResult;
    private validateFieldInstance;
    private getValidatorsForFieldInstance;
    private getFieldDefinition;
    private isRequired;
    private isNaNValidator;
    private minValidator;
    private maxValidator;
    private isFiniteNumberString;
}
