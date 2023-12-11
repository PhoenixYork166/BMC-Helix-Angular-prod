import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxCurrentUserService } from '@helix/platform/shared/api';
import { get } from 'lodash';
import { switchMap } from 'rxjs/operators';
import { RX_USER_PREFERENCES } from './user-preferences.constants';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class RxUserPreferencesComponent {
    constructor(activeModalRef, rxCurrentUserService, rxRecordInstanceDataPageService, rxRecordInstanceService, translateService) {
        this.activeModalRef = activeModalRef;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.selectedLocale = [];
        this.supportedLocales = RX_USER_PREFERENCES.supportedLocales;
        this.optionFormatter = (option) => {
            return get(option, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        this.init();
    }
    init() {
        this.preferredLocale = this.rxCurrentUserService.getPreferredLocale();
        this.isAbleToChangeLocale = !this.preferredLocale;
        if (this.isAbleToChangeLocale) {
            this.queryInProgress = true;
            this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: RX_USER_PREFERENCES.userPreference.recordDefinitionName,
                    queryExpression: "('" +
                        RX_USER_PREFERENCES.userPreference.fieldIds.name +
                        '\' = "' +
                        RX_USER_PREFERENCES.preferenceNames.locale +
                        '" AND \'' +
                        RX_USER_PREFERENCES.userPreference.fieldIds.loginName +
                        '\' = "' +
                        this.rxCurrentUserService.getName() +
                        '")',
                    propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id]
                }
            })
                .pipe(switchMap((dataPageResult) => {
                if (dataPageResult.totalSize) {
                    return this.rxRecordInstanceService.get(RX_USER_PREFERENCES.userPreference.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id]);
                }
                else {
                    return this.rxRecordInstanceService.getNew(RX_USER_PREFERENCES.userPreference.recordDefinitionName);
                }
            }))
                .subscribe((recordInstance) => {
                this.recordInstance = recordInstance;
                const selectedLocaleId = this.recordInstance.getFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value);
                this.selectedLocale = [this.supportedLocales.find((locale) => locale.id === selectedLocaleId)];
                this.queryInProgress = false;
            });
        }
        else {
            this.selectedLocale = [this.supportedLocales.find((locale) => locale.id === this.preferredLocale)];
        }
    }
    applyUserPreferences() {
        let save$;
        this.queryInProgress = true;
        const selectedLocaleId = get(this.selectedLocale, '[0].id', '');
        this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value, selectedLocaleId);
        if (this.recordInstance.id) {
            save$ = this.rxRecordInstanceService.save(this.recordInstance);
        }
        else {
            this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.name, RX_USER_PREFERENCES.preferenceNames.locale);
            this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.loginName, this.rxCurrentUserService.getName());
            save$ = this.rxRecordInstanceService.create(this.recordInstance);
        }
        save$.subscribe(() => {
            this.queryInProgress = false;
            this.activeModalRef.close();
        });
    }
    cancel() {
        this.activeModalRef.dismiss();
    }
}
RxUserPreferencesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxCurrentUserService }, { token: i3.RxRecordInstanceDataPageService }, { token: i3.RxRecordInstanceService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxUserPreferencesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserPreferencesComponent, selector: "rx-user-preferences", ngImport: i0, template: "<rx-line-loader\n  *ngIf=\"queryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<div [hidden]=\"queryInProgress\" class=\"modal-body\">\n  <form name=\"userPreferencesForm\" novalidate #userPreferencesForm=\"ngForm\">\n    <adapt-rx-select\n      [disabled]=\"!isAbleToChangeLocale || queryInProgress\"\n      [emptyOption]=\"true\"\n      [name]=\"'userPreference'\"\n      [(ngModel)]=\"selectedLocale\"\n      [label]=\"'com.bmc.arsys.rx.client.shell.user-preferences-dialog.language.label' | translate\"\n      [optionFormatter]=\"optionFormatter\"\n      [options]=\"supportedLocales\"\n      rx-id=\"preferred-language\"\n    >\n    </adapt-rx-select>\n    <p class=\"text-danger align-start\" *ngIf=\"!isAbleToChangeLocale\">\n      <span class=\"alert-content\">\n        {{ 'com.bmc.arsys.rx.client.shell.user-preferences-dialog.validation.error.message' | translate }}\n      </span>\n    </p>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!userPreferencesForm.dirty\"\n    (click)=\"applyUserPreferences()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i5.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-preferences',
                    templateUrl: './user-preferences.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxCurrentUserService }, { type: i3.RxRecordInstanceDataPageService }, { type: i3.RxRecordInstanceService }, { type: i4.TranslateService }]; } });
//# sourceMappingURL=user-preferences.component.js.map