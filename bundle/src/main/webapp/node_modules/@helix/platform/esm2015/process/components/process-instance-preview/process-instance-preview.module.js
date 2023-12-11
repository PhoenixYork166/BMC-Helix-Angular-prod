import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RuntimeViewModule } from '@helix/platform/view/runtime';
import { RxProcessInstancePreviewComponent } from './process-instance-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxProcessInstancePreviewModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-process-instance-preview',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxProcessInstancePreviewComponent)
        });
    }
}
RxProcessInstancePreviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessInstancePreviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewModule, declarations: [RxProcessInstancePreviewComponent], imports: [CommonModule, RuntimeViewModule, TranslateModule], exports: [RxProcessInstancePreviewComponent] });
RxProcessInstancePreviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewModule, imports: [[CommonModule, RuntimeViewModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessInstancePreviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewModule, TranslateModule],
                    declarations: [RxProcessInstancePreviewComponent],
                    entryComponents: [RxProcessInstancePreviewComponent],
                    exports: [RxProcessInstancePreviewComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=process-instance-preview.module.js.map