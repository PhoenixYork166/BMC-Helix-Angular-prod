import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewActionsModule } from '@helix/platform/view/actions';
import { ViewComponentsModule } from '@helix/platform/view/components';
import { RuntimeViewModule } from '@helix/platform/view/runtime';
import { TranslateModule } from '@ngx-translate/core';
import { ViewRuntimePageRoutingModule } from './view-runtime-page-routing.module';
import { ViewRuntimePageComponent } from './view-runtime-page.component';
import { ApprovalConsoleModule } from '@helix/platform/approval/components';
import { DataloadModule } from '@helix/platform/dataload/components';
import * as i0 from "@angular/core";
export class ViewRuntimePageModule {
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
//# sourceMappingURL=view-runtime-page.module.js.map