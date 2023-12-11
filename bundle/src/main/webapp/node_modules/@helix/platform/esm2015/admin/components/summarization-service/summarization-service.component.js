import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { throwError } from 'rxjs';
import { RxCommandFactoryService, RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RX_SUMMARIZATION_SERVICE } from './summarization-service.constant';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class SummarizationServiceAdminComponent extends BaseViewComponent {
    constructor(translateService, rxCommandFactoryService, rxSystemConfigurationService, rxNotificationService, rxCurrentUserService) {
        super();
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxNotificationService = rxNotificationService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
        this.isSaveInProgress = false;
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.summarizationServiceForm.dirty
        });
        this.summarizationServiceForm = new FormGroup({
            endpoint: new FormControl(''),
            username: new FormControl(''),
            password: new FormControl('')
        });
        this.rxSystemConfigurationService
            .getConfiguration(RX_SUMMARIZATION_SERVICE.connections.summarizationServiceEndpointConfiguration)
            .subscribe((result) => {
            const summarizationConfiguration = JSON.parse(result.value)[RX_SUMMARIZATION_SERVICE.summarizationRepository];
            this.summarizationServiceForm.get('endpoint').setValue(summarizationConfiguration.endpoint);
            this.summarizationServiceForm.get('username').setValue(summarizationConfiguration.username);
            this.summarizationServiceForm.get('password').setValue(summarizationConfiguration.username);
        });
        this.summarizationServiceForm.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe((value) => this.resetConnectionTest());
    }
    resetConnectionTest() {
        this.connectionTestStatus =
            this.summarizationServiceForm.valid && this.summarizationServiceForm.dirty
                ? ConnectionTestStatus.Unknown
                : ConnectionTestStatus.Invalid;
    }
    onTestConnection() {
        this.rxCommandFactoryService
            .forResourceType('com.bmc.arsys.rx.application.cognitive.command.PingSummarizationServiceCommand')
            .execute(this.summarizationServiceForm.value)
            .pipe(catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    save() {
        this.isSaveInProgress = true;
        this.rxSystemConfigurationService
            .setConfiguration(RX_SUMMARIZATION_SERVICE.connections.summarizationServiceEndpointConfiguration, {
            [RX_SUMMARIZATION_SERVICE.summarizationRepository]: this.summarizationServiceForm.value
        })
            .subscribe((response) => {
            this.isSaveInProgress = false;
            this.summarizationServiceForm.markAsPristine();
            this.resetConnectionTest();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.summarization-service.saved.message'));
        }, (error) => {
            this.isSaveInProgress = false;
        });
    }
    isSaveButtonDisabled() {
        return (this.summarizationServiceForm.pristine ||
            this.summarizationServiceForm.invalid ||
            this.connectionTestStatus !== ConnectionTestStatus.Passed ||
            this.isSaveInProgress);
    }
}
SummarizationServiceAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceAdminComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxSystemConfigurationService }, { token: i2.RxNotificationService }, { token: i2.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Component });
SummarizationServiceAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SummarizationServiceAdminComponent, selector: "rx-admin-summarization-service", usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-service.header.title' | translate }}\">\n  <form [formGroup]=\"summarizationServiceForm\">\n    <adapt-rx-textfield\n      name=\"endpoint\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.summarization-service.api-endpoint-url.title' | translate }}\"\n      rx-id=\"api-endpoint-url\"\n      class=\"form-group d-block\"\n      formControlName=\"endpoint\"\n      required\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      name=\"username\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.user-name.label' | translate }}\"\n      rx-id=\"user-name\"\n      class=\"form-group d-block\"\n      formControlName=\"username\"\n      required\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      name=\"password\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.password.label' | translate }}\"\n      rx-id=\"password\"\n      [isPassword]=\"true\"\n      class=\"form-group d-block\"\n      formControlName=\"password\"\n      required\n    >\n    </adapt-rx-textfield>\n    <div class=\"d-flex\" *ngIf=\"isAdministrator\">\n      <rx-connection-tester\n        [status]=\"connectionTestStatus\"\n        buttonType=\"secondary\"\n        rx-id=\"test-connection-button\"\n        (testConnection)=\"onTestConnection()\"\n      >\n      </rx-connection-tester>\n      <button\n        adapt-button\n        type=\"button\"\n        rx-id=\"save-button\"\n        btn-type=\"primary\"\n        class=\"ml-4\"\n        [disabled]=\"isSaveButtonDisabled()\"\n        (click)=\"save()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n    </div>\n  </form>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i3.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SummarizationServiceAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-summarization-service',
                    templateUrl: './summarization-service.component.html',
                    styleUrls: ['./summarization-service.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxSystemConfigurationService }, { type: i2.RxNotificationService }, { type: i2.RxCurrentUserService }]; } });
//# sourceMappingURL=summarization-service.component.js.map