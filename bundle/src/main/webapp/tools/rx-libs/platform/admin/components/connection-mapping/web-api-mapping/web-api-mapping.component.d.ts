import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { IPlainObject, RxGlobalCacheService } from '@helix/platform/shared/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WebApiMappingAdminComponent implements OnInit {
    private rxGlobalCacheService;
    private rxRecordInstanceDataPageService;
    mappingSelectOptions: RxSelectOption[];
    selectedMapping: RxSelectOption;
    mappingList: IPlainObject[];
    configurationList: IPlainObject[];
    busy: Subscription;
    constructor(rxGlobalCacheService: RxGlobalCacheService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    ngOnInit(): void;
    optionFormatter(application: RxSelectOption): string;
    private getRecordInstanceDataPage;
    onApplicationChange(selectedApplication: RxSelectOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebApiMappingAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebApiMappingAdminComponent, "rx-web-api-mapping", never, {}, {}, never, never>;
}
