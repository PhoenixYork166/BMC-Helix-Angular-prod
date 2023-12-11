import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxLiveAgentSettingsService {
    private httpClient;
    constructor(httpClient: HttpClient);
    private chatbotConfigurationUrl;
    getAvailableTopics(): Observable<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLiveAgentSettingsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxLiveAgentSettingsService>;
}
