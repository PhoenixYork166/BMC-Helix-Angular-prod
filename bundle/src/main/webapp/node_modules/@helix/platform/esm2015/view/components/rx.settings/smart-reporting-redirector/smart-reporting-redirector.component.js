import { Component, Input } from '@angular/core';
import { RuntimeViewModelApi } from '@helix/platform/view/runtime';
import { RxSmartReportingService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
export class SmartReportingRedirectorComponent {
    constructor(rxSmartReportingService) {
        this.rxSmartReportingService = rxSmartReportingService;
    }
    ngOnInit() {
        this.rxSmartReportingService
            .openSmartReporting('_self', {
            query: this.runtimeViewModelApi.getViewInputParameters().param
        })
            .subscribe();
    }
}
SmartReportingRedirectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorComponent, deps: [{ token: i1.RxSmartReportingService }], target: i0.ɵɵFactoryTarget.Component });
SmartReportingRedirectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SmartReportingRedirectorComponent, selector: "rx-smart-reporting-redirector", inputs: { runtimeViewModelApi: "runtimeViewModelApi" }, ngImport: i0, template: "<div class=\"p-3\">{{ 'com.bmc.arsys.rx.client.smart-reporting-redirector.message' | translate }}</div>\n", pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-smart-reporting-redirector',
                    templateUrl: './smart-reporting-redirector.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSmartReportingService }]; }, propDecorators: { runtimeViewModelApi: [{
                type: Input
            }] } });
//# sourceMappingURL=smart-reporting-redirector.component.js.map