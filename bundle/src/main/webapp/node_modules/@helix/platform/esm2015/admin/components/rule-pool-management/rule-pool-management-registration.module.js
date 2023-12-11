import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptBusyModule, AdaptButtonModule, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxFormControlModule, AdaptRxLabelModule, AdaptRxSelectModule, AdaptTooltipModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxRulePipesModule } from '@helix/platform/rule/api';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RulePoolManagementAdminComponent } from './rule-pool-management.component';
import { RuleReassignmentComponent } from './rule-reassignment/rule-reassignment.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RulePoolManagementRegistrationModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-admin-rule-pool-management',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RulePoolManagementAdminComponent),
            name: 'Rule pool management',
            isPageComponent: true,
            availableInBundles: [RX_APPLICATION.settingsBundleId]
        });
    }
}
RulePoolManagementRegistrationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementRegistrationModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RulePoolManagementRegistrationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementRegistrationModule, declarations: [RuleReassignmentComponent, RulePoolManagementAdminComponent], imports: [AdaptBusyModule,
        AdaptButtonModule,
        AdaptEmptyStateModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptRxCheckboxModule,
        AdaptRxFormControlModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule,
        AdaptTableModule,
        AdaptTooltipModule,
        AdaptTreeModule,
        AdminSettingsModule,
        CommonModule,
        ReactiveFormsModule,
        RxRulePipesModule,
        TranslateModule] });
RulePoolManagementRegistrationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementRegistrationModule, imports: [[
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptEmptyStateModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptRxCheckboxModule,
            AdaptRxFormControlModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule,
            AdaptTableModule,
            AdaptTooltipModule,
            AdaptTreeModule,
            AdminSettingsModule,
            CommonModule,
            ReactiveFormsModule,
            RxRulePipesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RulePoolManagementRegistrationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RuleReassignmentComponent, RulePoolManagementAdminComponent],
                    imports: [
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptEmptyStateModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptRxCheckboxModule,
                        AdaptRxFormControlModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule,
                        AdaptTableModule,
                        AdaptTooltipModule,
                        AdaptTreeModule,
                        AdminSettingsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        RxRulePipesModule,
                        TranslateModule
                    ],
                    entryComponents: [RulePoolManagementAdminComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=rule-pool-management-registration.module.js.map