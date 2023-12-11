import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMetadataFieldResponse } from './webhook-callback-configuration.interface';
import * as i0 from "@angular/core";
export declare class RxWebhookCallbackConfigurationService {
    private httpClient;
    private metadataFieldData;
    constructor(httpClient: HttpClient);
    getMetadataFields(): Observable<IMetadataFieldResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWebhookCallbackConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxWebhookCallbackConfigurationService>;
}
