import { Component } from '@angular/core';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { RxOverlayService } from '@helix/platform/shared/api';
import { HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@helix/platform/shared/api";
export class FeedbackDialogComponent {
    constructor(dockedPanelContext, domSanitizer, rxOverlayService) {
        this.dockedPanelContext = dockedPanelContext;
        this.domSanitizer = domSanitizer;
        this.rxOverlayService = rxOverlayService;
    }
    ngOnInit() {
        const data = this.dockedPanelContext.getData();
        const requestParams = new HttpParams({
            fromObject: {
                Q_Language: 'EN',
                product: 'BMC Helix Platform',
                productVersion: data.bundleDescriptorVersion,
                tenant: this.rxOverlayService.getCurrentOverlayContext().tenantName
            }
        });
        this.feedbackUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.feedbackUrl.value + '?' + requestParams.toString());
    }
    close() {
        this.dockedPanelContext.close(DismissReasons.CLOSE_BTN);
    }
}
FeedbackDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FeedbackDialogComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.DomSanitizer }, { token: i3.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
FeedbackDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FeedbackDialogComponent, selector: "rx-feedback-dialog", ngImport: i0, template: "<div class=\"h-100 p-0\">\n  <iframe frameborder=\"0\" class=\"d-block h-100 w-100\" [src]=\"feedbackUrl\"> </iframe>\n</div>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FeedbackDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-feedback-dialog',
                    templateUrl: './feedback-dialog.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.DomSanitizer }, { type: i3.RxOverlayService }]; } });
//# sourceMappingURL=feedback-dialog.component.js.map