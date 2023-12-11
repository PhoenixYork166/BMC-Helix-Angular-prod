import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptCodeViewerModule, AdaptRxFormsModule, AdaptSidebarModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxValidationIssuesModule } from '@helix/platform/ui-kit';
import { CustomizationOptionsModule, RxDefinitionPickerModule, RxDesignerHeaderModule, RxRevertCustomizationModule } from '@helix/platform/shared/components';
import { RxAssociationCardinalityPipe, RxAssociationPipesModule } from '@helix/platform/association/api';
import { RxDefinitionNamePipe } from '@helix/platform/shared/api';
import { RxAssociationDesignerComponent } from './association-designer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AssociationDesignerEffects } from './+state/association-designer.effects';
import { RX_ASSOCIATION_DESIGNER } from '../association-designer.constant';
import { associationDesignerModelReducer } from './+state/association-designer-model.reducer';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class RxAssociationDesignerModule {
}
RxAssociationDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxAssociationDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, declarations: [RxAssociationDesignerComponent], imports: [AdaptSidebarModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxDesignerHeaderModule,
        RxValidationIssuesModule,
        RxDefinitionPickerModule,
        RxAssociationPipesModule,
        CustomizationOptionsModule,
        RxRevertCustomizationModule,
        AdaptTabsModule,
        AdaptRxFormsModule,
        AdaptCodeViewerModule,
        TranslateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule], exports: [RxAssociationDesignerComponent] });
RxAssociationDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, providers: [RxAssociationCardinalityPipe, RxDefinitionNamePipe], imports: [[
            AdaptSidebarModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxDesignerHeaderModule,
            RxValidationIssuesModule,
            RxDefinitionPickerModule,
            RxAssociationPipesModule,
            CustomizationOptionsModule,
            RxRevertCustomizationModule,
            AdaptTabsModule,
            AdaptRxFormsModule,
            AdaptCodeViewerModule,
            TranslateModule,
            StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                model: associationDesignerModelReducer
            }),
            EffectsModule.forFeature([AssociationDesignerEffects])
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxAssociationDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxAssociationDesignerComponent],
                    imports: [
                        AdaptSidebarModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxDesignerHeaderModule,
                        RxValidationIssuesModule,
                        RxDefinitionPickerModule,
                        RxAssociationPipesModule,
                        CustomizationOptionsModule,
                        RxRevertCustomizationModule,
                        AdaptTabsModule,
                        AdaptRxFormsModule,
                        AdaptCodeViewerModule,
                        TranslateModule,
                        StoreModule.forFeature(RX_ASSOCIATION_DESIGNER.featureSelector, {
                            model: associationDesignerModelReducer
                        }),
                        EffectsModule.forFeature([AssociationDesignerEffects])
                    ],
                    exports: [RxAssociationDesignerComponent],
                    providers: [RxAssociationCardinalityPipe, RxDefinitionNamePipe]
                }]
        }] });
//# sourceMappingURL=association-designer.module.js.map