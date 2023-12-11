import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationIssueType } from './validation-issues.types';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxValidationIssuesComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.issueSections = [];
        this.correctIssue = new EventEmitter();
        this.ValidationIssueType = ValidationIssueType;
    }
    onCorrectIssue(validationIssue) {
        this.correctIssue.emit(validationIssue);
    }
    ngOnInit() {
        this.emptyText = this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-is-valid.message', {
            definitionTypeDisplayName: this.definitionTypeDisplayName.toLowerCase()
        });
    }
}
RxValidationIssuesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxValidationIssuesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: { definitionTypeDisplayName: "definitionTypeDisplayName", issueSections: "issueSections" }, outputs: { correctIssue: "correctIssue" }, ngImport: i0, template: "<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab *ngFor=\"let issueSection of issueSections\" [isOpen]=\"true\" [title]=\"issueSection.title\">\n    <div\n      *ngFor=\"let issue of issueSection.issues\"\n      [ngClass]=\"{\n        'issue-warning': issue.type === ValidationIssueType.Warning,\n        'issue-error': issue.type === ValidationIssueType.Error\n      }\"\n      class=\"issue\"\n    >\n      <span class=\"d-icon-exclamation_triangle\"></span>\n\n      <div class=\"issue-info\">\n        <div class=\"issue-type\">{{ issue.type | titlecase }}</div>\n        <div class=\"description\">{{ issue.description }}</div>\n        <button\n          *ngIf=\"!issue.disableCorrection\"\n          (click)=\"onCorrectIssue(issue)\"\n          type=\"button\"\n          class=\"btn btn-link correct-issue\"\n        >\n          Correct\n        </button>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<adapt-alert\n  *ngIf=\"issueSections.length === 0\"\n  class=\"p-3 definition-valid-message\"\n  [config]=\"{\n    content: emptyText,\n    variant: 'success',\n    type: 'inline'\n  }\"\n></adapt-alert>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.issue{display:flex}.issue-error .d-icon-exclamation_triangle{color:#f83200}.issue-warning .d-icon-exclamation_triangle{color:#f1b521}.d-icon-exclamation_triangle{margin-right:10px}.issue-info{flex-grow:1}.issue-type{margin-bottom:15px}.correct-issue{float:right}adapt-accordion-tab ::ng-deep .card-block{word-break:break-word}\n"], components: [{ type: i2.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i2.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "titlecase": i3.TitleCasePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-validation-issues',
                    templateUrl: './validation-issues.component.html',
                    styleUrls: ['./validation-issues.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { definitionTypeDisplayName: [{
                type: Input
            }], issueSections: [{
                type: Input
            }], correctIssue: [{
                type: Output
            }] } });
//# sourceMappingURL=validation-issues.component.js.map