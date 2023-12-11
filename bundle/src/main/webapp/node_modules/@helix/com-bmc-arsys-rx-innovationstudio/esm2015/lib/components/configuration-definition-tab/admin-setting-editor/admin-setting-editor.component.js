import { Component, Injector, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxDefinitionPickerType, RxPermissionEditorComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, pick } from 'lodash';
import { RX_ADMINISTRATION, RX_PERMISSION, RxAdminSettingsService, RxNotificationService } from '@helix/platform/shared/api';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@angular/common";
export class AdminSettingEditorComponent extends RxModalClass {
    constructor(injector, dockedPanelContext, formBuilder, translateService, rxAdminSettingsService, rxNotificationService) {
        super(dockedPanelContext, injector);
        this.injector = injector;
        this.dockedPanelContext = dockedPanelContext;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxNotificationService = rxNotificationService;
        this.isEditMode = this.dockedPanelContext.getData().editMode;
        this.settingForm = this.createSettingForm();
        this.adminSetting = this.dockedPanelContext.getData().selectedAdminSetting;
        this.viewDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.definition-type.view.label'),
            definitionType: RxDefinitionPickerType.View,
            required: true
        };
        this.permissionEditorOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.permissions.label'),
            type: 'externalconfig',
            permissionScope: RX_PERMISSION.permissionScope.all
        };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.isEditMode) {
            this.initializeSettingForm();
        }
    }
    createSettingForm() {
        return this.formBuilder.group({
            componentName: '',
            registeredModuleName: '',
            innovationStudio: false,
            application: !this.isEditMode,
            componentLabel: '',
            firstMenu: '',
            secondMenu: '',
            externalLink: '',
            permissions: ''
        });
    }
    initializeSettingForm() {
        this.settingForm.get('componentName').setValue(this.adminSetting.componentName);
        this.settingForm.controls.componentName.disable();
        this.settingForm.get('registeredModuleName').setValue(this.adminSetting.registeredModuleName);
        this.settingForm.get('externalLink').setValue(this.adminSetting.externalLink);
        if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.both.value) {
            this.settingForm.get('innovationStudio').setValue(true);
            this.settingForm.get('application').setValue(true);
        }
        else if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value) {
            this.settingForm.get('innovationStudio').setValue(true);
            this.settingForm.get('application').setValue(false);
        }
        else if (this.adminSetting.showInLocation === RX_ADMINISTRATION.settingAccessOptions.application.value) {
            this.settingForm.get('application').setValue(true);
        }
        this.settingForm.get('componentLabel').setValue(this.adminSetting.localeList[0].componentLabel);
        this.settingForm.get('permissions').setValue(this.adminSetting.permissions);
        this.settingForm.get('firstMenu').setValue(this.adminSetting.localeList[0].firstMenu);
        this.settingForm.get('secondMenu').setValue(this.adminSetting.localeList[0].secondMenu);
    }
    saveAdminSetting() {
        const adminSettingRecord = this.transformFormControlData();
        this.settingForm.markAsPristine();
        if (this.isEditMode) {
            this.rxAdminSettingsService.updateAdminSetting(adminSettingRecord).subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.configurations.setting-saved.message'));
                this.dockedPanelContext.close(adminSettingRecord);
            });
        }
        else {
            this.rxAdminSettingsService.createAdminSetting(adminSettingRecord).subscribe(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.configurations.setting-saved.message'));
                this.dockedPanelContext.close(adminSettingRecord);
            });
        }
    }
    transformFormControlData() {
        const settingRecord = cloneDeep(this.settingForm.value);
        if (this.isEditMode) {
            settingRecord.componentName = this.adminSetting.componentName;
        }
        settingRecord.localeList = [];
        settingRecord.viewToOpen = 'CustomView';
        if (settingRecord.innovationStudio && settingRecord.application) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.both.value;
        }
        else if (settingRecord.innovationStudio) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.innovationStudio.value;
        }
        else if (settingRecord.application) {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.application.value;
        }
        else {
            settingRecord.showInLocation = RX_ADMINISTRATION.settingAccessOptions.none.value;
        }
        settingRecord.localeList.push(Object.assign({ locale: 'en' }, pick(settingRecord, ['componentLabel', 'firstMenu', 'secondMenu'])));
        if (this.adminSetting.linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value) {
            settingRecord.linkType = this.adminSetting.linkType;
            settingRecord.externalLink = null;
            settingRecord.viewComponent = true;
        }
        else {
            settingRecord.linkType = this.adminSetting.linkType;
            settingRecord.viewComponent = false;
            settingRecord.registeredModuleName = null;
        }
        if (!settingRecord.permissions) {
            settingRecord.permissions = [];
        }
        delete settingRecord.firstMenu;
        delete settingRecord.secondMenu;
        delete settingRecord.componentLabel;
        delete settingRecord.innovationStudio;
        delete settingRecord.application;
        return settingRecord;
    }
    isSettingActive() {
        return this.settingForm.get('innovationStudio').value || this.settingForm.get('application').value;
    }
    isInBundleSetting() {
        return this.adminSetting.linkType === RX_ADMINISTRATION.configurationSettingTypes.inbundle.value;
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    isDirty() {
        var _a;
        return this.settingForm.dirty || ((_a = this.rxPermissionEditorComponent) === null || _a === void 0 ? void 0 : _a.isDirty());
    }
}
/** @nocollapse */ AdminSettingEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingEditorComponent, deps: [{ token: i0.Injector }, { token: i1.DockedPanelContext }, { token: i2.FormBuilder }, { token: i3.TranslateService }, { token: i4.RxAdminSettingsService }, { token: i4.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AdminSettingEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminSettingEditorComponent, selector: "ax-admin-setting-editor", viewQueries: [{ propertyName: "rxPermissionEditorComponent", first: true, predicate: RxPermissionEditorComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"settingForm\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"component-name\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.component-name.label' | translate }}\"\n          formControlName=\"componentName\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"isInBundleSetting()\">\n      <div class=\"col-12\">\n        <rx-definition-picker\n          class=\"d-block form-group\"\n          [options]=\"viewDefinitionPickerOptions\"\n          formControlName=\"registeredModuleName\"\n          rx-id=\"view\"\n          required=\"true\"\n        >\n        </rx-definition-picker>\n      </div>\n    </div>\n    <div class=\"row\" *ngIf=\"!isInBundleSetting()\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"external-link\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.external-link.label' | translate }}\"\n          formControlName=\"externalLink\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-control-label\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.enable-access-from.label' | translate }}\"\n        ></adapt-rx-control-label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-checkbox\n          class=\"d-block form-group\"\n          formControlName=\"innovationStudio\"\n          rx-id=\"innovation-studio\"\n          label=\"Innovation Studio\"\n        ></adapt-rx-checkbox>\n        <adapt-rx-checkbox\n          class=\"d-block form-group\"\n          formControlName=\"application\"\n          rx-id=\"application\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.application.label' | translate }}\"\n        ></adapt-rx-checkbox>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <adapt-rx-textfield\n          class=\"d-block form-group\"\n          rx-id=\"component-label\"\n          label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.component-label.label' | translate }}\"\n          formControlName=\"componentLabel\"\n          required=\"true\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <rx-permission-editor\n          class=\"d-block form-group\"\n          [options]=\"permissionEditorOptions\"\n          rx-id=\"permissions\"\n          formControlName=\"permissions\"\n        >\n        </rx-permission-editor>\n      </div>\n    </div>\n    <div *ngIf=\"isSettingActive()\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            rx-id=\"first-menu\"\n            label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.first-menu.label' | translate }}\"\n            formControlName=\"firstMenu\"\n            required=\"true\"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <adapt-rx-textfield\n            class=\"d-block form-group\"\n            rx-id=\"second-menu\"\n            label=\"{{ 'com.bmc.arsys.rx.innovation-studio.configurations.second-menu.label' | translate }}\"\n            formControlName=\"secondMenu\"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    (click)=\"saveAdminSetting()\"\n    [disabled]=\"settingForm.pristine || settingForm.invalid\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" class=\"mr-2\" type=\"button\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i5.RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: ["options"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-admin-setting-editor',
                    templateUrl: './admin-setting-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.DockedPanelContext }, { type: i2.FormBuilder }, { type: i3.TranslateService }, { type: i4.RxAdminSettingsService }, { type: i4.RxNotificationService }]; }, propDecorators: { rxPermissionEditorComponent: [{
                type: ViewChild,
                args: [RxPermissionEditorComponent]
            }] } });
//# sourceMappingURL=admin-setting-editor.component.js.map