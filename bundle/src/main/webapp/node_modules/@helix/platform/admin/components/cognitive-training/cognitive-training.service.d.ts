import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { IDataPageResult, ISystemConfiguration, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxCognitiveTrainingService {
    private rxSystemConfigurationService;
    private rxRecordInstanceDataPageService;
    constructor(rxSystemConfigurationService: RxSystemConfigurationService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    getClassificationServiceProvider(): Observable<ISystemConfiguration>;
    getChatbotLocalesById(id: string): Observable<IDataPageResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCognitiveTrainingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCognitiveTrainingService>;
}
