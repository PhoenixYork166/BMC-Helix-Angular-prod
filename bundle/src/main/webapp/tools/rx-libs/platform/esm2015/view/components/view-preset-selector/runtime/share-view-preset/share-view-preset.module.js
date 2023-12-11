import { NgModule } from '@angular/core';
import { ShareViewPresetComponent } from './share-view-preset.component';
import { AdaptButtonModule, AdaptIconModule, AdaptMetatagModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RecordGridModule } from '../../../record-grid/runtime/record-grid.module';
import { CommonModule } from '@angular/common';
import { ShareViewPresetUsersGridComponent } from './share-view-preset-users-grid/share-view-preset-users-grid.component';
import * as i0 from "@angular/core";
export class ShareViewPresetModule {
}
ShareViewPresetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ShareViewPresetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetModule, declarations: [ShareViewPresetComponent, ShareViewPresetUsersGridComponent], imports: [AdaptMetatagModule,
        AdaptButtonModule,
        ReactiveFormsModule,
        TranslateModule,
        RecordGridModule,
        CommonModule,
        AdaptIconModule,
        AdaptRxLabelModule] });
ShareViewPresetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetModule, imports: [[
            AdaptMetatagModule,
            AdaptButtonModule,
            ReactiveFormsModule,
            TranslateModule,
            RecordGridModule,
            CommonModule,
            AdaptIconModule,
            AdaptRxLabelModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShareViewPresetModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptMetatagModule,
                        AdaptButtonModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        RecordGridModule,
                        CommonModule,
                        AdaptIconModule,
                        AdaptRxLabelModule
                    ],
                    declarations: [ShareViewPresetComponent, ShareViewPresetUsersGridComponent]
                }]
        }] });
//# sourceMappingURL=share-view-preset.module.js.map