import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdaptButtonModule, AdaptDropdownModule, AdaptIconModule } from '@bmc-ux/adapt-angular';
import { RxDefinitionModule, RxOverlayModule } from '@helix/platform/shared/api';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { DefinitionTabComponent } from './definition-tab.component';
import * as i0 from "@angular/core";
export class DefinitionTabModule {
}
/** @nocollapse */ DefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, declarations: [DefinitionTabComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptIconModule,
        AdaptDropdownModule,
        RxDefinitionModule,
        RecordGridModule,
        RxBusyIndicatorModule,
        RxOverlayModule,
        TranslateModule,
        RouterModule], exports: [DefinitionTabComponent] });
/** @nocollapse */ DefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptIconModule,
            AdaptDropdownModule,
            RxDefinitionModule,
            RecordGridModule,
            RxBusyIndicatorModule,
            RxOverlayModule,
            TranslateModule,
            RouterModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        AdaptDropdownModule,
                        RxDefinitionModule,
                        RecordGridModule,
                        RxBusyIndicatorModule,
                        RxOverlayModule,
                        TranslateModule,
                        RouterModule
                    ],
                    declarations: [DefinitionTabComponent],
                    exports: [DefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=definition-tab.module.js.map