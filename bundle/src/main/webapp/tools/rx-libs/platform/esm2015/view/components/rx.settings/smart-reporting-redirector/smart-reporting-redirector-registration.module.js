import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SmartReportingRedirectorComponent } from './smart-reporting-redirector.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SmartReportingRedirectorRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-smart-reporting-redirector',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SmartReportingRedirectorComponent),
            name: 'Smart reporting redirector',
            isPageComponent: true,
            hidden: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
SmartReportingRedirectorRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
SmartReportingRedirectorRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorRegistrationModule, declarations: [SmartReportingRedirectorComponent], imports: [TranslateModule] });
SmartReportingRedirectorRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorRegistrationModule, imports: [[TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SmartReportingRedirectorRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SmartReportingRedirectorComponent],
                    imports: [TranslateModule],
                    entryComponents: [SmartReportingRedirectorComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=smart-reporting-redirector-registration.module.js.map