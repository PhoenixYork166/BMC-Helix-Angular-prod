import { OnInit, TemplateRef } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { AdaptDockedPanelService } from '@bmc-ux/adapt-angular';
import { DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { ISearchFilter } from './search-filter.interface';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { Observable } from 'rxjs';
import { RxSearchFiltersService } from './search-filters.service';
import { IRowDataItem } from '@helix/platform/view/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxSearchFiltersComponent extends BaseViewComponent implements OnInit {
    private rxModalService;
    private rxNotificationService;
    private adaptDockedPanelService;
    private rxSearchFiltersService;
    private translateService;
    constructor(rxModalService: RxModalService, rxNotificationService: RxNotificationService, adaptDockedPanelService: AdaptDockedPanelService, rxSearchFiltersService: RxSearchFiltersService, translateService: TranslateService);
    grid: RecordGridComponent;
    tagsTemplate: TemplateRef<DataCellTemplateParams>;
    recordGridConfig$: Observable<IRecordGridConfig>;
    searchFilters: ISearchFilter[];
    ngOnInit(): void;
    private initializeRecordGrid;
    private deleteSearchFilters;
    openEditor(data?: IRowDataItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSearchFiltersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxSearchFiltersComponent, "rx-search-filters", never, {}, {}, never, never>;
}
