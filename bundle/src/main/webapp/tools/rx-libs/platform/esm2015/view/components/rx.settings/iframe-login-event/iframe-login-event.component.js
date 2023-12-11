import { Component } from '@angular/core';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RX_IFRAME_LOGIN_EVENT } from './iframe-login-event.constant';
import * as i0 from "@angular/core";
export class IframeLoginEventComponent extends BaseViewComponent {
    ngOnInit() {
        var _a;
        (_a = window.opener) === null || _a === void 0 ? void 0 : _a.postMessage(RX_IFRAME_LOGIN_EVENT.eventMessage, '*');
    }
}
IframeLoginEventComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
IframeLoginEventComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IframeLoginEventComponent, selector: "com-bmc-arsys-rx-settings-iframe-login-event", usesInheritance: true, ngImport: i0, template: "<img\n  src=\"/com.bmc.arsys.rx.settings/resources/images/login-successful.gif\"\n  alt=\"Login successful\"\n  class=\"login-verification\"\n/>\n", styles: [".login-verification{top:50%;left:50%;position:fixed;transform:translate(-50%,-50%);width:670px}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IframeLoginEventComponent, decorators: [{
            type: Component,
            args: [{
                    // This is for retro compatibility to reuse the same view "com.bmc.arsys.rx.settings:BMCLoginVerification".
                    // tslint:disable-next-line:component-selector
                    selector: 'com-bmc-arsys-rx-settings-iframe-login-event',
                    templateUrl: './iframe-login-event.component.html',
                    styleUrls: ['./iframe-login-event.component.scss']
                }]
        }] });
//# sourceMappingURL=iframe-login-event.component.js.map