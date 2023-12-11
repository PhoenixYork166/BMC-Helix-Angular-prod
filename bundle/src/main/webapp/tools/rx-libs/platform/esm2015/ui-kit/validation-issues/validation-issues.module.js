import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptAccordionModule, AdaptAlertModule } from '@bmc-ux/adapt-angular';
import { RxValidationIssuesComponent } from './validation-issues.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class RxValidationIssuesModule {
}
RxValidationIssuesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxValidationIssuesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, declarations: [RxValidationIssuesComponent], imports: [CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule], exports: [RxValidationIssuesComponent] });
RxValidationIssuesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, imports: [[CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule],
                    exports: [RxValidationIssuesComponent],
                    declarations: [RxValidationIssuesComponent]
                }]
        }] });
//# sourceMappingURL=validation-issues.module.js.map