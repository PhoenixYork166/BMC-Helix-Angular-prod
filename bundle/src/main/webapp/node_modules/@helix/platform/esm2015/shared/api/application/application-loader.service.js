import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class RxApplicationLoaderService {
    constructor(document) {
        this.document = document;
    }
    removeApplicationLoader() {
        const applicationLoaderId = 'rx-application-loader-container';
        const applicationLoaderElement = this.document.getElementById(applicationLoaderId);
        if (applicationLoaderElement) {
            applicationLoaderElement.remove();
        }
    }
}
RxApplicationLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=application-loader.service.js.map