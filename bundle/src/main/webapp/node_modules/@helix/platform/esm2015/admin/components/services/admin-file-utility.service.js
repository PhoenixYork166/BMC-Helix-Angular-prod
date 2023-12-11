import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'lodash';
import * as i0 from "@angular/core";
export class RxAdminFileUtilityService {
    convertBase64ToFile(decodedString, fileName, fileType) {
        if (decodedString) {
            const buffer = map(atob(decodedString), (symbol) => symbol.charCodeAt(0));
            const uint8Array = new Uint8Array(buffer);
            return new File([uint8Array], fileName, { type: fileType });
        }
        else {
            return null;
        }
    }
    convertFileToBase64(file) {
        return new Observable((observer) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const base64String = last(fileReader.result.split(','));
                observer.next(base64String);
                observer.complete();
            };
            fileReader.onerror = () => {
                observer.next(null);
            };
            fileReader.readAsDataURL(file);
        });
    }
}
RxAdminFileUtilityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminFileUtilityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxAdminFileUtilityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminFileUtilityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAdminFileUtilityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=admin-file-utility.service.js.map