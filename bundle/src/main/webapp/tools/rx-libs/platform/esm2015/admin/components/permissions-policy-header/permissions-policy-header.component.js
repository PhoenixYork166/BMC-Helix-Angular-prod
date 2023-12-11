import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/forms";
export class PermissionsPolicyHeaderAdminComponent extends BaseViewComponent {
    constructor(rxNotificationService, translateService, rxSystemConfigurationService) {
        super();
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.settingName = 'permissionsPolicy';
        this.permissionsPolicyHeader = '';
        this.syntaxUrl = 'https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md';
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.isDirty()
        });
        this.busy = this.rxSystemConfigurationService.getConfiguration(this.settingName).subscribe((settingsData) => {
            this.permissionsPolicyHeader = settingsData.value;
        });
    }
    isDirty() {
        var _a;
        return (_a = this.permissionPolicyHeaderModel) === null || _a === void 0 ? void 0 : _a.dirty;
    }
    onSaveClick() {
        this.rxSystemConfigurationService.setConfiguration(this.settingName, this.permissionsPolicyHeader).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.settings-saved.message'));
            this.permissionPolicyHeaderModel.control.markAsPristine();
        });
    }
}
PermissionsPolicyHeaderAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderAdminComponent, deps: [{ token: i1.RxNotificationService }, { token: i2.TranslateService }, { token: i1.RxSystemConfigurationService }], target: i0.ɵɵFactoryTarget.Component });
PermissionsPolicyHeaderAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PermissionsPolicyHeaderAdminComponent, selector: "rx-admin-permissions-policy", viewQueries: [{ propertyName: "permissionPolicyHeaderModel", first: true, predicate: ["permissionPolicyHeaderModel"], descendants: true, read: NgModel, static: true }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings\n  header=\"{{ 'com.bmc.arsys.rx.client.admin.permissions-policy-header.header.title' | translate }}\"\n  [busy]=\"busy\"\n>\n  <adapt-rx-textfield\n    [label]=\"'com.bmc.arsys.rx.client.admin.permissions-policy-header.label' | translate\"\n    [(ngModel)]=\"permissionsPolicyHeader\"\n    rx-id=\"permission-policy-header\"\n    name=\"permissionPolicyHeaderModel\"\n    class=\"form-group d-block\"\n    #permissionPolicyHeaderModel=\"ngModel\"\n    [autofocus]=\"true\"\n    [tooltip]=\"{\n      iconName: 'question_circle_o',\n      content: popover,\n      placement: 'right',\n      popoverMode: true,\n      maxWidth: 400\n    }\"\n  ></adapt-rx-textfield>\n\n  <button\n    class=\"align-self-start\"\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"!permissionsPolicyHeader || !isDirty()\"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <ng-template #popover>\n    {{ 'com.bmc.arsys.rx.client.admin.permissions-policy-header.syntax-information.message' | translate }}\n    <a class=\"text-secondary\" target=\"_blank\" href=\"{{ syntaxUrl }}\">{{ syntaxUrl }}</a>\n  </ng-template>\n</rx-admin-settings>\n", components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PermissionsPolicyHeaderAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-permissions-policy',
                    templateUrl: './permissions-policy-header.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.TranslateService }, { type: i1.RxSystemConfigurationService }]; }, propDecorators: { permissionPolicyHeaderModel: [{
                type: ViewChild,
                args: ['permissionPolicyHeaderModel', { read: NgModel, static: true }]
            }] } });
//# sourceMappingURL=permissions-policy-header.component.js.map