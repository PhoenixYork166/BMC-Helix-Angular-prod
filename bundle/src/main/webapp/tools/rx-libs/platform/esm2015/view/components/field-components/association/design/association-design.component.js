import { Component, Input } from '@angular/core';
import { AssociationDesignModel } from './association-design.model';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { RxAssociationDesignContainerComponent } from './association-design-container.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/designer";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@ngx-translate/core";
export class RxAssociationDesignComponent {
    constructor() {
        this.hidePlaceholder = false;
        this.destroyed$ = new ReplaySubject(1);
        this.containerComponent = RxAssociationDesignContainerComponent;
    }
    ngOnInit() {
        this.model.displayedFields$.pipe(takeUntil(this.destroyed$)).subscribe((fields) => {
            this.hidePlaceholder = fields.length > 0;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RxAssociationDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxAssociationDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxAssociationDesignComponent, selector: "rx-association-field-design", inputs: { model: "model" }, ngImport: i0, template: "<div [ngSwitch]=\"model.editingMode$ | async\">\n  <div *ngSwitchCase=\"'views'\" [attr.aria-label]=\"model.label$ | async\">\n    <label class=\"d-block form-control-label\">{{ model.label$ | async }}</label>\n\n    <div class=\"d-flex flex-wrap\">\n      <rx-canvas-outlet class=\"flex-grow-1\" [containerComponent]=\"containerComponent\"></rx-canvas-outlet>\n\n      <button\n        adapt-button\n        size=\"small\"\n        btn-type=\"tertiary\"\n        class=\"btn btn-link py-0 align-right\"\n        type=\"button\"\n        [hidden]=\"!hidePlaceholder\"\n      >\n        {{ 'com.bmc.arsys.rx.client.view-components.record-editor.association.button.clear-all.label' | translate }}\n      </button>\n    </div>\n\n    <adapt-empty-state\n      [hidden]=\"hidePlaceholder\"\n      type=\"objects\"\n      label=\"Add fields in the Properties panel.\"\n    ></adapt-empty-state>\n\n    <div class=\"form-group mt-2\" [hidden]=\"!hidePlaceholder\">\n      <div class=\"list-group\">\n        <div class=\"list-group-item\">\n          <div class=\"rx-record-preview-card w-100\">\n            <button\n              class=\"btn btn-link float-right d-icon-cross p-0\"\n              adapt-button\n              size=\"small\"\n              btn-type=\"tertiary\"\n              type=\"button\"\n            ></button>\n\n            <ul class=\"list-unstyled mb-0\">\n              <li class=\"rx-record-preview-card__field\" *ngFor=\"let field of model.displayedFields$ | async\">\n                <span class=\"rx-record-preview-card__label\" *ngIf=\"field.data.label\">{{ field.data.label }}</span>\n                <span *ngIf=\"field.data.label\">: </span>\n                <span class=\"rx-record-preview-card__value\">{{ field.data.name }}</span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngSwitchCase=\"'dropdown'\">\n    <div [attr.aria-label]=\"model.label$ | async\">\n      <adapt-rx-select [label]=\"model.label$ | async\" [disabled]=\"true\" ngModel></adapt-rx-select>\n    </div>\n  </div>\n</div>\n", components: [{ type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i3.AsyncPipe, "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-association-field-design',
                    templateUrl: './association-design.component.html'
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });
//# sourceMappingURL=association-design.component.js.map