import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RxNamedListDesignerComponent } from '../named-list-designer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../named-list-designer/named-list-designer.component";
import * as i6 from "@angular/common";
export class RxNamedListDesignerPageComponent {
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
        this.definitionsRoute = 'named-list-definitions';
        this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.title');
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewDefinition = !definitionName;
            this.configuration = {
                bundleId: this.rxBundleCacheService.bundleId,
                definitionName
            };
            this.rxPageTitleService.set([this.rxDefinitionNameService.getDisplayName(definitionName), this.pageTitle]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.designerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            this.definitionsRoute
        ]);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewDefinition) {
            this.router.navigate(['edit', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxNamedListDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i3.RxUtilityModalsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxNamedListDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNamedListDesignerPageComponent, selector: "rx-named-list-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: RxNamedListDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-named-list-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-named-list-designer>\n", components: [{ type: i5.RxNamedListDesignerComponent, selector: "rx-named-list-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-list-designer-page',
                    templateUrl: './named-list-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i3.RxUtilityModalsService }, { type: i4.TranslateService }]; }, propDecorators: { designerComponent: [{
                type: ViewChild,
                args: [RxNamedListDesignerComponent]
            }] } });
//# sourceMappingURL=named-list-designer-page.component.js.map