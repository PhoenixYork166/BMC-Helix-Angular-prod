import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptRxSelectModule, AdaptRxTextareaModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RealTimeTranslationAdminComponent } from './real-time-translation.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RealTimeTranslationRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-real-time-translation',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RealTimeTranslationAdminComponent),
            name: 'Real time translation',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
RealTimeTranslationRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RealTimeTranslationRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationRegistrationModule, declarations: [RealTimeTranslationAdminComponent], imports: [AdminSettingsModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        AdaptRxSelectModule,
        AdaptRxTextareaModule,
        AdaptButtonModule,
        TranslateModule] });
RealTimeTranslationRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationRegistrationModule, imports: [[
            AdminSettingsModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            AdaptRxSelectModule,
            AdaptRxTextareaModule,
            AdaptButtonModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RealTimeTranslationRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RealTimeTranslationAdminComponent],
                    imports: [
                        AdminSettingsModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        AdaptRxSelectModule,
                        AdaptRxTextareaModule,
                        AdaptButtonModule,
                        TranslateModule
                    ],
                    entryComponents: [RealTimeTranslationAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=real-time-translation-registration.module.js.map