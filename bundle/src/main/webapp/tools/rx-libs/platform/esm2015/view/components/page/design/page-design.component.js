import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PageDesignModel } from './page-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
export class PageDesignComponent {
}
PageDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PageDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PageDesignComponent, selector: "rx-page-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-empty-state type=\"objects\" [label]=\"model.componentName$ | async\"></adapt-empty-state>\n", components: [{ type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PageDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-page-design',
                    templateUrl: './page-design.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=page-design.component.js.map