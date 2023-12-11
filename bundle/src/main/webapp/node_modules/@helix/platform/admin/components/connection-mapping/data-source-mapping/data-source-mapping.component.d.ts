import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class DataSourceMappingAdminComponent implements OnInit {
    private rxRecordInstanceDataPageService;
    applicationSelectOptions: RxSelectOption[];
    selectedApplication: RxSelectOption;
    applicationMappingList: IPlainObject[];
    configurationList: IPlainObject[];
    busy: Subscription;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService);
    ngOnInit(): void;
    optionFormatter(application: RxSelectOption): string;
    private getRecordInstanceDataPage;
    onApplicationChange(selectedApplication: RxSelectOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceMappingAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceMappingAdminComponent, "rx-admin-data-source-mapping", never, {}, {}, never, never>;
}
