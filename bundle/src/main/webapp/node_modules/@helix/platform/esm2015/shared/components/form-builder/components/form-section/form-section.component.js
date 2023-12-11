import { Component, Input } from '@angular/core';
import { FORM_BUILDER } from '../../form-builder.constant';
import { FormSectionModel } from '../../models/form-section.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../form-outlet/form-outlet.component";
import * as i3 from "../form-widget/form-widget.component";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class FormSectionComponent {
    constructor() {
        this.controlTypes = FORM_BUILDER.controlTypes;
        this.trackBySectionControls = this.trackBySectionControls.bind(this);
    }
    trackBySectionControls(index, item) {
        return this.guid + item.name || `${item.component.name}` || String(index);
    }
}
FormSectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormSectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormSectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormSectionComponent, selector: "rx-form-section", inputs: { guid: "guid", section: "section" }, ngImport: i0, template: "<adapt-accordion *ngIf=\"section.label\">\n  <adapt-accordion-tab [title]=\"section.label\" [isOpen]=\"true\">\n    <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n      <rx-form-outlet\n        *ngSwitchCase=\"controlTypes.formControl\"\n        [formControl]=\"control.formControl\"\n        [control]=\"control\"\n        [hidden]=\"control.hidden\"\n      ></rx-form-outlet>\n      <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n    </ng-container>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<ng-container *ngIf=\"!section.label\">\n  <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n    <rx-form-outlet\n      *ngSwitchCase=\"controlTypes.formControl\"\n      [formControl]=\"control.formControl\"\n      [control]=\"control\"\n      [hidden]=\"control.hidden\"\n    ></rx-form-outlet>\n    <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n  </ng-container>\n</ng-container>\n", components: [{ type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i2.FormOutletComponent, selector: "rx-form-outlet", inputs: ["control"] }, { type: i3.FormWidgetComponent, selector: "rx-form-widget", inputs: ["widget"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormSectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-section',
                    templateUrl: './form-section.component.html'
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { guid: [{
                type: Input
            }], section: [{
                type: Input
            }] } });
//# sourceMappingURL=form-section.component.js.map