import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RuntimeViewModule } from '@helix/platform/view/runtime';
import { RxProcessPreviewComponent } from './process-preview.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
export class RxProcessPreviewModule {
    constructor(componentFactoryResolver, rxViewComponentRegistryService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        rxViewComponentRegistryService.register({
            type: 'rx-process-preview',
            componentFactory: this.componentFactoryResolver.resolveComponentFactory(RxProcessPreviewComponent)
        });
    }
}
RxProcessPreviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.RxViewComponentRegistryService }], target: i0.ɵɵFactoryTarget.NgModule });
RxProcessPreviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewModule, declarations: [RxProcessPreviewComponent], imports: [CommonModule, RuntimeViewModule, TranslateModule], exports: [RxProcessPreviewComponent] });
RxProcessPreviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewModule, imports: [[CommonModule, RuntimeViewModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessPreviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewModule, TranslateModule],
                    declarations: [RxProcessPreviewComponent],
                    entryComponents: [RxProcessPreviewComponent],
                    exports: [RxProcessPreviewComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.RxViewComponentRegistryService }]; } });
//# sourceMappingURL=process-preview.module.js.map