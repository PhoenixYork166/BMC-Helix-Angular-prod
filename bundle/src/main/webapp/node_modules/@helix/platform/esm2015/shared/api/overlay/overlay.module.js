import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RxCustomizationStatusPipe } from './customization-status.pipe';
import { RxOverlayRequestsInterceptor } from './overlay-requests-interceptor.service';
import * as i0 from "@angular/core";
export class RxOverlayModule {
    static forRoot() {
        return {
            ngModule: RxOverlayModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RxOverlayRequestsInterceptor,
                    multi: true
                }
            ]
        };
    }
}
RxOverlayModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxOverlayModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, declarations: [RxCustomizationStatusPipe], imports: [CommonModule], exports: [RxCustomizationStatusPipe] });
RxOverlayModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxCustomizationStatusPipe],
                    exports: [RxCustomizationStatusPipe]
                }]
        }] });
//# sourceMappingURL=overlay.module.js.map