import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { includes } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
export class RxFieldDefinitionInspectorHelperService {
    constructor(rxFieldDefinitionService, rxRecordDefinitionService) {
        this.rxFieldDefinitionService = rxFieldDefinitionService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
    }
    isFieldEditable(fieldDefinition) {
        return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
            !this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
    }
    isNameEditable(fieldDefinition) {
        return (!this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
            !(fieldDefinition.lastUpdateTime && this.rxFieldDefinitionService.isOverlayMode(fieldDefinition)));
    }
    isDescriptionEditable(fieldDefinition, definitionModel) {
        if (this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
            return (includes(RX_RECORD_DEFINITION.joinRecordDefinitionCoreFieldIds, fieldDefinition.id) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
        }
        else {
            return (!this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
                this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition));
        }
    }
    isRequiredEditable(fieldDefinition) {
        const isAlwaysRequiredNonSystemField = !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition) &&
            includes(RX_RECORD_DEFINITION.alwaysRequiredNonSystemFieldIds, fieldDefinition.id);
        return this.isFieldEditable(fieldDefinition) && !isAlwaysRequiredNonSystemField;
    }
    isSubmitEditable(fieldDefinition, definitionModel) {
        return this.isFieldEditable(fieldDefinition) && !definitionModel.isAuditRecordDefinition;
    }
    arePermissionsEditable(fieldDefinition, definitionModel) {
        return ((fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.id &&
            this.rxFieldDefinitionService.isPermissionsCustomizationEnabled(fieldDefinition) &&
            !(this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
            !definitionModel.isAuditRecordDefinition &&
            !includes(RX_RECORD_DEFINITION.AR_AUDIT_FIELD_IDS, fieldDefinition.id)) ||
            fieldDefinition.allowPermissionsEdit);
    }
    isAuditingEditable(fieldDefinition, definitionModel) {
        return (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
            !this.rxFieldDefinitionService.isInheritedField(fieldDefinition) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isFieldIdDisabled(fieldDefinition, skipValidate = false) {
        return (Boolean(fieldDefinition.lastUpdateTime) ||
            (!this.rxFieldDefinitionService.isJoinedField(fieldDefinition) &&
                (this.rxFieldDefinitionService.isReservedField(fieldDefinition, skipValidate) ||
                    this.rxFieldDefinitionService.isInheritedField(fieldDefinition))));
    }
    isDefaultValueEditable(fieldDefinition, definitionModel) {
        return (!(this.rxFieldDefinitionService.isReadOnly(fieldDefinition) &&
            fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) &&
            this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
            !this.rxRecordDefinitionService.isJoinRecord(definitionModel) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isLengthEditable(fieldDefinition, definitionModel) {
        let isEditable = false;
        if (!this.rxRecordDefinitionService.isJoinRecord(definitionModel)) {
            let isReadonlyField = false;
            // As an exception, the Length of the Display ID field should be editable for Regular records (if customization is enabled)
            if (fieldDefinition.id !== RX_RECORD_DEFINITION.coreFieldIds.displayId) {
                isReadonlyField =
                    this.rxFieldDefinitionService.isReadOnly(fieldDefinition) ||
                        includes(RX_RECORD_DEFINITION.AR_CORE_FIELD_IDS, fieldDefinition.id);
            }
            isEditable =
                !isReadonlyField &&
                    this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition) &&
                    !definitionModel.isAuditRecordDefinition;
        }
        return isEditable;
    }
    isStoreEncryptedVisible(fieldDefinition, definitionModel) {
        return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
    }
    isStoreEncryptedEditable(fieldDefinition) {
        return this.isFieldEditable(fieldDefinition) && !includes(RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id);
    }
    isStoreHashedVisible(fieldDefinition, definitionModel) {
        return (!this.rxRecordDefinitionService.isCustomRecord(definitionModel) &&
            !this.rxFieldDefinitionService.isExternalRecordField(fieldDefinition));
    }
    isStoreHashedEditable(fieldDefinition, definitionModel) {
        return (this.isFieldEditable(fieldDefinition) &&
            !includes(RX_RECORD_DEFINITION.coreFieldIds, fieldDefinition.id) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isNamedListEditable(fieldDefinition, definitionModel) {
        return (this.isFieldEditable(fieldDefinition) &&
            !includes(RX_RECORD_DEFINITION.keyFieldIds, fieldDefinition.id) &&
            !definitionModel.isAuditRecordDefinition);
    }
    isFieldMappingEditable(fieldDefinition) {
        return this.rxFieldDefinitionService.isPropertiesCustomizationEnabled(fieldDefinition);
    }
}
RxFieldDefinitionInspectorHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, deps: [{ token: i1.RxFieldDefinitionService }, { token: i1.RxRecordDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionInspectorHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionInspectorHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxFieldDefinitionService }, { type: i1.RxRecordDefinitionService }]; } });
//# sourceMappingURL=field-definition-inspector-helper.service.js.map