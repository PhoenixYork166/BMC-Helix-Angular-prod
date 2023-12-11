import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RX_USER_MESSAGE } from './user-message.constants';
import { RxUserMessageService } from './user-message.service';
import { Subscription } from 'rxjs';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxUserMessageModalComponent } from './user-message-modal.component';
import { noop } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "./user-message.service";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class RxUserMessagesComponent {
    constructor(adaptModalService, rxUserMessageService, renderer) {
        this.adaptModalService = adaptModalService;
        this.rxUserMessageService = rxUserMessageService;
        this.renderer = renderer;
        this.subscription = new Subscription();
        this.loadingInProgress = false;
        this.activeMessage = {};
        this.RX_USER_MESSAGE = RX_USER_MESSAGE;
        this.activeMessage.count = 0;
        this.activeMessage.list = [];
    }
    ngOnInit() {
        this.subscription.add(this.rxUserMessageService.messageFetched$.subscribe(() => {
            const scrollPosition = this.scrollableNotifications
                ? this.renderer.selectRootElement(this.scrollableNotifications.nativeElement).scrollTop
                : null;
            if (!scrollPosition || this.loadingInProgress) {
                this.activeMessage = this.rxUserMessageService.userMessageModel.messages.active;
                this.loadingInProgress = false;
            }
        }));
        this.rxUserMessageService.launchMessagePolling();
    }
    getMoreMessages(event) {
        this.loadingInProgress = true;
        this.subscription.add(this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.active, true).subscribe());
        event.stopPropagation();
    }
    dismissMessage(message) {
        this.rxUserMessageService.dismissNotification(message);
    }
    viewAllMessages() {
        return this.adaptModalService
            .open({
            content: RxUserMessageModalComponent,
            data: {},
            size: 'lg'
        })
            .catch(noop);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxUserMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessagesComponent, deps: [{ token: i1.AdaptModalService }, { token: i2.RxUserMessageService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxUserMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessagesComponent, selector: "rx-user-messages", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"rx-container\">\n  <div class=\"title-section default-border d-flex\">\n    <div class=\"title d-inline\">{{ RX_USER_MESSAGE.title | translate }}</div>\n    <div class=\"buttons-wrapper ml-auto\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        (click)=\"viewAllMessages()\"\n        rx-id=\"view-all-messages\"\n      >\n        {{ RX_USER_MESSAGE.showAll | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        *ngIf=\"activeMessage.count\"\n        (click)=\"dismissMessage()\"\n        rx-id=\"dismiss-message\"\n      >\n        {{ RX_USER_MESSAGE.dismissAll | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div class=\"empty-holder\" *ngIf=\"activeMessage.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n\n  <div class=\"active-messages\" *ngIf=\"activeMessage.count\" #scrollableNotifications>\n    <div\n      class=\"item default-border\"\n      *ngFor=\"let message of activeMessage.list\"\n      [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n    >\n      <div class=\"item-content-section\">\n        <div class=\"item-content-inner-section d-flex align-items-center\">\n          <div class=\"item-icon-section d-icon-bell_o\"></div>\n          <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n          <div class=\"item-dismiss-section ml-auto\">\n            <button\n              *ngIf=\"!message.dismissInProgress\"\n              [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n              (click)=\"dismissMessage(message)\"\n              class=\"close\"\n              rx-id=\"x-button\"\n              type=\"button\"\n            ></button>\n\n            <div class=\"item-dismiss-preloader\">\n              <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n        <div class=\"item-content-date\">\n          {{ message['6'] | date: 'medium' }}\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"content-load-more\" *ngIf=\"loadingInProgress || activeMessage.count > activeMessage.list.length\">\n    <button\n      type=\"button\"\n      *ngIf=\"!loadingInProgress\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      (click)=\"getMoreMessages($event)\"\n      rx-id=\"show-more\"\n    >\n      {{ RX_USER_MESSAGE.loadMore | translate }}\n    </button>\n\n    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4.TranslatePipe, "date": i3.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessagesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-messages',
                    templateUrl: './user-messages.component.html',
                    styleUrls: ['user-messages.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i2.RxUserMessageService }, { type: i0.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                type: ViewChild,
                args: ['scrollableNotifications', { static: true }]
            }] } });
//# sourceMappingURL=user-messages.component.js.map