import { RecordInstanceValidation } from './record-instance-validation.class';
import { BehaviorSubject, Subject } from 'rxjs';
import { cloneDeep, find, forEach, forOwn, get, includes, isNull, isNaN, isString, isUndefined, reduce, set, some, toNumber } from 'lodash';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { RxLocalizationService, RxLogService } from '@helix/platform/shared/api';
import BigNumber from 'bignumber.js';
import { RxNumberUtilsService, RxStringService } from '@helix/platform/utils';
export class RecordInstance {
    constructor(recordDefinition, recordInstance, injector) {
        this.recordDefinition = recordDefinition;
        this.injector = injector;
        this.fieldValueChangedSubject = new Subject();
        this.validation$ = new BehaviorSubject(null);
        this.fieldValueChanged$ = this.fieldValueChangedSubject.asObservable();
        this.rxLogService = this.injector.get(RxLogService);
        this.rxLocalizationService = this.injector.get(RxLocalizationService);
        this.rxStringService = this.injector.get(RxStringService);
        this.rxNumberUtilsService = this.injector.get(RxNumberUtilsService);
        this.validationService = new RecordInstanceValidation();
        this.prepareRecordInstance(recordInstance);
        this.originalData = cloneDeep(recordInstance);
        Object.assign(this, recordInstance);
        this.validate();
    }
    prepareRecordInstance(recordInstance) {
        // convert numeric field instance values from string to BigNumber instance
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => includes([
            RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
            RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
            RX_RECORD_DEFINITION.dataTypes.real.resourceType
        ], fieldDefinition.resourceType))
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            if (fieldInstance && fieldInstance.value) {
                fieldInstance.value = new BigNumber(fieldInstance.value);
            }
        });
        // update decimal field definition min and max numbers based on the precision
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => fieldDefinition.resourceType === RX_RECORD_DEFINITION.dataTypes.decimal.resourceType)
            .forEach((fieldDefinition) => {
            // According to the backend side, min and max number must be based on the precision. E.g when:
            // - precision is 1, safe number will be 1e27 - 0.1 = 99999999999999999999999999.9
            // - precision is 3, safe number will be 1e25 - 0.001 = 999999999999999999999999.999
            const base = new BigNumber(0.1).pow(fieldDefinition.precision);
            const safeRangeNumber = new BigNumber(1e28).multipliedBy(base).minus(base);
            fieldDefinition.maxValue = new BigNumber(fieldDefinition.maxValue);
            fieldDefinition.minValue = new BigNumber(fieldDefinition.minValue);
            if (fieldDefinition.maxValue.isGreaterThanOrEqualTo(safeRangeNumber)) {
                fieldDefinition.maxValue = safeRangeNumber;
            }
            if (fieldDefinition.minValue.isLessThanOrEqualTo(safeRangeNumber.negated())) {
                fieldDefinition.minValue = safeRangeNumber.negated();
            }
        });
        // convert boolean and selection field instance values from string to number
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => includes([RX_RECORD_DEFINITION.dataTypes.boolean.resourceType, RX_RECORD_DEFINITION.dataTypes.selection.resourceType], fieldDefinition.resourceType))
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            if (fieldInstance && fieldInstance.value) {
                fieldInstance.value = toNumber(fieldInstance.value);
            }
        });
        // add default value for localized character field component
        this.recordDefinition.fieldDefinitions
            .filter((fieldDefinition) => RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType === fieldDefinition.resourceType)
            .forEach((fieldDefinition) => {
            const fieldInstance = recordInstance.fieldInstances[fieldDefinition.id];
            const currentLocaleCode = this.rxLocalizationService.currentLocale;
            const defaultLocaleCode = 'en-US';
            if (fieldInstance && !fieldInstance.value && fieldInstance.valueByLocale) {
                fieldInstance.value =
                    fieldInstance.valueByLocale[currentLocaleCode] || fieldInstance.valueByLocale[defaultLocaleCode];
            }
        });
        // set placeholder value for password fields
        RX_RECORD_DEFINITION.passwordFieldIds.forEach((passwordFieldId) => {
            const passwordFieldInstance = recordInstance.fieldInstances[passwordFieldId];
            if (passwordFieldInstance) {
                passwordFieldInstance.value = '********';
            }
        });
    }
    getFieldValue(fieldId, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        return get(fieldInstance, 'value', null);
    }
    setFieldValue(fieldId, value, associatedRecordPath) {
        const recordInstance = this.getRecordInstance(associatedRecordPath);
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        const fieldDefinition = find(recordInstance.recordDefinition.fieldDefinitions, { id: fieldId });
        let newValue = isUndefined(value) ? null : value;
        if (fieldInstance) {
            switch (fieldDefinition.resourceType) {
                case RX_RECORD_DEFINITION.dataTypes.character.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType:
                    if (!isNull(newValue)) {
                        if (!isString(newValue)) {
                            newValue = String(newValue);
                        }
                        else if (this.rxStringService.isEmptySafe(newValue)) {
                            newValue = null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.real.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                    if (!isNull(newValue)) {
                        if (this.rxNumberUtilsService.isFiniteOrNumberString(newValue)) {
                            newValue = new BigNumber(value);
                        }
                        else {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                            newValue = isNaN(value) ? value : null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.selection.resourceType:
                case RX_RECORD_DEFINITION.dataTypes.boolean.resourceType:
                    if (!isNull(newValue)) {
                        if (!this.rxStringService.isEmptySafe(newValue) && isFinite(Number(newValue))) {
                            newValue = Number(newValue);
                        }
                        else {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                            newValue = null;
                        }
                    }
                    break;
                case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType:
                    if (value instanceof File) {
                        newValue = value.name;
                        set(fieldInstance, 'file', value);
                    }
                    else {
                        if (!isNull(newValue)) {
                            this.logIncorrectFieldValueWarning(newValue, fieldDefinition);
                        }
                        newValue = null;
                        delete fieldInstance.file;
                    }
                    break;
            }
            set(fieldInstance, 'value', newValue);
            this.validate();
            recordInstance.fieldValueChangedSubject.next({
                fieldId,
                value: fieldInstance.value
            });
        }
    }
    getFieldProp(fieldId, prop, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        return get(fieldInstance, prop);
    }
    setFieldProp(fieldId, prop, value, associatedRecordPath) {
        const fieldInstance = this.getFieldInstance(fieldId, associatedRecordPath);
        set(fieldInstance, prop, value);
    }
    getFieldInstance(fieldId, associatedRecordPath) {
        if (associatedRecordPath) {
            return get(this.getRecordInstance(associatedRecordPath), ['fieldInstances', fieldId]);
        }
        else {
            return this.fieldInstances[fieldId];
        }
    }
    getRecordInstance(associatedRecordPath) {
        return associatedRecordPath ? get(this, ['associationInstances', ...associatedRecordPath]) : this;
    }
    isFieldValueChanged(fieldId, newValue, associatedRecordPath) {
        const fieldDefinition = find(this.getRecordInstance(associatedRecordPath).recordDefinition.fieldDefinitions, {
            id: fieldId
        });
        const value = this.getFieldValue(fieldId, associatedRecordPath);
        switch (fieldDefinition.resourceType) {
            case RX_RECORD_DEFINITION.dataTypes.attachment.resourceType:
                return value !== (newValue instanceof File ? newValue.name : newValue);
            case RX_RECORD_DEFINITION.dataTypes.integer.resourceType:
            case RX_RECORD_DEFINITION.dataTypes.real.resourceType:
            case RX_RECORD_DEFINITION.dataTypes.decimal.resourceType:
                return !new BigNumber(value).eq(newValue);
            default:
                return value !== newValue;
        }
    }
    revertFieldInstances() {
        this.fieldInstances = cloneDeep(this.originalData.fieldInstances);
        this.validate();
        forEach(this.getExtensionRecords(), (recordInstance) => recordInstance.revertFieldInstances());
    }
    reset() {
        Object.assign(this, cloneDeep(this.originalData));
        this.associationInstances = null;
        this.validate();
    }
    getOriginalRecordInstance() {
        return new RecordInstance(this.recordDefinition, this.originalData, this.injector);
    }
    validate() {
        const errors = this.validationService.validate(this, this.recordDefinition);
        this.validation$.next(errors);
    }
    validateSingleField(fieldId, value, associatedRecordPath) {
        let result = {};
        if (associatedRecordPath) {
            const associatedRecordInstance = this.getRecordInstance(associatedRecordPath);
            if (associatedRecordInstance) {
                result = associatedRecordInstance.validationService.validateSingleField(fieldId, value);
            }
        }
        else {
            result = this.validationService.validateSingleField(fieldId, value);
        }
        return result;
    }
    getExtensionRecords() {
        return reduce(this.associationInstances, (result, value, key) => {
            forEach(value, (associationRecords, nodeSide) => {
                result.push(...associationRecords.extensions);
            });
            return result;
        }, []);
    }
    isDeletedOrPendingAssociations() {
        return some(this.associationInstances, (value) => {
            return some(value, (associationRecords, nodeSide) => {
                return Boolean(associationRecords.deleted.length || associationRecords.pending.length);
            });
        });
    }
    logIncorrectFieldValueWarning(value, fieldDefinition) {
        const fieldTypeName = find(RX_RECORD_DEFINITION.dataTypes, {
            resourceType: fieldDefinition.resourceType
        }).displayName;
        this.rxLogService.warning(`${value} cannot be assigned to ${fieldTypeName} field.`);
    }
    prepareForBulkEdit() {
        forEach(this.fieldInstances, (fieldInstance) => {
            fieldInstance.value = null;
            if (fieldInstance.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedFieldInstance) {
                forOwn(fieldInstance.valueByLocale, (value, key) => {
                    fieldInstance.valueByLocale[key] = null;
                });
            }
        });
        this.originalData.fieldInstances = cloneDeep(this.fieldInstances);
        this.validate();
    }
}
//# sourceMappingURL=record-instance.class.js.map