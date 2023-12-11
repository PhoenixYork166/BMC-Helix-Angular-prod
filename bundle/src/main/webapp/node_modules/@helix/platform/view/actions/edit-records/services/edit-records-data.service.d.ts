import { IRecordInstance } from '@helix/platform/record/api';
import { AdaptModalService, ModalDeferred } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { IEditRecordsActionResults } from '../interfaces/edit-records-action-results.interface';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxEditRecordsDataService {
    private adaptModalService;
    private translateService;
    private rxCommandFactoryService;
    private resourceType;
    private editRecordsCommand;
    constructor(adaptModalService: AdaptModalService, translateService: TranslateService, rxCommandFactoryService: RxCommandFactoryService);
    editRecords(preparedRecordData: any): Observable<any>;
    showActionResults(actionResults: IEditRecordsActionResults): Promise<ModalDeferred>;
    runAction(recordInstanceIds: string[], recordInstance: IRecordInstance): Observable<ModalDeferred>;
    private cleanUnchangedFields;
    private prepareFiles;
    private cleanFiles;
    private prepareAssociationInstancesForSaving;
    private prepareRecordData;
    private prepareActionResults;
    private convertMessageToString;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEditRecordsDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEditRecordsDataService>;
}
