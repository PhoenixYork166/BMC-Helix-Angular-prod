import { OnInit } from '@angular/core';
import { RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { RxSmartReportingService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class SmartReportingRedirectorComponent implements OnInit {
    private rxSmartReportingService;
    runtimeViewModelApi: RuntimeViewModelApi;
    constructor(rxSmartReportingService: RxSmartReportingService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartReportingRedirectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SmartReportingRedirectorComponent, "rx-smart-reporting-redirector", never, { "runtimeViewModelApi": "runtimeViewModelApi"; }, {}, never, never>;
}
