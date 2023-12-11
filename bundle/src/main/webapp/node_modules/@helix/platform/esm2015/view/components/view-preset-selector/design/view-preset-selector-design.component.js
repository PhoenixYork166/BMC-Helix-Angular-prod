import { Component, Input } from '@angular/core';
import { ViewPresetSelectorDesignModel } from './view-preset-selector-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
export class ViewPresetSelectorDesignComponent {
}
ViewPresetSelectorDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ViewPresetSelectorDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewPresetSelectorDesignComponent, selector: "rx-view-preset-selector-design", inputs: { model: "model" }, ngImport: i0, template: "<button\n  class=\"dropdown-toggle text-default font-weight-bold text-left\"\n  adapt-button\n  btn-type=\"tertiary\"\n  type=\"button\"\n  readonly\n>\n  {{ model.label$ | async }}\n</button>\n", styles: ["button{white-space:normal;word-break:break-word}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "async": i2.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewPresetSelectorDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-preset-selector-design',
                    templateUrl: './view-preset-selector-design.component.html',
                    styleUrls: ['./view-preset-selector-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=view-preset-selector-design.component.js.map