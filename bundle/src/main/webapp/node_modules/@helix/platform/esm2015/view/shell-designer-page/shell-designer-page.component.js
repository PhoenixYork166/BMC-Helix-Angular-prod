import { Component, ViewChild } from '@angular/core';
import { RX_VIEW_MODEL, RxViewDesignerComponent } from '@helix/platform/view/designer';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxGlobalCacheService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import { RX_SHELL } from '@helix/platform/view/api';
import { RxShellModel } from './shell-model.service';
import { values } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/view/designer";
import * as i5 from "@angular/common";
export class RxShellDesignerPageComponent {
    constructor(activatedRoute, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxDefinitionNameService, rxPageTitleService, rxBundleCacheService, rxGlobalCacheService, rxPreviousStateService) {
        this.activatedRoute = activatedRoute;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.configuration$ = this.activatedRoute.params.pipe(pluck('bundleId'), switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), tap((bundleDescriptor) => {
            this.rxBundleCacheService.bundleId = bundleDescriptor.id;
            this.rxPageTitleService.set(['Application shell', bundleDescriptor.friendlyName], RX_APPLICATION.innovationStudioBundleId);
        }), map((bundleDescriptor) => ({
            bundleId: bundleDescriptor.id,
            viewDefinitionName: this.rxDefinitionNameService.getDefinitionName(bundleDescriptor.id, RX_APPLICATION.shellDefinitionName),
            disablePreview: true,
            paletteComponentsPredicate: (descriptor) => values(RX_SHELL.navBar).includes(descriptor.type)
        })));
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
    }
    ngOnDestroy() {
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        if (this.viewDesignerComponent) {
            return this.viewDesignerComponent.canDeactivate();
        }
        return true;
    }
    onCloseDesigner() {
        this.rxPreviousStateService.goToPrevState();
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
RxShellDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxComponentCanDeactivateGuard }, { token: i3.RxUtilityModalsService }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxBundleCacheService }, { token: i2.RxGlobalCacheService }, { token: i2.RxPreviousStateService }], target: i0.ɵɵFactoryTarget.Component });
RxShellDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignerPageComponent, selector: "rx-shell-designer-page", providers: [
        RxShellModel,
        {
            provide: RX_VIEW_MODEL,
            useExisting: RxShellModel
        }
    ], viewQueries: [{ propertyName: "viewDesignerComponent", first: true, predicate: RxViewDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-view-designer\n  *ngIf=\"configuration$ | async as config\"\n  [configuration]=\"config\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-view-designer>\n", styles: [""], components: [{ type: i4.RxViewDesignerComponent, selector: "rx-view-designer", inputs: ["configuration"], outputs: ["viewDefinitionSaved", "viewDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i5.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-designer-page',
                    templateUrl: './shell-designer-page.component.html',
                    styleUrls: ['./shell-designer-page.component.scss'],
                    providers: [
                        RxShellModel,
                        {
                            provide: RX_VIEW_MODEL,
                            useExisting: RxShellModel
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxComponentCanDeactivateGuard }, { type: i3.RxUtilityModalsService }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxBundleCacheService }, { type: i2.RxGlobalCacheService }, { type: i2.RxPreviousStateService }]; }, propDecorators: { viewDesignerComponent: [{
                type: ViewChild,
                args: [RxViewDesignerComponent, { static: false }]
            }] } });
//# sourceMappingURL=shell-designer-page.component.js.map