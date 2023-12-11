import { HttpClient } from '@angular/common/http';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { ISummarizationRecord } from './summarization-testing.types';
import * as i0 from "@angular/core";
export declare class RxSummarizationTestingService {
    private httpClient;
    private rxCommandFactoryService;
    private textSummarizationCommand;
    private recordSummarizationCommand;
    constructor(httpClient: HttpClient, rxCommandFactoryService: RxCommandFactoryService);
    getTextSummarization(payload: ISummarizationRecord): Observable<string[]>;
    getRecordInstanceSummarization(payload: any): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSummarizationTestingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSummarizationTestingService>;
}
