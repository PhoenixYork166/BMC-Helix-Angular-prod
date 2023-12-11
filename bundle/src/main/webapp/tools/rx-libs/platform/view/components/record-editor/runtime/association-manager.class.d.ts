import { IRecordDefinition, RecordInstance, RxRecordDefinitionCacheService, RxRecordInstanceService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxAssociationDefinitionCacheService, RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { Observable } from 'rxjs';
import { RxJsonParserService } from '@helix/platform/utils';
import { IAssociationManagerConfig } from './record-editor.types';
declare enum CardinalityType {
    One = "ONE",
    Many = "MANY"
}
export declare class RxAssociationManagerService {
    private options;
    private rxAssociationInstanceDataPageService;
    private rxRecordDefinitionCacheService;
    private rxRecordInstanceUtilsService;
    private rxRecordInstanceService;
    private rxJsonParserService;
    private rxAssociationDefinitionCacheService;
    extensions: RecordInstance[];
    existing: any[];
    pending: any[];
    deleted: any[];
    private existingSubject$;
    existing$: Observable<any[]>;
    private pendingSubject$;
    pending$: Observable<any[]>;
    private extensionsSubject$;
    extensions$: Observable<any[]>;
    private initialize$;
    cardinalityTypes: typeof CardinalityType;
    totalExistingCount: number;
    associationDefinition: any;
    cardinalityType: any;
    isDataLoading: boolean;
    recordDefinition: IRecordDefinition;
    remainingAssociatedRecordCount: number;
    private getExistingAssociationInstances$;
    constructor(options: IAssociationManagerConfig, rxAssociationInstanceDataPageService: RxAssociationInstanceDataPageService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService, rxRecordInstanceService: RxRecordInstanceService, rxJsonParserService: RxJsonParserService, rxAssociationDefinitionCacheService: RxAssociationDefinitionCacheService);
    initialize(): Observable<any>;
    loadExistingAssociations(): Observable<any>;
    loadExtensions(): Observable<RecordInstance>;
    addToExisting(association: any): void;
    isDefaultNodeRoleUsed(association: any): string;
    addToPending(associations: any, rolesConfig: any): void;
    addExtension(extensionRecordInstance: RecordInstance): void;
    restore(): void;
    reset(): void;
    delete(associationId: any): void;
    deleteAllExisting(): void;
    deleteAllPending(): void;
    mergeFieldIds(fieldIds: any): void;
    extendOptions(options: any): void;
    private getCardinalityType;
    private getExtensionRecordInstance;
    private getExistingAssociationInstances;
    private isInExisting;
    private isInPending;
    getFieldIds(): any[];
    private isInDeleted;
    private deleteFromExisting;
    private deleteFromPending;
    destroy(): void;
}
export {};
