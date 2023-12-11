import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RX_RSSO_OAUTH } from './rsso-oauth.constant';
import { find, map } from 'lodash';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';
import { RX_APPLICATION, RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxRssoOAuthConfigurationService } from './rsso-oauth-configuration.service';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "./rsso-oauth-configuration.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class RssoOauthAdminComponent extends BaseViewComponent {
    constructor(rxRssoOAuthService, rxCurrentUserService, rxNotificationService, translateService) {
        super();
        this.rxRssoOAuthService = rxRssoOAuthService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.sections = RX_RSSO_OAUTH.sections;
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.serviceForm.dirty
        });
        this.busy = this.rxRssoOAuthService
            .getConfigs()
            .pipe(switchMap((rssoConfigurations) => {
            const recondInstanceConfigs$ = map(rssoConfigurations, (configuration) => {
                const oAuthProviderInConfiguration = find(configuration, {
                    id: String(RX_RSSO_OAUTH.fieldIds.oAuthProvider)
                }).value;
                const section = find(this.sections, { oAuthProvider: oAuthProviderInConfiguration });
                section.recordInstanceId = find(configuration, {
                    id: String(RX_RECORD_DEFINITION.coreFieldIds.id)
                }).value;
                return this.rxRssoOAuthService.getConfigRecordInstance(section.recordInstanceId).pipe(tap((recordInstance) => {
                    map(section.fields, (field) => {
                        field.value = recordInstance.fieldInstances[field.id].value;
                    });
                }));
            });
            return forkJoin(recondInstanceConfigs$);
        }))
            .subscribe();
    }
    save(section, form) {
        section.isSaveInProgress = true;
        this.rxRssoOAuthService
            .getConfigRecordInstance(section.recordInstanceId)
            .pipe(switchMap((recordInstance) => {
            map(section.fields, (field) => {
                recordInstance.fieldInstances[field.id].value = field.value;
            });
            recordInstance.setFieldValue(RX_RSSO_OAUTH.fieldIds.oAuthProvider, section.oAuthProvider);
            recordInstance.setFieldValue(RX_RSSO_OAUTH.fieldIds.bundleId, RX_APPLICATION.chatbotBundleId);
            recordInstance.setFieldValue(RX_RECORD_DEFINITION.coreFieldIds.description, RX_RSSO_OAUTH.oAuthConfigurationDescription);
            return this.rxRssoOAuthService.saveConfigRecordInstance(recordInstance);
        }), catchError((err) => {
            section.isSaveInProgress = false;
            return throwError(err);
        }))
            .subscribe((response) => {
            if (response) {
                section.recordInstanceId = response.id;
            }
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.rsso-auth.rsso-oauth-settings-saved.message'));
            form.form.markAsPristine();
            section.isSaveInProgress = false;
        });
    }
    isSaveButtonDisabled(form) {
        return form.pristine || form.invalid;
    }
    isSaveButtonVisible() {
        return this.rxCurrentUserService.isAdministrator();
    }
    isSaveInProgress(section) {
        return section.isSaveInProgress;
    }
}
RssoOauthAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthAdminComponent, deps: [{ token: i1.RxRssoOAuthConfigurationService }, { token: i2.RxCurrentUserService }, { token: i2.RxNotificationService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RssoOauthAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RssoOauthAdminComponent, selector: "rx-admin-rsso-oauth", viewQueries: [{ propertyName: "serviceForm", first: true, predicate: ["serviceForm"], descendants: true, read: NgForm }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.rsso-auth.header.title' | translate }}\" [busy]=\"busy\">\n  <adapt-accordion multiselect=\"true\" class=\"pb-4\">\n    <form *ngFor=\"let section of sections\" name=\"section.formName\" #serviceForm=\"ngForm\">\n      <adapt-accordion-tab\n        [title]=\"section.title | translate\"\n        [isOpen]=\"section.isOpen\"\n        class=\"mb-3\"\n        [attr.rx-id]=\"section.rxId\"\n      >\n        <adapt-rx-textfield\n          *ngFor=\"let field of section.fields\"\n          [name]=\"field.name\"\n          [(ngModel)]=\"field.value\"\n          [required]=\"true\"\n          [attr.rx-id]=\"field.rxId\"\n          [label]=\"field.label | translate\"\n          [pattern]=\"field.pattern\"\n          class=\"d-block form-group\"\n          [isPassword]=\"field.type === 'password'\"\n        >\n        </adapt-rx-textfield>\n        <button\n          adapt-button\n          type=\"button\"\n          rx-id=\"save-button\"\n          btn-type=\"primary\"\n          class=\"mt-4\"\n          [disabled]=\"isSaveButtonDisabled(serviceForm)\"\n          [adaptInlineLoader]=\"isSaveInProgress(section)\"\n          *ngIf=\"isSaveButtonVisible()\"\n          (click)=\"save(section, serviceForm)\"\n        >\n          {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n        </button>\n      </adapt-accordion-tab>\n    </form>\n  </adapt-accordion>\n</rx-admin-settings>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RssoOauthAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-rsso-oauth',
                    templateUrl: './rsso-oauth.component.html',
                    styleUrls: ['./rsso-oauth.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRssoOAuthConfigurationService }, { type: i2.RxCurrentUserService }, { type: i2.RxNotificationService }, { type: i3.TranslateService }]; }, propDecorators: { serviceForm: [{
                type: ViewChild,
                args: ['serviceForm', { read: NgForm, static: false }]
            }] } });
//# sourceMappingURL=rsso-oauth.component.js.map