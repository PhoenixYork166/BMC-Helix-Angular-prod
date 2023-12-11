import { Injectable } from '@angular/core';
import { constant, forEach, find, get, includes, isFunction, isUndefined, some, sortBy } from 'lodash';
import { AsyncSubject, forkJoin, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION } from '@helix/platform/association/api';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxLogService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { RX_RECORD_GRID } from '../../record-grid.constant';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/utils";
export class RxRecordGridUtilsService {
    constructor(rxLogService, rxRecordDefinitionCacheService, stringService, rxDefinitionNameService, rxFieldDefinitionService) {
        this.rxLogService = rxLogService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.stringService = stringService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxFieldDefinitionService = rxFieldDefinitionService;
    }
    getColumnDescriptors(recordDefinitionName, source) {
        return this.rxRecordDefinitionCacheService
            .getRecordDefinition(recordDefinitionName)
            .toPromise()
            .then((recordDefinition) => {
            if (isFunction(source.getColumns)) {
                const columns = source
                    .getColumns()
                    .map((column, index) => ({
                    fieldId: column.field,
                    index,
                    title: column.header,
                    fieldDefinition: column.fieldDefinition
                }));
                return Promise.all(columns
                    .filter((column) => this.isAssociatedRecordFieldId(column.fieldId))
                    .map((column) => this.getAssociationDescriptor(column.fieldId, recordDefinition)
                    .toPromise()
                    .then((associationDescriptor) => {
                    column.associationDescriptor = associationDescriptor;
                }))).then(constant(columns));
            }
            else {
                return recordDefinition.fieldDefinitions.map((fieldDefinition, index) => ({
                    fieldId: fieldDefinition.id,
                    index,
                    title: fieldDefinition.name,
                    fieldDefinition: fieldDefinition
                }));
            }
        });
    }
    getAssociationDescriptors(recordDefinitionName) {
        return forkJoin([
            this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName),
            this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName)
        ]).pipe(map(([associations, recordDefinition]) => {
            const associationDescriptors = [];
            forEach(associations[recordDefinitionName], (associationDefinition) => {
                const isOneToMany = associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value;
                const isManyToManyAssociation = associationDefinition.cardinality === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value;
                if (!isManyToManyAssociation) {
                    if (this.isNeedSide(associationDefinition.nodeBId, recordDefinitionName, recordDefinition)) {
                        associationDescriptors.push({
                            associationDefinition: associationDefinition,
                            recordDefinitionName: associationDefinition.nodeAId,
                            nodeSide: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.value,
                            label: this.getAssociationLabel(associationDefinition, RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA)
                        });
                    }
                    if (this.isNeedSide(associationDefinition.nodeAId, recordDefinitionName, recordDefinition) &&
                        !isOneToMany) {
                        associationDescriptors.push({
                            associationDefinition: associationDefinition,
                            recordDefinitionName: associationDefinition.nodeBId,
                            nodeSide: RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value,
                            label: this.getAssociationLabel(associationDefinition, RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB)
                        });
                    }
                }
            });
            return sortBy(associationDescriptors, 'label');
        }));
    }
    getFieldDefinition(gridColumnFieldId, primaryRecordDefinition) {
        const locator = this.getFieldLocator(gridColumnFieldId);
        const fieldDefinition$ = new AsyncSubject();
        let recordDefinitionPromise;
        if (locator.fieldId === RX_RECORD_GRID.actionsColumnFieldDefinition.id) {
            return of(RX_RECORD_GRID.actionsColumnFieldDefinition);
        }
        else {
            if (locator.associationGuid) {
                recordDefinitionPromise = this.getAssociationDescriptors(primaryRecordDefinition.name)
                    .pipe(map((associationDescriptors) => this.findAssociationDescriptor(associationDescriptors, locator)), filter((associationDescriptor) => Boolean(associationDescriptor)), map((associationDescriptor) => associationDescriptor.associationDefinition[RX_ASSOCIATED_RECORD_NODE_SIDES[associationDescriptor.nodeSide].recordDefinitionNameKey]), switchMap((recordDefinitionName) => {
                    return this.rxRecordDefinitionCacheService.getRecordDefinition(recordDefinitionName);
                }))
                    .toPromise();
            }
            else {
                recordDefinitionPromise = Promise.resolve(primaryRecordDefinition);
            }
            recordDefinitionPromise.then((recordDefinition) => {
                let fieldDefinition;
                if (recordDefinition) {
                    fieldDefinition = find(recordDefinition.fieldDefinitions, {
                        id: Number(locator.fieldId) || locator.fieldId
                    });
                }
                fieldDefinition$.next(fieldDefinition);
                fieldDefinition$.complete();
            });
            return fieldDefinition$;
        }
    }
    isAssociatedRecordFieldId(fieldId) {
        return !some(this.getFieldLocator(fieldId), isUndefined);
    }
    getFieldIdForGridColumn(fieldId, associationDescriptor) {
        return associationDescriptor
            ? `recordContext._associations.${associationDescriptor.associationDefinition.guid}.${associationDescriptor.nodeSide}[0].${fieldId}`
            : String(fieldId);
    }
    getAssociationDescriptor(gridColumnFieldId, primaryRecordDefinition) {
        const locator = this.getFieldLocator(gridColumnFieldId);
        let associationDescriptor = of(null);
        if (locator.associationGuid) {
            associationDescriptor = this.getAssociationDescriptors(primaryRecordDefinition.name).pipe(map((associationDescriptors) => this.findAssociationDescriptor(associationDescriptors, locator)));
        }
        return associationDescriptor;
    }
    getDisplayFieldDescriptor(fieldId, primaryRecordDefinition, associatedRecordDefinitionName) {
        const fieldLocator = this.getFieldLocator(fieldId);
        const fieldDefinition$ = this.isAssociatedRecordFieldId(fieldId)
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(associatedRecordDefinitionName).pipe(map((associatedRecordDefinition) => {
                const isCoreIdField = fieldLocator.fieldId === String(RX_RECORD_DEFINITION.coreFieldIds.id);
                const displayFieldId = String((isCoreIdField && associatedRecordDefinition.displayFieldIdInAssociation) || fieldLocator.fieldId);
                return find(associatedRecordDefinition.fieldDefinitions, (fieldDefinition) => String(fieldDefinition.id) === displayFieldId);
            }))
            : of(find(primaryRecordDefinition.fieldDefinitions, (fieldDefinition) => String(fieldDefinition.id) === fieldId));
        return fieldDefinition$;
    }
    getColumnLabel(fieldDefinition, associationDescriptor) {
        return associationDescriptor ? `${associationDescriptor.label} > ${fieldDefinition.name}` : fieldDefinition.name;
    }
    findAssociationDescriptor(associationDescriptors, locator) {
        return find(associationDescriptors, (associationDescriptor) => {
            return (associationDescriptor.associationDefinition.guid === locator.associationGuid &&
                associationDescriptor.nodeSide === locator.associationNodeSide);
        });
    }
    getFieldLocator(gridColumnFieldId) {
        const match = new RegExp('(?:' + RX_RECORD_GRID.associatedFieldIdPrefixPattern + ')?(.+)').exec(gridColumnFieldId);
        return {
            associationGuid: match[1],
            associationNodeSide: match[2],
            fieldId: match[3]
        };
    }
    isNeedSide(sideName, recordDefinitionName, recordDefinition) {
        return includes([recordDefinitionName, get(recordDefinition, 'inheritanceDescriptor.inheritingFrom')], sideName);
    }
    getAssociationLabel(associationDefinition, nodeSide) {
        let nodeSideName;
        let label = this.rxDefinitionNameService.getDisplayName(associationDefinition.name);
        if (associationDefinition.nodeAId === associationDefinition.nodeBId) {
            if (nodeSide === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA) {
                nodeSideName = associationDefinition.nodeAName;
            }
            if (nodeSide === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB) {
                nodeSideName = associationDefinition.nodeBName;
            }
            nodeSideName = nodeSideName || nodeSide.defaultName;
            label += ' (' + nodeSideName + ')';
        }
        return label;
    }
    isSharedFilterPresetTag(tag) {
        return tag.data.isSharedFilterPreset;
    }
    getTestIdForGridColumn(fieldId) {
        if (this.isAssociatedRecordFieldId(fieldId)) {
            const fieldLocator = this.getFieldLocator(fieldId);
            return `field-id-${fieldLocator.associationGuid}-${fieldLocator.fieldId}`;
        }
        else {
            return `field-id-${fieldId}`;
        }
    }
    isSearchable(fieldDefinition, recordDefinition) {
        return (includes([
            RX_RECORD_DEFINITION.dataTypes.character.resourceType,
            RX_RECORD_DEFINITION.dataTypes.localizedCharacter.resourceType,
            RX_RECORD_DEFINITION.dataTypes.integer.resourceType,
            RX_RECORD_DEFINITION.dataTypes.decimal.resourceType,
            RX_RECORD_DEFINITION.dataTypes.real.resourceType
        ], fieldDefinition.resourceType) &&
            !this.rxFieldDefinitionService.isPassword(fieldDefinition) &&
            !this.rxFieldDefinitionService.isSecured(fieldDefinition) &&
            !this.rxFieldDefinitionService.isDataProviderIdField(fieldDefinition, recordDefinition));
    }
}
RxRecordGridUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUtilsService, deps: [{ token: i1.RxLogService }, { token: i2.RxRecordDefinitionCacheService }, { token: i3.RxStringService }, { token: i1.RxDefinitionNameService }, { token: i2.RxFieldDefinitionService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxLogService }, { type: i2.RxRecordDefinitionCacheService }, { type: i3.RxStringService }, { type: i1.RxDefinitionNameService }, { type: i2.RxFieldDefinitionService }]; } });
//# sourceMappingURL=record-grid-utils.service.js.map