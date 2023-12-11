import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { FormBuilder, FormControl } from '@angular/forms';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { find, noop } from 'lodash';
import { RX_BUNDLE, RX_OVERLAY } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
export class CoarseGrainedCustomizationOptionsEditorComponent extends RxModalClass {
    constructor(formBuilder, rxModalService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.data = this.activeModalRef.getData();
        this.scopeSelectionOptions = this.data.scopeSelectionOptions;
        this.isDisabled = this.data.overlayOperation !== RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        this.initForm();
    }
    isDirty() {
        return this.customizationOptionsForm.dirty;
    }
    isPublic() {
        return this.customizationOptionsForm.get('scope').value[0].id === RX_BUNDLE.definitionScopeTypes.public;
    }
    optionFormatter(option) {
        return option.name;
    }
    submit() {
        if (this.isPublic()) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'If the definition scope is set to Public, it cannot be changed once the definition gets saved. Do you want to continue?'
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else if (this.data.definitionScopeName === RX_BUNDLE.definitionScopeNames.public) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'Changing the definition scope from Public to Application or Library can break upgrades. Do you want to continue?'
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else {
            this.closeModal();
        }
    }
    onScopeChange(rxSelectionChangeEvent) {
        if (rxSelectionChangeEvent.options[0].id === RX_BUNDLE.definitionScopes.application.type) {
            this.customizationOptionsForm.get('allowOverlay').setValue(false);
        }
    }
    closeModal() {
        const result = this.customizationOptionsForm.getRawValue();
        result.scope = result.scope[0].id;
        this.activeModalRef.close(result);
    }
    initForm() {
        const definitionScopeName = find(this.scopeSelectionOptions, (scopeType) => scopeType.name === this.data.definitionScopeName);
        this.customizationOptionsForm = this.formBuilder.group({
            scope: new FormControl([definitionScopeName]),
            allowOverlay: { value: this.data.allowOverlay || false, disabled: this.data.isDisabled }
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
CoarseGrainedCustomizationOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CoarseGrainedCustomizationOptionsEditorComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxModalService }, { token: i3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CoarseGrainedCustomizationOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CoarseGrainedCustomizationOptionsEditorComponent, selector: "rx-scope-customization-modal", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"customizationOptionsForm\" class=\"row\">\n    <div class=\"col-lg-5\">\n      <adapt-rx-select\n        label=\"Scope\"\n        rx-id=\"scope\"\n        [options]=\"scopeSelectionOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [disabled]=\"isDisabled || data.isDisabled\"\n        [tooltip]=\"{\n          iconName: 'question_circle_o',\n          content:\n            'If Scope is set to Application or Library, the definition will be available only to this application or library. If Scope is set to Public, the definition will be available to use by this and other applications and libraries.',\n          placement: 'bottom',\n          popoverMode: true\n        }\"\n        formControlName=\"scope\"\n        (onSelectionChange)=\"onScopeChange($event)\"\n      >\n      </adapt-rx-select>\n    </div>\n\n    <div class=\"col-lg-12\">\n      <h5>{{'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate}}</h5>\n      <adapt-rx-checkbox\n        label=\"{{'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n        | translate : { definitionType: data.definitionTypeDisplayName } }}\"\n        formControlName=\"allowOverlay\"\n        [disabled]=\"isDisabled || !isPublic()\"\n      >\n      </adapt-rx-checkbox>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!customizationOptionsForm.dirty\"\n    rx-id=\"save-button\"\n    (click)=\"submit()\"\n    type=\"button\"\n  >\n    Save\n  </button>\n\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">Cancel</button>\n</div>\n", components: [{ type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CoarseGrainedCustomizationOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-customization-modal',
                    templateUrl: './coarse-grained-customization-options-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxModalService }, { type: i3.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=coarse-grained-customization-options-editor.component.js.map