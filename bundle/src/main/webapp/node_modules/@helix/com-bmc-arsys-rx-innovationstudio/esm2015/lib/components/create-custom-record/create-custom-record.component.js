import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordDefinitionService, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxBundleCacheService, RX_APPLICATION } from '@helix/platform/shared/api';
import { finalize, startWith } from 'rxjs/operators';
import { RxExternalDataService } from '../../services/external-data/external-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "../../services/external-data/external-data.service";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/shared/api";
import * as i6 from "@angular/router";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
export class CreateCustomRecordComponent extends RxModalClass {
    constructor(injector, formBuilder, activeModalRef, rxExternalDataService, rxRecordDefinitionService, rxDefinitionNameService, rxBundleCache, router) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.formBuilder = formBuilder;
        this.activeModalRef = activeModalRef;
        this.rxExternalDataService = rxExternalDataService;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCache = rxBundleCache;
        this.router = router;
        this.initForm();
        this.customDataSourceNames$ = this.rxExternalDataService
            .getDataSourceNames(RX_RECORD_DEFINITION.externalRecordDefinitionTypes.custom)
            .pipe(startWith([]));
    }
    submit() {
        const createCustomRecordFormValue = this.createCustomRecordForm.value;
        const recordDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.rxBundleCache.bundleId, createCustomRecordFormValue.name);
        const customRecordDefinition = {
            name: recordDefinitionName,
            dataSourceName: createCustomRecordFormValue.dataSourceName[0],
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.external.recordDefinitionType,
            fieldDefinitions: [
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Display ID',
                    id: 1,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'ID',
                    id: 379,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Data Provider ID',
                    id: 380,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.required
                }
            ]
        };
        this.allowDismiss = false;
        this.rxRecordDefinitionService
            .create(customRecordDefinition)
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'edit', recordDefinitionName]);
        });
    }
    cancel() {
        this.dismissDialog();
    }
    initForm() {
        this.createCustomRecordForm = this.formBuilder.group({
            name: this.formBuilder.control(null, [Validators.required]),
            dataSourceName: this.formBuilder.control(null, [Validators.required])
        });
    }
}
/** @nocollapse */ CreateCustomRecordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordComponent, deps: [{ token: i0.Injector }, { token: i1.FormBuilder }, { token: i2.ActiveModalRef }, { token: i3.RxExternalDataService }, { token: i4.RxRecordDefinitionService }, { token: i5.RxDefinitionNameService }, { token: i5.RxBundleCacheService }, { token: i6.Router }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateCustomRecordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateCustomRecordComponent, selector: "ax-create-custom-record", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.create-custom-record-modal.title' | translate }}\n  </h5>\n  <button\n    class=\"close close-inverse\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <form [formGroup]=\"createCustomRecordForm\">\n    <adapt-rx-textfield\n      autofocus\n      rx-id=\"name\"\n      class=\"d-block form-group\"\n      name=\"name\"\n      formControlName=\"name\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n    ></adapt-rx-textfield>\n    <adapt-rx-select\n      rx-id=\"data-source-name\"\n      class=\"form-group\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.create-custom-record-modal.data-source-name.label' | translate }}\"\n      name=\"dataSourceName\"\n      formControlName=\"dataSourceName\"\n      [disabled]=\"!allowDismiss\"\n      [options]=\"customDataSourceNames$ | async\"\n    ></adapt-rx-select>\n  </form>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"createCustomRecordForm.pristine || createCustomRecordForm.invalid || !allowDismiss\"\n    (click)=\"submit()\"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i7.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateCustomRecordComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-create-custom-record',
                    templateUrl: './create-custom-record.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.FormBuilder }, { type: i2.ActiveModalRef }, { type: i3.RxExternalDataService }, { type: i4.RxRecordDefinitionService }, { type: i5.RxDefinitionNameService }, { type: i5.RxBundleCacheService }, { type: i6.Router }]; } });
//# sourceMappingURL=create-custom-record.component.js.map