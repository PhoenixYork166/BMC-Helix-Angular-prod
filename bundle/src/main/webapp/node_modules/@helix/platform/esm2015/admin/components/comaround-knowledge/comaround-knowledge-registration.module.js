import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComaroundKnowledgeAdminComponent } from './comaround-knowledge.component';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptButtonModule, AdaptRxSelectModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RxConnectionTesterModule, RxDirectivesModule } from '@helix/platform/ui-kit';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class ComaroundKnowledgeRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-comaround-knowledge',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(ComaroundKnowledgeAdminComponent),
            name: 'ComAround knowledge',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
ComaroundKnowledgeRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
ComaroundKnowledgeRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeRegistrationModule, declarations: [ComaroundKnowledgeAdminComponent], imports: [AdaptButtonModule,
        AdaptRxTextfieldModule,
        AdaptRxSelectModule,
        AdaptAlertModule,
        AdaptAccordionModule,
        AdminSettingsModule,
        CommonModule,
        ReactiveFormsModule,
        RxConnectionTesterModule,
        RxDirectivesModule,
        TranslateModule] });
ComaroundKnowledgeRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeRegistrationModule, imports: [[
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            AdaptRxSelectModule,
            AdaptAlertModule,
            AdaptAccordionModule,
            AdminSettingsModule,
            CommonModule,
            ReactiveFormsModule,
            RxConnectionTesterModule,
            RxDirectivesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ComaroundKnowledgeRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ComaroundKnowledgeAdminComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        AdaptRxSelectModule,
                        AdaptAlertModule,
                        AdaptAccordionModule,
                        AdminSettingsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        RxConnectionTesterModule,
                        RxDirectivesModule,
                        TranslateModule
                    ],
                    entryComponents: [ComaroundKnowledgeAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=comaround-knowledge-registration.module.js.map