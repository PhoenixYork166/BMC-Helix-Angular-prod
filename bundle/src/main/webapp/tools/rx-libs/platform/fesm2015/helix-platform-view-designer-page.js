import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewChild, NgModule } from '@angular/core';
import { AdaptModalModule } from '@bmc-ux/adapt-angular';
import { ViewActionsDesignModule } from '@helix/platform/view/actions';
import * as i5 from '@helix/platform/view/designer';
import { RxViewDesignerComponent, ViewDesignerModule } from '@helix/platform/view/designer';
import * as i4 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i1 from '@angular/router';
import * as i2 from '@helix/platform/shared/api';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import * as i3 from '@helix/platform/ui-kit';
import { toNumber, values } from 'lodash';
import { pluck } from 'rxjs/operators';
import { RX_VIEW_DEFINITION, RX_SHELL } from '@helix/platform/view/api';
import { ViewComponentsModule } from '@helix/platform/view/components';
import { ApprovalConsoleModule } from '@helix/platform/approval/components';
import { DataloadModule } from '@helix/platform/dataload/components';

class ViewDesignerPageComponent {
    constructor(activatedRoute, bundleCacheService, definitionNameService, rxUtilityModalsService, rxPageTitleService, router, translateService, rxComponentCanDeactivateGuard) {
        this.activatedRoute = activatedRoute;
        this.bundleCacheService = bundleCacheService;
        this.definitionNameService = definitionNameService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxPageTitleService = rxPageTitleService;
        this.router = router;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.subscription = combineLatest([
            this.activatedRoute.params,
            this.activatedRoute.queryParams.pipe(pluck('layoutTemplate'))
        ]).subscribe(([{ definitionName, bundleId }, layoutTemplate]) => {
            this.bundleCacheService.bundleId = bundleId || this.definitionNameService.getBundleId(definitionName);
            this.isNewView = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { viewDefinitionName: definitionName, bundleId: this.bundleCacheService.bundleId, layoutTemplate: toNumber(layoutTemplate) || RX_VIEW_DEFINITION.defaultLayoutTemplateId, paletteComponentsPredicate: (descriptor) => !values(RX_SHELL.navBar).includes(descriptor.type) });
            this.rxPageTitleService.set([
                this.definitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.view-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onViewDefinitionSaved(viewDefinitionName) {
        if (this.isNewView) {
            this.router.navigate(['edit', viewDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onViewDefinitionErrorLoading() {
        this.router.navigate(['new', this.bundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.bundleCacheService.bundleId,
            'view-definitions'
        ]);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.viewDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
ViewDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i3.RxUtilityModalsService }, { token: i2.RxPageTitleService }, { token: i1.Router }, { token: i4.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Component });
ViewDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewDesignerPageComponent, selector: "rx-view-designer-page", viewQueries: [{ propertyName: "viewDesignerComponent", first: true, predicate: RxViewDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-view-designer\n  *ngIf=\"configuration\"\n  (viewDefinitionSaved)=\"onViewDefinitionSaved($event)\"\n  (viewDefinitionErrorLoading)=\"onViewDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n  [configuration]=\"configuration\"\n></rx-view-designer>\n", styles: [":host{display:flex;height:100%}\n"], components: [{ type: i5.RxViewDesignerComponent, selector: "rx-view-designer", inputs: ["configuration"], outputs: ["viewDefinitionSaved", "viewDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-designer-page',
                    templateUrl: './view-designer-page.component.html',
                    styleUrls: ['./view-designer-page.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i3.RxUtilityModalsService }, { type: i2.RxPageTitleService }, { type: i1.Router }, { type: i4.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }]; }, propDecorators: { viewDesignerComponent: [{
                type: ViewChild,
                args: [RxViewDesignerComponent]
            }] } });

class RxViewDesignerPageModule {
}
RxViewDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxViewDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPageModule, declarations: [ViewDesignerPageComponent], imports: [CommonModule,
        TranslateModule,
        AdaptModalModule,
        ViewDesignerModule,
        ViewComponentsModule,
        ViewActionsDesignModule,
        ApprovalConsoleModule,
        DataloadModule], exports: [ViewDesignerPageComponent] });
RxViewDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPageModule, imports: [[
            CommonModule,
            TranslateModule,
            AdaptModalModule,
            ViewDesignerModule,
            ViewComponentsModule,
            ViewActionsDesignModule,
            ApprovalConsoleModule,
            DataloadModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ViewDesignerPageComponent],
                    exports: [ViewDesignerPageComponent],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        AdaptModalModule,
                        ViewDesignerModule,
                        ViewComponentsModule,
                        ViewActionsDesignModule,
                        ApprovalConsoleModule,
                        DataloadModule
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxViewDesignerPageModule, ViewDesignerPageComponent };
//# sourceMappingURL=helix-platform-view-designer-page.js.map