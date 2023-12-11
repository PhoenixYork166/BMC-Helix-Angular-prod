import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptModalModule } from '@bmc-ux/adapt-angular';
import { ViewActionsDesignModule } from '@helix/platform/view/actions';
import { ViewDesignerModule } from '@helix/platform/view/designer';
import { TranslateModule } from '@ngx-translate/core';
import { ViewDesignerPageComponent } from './view-designer-page.component';
import { ViewComponentsModule } from '@helix/platform/view/components';
import { ApprovalConsoleModule } from '@helix/platform/approval/components';
import { DataloadModule } from '@helix/platform/dataload/components';
import * as i0 from "@angular/core";
export class RxViewDesignerPageModule {
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
//# sourceMappingURL=view-designer-page.module.js.map