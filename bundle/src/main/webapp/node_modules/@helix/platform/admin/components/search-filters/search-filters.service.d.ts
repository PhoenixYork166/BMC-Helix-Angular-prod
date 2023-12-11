import { HttpClient } from '@angular/common/http';
import { IDataPageResult } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { ISearchFilter } from './search-filter.interface';
import * as i0 from "@angular/core";
export declare class RxSearchFiltersService {
    private httpClient;
    constructor(httpClient: HttpClient);
    private readonly apiPath;
    getSearchFilters(): Observable<IDataPageResult<ISearchFilter>>;
    deleteSearchFilters(ids: string[]): Observable<any>;
    createSearchFilter(filter: ISearchFilter): Observable<any>;
    updateSearchFilter(filter: ISearchFilter): Observable<ISearchFilter>;
    getTags(): Observable<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSearchFiltersService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSearchFiltersService>;
}
