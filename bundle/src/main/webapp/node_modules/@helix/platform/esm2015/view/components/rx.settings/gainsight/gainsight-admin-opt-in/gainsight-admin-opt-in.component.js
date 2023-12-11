import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RX_APPLICATION, RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RX_GAINSIGHT, RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { map, take, shareReplay, switchMap, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class GainsightAdminOptInComponent extends BaseViewComponent {
    constructor(translateService, rxNotificationService, rxGainsightConfiguratorService) {
        super();
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.deploymentTypeOptions = RX_GAINSIGHT.deploymentTypes;
        this.environmentTypeOptions = RX_GAINSIGHT.environmentTypes;
        this.vm$ = this.rxGainsightConfiguratorService.getGainsightConfiguration(RX_APPLICATION.innovationStudioBundleId).pipe(take(1), filter((config) => Boolean(config)), map((config) => config.settings), map((settings) => ({
            deploymentTypeOptions: this.deploymentTypeOptions.filter((deploymentType) => deploymentType.name === settings.deploymentType),
            environmentTypeOptions: [settings.environmentType],
            useAdaptRadar: settings.useAdaptRadar,
            loadGainsightFromBmcIt: settings.loadGainsightFromBmcIt,
            adaptAgreementState: {
                organizationPerformance: settings.enableGainsight,
                accountMarketing: false,
                accountPerformance: false,
                organizationMarketing: false
            }
        })), shareReplay(1));
    }
    optionFormatter(deploymentType) {
        return deploymentType.name;
    }
    save() {
        this.vm$
            .pipe(take(1), map((vm) => (Object.assign(Object.assign({}, vm), { deploymentType: vm.deploymentTypeOptions[0].id, environmentType: vm.environmentTypeOptions[0], enableGainsight: vm.adaptAgreementState.organizationPerformance }))), switchMap((gainsightSettings) => this.rxGainsightConfiguratorService.saveGainsightConfiguration(gainsightSettings)))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.gainsight-settings-saved.success.message'));
        });
    }
}
GainsightAdminOptInComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxNotificationService }, { token: i3.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
GainsightAdminOptInComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GainsightAdminOptInComponent, selector: "rx-gainsight-admin-opt-in", usesInheritance: true, ngImport: i0, template: "<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm; else emptyStateTemplate\">\n  <div class=\"mt-1 container\">\n    <h1>\n      <span class=\"text-logo\">{{ 'com.bmc.arsys.rx.client.gainsight.gainsight-settings.title' | translate }}</span>\n    </h1>\n\n    <div>\n      <adapt-agreement-card\n        [showOrganizationSettings]=\"true\"\n        [showMarketingSection]=\"false\"\n        [multiProductUsage]=\"false\"\n        [showShadow]=\"false\"\n        rx-id=\"enable-gainsight\"\n        [(state)]=\"vm.adaptAgreementState\"\n      >\n      </adapt-agreement-card>\n    </div>\n\n    <div class=\"pt-4 pl-0 col-md-4\" [hidden]=\"true\">\n      <adapt-rx-switch\n        [isLabelBefore]=\"true\"\n        [size]=\"'lg'\"\n        label=\"Use ADAPT Radar\"\n        [(ngModel)]=\"vm.useAdaptRadar\"\n        name=\"useAdaptRadar\"\n        rx-id=\"use-adapt-radar\"\n      ></adapt-rx-switch>\n    </div>\n\n    <div class=\"pt-4 pl-0 col-md-4\">\n      <adapt-rx-switch\n        [isLabelBefore]=\"true\"\n        [size]=\"'lg'\"\n        label=\"{{\n          'com.bmc.arsys.rx.client.gainsight.gainsight-settings.load-gainsight-script-from-bmc-it.label' | translate\n        }}\"\n        [(ngModel)]=\"vm.loadGainsightFromBmcIt\"\n        name=\"loadGainsightFromBmcIt\"\n        rx-id=\"load-gainsight-from-bmc\"\n      ></adapt-rx-switch>\n    </div>\n\n    <adapt-rx-select\n      class=\"col-md-3 pt-4 pl-0\"\n      label=\"{{ 'com.bmc.arsys.rx.client.gainsight.gainsight-settings.deployment-type.label' | translate }}\"\n      [options]=\"deploymentTypeOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      [(ngModel)]=\"vm.deploymentTypeOptions\"\n      name=\"deploymentType\"\n      rx-id=\"deployment-type\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"col-md-3 pt-4 pl-0\"\n      label=\"{{ 'com.bmc.arsys.rx.client.gainsight.gainsight-settings.environment-type.label' | translate }}\"\n      [options]=\"environmentTypeOptions\"\n      [(ngModel)]=\"vm.environmentTypeOptions\"\n      name=\"environmentType\"\n      rx-id=\"environment-type\"\n    >\n    </adapt-rx-select>\n\n    <div class=\"modal-footer mt-4\">\n      <button rx-id=\"save-button\" adapt-button btn-type=\"primary\" type=\"button\" (click)=\"save()\" rx-id=\"save-button\">\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #emptyStateTemplate>\n  <div class=\"d-flex align-items-center justify-content-center h-100\">\n    <adapt-empty-state\n      class=\"w-100\"\n      label=\"{{ 'com.bmc.arsys.rx.client.gainsight.feature-is-disabled.label' | translate }}\"\n      type=\"config\"\n    ></adapt-empty-state>\n  </div>\n</ng-template>\n", styles: [":host ::ng-deep adapt-agreement-card adapt-agreement-admin-content div:nth-of-type(2)>adapt-rx-switch,:host ::ng-deep adapt-agreement-card adapt-agreement-admin-content hr:nth-of-type(2)~div,:host ::ng-deep adapt-agreement-card adapt-agreement-admin-content h4,:host ::ng-deep adapt-agreement-card adapt-agreement-admin-content hr:nth-of-type(3){display:none}\n"], components: [{ type: i4.AdaptAgreementCardComponent, selector: "adapt-agreement-card", inputs: ["multiProductUsage", "state", "showOrganizationSettings", "showMarketingSection", "showShadow"], outputs: ["stateChange"] }, { type: i4.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i5.AsyncPipe, "translate": i1.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightAdminOptInComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-gainsight-admin-opt-in',
                    templateUrl: './gainsight-admin-opt-in.component.html',
                    styleUrls: ['./gainsight-admin-opt-in.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxNotificationService }, { type: i3.RxGainsightConfiguratorService }]; } });
//# sourceMappingURL=gainsight-admin-opt-in.component.js.map