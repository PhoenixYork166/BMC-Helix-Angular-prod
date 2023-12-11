import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../read-only-fields/read-only-fields.component";
import * as i3 from "@ngx-translate/core";
export class ReadOnlyFieldsModalComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.fields = this.activeModalRef.getData().fields;
    }
    close() {
        this.activeModalRef.close();
    }
}
ReadOnlyFieldsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
ReadOnlyFieldsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsModalComponent, selector: "rx-read-only-fields-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <rx-read-only-fields [fields]=\"fields\"></rx-read-only-fields>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: i2.ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: ["fields"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-read-only-fields-modal',
                    templateUrl: './read-only-fields-modal.component.html',
                    styleUrls: ['./read-only-fields-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; } });
//# sourceMappingURL=read-only-fields-modal.component.js.map