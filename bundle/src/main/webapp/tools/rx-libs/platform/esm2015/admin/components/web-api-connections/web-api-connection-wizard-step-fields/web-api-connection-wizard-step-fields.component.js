import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { get, some } from 'lodash';
import { NgForm } from '@angular/forms';
import { RX_WEB_API_CONNECTIONS } from '../web-api-connections.constant';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
export class WebApiConnectionWizardStepFieldsComponent {
    constructor(rxUrlUtilsService, translateService) {
        this.rxUrlUtilsService = rxUrlUtilsService;
        this.translateService = translateService;
        this.selectionChange = new EventEmitter();
        this.formStatusChange = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.optionFormatter = (option) => {
            return get(option, 'label', this.defaultSelection);
        };
    }
    onRadioButtonChange(event, field) {
        if (event.startsWith(RX_WEB_API_CONNECTIONS.authServerEndpoints.default)) {
            this.stepDetails[field.name] = null;
        }
    }
    getSelectionValue(selectedValue, field) {
        return this.translateService.instant(selectedValue.label, {
            hostName: this.webApiConnection[field.referenceFieldName]
        });
    }
    validate(field) {
        return (control) => {
            let result = null;
            if (field.isUrl && control.value) {
                const urls = control.value.split(/[,;]/);
                if (some(urls, (url) => !this.rxUrlUtilsService.isValidUrl(url, true))) {
                    result = { invalidUrl: { message: 'Invalid URL.' } };
                }
            }
            return result;
        };
    }
    ngOnInit() {
        this.authEndpoint = this.stepDetails['authServerEndpoint']
            ? RX_WEB_API_CONNECTIONS.authServerEndpoints.custom
            : RX_WEB_API_CONNECTIONS.authServerEndpoints.default;
        this.configurationForm.statusChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((value) => {
            this.step.isValid = value === 'VALID';
            this.formStatusChange.emit();
        });
        this.configurationForm.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((value) => {
            this.step.isDirty = !this.configurationForm.pristine;
            this.formStatusChange.emit();
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
WebApiConnectionWizardStepFieldsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionWizardStepFieldsComponent, deps: [{ token: i1.RxUrlUtilsService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
WebApiConnectionWizardStepFieldsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: WebApiConnectionWizardStepFieldsComponent, selector: "rx-web-api-connection-wizard-step-fields", inputs: { step: "step", webApiConnection: "webApiConnection", stepDetails: "stepDetails" }, outputs: { selectionChange: "selectionChange", formStatusChange: "formStatusChange" }, viewQueries: [{ propertyName: "configurationForm", first: true, predicate: ["configurationForm"], descendants: true, read: NgForm, static: true }], ngImport: i0, template: "<form [name]=\"step.formName\" #configurationForm=\"ngForm\">\n  <ng-container *ngFor=\"let field of step.fields\">\n    <adapt-rx-select\n      [name]=\"field.name\"\n      [label]=\"field.label | translate\"\n      class=\"d-block form-group\"\n      rx-id=\"field.rxId\"\n      [options]=\"field.selectOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [required]=\"field.required\"\n      *ngIf=\"field.type === 'select'\"\n      [disabled]=\"field.disabled\"\n      (ngModelChange)=\"selectionChange.emit({ selection: $event, fieldName: field.name })\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      [name]=\"field.name\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [required]=\"field.required\"\n      [attr.rx-id]=\"field.rxId\"\n      [label]=\"field.label | translate\"\n      class=\"d-block form-group\"\n      *ngIf=\"field.type === 'text' || field.type === 'password'\"\n      [isPassword]=\"field.type === 'password'\"\n      [placeholder]=\"field.placeholder\"\n      [rxCustomValidators]=\"validate(field)\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-counter\n      [name]=\"field.name\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [required]=\"field.required\"\n      [attr.rx-id]=\"field.rxId\"\n      [label]=\"field.label | translate\"\n      class=\"d-block form-group\"\n      [adaptMin]=\"field.minValue\"\n      [adaptMax]=\"field.maxValue\"\n      *ngIf=\"field.type === 'number' && field.allowIntegerOnly\"\n      [placeholder]=\"field.placeholder\"\n      adaptIntegerNumber\n    >\n    </adapt-rx-counter>\n\n    <adapt-rx-counter\n      [name]=\"field.name\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [required]=\"field.required\"\n      [attr.rx-id]=\"field.rxId\"\n      [label]=\"field.label | translate\"\n      class=\"d-block form-group\"\n      [adaptMin]=\"field.minValue\"\n      [adaptMax]=\"field.maxValue\"\n      *ngIf=\"field.type === 'number' && field.allowScientific\"\n      [placeholder]=\"field.placeholder\"\n      adaptScientificNumber\n    >\n    </adapt-rx-counter>\n\n    <rx-name-value-pairs-editor\n      addButtonLabel=\"{{ field.label | translate }}\"\n      *ngIf=\"field.type === 'nameValuePairs'\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [name]=\"field.name\"\n    >\n    </rx-name-value-pairs-editor>\n\n    <adapt-rx-radiobutton-group\n      *ngIf=\"field.type === 'radio'\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [name]=\"field.name\"\n      [label]=\"field.label | translate\"\n    >\n      <adapt-rx-radiobutton\n        *ngFor=\"let selectionValue of field.selectOptions\"\n        [value]=\"selectionValue.value\"\n        [label]=\"getSelectionValue(selectionValue, field)\"\n      >\n      </adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-radiobutton-group\n      *ngIf=\"field.type === 'serverEndpointRadio'\"\n      [(ngModel)]=\"authEndpoint\"\n      [name]=\"field.name\"\n      [label]=\"field.label | translate\"\n      [tooltip]=\"{\n        iconName: 'question_circle_o',\n        content: field.tooltip | translate,\n        placement: 'auto',\n        popoverMode: true\n      }\"\n      (ngModelChange)=\"onRadioButtonChange($event, field)\"\n    >\n      <adapt-rx-radiobutton\n        *ngFor=\"let selectionValue of field.selectOptions\"\n        [value]=\"selectionValue.value\"\n        [label]=\"getSelectionValue(selectionValue, field)\"\n      >\n      </adapt-rx-radiobutton>\n    </adapt-rx-radiobutton-group>\n\n    <adapt-rx-textfield\n      name=\"url\"\n      *ngIf=\"field.type === 'serverEndpointRadio'\"\n      [disabled]=\"authEndpoint != 'Custom'\"\n      [(ngModel)]=\"stepDetails[field.name]\"\n      [placeholder]=\"field.placeholder | translate\"\n      [required]=\"field.required\"\n      [attr.rx-id]=\"field.rxId\"\n      class=\"d-block form-group\"\n    >\n    </adapt-rx-textfield>\n  </ng-container>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-select,adapt-rx-textfield,adapt-rx-counter{max-width:400px}\n"], components: [{ type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i4.RxNameValuePairsEditorComponent, selector: "rx-name-value-pairs-editor", inputs: ["addButtonLabel"] }, { type: i3.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i3.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i3.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i3.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i3.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i3.AdaptScientificNumberValidatorDirective, selector: "[adaptScientificNumber][ngModel], [adaptScientificNumber][formControl]", inputs: ["adaptScientificNumberMessageFn"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiConnectionWizardStepFieldsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-web-api-connection-wizard-step-fields',
                    templateUrl: './web-api-connection-wizard-step-fields.component.html',
                    styleUrls: ['./web-api-connection-wizard-step-fields.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxUrlUtilsService }, { type: i2.TranslateService }]; }, propDecorators: { step: [{
                type: Input
            }], webApiConnection: [{
                type: Input
            }], configurationForm: [{
                type: ViewChild,
                args: ['configurationForm', { read: NgForm, static: true }]
            }], selectionChange: [{
                type: Output
            }], formStatusChange: [{
                type: Output
            }], stepDetails: [{
                type: Input
            }] } });
//# sourceMappingURL=web-api-connection-wizard-step-fields.component.js.map