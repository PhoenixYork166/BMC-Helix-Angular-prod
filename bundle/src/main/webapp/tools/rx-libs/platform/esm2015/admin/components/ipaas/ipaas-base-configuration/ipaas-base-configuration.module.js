import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RxConnectionTesterModule } from '@helix/platform/ui-kit';
import { IpaasBaseConfigurationComponent } from './ipaas-base-configuration.component';
import * as i0 from "@angular/core";
export class IpaasBaseConfigurationModule {
}
IpaasBaseConfigurationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IpaasBaseConfigurationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationModule, declarations: [IpaasBaseConfigurationComponent], imports: [AdminSettingsModule,
        AdaptButtonModule,
        CommonModule,
        TranslateModule,
        RxConnectionTesterModule,
        ReactiveFormsModule], exports: [IpaasBaseConfigurationComponent] });
IpaasBaseConfigurationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationModule, imports: [[
            AdminSettingsModule,
            AdaptButtonModule,
            CommonModule,
            TranslateModule,
            RxConnectionTesterModule,
            ReactiveFormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseConfigurationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdminSettingsModule,
                        AdaptButtonModule,
                        CommonModule,
                        TranslateModule,
                        RxConnectionTesterModule,
                        ReactiveFormsModule
                    ],
                    declarations: [IpaasBaseConfigurationComponent],
                    exports: [IpaasBaseConfigurationComponent]
                }]
        }] });
//# sourceMappingURL=ipaas-base-configuration.module.js.map