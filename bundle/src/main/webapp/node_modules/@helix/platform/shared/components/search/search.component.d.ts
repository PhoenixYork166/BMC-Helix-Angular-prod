import { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdaptLazyLoadEvent, ColumnConfig, DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { RxBundleCacheService, RxDataPageFactoryService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxShellService } from '@helix/platform/view/api';
import { TranslateService } from '@ngx-translate/core';
import { IRxSearchRecord } from './search-record.interface';
import * as i0 from "@angular/core";
interface ISearchResult {
    createDate: string;
    modifyDate: string;
    recordDefinitionName: string;
    recordInstanceDisplayId: string;
    recordInstanceId: string;
    title: string;
    weight: number;
    wordsAroundHit: string;
}
export declare class RxSearchComponent implements OnDestroy, OnInit {
    private activatedRoute;
    private router;
    private rxDataPageService;
    private rxShellService;
    private rxPageTitleService;
    private translateService;
    rxBundleCacheService: RxBundleCacheService;
    colIdCellTemplate: TemplateRef<DataCellTemplateParams>;
    cellTemplate: TemplateRef<DataCellTemplateParams>;
    private pageSize;
    private subscription;
    loading: boolean;
    loadingMore: boolean;
    startIndex: number;
    totalSize: number;
    columns: ColumnConfig[];
    globalSearchRecords: IRxSearchRecord[];
    recordDefinitionsByName: {
        [recordDefinitioName: string]: IRxSearchRecord;
    };
    searchResults: ISearchResult[];
    searchString: string;
    constructor(activatedRoute: ActivatedRoute, router: Router, rxDataPageService: RxDataPageFactoryService, rxShellService: RxShellService, rxPageTitleService: RxPageTitleService, translateService: TranslateService, rxBundleCacheService: RxBundleCacheService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    get searchValue(): string;
    getGlobalSearchResults(infiniteScroll?: boolean): void;
    private resetSearchResults;
    search(): void;
    onFiltersChanged(): void;
    onLazyLoad(event: AdaptLazyLoadEvent): void;
    selectAllRecords(): void;
    unSelectAllRecords(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxSearchComponent, "rx-search", never, {}, {}, never, never>;
}
export {};
