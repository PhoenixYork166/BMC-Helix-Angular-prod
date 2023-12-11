import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceService, RxRecordInstanceUpdateService } from '@helix/platform/record/api';
import { IPlainObject, RxNotificationService } from '@helix/platform/shared/api';
import { AliasType } from './connection-mapping.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ConnectionMappingComponent implements OnInit {
    private rxNotificationService;
    private rxRecordInstanceService;
    private rxRecordInstanceUpdateService;
    private translateService;
    configurations: IPlainObject;
    aliasMapping: IPlainObject;
    aliasType: AliasType;
    aliasNameId: number;
    connectionConfiguration: RxSelectOption;
    constructor(rxNotificationService: RxNotificationService, rxRecordInstanceService: RxRecordInstanceService, rxRecordInstanceUpdateService: RxRecordInstanceUpdateService, translateService: TranslateService);
    ngOnInit(): void;
    optionFormatter(configurationOption: RxSelectOption): string;
    onConnectionConfigurationChange(configuration: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectionMappingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConnectionMappingComponent, "rx-connection-mapping", never, { "configurations": "configurations"; "aliasMapping": "aliasMapping"; "aliasType": "aliasType"; }, {}, never, never>;
}
