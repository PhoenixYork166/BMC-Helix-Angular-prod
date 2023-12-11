import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RX_APPLICATION, RxBundleCacheService, RxDefinitionNameService, RxPageTitleService, RxComponentCanDeactivateGuard } from '@helix/platform/shared/api';
import { takeUntil } from 'rxjs/operators';
import { RxEventDesignerComponent } from '../event-designer/event-designer.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@angular/router";
import * as i5 from "../event-designer/event-designer.component";
import * as i6 from "@angular/common";
export class RxEventDesignerPageComponent {
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
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewEvent = !definitionName;
            this.eventDefinitionName = definitionName;
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.event-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'event-definitions'
        ]);
    }
    confirmDeactivation() {
        return this.rxUtilityModalService.confirmUnsavedChanges();
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.eventDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    onEventDefinitionSaved(eventDefinitionName) {
        if (this.isNewEvent) {
            this.router.navigate(['edit2', eventDefinitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onEventDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
}
RxEventDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageComponent, deps: [{ token: i1.RxUtilityModalsService }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i3.TranslateService }, { token: i4.ActivatedRoute }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Component });
RxEventDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxEventDesignerPageComponent, selector: "rx-event-designer-page", viewQueries: [{ propertyName: "eventDesignerComponent", first: true, predicate: RxEventDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-event-designer\n  *ngIf=\"isInitialized\"\n  [eventDefinitionName]=\"eventDefinitionName\"\n  (eventDefinitionSaved)=\"onEventDefinitionSaved($event)\"\n  (eventDefinitionErrorLoading)=\"onEventDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-event-designer>\n", components: [{ type: i5.RxEventDesignerComponent, selector: "rx-event-designer", inputs: ["eventDefinitionName"], outputs: ["eventDefinitionSaved", "eventDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-event-designer-page',
                    templateUrl: './event-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxUtilityModalsService }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i3.TranslateService }, { type: i4.ActivatedRoute }, { type: i4.Router }]; }, propDecorators: { eventDesignerComponent: [{
                type: ViewChild,
                args: [RxEventDesignerComponent]
            }] } });
//# sourceMappingURL=event-designer-page.component.js.map