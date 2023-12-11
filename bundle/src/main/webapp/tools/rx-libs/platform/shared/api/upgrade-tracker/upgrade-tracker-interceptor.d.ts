import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxMetadataService } from '../caching/metadata.service';
import { RxUpgradeTrackerService } from './upgrade-tracker.service';
import * as i0 from "@angular/core";
export declare class RxUpgradeTrackerInterceptor implements HttpInterceptor {
    private rxMetadataService;
    private rxUpgradeTrackerService;
    constructor(rxMetadataService: RxMetadataService, rxUpgradeTrackerService: RxUpgradeTrackerService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUpgradeTrackerInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUpgradeTrackerInterceptor>;
}
