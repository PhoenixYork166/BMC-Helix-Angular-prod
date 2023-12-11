import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxLogService } from '@helix/platform/shared/api';
import BigNumber from 'bignumber.js';
import { get, isEqual, map as _map, toNumber, transform } from 'lodash';
import { of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RX_RECORD_DEFINITION } from './record-definition.constant';
import { RxRecordInstanceDataPageService } from './record-instance-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "./record-instance-data-page.service";
import * as i2 from "@helix/platform/shared/api";
export class RxRecordInstanceUtilsService {
    constructor(rxRecordInstanceDataPageService, rxLogService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxLogService = rxLogService;
        this.displayFieldsCache = {};
    }
    convertFromDataPageRowToPlainRecordInstance(dataPageRow) {
        return {
            id: dataPageRow[RX_RECORD_DEFINITION.coreFieldIds.id],
            fieldInstances: transform(dataPageRow, (result, value, key) => {
                result[key] = {
                    id: toNumber(key),
                    value: value
                };
            }, {})
        };
    }
    escapeTextWildcards(value) {
        // escape double quotes with double quotes, e.g. replace "textInQuotes" with ""textInQuotes""
        // escape wildcards with backslash, e.g. replace `search%And_` with `search\%And\_`
        return value.replace(/"/g, '""').replace(/[%_]/g, '\\$&');
    }
    isFieldValueEqual(value, other) {
        if (value instanceof BigNumber || other instanceof BigNumber) {
            return new BigNumber(value).eq(new BigNumber(other));
        }
        else {
            return isEqual(value, other);
        }
    }
    isNoRecordFoundError(error) {
        return error instanceof HttpErrorResponse && get(error, 'error[0].messageNumber') === 302;
    }
    getFieldValues(recordDefinitionName, recordInstanceIds, fieldIds) {
        const queryExpression = _map(recordInstanceIds, (recordInstanceId) => `'${RX_RECORD_DEFINITION.coreFieldIds.id}'="${recordInstanceId}"`).join(' OR ');
        const params = {
            recorddefinition: recordDefinitionName,
            propertySelection: fieldIds.join(','),
            queryExpression,
            pageSize: -1,
            startIndex: 0
        };
        const serializedParams = JSON.stringify(params);
        if (this.displayFieldsCache[serializedParams]) {
            return of(this.displayFieldsCache[serializedParams]);
        }
        return this.rxRecordInstanceDataPageService.post({ params }).pipe(shareReplay(1), map((result) => {
            this.displayFieldsCache[serializedParams] = result.data;
            return result.data;
        }));
    }
    // This method parses content-disposition header and returns decoded file name, for example:
    // 'attachment; filename*=UTF-8\'\'foo+bar.jpg' will become 'foo bar.jpg'
    // Additional notes:
    // 1. returns empty string if failed to parse content-disposition
    // 2. '+'  symbols will be replaced with '%20' which will then be evaluated to spaces after decoding
    tryParseContentDisposition(contentDisposition) {
        try {
            let fileName = contentDisposition.match(/(?:attachment; filename\*=UTF-8'')(.*)/)[1];
            fileName = fileName.replace(/\+/g, '%20');
            return decodeURIComponent(fileName);
        }
        catch (e) {
            this.rxLogService.warning(`Cannot parse content-disposition response header: ${contentDisposition}`);
            return '';
        }
    }
}
RxRecordInstanceUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, deps: [{ token: i1.RxRecordInstanceDataPageService }, { token: i2.RxLogService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordInstanceUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordInstanceUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }, { type: i2.RxLogService }]; } });
//# sourceMappingURL=record-instance-utils.service.js.map