import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RxMetadataService } from '../metadata.service';
import * as i0 from "@angular/core";
import * as i1 from "../metadata.service";
export class RxMetadataLastUpdateTimeInterceptor {
    constructor(rxMetadataService) {
        this.rxMetadataService = rxMetadataService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                const metadataLastUpdateTime = event.headers.get('metadata-last-update-time');
                if (metadataLastUpdateTime) {
                    this.rxMetadataService.setMetadataLastUpdateTime(metadataLastUpdateTime);
                }
            }
        }));
    }
}
RxMetadataLastUpdateTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor, deps: [{ token: i1.RxMetadataService }], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataLastUpdateTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataLastUpdateTimeInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxMetadataService }]; } });
//# sourceMappingURL=metadata-last-update-time.interceptor.js.map