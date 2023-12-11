import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { filter, find, get, groupBy, omit } from 'lodash';
import { forkJoin, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { RxCognitiveServiceService } from '../cognitive-service/cognitive-service.service';
import { RxCustomDataSourceProviderDataPageService } from './custom-data-source-provider-data-page.service';
import { RX_DATA_SOURCE_CONNECTIONS } from './data-source-connections.constant';
import * as i0 from "@angular/core";
import * as i1 from "../cognitive-service/cognitive-service.service";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "./custom-data-source-provider-data-page.service";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/ui-kit";
import * as i9 from "./custom-data-source-provider-picker/custom-data-source-provider-picker.component";
import * as i10 from "@angular/forms";
import * as i11 from "@angular/common";
export class DataSourceConnectionPropertiesComponent {
    constructor(rxCognitiveServiceService, rxRecordInstanceDataPageService, rxCustomDataSourceProviderDataPageService, rxDefinitionNameService, rxWizardModalComponent, translateService, rxGlobalCacheService) {
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxCustomDataSourceProviderDataPageService = rxCustomDataSourceProviderDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.isRasPasswordDisabled = true;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
        this.webApis = [];
        this.customDataSourceProvidersPickerOptions = {
            label: 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.custom-data-source-provider.label',
            required: true,
            providersTree: []
        };
        this.dataSourceAuthenticationTypes = RX_DATA_SOURCE_CONNECTIONS.authTypes.map((authType) => (Object.assign(Object.assign({}, authType), { name: this.translateService.instant(authType.name) })));
        this.isResourceTypeArSystem$ = this.rxWizardModalComponent.context$.pipe(map((context) => context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.arSystem.value), shareReplay(1));
        this.isResourceTypeCustom$ = this.rxWizardModalComponent.context$.pipe(map((context) => context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value), shareReplay(1));
        this.isResourceTypeWebApi$ = this.rxWizardModalComponent.context$.pipe(map((context) => context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value), shareReplay(1));
        this.destroyed$ = new ReplaySubject(1);
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.isDataLoaded = {};
        this.optionFormatter = (dataSourceOption) => get(dataSourceOption, 'name', this.defaultSelection);
    }
    ngOnInit() {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            this.connectionPropertiesForm = new FormGroup({
                hostName: new FormControl(context.hostName, [Validators.required]),
                port: new FormControl(context.port, [Validators.required]),
                authType: new FormControl(context.authType, [Validators.required]),
                rasPassword: new FormControl(context.rasPassword),
                enforceAuthorization: new FormControl(context.enforceAuthorization),
                selectedWebApi: new FormControl(context.webApiDataSourceGuid, [Validators.required]),
                providerId: new FormControl(context.providerId, [Validators.required])
            });
        });
        this.rxWizardModalComponent.context$.pipe(takeUntil(this.destroyed$)).subscribe((context) => {
            const arSystemControls = ['hostName', 'port', 'authType', 'rasPassword', 'enforceAuthorization'];
            if (context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.arSystem.value) {
                arSystemControls.forEach((control) => this.connectionPropertiesForm.get(control).enable({ emitEvent: false }));
                this.connectionPropertiesForm.get('selectedWebApi').disable({ emitEvent: false });
                this.connectionPropertiesForm.get('providerId').disable({ emitEvent: false });
            }
            else if (context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value) {
                arSystemControls.forEach((control) => this.connectionPropertiesForm.get(control).disable({ emitEvent: false }));
                this.connectionPropertiesForm.get('selectedWebApi').enable({ emitEvent: false });
                this.connectionPropertiesForm.get('providerId').disable({ emitEvent: false });
            }
            else if (context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value) {
                arSystemControls.forEach((control) => this.connectionPropertiesForm.get(control).disable({ emitEvent: false }));
                this.connectionPropertiesForm.get('selectedWebApi').disable({ emitEvent: false });
                this.connectionPropertiesForm.get('providerId').enable({ emitEvent: false });
            }
            this.loadCustomDataSourceProviders(context);
            this.loadWebApis(context);
            if (this.connectionPropertiesForm.valid && !context.isGeneralFormPristine) {
                this.rxWizardModalComponent.api.enableFinishButton();
            }
            else {
                this.rxWizardModalComponent.api.disableFinishButton();
            }
        });
        this.connectionPropertiesForm.valueChanges
            .pipe(withLatestFrom(this.isResourceTypeWebApi$), takeUntil(this.destroyed$))
            .subscribe(([value, isResourceTypeWebApi]) => {
            this.rxWizardModalComponent.api.updateContext(omit(value, ['selectedWebApi']));
            if (!isResourceTypeWebApi) {
                this.connectionTestStatus =
                    this.connectionPropertiesForm.pristine || this.connectionPropertiesForm.invalid
                        ? ConnectionTestStatus.Invalid
                        : ConnectionTestStatus.Unknown;
            }
        });
        this.connectionPropertiesForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([_, context]) => {
            if (this.connectionPropertiesForm.invalid ||
                (this.connectionPropertiesForm.pristine && context.isGeneralFormPristine)) {
                this.rxWizardModalComponent.api.disableFinishButton();
            }
            else {
                this.rxWizardModalComponent.api.enableFinishButton();
            }
        });
    }
    setAuthType(type) {
        const newContext = {
            authType: type
        };
        this.isRasPasswordDisabled = type !== RX_DATA_SOURCE_CONNECTIONS.authTypes[1].name;
        if (this.isRasPasswordDisabled) {
            newContext.rasPassword = null;
        }
        this.rxWizardModalComponent.api.updateContext(newContext);
    }
    onTestConnection() {
        this.rxWizardModalComponent.context$
            .pipe(switchMap((context) => this.rxCognitiveServiceService.testConnection({
            resourceType: RX_DATA_SOURCE_CONNECTIONS.pingConfigurationCommand,
            dataSource: {
                resourceType: RX_DATA_SOURCE_CONNECTIONS.resourceTypes.arSystem.value,
                authType: context.authType,
                hostName: context.hostName,
                port: context.port,
                rasPassword: context.rasPassword,
                enforceAuthorization: context.enforceAuthorization
            }
        })), catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    loadCustomDataSourceProviders(context) {
        if (context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value &&
            !this.isDataLoaded[RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value]) {
            const globalLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.global-items.label');
            this.isDataLoaded[RX_DATA_SOURCE_CONNECTIONS.resourceTypes.custom.value] = true;
            this.rxCustomDataSourceProviderDataPageService
                .get()
                .pipe(switchMap((dataPage) => forkJoin(dataPage.data.map((customDataSourceProvider) => {
                const bundleId = this.rxDefinitionNameService.getBundleId(customDataSourceProvider.name) || globalLabel;
                return this.rxGlobalCacheService.getBundleFriendlyName(bundleId, bundleId).pipe(map((bundleFriendlyName) => ({
                    bundleFriendlyName,
                    value: customDataSourceProvider.name
                })));
            }))))
                .subscribe((providers) => {
                var _a;
                const customDataSourceProvidersByBundleFriendlyName = groupBy(providers, 'bundleFriendlyName');
                this.customDataSourceProvidersPickerOptions.providersTree = Object.keys(customDataSourceProvidersByBundleFriendlyName)
                    .map((bundleFriendlyName) => ({
                    label: bundleFriendlyName,
                    isExpanded: true,
                    providers: customDataSourceProvidersByBundleFriendlyName[bundleFriendlyName]
                        .map((provider) => provider.value)
                        .sort()
                }))
                    .sort((provider1, provider2) => {
                    if (provider1.label === globalLabel) {
                        return -1;
                    }
                    return provider1.label > provider2.label ? 1 : -1;
                });
                this.connectionPropertiesForm
                    .get('providerId')
                    .setValue((_a = find(providers, (provider) => provider.value === context.providerId)) === null || _a === void 0 ? void 0 : _a.value, {
                    emitEvent: false
                });
            });
        }
    }
    loadWebApis(context) {
        if (context.resourceType.value === RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value &&
            !this.isDataLoaded[RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value]) {
            const params = {
                recorddefinition: 'WebAPI Connection'
            };
            this.isDataLoaded[RX_DATA_SOURCE_CONNECTIONS.resourceTypes.webApi.value] = true;
            this.rxRecordInstanceDataPageService.post({ params }).subscribe((result) => {
                this.webApis = result.data.map((webApi) => ({
                    name: webApi[RX_RECORD_DEFINITION.coreFieldIds.description],
                    id: webApi[RX_RECORD_DEFINITION.coreFieldIds.id]
                }));
                this.connectionPropertiesForm
                    .get('selectedWebApi')
                    .setValue(filter(this.webApis, ['id', context.webApiDataSourceGuid]), { emitEvent: false });
            });
        }
    }
    onWebApiChange(event) {
        this.rxWizardModalComponent.api.updateContext({
            webApiDataSourceGuid: event.options[0].id
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
DataSourceConnectionPropertiesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionPropertiesComponent, deps: [{ token: i1.RxCognitiveServiceService }, { token: i2.RxRecordInstanceDataPageService }, { token: i3.RxCustomDataSourceProviderDataPageService }, { token: i4.RxDefinitionNameService }, { token: i5.RxWizardModalComponent }, { token: i6.TranslateService }, { token: i4.RxGlobalCacheService }], target: i0.ɵɵFactoryTarget.Component });
DataSourceConnectionPropertiesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataSourceConnectionPropertiesComponent, selector: "rx-data-source-connection-properties", ngImport: i0, template: "<form [formGroup]=\"connectionPropertiesForm\">\n  <ng-container *ngIf=\"isResourceTypeArSystem$ | async\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-textfield\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.host-name.label' | translate }}\"\n          name=\"hostName\"\n          formControlName=\"hostName\"\n          rx-id=\"host-name-field\"\n          class=\"d-block form-group\"\n          maxlength=\"254\"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-counter\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.port.label' | translate }}\"\n          name=\"port\"\n          adaptRange\n          [formControl]=\"connectionPropertiesForm.controls.port\"\n          [min]=\"0\"\n          [max]=\"65535\"\n          adaptIntegerNumber\n          rx-id=\"port-field\"\n          class=\"d-block form-group\"\n        >\n        </adapt-rx-counter>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-radiobutton-group\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.data-source-connection-properties.authentication.label' | translate\n          }}\"\n          name=\"authType\"\n          rx-id=\"authentication-field\"\n          formControlName=\"authType\"\n          (ngModelChange)=\"setAuthType($event)\"\n        >\n          <adapt-rx-radiobutton\n            *ngFor=\"let selectionValue of dataSourceAuthenticationTypes\"\n            [value]=\"selectionValue.name\"\n            [label]=\"selectionValue.name\"\n          >\n          </adapt-rx-radiobutton>\n        </adapt-rx-radiobutton-group>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-textfield\n          formControlName=\"rasPassword\"\n          [isPassword]=\"true\"\n          name=\"password\"\n          rx-id=\"password-field\"\n          class=\"d-block form-group\"\n          [disabled]=\"isRasPasswordDisabled\"\n        >\n        </adapt-rx-textfield>\n      </div>\n      <div class=\"col-md-6\">\n        <adapt-rx-checkbox\n          name=\"permission\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.data-source-connection-properties.use-current-user-permissions.label'\n              | translate\n          }}\"\n          rx-id=\"permission-field\"\n          formControlName=\"enforceAuthorization\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content: 'com.bmc.arsys.rx.client.admin.data-source-connection-properties.permission.tooltip' | translate,\n            placement: 'top',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-8 mt-2\">\n        <rx-connection-tester\n          buttonType=\"secondary\"\n          [status]=\"connectionTestStatus\"\n          (testConnection)=\"onTestConnection()\"\n          rx-id=\"test-connection-button\"\n        ></rx-connection-tester>\n      </div>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"isResourceTypeCustom$ | async\">\n    <div class=\"row\">\n      <rx-custom-data-source-provider-picker\n        class=\"col-md-6\"\n        name=\"providerId\"\n        formControlName=\"providerId\"\n        rx-id=\"custom-data-source-provider-field\"\n        [options]=\"customDataSourceProvidersPickerOptions\"\n      ></rx-custom-data-source-provider-picker>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"isResourceTypeWebApi$ | async\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <adapt-rx-select\n          label=\"{{\n            'com.bmc.arsys.rx.client.admin.data-source-connection-properties.web-api-connection.label' | translate\n          }}\"\n          name=\"webApiConnection\"\n          class=\"d-block form-group\"\n          rx-id=\"web-api-connection-field\"\n          [options]=\"webApis\"\n          formControlName=\"selectedWebApi\"\n          (onSelectionChange)=\"onWebApiChange($event)\"\n          [optionFormatter]=\"optionFormatter\"\n        >\n        </adapt-rx-select>\n      </div>\n    </div>\n  </ng-container>\n</form>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield,adapt-rx-select,adapt-rx-counter{max-width:400px}\n"], components: [{ type: i7.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i7.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i7.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i7.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i7.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i8.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i9.RxCustomDataSourceProviderPickerComponent, selector: "rx-custom-data-source-provider-picker", inputs: ["options"] }, { type: i7.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i10.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i10.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i10.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i10.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i7.AdaptRangeValidatorDirective, selector: "[adaptRange][ngModel],[adaptRange][formControl]", inputs: ["adaptRange", "adaptRangeMessageFn"] }, { type: i7.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i10.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i11.AsyncPipe, "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataSourceConnectionPropertiesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-data-source-connection-properties',
                    templateUrl: './data-source-connection-properties.component.html',
                    styleUrls: ['./data-source-connection-properties.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCognitiveServiceService }, { type: i2.RxRecordInstanceDataPageService }, { type: i3.RxCustomDataSourceProviderDataPageService }, { type: i4.RxDefinitionNameService }, { type: i5.RxWizardModalComponent }, { type: i6.TranslateService }, { type: i4.RxGlobalCacheService }]; } });
//# sourceMappingURL=data-source-connection-properties.component.js.map