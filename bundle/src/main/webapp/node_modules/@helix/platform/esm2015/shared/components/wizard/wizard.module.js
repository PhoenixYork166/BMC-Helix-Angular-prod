import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptAlertModule, AdaptButtonModule, AdaptModalModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RxDynamicComponentRendererModule } from '../dynamic-component-renderer/dynamic-component-renderer.module';
import { RxWizardService } from './wizard.service';
import { RxWizardModalComponent } from './wizard-modal.component';
import * as i0 from "@angular/core";
export class RxWizardModule {
}
RxWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, declarations: [RxWizardModalComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptModalModule,
        AdaptAlertModule,
        AdaptTabsModule,
        TranslateModule,
        RxDynamicComponentRendererModule], exports: [RxWizardModalComponent] });
RxWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, providers: [RxWizardService], imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptModalModule,
            AdaptAlertModule,
            AdaptTabsModule,
            TranslateModule,
            RxDynamicComponentRendererModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptModalModule,
                        AdaptAlertModule,
                        AdaptTabsModule,
                        TranslateModule,
                        RxDynamicComponentRendererModule
                    ],
                    declarations: [RxWizardModalComponent],
                    entryComponents: [RxWizardModalComponent],
                    exports: [RxWizardModalComponent],
                    providers: [RxWizardService]
                }]
        }] });
//# sourceMappingURL=wizard.module.js.map