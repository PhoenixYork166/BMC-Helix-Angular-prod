import { IPlainObject } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { IRxRecordGridFilter } from '../types/record-grid-filter.types';
import { IRecordGridFilterData } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxRecordGridFilterHelperService {
    private rxJsonParserService;
    filtersKeywords: string[];
    constructor(rxJsonParserService: RxJsonParserService);
    getRecordGridFilterDataFromPredefinedFilter(filterJson: string, recordGridFilters: IRxRecordGridFilter[]): IRecordGridFilterData;
    normalizeFilterString(filterString: string, filterComponents: IRxRecordGridFilter[]): string;
    denormalizeFilterString(filterString: string, filterComponents: IRxRecordGridFilter[]): string;
    private replacer;
    private denormalize;
    clearFilterData(node: IPlainObject): IPlainObject;
    replaceKeywords(query: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordGridFilterHelperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordGridFilterHelperService>;
}
