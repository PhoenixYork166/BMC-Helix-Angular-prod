import { Injectable } from '@angular/core';
import { toNumber } from 'lodash';
import * as i0 from "@angular/core";
export class RxRecordGridFilterSelectHelperService {
    getNamedFilterOptionsFromColumns(columns) {
        return columns.reduce((result, col) => {
            var _a;
            if ((_a = col.namedFilterOptions) === null || _a === void 0 ? void 0 : _a.length) {
                result[col.fieldId] = col.namedFilterOptions
                    .map((column) => (Object.assign(Object.assign({ guid: column.guid }, column.data), { index: toNumber(column.data.index) })))
                    .sort((a, b) => a.index - b.index);
            }
            return result;
        }, {});
    }
}
RxRecordGridFilterSelectHelperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterSelectHelperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridFilterSelectHelperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterSelectHelperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridFilterSelectHelperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=record-grid-filter-select-helper.service.js.map