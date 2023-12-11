import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAlertModule } from '@bmc-ux/adapt-angular';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RuntimeViewComponent } from './component/runtime-view.component';
import { RuntimeViewRootComponent } from './components/runtime-component/runtime-view-root.component';
import { RuntimeViewCanvasModule } from './components/runtime-view-canvas/runtime-view-canvas.module';
import { RuntimeViewModalComponent } from './components/runtime-view-modal/runtime-view-modal.component';
import * as i0 from "@angular/core";
export class RuntimeViewModule {
}
RuntimeViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RuntimeViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent], imports: [CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule], exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent] });
RuntimeViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, imports: [[CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule], RuntimeViewCanvasModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuntimeViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RuntimeViewCanvasModule, TranslateModule, AdaptAlertModule, RxBusyIndicatorModule],
                    exports: [RuntimeViewCanvasModule, RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                    declarations: [RuntimeViewComponent, RuntimeViewRootComponent, RuntimeViewModalComponent],
                    entryComponents: [RuntimeViewRootComponent, RuntimeViewModalComponent]
                }]
        }] });
//# sourceMappingURL=runtime-view.module.js.map