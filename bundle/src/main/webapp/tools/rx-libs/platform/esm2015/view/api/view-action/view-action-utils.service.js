import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RxStringService, RxUrlUtilsService } from '@helix/platform/utils';
import { RowDataItemIdFieldName } from '../common/record-grid.types';
import { clone, compact, flow, isFunction, isObject, map, some, uniq } from 'lodash';
import { RxBundleCacheService } from '@helix/platform/shared/api';
import { ViewDisplayType } from '../domain/view-display-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@angular/router";
import * as i3 from "@helix/platform/utils";
export class RxViewActionUtilsService {
    constructor(rxBundleCacheService, router, rxStringService, rxUrlUtilsService) {
        this.rxBundleCacheService = rxBundleCacheService;
        this.router = router;
        this.rxStringService = rxStringService;
        this.rxUrlUtilsService = rxUrlUtilsService;
    }
    generateViewUrl(viewDefinitionName, inputParams = {}) {
        const currentUrl = this.router.routerState.snapshot.url;
        let displayType = ViewDisplayType.Regular;
        if (currentUrl.includes(`/${ViewDisplayType.Preview}/`)) {
            displayType = ViewDisplayType.Preview;
        }
        else if (currentUrl.includes(`/${ViewDisplayType.NoShell}/`)) {
            displayType = ViewDisplayType.NoShell;
        }
        return this.rxUrlUtilsService.buildUrl(`/${this.rxBundleCacheService.bundleId}/${displayType}/${viewDefinitionName}`, inputParams);
    }
    extractRecordIds(source) {
        let ids = [];
        if (isFunction(source.getSelectedRows)) {
            ids = this.getIdsFromGridRows(source.getSelectedRows());
        }
        else if (isObject(source) && this.rxStringService.isNonEmptyString(source[RowDataItemIdFieldName])) {
            ids.push(source[RowDataItemIdFieldName]);
        }
        else if (Array.isArray(source) && some(source, isObject)) {
            ids = this.getIdsFromGridRows(source);
        }
        else if (this.rxStringService.isNonEmptyString(source)) {
            ids.push(source);
        }
        else if (Array.isArray(source) && some(source, this.rxStringService.isNonEmptyString)) {
            ids = clone(source);
        }
        return ids;
    }
    getIdsFromGridRows(rows) {
        return flow((rowsArray) => map(rowsArray, RowDataItemIdFieldName), compact, uniq)(rows);
    }
}
RxViewActionUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, deps: [{ token: i1.RxBundleCacheService }, { token: i2.Router }, { token: i3.RxStringService }, { token: i3.RxUrlUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxBundleCacheService }, { type: i2.Router }, { type: i3.RxStringService }, { type: i3.RxUrlUtilsService }]; } });
//# sourceMappingURL=view-action-utils.service.js.map