import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { isEmpty, isFinite, isNil, isString, isNaN } from 'lodash';
import BigNumber from 'bignumber.js';
export class RecordInstanceValidation {
    constructor() {
        this.fieldValidatorsByType = {
            'com.bmc.arsys.rx.standardlib.record.CharacterFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.IntegerFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.DateTimeFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.SelectionFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.DecimalFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.RealFieldDefinition': [
                this.minValidator,
                this.maxValidator,
                this.isNaNValidator
            ],
            'com.bmc.arsys.rx.standardlib.record.TimeOnlyFieldDefinition': null,
            'com.bmc.arsys.rx.standardlib.record.DateOnlyFieldDefinition': null
        };
    }
    validate(recordInstance, recordDefinition) {
        this.fieldDefinitions = recordDefinition.fieldDefinitions;
        this.fieldInstances = recordInstance.fieldInstances;
        const errors = Object.keys(this.fieldInstances).reduce((result, fieldId) => {
            const fieldErrors = this.validateFieldInstance(this.fieldInstances[fieldId], this.fieldInstances[fieldId].value);
            if (fieldErrors) {
                result[fieldId] = fieldErrors;
            }
            return result;
        }, {});
        return isEmpty(errors) ? null : errors;
    }
    validateSingleField(fieldId, value) {
        return this.validateFieldInstance(this.fieldInstances[fieldId], value);
    }
    validateFieldInstance(fieldInstance, value) {
        let errors = {};
        if (fieldInstance) {
            const fieldValidators = this.getValidatorsForFieldInstance(fieldInstance);
            const fieldDefinition = this.getFieldDefinition(fieldInstance.id);
            errors = fieldValidators.reduce((result, validator) => {
                const validatorResponse = validator.call(this, value, fieldDefinition);
                if (validatorResponse) {
                    result = Object.assign(Object.assign({}, result), validatorResponse);
                }
                return result;
            }, {});
        }
        return errors;
    }
    getValidatorsForFieldInstance(fieldInstance) {
        const validators = [];
        if (fieldInstance) {
            const fieldDefinition = this.getFieldDefinition(fieldInstance.id);
            const fieldType = fieldDefinition.resourceType;
            if (fieldDefinition.fieldOption === RX_RECORD_DEFINITION.fieldOptions.required) {
                validators.push(this.isRequired);
            }
            if (this.fieldValidatorsByType[fieldType]) {
                validators.push(...this.fieldValidatorsByType[fieldType]);
            }
        }
        return validators;
    }
    getFieldDefinition(fieldId) {
        return this.fieldDefinitions.find((definition) => definition.id === fieldId);
    }
    isRequired(value) {
        if (isNil(value) || value === '') {
            return { required: 'Value is required' };
        }
        else {
            return null;
        }
    }
    isNaNValidator(value) {
        return isNaN(value) ? { nan: `Value cannot be NaN` } : null;
    }
    minValidator(value, fieldDefinition) {
        const minError = { min: `Minimum value is ${fieldDefinition.minValue}` };
        if (BigNumber.isBigNumber(value) || isFinite(value) || this.isFiniteNumberString(value)) {
            return new BigNumber(value).isLessThan(fieldDefinition.minValue) ? minError : null;
        }
        else {
            return null;
        }
    }
    maxValidator(value, fieldDefinition) {
        const maxError = { max: `Maximum value is ${fieldDefinition.maxValue}` };
        if (BigNumber.isBigNumber(value) || isFinite(value) || this.isFiniteNumberString(value)) {
            return new BigNumber(value).isGreaterThan(fieldDefinition.maxValue) ? maxError : null;
        }
        else {
            return null;
        }
    }
    isFiniteNumberString(value) {
        return isString(value) && value.trim() !== '' && isFinite(Number(value));
    }
}
//# sourceMappingURL=record-instance-validation.class.js.map