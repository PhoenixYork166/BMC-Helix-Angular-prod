import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { Observable } from 'rxjs';
import { RxSelectionChangeEvent, RxSelectOption, RxSelectOptionsGroup } from '@bmc-ux/adapt-angular';
import { IServiceListProperties } from '../service-list.types';
import * as i0 from "@angular/core";
export declare class ServiceListComponent extends BaseViewComponent implements OnInit {
    private httpClient;
    config: Observable<IServiceListProperties>;
    isDisabled: boolean;
    serviceListOptions: RxSelectOptionsGroup[];
    service: RxSelectOption;
    constructor(httpClient: HttpClient);
    ngOnInit(): void;
    private selectServiceRequest;
    onSelectionChange(event: RxSelectionChangeEvent): void;
    optionFormatter(option: RxSelectOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServiceListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ServiceListComponent, "rx-service-list", never, { "config": "config"; }, {}, never, never>;
}
