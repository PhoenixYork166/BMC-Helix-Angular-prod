import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptCodeViewerModule, AdaptDropdownModule, AdaptRxCheckboxModule, AdaptRxCounterModule, AdaptRxLabelModule, AdaptRxListBuilderModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxTextfieldModule, AdaptSidebarModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxRecordDefinitionResourceTypePipeModule } from '@helix/platform/record/api';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { ExpressionFormControlModule, FormControlsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import { RxBladeModule, RxJsonViewerModule, RxLineLoaderModule, RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigDesignerComponent } from './config-designer.component';
import { StoreModule } from '@ngrx/store';
import { configDesignerModelReducer } from './+state/config-designer-model.reducer';
import { RX_CONFIG_DESIGNER } from '../config-designer.constant';
import { EffectsModule } from '@ngrx/effects';
import { ConfigDesignerEffects } from './+state/config-designer.effects';
import { FieldGroupsEditorComponent } from './field-groups-editor/field-groups-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class ConfigDesignerModule {
}
ConfigDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxTextfieldModule,
        RecordGridModule,
        CommonModule,
        FormsModule,
        FormControlsModule,
        RxDesignerHeaderModule,
        RxBladeModule,
        RxValidationIssuesModule,
        RxJsonViewerModule,
        RxFormBuilderModule,
        AdaptRxCheckboxModule,
        AdaptRxLabelModule,
        TranslateModule,
        RecordGridModule,
        RxRecordDefinitionResourceTypePipeModule,
        AdaptAlertModule,
        RxLineLoaderModule,
        AdaptTableModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSelectModule,
        ExpressionFormControlModule,
        AdaptBusyModule,
        AdaptRxCounterModule,
        AdaptCodeViewerModule,
        AdaptSidebarModule,
        RxDefinitionModule,
        AdaptRxListBuilderModule, i1.StoreFeatureModule, i2.EffectsFeatureModule], exports: [ConfigDesignerComponent] });
ConfigDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxTextfieldModule,
            RecordGridModule,
            CommonModule,
            FormsModule,
            FormControlsModule,
            RxDesignerHeaderModule,
            RxBladeModule,
            RxValidationIssuesModule,
            RxJsonViewerModule,
            RxFormBuilderModule,
            AdaptRxCheckboxModule,
            AdaptRxLabelModule,
            TranslateModule,
            RecordGridModule,
            RxRecordDefinitionResourceTypePipeModule,
            AdaptAlertModule,
            RxLineLoaderModule,
            AdaptTableModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSelectModule,
            ExpressionFormControlModule,
            AdaptBusyModule,
            AdaptRxCounterModule,
            AdaptCodeViewerModule,
            AdaptSidebarModule,
            RxDefinitionModule,
            AdaptRxListBuilderModule,
            StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                model: configDesignerModelReducer
            }),
            EffectsModule.forFeature([ConfigDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigDesignerComponent, FieldGroupsEditorComponent],
                    exports: [ConfigDesignerComponent],
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxTextfieldModule,
                        RecordGridModule,
                        CommonModule,
                        FormsModule,
                        FormControlsModule,
                        RxDesignerHeaderModule,
                        RxBladeModule,
                        RxValidationIssuesModule,
                        RxJsonViewerModule,
                        RxFormBuilderModule,
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule,
                        TranslateModule,
                        RecordGridModule,
                        RxRecordDefinitionResourceTypePipeModule,
                        AdaptAlertModule,
                        RxLineLoaderModule,
                        AdaptTableModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSelectModule,
                        ExpressionFormControlModule,
                        AdaptBusyModule,
                        AdaptRxCounterModule,
                        AdaptCodeViewerModule,
                        AdaptSidebarModule,
                        RxDefinitionModule,
                        AdaptRxListBuilderModule,
                        StoreModule.forFeature(RX_CONFIG_DESIGNER.featureSelector, {
                            model: configDesignerModelReducer
                        }),
                        EffectsModule.forFeature([ConfigDesignerEffects])
                    ]
                }]
        }] });
//# sourceMappingURL=config-designer.module.js.map