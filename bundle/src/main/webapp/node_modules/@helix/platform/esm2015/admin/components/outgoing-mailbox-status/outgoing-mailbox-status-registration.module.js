import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptIconModule, AdaptPopoverModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RecordGridModule } from '@helix/platform/view/components';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { OutgoingMailboxStatusAdminComponent } from './outgoing-mailbox-status.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class OutgoingMailboxStatusRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-outgoing-mailbox-status',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(OutgoingMailboxStatusAdminComponent),
            name: 'Outgoing mailbox status',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
OutgoingMailboxStatusRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
OutgoingMailboxStatusRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusRegistrationModule, declarations: [OutgoingMailboxStatusAdminComponent], imports: [CommonModule,
        AdminSettingsModule,
        RecordGridModule,
        AdaptRxSelectModule,
        FormsModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptButtonModule,
        TranslateModule] });
OutgoingMailboxStatusRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusRegistrationModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            RecordGridModule,
            AdaptRxSelectModule,
            FormsModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptButtonModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OutgoingMailboxStatusRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [OutgoingMailboxStatusAdminComponent],
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        AdaptRxSelectModule,
                        FormsModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptButtonModule,
                        TranslateModule
                    ],
                    entryComponents: [OutgoingMailboxStatusAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=outgoing-mailbox-status-registration.module.js.map