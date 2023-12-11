import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RuntimeViewLayoutService } from '../layout/runtime-view-layout.service';
import { RuntimeViewModelApi } from '../runtime-view-model-api.class';
import { RuntimeViewModel } from '../runtime-view.model';
import { RxRuntimeViewRegistryService } from '../runtime-view-registry.service';
import { RxViewDefinitionCacheService, RxViewDefinitionService } from '@helix/platform/view/api';
import { RxAssociationDefinitionCacheService } from '@helix/platform/association/api';
import { RxProcessDefinitionCacheService } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "../runtime-view-model-api.class";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "../layout/runtime-view-layout.service";
import * as i4 from "../runtime-view.model";
import * as i5 from "@helix/platform/process/api";
import * as i6 from "../runtime-view-registry.service";
import * as i7 from "@helix/platform/view/api";
import * as i8 from "@helix/platform/association/api";
import * as i9 from "../components/runtime-view-canvas/component/runtime-view-canvas.component";
import * as i10 from "@angular/common";
export class RuntimeViewComponent {
    constructor(runtimeViewModelApi, rxRecordDefinitionCacheService, runtimeViewLayoutService, runtimeViewModel, rxProcessDefinitionCacheService, rxRuntimeViewRegistryService, rxViewDefinitionCacheService, rxAssociationDefinitionCacheService, rxViewDefinitionService) {
        this.runtimeViewModelApi = runtimeViewModelApi;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.runtimeViewLayoutService = runtimeViewLayoutService;
        this.runtimeViewModel = runtimeViewModel;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxAssociationDefinitionCacheService = rxAssociationDefinitionCacheService;
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.destroyed$ = new ReplaySubject(1);
        this.save = new EventEmitter();
        this.closeView = new EventEmitter();
        this.cancelView = new EventEmitter();
        this.beforeLoad = new EventEmitter();
        this.afterLoad = new EventEmitter();
        this.rxAssociationDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxProcessDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxRecordDefinitionCacheService.registerConsumer(this.destroyed$);
        this.rxViewDefinitionCacheService.registerConsumer(this.destroyed$);
    }
    onTrigger() {
        this.runtimeViewModel.isUserInteractionDetected = true;
    }
    ngOnInit() {
        this.init();
        this.runtimeViewModel.cancel$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.cancelView.emit());
        this.runtimeViewModel.save$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.save.emit());
        this.runtimeViewModel.close$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((viewOutputParams) => this.closeView.emit(viewOutputParams));
    }
    ngOnChanges(changes) {
        if (changes.configuration.currentValue &&
            changes.configuration.previousValue &&
            changes.configuration.currentValue.viewDefinitionName !== changes.configuration.previousValue.viewDefinitionName) {
            this.runtimeViewModelApi.clear();
            this.runtimeViewLayoutService.clear();
            this.configuration = changes.configuration.currentValue;
            this.init();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxRuntimeViewRegistryService.unregister(this.runtimeViewModel);
    }
    init() {
        this.beforeLoad.emit();
        this.runtimeViewModel.init(this.configuration).subscribe({
            complete: () => {
                this.runtimeViewModelApi.init(this.runtimeViewModel);
                this.runtimeViewLayoutService.init(this.runtimeViewModel, this.runtimeViewModelApi);
                this.hostClass = this.runtimeViewModel.viewDefinition.styles || '';
                if (this.rxViewDefinitionService.isPageView(this.runtimeViewModel.viewDefinition)) {
                    this.hostClass = this.hostClass + ' rx-page-view';
                }
                this.viewDefinitionGuid = this.runtimeViewModel.viewDefinition.guid;
                this.runtimeViewModel.isUserInteractionDetected = false;
                this.afterLoad.emit();
            }
        });
        if (this.configuration.onRegisterApi) {
            this.configuration.onRegisterApi(this.runtimeViewModel.api);
        }
        this.rxRuntimeViewRegistryService.register(this.runtimeViewModel);
    }
}
RuntimeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewComponent, deps: [{ token: i1.RuntimeViewModelApi }, { token: i2.RxRecordDefinitionCacheService }, { token: i3.RuntimeViewLayoutService }, { token: i4.RuntimeViewModel }, { token: i5.RxProcessDefinitionCacheService }, { token: i6.RxRuntimeViewRegistryService }, { token: i7.RxViewDefinitionCacheService }, { token: i8.RxAssociationDefinitionCacheService }, { token: i7.RxViewDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
RuntimeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RuntimeViewComponent, selector: "rx-runtime-view", inputs: { configuration: "configuration" }, outputs: { save: "save", closeView: "closeView", cancelView: "cancelView", beforeLoad: "beforeLoad", afterLoad: "afterLoad" }, host: { listeners: { "focusin": "onTrigger()" }, properties: { "class": "this.hostClass", "attr.rx-view-definition-guid": "this.viewDefinitionGuid" } }, providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService], usesOnChanges: true, ngImport: i0, template: "<rx-runtime-view-canvas\n  (componentPropertyChanged)=\"runtimeViewModel.onViewComponentPropertyChanged($event)\"\n  *ngIf=\"runtimeViewLayoutService.layout\"\n  [layout]=\"runtimeViewLayoutService.layout\"\n></rx-runtime-view-canvas>\n", styles: [":host.rx-page-view ::ng-deep .outlet-padding{padding:0}:host.rx-page-view ::ng-deep rx-runtime-view-canvas-item{height:100%}\n"], components: [{ type: i9.RuntimeViewCanvasComponent, selector: "rx-runtime-view-canvas", inputs: ["layout"], outputs: ["componentPropertyChanged"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-runtime-view',
                    templateUrl: './runtime-view.component.html',
                    styleUrls: ['./runtime-view.component.scss'],
                    providers: [RuntimeViewModel, RuntimeViewModelApi, RuntimeViewLayoutService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RuntimeViewModelApi }, { type: i2.RxRecordDefinitionCacheService }, { type: i3.RuntimeViewLayoutService }, { type: i4.RuntimeViewModel }, { type: i5.RxProcessDefinitionCacheService }, { type: i6.RxRuntimeViewRegistryService }, { type: i7.RxViewDefinitionCacheService }, { type: i8.RxAssociationDefinitionCacheService }, { type: i7.RxViewDefinitionService }]; }, propDecorators: { configuration: [{
                type: Input
            }], save: [{
                type: Output
            }], closeView: [{
                type: Output
            }], cancelView: [{
                type: Output
            }], beforeLoad: [{
                type: Output
            }], afterLoad: [{
                type: Output
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }], viewDefinitionGuid: [{
                type: HostBinding,
                args: ['attr.rx-view-definition-guid']
            }], onTrigger: [{
                type: HostListener,
                args: ['focusin']
            }] } });
//# sourceMappingURL=runtime-view.component.js.map