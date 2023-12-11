import { Component, ComponentFactory, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class RxDynamicComponentRendererComponent {
    ngOnInit() {
        const componentRef = this.container.createComponent(this.componentFactory);
        Object.assign(componentRef.instance, {
            context: this.context,
            options: this.options
        });
    }
}
RxDynamicComponentRendererComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDynamicComponentRendererComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: { componentFactory: "componentFactory", context: "context", options: "options" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-dynamic-component-renderer',
                    template: '<ng-container #container></ng-container>'
                }]
        }], propDecorators: { componentFactory: [{
                type: Input
            }], context: [{
                type: Input
            }], options: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { static: true, read: ViewContainerRef }]
            }] } });
//# sourceMappingURL=dynamic-component-renderer.component.js.map