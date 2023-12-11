import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./outgoing-mailbox-status.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@helix/platform/view/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/forms";
import * as i7 from "@ngx-translate/core";
export declare class OutgoingMailboxStatusRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OutgoingMailboxStatusRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OutgoingMailboxStatusRegistrationModule, [typeof i1.OutgoingMailboxStatusAdminComponent], [typeof i2.CommonModule, typeof i3.AdminSettingsModule, typeof i4.RecordGridModule, typeof i5.AdaptRxSelectModule, typeof i6.FormsModule, typeof i5.AdaptIconModule, typeof i5.AdaptPopoverModule, typeof i5.AdaptButtonModule, typeof i7.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OutgoingMailboxStatusRegistrationModule>;
}
