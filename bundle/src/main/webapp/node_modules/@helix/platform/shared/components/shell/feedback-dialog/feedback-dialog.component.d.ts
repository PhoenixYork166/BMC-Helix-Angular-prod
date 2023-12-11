import { OnInit } from '@angular/core';
import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RxOverlayService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class FeedbackDialogComponent implements OnInit {
    private dockedPanelContext;
    private domSanitizer;
    private rxOverlayService;
    feedbackUrl: SafeResourceUrl;
    constructor(dockedPanelContext: DockedPanelContext, domSanitizer: DomSanitizer, rxOverlayService: RxOverlayService);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeedbackDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FeedbackDialogComponent, "rx-feedback-dialog", never, {}, {}, never, never>;
}
