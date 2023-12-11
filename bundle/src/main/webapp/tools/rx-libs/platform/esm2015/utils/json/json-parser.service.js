import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RxJsonParserService {
    tryParseJson(value, defaultValue) {
        try {
            return JSON.parse(value);
        }
        catch (ignored) {
            return defaultValue;
        }
    }
}
RxJsonParserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxJsonParserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=json-parser.service.js.map