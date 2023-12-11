import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnectionTestStatus } from './connection-tester.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxConnectionTesterComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.status = ConnectionTestStatus.Unknown;
        this.buttonType = 'primary';
        this.testConnection = new EventEmitter();
    }
    onTestConnection() {
        this.status = ConnectionTestStatus.InProgress;
        this.testConnection.emit();
    }
    isConnectionTestFailed() {
        return this.status === ConnectionTestStatus.Failed;
    }
    isConnectionTestPassed() {
        return this.status === ConnectionTestStatus.Passed;
    }
    isTestConnectionButtonDisabled() {
        return this.status !== ConnectionTestStatus.Unknown;
    }
    isConnectionTestInProgress() {
        return this.status === ConnectionTestStatus.InProgress;
    }
}
RxConnectionTesterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxConnectionTesterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: { status: "status", buttonType: "buttonType" }, outputs: { testConnection: "testConnection" }, ngImport: i0, template: "<div class=\"align-items-baseline d-flex\">\n  <button\n    adapt-button\n    [btn-type]=\"buttonType\"\n    type=\"button\"\n    rx-id=\"test-connection-button\"\n    [adaptInlineLoader]=\"isConnectionTestInProgress()\"\n    activeText=\"{{ 'com.bmc.arsys.rx.client.common.connection-tester.connecting.label' | translate }}\"\n    (click)=\"onTestConnection()\"\n    [disabled]=\"isTestConnectionButtonDisabled()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.connection-tester.test-connection.button.label' | translate }}\n  </button>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestFailed()\"\n    [config]=\"{\n      content: translateService.instant('com.bmc.arsys.rx.client.common.connection-tester.connection-failed.message'),\n      variant: 'danger',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestPassed()\"\n    [config]=\"{\n      content: translateService.instant(\n        'com.bmc.arsys.rx.client.common.connection-tester.connection-succeeded.message'\n      ),\n      variant: 'success',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n</div>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-connection-tester',
                    templateUrl: './connection-tester.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { status: [{
                type: Input
            }], buttonType: [{
                type: Input
            }], testConnection: [{
                type: Output
            }] } });
//# sourceMappingURL=connection-tester.component.js.map