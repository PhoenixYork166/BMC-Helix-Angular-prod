import { Component, Injector } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@ngx-translate/core";
export class InheritanceIssueInfoComponent extends RxModalClass {
    constructor(injector, activeModalRef) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.overriddenRecordProperties = this.activeModalRef.getData().overriddenRecordProperties;
    }
    close(value) {
        this.activeModalRef.close(value);
    }
}
InheritanceIssueInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InheritanceIssueInfoComponent, deps: [{ token: i0.Injector }, { token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
InheritanceIssueInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InheritanceIssueInfoComponent, selector: "rx-localized-character-default-value-selector", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <ng-container *ngIf=\"overriddenRecordProperties\">\n    <div *ngIf=\"overriddenRecordProperties.fields.length > 0\">\n      <p>\n        {{ 'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-info.message' | translate }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-properties-info.message'\n              | translate: { overriddenFields: overriddenRecordProperties.fields }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n\n    <div *ngIf=\"overriddenRecordProperties.securityLabels?.length > 0\">\n      <p>\n        {{\n          'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-overridden-security-labels-info.message'\n            | translate\n        }}\n      </p>\n\n      <ul>\n        <li>\n          <span>{{\n            'com.bmc.arsys.rx.client.record-designer.record-inheritance-selector.issues-security-labels-info.message'\n              | translate: { overriddenSecurityLabels: overriddenRecordProperties.securityLabels }\n          }}</span>\n        </li>\n      </ul>\n    </div>\n  </ng-container>\n  <p>\n    {{ 'com.bmc.arsys.rx.client.common.continue-confirmation.message' | translate }}\n  </p>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" rx-id=\"yes-button\" (click)=\"close('continue')\">\n    {{ 'com.bmc.arsys.rx.client.common.yes.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"no-button\" (click)=\"close('cancel')\">\n    {{ 'com.bmc.arsys.rx.client.common.no.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InheritanceIssueInfoComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-default-value-selector',
                    templateUrl: './inheritance-issue-info.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ActiveModalRef }]; } });
//# sourceMappingURL=inheritance-issue-info.component.js.map