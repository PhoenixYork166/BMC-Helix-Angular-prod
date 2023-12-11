import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { IpaasBaseConfigurationComponent } from '../ipaas-base-configuration/ipaas-base-configuration.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../ipaas-base-configuration/ipaas-base-configuration.component";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
export class JitterbitConfigurationAdminComponent extends BaseViewComponent {
    constructor(formBuilder) {
        super();
        this.formBuilder = formBuilder;
        this.jitterbitConfig = {
            componentName: 'iPaaS Jitterbit Configuration',
            resourceType: 'com.bmc.dsm.ipaas.jitterbit.command.PingJitterbitCommand',
            bundleScope: RX_APPLICATION.ipaasJitterbitBundleId,
            titleKey: 'com.bmc.arsys.rx.client.admin.jitterbit-configuration.header.title',
            saveMessageKey: 'com.bmc.arsys.rx.client.admin.jitterbit-configuration.saved.message',
            controlsConfig: {
                url: '',
                username: '',
                password: ''
            },
            settingNames: {
                url: 'url',
                userName: 'username',
                password: 'password'
            },
            getPayload: (formValue) => ({
                url: formValue.url,
                username: formValue.username,
                password: formValue.password
            })
        };
    }
    ngOnInit() {
        this.jitterBitConfigurationForm = this.formBuilder.group(this.jitterbitConfig.controlsConfig);
        this.notifyPropertyChanged('api', {
            isDirty: () => this.ipaasBaseConfigurationComponent.childFormGroup.dirty
        });
    }
}
JitterbitConfigurationAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationAdminComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
JitterbitConfigurationAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: JitterbitConfigurationAdminComponent, selector: "rx-admin-jitterbit-configuration", viewQueries: [{ propertyName: "ipaasBaseConfigurationComponent", first: true, predicate: IpaasBaseConfigurationComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-ipaas-base-configuration [ipaasConfig]=\"jitterbitConfig\" [childFormGroup]=\"jitterBitConfigurationForm\">\n  <ng-container [formGroup]=\"jitterBitConfigurationForm\">\n    <adapt-rx-textfield\n      rx-id=\"endpoint-url\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.jitterbit-configuration.end-point-url.label' | translate }}\"\n      formControlName=\"url\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"user-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.user-name.label' | translate }}\"\n      formControlName=\"username\"\n      required=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"password\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.password.label' | translate }}\"\n      formControlName=\"password\"\n      required=\"true\"\n      [isPassword]=\"true\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n  </ng-container>\n</rx-ipaas-base-configuration>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i2.IpaasBaseConfigurationComponent, selector: "rx-ipaas-base-configuration", inputs: ["ipaasConfig", "childFormGroup"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: JitterbitConfigurationAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-jitterbit-configuration',
                    templateUrl: './jitterbit-configuration.component.html',
                    styleUrls: ['./jitterbit-configuration.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }]; }, propDecorators: { ipaasBaseConfigurationComponent: [{
                type: ViewChild,
                args: [IpaasBaseConfigurationComponent]
            }] } });
//# sourceMappingURL=jitterbit-configuration.component.js.map