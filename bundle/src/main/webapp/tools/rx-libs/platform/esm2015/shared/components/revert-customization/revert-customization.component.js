import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilderEvent, RX_OVERLAY, RxOverlayService } from '@helix/platform/shared/api';
import { ReplaySubject } from 'rxjs';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RX_REVERT_CUSTOMIZATION } from './revert-customization.constants';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class RxRevertCustomizationComponent {
    constructor(rxModalService, rxOverlayService) {
        this.rxModalService = rxModalService;
        this.rxOverlayService = rxOverlayService;
        this.events = new EventEmitter();
        this.showOverlayOptions = false;
        this.isRevertActionHidden = false;
        this.isOverlayOperationHidden = false;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.updateData();
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        if (changes.options &&
            (changes.options.currentValue.overlayGroupId !== ((_a = changes.options.previousValue) === null || _a === void 0 ? void 0 : _a.overlayGroupId) ||
                ((_b = changes.options.currentValue.overlayDescriptor) === null || _b === void 0 ? void 0 : _b.parentOverlayGroupId) !==
                    ((_d = (_c = changes.options.previousValue) === null || _c === void 0 ? void 0 : _c.overlayDescriptor) === null || _d === void 0 ? void 0 : _d.parentOverlayGroupId))) {
            this.updateData();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    updateData() {
        if (this.options.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
            this.isOverlayOperationHidden = RX_OVERLAY.operationTypes.createdInThisOverlayGroup === this.overlayOperation;
            this.isRevertActionHidden = this.shouldHideRevertAction();
            this.showOverlayOptions = !this.isOverlayOperationHidden || !this.isRevertActionHidden;
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            this.isOverlayOperationHidden = true;
            this.isRevertActionHidden = true;
        }
        this.events.emit({ type: FormBuilderEvent.HideWidget, payload: !this.showOverlayOptions });
    }
    revertCustomization() {
        this.events.emit({ type: RX_REVERT_CUSTOMIZATION.events.revertCustomization });
    }
    getOverlayOperation() {
        return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, this.options.overlayDescriptor ? this.options.overlayDescriptor.parentOverlayGroupId : null);
    }
    shouldHideRevertAction() {
        return this.overlayOperation === RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
            ? !this.options.allowOverlay
            : true;
    }
    onRevertCustomization() {
        this.rxModalService
            .confirm({
            title: 'Warning',
            modalStyle: RX_MODAL.modalStyles.warning,
            message: 'Are you sure you want to revert customization?'
        })
            .then((revert) => {
            if (revert) {
                this.revertCustomization();
            }
        });
    }
}
RxRevertCustomizationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
RxRevertCustomizationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"showOverlayOptions\" class=\"d-flex justify-content-between align-items-end\">\n  <div *ngIf=\"!isOverlayOperationHidden\" class=\"mb-0\">\n    <adapt-rx-control-label label=\"Customization status\" class=\"d-block pb-1\"></adapt-rx-control-label>\n    {{ overlayOperation }}\n  </div>\n\n  <adapt-button\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"revert-customization-button\"\n    *ngIf=\"!isRevertActionHidden\"\n    (click)=\"onRevertCustomization()\"\n  >\n    <span class=\"d-icon-left-undo\"></span>\n    Revert\n  </adapt-button>\n</div>\n", components: [{ type: i3.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-revert-customization',
                    templateUrl: './revert-customization.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxOverlayService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], events: [{
                type: Output
            }] } });
//# sourceMappingURL=revert-customization.component.js.map