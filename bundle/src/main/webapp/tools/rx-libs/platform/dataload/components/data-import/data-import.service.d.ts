import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataImportSheetConfiguration, IDataloadWorksheet } from './data-import.types';
import * as i0 from "@angular/core";
export declare class DataImportService {
    private httpClient;
    url: string;
    constructor(httpClient: HttpClient);
    runLoadProcess(id: string): Observable<any>;
    stopDataProcessing(id: string): Observable<any>;
    getDataRecordWorksheet(recordId: string): Observable<IDataloadWorksheet>;
    getEmptyCurrentSheetDataMapConfig(sheetName: string): IDataImportSheetConfiguration;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataImportService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataImportService>;
}
