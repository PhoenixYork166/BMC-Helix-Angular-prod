import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptAlertModule, AdaptButtonModule, AdaptModalModule, AdaptRxFormControlModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { RenameDefinitionModalComponent } from './rename-definition-modal.component';
import { RxDirectivesModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { RxUniqueValidatorModule } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class RenameDefinitionModalModule {
}
RenameDefinitionModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RenameDefinitionModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, declarations: [RenameDefinitionModalComponent], imports: [i1.AdaptAlertModule, AdaptButtonModule,
        AdaptModalModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        RxDirectivesModule,
        RxUniqueValidatorModule,
        TranslateModule] });
RenameDefinitionModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, imports: [[
            AdaptAlertModule.forRoot(),
            AdaptButtonModule,
            AdaptModalModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            RxDirectivesModule,
            RxUniqueValidatorModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RenameDefinitionModalComponent],
                    imports: [
                        AdaptAlertModule.forRoot(),
                        AdaptButtonModule,
                        AdaptModalModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        RxDirectivesModule,
                        RxUniqueValidatorModule,
                        TranslateModule
                    ],
                    entryComponents: [RenameDefinitionModalComponent]
                }]
        }] });
//# sourceMappingURL=rename-definition-modal.module.js.map