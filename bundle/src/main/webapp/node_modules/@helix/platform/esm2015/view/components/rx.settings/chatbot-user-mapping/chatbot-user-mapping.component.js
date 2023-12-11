import { Component } from '@angular/core';
import { RxCommandFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { catchError, take } from 'rxjs/operators';
import { RX_CHATBOT_USER_MAPPING } from './chatbot-user-mapping.constant';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
export class ChatbotUserMappingComponent extends BaseViewComponent {
    constructor(translateService, rxCommandFactoryService, rxNotificationService) {
        super();
        this.translateService = translateService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxNotificationService = rxNotificationService;
        this.encryptedChatUserAndChatId = null;
        this.chatbotProvider = null;
        this.isMappingInProgress = false;
        this.message = '';
        this.mappingStatus = '';
    }
    ngOnInit() {
        this.isMappingInProgress = false;
        this.config.pipe(take(1)).subscribe((config) => {
            this.encryptedChatUserAndChatId = config.encryptedChatUserAndChatId;
            this.chatbotProvider = config.chatbotProvider;
            if (!this.encryptedChatUserAndChatId) {
                this.mappingStatus = RX_CHATBOT_USER_MAPPING.mappingStatus.missingParameters;
                this.rxNotificationService.addErrorMessage(this.translateService.instant(RX_CHATBOT_USER_MAPPING.messages.missingParameters));
            }
            else {
                this.mappingStatus = RX_CHATBOT_USER_MAPPING.mappingStatus.pending;
            }
            this.updateMessage();
        });
    }
    isMappingButtonVisible() {
        return this.mappingStatus === RX_CHATBOT_USER_MAPPING.mappingStatus.pending;
    }
    mapUser() {
        this.isMappingInProgress = true;
        this.mappingStatus = RX_CHATBOT_USER_MAPPING.mappingStatus.inProgress;
        this.updateMessage();
        const commandPayload = {
            encryptedChatUserAndChatId: this.encryptedChatUserAndChatId,
            chatbotProvider: this.chatbotProvider
        };
        this.rxCommandFactoryService
            .forResourceType(RX_CHATBOT_USER_MAPPING.commands.createUserMapping)
            .execute(commandPayload)
            .pipe(catchError((error) => {
            this.mappingStatus = RX_CHATBOT_USER_MAPPING.mappingStatus.failed;
            this.updateMessage();
            this.isMappingInProgress = false;
            return throwError(error);
        }))
            .subscribe(() => {
            this.mappingStatus = RX_CHATBOT_USER_MAPPING.mappingStatus.success;
            this.updateMessage();
            this.isMappingInProgress = false;
        });
    }
    updateMessage() {
        this.message = this.translateService.instant(RX_CHATBOT_USER_MAPPING.messages[this.mappingStatus]);
    }
}
ChatbotUserMappingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxCommandFactoryService }, { token: i2.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
ChatbotUserMappingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ChatbotUserMappingComponent, selector: "com-bmc-arsys-rx-user-mapping", usesInheritance: true, ngImport: i0, template: "<div class=\"text-center mt-1 container\">\n  <div>\n    <span class=\"text-logo\">{{ 'com.bmc.arsys.rx.settings.title' | translate }}</span>\n  </div>\n  <div class=\"mt-4\">{{ message }}</div>\n  <div>\n    <button\n      rx-id=\"verify-bmc-cloud-account\"\n      class=\"mt-4\"\n      adapt-button\n      btn-type=\"primary\"\n      size=\"large\"\n      type=\"button\"\n      [disabled]=\"isMappingInProgress\"\n      (click)=\"mapUser()\"\n      [hidden]=\"!isMappingButtonVisible()\"\n    >\n      {{ 'com.bmc.arsys.rx.settings.verify-cloud-account' | translate }}\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.container{width:400px;margin:auto}.text-logo{font-size:var(--h1-font-size)}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotUserMappingComponent, decorators: [{
            type: Component,
            args: [{
                    // This is for retro compatibility to reuse the same view "com.bmc.arsys.rx.settings:BMCCloudVerification".
                    // tslint:disable-next-line:component-selector
                    selector: 'com-bmc-arsys-rx-user-mapping',
                    templateUrl: './chatbot-user-mapping.component.html',
                    styleUrls: ['./chatbot-user-mapping.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxCommandFactoryService }, { type: i2.RxNotificationService }]; } });
//# sourceMappingURL=chatbot-user-mapping.component.js.map