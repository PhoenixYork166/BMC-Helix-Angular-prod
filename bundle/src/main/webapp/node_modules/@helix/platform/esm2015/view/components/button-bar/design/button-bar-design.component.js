import { Component, Input } from '@angular/core';
import { ButtonBarDesignModel } from './button-bar-design.model';
import { RxButtonBarService } from '../button-bar.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../button-bar.service";
import * as i2 from "@helix/platform/view/designer";
import * as i3 from "@angular/common";
export class ButtonBarDesignComponent {
    constructor(rxButtonBarService) {
        this.rxButtonBarService = rxButtonBarService;
        this.alignment = '';
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.model.componentProperties$.pipe(takeUntil(this.destroyed$)).subscribe((componentProperties) => {
            this.alignment = this.rxButtonBarService.getAlignClass(componentProperties.alignment);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
ButtonBarDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignComponent, deps: [{ token: i1.RxButtonBarService }], target: i0.ɵɵFactoryTarget.Component });
ButtonBarDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ButtonBarDesignComponent, selector: "rx-button-bar-design", inputs: { model: "model" }, ngImport: i0, template: "<rx-canvas-outlet\n  class=\"button-bar-design-container border\"\n  [class.border-transparent]=\"model.hasChildren$ | async\"\n  [ngClass]=\"alignment\"\n  [dropPredicate]=\"model.dropPredicate\"\n  dropListOrientation=\"horizontal\"\n></rx-canvas-outlet>\n", styles: [":host::ng-deep .button-bar-design-container{display:block}:host::ng-deep .button-bar-design-container.align-center .cdk-drop-list{justify-content:center}:host::ng-deep .button-bar-design-container.align-right .cdk-drop-list{justify-content:flex-end}:host::ng-deep .button-bar-design-container.align-left .cdk-drop-list{justify-content:flex-start}:host::ng-deep .button-bar-design-container rx-canvas-item-container{min-width:100%}:host::ng-deep .button-bar-design-container rx-canvas-item-container .cdk-drop-list{min-height:50px;display:flex;flex-flow:row wrap}.border-transparent{border-color:transparent!important}\n"], components: [{ type: i2.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ButtonBarDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-button-bar-design',
                    templateUrl: './button-bar-design.component.html',
                    styleUrls: ['./button-bar-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxButtonBarService }]; }, propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=button-bar-design.component.js.map