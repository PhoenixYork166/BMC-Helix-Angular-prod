import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { DocumentDesignerComponent } from '../document-designer/document-designer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../document-designer/document-designer.component";
import * as i6 from "@angular/common";
export class DocumentDesignerPageComponent {
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
        this.definitionsRoute = 'document-definitions';
        this.pageTitle = this.translateService.instant('com.bmc.arsys.rx.client.document-designer.title');
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = this.activatedRoute.params.subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewDefinition = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { bundleId: this.rxBundleCacheService.bundleId, definitionName });
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
            this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
DocumentDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i1.Router }, { token: i2.RxBundleCacheService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i3.RxUtilityModalsService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
DocumentDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DocumentDesignerPageComponent, selector: "rx-document-designer-page", viewQueries: [{ propertyName: "designerComponent", first: true, predicate: DocumentDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-document-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-document-designer>\n", components: [{ type: i5.DocumentDesignerComponent, selector: "rx-document-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-document-designer-page',
                    templateUrl: './document-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.RxBundleCacheService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i3.RxUtilityModalsService }, { type: i4.TranslateService }]; }, propDecorators: { designerComponent: [{
                type: ViewChild,
                args: [DocumentDesignerComponent]
            }] } });
//# sourceMappingURL=document-designer-page.component.js.map