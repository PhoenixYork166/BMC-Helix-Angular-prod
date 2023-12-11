import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ConnectorMappingAdminComponent implements OnInit {
    private rxRecordInstanceDataPageService;
    private translateService;
    mappingSelectOptions: RxSelectOption[];
    selectedMapping: RxSelectOption;
    mappingList: IPlainObject[];
    configurationList: IPlainObject[];
    busy: Subscription;
    constructor(rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, translateService: TranslateService);
    ngOnInit(): void;
    optionFormatter(application: RxSelectOption): string;
    private getRecordInstanceDataPage;
    onApplicationChange(selectedApplication: RxSelectOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectorMappingAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConnectorMappingAdminComponent, "rx-connector-mapping", never, {}, {}, never, never>;
}
