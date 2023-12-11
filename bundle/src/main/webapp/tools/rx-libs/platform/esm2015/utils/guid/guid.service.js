import { Injectable } from '@angular/core';
import { RX_GUID } from './guid.constant';
import * as i0 from "@angular/core";
export class RxGuidService {
    generate(prefix) {
        // taken from JointJS, credit: http://stackoverflow.com/posts/2117523/revisions
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0; // tslint:disable-line
            const v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
            return v.toString(16);
        });
        if (prefix) {
            uuid = prefix + uuid;
        }
        return uuid;
    }
    isGuid(tested) {
        const guidPattern = new RegExp('^' + RX_GUID.baseGuidPattern + '$', 'i');
        return guidPattern.test(tested);
    }
}
RxGuidService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxGuidService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGuidService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=guid.service.js.map