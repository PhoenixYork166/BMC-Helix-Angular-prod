import { ChangeDetectorRef, Component, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NEVER } from 'rxjs';
import { ActiveModalRef, DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxRuntimeViewRegistryService } from '../../runtime-view-registry.service';
import * as i0 from "@angular/core";
import * as i1 from "../../runtime-view-registry.service";
import * as i2 from "@helix/platform/ui-kit";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "../../component/runtime-view.component";
import * as i6 from "@angular/common";
export class RuntimeViewModalComponent {
    constructor(rxRuntimeViewRegistryService, rxUtilityModalsService, translateService, changeDetector, activeModalRef, dockedPanelContext) {
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.changeDetector = changeDetector;
        this.activeModalRef = activeModalRef;
        this.dockedPanelContext = dockedPanelContext;
        this.isBlade = false;
        this.context = dockedPanelContext || activeModalRef;
        this.isBlade = Boolean(dockedPanelContext);
        const data = this.context.getData();
        this.configuration = data.configuration;
        this.title = data.title;
        this.notification = data.notification;
        this.isCancellable = data.isCancellable;
        this.closeLabel = translateService.instant('com.bmc.arsys.rx.client.common.close.label');
    }
    onCancelView() {
        this.context.dismiss(null);
    }
    closeModal() {
        this.context.dismiss(DismissReasons.CLOSE_BTN);
    }
    onClose(viewOutputParams) {
        this.context.close(viewOutputParams);
    }
    onBeforeLoad() {
        this.busySubscription = NEVER.subscribe();
        // workaround: run changeDetector to avoid the ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detectChanges();
    }
    onAfterLoad() {
        var _a;
        (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
RuntimeViewModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModalComponent, deps: [{ token: i1.RxRuntimeViewRegistryService }, { token: i2.RxUtilityModalsService }, { token: i3.TranslateService }, { token: i0.ChangeDetectorRef }, { token: i4.ActiveModalRef, optional: true }, { token: i4.DockedPanelContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewModalComponent, selector: "rx-runtime-view-modal", ngImport: i0, template: "<ng-container *ngIf=\"title || isCancellable\">\n  <div class=\"dp-header\" *ngIf=\"isBlade; else modalHeader\">\n    <span class=\"dp-title\">{{ title }}</span>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-container>\n\n<ng-template #modalHeader>\n  <div class=\"modal-header\">\n    <h5 class=\"modal-title\">{{ title }}</h5>\n    <button\n      class=\"close dp-close\"\n      rx-id=\"x-button\"\n      [attr.aria-label]=\"closeLabel\"\n      *ngIf=\"isCancellable\"\n      (click)=\"closeModal()\"\n    ></button>\n  </div>\n</ng-template>\n\n<adapt-alert\n  *ngIf=\"notification\"\n  class=\"pl-4 pt-4\"\n  [config]=\"{\n    content: notification,\n    type: 'inline',\n    variant: 'info'\n  }\"\n></adapt-alert>\n\n<div\n  [ngClass]=\"{\n    'modal-body p-0': !isBlade,\n    'dp-content': isBlade\n  }\"\n>\n  <div class=\"position-relative\">\n    <rx-busy-indicator\n      [options]=\"{\n        busy: busySubscription,\n        loaderType: 'lineLoader',\n        delay: 250,\n        backdrop: false,\n        message: null\n      }\"\n    >\n    </rx-busy-indicator>\n  </div>\n\n  <rx-runtime-view\n    [configuration]=\"configuration\"\n    (cancelView)=\"onCancelView()\"\n    (closeView)=\"onClose($event)\"\n    (beforeLoad)=\"onBeforeLoad()\"\n    (afterLoad)=\"onAfterLoad()\"\n  ></rx-runtime-view>\n</div>\n", styles: [":host{height:100%;display:flex;flex-direction:column}.modal-header{min-height:34px}.dp-header{flex-direction:row!important}.dp-content>rx-runtime-view{height:100%}\n"], components: [{ type: i4.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i2.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i5.RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view-modal',
                    templateUrl: './runtime-view-modal.component.html',
                    styleUrls: ['./runtime-view-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRuntimeViewRegistryService }, { type: i2.RxUtilityModalsService }, { type: i3.TranslateService }, { type: i0.ChangeDetectorRef }, { type: i4.ActiveModalRef, decorators: [{
                    type: Optional
                }] }, { type: i4.DockedPanelContext, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=runtime-view-modal.component.js.map