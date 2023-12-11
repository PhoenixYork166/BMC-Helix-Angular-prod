import { Observable } from 'rxjs';
import { IAssociationDefinition, IAssociationTree, RxAssociationDefinitionDataPageService, RxAssociationNodeTreeDataPageService } from '@helix/platform/association/api';
import { IHttpGetParams } from '@helix/platform/shared/api';
import { IRecordDefinition } from './record-definition.types';
import { RxRecordDefinitionService } from './record-definition.service';
import * as i0 from "@angular/core";
export interface IRecordAssociationDefinitionData {
    [associationDefinitionName: string]: Array<IAssociationDefinition>;
}
export declare class RxRecordDefinitionCacheService {
    private rxAssociationDefinitionDataPageService;
    private rxAssociationNodeTreeDataPageService;
    private rxRecordDefinitionService;
    private consumers;
    private recordDefinitions;
    private recordAssociationDefinitions;
    private recordAssociationTrees;
    constructor(rxAssociationDefinitionDataPageService: RxAssociationDefinitionDataPageService, rxAssociationNodeTreeDataPageService: RxAssociationNodeTreeDataPageService, rxRecordDefinitionService: RxRecordDefinitionService);
    getRecordAssociationDefinitions(recordDefinitionNames: string[] | string): Observable<IRecordAssociationDefinitionData>;
    getRecordAssociationTree(recordDefinitionName: string): Observable<IAssociationTree[]>;
    getRecordAssociationTrees(recordDefinitionNames: string[]): Observable<IAssociationTree[][]>;
    getRecordDefinition(recordDefinitionName: string, options?: IHttpGetParams): Observable<IRecordDefinition>;
    getRecordDefinitions(recordDefinitionNames: string[], options?: IHttpGetParams): Observable<IRecordDefinition[]>;
    registerConsumer(consumerDestroy$: Observable<any>): void;
    private clearCache;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordDefinitionCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordDefinitionCacheService>;
}
