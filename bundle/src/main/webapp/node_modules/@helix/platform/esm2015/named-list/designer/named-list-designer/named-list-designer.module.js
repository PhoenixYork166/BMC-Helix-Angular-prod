import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptButtonModule, AdaptCodeViewerModule, AdaptEmptyStateModule, AdaptIconModule, AdaptPopoverModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { CustomizationOptionsModule, ExpressionFormControlModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxFormBuilderModule, RxRevertCustomizationModule, SelectFormControlModule } from '@helix/platform/shared/components';
import { RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { TranslateModule } from '@ngx-translate/core';
import { RxNamedListDesignerComponent } from './named-list-designer.component';
import { StoreModule } from '@ngrx/store';
import { RX_NAMED_LIST_DESIGNER } from '../named-list-designer.constant';
import { EffectsModule } from '@ngrx/effects';
import { NamedListDesignerEffects } from './+state/named-list-designer.effects';
import { namedListDesignerModelReducer } from './+state/named-list-designer-model.reducer';
import { ContextualLabelFieldsComponent } from './contextual-label-fields/contextual-label-fields.component';
import { ContextualLabelFieldsEditorModalComponent } from './contextual-label-fields/contextual-label-fields-editor/contextual-label-fields-editor-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class RxNamedListDesignerModule {
}
RxNamedListDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNamedListDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, declarations: [ContextualLabelFieldsComponent,
        ContextualLabelFieldsEditorModalComponent,
        RxNamedListDesignerComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptCodeViewerModule,
        AdaptEmptyStateModule,
        AdaptIconModule,
        AdaptPopoverModule,
        AdaptSidebarModule,
        AdaptTabsModule,
        AdaptRxFormsModule,
        CommonModule,
        DragDropModule,
        FormsModule,
        ReactiveFormsModule,
        RxDesignerHeaderModule,
        RxFormBuilderModule,
        RxValidationIssuesModule,
        RxDefinitionPickerModule,
        ExpressionFormControlModule,
        SelectFormControlModule,
        CustomizationOptionsModule,
        RxRevertCustomizationModule,
        TranslateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule], exports: [RxNamedListDesignerComponent] });
RxNamedListDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptCodeViewerModule,
            AdaptEmptyStateModule,
            AdaptIconModule,
            AdaptPopoverModule,
            AdaptSidebarModule,
            AdaptTabsModule,
            AdaptRxFormsModule,
            CommonModule,
            DragDropModule,
            FormsModule,
            ReactiveFormsModule,
            RxDesignerHeaderModule,
            RxFormBuilderModule,
            RxValidationIssuesModule,
            RxDefinitionPickerModule,
            ExpressionFormControlModule,
            SelectFormControlModule,
            CustomizationOptionsModule,
            RxRevertCustomizationModule,
            TranslateModule,
            StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                model: namedListDesignerModelReducer
            }),
            EffectsModule.forFeature([NamedListDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNamedListDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ContextualLabelFieldsComponent,
                        ContextualLabelFieldsEditorModalComponent,
                        RxNamedListDesignerComponent
                    ],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptCodeViewerModule,
                        AdaptEmptyStateModule,
                        AdaptIconModule,
                        AdaptPopoverModule,
                        AdaptSidebarModule,
                        AdaptTabsModule,
                        AdaptRxFormsModule,
                        CommonModule,
                        DragDropModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDesignerHeaderModule,
                        RxFormBuilderModule,
                        RxValidationIssuesModule,
                        RxDefinitionPickerModule,
                        ExpressionFormControlModule,
                        SelectFormControlModule,
                        CustomizationOptionsModule,
                        RxRevertCustomizationModule,
                        TranslateModule,
                        StoreModule.forFeature(RX_NAMED_LIST_DESIGNER.featureSelector, {
                            model: namedListDesignerModelReducer
                        }),
                        EffectsModule.forFeature([NamedListDesignerEffects])
                    ],
                    exports: [RxNamedListDesignerComponent]
                }]
        }] });
//# sourceMappingURL=named-list-designer.module.js.map