import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { IServerInformation } from './server-information.interface';
import * as i0 from "@angular/core";
export declare class RxServerInformationService {
    private rxSystemConfigurationService;
    constructor(rxSystemConfigurationService: RxSystemConfigurationService);
    getServerInformation(): Observable<IServerInformation>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxServerInformationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxServerInformationService>;
}
