import { Injectable } from '@angular/core';
import { RxGuidService } from '../guid/guid.service';
import * as i0 from "@angular/core";
import * as i1 from "../guid/guid.service";
export class RxIdService {
    constructor(rxGuidService) {
        this.rxGuidService = rxGuidService;
        this.prefix = 'rx-';
    }
    get(cellId) {
        return cellId ? (cellId.slice(0, this.prefix.length) === this.prefix ? cellId : this.prefix + cellId) : cellId;
    }
    getBase(id) {
        return id.slice(this.prefix.length);
    }
    generate() {
        return this.rxGuidService.generate(this.prefix);
    }
}
RxIdService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, deps: [{ token: i1.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIdService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGuidService }]; } });
//# sourceMappingURL=id.service.js.map