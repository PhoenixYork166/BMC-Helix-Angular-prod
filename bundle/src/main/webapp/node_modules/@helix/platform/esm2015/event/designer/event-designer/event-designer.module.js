import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptCodeViewerModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { CustomizationOptionsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxFormBuilderModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import { RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { RxEventDesignerComponent } from './event-designer.component';
import * as i0 from "@angular/core";
export class RxEventDesignerModule {
}
RxEventDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxEventDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, declarations: [RxEventDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxFormsModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        CustomizationOptionsModule,
        FormsModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxJsonViewerModule,
        RxRevertCustomizationModule,
        RxValidationIssuesModule,
        TranslateModule], exports: [RxEventDesignerComponent] });
RxEventDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, imports: [[
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
            RxFormBuilderModule,
            RxJsonViewerModule,
            RxRevertCustomizationModule,
            RxValidationIssuesModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEventDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxEventDesignerComponent],
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
                        RxFormBuilderModule,
                        RxJsonViewerModule,
                        RxRevertCustomizationModule,
                        RxValidationIssuesModule,
                        TranslateModule
                    ],
                    exports: [RxEventDesignerComponent]
                }]
        }] });
//# sourceMappingURL=event-designer.module.js.map