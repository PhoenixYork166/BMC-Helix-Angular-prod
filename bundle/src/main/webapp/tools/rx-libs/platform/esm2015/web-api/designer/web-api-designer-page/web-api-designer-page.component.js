import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxWebApiDesignerComponent } from '../web-api-designer';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/router";
import * as i5 from "../web-api-designer/web-api-designer.component";
import * as i6 from "@angular/common";
export class RxWebApiDesignerPageComponent {
    constructor(rxUtilityModalService, rxBundleCacheService, rxDefinitionNameService, rxPageTitleService, rxComponentCanDeactivateGuard, translateService, activatedRoute, router) {
        this.rxUtilityModalService = rxUtilityModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.translateService = translateService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.isInitialized = false;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewWepApi = !definitionName;
            this.webApiDefinitionName = definitionName;
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.web-api-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'web-api-definitions'
        ]);
    }
    confirmDeactivation() {
        return this.rxUtilityModalService.confirmUnsavedChanges();
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.webApiDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    onWebApiDefinitionSaved(webApiDefinitionName) {
        if (this.isNewWepApi) {
            this.router.navigate(['edit2', webApiDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onWebApiDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxWebApiDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageComponent, deps: [{ token: i1.RxUtilityModalsService }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i3.TranslateService }, { token: i4.ActivatedRoute }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Component });
RxWebApiDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWebApiDesignerPageComponent, selector: "rx-web-api-designer-page", viewQueries: [{ propertyName: "webApiDesignerComponent", first: true, predicate: RxWebApiDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-web-api-designer\n  *ngIf=\"isInitialized\"\n  [webApiDefinitionName]=\"webApiDefinitionName\"\n  (webApiDefinitionSaved)=\"onWebApiDefinitionSaved($event)\"\n  (webApiDefinitionErrorLoading)=\"onWebApiDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-web-api-designer>\n", components: [{ type: i5.RxWebApiDesignerComponent, selector: "rx-web-api-designer", inputs: ["webApiDefinitionName"], outputs: ["webApiDefinitionSaved", "webApiDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-web-api-designer-page',
                    templateUrl: './web-api-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxUtilityModalsService }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i3.TranslateService }, { type: i4.ActivatedRoute }, { type: i4.Router }]; }, propDecorators: { webApiDesignerComponent: [{
                type: ViewChild,
                args: [RxWebApiDesignerComponent]
            }] } });
//# sourceMappingURL=web-api-designer-page.component.js.map