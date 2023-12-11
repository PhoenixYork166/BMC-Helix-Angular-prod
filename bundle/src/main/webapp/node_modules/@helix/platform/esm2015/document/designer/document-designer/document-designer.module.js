import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptCodeViewerModule, AdaptRxLabelModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { RxDesignerHeaderModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import { RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentDesignerComponent } from './document-designer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RX_DOCUMENT_DESIGNER } from '../document-designer.constant';
import { documentDesignerModelReducer } from './+state/document-designer-model.reducer';
import { DocumentDesignerEffects } from './+state/document-designer.effects';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class DocumentDesignerModule {
}
DocumentDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, declarations: [DocumentDesignerComponent], imports: [AdaptCodeViewerModule,
        AdaptRxLabelModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxJsonViewerModule,
        RxValidationIssuesModule,
        ReactiveFormsModule, i1.StoreFeatureModule, i2.EffectsFeatureModule], exports: [DocumentDesignerComponent] });
DocumentDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, imports: [[
            AdaptCodeViewerModule,
            AdaptRxLabelModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            RxDesignerHeaderModule,
            RxFormBuilderModule,
            RxJsonViewerModule,
            RxValidationIssuesModule,
            ReactiveFormsModule,
            StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                model: documentDesignerModelReducer
            }),
            EffectsModule.forFeature([DocumentDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDesignerComponent],
                    exports: [DocumentDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxLabelModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RxDesignerHeaderModule,
                        RxFormBuilderModule,
                        RxJsonViewerModule,
                        RxValidationIssuesModule,
                        ReactiveFormsModule,
                        StoreModule.forFeature(RX_DOCUMENT_DESIGNER.featureSelector, {
                            model: documentDesignerModelReducer
                        }),
                        EffectsModule.forFeature([DocumentDesignerEffects])
                    ]
                }]
        }] });
//# sourceMappingURL=document-designer.module.js.map