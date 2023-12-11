import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { combineLatest, ReplaySubject } from 'rxjs';
import { RxOverlayService } from '@helix/platform/shared/api';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../+state/view-designer.facade";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/components";
import * as i5 from "@angular/forms";
export class RxViewCustomizationOptionsComponent {
    constructor(viewDesignerFacade, rxOverlayService, translateService) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxOverlayService = rxOverlayService;
        this.translateService = translateService;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
            this.viewDesignerFacade.getViewPropertyValue('scope'),
            this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
            this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor'),
            this.viewDesignerFacade.getViewPropertyValue('lastUpdateTime')
        ])
            .pipe(withLatestFrom(this.viewDesignerFacade.viewModel$), takeUntil(this.destroyed$))
            .subscribe(([[allowOverlay, scope, overlayGroupId, overlayDescriptor, lastUpdateTime], viewModel]) => {
            this.controlOptions = {
                allowOverlay,
                scope,
                overlayGroupId,
                overlayDescriptor,
                isDisabled: !this.rxOverlayService.isCustomizationEnabled('allowOverlay', viewModel),
                definitionTypeDisplayName: this.translateService.instant('com.bmc.arsys.rx.client.view-definition.label').toLowerCase()
            };
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    setCustomization(customizationOptions) {
        this.viewDesignerFacade.updateViewProperties(customizationOptions);
    }
}
RxViewCustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsComponent, deps: [{ token: i1.ViewDesignerFacade }, { token: i2.RxOverlayService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxViewCustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewCustomizationOptionsComponent, selector: "rx-view-customization-options", inputs: { options: "options" }, ngImport: i0, template: "<rx-scope-customization-control\n  [options]=\"controlOptions\"\n  [(ngModel)]=\"value\"\n  (ngModelChange)=\"setCustomization($event)\"\n></rx-scope-customization-control>\n", components: [{ type: i4.CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: ["options"] }], directives: [{ type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewCustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-customization-options',
                    templateUrl: './view-customization-options.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }, { type: i2.RxOverlayService }, { type: i3.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=view-customization-options.component.js.map