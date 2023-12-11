import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAlertModule, AdaptButtonModule, AdaptCloseModule, AdaptDockedPanelModule, AdaptModalModule, AdaptNavigationModule, AdaptRxRadiobuttonModule, AdaptRxSearchModule, AdaptTooltipModule, AdaptAgreementModule, AdaptBusyModule } from '@bmc-ux/adapt-angular';
import { RxBusyIndicatorModule, RxLineLoaderModule } from '@helix/platform/ui-kit';
import { DevelopmentModeSelectorComponent } from './development-mode-selector/development-mode-selector.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { RxInnovationStudioShellComponent } from './innovation-studio-shell.component';
import { RxShellComponent } from './shell.component';
import { RxUserMessageDataPageService } from './user-messages/user-message-data-page.service';
import { RxUserMessageModalComponent } from './user-messages/user-message-modal.component';
import { RxUserMessageService } from './user-messages/user-message.service';
import { RxUserMessagesComponent } from './user-messages/user-messages.component';
import { AdaptRadarModule } from '@bmc-ux/adapt-radar';
import { GainsightOptInComponent } from './gainsight/gainsight-opt-in/gainsight-opt-in.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RxShellModule {
}
RxShellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, declarations: [RxShellComponent,
        RxInnovationStudioShellComponent,
        RxUserMessagesComponent,
        RxUserMessageModalComponent,
        DevelopmentModeSelectorComponent,
        FeedbackDialogComponent,
        GainsightOptInComponent], imports: [BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AdaptModalModule,
        AdaptDockedPanelModule, i1.AdaptNavigationModule, AdaptTooltipModule,
        AdaptButtonModule,
        AdaptCloseModule,
        AdaptRxSearchModule, i1.AdaptAlertModule, AdaptRxRadiobuttonModule,
        TranslateModule,
        RxBusyIndicatorModule,
        AdaptRadarModule,
        AdaptAgreementModule,
        RxLineLoaderModule,
        AdaptBusyModule], exports: [RxShellComponent, RxInnovationStudioShellComponent] });
RxShellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, providers: [RxUserMessageDataPageService, RxUserMessageService], imports: [[
            BrowserModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            AdaptModalModule,
            AdaptDockedPanelModule,
            AdaptNavigationModule.forRoot(),
            AdaptTooltipModule,
            AdaptButtonModule,
            AdaptCloseModule,
            AdaptRxSearchModule,
            AdaptAlertModule.forRoot(),
            AdaptRxRadiobuttonModule,
            TranslateModule,
            RxBusyIndicatorModule,
            AdaptRadarModule,
            AdaptAgreementModule,
            RxLineLoaderModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BrowserModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        AdaptModalModule,
                        AdaptDockedPanelModule,
                        AdaptNavigationModule.forRoot(),
                        AdaptTooltipModule,
                        AdaptButtonModule,
                        AdaptCloseModule,
                        AdaptRxSearchModule,
                        AdaptAlertModule.forRoot(),
                        AdaptRxRadiobuttonModule,
                        TranslateModule,
                        RxBusyIndicatorModule,
                        AdaptRadarModule,
                        AdaptAgreementModule,
                        RxLineLoaderModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [RxUserMessageModalComponent],
                    declarations: [
                        RxShellComponent,
                        RxInnovationStudioShellComponent,
                        RxUserMessagesComponent,
                        RxUserMessageModalComponent,
                        DevelopmentModeSelectorComponent,
                        FeedbackDialogComponent,
                        GainsightOptInComponent
                    ],
                    exports: [RxShellComponent, RxInnovationStudioShellComponent],
                    providers: [RxUserMessageDataPageService, RxUserMessageService]
                }]
        }] });
//# sourceMappingURL=shell.module.js.map