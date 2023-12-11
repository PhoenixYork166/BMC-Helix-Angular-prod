import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class InspectorDirective {
}
InspectorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
InspectorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorDirective, selector: "[rxInspector]", inputs: { designerItemModel: "designerItemModel" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxInspector]'
                }]
        }], propDecorators: { designerItemModel: [{
                type: Input
            }] } });
//# sourceMappingURL=inspector.directive.js.map