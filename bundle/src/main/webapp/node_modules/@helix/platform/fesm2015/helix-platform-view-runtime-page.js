import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { ViewActionsModule } from '@helix/platform/view/actions';
import { ViewComponentsModule } from '@helix/platform/view/components';
import * as i4 from '@helix/platform/view/runtime';
import { RX_RUNTIME_VIEW, RuntimeViewModule } from '@helix/platform/view/runtime';
import { TranslateModule } from '@ngx-translate/core';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2 from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { take, pluck, distinctUntilChanged } from 'rxjs/operators';
import { isEqual, every } from 'lodash';
import * as i5 from '@helix/platform/utils';
import * as i3 from '@helix/platform/ui-kit';
import * as i6 from '@helix/platform/shared/components';
import { ApprovalConsoleModule } from '@helix/platform/approval/components';
import { DataloadModule } from '@helix/platform/dataload/components';

class ViewRuntimePageComponent {
    constructor(route, rxDefinitionNameService, rxPageTitleService, rxPreviousStateService, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxRuntimeViewRegistryService, rxIframeUtilsService, rxGainsightConfiguratorService, rxFeatureService) {
        this.route = route;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxIframeUtilsService = rxIframeUtilsService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.rxFeatureService = rxFeatureService;
        this.showRuntimeView = true;
        this.currentRoute = {
            bundleId: '',
            viewDefinitionName: '',
            inputParams: null
        };
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        if (this.rxIframeUtilsService.isRunningInIframe() && this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            this.rxGainsightConfiguratorService.gainsightInitConfiguration$
                .pipe(take(1))
                .subscribe();
        }
        this.subscription = combineLatest([
            this.route.params.pipe(pluck('bundleId')),
            this.route.params.pipe(pluck('viewDefinitionName')),
            this.route.queryParams
        ])
            .pipe(distinctUntilChanged(isEqual))
            .subscribe(([bundleId, viewDefinitionName, inputParams]) => {
            // LMA:: Handling the case where we are on the same route but the input parameters are not the same.
            // In this case we have to force the view reload.
            // https://stackoverflow.com/questions/38971660/angular-2-reload-route-on-param-change
            if (this.currentRoute.bundleId === bundleId &&
                this.currentRoute.viewDefinitionName === viewDefinitionName &&
                !isEqual(this.currentRoute.inputParams, inputParams)) {
                this.showRuntimeView = false;
                setTimeout(() => (this.showRuntimeView = true));
            }
            this.currentRoute.bundleId = bundleId;
            this.currentRoute.viewDefinitionName = viewDefinitionName;
            this.currentRoute.inputParams = inputParams;
            this.updateConfig({ viewDefinitionName, inputParams });
            this.rxPageTitleService.set(this.rxDefinitionNameService.getDisplayName(viewDefinitionName));
            this.rxGainsightConfiguratorService.updateGlobalContext(null, viewDefinitionName);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        return every(this.rxRuntimeViewRegistryService.getAll(), (runtimeView) => runtimeView.canClose());
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onCancelView() {
        this.rxComponentCanDeactivateGuard.disable();
        this.onCloseOrCancel({ actionName: RX_RUNTIME_VIEW.actions.cancel });
    }
    onCloseView(outputParams) {
        this.onCloseOrCancel({ actionName: RX_RUNTIME_VIEW.actions.close, outputParams });
    }
    onCloseOrCancel(payload) {
        if (this.rxIframeUtilsService.isRunningInIframe()) {
            this.rxIframeUtilsService.postMessageToHost(payload);
        }
        else {
            this.rxPreviousStateService.goToPrevState();
        }
    }
    onRegisterApi(api) {
        this.runtimeViewApi = api;
    }
    updateConfig(cfg) {
        this.configuration = Object.assign(Object.assign(Object.assign({}, this.configuration), cfg), { onRegisterApi: this.onRegisterApi.bind(this) });
    }
}
ViewRuntimePageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxPreviousStateService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i3.RxUtilityModalsService }, { token: i4.RxRuntimeViewRegistryService }, { token: i5.RxIframeUtilsService }, { token: i6.RxGainsightConfiguratorService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
ViewRuntimePageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ViewRuntimePageComponent, selector: "rx-view-runtime-page", ngImport: i0, template: "<rx-runtime-view\n  [configuration]=\"configuration\"\n  (cancelView)=\"onCancelView()\"\n  (closeView)=\"onCloseView($event)\"\n  *ngIf=\"showRuntimeView\"\n></rx-runtime-view>\n", components: [{ type: i4.RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-view-runtime-page',
                    templateUrl: './view-runtime-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxPreviousStateService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i3.RxUtilityModalsService }, { type: i4.RxRuntimeViewRegistryService }, { type: i5.RxIframeUtilsService }, { type: i6.RxGainsightConfiguratorService }, { type: i2.RxFeatureService }]; } });

const routes = [
    {
        path: '',
        component: ViewRuntimePageComponent,
        pathMatch: 'full'
    }
];
class ViewRuntimePageRoutingModule {
}
ViewRuntimePageRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewRuntimePageRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, imports: [i1.RouterModule], exports: [RouterModule] });
ViewRuntimePageRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, imports: [[RouterModule.forChild(routes)], RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                }]
        }] });

class ViewRuntimePageModule {
}
ViewRuntimePageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewRuntimePageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageModule, declarations: [ViewRuntimePageComponent], imports: [CommonModule,
        TranslateModule,
        ViewRuntimePageRoutingModule,
        RuntimeViewModule,
        ViewComponentsModule,
        ViewActionsModule,
        ApprovalConsoleModule,
        DataloadModule] });
ViewRuntimePageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageModule, imports: [[
            CommonModule,
            TranslateModule,
            ViewRuntimePageRoutingModule,
            RuntimeViewModule,
            ViewComponentsModule,
            ViewActionsModule,
            ApprovalConsoleModule,
            DataloadModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewRuntimePageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ViewRuntimePageComponent],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        ViewRuntimePageRoutingModule,
                        RuntimeViewModule,
                        ViewComponentsModule,
                        ViewActionsModule,
                        ApprovalConsoleModule,
                        DataloadModule
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ViewRuntimePageComponent, ViewRuntimePageModule };
//# sourceMappingURL=helix-platform-view-runtime-page.js.map
