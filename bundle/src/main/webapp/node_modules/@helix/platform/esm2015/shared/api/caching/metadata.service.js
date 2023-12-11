import { Injectable } from '@angular/core';
import { endsWith } from 'lodash';
import * as i0 from "@angular/core";
export class RxMetadataService {
    setMetadataLastUpdateTime(metadataLastUpdateTime) {
        this.metadataLastUpdateTime = new Date(metadataLastUpdateTime);
    }
    getMetadataLastUpdateTime() {
        return this.metadataLastUpdateTime;
    }
    isLocalizedStringsRequest(request) {
        return request.method === 'GET' && /\/api\/rx\/application\/localizedstrings/.test(request.url);
    }
    isMetadataDataPageQueryRequest(request) {
        return request.method === 'GET' &&
            /\/api\/rx\/application\/datapage/.test(request.url) &&
            (endsWith(request.params.get('dataPageType'), 'DefinitionDataPageQuery') ||
                endsWith(request.params.get('dataPageType'), 'LocalizedStringsDataPageQuery'));
    }
    isMetadataRequest(request) {
        return request.method === 'GET' &&
            (this.isMetadataDataPageQueryRequest(request) || /\/api\/rx\/application\/[a-zA-Z]+\/[a-zA-Z]+definition/.test(request.url));
    }
}
RxMetadataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxMetadataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxMetadataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=metadata.service.js.map