import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptAlertModule, AdaptCodeViewerModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { FormControlsModule, RxDesignerHeaderModule, RxFormBuilderModule, RxInspectorModule, RxPermissionEditorModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import { RxBladeModule, RxJsonViewerModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RxViewDesignerComponent } from './component/view-designer.component';
import { DesignerModule } from './components/designer-component/designer.module';
import { RxViewDesignerPaletteModule } from './components/palette/view-designer-palette.module';
import { ViewDesignerCanvasModule } from './components/view-designer-canvas/view-designer-canvas.module';
// State
import { ViewDesignerComponentEffects } from './+state/view-designer-component.effects';
import { ViewDesignerEffects } from './+state/view-designer.effects';
import { viewDefinitionReducer } from './+state/view-definition.reducer';
import { viewDesignerBreadcrumbsReducer } from './+state/view-designer-breadcrumbs.reducer';
import { viewDesignerModelReducer } from './+state/view-designer-model.reducer';
import { viewDesignerUiReducer } from './+state/view-designer-ui.reducer';
import { viewDesignerValidationReducer } from './+state/view-designer-validation.reducer';
import { ViewActionDesignModule } from '@helix/platform/view/api';
import { RuntimeViewParamsModalModule } from './components/runtime-view-params-modal/runtime-view-params-modal.module';
import { RxViewCustomizationOptionsModule } from './form-controls/view-customization-options-widget/view-customization-options.module';
import { RxViewRevertCustomizationModule } from './form-controls/view-revert-customization/view-revert-customization.module';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngrx/store";
import * as i3 from "@ngrx/effects";
export class ViewDesignerModule {
}
ViewDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ViewDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, declarations: [RxViewDesignerComponent], imports: [CommonModule,
        AdaptCodeViewerModule, i1.AdaptTabsModule, RxBladeModule,
        RxFormBuilderModule,
        RxValidationIssuesModule,
        RxJsonViewerModule,
        RxViewDesignerPaletteModule,
        ViewDesignerCanvasModule,
        DesignerModule,
        FormControlsModule,
        RxPermissionEditorModule,
        RxRevertCustomizationModule,
        ViewActionDesignModule,
        RuntimeViewParamsModalModule,
        RxDesignerHeaderModule,
        AdaptAlertModule,
        RxInspectorModule,
        RxViewCustomizationOptionsModule,
        RxViewRevertCustomizationModule,
        TranslateModule, i2.StoreFeatureModule, i3.EffectsFeatureModule], exports: [RxViewDesignerComponent] });
ViewDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, imports: [[
            CommonModule,
            AdaptCodeViewerModule,
            AdaptTabsModule.forRoot(),
            RxBladeModule,
            RxFormBuilderModule,
            RxValidationIssuesModule,
            RxJsonViewerModule,
            RxViewDesignerPaletteModule,
            ViewDesignerCanvasModule,
            DesignerModule,
            FormControlsModule,
            RxPermissionEditorModule,
            RxRevertCustomizationModule,
            ViewActionDesignModule,
            RuntimeViewParamsModalModule,
            RxDesignerHeaderModule,
            AdaptAlertModule,
            RxInspectorModule,
            RxViewCustomizationOptionsModule,
            RxViewRevertCustomizationModule,
            TranslateModule,
            StoreModule.forFeature('viewDesigner', {
                model: viewDesignerModelReducer,
                viewDefinition: viewDefinitionReducer,
                validation: viewDesignerValidationReducer,
                ui: viewDesignerUiReducer,
                breadcrumbs: viewDesignerBreadcrumbsReducer
            }),
            EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptCodeViewerModule,
                        AdaptTabsModule.forRoot(),
                        RxBladeModule,
                        RxFormBuilderModule,
                        RxValidationIssuesModule,
                        RxJsonViewerModule,
                        RxViewDesignerPaletteModule,
                        ViewDesignerCanvasModule,
                        DesignerModule,
                        FormControlsModule,
                        RxPermissionEditorModule,
                        RxRevertCustomizationModule,
                        ViewActionDesignModule,
                        RuntimeViewParamsModalModule,
                        RxDesignerHeaderModule,
                        AdaptAlertModule,
                        RxInspectorModule,
                        RxViewCustomizationOptionsModule,
                        RxViewRevertCustomizationModule,
                        TranslateModule,
                        StoreModule.forFeature('viewDesigner', {
                            model: viewDesignerModelReducer,
                            viewDefinition: viewDefinitionReducer,
                            validation: viewDesignerValidationReducer,
                            ui: viewDesignerUiReducer,
                            breadcrumbs: viewDesignerBreadcrumbsReducer
                        }),
                        EffectsModule.forFeature([ViewDesignerEffects, ViewDesignerComponentEffects])
                    ],
                    declarations: [RxViewDesignerComponent],
                    exports: [RxViewDesignerComponent]
                }]
        }] });
//# sourceMappingURL=view-designer.module.js.map