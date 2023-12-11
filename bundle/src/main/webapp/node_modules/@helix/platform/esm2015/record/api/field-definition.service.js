import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { includes, inRange, isNumber, get, isUndefined } from 'lodash';
import { RX_OVERLAY, RxOverlayService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxFieldDefinitionService {
    constructor(rxOverlayService) {
        this.rxOverlayService = rxOverlayService;
    }
    isSystemField(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.system;
    }
    isRequiredField(fieldDefinition) {
        return (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.fieldOption) === RX_RECORD_DEFINITION.fieldOptions.required;
    }
    isPassword(fieldDefinition) {
        return includes(RX_RECORD_DEFINITION.passwordFieldIds, fieldDefinition.id);
    }
    isSecured(fieldDefinition) {
        return fieldDefinition.shouldPersistHashed || fieldDefinition.shouldPersistEncrypted;
    }
    isReadOnly(fieldDefinition) {
        return this.isSystemField(fieldDefinition) || this.isInheritedField(fieldDefinition);
    }
    isInheritedField(fieldDefinition) {
        return fieldDefinition.hasOwnProperty('isInherited') && fieldDefinition.isInherited;
    }
    isPropertiesCustomizationEnabled(fieldDefinition) {
        return (this.isTransient(fieldDefinition) ||
            this.rxOverlayService.isCustomizationEnabled('allowOtherPropertiesOverlay', fieldDefinition));
    }
    isTransient(fieldDefinition) {
        return isUndefined(fieldDefinition.lastUpdateTime);
    }
    isOverlayMode(fieldDefinition) {
        const overlayGroupId = fieldDefinition.overlayGroupId;
        const overlayDescriptor = fieldDefinition.overlayDescriptor || { parentOverlayGroupId: null };
        return (this.rxOverlayService.getOverlayOperation(overlayGroupId, overlayDescriptor.parentOverlayGroupId) !==
            RX_OVERLAY.operationTypes.createdInThisOverlayGroup);
    }
    // Is field ID in a range reserved by BMC
    isReservedField(fieldDefinition, skipValidate = false) {
        // if (isNumber(fieldDefinition.id)) {
        if (!skipValidate) {
            return this.isExternalRecordField(fieldDefinition)
                ? includes(RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds, fieldDefinition.id)
                : fieldDefinition.id <= RX_RECORD_DEFINITION.AR_MAX_RESERVED_FIELD_ID;
        }
        else {
            return false;
        }
    }
    isPermissionsCustomizationEnabled(fieldDefinition) {
        return (this.isTransient(fieldDefinition) ||
            this.rxOverlayService.isCustomizationEnabled('allowPermissionsOverlay', fieldDefinition));
    }
    isSortable(fieldDefinition) {
        // Records cannot be sorted by a field with unlimited length (maxLength = 0), or by a field longer than 1000 characters.
        // This applies to character and localized character fields.
        // Sorting is allowed for fields with unspecified length.
        return (!isNumber(fieldDefinition.maxLength) ||
            inRange(fieldDefinition.maxLength, 1, RX_RECORD_DEFINITION.sortableCharacterFieldMaxLength + 1));
    }
    isSearchable(fieldDefinition, recordDefinition) {
        return (includes([RX_RECORD_DEFINITION.dataTypes.character.resourceType, RX_RECORD_DEFINITION.dataTypes.attachment.resourceType], fieldDefinition.resourceType) &&
            !this.isPassword(fieldDefinition) &&
            !this.isSecured(fieldDefinition) &&
            !this.isReadOnly(fieldDefinition) &&
            this.isPropertiesCustomizationEnabled(fieldDefinition));
    }
    isJoinedField(fieldDefinition) {
        return this.isJoinRecordField(fieldDefinition) && !this.isCoreField(fieldDefinition);
    }
    isCoreField(fieldDefinition) {
        let coreFieldIds = RX_RECORD_DEFINITION.arCoreFieldIds;
        if (this.isJoinRecordField(fieldDefinition)) {
            coreFieldIds = RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds;
        }
        else if (this.isExternalRecordField(fieldDefinition)) {
            coreFieldIds = RX_RECORD_DEFINITION.externalRecordDefinitionCoreFieldIds;
        }
        return includes(coreFieldIds, fieldDefinition.id);
    }
    isExternalRecordField(fieldDefinition) {
        return get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.externalFieldMapping;
    }
    canBeAssociatedDisplayField(fieldDefinition) {
        return ((this.isReservedField(fieldDefinition) || !this.isTransient(fieldDefinition)) &&
            (fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.character ||
                fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.localizedCharacter) &&
            RX_RECORD_DEFINITION.coreFieldIds.id !== fieldDefinition.id);
    }
    isJoinRecordField(fieldDefinition) {
        return get(fieldDefinition, 'fieldMapping.resourceType') === RX_RECORD_DEFINITION.joinFieldMapping;
    }
    isDataProviderIdField(fieldDefinition, recordDefinition) {
        const isCustomRecordDefinition = (recordDefinition === null || recordDefinition === void 0 ? void 0 : recordDefinition.type) === RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom;
        return isCustomRecordDefinition && fieldDefinition.id === RX_RECORD_DEFINITION.specialFieldIds.dataProviderId;
    }
    isFieldInUserOverlay(fieldDefinition) {
        return (!fieldDefinition.lastUpdateTime ||
            this.rxOverlayService.getUserDefaultOverlayGroupId() === fieldDefinition.overlayGroupId);
    }
}
RxFieldDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, deps: [{ token: i1.RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxOverlayService }]; } });
//# sourceMappingURL=field-definition.service.js.map