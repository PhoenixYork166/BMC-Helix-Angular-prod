import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RX_APPLICATION, RxBundleCacheService, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigDesignerComponent } from '../config-designer/config-designer.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../config-designer/config-designer.component";
import * as i6 from "@angular/common";
export class ConfigDesignerPageComponent {
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
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(({ definitionName, bundleId }) => {
            this.rxBundleCacheService.bundleId = bundleId || this.rxDefinitionNameService.getBundleId(definitionName);
            this.isInitialized = true;
            this.isNewConfig = !definitionName;
            this.configuration = Object.assign(Object.assign({}, this.configuration), { definitionName: definitionName, bundleId: this.rxBundleCacheService.bundleId });
            this.rxPageTitleService.set([
                this.rxDefinitionNameService.getDisplayName(definitionName),
                this.translateService.instant('com.bmc.arsys.rx.client.config-designer.title')
            ]);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    onDefinitionSaved(definitionName) {
        if (this.isNewConfig) {
            this.router.navigate(['edit2', definitionName], { relativeTo: this.activatedRoute.parent });
        }
    }
    onDefinitionErrorLoading() {
        this.router.navigate(['new2', this.rxBundleCacheService.bundleId], { relativeTo: this.activatedRoute.parent });
    }
    onCloseDesigner() {
        this.router.navigate([
            RX_APPLICATION.innovationStudioBundleId,
            this.rxBundleCacheService.bundleId,
            'config-definitions'
        ]);
    }
    canDeactivate() {
        var _a, _b;
        return (_b = (_a = this.configDesignerComponent) === null || _a === void 0 ? void 0 : _a.canDeactivate()) !== null && _b !== void 0 ? _b : true;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
ConfigDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageComponent, deps: [{ token: i1.ActivatedRoute }, { token: i2.RxBundleCacheService }, { token: i2.RxDefinitionNameService }, { token: i3.RxUtilityModalsService }, { token: i2.RxPageTitleService }, { token: i1.Router }, { token: i4.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }], target: i0.ɵɵFactoryTarget.Component });
ConfigDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ConfigDesignerPageComponent, selector: "rx-config-designer-page", viewQueries: [{ propertyName: "configDesignerComponent", first: true, predicate: ConfigDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-config-designer\n  *ngIf=\"isInitialized\"\n  [configuration]=\"configuration\"\n  (definitionSaved)=\"onDefinitionSaved($event)\"\n  (definitionErrorLoading)=\"onDefinitionErrorLoading()\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-config-designer>\n", components: [{ type: i5.ConfigDesignerComponent, selector: "rx-config-designer", inputs: ["configuration"], outputs: ["definitionSaved", "definitionErrorLoading", "closeDesigner"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-config-designer-page',
                    templateUrl: './config-designer-page.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }, { type: i2.RxBundleCacheService }, { type: i2.RxDefinitionNameService }, { type: i3.RxUtilityModalsService }, { type: i2.RxPageTitleService }, { type: i1.Router }, { type: i4.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }]; }, propDecorators: { configDesignerComponent: [{
                type: ViewChild,
                args: [ConfigDesignerComponent]
            }] } });
//# sourceMappingURL=config-designer-page.component.js.map