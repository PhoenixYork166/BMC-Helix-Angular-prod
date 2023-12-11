import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { SummarizationServiceAdminComponent } from './summarization-service.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RxConnectionTesterModule } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class SummarizationServiceRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-summarization-service',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(SummarizationServiceAdminComponent),
            name: 'Summarization service',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
SummarizationServiceRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
SummarizationServiceRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceRegistrationModule, declarations: [SummarizationServiceAdminComponent], imports: [CommonModule,
        AdminSettingsModule,
        TranslateModule,
        AdaptRxTextfieldModule,
        ReactiveFormsModule,
        RxConnectionTesterModule,
        AdaptButtonModule] });
SummarizationServiceRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceRegistrationModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            TranslateModule,
            AdaptRxTextfieldModule,
            ReactiveFormsModule,
            RxConnectionTesterModule,
            AdaptButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SummarizationServiceAdminComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        TranslateModule,
                        AdaptRxTextfieldModule,
                        ReactiveFormsModule,
                        RxConnectionTesterModule,
                        AdaptButtonModule
                    ],
                    entryComponents: [SummarizationServiceAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=summarization-service-registration.module.js.map