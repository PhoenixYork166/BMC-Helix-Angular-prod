import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { get, head } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { withLatestFrom, take, takeUntil } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RX_DATA_SOURCE_CONNECTIONS } from './data-source-connections.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/forms";
export class DataSourceConnectionGeneralComponent {
    constructor(rxWizardModalComponent, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.dataSourceConfigTypes = Object.values(RX_DATA_SOURCE_CONNECTIONS.resourceTypes).map((resourceType) => (Object.assign(Object.assign({}, resourceType), { name: this.translateService.instant(resourceType.name) })));
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.destroyed$ = new ReplaySubject(1);
        this.optionFormatter = (dataSourceOption) => {
            return get(dataSourceOption, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            this.generalForm = new FormGroup({
                dataSourceName: new FormControl(context.dataSourceName, [Validators.required]),
                resourceType: new FormControl([context.resourceType], [Validators.required])
            });
            if (this.generalForm.invalid) {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
        this.generalForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            this.rxWizardModalComponent.api.updateContext(Object.assign(Object.assign({}, value), { resourceType: head(value.resourceType), isGeneralFormPristine: this.generalForm.pristine }));
            if (this.generalForm.valid) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
DataSourceConnectionGeneralComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionGeneralComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
DataSourceConnectionGeneralComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceConnectionGeneralComponent, selector: "rx-data-source-connection-general", ngImport: i0, template: "<form [formGroup]=\"generalForm\">\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <adapt-rx-textfield\n        label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n        name=\"dataSourceName\"\n        formControlName=\"dataSourceName\"\n        rx-id=\"name-field\"\n        class=\"d-block form-group\"\n      >\n      </adapt-rx-textfield>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <adapt-rx-select\n        label=\"{{ 'com.bmc.arsys.rx.client.common.item-type.label' | translate }}\"\n        name=\"resourceType\"\n        class=\"d-block form-group\"\n        rx-id=\"type-field\"\n        formControlName=\"resourceType\"\n        [options]=\"dataSourceConfigTypes\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield,adapt-rx-select{max-width:400px}\n"], components: [{ type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionGeneralComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-data-source-connection-general',
                    templateUrl: './data-source-connection-general.component.html',
                    styleUrls: ['./data-source-connection-general.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=data-source-connection-general.component.js.map