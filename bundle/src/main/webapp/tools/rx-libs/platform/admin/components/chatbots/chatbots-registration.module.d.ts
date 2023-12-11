import { ComponentFactoryResolver } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "./chatbots.component";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/view/components";
import * as i7 from "@helix/platform/shared/api";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "@ngx-translate/core";
export declare class ChatbotsRegistrationModule {
    private componentFactoryResolver;
    private rxViewComponentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, rxViewComponentRegistryService: RxViewComponentRegistryService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatbotsRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChatbotsRegistrationModule, [typeof i1.ChatbotsAdminComponent], [typeof i2.AdaptAccordionModule, typeof i2.AdaptButtonModule, typeof i2.AdaptIconModule, typeof i2.AdaptRxSwitchModule, typeof i3.AdminSettingsModule, typeof i4.CommonModule, typeof i5.FormsModule, typeof i6.RecordGridModule, typeof i3.RenameDefinitionModalModule, typeof i7.RxDefinitionModule, typeof i8.RxDirectivesModule, typeof i9.TranslateModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChatbotsRegistrationModule>;
}
