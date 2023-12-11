import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { SortOrder } from '@bmc-ux/adapt-table';
import { BooleanLike } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { IRecordGridColumn } from '../types/record-grid-column.types';
import { IRecordGridConfig } from '../types/record-grid-config.interface';
import { ColumnSortDirection } from '../../common/types/record-grid.types';
import * as i0 from "@angular/core";
export declare class RxRecordGridConfigUtilsService {
    private rxJsonParserService;
    constructor(rxJsonParserService: RxJsonParserService);
    parseConfigString(str: BooleanLike | KeyValueObject | string): boolean | KeyValueObject;
    getBooleanValue(str: BooleanLike): boolean;
    getColumnSortOrder(direction: ColumnSortDirection): SortOrder;
    getColumnSortDirection(sortOrder: SortOrder): ColumnSortDirection;
    configDeepClone(configuration: IRecordGridConfig): IRecordGridConfig;
    columnsDeepClone(columns: IRecordGridColumn[]): IRecordGridColumn[];
    private columnDeepClone;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridConfigUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridConfigUtilsService>;
}
