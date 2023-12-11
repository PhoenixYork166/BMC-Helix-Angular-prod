import { Injectable } from '@angular/core';
import { RxRecordGridUtilsService } from '@helix/platform/view/components';
import { forkJoin, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/components";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
export class RxFieldDefinitionPickerService {
    constructor(rxRecordGridUtilsService, rxRecordDefinitionCacheService, rxDefinitionNameService) {
        this.rxRecordGridUtilsService = rxRecordGridUtilsService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
    }
    getAssociatedRecordFields(recordDefinitionName) {
        return this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinitionName).pipe(switchMap((associationDescriptors) => {
            if (associationDescriptors.length) {
                associationDescriptors.sort((descriptor1, descriptor2) => descriptor1.label.localeCompare(descriptor2.label));
                return forkJoin(associationDescriptors.map((associationDescriptor) => {
                    return this.rxRecordDefinitionCacheService
                        .getRecordDefinition(associationDescriptor.recordDefinitionName)
                        .pipe(map((recordDefinition) => ({
                        fields: this.getFieldDefinitions(recordDefinition.fieldDefinitions, associationDescriptor),
                        label: associationDescriptor.label,
                        isAssociatedRecord: true,
                        isExpanded: false,
                        value: associationDescriptor.associationDefinition.name,
                        associationDescriptor: associationDescriptor
                    })));
                }));
            }
            return of([]);
        }), shareReplay({
            bufferSize: 1,
            refCount: true
        }));
    }
    getRecordFields(recordDefinitionName) {
        return forkJoin([
            this.getAssociatedRecordFields(recordDefinitionName),
            this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName)
        ]).pipe(map(([associatedRecordFields, recordDefinition]) => [
            {
                fields: this.getFieldDefinitions(recordDefinition.fieldDefinitions, null),
                isExpanded: true,
                isAssociatedRecord: false,
                label: this.rxDefinitionNameService.getDisplayName(recordDefinitionName),
                value: recordDefinitionName
            },
            ...associatedRecordFields
        ]), shareReplay({
            bufferSize: 1,
            refCount: true
        }));
    }
    getFieldDefinitions(fieldDefinitions, associationDescriptor) {
        return fieldDefinitions
            .filter((fieldDefinition) => fieldDefinition.resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment)
            .map((fieldDefinition) => {
            const fieldKey = associationDescriptor
                ? this.getFieldIdExpression(fieldDefinition.id, associationDescriptor)
                : fieldDefinition.name;
            return {
                label: fieldDefinition.name,
                value: fieldKey
            };
        })
            .sort((field1, field2) => field1.label.localeCompare(field2.label));
    }
    getFieldIdExpression(fieldId, associationDescriptor) {
        return `recordContext._associations.${associationDescriptor.associationDefinition.guid}.${associationDescriptor.nodeSide}[0].${fieldId}`;
    }
}
RxFieldDefinitionPickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionPickerService, deps: [{ token: i1.RxRecordGridUtilsService }, { token: i2.RxRecordDefinitionCacheService }, { token: i3.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Injectable });
RxFieldDefinitionPickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionPickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFieldDefinitionPickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordGridUtilsService }, { type: i2.RxRecordDefinitionCacheService }, { type: i3.RxDefinitionNameService }]; } });
//# sourceMappingURL=field-definition-picker.service.js.map