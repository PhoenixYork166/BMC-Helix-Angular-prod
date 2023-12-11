import { Injectable } from '@angular/core';
import { RxOverlayService } from './overlay.service';
import * as i0 from "@angular/core";
import * as i1 from "./overlay.service";
export class RxOverlayRequestsInterceptor {
    constructor(rxOverlayService) {
        this.rxOverlayService = rxOverlayService;
    }
    intercept(request, next) {
        const currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
        if ((currentOverlayContext === null || currentOverlayContext === void 0 ? void 0 : currentOverlayContext.overlayGroupId) && !request.headers.get('request-overlay-group')) {
            request = request.clone({
                headers: request.headers.set('request-overlay-group', currentOverlayContext.overlayGroupId)
            });
        }
        return next.handle(request);
    }
}
RxOverlayRequestsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor, deps: [{ token: i1.RxOverlayService }], target: i0.ɵɵFactoryTarget.Injectable });
RxOverlayRequestsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxOverlayRequestsInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxOverlayService }]; } });
//# sourceMappingURL=overlay-requests-interceptor.service.js.map