import { __decorate, __metadata, __param } from "tslib";
import { Optional } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RX_ASSOCIATION_DEFINITION, RxAssociationDefinitionCacheService, RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { assign, clone, filter, find, forEach, get, isEmpty, map as _map, remove, uniq } from 'lodash';
import { BehaviorSubject, defer, forkJoin, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { RxJsonParserService } from '@helix/platform/utils';
var CardinalityType;
(function (CardinalityType) {
    CardinalityType["One"] = "ONE";
    CardinalityType["Many"] = "MANY";
})(CardinalityType || (CardinalityType = {}));
let RxAssociationManagerService = class RxAssociationManagerService {
    constructor(options, rxAssociationInstanceDataPageService, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, rxRecordInstanceService, rxJsonParserService, rxAssociationDefinitionCacheService) {
        this.options = options;
        this.rxAssociationInstanceDataPageService = rxAssociationInstanceDataPageService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
        this.extensions = [];
        this.existing = [];
        this.pending = [];
        this.deleted = [];
        this.existingSubject$ = new BehaviorSubject([]);
        this.existing$ = this.existingSubject$.asObservable();
        this.pendingSubject$ = new BehaviorSubject([]);
        this.pending$ = this.pendingSubject$.asObservable();
        this.extensionsSubject$ = new BehaviorSubject([]);
        this.extensions$ = this.extensionsSubject$.asObservable();
        this.cardinalityTypes = CardinalityType;
        this.totalExistingCount = 0;
        this.associationDefinition = null;
        this.cardinalityType = null;
        this.remainingAssociatedRecordCount = 0;
        // create a shared observable to eliminate duplicate API calls from multiple association components in dropdown mode
        this.getExistingAssociationInstances$ = defer(() => this.getExistingAssociationInstances()).pipe(share());
        assign(this.options, {
            canLoadAssociations: Boolean(this.options.associatedRecordInstanceId),
            pageSize: 10,
            startIndex: 0
        });
        this.extensions = this.options.associationInstances.extensions;
        this.existing = this.options.associationInstances.existing;
        this.pending = this.options.associationInstances.pending;
        this.deleted = this.options.associationInstances.deleted;
        this.options.fieldIds = this.options.fieldIds || [];
        // add id to core fields for tracking changes on associationInstances
        this.mergeFieldIds([RX_RECORD_DEFINITION.coreFieldIds.id]);
    }
    initialize() {
        this.isDataLoading = true;
        if (!this.initialize$) {
            this.initialize$ = forkJoin([
                this.rxAssociationDefinitionCacheService.getAssociationDefinition(this.options.associationDefinitionName),
                this.rxRecordDefinitionCacheService.getRecordDefinition(this.options.recordDefinitionName)
            ]).pipe(tap(([associationDefinition, recordDefinition]) => {
                this.isDataLoading = false;
                this.associationDefinition = associationDefinition;
                this.recordDefinition = recordDefinition;
                // determine whether a single or multiple instances can be associated based on association's cardinality and record role
                this.cardinalityType = this.getCardinalityType(this.associationDefinition.cardinality, this.options.associatedRecordNodeSide);
                // set up field ids if they are not be provided
                if (this.options.allFieldIds) {
                    this.options.fieldIds = _map(this.recordDefinition.fieldDefinitions, 'id');
                    this.mergeFieldIds([RX_RECORD_DEFINITION.coreFieldIds.id]);
                }
            }));
        }
        return this.initialize$;
    }
    loadExistingAssociations() {
        if (this.options.canLoadAssociations) {
            return this.initialize().pipe(switchMap(() => {
                return this.getExistingAssociationInstances$.pipe(tap((instances) => {
                    forEach(instances.data, (instance) => {
                        this.addToExisting(this.rxRecordInstanceUtilsService.convertFromDataPageRowToPlainRecordInstance(instance));
                    });
                    this.options.startIndex += instances.data.length;
                    this.remainingAssociatedRecordCount = instances.totalSize - this.options.startIndex;
                }));
            }));
        }
        else {
            return of([]);
        }
    }
    loadExtensions() {
        return this.initialize().pipe(switchMap(() => {
            return this.getExtensionRecordInstance().pipe(tap((extensionRecordInstance) => {
                if (extensionRecordInstance) {
                    this.addExtension(extensionRecordInstance);
                }
            }));
        }));
    }
    addToExisting(association) {
        // Existing association can be loaded twice by parallel requests either with or without filtering by `roleName` attribute.
        const existingAssociation = this.isInExisting(association.id);
        if (existingAssociation) {
            if (this.isDefaultNodeRoleUsed(existingAssociation) && !this.isDefaultNodeRoleUsed(this.options.rolesConfig)) {
                // Remove and add association again instead of config update is needed to correctly observe associations collection change.
                remove(this.existing, existingAssociation);
                association.rolesConfig = this.options.rolesConfig;
                this.existing.push(association);
                this.existingSubject$.next(this.existing);
            }
            else {
                // Existing association already has custom roles of nodes, so newly added association instance will be skipped.
            }
        }
        else {
            if (this.options.rolesConfig && !association.rolesConfig) {
                association.rolesConfig = this.options.rolesConfig;
            }
            this.existing.push(association);
            this.existingSubject$.next(this.existing);
        }
    }
    isDefaultNodeRoleUsed(association) {
        return this.rxJsonParserService.tryParseJson(get(association, 'rolesConfig.useDefaultRoles', true));
    }
    addToPending(associations, rolesConfig) {
        if (!isEmpty(associations) && this.associationDefinition) {
            if (this.cardinalityType === CardinalityType.Many) {
                const associationsForAppending = filter(associations, (association) => {
                    return (!this.isInExisting(association.id) && !this.isInDeleted(association.id) && !this.isInPending(association.id));
                });
                if (rolesConfig) {
                    forEach(associationsForAppending, (association) => {
                        association.rolesConfig = rolesConfig;
                    });
                }
                Array.prototype.push.apply(this.pending, associationsForAppending);
                this.pendingSubject$.next(this.pending);
                const previouslyDeletedAssociations = remove(this.deleted, (deletedAssociation) => {
                    return find(associations, {
                        id: deletedAssociation.id
                    });
                });
                forEach(previouslyDeletedAssociations, (deletedAssociation) => {
                    this.addToExisting(deletedAssociation);
                });
            }
            else if (this.cardinalityType === CardinalityType.One) {
                const association = associations[0];
                switch (true) {
                    case isEmpty(this.existing) && isEmpty(this.deleted):
                        this.pending.length = 0;
                        this.pending.push(association);
                        break;
                    case isEmpty(this.existing):
                        const deletedAssociation = this.deleted[0];
                        this.pending.length = 0;
                        if (deletedAssociation.id === association.id) {
                            this.addToExisting(this.deleted.splice(0, 1)[0]);
                        }
                        else {
                            this.pending.push(association);
                        }
                        break;
                    case isEmpty(this.deleted):
                        const existingAssociation = this.existing[0];
                        if (existingAssociation.id !== association.id) {
                            this.deleteFromExisting(existingAssociation.id);
                            this.pending.length = 0;
                            this.pending.push(association);
                        }
                        break;
                }
                this.pendingSubject$.next(this.pending);
            }
        }
    }
    addExtension(extensionRecordInstance) {
        this.extensions.push(extensionRecordInstance);
        this.extensionsSubject$.next(this.extensions);
    }
    restore() {
        this.extensionsSubject$.next(this.extensions);
        forEach(this.deleted, (deletedAssociation) => {
            this.addToExisting(deletedAssociation);
        });
        this.deleted.splice(0, this.deleted.length);
        this.deleteAllPending();
    }
    reset() {
        this.existing.splice(0, this.existing.length);
        this.pending.splice(0, this.pending.length);
        this.deleted.splice(0, this.deleted.length);
        this.totalExistingCount = 0;
        this.options.startIndex = 0;
    }
    delete(associationId) {
        if (this.isInExisting(associationId)) {
            this.deleteFromExisting(associationId);
        }
        else if (this.isInPending(associationId)) {
            this.deleteFromPending(associationId);
        }
    }
    deleteAllExisting() {
        const associationIds = _map(this.existing, 'id');
        forEach(associationIds, (associationId) => {
            this.deleteFromExisting(associationId);
        });
    }
    deleteAllPending() {
        this.pending.splice(0, this.pending.length);
        this.pendingSubject$.next(this.pending);
    }
    mergeFieldIds(fieldIds) {
        if (fieldIds) {
            this.options.fieldIds = uniq(this.options.fieldIds.concat(fieldIds));
        }
    }
    extendOptions(options) {
        if (options.fieldIds) {
            this.mergeFieldIds(options.fieldIds);
        }
        this.options.allFieldIds = options.allFieldIds;
    }
    getCardinalityType(cardinality, associatedRecordNodeSide) {
        let cardinalityType;
        switch (true) {
            case cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToOne.value:
                cardinalityType = CardinalityType.One;
                break;
            case cardinality === RX_ASSOCIATION_DEFINITION.cardinality.oneToMany.value:
                if (associatedRecordNodeSide === RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.value) {
                    cardinalityType = CardinalityType.Many;
                }
                else {
                    cardinalityType = CardinalityType.One;
                }
                break;
            case cardinality === RX_ASSOCIATION_DEFINITION.cardinality.manyToMany.value:
                cardinalityType = CardinalityType.Many;
                break;
        }
        return cardinalityType;
    }
    getExtensionRecordInstance(loadFullInstance = true) {
        const fields = loadFullInstance ? RX_RECORD_DEFINITION.coreFieldIds.id : this.options.fieldIds.join(',');
        return this.rxAssociationInstanceDataPageService
            .post({
            params: {
                associationDefinition: this.options.associationDefinitionName,
                nodeToQuery: this.options.associatedRecordNodeSide,
                associatedRecordInstanceId: this.options.associatedRecordInstanceId,
                propertySelection: fields
            }
        })
            .pipe(map((instances) => instances.data[0]), switchMap((dataPageRow) => {
            if (dataPageRow && loadFullInstance) {
                return this.rxRecordInstanceService.get(this.options.recordDefinitionName, dataPageRow[RX_RECORD_DEFINITION.coreFieldIds.id]);
            }
            else if (dataPageRow && !loadFullInstance) {
                return of(this.rxRecordInstanceService.createInstanceFromDataPageRow(dataPageRow, this.recordDefinition));
            }
            else {
                return of(null);
            }
        }));
    }
    getExistingAssociationInstances() {
        const params = {
            pageSize: this.options.pageSize,
            startIndex: this.options.startIndex,
            associationDefinition: this.options.associationDefinitionName,
            nodeToQuery: this.options.associatedRecordNodeSide,
            associatedRecordInstanceId: this.options.associatedRecordInstanceId,
            propertySelection: this.options.fieldIds.join(','),
            useDefaultRoleNames: false,
            nodeARoleName: '',
            nodeBRoleName: ''
        };
        if (this.options.rolesConfig.useDefaultRoles) {
            params.useDefaultRoleNames = this.options.rolesConfig.useDefaultRoles;
            delete params.nodeARoleName;
            delete params.nodeBRoleName;
        }
        else {
            delete params.useDefaultRoleNames;
            params.nodeARoleName = this.options.rolesConfig.nodeARole || '';
            params.nodeBRoleName = this.options.rolesConfig.nodeBRole || '';
        }
        return this.rxAssociationInstanceDataPageService.post({ params });
    }
    isInExisting(associationId) {
        return find(this.existing, {
            id: associationId
        });
    }
    isInPending(associationId) {
        return find(this.pending, {
            id: associationId
        });
    }
    getFieldIds() {
        return clone(this.options.fieldIds);
    }
    isInDeleted(associationId) {
        return find(this.deleted, {
            id: associationId
        });
    }
    deleteFromExisting(associationId) {
        const removedAssociation = remove(this.existing, {
            id: associationId
        })[0];
        this.deleted.push(removedAssociation);
        this.existingSubject$.next(this.existing);
    }
    deleteFromPending(associationId) {
        remove(this.pending, {
            id: associationId
        });
        this.pendingSubject$.next(this.pending);
    }
    destroy() {
        this.existingSubject$.complete();
        this.pendingSubject$.complete();
        this.extensionsSubject$.complete();
    }
};
RxAssociationManagerService = __decorate([
    __param(0, Optional()),
    __metadata("design:paramtypes", [Object, RxAssociationInstanceDataPageService,
        RxRecordDefinitionCacheService,
        RxRecordInstanceUtilsService,
        RxRecordInstanceService,
        RxJsonParserService,
        RxAssociationDefinitionCacheService])
], RxAssociationManagerService);
export { RxAssociationManagerService };
//# sourceMappingURL=association-manager.class.js.map