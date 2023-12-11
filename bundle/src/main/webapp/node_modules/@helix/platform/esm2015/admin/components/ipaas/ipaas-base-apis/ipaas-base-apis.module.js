import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpaasBaseApisComponent } from './ipaas-base-apis.component';
import { AdminSettingsModule } from '@helix/platform/shared/components';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { FormsModule } from '@angular/forms';
import { RxUniqueValidatorModule } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export class IpaasBaseApisModule {
}
IpaasBaseApisModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IpaasBaseApisModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisModule, declarations: [IpaasBaseApisComponent, GroupEditorComponent], imports: [CommonModule,
        AdminSettingsModule,
        RecordGridModule,
        TranslateModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        FormsModule,
        RxUniqueValidatorModule], exports: [IpaasBaseApisComponent] });
IpaasBaseApisModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisModule, imports: [[
            CommonModule,
            AdminSettingsModule,
            RecordGridModule,
            TranslateModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule,
            FormsModule,
            RxUniqueValidatorModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IpaasBaseApisModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdminSettingsModule,
                        RecordGridModule,
                        TranslateModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule,
                        FormsModule,
                        RxUniqueValidatorModule
                    ],
                    declarations: [IpaasBaseApisComponent, GroupEditorComponent],
                    exports: [IpaasBaseApisComponent]
                }]
        }] });
//# sourceMappingURL=ipaas-base-apis.module.js.map