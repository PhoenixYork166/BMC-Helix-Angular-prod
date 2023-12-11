import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../read-only-field/read-only-field.component";
import * as i2 from "@angular/common";
export class ReadOnlyFieldsComponent {
    constructor() {
        this.fields = [];
    }
}
ReadOnlyFieldsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ReadOnlyFieldsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: { fields: "fields" }, ngImport: i0, template: "<rx-read-only-field\n  *ngFor=\"let field of fields\"\n  class=\"d-block form-group\"\n  label=\"{{ field.label }}\"\n  value=\"{{ field.value }}\"\n></rx-read-only-field>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: i1.ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-read-only-fields',
                    templateUrl: './read-only-fields.component.html',
                    styleUrls: ['./read-only-fields.component.scss']
                }]
        }], propDecorators: { fields: [{
                type: Input
            }] } });
//# sourceMappingURL=read-only-fields.component.js.map