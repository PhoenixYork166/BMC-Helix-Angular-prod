import { EventEmitter, Injectable, Injector, Input, Output } from '@angular/core';
import { InspectorDirective } from './inspector.directive';
import * as i0 from "@angular/core";
export class InspectorWidgetBase {
    constructor(injector) {
        this.injector = injector;
        this.events = new EventEmitter();
        this.designerItemModel = this.injector.get(InspectorDirective).designerItemModel;
    }
}
InspectorWidgetBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
InspectorWidgetBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=inspector-widget-base.class.js.map