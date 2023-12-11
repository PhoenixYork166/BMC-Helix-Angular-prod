import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-translate/core";
export class ResultModalComponent {
    constructor(activeModelRef) {
        this.activeModelRef = activeModelRef;
        this.data = this.activeModelRef.getData();
    }
    close() {
        this.activeModelRef.close();
    }
    hasActionResultDetails(data) {
        return ['warningCount', 'errorCount', 'infoCount', 'successCount'].some((prop) => data.summary[prop]);
    }
}
ResultModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ResultModalComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
ResultModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ResultModalComponent, selector: "rx-edit-records-result-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'check_circle'\" class=\"mr-1 text-success-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-successfully.label' |\n    translate}}: {{data.summary.successCount}}\n  </div>\n\n  <div class=\"mb-2\">\n    <adapt-icon [name]=\"'exclamation_circle'\" class=\"mr-1 text-warning-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.updated-with-warnings.label' | translate\n    }}: {{data.summary.warningCount}}\n  </div>\n\n  <div>\n    <adapt-icon [name]=\"'exclamation_triangle'\" class=\"mr-1 text-danger-icon\"></adapt-icon>\n    {{'com.bmc.arsys.rx.client.view-actions.edit-records.action-results-dialog.update-failures.label' | translate }}:\n    {{data.summary.errorCount}}\n  </div>\n\n  <div class=\"mt-2\" *ngIf=\"hasActionResultDetails(data) && data.details\">\n    <adapt-rx-textarea\n      class=\"resize-none\"\n      label=\"{{'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      readonly\n      rows=\"15\"\n      [ngModel]=\"data.details\"\n    >\n    </adapt-rx-textarea>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-secondary btn-sm\" (click)=\"close()\" type=\"button\">\n    {{'com.bmc.arsys.rx.client.common.close.label' | translate}}\n  </button>\n</div>\n", styles: [":host ::ng-deep .resize-none{resize:none}\n"], components: [{ type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ResultModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-edit-records-result-modal',
                    styleUrls: ['./result-modal.scss'],
                    templateUrl: './result-modal.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; } });
//# sourceMappingURL=result-modal.component.js.map