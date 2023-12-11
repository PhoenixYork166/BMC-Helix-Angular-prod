import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { find, first } from 'lodash';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { IpaasBaseConfigurationComponent } from '../ipaas-base-configuration/ipaas-base-configuration.component';
import { AUTH_TYPE, MULESOFT_AUTH_TYPE_OPTIONS } from './mulesoft-configuration.types';
import { AdaptValidators } from '@bmc-ux/adapt-angular';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../ipaas-base-configuration/ipaas-base-configuration.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
export class MulesoftConfigurationAdminComponent extends BaseViewComponent {
    constructor(formBuilder) {
        super();
        this.formBuilder = formBuilder;
        this.mulesoftConfig = {
            componentName: 'iPaaS MuleSoft Configuration',
            resourceType: 'com.bmc.dsm.ipaas.mulesoft.command.PingMuleSoftCommand',
            bundleScope: RX_APPLICATION.ipaasMulesoftBundleId,
            titleKey: 'com.bmc.arsys.rx.client.admin.mulesoft-configuration.header.title',
            saveMessageKey: 'com.bmc.arsys.rx.client.admin.mulesoft-configuration.saved.message',
            controlsConfig: {
                url: ['', AdaptValidators.required()],
                authType: ['', AdaptValidators.required()],
                username: '',
                password: '',
                clientId: '',
                clientSecret: ''
            },
            getFormValues: (formValue) => ({
                url: formValue.url,
                authType: this.getAuthTypeOption(formValue.authType),
                username: formValue.username,
                password: formValue.password,
                clientId: formValue.clientId,
                clientSecret: formValue.clientSecret
            }),
            settingNames: {
                url: 'url',
                userName: 'username',
                password: 'password',
                authType: 'authType',
                clientId: 'clientId',
                clientSecret: 'clientSecret'
            },
            getPayload: (formValue) => {
                var _a;
                switch ((_a = first(formValue.authType)) === null || _a === void 0 ? void 0 : _a.id) {
                    case AUTH_TYPE.oAuth2: {
                        return {
                            url: formValue.url,
                            authType: this.getAuthTypePayload(formValue.authType),
                            username: null,
                            password: null,
                            clientId: formValue.clientId,
                            clientSecret: formValue.clientSecret
                        };
                    }
                    default: {
                        return {
                            url: formValue.url,
                            authType: this.getAuthTypePayload(formValue.authType),
                            username: formValue.username,
                            password: formValue.password,
                            clientId: null,
                            clientSecret: null
                        };
                    }
                }
            }
        };
        this.authenticationOptions = MULESOFT_AUTH_TYPE_OPTIONS;
        this.optionFormatter = (authenticationOption) => authenticationOption.label;
    }
    ngOnInit() {
        this.mulesoftConfigurationForm = this.formBuilder.group(this.mulesoftConfig.controlsConfig);
        this.mulesoftConfigurationForm.patchValue({ authType: [first(MULESOFT_AUTH_TYPE_OPTIONS)] });
        this.authType.valueChanges.pipe(map((authType) => this.getAuthTypePayload(authType))).subscribe((authType) => {
            if (authType === AUTH_TYPE.basicAuth) {
                this.mulesoftConfigurationForm.controls.username.setValidators(AdaptValidators.required());
                this.mulesoftConfigurationForm.controls.username.enable();
                this.mulesoftConfigurationForm.controls.password.setValidators(AdaptValidators.required());
                this.mulesoftConfigurationForm.controls.password.enable();
                this.mulesoftConfigurationForm.controls.clientId.clearValidators();
                this.mulesoftConfigurationForm.controls.clientId.disable();
                this.mulesoftConfigurationForm.controls.clientSecret.clearValidators();
                this.mulesoftConfigurationForm.controls.clientSecret.disable();
            }
            else if (authType === AUTH_TYPE.oAuth2) {
                this.mulesoftConfigurationForm.controls.username.clearValidators();
                this.mulesoftConfigurationForm.controls.username.disable();
                this.mulesoftConfigurationForm.controls.password.clearValidators();
                this.mulesoftConfigurationForm.controls.password.disable();
                this.mulesoftConfigurationForm.controls.clientId.setValidators(AdaptValidators.required());
                this.mulesoftConfigurationForm.controls.clientId.enable();
                this.mulesoftConfigurationForm.controls.clientSecret.setValidators(AdaptValidators.required());
                this.mulesoftConfigurationForm.controls.clientSecret.enable();
            }
        });
        this.mulesoftConfigurationForm.patchValue({ authType: [first(MULESOFT_AUTH_TYPE_OPTIONS)] });
        this.notifyPropertyChanged('api', {
            isDirty: () => this.ipaasBaseConfigurationComponent.childFormGroup.dirty
        });
    }
    get authType() {
        return this.mulesoftConfigurationForm.get('authType');
    }
    getAuthTypeOption(id) {
        const authType = find(MULESOFT_AUTH_TYPE_OPTIONS, { id: id });
        return authType ? [authType] : [];
    }
    getAuthTypePayload(authType) {
        var _a;
        return (_a = first(authType)) === null || _a === void 0 ? void 0 : _a.id;
    }
}
MulesoftConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
MulesoftConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: MulesoftConfigurationAdminComponent, selector: "rx-admin-mulesoft-configuration", viewQueries: [{ propertyName: "ipaasBaseConfigurationComponent", first: true, predicate: IpaasBaseConfigurationComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-ipaas-base-configuration [ipaasConfig]=\"mulesoftConfig\" [childFormGroup]=\"mulesoftConfigurationForm\">\n  <ng-container [formGroup]=\"mulesoftConfigurationForm\">\n    <adapt-rx-textfield\n      rx-id=\"endpoint-url\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.mulesoft-configuration.end-point-url.label' | translate }}\"\n      formControlName=\"url\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-select\n      rx-id=\"auth-type\"\n      formControlName=\"authType\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.authentication.label' | translate }}\"\n      [options]=\"authenticationOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-select>\n\n    <ng-container [ngSwitch]=\"authType.value[0]?.id\">\n      <ng-container *ngSwitchDefault>\n        <adapt-rx-textfield\n          rx-id=\"user-name\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.user-name.label' | translate }}\"\n          formControlName=\"username\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"password\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.password.label' | translate }}\"\n          formControlName=\"password\"\n          [isPassword]=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n      </ng-container>\n\n      <ng-container *ngSwitchCase=\"authenticationOptions[1].id\">\n        <adapt-rx-textfield\n          rx-id=\"client-id\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.client-id.label' | translate }}\"\n          formControlName=\"clientId\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"client-secret\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.bmc-service-cloud-account.client-secret.label' | translate }}\"\n          formControlName=\"clientSecret\"\n          [isPassword]=\"true\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-textfield>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n</rx-ipaas-base-configuration>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield,adapt-rx-select{max-width:400px}\n"], components: [{ type: i2.IpaasBaseConfigurationComponent, selector: "rx-ipaas-base-configuration", inputs: ["ipaasConfig", "childFormGroup"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MulesoftConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-mulesoft-configuration',
                    templateUrl: './mulesoft-configuration.component.html',
                    styleUrls: ['./mulesoft-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }]; }, propDecorators: { ipaasBaseConfigurationComponent: [{
                type: ViewChild,
                args: [IpaasBaseConfigurationComponent]
            }] } });
//# sourceMappingURL=mulesoft-configuration.component.js.map