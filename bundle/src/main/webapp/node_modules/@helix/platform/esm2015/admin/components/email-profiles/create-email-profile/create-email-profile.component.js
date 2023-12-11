import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RX_APPLICATION, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { filter, includes, reject } from 'lodash';
import { forkJoin, Subscription } from 'rxjs';
import { RX_EMAIL_PROFILES } from '../email-profiles.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
import * as i6 from "@ngx-translate/core";
export class CreateEmailProfileComponent extends RxModalClass {
    constructor(formBuilder, rxGlobalCacheService, rxRecordInstanceDataPageService, dockedPanelContext, injector) {
        super(dockedPanelContext, injector);
        this.formBuilder = formBuilder;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.dockedPanelContext = dockedPanelContext;
        this.injector = injector;
        this.mailboxFunctions = RX_EMAIL_PROFILES.mailbox.mailboxFunctions;
        this.bundleOptions = [];
        this.mailboxOptions = [];
        this.availableMailboxOptions = [];
        this.validDefinitionNameRegex = RX_RECORD_DEFINITION.validDefinitionNameRegex;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        super.ngOnInit();
        this.emailProfile = this.dockedPanelContext.getData().profile;
        this.createEmailProfileFormGroup = this.formBuilder.group({
            profileName: '',
            mailboxFunction: this.mailboxFunctions.incoming.value,
            mailbox: [],
            application: []
        });
        forkJoin({
            bundleDescriptors: this.rxGlobalCacheService.getBundleDescriptors(),
            mailboxes: this.rxRecordInstanceDataPageService.post({
                params: {
                    recorddefinition: RX_EMAIL_PROFILES.mailbox.recordDefinitionName,
                    queryExpression: RX_EMAIL_PROFILES.mailbox.queryExpression
                }
            })
        }).subscribe((result) => {
            this.bundleOptions = reject(result.bundleDescriptors, (bundleDescriptor) => {
                return includes([RX_APPLICATION.innovationStudioBundleId, RX_APPLICATION.platformBundleId], bundleDescriptor.id);
            }).sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
            this.availableMailboxOptions = result.mailboxes.data;
            if (this.emailProfile) {
                this.createEmailProfileFormGroup.controls.mailboxFunction.disable();
                this.loadEmailProfileData();
            }
            else {
                this.filterMailboxes(this.mailboxFunctions.incoming.value);
            }
            this.subscription = this.createEmailProfileFormGroup
                .get('mailboxFunction')
                .valueChanges.subscribe((mailboxFunctionName) => {
                this.createEmailProfileFormGroup.controls.mailbox.setValue([]);
                this.filterMailboxes(mailboxFunctionName);
            });
        });
    }
    isDirty() {
        return this.createEmailProfileFormGroup.dirty;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    filterMailboxes(mailBoxFunctionName) {
        this.mailboxOptions = filter(this.availableMailboxOptions, (mailbox) => {
            return mailbox[RX_EMAIL_PROFILES.mailbox.fieldIds.mailboxFunction] === parseInt(mailBoxFunctionName, 10);
        });
    }
    loadEmailProfileData() {
        let selectedMailboxType = '';
        if (this.emailProfile.mailboxType === RX_EMAIL_PROFILES.mailbox.mailboxFunctions.incoming.id) {
            selectedMailboxType = this.mailboxFunctions.incoming.value;
        }
        else if (this.emailProfile.mailboxType === RX_EMAIL_PROFILES.mailbox.mailboxFunctions.outgoing.id) {
            selectedMailboxType = this.mailboxFunctions.outgoing.value;
        }
        this.filterMailboxes(selectedMailboxType);
        const selectedApplication = this.bundleOptions.find((bundle) => bundle.id === this.emailProfile.application);
        const selectedMailbox = this.availableMailboxOptions.find((mailbox) => mailbox[RX_RECORD_DEFINITION.coreFieldIds.id] === this.emailProfile.mailbox);
        this.createEmailProfileFormGroup.patchValue({
            profileName: this.emailProfile.profileName,
            mailboxFunction: selectedMailboxType,
            mailbox: selectedMailbox ? [selectedMailbox] : [],
            application: selectedApplication ? [selectedApplication] : []
        });
    }
    bundleNameFormatter(bundleOption) {
        return bundleOption.friendlyName;
    }
    mailboxNameFormatter(mailboxOption) {
        return mailboxOption[RX_EMAIL_PROFILES.mailbox.fieldIds.mailboxName.id];
    }
    save() {
        this.dockedPanelContext.close(this.createEmailProfileFormGroup.getRawValue());
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
CreateEmailProfileComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateEmailProfileComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxGlobalCacheService }, { token: i3.RxRecordInstanceDataPageService }, { token: i4.DockedPanelContext }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CreateEmailProfileComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateEmailProfileComponent, selector: "rx-create-email-profile", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form [formGroup]=\"createEmailProfileFormGroup\">\n    <adapt-rx-textfield\n      class=\"d-block form-group\"\n      rx-id=\"profile-name\"\n      formControlName=\"profileName\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.create-email-profile.profile-name.label' | translate }}\"\n      required\n      maxlength=\"254\"\n      [pattern]=\"validDefinitionNameRegex\"\n    ></adapt-rx-textfield>\n\n    <adapt-rx-radiobutton-group\n      class=\"d-block form-group\"\n      rx-id=\"mailbox-function\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.create-email-profile.mailbox-function.label' | translate }}\"\n      required\n      [formControl]=\"createEmailProfileFormGroup.controls.mailboxFunction\"\n    >\n      <adapt-rx-radiobutton\n        class=\"mb-0 mt-0 radio-inline\"\n        *ngFor=\"let mailboxFunction of mailboxFunctions | keyvalue\"\n        [value]=\"mailboxFunction.value.value\"\n        [label]=\"mailboxFunction.value.label | translate\"\n      ></adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-select\n      class=\"d-block form-group\"\n      formControlName=\"mailbox\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.create-email-profile.mailbox.label' | translate }}\"\n      rx-id=\"mailbox\"\n      required\n      [options]=\"mailboxOptions\"\n      [optionFormatter]=\"mailboxNameFormatter\"\n    ></adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"d-block form-group\"\n      emptyOption=\"true\"\n      formControlName=\"application\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.create-email-profile.application.label' | translate }}\"\n      rx-id=\"application\"\n      [options]=\"bundleOptions\"\n      [optionFormatter]=\"bundleNameFormatter\"\n    ></adapt-rx-select>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    class=\"mr-2\"\n    rx-id=\"save-button\"\n    [disabled]=\"createEmailProfileFormGroup.invalid || createEmailProfileFormGroup.pristine\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" class=\"mr-2\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i4.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i4.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i4.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i4.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i4.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i6.TranslatePipe, "keyvalue": i5.KeyValuePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateEmailProfileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-create-email-profile',
                    templateUrl: './create-email-profile.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxGlobalCacheService }, { type: i3.RxRecordInstanceDataPageService }, { type: i4.DockedPanelContext }, { type: i0.Injector }]; } });
//# sourceMappingURL=create-email-profile.component.js.map