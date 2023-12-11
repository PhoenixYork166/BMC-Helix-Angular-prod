import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RecordDesignerComponent } from '../record-designer/record-designer.component';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../record-designer/record-designer.component";
import * as i6 from "@angular/common";
export class RecordDesignerPageComponent {
    constructor(activatedRoute, rxBundleCacheService, rxDefinitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
        this.activatedRoute = activatedRoute;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxPageTitleService = rxPageTitleService;
        this.router = router;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.isInitialized = false;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewRecord = !definitionName;
            this.configuration = {
                definitionName: definitionName,
                bundleId: this.rxBundleCacheService.bundleId
            };
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.record-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onDefinitionSaved(recordDefinitionName) {
        if (this.isNewRecord) {
            this.router.navigate(['edit2', recordDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'record-definitions'
        ]);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.recordDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
RecordDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i3.RxUtilityModalsService }, { token: i2.RxPageTitleService }, { token: i1.Router }, { token: i4.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Component });
RecordDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDesignerPageComponent, selector: "rx-record-designer-page", viewQueries: [{ propertyName: "recordDesignerComponent", first: true, predicate: RecordDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-record-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-record-designer>\n", components: [{ type: i5.RecordDesignerComponent, selector: "rx-record-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-designer-page',
                    templateUrl: './record-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i3.RxUtilityModalsService }, { type: i2.RxPageTitleService }, { type: i1.Router }, { type: i4.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }]; }, propDecorators: { recordDesignerComponent: [{
                type: ViewChild,
                args: [RecordDesignerComponent]
            }] } });
//# sourceMappingURL=record-designer-page.component.js.map