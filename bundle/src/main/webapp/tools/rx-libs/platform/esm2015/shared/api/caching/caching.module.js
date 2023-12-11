import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RxMetadataLastUpdateTimeInterceptor } from './interceptors/metadata-last-update-time.interceptor';
import { RxMetadataRequestInterceptor } from './interceptors/metadata-request.interceptor';
import { RxRequestInterceptor } from '../interceptors/request.interceptor';
import { RxUpgradeTrackerInterceptor } from '../upgrade-tracker/upgrade-tracker-interceptor';
import * as i0 from "@angular/core";
export class RxCachingModule {
    static forRoot() {
        return {
            ngModule: RxCachingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxRequestInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxMetadataRequestInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxMetadataLastUpdateTimeInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxUpgradeTrackerInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxCachingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxCachingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, imports: [CommonModule] });
RxCachingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCachingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=caching.module.js.map