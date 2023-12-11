import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingsComponent } from './admin-settings.component';
import { RxBusyIndicatorModule, RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export class AdminSettingsModule {
}
AdminSettingsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdminSettingsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, declarations: [AdminSettingsComponent], imports: [CommonModule, RxBusyIndicatorModule], exports: [AdminSettingsComponent] });
AdminSettingsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, providers: [RxModalService], imports: [[CommonModule, RxBusyIndicatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AdminSettingsComponent],
                    providers: [RxModalService],
                    imports: [CommonModule, RxBusyIndicatorModule],
                    exports: [AdminSettingsComponent]
                }]
        }] });
//# sourceMappingURL=admin-settings.module.js.map