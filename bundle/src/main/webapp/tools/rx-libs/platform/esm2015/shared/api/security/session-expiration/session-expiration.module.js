import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxSessionExpirationComponent } from './session-expiration.component';
import { RxSessionExpirationInterceptor } from './session-expiration.interceptor';
import * as i0 from "@angular/core";
export class RxSessionExpirationModule {
    static forRoot() {
        return {
            ngModule: RxSessionExpirationModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxSessionExpirationInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxSessionExpirationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSessionExpirationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, declarations: [RxSessionExpirationComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule], exports: [RxSessionExpirationComponent] });
RxSessionExpirationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSessionExpirationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSessionExpirationComponent],
                    entryComponents: [RxSessionExpirationComponent],
                    exports: [RxSessionExpirationComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule]
                }]
        }] });
//# sourceMappingURL=session-expiration.module.js.map