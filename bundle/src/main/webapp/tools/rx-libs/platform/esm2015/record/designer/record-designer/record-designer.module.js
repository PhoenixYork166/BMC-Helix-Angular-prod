import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptAlertModule, AdaptBusyModule, AdaptButtonModule, AdaptCodeViewerModule, AdaptDropdownModule, AdaptIconModule, AdaptPopoverModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxListBuilderModule, AdaptRxRadiobuttonModule, AdaptRxSelectModule, AdaptRxSwitchModule, AdaptRxTextfieldModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { RxRecordDefinitionFieldOptionPipeModule } from '@helix/platform/record/api';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RxDesignerHeaderModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import { RxValidationIssuesModule, RxModalModule } from '@helix/platform/ui-kit';
import { RecordGridModule } from '@helix/platform/view/components';
import { TranslateModule } from '@ngx-translate/core';
import { RecordCustomizationOptionsModule } from './record-customization-options/record-customization-options.module';
import { RecordInheritanceEditorModule } from './record-inheritance-editor/record-inheritance-editor.module';
import { SearchFieldEditorModule } from './search-field-editor/search-field-editor.module';
import { RecordDesignerComponent } from './record-designer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { recordDesignerModelReducer } from './+state/record-designer-model.reducer';
import { RecordDesignerEffects } from './+state/record-designer.effects';
import { RX_RECORD_DESIGNER } from './record-designer.constant';
import { LocalizedCharacterFieldEditorComponent } from './localized-character-field-editor/localized-character-field-editor.component';
import { InheritanceIssueInfoComponent } from './inheritance-issue-info/inheritance-issue-info.component';
import { MissingArchiveDefinitionsModalComponent } from './archive-associations-control/missing-archive-definitions-modal.component';
import { ArchiveAssociationsControlComponent } from './archive-associations-control/archive-associations-control.component';
import { ArchiveAssociationSelectorComponent } from './archive-associations-control/archive-association-selector.component';
import { FieldOptionEditorComponent } from './field-option-editor/field-option-editor.component';
import { AddJoinFieldsEditorComponent } from './add-join-fields-editor/add-join-fields-editor.component';
import { RecordIndexesControlComponent } from './record-indexes-control/record-indexes-control.component';
import { RecordIndexesEditorComponent } from './record-indexes-control/record-indexes-editor.component';
import { RxRecordDesignerService } from './record-designer.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class RecordDesignerModule {
}
RecordDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, declarations: [RecordDesignerComponent,
        LocalizedCharacterFieldEditorComponent,
        InheritanceIssueInfoComponent,
        ArchiveAssociationsControlComponent,
        ArchiveAssociationSelectorComponent,
        MissingArchiveDefinitionsModalComponent,
        FieldOptionEditorComponent,
        AddJoinFieldsEditorComponent,
        RecordIndexesControlComponent,
        RecordIndexesEditorComponent], imports: [AdaptCodeViewerModule,
        AdaptRxLabelModule,
        AdaptTabsModule,
        AdaptBusyModule,
        AdaptButtonModule,
        AdaptDropdownModule,
        AdaptRxCheckboxModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptPopoverModule,
        AdaptIconModule,
        CommonModule,
        FormsModule,
        RxDesignerHeaderModule,
        RxModalModule,
        RxValidationIssuesModule,
        TranslateModule,
        ReactiveFormsModule,
        RecordGridModule,
        RxFormBuilderModule,
        RxDefinitionModule,
        RxRecordDefinitionFieldOptionPipeModule,
        RecordCustomizationOptionsModule,
        RecordInheritanceEditorModule,
        SearchFieldEditorModule,
        AdaptTableModule,
        AdaptSidebarModule, i1.StoreFeatureModule, i2.EffectsFeatureModule, AdaptAlertModule,
        AdaptRxRadiobuttonModule,
        AdaptRxSwitchModule,
        AdaptPopoverModule,
        AdaptAccordionModule,
        AdaptRxListBuilderModule], exports: [RecordDesignerComponent] });
RecordDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, providers: [DatePipe, RxRecordDesignerService], imports: [[
            AdaptCodeViewerModule,
            AdaptRxLabelModule,
            AdaptTabsModule,
            AdaptBusyModule,
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptRxCheckboxModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptPopoverModule,
            AdaptIconModule,
            CommonModule,
            FormsModule,
            RxDesignerHeaderModule,
            RxModalModule,
            RxValidationIssuesModule,
            TranslateModule,
            ReactiveFormsModule,
            RecordGridModule,
            RxFormBuilderModule,
            RxDefinitionModule,
            RxRecordDefinitionFieldOptionPipeModule,
            RecordCustomizationOptionsModule,
            RecordInheritanceEditorModule,
            SearchFieldEditorModule,
            AdaptTableModule,
            AdaptSidebarModule,
            StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                model: recordDesignerModelReducer
            }),
            EffectsModule.forFeature([RecordDesignerEffects]),
            AdaptAlertModule,
            AdaptRxRadiobuttonModule,
            AdaptRxSwitchModule,
            AdaptPopoverModule,
            AdaptAccordionModule,
            AdaptRxListBuilderModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RecordDesignerComponent,
                        LocalizedCharacterFieldEditorComponent,
                        InheritanceIssueInfoComponent,
                        ArchiveAssociationsControlComponent,
                        ArchiveAssociationSelectorComponent,
                        MissingArchiveDefinitionsModalComponent,
                        FieldOptionEditorComponent,
                        AddJoinFieldsEditorComponent,
                        RecordIndexesControlComponent,
                        RecordIndexesEditorComponent
                    ],
                    exports: [RecordDesignerComponent],
                    imports: [
                        AdaptCodeViewerModule,
                        AdaptRxLabelModule,
                        AdaptTabsModule,
                        AdaptBusyModule,
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        CommonModule,
                        FormsModule,
                        RxDesignerHeaderModule,
                        RxModalModule,
                        RxValidationIssuesModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        RecordGridModule,
                        RxFormBuilderModule,
                        RxDefinitionModule,
                        RxRecordDefinitionFieldOptionPipeModule,
                        RecordCustomizationOptionsModule,
                        RecordInheritanceEditorModule,
                        SearchFieldEditorModule,
                        AdaptTableModule,
                        AdaptSidebarModule,
                        StoreModule.forFeature(RX_RECORD_DESIGNER.featureSelector, {
                            model: recordDesignerModelReducer
                        }),
                        EffectsModule.forFeature([RecordDesignerEffects]),
                        AdaptAlertModule,
                        AdaptRxRadiobuttonModule,
                        AdaptRxSwitchModule,
                        AdaptPopoverModule,
                        AdaptAccordionModule,
                        AdaptRxListBuilderModule
                    ],
                    providers: [DatePipe, RxRecordDesignerService]
                }]
        }] });
//# sourceMappingURL=record-designer.module.js.map