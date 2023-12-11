import { Injectable } from '@angular/core';
import { SortOrder } from '@bmc-ux/adapt-table';
import { RxJsonParserService } from '@helix/platform/utils';
import { assign, cloneDeep, includes, isBoolean, isObject, isString, map, omit } from 'lodash';
import { ColumnSortDirection } from '../../common/types/record-grid.types';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class RxRecordGridConfigUtilsService {
    constructor(rxJsonParserService) {
        this.rxJsonParserService = rxJsonParserService;
    }
    parseConfigString(str) {
        if (!str) {
            return false;
        }
        if (includes(['1', 'true'], str)) {
            return true;
        }
        if (includes(['0', 'false'], str)) {
            return false;
        }
        if (isString(str)) {
            return this.rxJsonParserService.tryParseJson(str, false);
        }
        if (isObject(str)) {
            return str;
        }
        return isBoolean(str) ? str : false;
    }
    getBooleanValue(str) {
        return this.parseConfigString(str);
    }
    getColumnSortOrder(direction) {
        return direction === ColumnSortDirection.Asc ? SortOrder.Asc : SortOrder.Desc;
    }
    getColumnSortDirection(sortOrder) {
        return sortOrder === SortOrder.Asc ? ColumnSortDirection.Asc : ColumnSortDirection.Desc;
    }
    configDeepClone(configuration) {
        const configClone = cloneDeep(omit(configuration, ['columns']));
        const columns = this.columnsDeepClone(configuration.columns);
        return assign(configClone, { columns });
    }
    columnsDeepClone(columns) {
        return map(columns, this.columnDeepClone);
    }
    columnDeepClone(column) {
        const columnClone = cloneDeep(omit(column, ['cellTemplate']));
        return assign(columnClone, { cellTemplate: column.cellTemplate });
    }
}
RxRecordGridConfigUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfigUtilsService, deps: [{ token: i1.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridConfigUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfigUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridConfigUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }]; } });
//# sourceMappingURL=record-grid-config-utils.service.js.map