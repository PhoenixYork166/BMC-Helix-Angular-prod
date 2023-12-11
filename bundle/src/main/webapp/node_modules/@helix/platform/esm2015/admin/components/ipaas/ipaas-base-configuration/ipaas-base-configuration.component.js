import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { find, forEach, get, isFunction, map, values } from 'lodash';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { RxAdminSettingsService, RxNotificationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service/cognitive-service.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../../cognitive-service/cognitive-service.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@bmc-ux/adapt-angular";
export class IpaasBaseConfigurationComponent {
    constructor(rxAdminSettingsService, rxCognitiveServiceService, rxNotificationService, translateService) {
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxCognitiveServiceService = rxCognitiveServiceService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.connectionTestStatus = ConnectionTestStatus.Invalid;
    }
    ngAfterContentInit() {
        this.busy = this.getComponentSettings()
            .pipe(tap((componentSettings) => {
            this.isNewIpaasConfiguration = !get(componentSettings, 'values', []).length;
            if (this.isNewIpaasConfiguration) {
                this.componentSettings = map(values(this.ipaasConfig.settingNames), (settingName) => ({
                    assigneeGroupPermission: null,
                    componentName: this.ipaasConfig.componentName,
                    settingId: null,
                    settingName,
                    settingValue: null,
                    ownerKeyValue1: null
                }));
            }
            else {
                this.componentSettings = componentSettings.values;
                this.updateConfigFormValues();
            }
        }))
            .subscribe();
        this.childFormGroup.valueChanges
            .pipe(tap(() => {
            this.connectionTestStatus =
                this.childFormGroup.pristine || this.childFormGroup.invalid
                    ? ConnectionTestStatus.Invalid
                    : ConnectionTestStatus.Unknown;
        }))
            .subscribe();
    }
    updateConfigFormValues() {
        const savedValues = {};
        forEach(this.ipaasConfig.controlsConfig, (fieldValue, fieldName) => (savedValues[fieldName] = this.getValueFromSetting(fieldName)));
        if (isFunction(this.ipaasConfig.getFormValues)) {
            this.childFormGroup.patchValue(this.ipaasConfig.getFormValues(savedValues));
        }
        else {
            this.childFormGroup.patchValue(savedValues);
        }
    }
    onTestConnection() {
        this.rxCognitiveServiceService
            .testConnection(Object.assign({ resourceType: this.ipaasConfig.resourceType }, this.ipaasConfig.getPayload(this.childFormGroup.getRawValue())))
            .pipe(catchError((error) => {
            this.connectionTestStatus = ConnectionTestStatus.Failed;
            return throwError(error);
        }))
            .subscribe(() => {
            this.connectionTestStatus = ConnectionTestStatus.Passed;
        });
    }
    save() {
        if (this.childFormGroup.valid && this.connectionTestStatus === ConnectionTestStatus.Passed) {
            let adminSetting$;
            const payload = this.ipaasConfig.getPayload(this.childFormGroup.getRawValue());
            forEach(payload, (settingValue, settingName) => this.setSettingValue(settingName, settingValue));
            if (this.isNewIpaasConfiguration) {
                adminSetting$ = this.rxAdminSettingsService.createComponentSettings(this.ipaasConfig.componentName, this.componentSettings, {
                    'default-bundle-scope': this.ipaasConfig.bundleScope
                });
            }
            else {
                adminSetting$ = this.rxAdminSettingsService.updateComponentSettings(`${this.ipaasConfig.componentName}/${this.componentSettings[0].ownerKeyValue1}`, this.componentSettings, {
                    'default-bundle-scope': this.ipaasConfig.bundleScope
                });
            }
            this.busy = adminSetting$
                .pipe(tap(() => {
                this.rxNotificationService.addSuccessMessage(this.translateService.instant(this.ipaasConfig.saveMessageKey));
                this.connectionTestStatus = ConnectionTestStatus.Invalid;
                this.childFormGroup.markAsPristine();
            }), switchMap(() => this.getComponentSettings()), tap((response) => {
                this.isNewIpaasConfiguration = false;
                this.componentSettings = response.values;
                this.updateConfigFormValues();
            }))
                .subscribe();
        }
    }
    isSaveButtonDisabled() {
        return (this.childFormGroup.pristine ||
            this.childFormGroup.invalid ||
            this.connectionTestStatus !== ConnectionTestStatus.Passed);
    }
    getComponentSettings() {
        return this.rxAdminSettingsService.getComponentSettings(this.ipaasConfig.componentName, {
            'default-bundle-scope': this.ipaasConfig.bundleScope
        });
    }
    setSettingValue(settingName, value) {
        find(this.componentSettings, {
            settingName
        }).settingValue = value;
    }
    getValueFromSetting(settingName) {
        return get(find(this.componentSettings, {
            settingName
        }), 'settingValue', null);
    }
}
IpaasBaseConfigurationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationComponent, deps: [{ token: i1.RxAdminSettingsService }, { token: i2.RxCognitiveServiceService }, { token: i1.RxNotificationService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
IpaasBaseConfigurationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IpaasBaseConfigurationComponent, selector: "rx-ipaas-base-configuration", inputs: { ipaasConfig: "ipaasConfig", childFormGroup: "childFormGroup" }, ngImport: i0, template: "<rx-admin-settings [header]=\"ipaasConfig.titleKey | translate\" [busy]=\"busy\">\n  <ng-content> </ng-content>\n\n  <rx-connection-tester\n    class=\"d-block form-group\"\n    buttonType=\"secondary\"\n    [status]=\"connectionTestStatus\"\n    (testConnection)=\"onTestConnection()\"\n    rx-id=\"ipaas-configuration-test-button\"\n  ></rx-connection-tester>\n\n  <div class=\"align-items-baseline\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      [disabled]=\"isSaveButtonDisabled()\"\n      (click)=\"save()\"\n      rx-id=\"save-button\"\n      class=\"mt-3\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </div>\n</rx-admin-settings>\n", components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: ["status", "buttonType"], outputs: ["testConnection"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-ipaas-base-configuration',
                    templateUrl: './ipaas-base-configuration.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }, { type: i2.RxCognitiveServiceService }, { type: i1.RxNotificationService }, { type: i3.TranslateService }]; }, propDecorators: { ipaasConfig: [{
                type: Input
            }], childFormGroup: [{
                type: Input
            }] } });
//# sourceMappingURL=ipaas-base-configuration.component.js.map