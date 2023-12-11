import { Component, Injector } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { chain, find, forEach, has } from 'lodash';
import { RxGlobalCacheService, RxNotificationService, RxOverlayService } from '@helix/platform/shared/api';
import { RX_WEBHOOK_CALLBACK_CONFIGURATION } from '../webhook-callback-configuration.constant';
import { RxWebhookCallbackConfigurationService } from '../webhook-callback-configuration.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "../webhook-callback-configuration.service";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@angular/forms";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
export class WebhookCallbackConfigurationEditorComponent extends RxModalClass {
    constructor(dockedPanelContext, rxGlobalCacheService, rxRecordDefinitionCacheService, rxRecordInstanceService, rxWebhookCallbackConfigurationService, rxOverlayService, rxJsonParserService, rxNotificationService, formBuilder, translateService, injector) {
        super(dockedPanelContext, injector);
        this.dockedPanelContext = dockedPanelContext;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxWebhookCallbackConfigurationService = rxWebhookCallbackConfigurationService;
        this.rxOverlayService = rxOverlayService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxNotificationService = rxNotificationService;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.injector = injector;
        this.defaultControls = {
            configurationName: '',
            bundleId: [],
            processor: []
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.webhookCallbackConfigurationForm = this.formBuilder.group(this.defaultControls);
        this.isEditMode = this.dockedPanelContext.getData().isEditMode;
        this.rxGlobalCacheService.getBundleDescriptors().subscribe((bundleDescriptors) => {
            this.bundleIdOptions = bundleDescriptors
                .filter((bundleDescriptor) => bundleDescriptor.isApplication)
                .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
                .map((bundleDescriptor) => ({
                displayValue: bundleDescriptor.friendlyName,
                value: bundleDescriptor.id
            }));
        });
        this.rxRecordDefinitionCacheService
            .getRecordDefinition(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.name)
            .subscribe((recordDefinition) => {
            this.processorOptions = chain(recordDefinition.fieldDefinitions)
                .find({
                id: RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.processor
            })
                .get('optionNamesById')
                .map((optionName, optionId) => ({
                displayValue: optionName,
                value: optionId
            }))
                .value();
        });
        if (!this.isEditMode) {
            this.rxRecordInstanceService
                .getNew(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.name)
                .subscribe((recordInstance) => (this.recordInstance = recordInstance));
        }
        else {
            this.rxRecordInstanceService
                .get(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.name, this.dockedPanelContext.getData().recordId)
                .subscribe((recordInstance) => {
                this.recordInstance = recordInstance;
                this.setFormControlValues();
                this.callbackUrl = [
                    location.origin,
                    'api/rx/application/webhook_callback',
                    this.recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.id].value,
                    this.rxOverlayService.getCurrentOverlayContext().tenantId
                ].join('/');
                this.metadataFields = this.rxJsonParserService.tryParseJson(this.recordInstance.fieldInstances[RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.configMetadata].value);
                this.generateMetadataFieldFormControls();
            });
        }
    }
    isDirty() {
        return this.webhookCallbackConfigurationForm.dirty;
    }
    setFormControlValues() {
        this.webhookCallbackConfigurationForm
            .get('configurationName')
            .setValue(this.recordInstance.fieldInstances[RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.name].value);
        const bundleOption = find(this.bundleIdOptions, {
            value: this.recordInstance.fieldInstances[RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.bundleId].value
        });
        this.webhookCallbackConfigurationForm.get('bundleId').setValue([
            {
                value: bundleOption.value,
                displayValue: bundleOption.displayValue
            }
        ]);
        const processorOption = find(this.processorOptions, {
            value: String(this.recordInstance.fieldInstances[RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.processor].value)
        });
        this.webhookCallbackConfigurationForm.get('processor').setValue([
            {
                value: processorOption.value,
                displayValue: processorOption.displayValue
            }
        ]);
    }
    removeMetadataFieldFormControls() {
        Object.keys(this.webhookCallbackConfigurationForm.controls).forEach((key) => {
            if (!has(this.defaultControls, key)) {
                this.webhookCallbackConfigurationForm.removeControl(key);
            }
        });
    }
    generateMetadataFieldFormControls() {
        this.metadataFields.forEach((field) => {
            this.webhookCallbackConfigurationForm.addControl(field.name, new FormControl(field.value || ''));
        });
    }
    loadMetadataFields() {
        this.rxWebhookCallbackConfigurationService.getMetadataFields().subscribe((metadataFieldsByProcessorId) => {
            this.metadataFields =
                metadataFieldsByProcessorId[this.webhookCallbackConfigurationForm.get('processor').value[0].value];
            this.removeMetadataFieldFormControls();
            this.generateMetadataFieldFormControls();
        });
    }
    saveConfiguration() {
        this.recordInstance.setFieldValue(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.name, this.webhookCallbackConfigurationForm.get('configurationName').value);
        this.recordInstance.setFieldValue(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.bundleId, this.webhookCallbackConfigurationForm.get('bundleId').value[0].value);
        this.recordInstance.setFieldValue(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.processor, this.webhookCallbackConfigurationForm.get('processor').value[0].value);
        forEach(this.metadataFields, (field) => {
            field.value = this.webhookCallbackConfigurationForm.get(field.name).value;
        });
        this.recordInstance.setFieldValue(RX_WEBHOOK_CALLBACK_CONFIGURATION.recordDefinition.fieldIds.configMetadata, JSON.stringify(this.metadataFields));
        if (this.isEditMode) {
            this.rxRecordInstanceService.save(this.recordInstance).subscribe(() => this.successCallback());
        }
        else {
            this.rxRecordInstanceService.create(this.recordInstance).subscribe(() => this.successCallback());
        }
    }
    successCallback() {
        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.webhook-callback-configuration.configurations-saved.message'));
        this.dockedPanelContext.close(null);
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
}
WebhookCallbackConfigurationEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationEditorComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxGlobalCacheService }, { token: i3.RxRecordDefinitionCacheService }, { token: i3.RxRecordInstanceService }, { token: i4.RxWebhookCallbackConfigurationService }, { token: i2.RxOverlayService }, { token: i5.RxJsonParserService }, { token: i2.RxNotificationService }, { token: i6.FormBuilder }, { token: i7.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
WebhookCallbackConfigurationEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebhookCallbackConfigurationEditorComponent, selector: "rx-webhook-callback-configuration", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form [formGroup]=\"webhookCallbackConfigurationForm\">\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      rx-id=\"configuration-name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.configuration-name.label' | translate }}\"\n      formControlName=\"configurationName\"\n      required=\"true\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.bundle-name.label' | translate }}\"\n      rx-id=\"bundle-name\"\n      formControlName=\"bundleId\"\n      [options]=\"bundleIdOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      required=\"true\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.processor.label' | translate }}\"\n      rx-id=\"processor\"\n      formControlName=\"processor\"\n      [options]=\"processorOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      required=\"true\"\n      (onSelectionChange)=\"loadMetadataFields()\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      class=\"form-group d-block\"\n      *ngFor=\"let field of metadataFields\"\n      label=\"{{ field.name }}\"\n      [isPassword]=\"field.secure\"\n      formControlName=\"{{ field.name }}\"\n      required=\"true\"\n    >\n    </adapt-rx-textfield>\n\n    <div class=\"form-group\">\n      <label class=\"form-control-label\">{{\n        'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.callback-url.label' | translate\n      }}</label>\n\n      <div class=\"callback-url bg-secondary p-1\" *ngIf=\"isEditMode\">\n        {{ callbackUrl }}\n      </div>\n\n      <adapt-alert\n        *ngIf=\"!isEditMode\"\n        [config]=\"{\n          content: 'com.bmc.arsys.rx.client.admin.webhook-callback-configuration.url-alert.message' | translate,\n          type: 'inline',\n          variant: 'info'\n        }\"\n      ></adapt-alert>\n    </div>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    [disabled]=\"webhookCallbackConfigurationForm.pristine || webhookCallbackConfigurationForm.invalid\"\n    (click)=\"saveConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button (click)=\"cancel()\" btn-type=\"secondary\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [".callback-url{word-break:break-all}\n"], components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebhookCallbackConfigurationEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-webhook-callback-configuration',
                    templateUrl: './webhook-callback-configuration-editor.component.html',
                    styleUrls: ['./webhook-callback-configuration-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxGlobalCacheService }, { type: i3.RxRecordDefinitionCacheService }, { type: i3.RxRecordInstanceService }, { type: i4.RxWebhookCallbackConfigurationService }, { type: i2.RxOverlayService }, { type: i5.RxJsonParserService }, { type: i2.RxNotificationService }, { type: i6.FormBuilder }, { type: i7.TranslateService }, { type: i0.Injector }]; } });
//# sourceMappingURL=webhook-callback-configuration-editor.component.js.map