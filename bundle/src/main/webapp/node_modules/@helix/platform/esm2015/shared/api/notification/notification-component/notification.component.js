import { ChangeDetectorRef, Component } from '@angular/core';
import { AdaptMessageService } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import { RxNotificationService } from '../notification.service';
import { RxSessionService } from '../../security/session.service';
import * as i0 from "@angular/core";
import * as i1 from "../notification.service";
import * as i2 from "../../security/session.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
export class RxNotificationComponent {
    constructor(rxNotificationService, rxSessionService, translateService, changeDetector, adaptMessageService) {
        this.rxNotificationService = rxNotificationService;
        this.rxSessionService = rxSessionService;
        this.translateService = translateService;
        this.changeDetector = changeDetector;
        this.adaptMessageService = adaptMessageService;
    }
    ngOnInit() {
        this.rxNotificationService.messages$.subscribe((notificationMessage) => {
            const issueData = Object.assign(Object.assign({}, notificationMessage.data), { severity: notificationMessage.severity });
            const link = issueData.enableIssueReporting && this.rxSessionService.isAlive()
                ? this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label')
                : null;
            this.adaptMessageService.add(Object.assign(Object.assign({}, notificationMessage), { link, linkHandler: () => {
                    this.rxNotificationService.reportIssue(issueData);
                } }));
            this.changeDetector.detectChanges();
        });
    }
}
RxNotificationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationComponent, deps: [{ token: i1.RxNotificationService }, { token: i2.RxSessionService }, { token: i3.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i4.AdaptMessageService }], target: i0.ɵɵFactoryTarget.Component });
RxNotificationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNotificationComponent, selector: "rx-notification", ngImport: i0, template: "<adapt-toast placement=\"top-right\"></adapt-toast>\n", styles: ["adapt-toast{word-break:break-word}:host::ng-deep .a-toast__detail{white-space:pre-wrap}\n"], components: [{ type: i4.AdaptToastComponent, selector: "adapt-toast", inputs: ["link", "appendToBody", "aria-label", "aria-labelledby", "tabindex", "testID", "id", "placement", "adaptRadarDisableEventSending"], outputs: ["linkClick", "onAnimationEnd"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNotificationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-notification',
                    templateUrl: './notification.component.html',
                    styleUrls: ['./notification.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNotificationService }, { type: i2.RxSessionService }, { type: i3.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i4.AdaptMessageService }]; } });
//# sourceMappingURL=notification.component.js.map