import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../+state/view-designer.facade";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@angular/common";
export class RxViewRevertCustomizationComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.events = new EventEmitter();
        this.controlOptions$ = combineLatest([
            this.viewDesignerFacade.getViewPropertyValue('allowOverlay'),
            this.viewDesignerFacade.getViewPropertyValue('scope'),
            this.viewDesignerFacade.getViewPropertyValue('overlayGroupId'),
            this.viewDesignerFacade.getViewPropertyValue('overlayDescriptor')
        ]).pipe(map(([allowOverlay, scope, overlayGroupId, overlayDescriptor]) => ({
            allowOverlay,
            scope,
            overlayGroupId,
            overlayDescriptor
        })));
    }
}
RxViewRevertCustomizationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationComponent, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxViewRevertCustomizationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxViewRevertCustomizationComponent, selector: "rx-view-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, ngImport: i0, template: "<rx-revert-customization\n  [options]=\"controlOptions$ | async\"\n  [isDisabled]=\"isDisabled\"\n  (events)=\"events.emit($event)\"\n></rx-revert-customization>\n", components: [{ type: i2.RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: ["options", "isDisabled"], outputs: ["events"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewRevertCustomizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-revert-customization',
                    templateUrl: './view-revert-customization.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=view-revert-customization.component.js.map