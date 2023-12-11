import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxTenantService } from '../manage-tenant.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "../manage-tenant.service";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@ngx-translate/core";
export class TenantEditorComponent extends RxModalClass {
    constructor(formBuilder, dockedPanelContext, rxManageTenantService, rxNotificationService, translateService, injector) {
        super(dockedPanelContext, injector);
        this.formBuilder = formBuilder;
        this.dockedPanelContext = dockedPanelContext;
        this.rxManageTenantService = rxManageTenantService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.injector = injector;
        this.domainIdentifierRegexp = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.isEditMode = false;
    }
    ngOnInit() {
        super.ngOnInit();
        const selectedTenantData = this.dockedPanelContext.getData().tenant;
        this.tenantEditorFormGroup = this.formBuilder.group({
            name: '',
            domainIdentifier: '',
            virtualHostname: ''
        });
        if (selectedTenantData) {
            this.isEditMode = true;
            this.tenantEditorFormGroup.patchValue({
                name: selectedTenantData.name,
                domainIdentifier: selectedTenantData.domainIdentifier,
                virtualHostname: selectedTenantData.virtualHostname
            });
        }
    }
    isDirty() {
        return this.tenantEditorFormGroup.dirty;
    }
    save() {
        const tenantPayload = this.tenantEditorFormGroup.getRawValue();
        if (this.isEditMode) {
            tenantPayload.tenantId = this.dockedPanelContext.getData().tenant.tenantId;
        }
        const writeEvent = this.isEditMode
            ? this.rxManageTenantService.editTenant(tenantPayload)
            : this.rxManageTenantService.createTenant(tenantPayload);
        writeEvent.subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.isEditMode
                ? this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.tenant-updated.message')
                : this.translateService.instant('com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.tenant-created.message'));
            this.tenantEditorFormGroup.markAsPristine();
            this.dockedPanelContext.close('');
        });
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
TenantEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TenantEditorComponent, deps: [{ token: i1.FormBuilder }, { token: i2.DockedPanelContext }, { token: i3.RxTenantService }, { token: i4.RxNotificationService }, { token: i5.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TenantEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TenantEditorComponent, selector: "rx-tenant-editor", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form [formGroup]=\"tenantEditorFormGroup\">\n    <adapt-rx-textfield\n      class=\"d-block form-group\"\n      rx-id=\"tenant-name-field\"\n      formControlName=\"name\"\n      label=\" {{ 'com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.tenant-name.label' | translate }}\"\n      required\n      maxlength=\"20\"\n      [disabled]=\"isEditMode\"\n    ></adapt-rx-textfield>\n    <adapt-rx-textfield\n      class=\"d-block form-group\"\n      rx-id=\"domain-identifier-field\"\n      formControlName=\"domainIdentifier\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.domain-identifier.label' | translate }}\"\n      placeholder=\"e.g. domain.com\"\n      required\n      maxlength=\"254\"\n      [pattern]=\"domainIdentifierRegexp\"\n    ></adapt-rx-textfield>\n    <adapt-rx-textfield\n      class=\"d-block form-group\"\n      rx-id=\"virtual-host-name-field\"\n      formControlName=\"virtualHostname\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.manage-tenant.tenant-editor.virtual-host-name.label' | translate }}\"\n      placeholder=\"e.g. host.domain.com\"\n      required\n      maxlength=\"254\"\n      [pattern]=\"domainIdentifierRegexp\"\n    ></adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    class=\"mr-2\"\n    rx-id=\"save-button\"\n    [disabled]=\"tenantEditorFormGroup.invalid || tenantEditorFormGroup.pristine\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" class=\"mr-2\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TenantEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tenant-editor',
                    templateUrl: './tenant-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.DockedPanelContext }, { type: i3.RxTenantService }, { type: i4.RxNotificationService }, { type: i5.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=tenant-editor.component.js.map