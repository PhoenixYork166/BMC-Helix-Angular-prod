import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { inRange, isFunction } from 'lodash';
import { RxViewComponentType } from '@helix/platform/view/api';
import { RECORD_EDITOR } from './record-editor.types';
import * as i0 from "@angular/core";
export class RxDefaultRecordEditorInputType {
    constructor() {
        this.resourceTypeFieldTypeMap = {};
        this.initResourceTypeFieldTypeMap();
    }
    getFieldTypeByFieldDefinition(fieldDefinition) {
        if (isFunction(this.resourceTypeFieldTypeMap[fieldDefinition.resourceType])) {
            return this.resourceTypeFieldTypeMap[fieldDefinition.resourceType](fieldDefinition);
        }
        else {
            return this.resourceTypeFieldTypeMap[fieldDefinition.resourceType];
        }
    }
    initResourceTypeFieldTypeMap() {
        this.resourceTypeFieldTypeMap = Object.assign(Object.assign({}, RECORD_EDITOR.fieldTypes), { [RX_RECORD_DEFINITION.resourceTypes.character]: (fieldDefinition) => {
                return fieldDefinition.namedListDefinition || inRange(fieldDefinition.maxLength, 1, 255)
                    ? RxViewComponentType.Character
                    : RxViewComponentType.Textarea;
            } });
    }
}
RxDefaultRecordEditorInputType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultRecordEditorInputType, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDefaultRecordEditorInputType.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultRecordEditorInputType, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefaultRecordEditorInputType, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=default-record-editor-input-type.service.js.map