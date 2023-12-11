import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/runtime";
export class SelectGroupComponent extends BaseViewComponent {
    constructor() {
        super(...arguments);
        this.fieldComponents = new Map();
    }
    registerFieldComponent(fieldIndex, component) {
        this.fieldComponents.set(fieldIndex, component);
    }
    getValueForPreviousField(currentFieldIndex) {
        const component = this.fieldComponents.get(currentFieldIndex - 1);
        return component ? component.getFieldValue() : null;
    }
    resetValueForNextFields(currentFieldIndex) {
        const nextFieldIndex = currentFieldIndex + 1;
        const component = this.fieldComponents.get(nextFieldIndex);
        if (component) {
            component.resetFieldValue();
            this.resetValueForNextFields(nextFieldIndex);
        }
    }
}
SelectGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SelectGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectGroupComponent, selector: "rx-select-group", inputs: { config: "config" }, usesInheritance: true, ngImport: i0, template: "<rx-runtime-view-canvas-outlet></rx-runtime-view-canvas-outlet>\n", components: [{ type: i1.RuntimeViewCanvasOutletComponent, selector: "rx-runtime-view-canvas-outlet", inputs: ["name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-group',
                    templateUrl: './select-group.component.html'
                }]
        }], propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=select-group.component.js.map