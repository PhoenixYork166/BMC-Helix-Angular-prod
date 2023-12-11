import { Component, Input } from '@angular/core';
import { ExtensionContainerDesignModel } from './extension-container-design.model';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class ExtensionContainerDesignComponent {
}
ExtensionContainerDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ExtensionContainerDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExtensionContainerDesignComponent, selector: "rx-extension-container-design", inputs: { model: "model" }, ngImport: i0, template: "<adapt-empty-state type=\"objects\" label=\"Contains fields from extensions of the record definition.\"></adapt-empty-state>\n", components: [{ type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExtensionContainerDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-extension-container-design',
                    templateUrl: './extension-container-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=extension-container-design.component.js.map