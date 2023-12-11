import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptCodeViewerModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { CustomizationOptionsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import { RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { RxWebApiDesignerComponent } from './web-api-designer.component';
import * as i0 from "@angular/core";
export class RxWebApiDesignerModule {
}
RxWebApiDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxWebApiDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, declarations: [RxWebApiDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxFormsModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        CustomizationOptionsModule,
        FormsModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxDesignerHeaderModule,
        RxRevertCustomizationModule,
        RxValidationIssuesModule,
        TranslateModule], exports: [RxWebApiDesignerComponent] });
RxWebApiDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, imports: [[
            AdaptCodeViewerModule,
            AdaptRxFormsModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            CommonModule,
            CustomizationOptionsModule,
            FormsModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            RxDesignerHeaderModule,
            RxRevertCustomizationModule,
            RxValidationIssuesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWebApiDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxWebApiDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxFormsModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        CommonModule,
                        CustomizationOptionsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        RxDesignerHeaderModule,
                        RxRevertCustomizationModule,
                        RxValidationIssuesModule,
                        TranslateModule
                    ],
                    exports: [RxWebApiDesignerComponent]
                }]
        }] });
//# sourceMappingURL=web-api-designer.module.js.map