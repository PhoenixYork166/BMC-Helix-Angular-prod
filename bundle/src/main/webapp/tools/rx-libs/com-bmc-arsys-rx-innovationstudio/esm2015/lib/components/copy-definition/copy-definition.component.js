import { Component, Injector, ViewChild } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RX_RESOURCE_URLS, RxDefinitionNameService, RxGlobalCacheService, RxNotificationService, RxOverlayService } from '@helix/platform/shared/api';
import { castArray } from 'lodash';
import { finalize, map, startWith, tap } from 'rxjs/operators';
import { copyDefinitionTypeMap, RX_COPY_DEFINITION } from './copy-definition.types';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RxModalClass } from '@helix/platform/ui-kit';
import { NgForm } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@angular/router";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/common/http";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class CopyDefinitionComponent extends RxModalClass {
    constructor(activeModalRef, rxOverlayService, rxGlobalCacheService, rxNotificationService, router, translateService, rxDefinitionNameService, httpClient, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxOverlayService = rxOverlayService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxNotificationService = rxNotificationService;
        this.router = router;
        this.translateService = translateService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.httpClient = httpClient;
        this.injector = injector;
        this.targetBundle = [];
        this.autoFocusTargetBundleField = true;
        this.config = this.activeModalRef.getData();
        this.definitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.config.definitionName);
        this.bundles$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(startWith([]), map((bundleDescriptors) => bundleDescriptors
            .filter((bundleDescriptor) => ![
            RX_APPLICATION.settingsBundleId,
            RX_APPLICATION.standardlib,
            RX_APPLICATION.innovationStudioBundleId,
            RX_APPLICATION.platformBundleId
        ].includes(bundleDescriptor.id) && this.rxOverlayService.areNewDefinitionsAllowedSync(bundleDescriptor))
            .sort((bundle, bundleToCompare) => bundle.friendlyName.localeCompare(bundleToCompare.friendlyName))), tap((bundleDescriptors) => {
            const sourceBundleDescriptor = bundleDescriptors.find((bundle) => bundle.id === this.rxDefinitionNameService.getBundleId(this.config.definitionName));
            if (sourceBundleDescriptor) {
                this.targetBundle = castArray(sourceBundleDescriptor);
                this.autoFocusTargetBundleField = false;
            }
        }));
    }
    isDirty() {
        return this.selectBundleForm.dirty;
    }
    optionFormatter(bundleDescriptor) {
        return bundleDescriptor.friendlyName;
    }
    copyDefinition() {
        const targetDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.targetBundle[0].id, this.definitionDisplayName);
        this.allowDismiss = false;
        this.httpClient
            .post(RX_RESOURCE_URLS.command, {
            resourceType: RX_COPY_DEFINITION.resourceType,
            type: copyDefinitionTypeMap[this.config.definitionType],
            srcName: this.config.definitionName,
            destName: targetDefinitionName
        })
            .pipe(finalize(() => {
            this.allowDismiss = true;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.definition-copied.message'));
            this.activeModalRef.close();
            this.router.navigate([
                RX_APPLICATION.innovationStudioBundleId,
                this.config.definitionType,
                this.config.editFragment || 'edit',
                targetDefinitionName
            ]);
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
/** @nocollapse */ CopyDefinitionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxOverlayService }, { token: i2.RxGlobalCacheService }, { token: i2.RxNotificationService }, { token: i3.Router }, { token: i4.TranslateService }, { token: i2.RxDefinitionNameService }, { token: i5.HttpClient }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CopyDefinitionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CopyDefinitionComponent, selector: "ax-copy-definition", viewQueries: [{ propertyName: "selectBundleForm", first: true, predicate: ["selectBundleForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.copy-definition.label' | translate }}\n  </h5>\n  <button\n    class=\"close dp-close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <form #selectBundleForm=\"ngForm\">\n    <adapt-rx-select\n      [autofocus]=\"autoFocusTargetBundleField\"\n      rx-id=\"application-name\"\n      required\n      name=\"targetBundle\"\n      [(ngModel)]=\"targetBundle\"\n      [options]=\"bundles$ | async\"\n      [optionFormatter]=\"optionFormatter\"\n      [disabled]=\"!allowDismiss\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.copy-definition.target-application.label' | translate }}\"\n      class=\"mb-3\"\n    >\n    </adapt-rx-select>\n    <adapt-rx-textfield\n      [autofocus]=\"!autoFocusTargetBundleField\"\n      rx-id=\"definition-name\"\n      class=\"mb-6\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.definition-name.label' | translate }}\"\n      name=\"definition\"\n      required\n      [(ngModel)]=\"definitionDisplayName\"\n      [disabled]=\"!allowDismiss\"\n    >\n    </adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    (click)=\"copyDefinition()\"\n    [disabled]=\"selectBundleForm.pristine || selectBundleForm.invalid || !allowDismiss\"\n    rx-id=\"ok-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4.TranslatePipe, "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CopyDefinitionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-copy-definition',
                    templateUrl: './copy-definition.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxOverlayService }, { type: i2.RxGlobalCacheService }, { type: i2.RxNotificationService }, { type: i3.Router }, { type: i4.TranslateService }, { type: i2.RxDefinitionNameService }, { type: i5.HttpClient }, { type: i0.Injector }]; }, propDecorators: { selectBundleForm: [{
                type: ViewChild,
                args: ['selectBundleForm']
            }] } });
//# sourceMappingURL=copy-definition.component.js.map