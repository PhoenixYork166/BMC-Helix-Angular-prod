import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
// LMA:: This Service is necessary to override the default UploaderService from
// the Adapt Uploader Component.
export class UploaderService {
    deleteFile(file, url) {
        return of(null);
    }
    responseCallback(response) { }
    sendChunk(requestBody, uploadAsOneChunk, url) {
        return undefined;
    }
    sendFile(file) {
        return of(null);
    }
}
UploaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UploaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: UploaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=custom-uploader.service.js.map