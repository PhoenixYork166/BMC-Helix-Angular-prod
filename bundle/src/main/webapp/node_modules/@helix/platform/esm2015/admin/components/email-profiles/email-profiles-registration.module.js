import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailProfilesAdminComponent } from './email-profiles.component';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { CreateEmailProfileComponent } from './create-email-profile/create-email-profile.component';
import { AdaptButtonModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class EmailProfilesRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-email-profiles',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(EmailProfilesAdminComponent),
            name: 'Email profiles',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
EmailProfilesRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
EmailProfilesRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesRegistrationModule, declarations: [EmailProfilesAdminComponent, CreateEmailProfileComponent], imports: [AdminSettingsModule,
        CommonModule,
        RecordGridModule,
        AdaptRxTextfieldModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        TranslateModule] });
EmailProfilesRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesRegistrationModule, imports: [[
            AdminSettingsModule,
            CommonModule,
            RecordGridModule,
            AdaptRxTextfieldModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [EmailProfilesAdminComponent, CreateEmailProfileComponent],
                    imports: [
                        AdminSettingsModule,
                        CommonModule,
                        RecordGridModule,
                        AdaptRxTextfieldModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        TranslateModule
                    ],
                    entryComponents: [EmailProfilesAdminComponent, CreateEmailProfileComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=email-profiles-registration.module.js.map