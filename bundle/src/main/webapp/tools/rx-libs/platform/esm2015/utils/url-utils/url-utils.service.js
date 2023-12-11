import { Injectable, SecurityContext } from '@angular/core';
import { get, map } from 'lodash';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/platform-browser";
export class RxUrlUtilsService {
    constructor(router, domSanitizer) {
        this.router = router;
        this.domSanitizer = domSanitizer;
    }
    buildUrl(baseUrl, ...queryParams) {
        let url = baseUrl;
        const queryString = this.toQueryString(...queryParams);
        if (queryString) {
            url += '?' + queryString;
        }
        return url;
    }
    isValidUrl(url, isProtocolRequired = true) {
        const regExp = isProtocolRequired
            ? /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
            : /^((https?|ftp):\/\/)?[^\s/$.?#].[^\s]*$/;
        return regExp.test(url);
    }
    toQueryString(...queryParams) {
        return map(queryParams, (params) => map(params, (value, key) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')).join('&');
    }
    getBundleIdFromUrl(url) {
        return get(this.router.parseUrl(url !== null && url !== void 0 ? url : window.location.hash.substring(1)), 'root.children.primary.segments[0].path');
    }
    isUrlSafe(url) {
        const sanitizedUrl = this.domSanitizer.sanitize(SecurityContext.URL, url);
        return url === sanitizedUrl;
    }
}
RxUrlUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, deps: [{ token: i1.Router }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
RxUrlUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUrlUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.DomSanitizer }]; } });
//# sourceMappingURL=url-utils.service.js.map