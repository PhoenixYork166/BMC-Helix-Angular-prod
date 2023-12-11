import { HttpClient } from '@angular/common/http';
import { RxProcessDefinitionDataPageService } from '@helix/platform/process/api';
import { Observable } from 'rxjs';
import { IDataPageResult } from '@helix/platform/shared/api';
import { RxCognitiveServiceSystemConfigurationDataPageService } from './cognitive-service-system-configuration-data-page.service';
import * as i0 from "@angular/core";
export declare class RxCognitiveServiceService {
    private httpClient;
    private rxCognitiveServiceSystemConfigurationDataPageService;
    private rxProcessDefinitionDataPageService;
    constructor(httpClient: HttpClient, rxCognitiveServiceSystemConfigurationDataPageService: RxCognitiveServiceSystemConfigurationDataPageService, rxProcessDefinitionDataPageService: RxProcessDefinitionDataPageService);
    filterMaskPassword(password: string): string;
    getChatbotProcessDefinitionNames(): Observable<string[]>;
    getSystemSettings(settingList: string[]): Observable<IDataPageResult>;
    testConnection(requestPayload: object): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCognitiveServiceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCognitiveServiceService>;
}
