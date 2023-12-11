import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptButtonGroupModule, AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { WorkspaceComponent } from './workspace.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBundleModalModule } from './create-bundle-modal/create-bundle-modal.module';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class WorkspaceModule {
}
/** @nocollapse */ WorkspaceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ WorkspaceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, declarations: [WorkspaceComponent], imports: [CommonModule,
        AdaptTableModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptDropdownModule,
        TranslateModule,
        CreateBundleModalModule,
        RouterModule] });
/** @nocollapse */ WorkspaceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, imports: [[
            CommonModule,
            AdaptTableModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptDropdownModule,
            TranslateModule,
            CreateBundleModalModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WorkspaceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WorkspaceComponent],
                    imports: [
                        CommonModule,
                        AdaptTableModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptDropdownModule,
                        TranslateModule,
                        CreateBundleModalModule,
                        RouterModule
                    ]
                }]
        }] });
//# sourceMappingURL=workspace.module.js.map