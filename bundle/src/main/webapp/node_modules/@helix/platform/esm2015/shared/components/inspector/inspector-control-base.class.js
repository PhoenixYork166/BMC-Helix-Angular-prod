import { Directive, EventEmitter, Injector, Input, Output } from '@angular/core';
import { InspectorDirective } from './inspector.directive';
import { ValueAccessor } from '../form-builder';
import * as i0 from "@angular/core";
// tslint:disable-next-line:directive-class-suffix
export class InspectorControlBase extends ValueAccessor {
    constructor(injector) {
        super();
        this.injector = injector;
        this.events = new EventEmitter();
        this.designerItemModel = this.injector.get(InspectorDirective).designerItemModel;
    }
}
InspectorControlBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorControlBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
InspectorControlBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorControlBase, inputs: { propertyPath: "propertyPath", options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorControlBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { propertyPath: [{
                type: Input
            }], options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=inspector-control-base.class.js.map