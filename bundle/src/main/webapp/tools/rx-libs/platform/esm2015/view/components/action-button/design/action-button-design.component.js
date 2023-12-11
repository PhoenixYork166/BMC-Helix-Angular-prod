import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxActionButtonService } from '../action-button.service';
import { ActionButtonDesignModel } from './action-button-design.model';
import { ActionButtonSize } from '../action-button.types';
import * as i0 from "@angular/core";
import * as i1 from "../action-button.service";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class ActionButtonDesignComponent {
    constructor(rxActionButtonService) {
        this.rxActionButtonService = rxActionButtonService;
    }
    ngOnInit() {
        this.iconCssClass$ = combineLatest([this.model.icon$, this.model.iconAlignment$]).pipe(map(([iconCssName, iconAlignment]) => this.rxActionButtonService.getIconCssClass(iconCssName, iconAlignment)));
        this.buttonType$ = this.model.style$.pipe(map((style) => this.rxActionButtonService.getButtonType(style)));
        this.size$ = this.model.size$.pipe(map((size) => size || ActionButtonSize.Default));
    }
}
ActionButtonDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignComponent, deps: [{ token: i1.RxActionButtonService }], target: i0.ɵɵFactoryTarget.Component });
ActionButtonDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionButtonDesignComponent, selector: "rx-action-button-design", inputs: { model: "model" }, ngImport: i0, template: "<button adapt-button [btn-type]=\"buttonType$ | async\" [size]=\"size$ | async\" [ngClass]=\"iconCssClass$ | async\">\n  {{ model.label$ | async }}\n</button>\n", components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionButtonDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-button-design',
                    templateUrl: './action-button-design.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxActionButtonService }]; }, propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=action-button-design.component.js.map