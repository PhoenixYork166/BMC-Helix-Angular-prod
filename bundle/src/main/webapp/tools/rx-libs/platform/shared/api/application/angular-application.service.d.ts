import { RxStringService } from '@helix/platform/utils';
import { Observable } from 'rxjs';
import { RxAdminSettingsService } from '../administration';
import * as i0 from "@angular/core";
export declare class RxAngularApplicationService {
    private rxAdminSettingsService;
    private rxStringService;
    private angularJsApplicationBundleIds$;
    private angularJsViewDesignerBundleIds$;
    constructor(rxAdminSettingsService: RxAdminSettingsService, rxStringService: RxStringService);
    isAngularJsApplication(bundleId: any): Observable<boolean>;
    isAngularJsViewDesignerBundle(bundleId: any): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAngularApplicationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAngularApplicationService>;
}
