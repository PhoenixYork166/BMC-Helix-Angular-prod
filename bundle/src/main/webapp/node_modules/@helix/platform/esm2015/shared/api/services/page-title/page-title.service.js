import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { isString, isUndefined } from 'lodash';
import { take } from 'rxjs/operators';
import { RxBundleCacheService } from '../../caching/bundle-cache.service';
import { RxGlobalCacheService } from '../../caching/global-cache.service';
import { RxLogService } from '../../logging/log.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "../../caching/bundle-cache.service";
import * as i3 from "../../caching/global-cache.service";
import * as i4 from "../../logging/log.service";
const TITLE_SEPARATOR = ' - ';
export class RxPageTitleService {
    constructor(title, rxBundleCacheService, rxGlobalCacheService, rxLogService) {
        this.title = title;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxLogService = rxLogService;
    }
    set(title, bundleId) {
        let currentPageTitle = '';
        if (Array.isArray(title)) {
            currentPageTitle = title
                .reduce((result, part) => {
                if (isString(part) && (part = part.trim())) {
                    result.push(part);
                }
                return result;
            }, [])
                .join(TITLE_SEPARATOR);
        }
        else if (isString(title)) {
            currentPageTitle = title.trim();
        }
        else if (!isUndefined(title)) {
            this.rxLogService.warning('Invalid page title: ' + title);
        }
        const currentBundleId = bundleId || this.rxBundleCacheService.bundleId;
        if (bundleId !== '' && currentBundleId) {
            this.rxGlobalCacheService
                .getBundleDisplayName(currentBundleId)
                .pipe(take(1))
                .subscribe((bundleDisplayName) => {
                this.title.setTitle([currentPageTitle, bundleDisplayName].filter(Boolean).join(TITLE_SEPARATOR));
            });
        }
        else {
            this.title.setTitle(currentPageTitle);
        }
    }
}
RxPageTitleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, deps: [{ token: i1.Title }, { token: i2.RxBundleCacheService }, { token: i3.RxGlobalCacheService }, { token: i4.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxPageTitleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPageTitleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Title }, { type: i2.RxBundleCacheService }, { type: i3.RxGlobalCacheService }, { type: i4.RxLogService }]; } });
//# sourceMappingURL=page-title.service.js.map