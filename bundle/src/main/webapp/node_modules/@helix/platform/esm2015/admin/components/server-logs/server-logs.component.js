import { Component, HostBinding } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxServerLogsService } from './server-logs.service';
import { RxNotificationService, RxServerErrorHandlerService } from '@helix/platform/shared/api';
import { RX_SERVER_LOGS } from './server-logs.constant';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RxFileService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "./server-logs.service";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@angular/common";
import * as i7 from "@ngx-translate/core";
export class ServerLogsAdminComponent extends BaseViewComponent {
    constructor(formBuilder, rxNotificationService, rxServerErrorHandlerService, rxServerLogsService) {
        super();
        this.formBuilder = formBuilder;
        this.rxNotificationService = rxNotificationService;
        this.rxServerErrorHandlerService = rxServerErrorHandlerService;
        this.rxServerLogsService = rxServerLogsService;
        this.hostClass = 'd-block col-md-9 p-0';
    }
    getServerLogsConfig() {
        this.busy = this.rxServerLogsService.getConfig().subscribe((serverLogsConfig) => {
            this.serverLogsForm.patchValue(serverLogsConfig);
        });
    }
    toggleAdditionalLogTypes() {
        this.shouldDisplayAdditionalLogTypes = !this.shouldDisplayAdditionalLogTypes;
    }
    save() {
        const formValue = this.serverLogsForm.getRawValue();
        this.rxServerLogsService.save(formValue).subscribe(() => {
            this.rxNotificationService.addSuccessMessage('Server Logs configuration saved successfully.');
            this.serverLogsForm.markAsPristine();
        });
    }
    downloadLogs() {
        this.isDownloadInProgress = true;
        this.rxServerLogsService
            .downloadServerLogs({
            fileNames: ['server', 'License']
        })
            .subscribe((data) => {
            RxFileService.saveFile(data);
            this.isDownloadInProgress = false;
        }, (error) => {
            error.data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(error.error)));
            this.rxServerErrorHandlerService.handle(error);
            this.isDownloadInProgress = false;
        });
    }
    get autoTurnOffDuration() {
        return this.serverLogsForm.get('autoTurnOffDuration').value;
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.serverLogsForm.dirty
        });
        this.serverLogsForm = this.formBuilder.group(RX_SERVER_LOGS.defaultFormConfig);
        this.getServerLogsConfig();
    }
}
ServerLogsAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsAdminComponent, deps: [{ token: i1.FormBuilder }, { token: i2.RxNotificationService }, { token: i2.RxServerErrorHandlerService }, { token: i3.RxServerLogsService }], target: i0.ɵɵFactoryTarget.Component });
ServerLogsAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ServerLogsAdminComponent, selector: "rx-admin-server-logs", host: { properties: { "class": "this.hostClass" } }, usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.header.title' | translate }}\" [busy]=\"busy\">\n  <form [formGroup]=\"serverLogsForm\">\n    <div>\n      <h6 class=\"dt\">{{ 'com.bmc.arsys.rx.client.admin.server-logs.capture-logs.title' | translate }}</h6>\n      <div class=\"d-flex p-0 logs-duration\" rx-id=\"logs-duration\">\n        <adapt-rx-counter\n          formControlName=\"autoTurnOffDuration\"\n          min=\"1\"\n          adaptIntegerNumber\n        >\n        </adapt-rx-counter>\n        <span class=\"p-2\">{{ 'com.bmc.arsys.rx.client.admin.server-logs.minutes.label' | translate }}</span>\n      </div>\n      <div *ngIf=\"autoTurnOffDuration < 1\" class=\"adapt-mt-error\">\n        {{ 'com.bmc.arsys.rx.client.admin.server-logs.minimum-of-one-minute.label' | translate }}\n      </div>\n    </div>\n\n    <div>\n      <h6 class=\"dt\">{{ 'com.bmc.arsys.rx.client.admin.server-logs.log-types-to-be-captured.title' | translate }}</h6>\n      <adapt-rx-checkbox\n        formControlName=\"ruleLogOn\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.rule.label' | translate }}\"\n      ></adapt-rx-checkbox>\n      <adapt-rx-checkbox\n        formControlName=\"timedRuleLogOn\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.escalation.label' | translate }}\"\n      ></adapt-rx-checkbox>\n      <adapt-rx-checkbox\n        formControlName=\"processLogOn\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.process.label' | translate }}\"\n      ></adapt-rx-checkbox>\n    </div>\n\n    <div rx-id=\"show-additional-log\" (click)=\"toggleAdditionalLogTypes()\" class=\"btn-link alert-link pt-2\">\n      {{\n        (shouldDisplayAdditionalLogTypes\n          ? 'com.bmc.arsys.rx.client.admin.server-logs.show-less.label'\n          : 'com.bmc.arsys.rx.client.admin.server-logs.show-more.label'\n        ) | translate\n      }}\n    </div>\n\n    <div *ngIf=\"shouldDisplayAdditionalLogTypes\">\n      <h6 class=\"dt\">\n        {{ 'com.bmc.arsys.rx.client.admin.server-logs.additional-log-types-to-be-captured.title' | translate }}\n      </h6>\n      <adapt-rx-checkbox\n        formControlName=\"sqlLogOn\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.sql.label' | translate }}\"\n      ></adapt-rx-checkbox>\n      <adapt-rx-checkbox\n        formControlName=\"apiLogOn\"\n        label=\"{{ 'com.bmc.arsys.rx.client.admin.server-logs.api.label' | translate }}\"\n      ></adapt-rx-checkbox>\n    </div>\n\n    <div class=\"mt-4 d-flex\">\n      <button\n        type=\"submit\"\n        adapt-button\n        btn-type=\"primary\"\n        [disabled]=\"serverLogsForm.pristine || autoTurnOffDuration < 1\"\n        (click)=\"save()\"\n        rx-id=\"save-button\"\n        class=\"mr-3\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"secondary\"\n        [adaptInlineLoader]=\"isDownloadInProgress\"\n        activeText=\"Downloading...\"\n        (click)=\"downloadLogs()\"\n        rx-id=\"download-button\"\n      >\n        {{ 'com.bmc.arsys.rx.client.admin.server-logs.download-logs.label' | translate }}\n      </button>\n    </div>\n  </form>\n</rx-admin-settings>\n", styles: [".logs-duration{max-width:200px}\n"], components: [{ type: i4.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i5.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i5.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ServerLogsAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-server-logs',
                    templateUrl: './server-logs.component.html',
                    styleUrls: ['./server-logs.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.RxNotificationService }, { type: i2.RxServerErrorHandlerService }, { type: i3.RxServerLogsService }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=server-logs.component.js.map