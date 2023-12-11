import { Observable } from 'rxjs';
import { RxLogService } from '@helix/platform/shared/api';
import { RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxNamedListDataPageService } from './named-list-data-page.service';
import { INamedListOption, INamedListOptionPage, NamedListTypeAheadOption } from './named-list.types';
import { INamedListDefinition } from './named-list-definition.types';
import * as i0 from "@angular/core";
export declare class RxNamedListService {
    private rxNamedListDataPageService;
    private rxRecordInstanceUtilsService;
    private rxLogService;
    constructor(rxNamedListDataPageService: RxNamedListDataPageService, rxRecordInstanceUtilsService: RxRecordInstanceUtilsService, rxLogService: RxLogService);
    getOptionPage(namedListDefinition: INamedListDefinition, searchQuery: string, queryCriteria?: string, startIndex?: number, pageSize?: number): Observable<INamedListOptionPage>;
    getOptionPageByLabelOrValue(namedListDefinition: INamedListDefinition, searchQuery: string, queryCriteria?: string, startIndex?: number, pageSize?: number): Observable<INamedListOptionPage>;
    private getOptionPageByFieldIds;
    getOptionsForValues(namedListDefinition: INamedListDefinition, optionValues: string[]): Observable<INamedListOption[]>;
    isNamedListOption(namedListTypeAheadOption: NamedListTypeAheadOption): boolean;
    getNamesFromTypeAheadOptions(namedListTypeAheadOptions: NamedListTypeAheadOption[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxNamedListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxNamedListService>;
}
