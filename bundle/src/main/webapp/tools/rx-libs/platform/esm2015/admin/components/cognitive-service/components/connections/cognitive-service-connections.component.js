import { Component, Input } from '@angular/core';
import { RxJsonParserService } from '@helix/platform/utils';
import { assign, forIn, isEmpty, toLower, transform } from 'lodash';
import { RX_COGNITIVE_SERVICE } from '../../cognitive-service.constant';
import { MachineLearningProviderNames, RX_OVERLAY, RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { forkJoin, throwError } from 'rxjs';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { catchError, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "../../cognitive-service.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
export class CognitiveServiceConnectionsComponent {
    constructor(rxCognitiveServiceService, rxCurrentUserService, rxNotificationService, rxSystemConfigurationService, rxJsonParserService, translateService) {
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxNotificationService = rxNotificationService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxJsonParserService = rxJsonParserService;
        this.translateService = translateService;
        this.connectionInfo = RX_COGNITIVE_SERVICE.connections.payload;
        this.serviceDefinitions = RX_COGNITIVE_SERVICE.connections.serviceDefinitions;
        this.availableServicesList = [];
        this.connectionTestStatusesByServiceId = {};
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
        this.isFormFieldChanged = false;
        this.availableServices = {
            classification: true,
            discovery: true,
            toneAnalyzer: true
        };
    }
    ngOnInit() {
        this.rxSystemConfigurationService
            .queryConfiguration([
            RX_COGNITIVE_SERVICE.connections.systemSettingKeys.cognitiveServiceCredential,
            RX_COGNITIVE_SERVICE.connections.systemSettingKeys.classificationServiceProvider,
            RX_COGNITIVE_SERVICE.connections.systemSettingKeys.translationServiceProvider,
            RX_COGNITIVE_SERVICE.connections.systemSettingKeys.helixPortalUrl,
            RX_COGNITIVE_SERVICE.connections.systemSettingKeys.helixServiceCredential
        ])
            .pipe(finalize(() => this.loadServices()))
            .subscribe(([cognitiveServiceCredential, classificationServiceProvider, translationServiceProvider, helixPortalUrl, helixServiceCredential]) => {
            this.loadCognitiveSystemSettings(cognitiveServiceCredential);
            if (classificationServiceProvider.value === MachineLearningProviderNames.Helix) {
                this.loadHelixCognitiveSystemSettings(helixServiceCredential);
                this.connectionInfo[helixPortalUrl.id] = helixPortalUrl.value;
            }
            this.loadClassificationServiceProvider(classificationServiceProvider);
            this.loadRealTimeTranslationProviders(translationServiceProvider);
        });
    }
    isFormDirty() {
        return this.isFormFieldChanged;
    }
    loadServices() {
        this.availableServicesList = transform(this.serviceDefinitions, (result, value, key) => {
            if (this.availableServices[key]) {
                result.push(key);
            }
        }, []);
    }
    loadClassificationServiceProvider(provider) {
        if (this.isNativeClassificationProvider) {
            this.availableServices[this.serviceDefinitions.classification.id] = false;
            this.availableServices[this.serviceDefinitions.serviceAccountCredentials.id] = true;
            this.rxSystemConfigurationService
                .getConfiguration(RX_COGNITIVE_SERVICE.connections.systemSettingKeys.serviceAccountCredential)
                .subscribe((settingData) => {
                this.connectionInfo.serviceAccountCredentials = settingData.value;
            });
            return;
        }
        if (provider.value === MachineLearningProviderNames.Helix) {
            this.availableServices[this.serviceDefinitions.classification.id] = false;
            this.availableServices[this.serviceDefinitions.helixClassifier.id] = true;
        }
    }
    loadRealTimeTranslationProviders(settingsData) {
        const realTimeTranslationProvider = toLower(settingsData.value);
        if (realTimeTranslationProvider) {
            this.realTimeTranslationProvider = realTimeTranslationProvider;
            this.availableServices[this.serviceDefinitions[realTimeTranslationProvider].id] = true;
            this.rxSystemConfigurationService
                .getConfiguration(RX_COGNITIVE_SERVICE.connections.systemSettingKeys[realTimeTranslationProvider])
                .subscribe((settingData) => {
                if (realTimeTranslationProvider === this.serviceDefinitions.google.id) {
                    this.connectionInfo.apiKey = settingData.value;
                }
                else if (realTimeTranslationProvider === this.serviceDefinitions.microsoft.id) {
                    this.connectionInfo = assign(this.connectionInfo, this.rxJsonParserService.tryParseJson(settingData.value, {}));
                }
            });
        }
    }
    loadHelixCognitiveSystemSettings(settingsData) {
        var _a, _b;
        const credentials = this.rxJsonParserService.tryParseJson(settingsData.value);
        this.connectionInfo.helixClassifierKey = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.accessKey) !== null && _a !== void 0 ? _a : '';
        this.connectionInfo.helixClassifierSecret = (_b = credentials === null || credentials === void 0 ? void 0 : credentials.secretKey) !== null && _b !== void 0 ? _b : '';
    }
    loadCognitiveSystemSettings(settingsData) {
        const credentials = JSON.parse(settingsData.value)[RX_COGNITIVE_SERVICE.credentialsProvider];
        if (credentials) {
            forIn(credentials, (value, key) => {
                this.connectionInfo[key] = credentials[key];
            });
        }
    }
    isConnectionTestStatusInvalid(form) {
        return (!(this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared) ||
            form.invalid ||
            form.pristine);
    }
    getConnectionTestPayload(serviceId, serviceForm) {
        const serviceDefinition = this.serviceDefinitions[serviceId];
        if (!serviceDefinition.isApiKeyTest) {
            const isGoogleServiceId = serviceId === this.serviceDefinitions.google.id;
            return {
                credential: isGoogleServiceId ? serviceForm.value[serviceDefinition.model] : JSON.stringify(serviceForm.value),
                resourceType: 'com.bmc.arsys.rx.application.cognitive.command.PingTranslationServiceCommand'
            };
        }
        // Get the fields that are supposed to be sent as credentials
        const editableFields = serviceDefinition.fields.filter((field) => !field.readonly);
        if (editableFields.length === 1) {
            // use the model name as the apiKey
            return {
                apiKey: serviceForm.value[serviceDefinition.model],
                serviceType: serviceDefinition.serviceType,
                resourceType: 'com.bmc.arsys.rx.application.cognitive.command.PingCognitiveServiceCommand'
            };
        }
        // If more than one field, username and passowrd are required to test the connection
        const [usernameField, passwordField] = editableFields.map((field) => field.name);
        return {
            userName: serviceForm.value[usernameField],
            password: serviceForm.value[passwordField],
            serviceType: serviceDefinition.serviceType,
            resourceType: 'com.bmc.arsys.rx.application.cognitive.command.PingCognitiveServiceCommand'
        };
    }
    resetConnectionTest(serviceId, form) {
        this.connectionTestStatus = ConnectionTestStatus.Unknown;
        this.isFormFieldChanged = form.dirty;
        this.connectionTestStatusesByServiceId[serviceId] = this.isConnectionTestStatusInvalid(form)
            ? ConnectionTestStatus.Invalid
            : ConnectionTestStatus.Unknown;
    }
    onTestConnection(serviceId, form) {
        const connectionTestPayload = this.getConnectionTestPayload(serviceId, form);
        this.rxCognitiveServiceService
            .testConnection(connectionTestPayload)
            .pipe(catchError((error) => {
            this.connectionTestStatusesByServiceId[serviceId] = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatusesByServiceId[serviceId] = ConnectionTestStatus.Passed;
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    save() {
        const settingsPayload = [];
        if (this.isNativeClassificationProvider &&
            this.connectionTestStatusesByServiceId[this.serviceDefinitions.serviceAccountCredentials.id] ===
                ConnectionTestStatus.Passed &&
            !(this.connectionTestStatusesByServiceId[this.serviceDefinitions.classification.id] ===
                ConnectionTestStatus.Passed ||
                this.connectionTestStatusesByServiceId[this.serviceDefinitions.discovery.id] === ConnectionTestStatus.Passed ||
                this.connectionTestStatusesByServiceId[this.serviceDefinitions.toneAnalyzer.id] ===
                    ConnectionTestStatus.Passed ||
                (this.realTimeTranslationProvider &&
                    this.connectionTestStatusesByServiceId[this.serviceDefinitions[this.realTimeTranslationProvider].id] ===
                        ConnectionTestStatus.Passed))) {
            settingsPayload.push({
                name: RX_COGNITIVE_SERVICE.connections.systemSettingKeys.serviceAccountCredential,
                value: JSON.stringify(JSON.parse(this.connectionInfo[this.serviceDefinitions.serviceAccountCredentials.id]))
            });
        }
        else {
            if (this.realTimeTranslationProvider &&
                this.connectionTestStatusesByServiceId[this.serviceDefinitions[this.realTimeTranslationProvider].id] ===
                    ConnectionTestStatus.Passed) {
                const fields = this.serviceDefinitions[this.realTimeTranslationProvider].fields;
                settingsPayload.push({
                    name: RX_COGNITIVE_SERVICE.connections.systemSettingKeys[this.realTimeTranslationProvider],
                    value: this.realTimeTranslationProvider === this.serviceDefinitions.google.id
                        ? this.connectionInfo[fields[0].name]
                        : JSON.stringify(transform(fields, (result, value) => {
                            const fieldName = value['name'];
                            return (result[fieldName] = this.connectionInfo[fieldName]);
                        }, {}))
                });
            }
            const cognitiveCredentials = transform(RX_COGNITIVE_SERVICE.connections.cognitiveServiceCredentialKeys, (result, value, key) => {
                if (this.connectionTestStatusesByServiceId[this.serviceDefinitions[key].id] === ConnectionTestStatus.Passed) {
                    return (result[value] = this.connectionInfo[value]);
                }
            }, {});
            if (!isEmpty(cognitiveCredentials)) {
                settingsPayload.push({
                    name: RX_COGNITIVE_SERVICE.connections.systemSettingKeys.cognitiveServiceCredential,
                    value: JSON.stringify({
                        [RX_COGNITIVE_SERVICE.credentialsProvider]: cognitiveCredentials
                    })
                });
            }
        }
        const { helixClassifier } = this.serviceDefinitions;
        if (helixClassifier && this.connectionTestStatusesByServiceId[helixClassifier.id] === ConnectionTestStatus.Passed) {
            settingsPayload.push({
                name: RX_COGNITIVE_SERVICE.connections.systemSettingKeys.helixServiceCredential,
                value: JSON.stringify({
                    accessKey: this.connectionInfo.helixClassifierKey,
                    secretKey: this.connectionInfo.helixClassifierSecret
                })
            });
        }
        forkJoin(settingsPayload.map((settingPayload) => this.rxSystemConfigurationService.setConfiguration(settingPayload.name, settingPayload.value))).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant(RX_COGNITIVE_SERVICE.notificationMessages.serviceConnectionSaved));
            this.connectionTestStatus = ConnectionTestStatus.Invalid;
            this.connectionTestStatusesByServiceId = {};
            this.isFormFieldChanged = false;
        });
    }
    isSaveButtonDisabled() {
        return this.connectionTestStatus !== ConnectionTestStatus.Passed;
    }
    isSaveButtonVisible() {
        return (this.isAdministrator &&
            this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
}
CognitiveServiceConnectionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceConnectionsComponent, deps: [{ token: i1.RxCognitiveServiceService }, { token: i2.RxCurrentUserService }, { token: i2.RxNotificationService }, { token: i2.RxSystemConfigurationService }, { token: i3.RxJsonParserService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CognitiveServiceConnectionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CognitiveServiceConnectionsComponent, selector: "rx-cognitive-service-connections", inputs: { isAdministrator: "isAdministrator", currentOverlayContext: "currentOverlayContext", isNativeClassificationProvider: "isNativeClassificationProvider" }, ngImport: i0, template: "<adapt-accordion multiselect=\"true\">\n  <form *ngFor=\"let serviceId of availableServicesList\" #serviceForm=\"ngForm\">\n    <adapt-accordion-tab\n      [title]=\"serviceDefinitions[serviceId].title | translate\"\n      [isOpen]=\"serviceDefinitions[serviceId].isOpen\"\n      [attr.rx-id]=\"serviceDefinitions[serviceId].id\"\n      class=\"mb-3\"\n    >\n      <div *ngFor=\"let field of serviceDefinitions[serviceId].fields\" class=\"form-group\">\n        <adapt-rx-textfield\n          [name]=\"field.name\"\n          [(ngModel)]=\"connectionInfo[field.name]\"\n          [attr.rx-id]=\"field.rxId\"\n          [label]=\"field.label | translate\"\n          [required]=\"field.required\"\n          *ngIf=\"field.type === 'password'\"\n          maxlength=\"254\"\n          [isPassword]=\"true\"\n          (ngModelChange)=\"resetConnectionTest(serviceId, serviceForm)\"\n          class=\"d-block\"\n        >\n        </adapt-rx-textfield>\n\n        <adapt-rx-textfield\n          [name]=\"field.name\"\n          [(ngModel)]=\"connectionInfo[field.name]\"\n          [attr.rx-id]=\"field.rxId\"\n          [label]=\"field.label | translate\"\n          [required]=\"field.required\"\n          [disabled]=\"field.readonly\"\n          *ngIf=\"field.type === 'text'\"\n          [pattern]=\"field.pattern\"\n          (ngModelChange)=\"resetConnectionTest(serviceId, serviceForm)\"\n          class=\"d-block\"\n        >\n        </adapt-rx-textfield>\n\n        <adapt-rx-textarea\n          [name]=\"field.name\"\n          [(ngModel)]=\"connectionInfo[field.name]\"\n          [attr.rx-id]=\"field.rxId\"\n          [label]=\"field.label | translate\"\n          [required]=\"field.required\"\n          *ngIf=\"field.type === 'json'\"\n          (ngModelChange)=\"resetConnectionTest(serviceId, serviceForm)\"\n          rows=\"6\"\n          class=\"d-block\"\n          [rxJson]=\"{\n            errorMessage: field.jsonValidatorErrorMessage\n          }\"\n        ></adapt-rx-textarea>\n      </div>\n\n      <rx-connection-tester\n        class=\"mt-1\"\n        [status]=\"connectionTestStatusesByServiceId[serviceId]\"\n        (testConnection)=\"onTestConnection(serviceId, serviceForm)\"\n      ></rx-connection-tester>\n    </adapt-accordion-tab>\n  </form>\n\n  <button\n    adapt-button\n    rx-id=\"save-button\"\n    btn-type=\"primary\"\n    class=\"mt-4\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    *ngIf=\"isSaveButtonVisible()\"\n    (click)=\"save()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n</adapt-accordion>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i5.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i5.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i5.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i8.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i3.RxJsonValidator, selector: "[rxJson]", inputs: ["rxJson"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CognitiveServiceConnectionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-cognitive-service-connections',
                    templateUrl: './cognitive-service-connections.component.html',
                    styleUrls: ['./cognitive-service-connections.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxCognitiveServiceService }, { type: i2.RxCurrentUserService }, { type: i2.RxNotificationService }, { type: i2.RxSystemConfigurationService }, { type: i3.RxJsonParserService }, { type: i4.TranslateService }]; }, propDecorators: { isAdministrator: [{
                type: Input
            }], currentOverlayContext: [{
                type: Input
            }], isNativeClassificationProvider: [{
                type: Input
            }] } });
//# sourceMappingURL=cognitive-service-connections.component.js.map