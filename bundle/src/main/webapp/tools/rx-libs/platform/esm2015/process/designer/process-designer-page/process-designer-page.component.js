import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { ProcessDesignerComponent } from '../process-designer/process-designer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../process-designer/process-designer.component";
import * as i6 from "@angular/common";
export class ProcessDesignerPageComponent {
    constructor(activatedRoute, router, rxBundleCacheService, rxComponentCanDeactivateGuard, rxDefinitionNameService, rxPageTitleService, rxUtilityModalsService, translateService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.translateService = translateService;
        this.isInitialized = false;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewProcess = !definitionName;
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.process-designer.title')
            ]);
            this.configuration = Object.assign(Object.assign({}, this.configuration), { bundleId: this.rxBundleCacheService.bundleId, definitionName });
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.processDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'process-definitions'
        ]);
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onDefinitionSaved(processDefinitionName) {
        if (this.isNewProcess) {
            this.router.navigate(['edit2', processDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
}
ProcessDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i3.RxUtilityModalsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ProcessDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessDesignerPageComponent, selector: "rx-process-designer-page", viewQueries: [{ propertyName: "processDesignerComponent", first: true, predicate: ProcessDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-process-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (closeDesigner)=\"onCloseDesigner()\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n></rx-process-designer>\n", components: [{ type: i5.ProcessDesignerComponent, selector: "rx-process-designer", inputs: ["configuration"], outputs: ["closeDesigner", "definitionErrorLoading", "definitionSaved"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-process-designer-page',
                    templateUrl: './process-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i3.RxUtilityModalsService }, { type: i4.TranslateService }]; }, propDecorators: { processDesignerComponent: [{
                type: ViewChild,
                args: [ProcessDesignerComponent]
            }] } });
//# sourceMappingURL=process-designer-page.component.js.map