import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxComponentCanDeactivateGuard, RxDefinitionNameService, RxFeatureService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import { RX_RUNTIME_VIEW, RxRuntimeViewRegistryService } from '@helix/platform/view/runtime';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, pluck, take } from 'rxjs/operators';
import { every, isEqual } from 'lodash';
import { RxIframeUtilsService } from '@helix/platform/utils';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@helix/platform/view/runtime";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@angular/common";
export class ViewRuntimePageComponent {
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
//# sourceMappingURL=view-runtime-page.component.js.map