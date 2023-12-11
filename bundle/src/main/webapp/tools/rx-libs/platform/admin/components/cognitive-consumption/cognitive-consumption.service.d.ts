import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICognitiveConsumptionNotificationConfig, ICognitiveConsumptionNotificationEntity, ICognitiveConsumptionNotificationHistory, ICognitiveConsumptionNotificationParams, ICognitiveLicenseUsage, ICognitiveLicenseUsageParams } from './cognitive-consumption.types';
import * as i0 from "@angular/core";
export declare class RxCognitiveConsumptionService {
    private httpClient;
    constructor(httpClient: HttpClient);
    getCognitiveConsumptionNotificationConfig(params: ICognitiveConsumptionNotificationParams): Observable<ICognitiveConsumptionNotificationConfig>;
    postCognitiveConsumptionNotificationConfigEntity(entity: ICognitiveConsumptionNotificationEntity): Observable<any>;
    putCognitiveConsumptionNotificationConfigEntity(entity: ICognitiveConsumptionNotificationEntity): Observable<any>;
    getCognitiveConsumptionNotificationHistory(params: ICognitiveConsumptionNotificationParams): Observable<ICognitiveConsumptionNotificationHistory>;
    getCognitiveLicenseUsage(licenseType: string, id: string, params: ICognitiveLicenseUsageParams): Observable<ICognitiveLicenseUsage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCognitiveConsumptionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCognitiveConsumptionService>;
}
