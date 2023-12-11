import { Component, Injector } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
export class MissingArchiveDefinitionsModalComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.missingAssociations = this.activeModalRef.getData().missingAssociations;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
MissingArchiveDefinitionsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MissingArchiveDefinitionsModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MissingArchiveDefinitionsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: MissingArchiveDefinitionsModalComponent, selector: "rx-missing-archive-definitions-modal-selector", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body pt-0\">\n  <div class=\"row\">\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{\n          'com.bmc.arsys.rx.client.record-designer.definition-properties.archiving.association-name.label' | translate\n        }}\n      </h6>\n    </div>\n    <div class=\"col-sm\">\n      <h6 class=\"font-weight-bold\">\n        {{ 'com.bmc.arsys.rx.client.common.record-definition-name.label' | translate }}\n      </h6>\n    </div>\n  </div>\n\n  <div class=\"row mb-2\" *ngFor=\"let association of missingAssociations\">\n    <div class=\"col-sm\">{{ association.name | rxDefinitionNamePipe }}</div>\n    <div class=\"col-sm\">\n      <a target=\"_blank\" class=\"d-icon-left-pop_up\" [href]=\"association.url\">\n        {{ association.secondRecord | rxDefinitionNamePipe }}\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"close-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i3.TranslatePipe, "rxDefinitionNamePipe": i4.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: MissingArchiveDefinitionsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-missing-archive-definitions-modal-selector',
                    templateUrl: './missing-archive-definitions-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=missing-archive-definitions-modal.component.js.map