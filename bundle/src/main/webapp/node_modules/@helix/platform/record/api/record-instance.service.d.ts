import { Injector, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreatedRecordInstance, IRecordInstance, IRxRecordInstanceAssociationInstances } from './record-instance.types';
import { RecordInstance } from './record-instance.class';
import { RxRecordDefinitionCacheService } from './record-definition-cache.service';
import { RxRecordInstanceUtilsService } from './record-instance-utils.service';
import { IRecordDefinition } from './record-definition.types';
import * as i0 from "@angular/core";
export declare class RxRecordInstanceService {
    private httpClient;
    private rxRecordDefinitionCacheService;
    private rxRecordInstanceUtilsService;
    private injector;
    private ngZone;
    private path;
    constructor(httpClient: HttpClient, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService, injector: Injector, ngZone: NgZone);
    get(recordDefinitionName: string, recordInstanceId: string): Observable<RecordInstance>;
    getNew(recordDefinitionName: string): Observable<RecordInstance>;
    getEmpty(recordDefinitionName: string): Observable<RecordInstance>;
    save(recordInstance: RecordInstance, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
    }): Observable<any>;
    delete(recordDefinitionName: string, recordInstanceId: string): Observable<any>;
    private prepareAttachments;
    private cleanAttachmentFiles;
    create(recordInstance: RecordInstance): Observable<ICreatedRecordInstance>;
    private getRecordInstance;
    private getRecordInstanceData;
    private prepareRecordInstance;
    getAttachmentDownloadUrl(recordDefinitionName: string, fieldId: number, recordInstanceId: string): string;
    downloadAttachment(recordDefinitionName: string, fieldId: number, recordInstanceId: string, fileName: string): void;
    getAttachment(recordDefinitionName: string, fieldId: number, recordInstanceId: string): Observable<Blob>;
    prepareAssociationInstancesForSaving(associationInstances: IRxRecordInstanceAssociationInstances): any[];
    prepareAssociatedRecordInstanceForSaving(recordInstance: any): IRecordInstance;
    createInstanceFromDataPageRow(dataPageRow: any, recordDefinition: IRecordDefinition): RecordInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordInstanceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordInstanceService>;
}
