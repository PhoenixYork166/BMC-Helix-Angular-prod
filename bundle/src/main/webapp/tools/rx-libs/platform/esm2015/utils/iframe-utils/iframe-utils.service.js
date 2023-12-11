import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxIframeUtilsService {
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    postMessageToHost(messageObject) {
        window.parent.postMessage(JSON.stringify(messageObject), '*');
    }
}
RxIframeUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxIframeUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=iframe-utils.service.js.map