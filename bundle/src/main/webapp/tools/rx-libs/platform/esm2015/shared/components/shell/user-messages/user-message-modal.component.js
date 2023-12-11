import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RX_USER_MESSAGE } from './user-message.constants';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxUserMessageService } from './user-message.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "./user-message.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/common";
export class RxUserMessageModalComponent {
    constructor(context, rxUserMessageService, translateService, renderer) {
        this.context = context;
        this.rxUserMessageService = rxUserMessageService;
        this.translateService = translateService;
        this.renderer = renderer;
        this.loadingInProgress = false;
        this.RX_USER_MESSAGE = RX_USER_MESSAGE;
        this.messages = {
            active: {
                type: '',
                count: 0,
                list: [],
                queryExpr: '',
                loadingInProgress: false
            },
            dismissed: {
                type: '',
                count: 0,
                list: [],
                queryExpr: '',
                loadingInProgress: false
            }
        };
    }
    ngOnInit() {
        this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.dismissed).subscribe(() => {
            this.messages = this.rxUserMessageService.userMessageModel.messages;
        });
        this.messageSubscription = this.rxUserMessageService.messageFetched$.subscribe(() => {
            const scrollPosition = this.scrollableNotifications
                ? this.renderer.selectRootElement(this.scrollableNotifications.nativeElement).scrollTop
                : null;
            if (!scrollPosition || this.loadingInProgress) {
                this.loadingInProgress = false;
                this.messages = this.rxUserMessageService.userMessageModel.messages;
            }
        });
    }
    getMoreMessages(messageType, event) {
        this.loadingInProgress = true;
        this.rxUserMessageService.getMessages(messageType, true).subscribe();
        event.stopPropagation();
    }
    dismissMessage(message) {
        this.rxUserMessageService.dismissNotification(message);
    }
    getContentTitleText(key, count) {
        let contentTitleText;
        switch (key) {
            case RX_USER_MESSAGE.messageTypes.active:
                contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.active.label';
                break;
            case RX_USER_MESSAGE.messageTypes.dismissed:
                contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.dismissed.label';
                break;
        }
        return this.translateService.instant(contentTitleText, { count });
    }
    closeModal() {
        this.context.close(true);
    }
    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }
}
RxUserMessageModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxUserMessageService }, { token: i3.TranslateService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxUserMessageModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessageModalComponent, selector: "rx-user-message-modal", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ RX_USER_MESSAGE.title | translate }}</h5>\n  <button class=\"close dp-close\" type=\"button\" (click)=\"context.close(false)\" rx-id=\"x-button\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"rx-container\">\n    <div class=\"active-messages\" *ngIf=\"messages.active.count || messages.dismissed.count\" #scrollableNotifications>\n      <div *ngFor=\"let messagesType of messages | keyvalue\">\n        <div class=\"content-title\">\n          {{ getContentTitleText(messagesType.key, messagesType.value.count) }}\n        </div>\n\n        <div *ngIf=\"!messagesType.value.count\" class=\"empty-holder\" [ngSwitch]=\"messagesType.key\">\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.active\">{{\n            'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label' | translate\n          }}</span>\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.dismissed\">{{\n            'com.bmc.arsys.rx.client.shell.notification.dismissed.noNotifications.label' | translate\n          }}</span>\n        </div>\n\n        <div *ngIf=\"messagesType.value.count\">\n          <div\n            class=\"item\"\n            *ngFor=\"let message of messagesType.value.list\"\n            [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n          >\n            <div class=\"item-content-section\">\n              <div class=\"item-content-inner-section d-flex align-items-center flex-wrap\">\n                <div class=\"item-icon-section d-icon-bell_o\"></div>\n                <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n                <div class=\"item-dismiss-section ml-auto\" *ngIf=\"messagesType.key === RX_USER_MESSAGE.messageTypes.active\">\n                  <button\n                    *ngIf=\"!message.dismissInProgress\"\n                    [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n                    (click)=\"dismissMessage(message)\"\n                    class=\"close\"\n                    rx-id=\"x-button\"\n                    type=\"button\"\n                  ></button>\n\n                  <div class=\"item-dismiss-preloader\">\n                    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n              <div class=\"item-content-date\">\n                {{ message['6'] | date: 'medium' }}\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div\n          class=\"content-load-more\"\n          *ngIf=\"loadingInProgress || messagesType.value.count > messagesType.value.list.length\"\n        >\n          <button\n            type=\"button\"\n            *ngIf=\"!loadingInProgress\"\n            adapt-button\n            btn-type=\"tertiary\"\n            size=\"small\"\n            (click)=\"getMoreMessages(messagesType.key, $event)\"\n            rx-id=\"show-more\"\n          >\n            {{ RX_USER_MESSAGE.loadMore | translate }}\n          </button>\n\n          <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"empty-holder\" *ngIf=\"messages.active.count === 0 && messages.dismissed.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <adapt-button btn-type=\"primary\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </adapt-button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:0}.rx-container{width:100%!important;max-width:100%!important}.content-title{height:48px;line-height:48px;padding:0 18px;font-size:14px;font-weight:var(--font-weight-bold);border-left:none;border-right:none;border-top:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8}.empty-holder{height:100px;line-height:100px;text-align:center}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n", ":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i3.TranslatePipe, "keyvalue": i4.KeyValuePipe, "date": i4.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-message-modal',
                    templateUrl: './user-message-modal.component.html',
                    styleUrls: ['./user-message-modal.component.scss', './user-messages.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxUserMessageService }, { type: i3.TranslateService }, { type: i0.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                type: ViewChild,
                args: ['scrollableNotifications', { static: true }]
            }] } });
//# sourceMappingURL=user-message-modal.component.js.map