import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationDefinitionTabComponent } from './configuration-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RouterModule } from '@angular/router';
import { AdminSettingEditorComponent } from './admin-setting-editor/admin-setting-editor.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdaptButtonModule, AdaptModalModule, AdaptRxCheckboxModule, AdaptRxLabelModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RxDefinitionPickerModule, RxPermissionEditorModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class ConfigurationDefinitionTabModule {
}
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, declarations: [ConfigurationDefinitionTabComponent, AdminSettingEditorComponent], imports: [AdaptModalModule,
        AdaptButtonModule,
        CommonModule,
        DefinitionTabModule,
        RouterModule,
        TranslateModule,
        ReactiveFormsModule,
        RxDefinitionPickerModule,
        RxPermissionEditorModule,
        AdaptRxTextfieldModule,
        AdaptRxLabelModule,
        AdaptRxCheckboxModule], exports: [ConfigurationDefinitionTabComponent] });
/** @nocollapse */ ConfigurationDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, imports: [[
            AdaptModalModule,
            AdaptButtonModule,
            CommonModule,
            DefinitionTabModule,
            RouterModule,
            TranslateModule,
            ReactiveFormsModule,
            RxDefinitionPickerModule,
            RxPermissionEditorModule,
            AdaptRxTextfieldModule,
            AdaptRxLabelModule,
            AdaptRxCheckboxModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ConfigurationDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfigurationDefinitionTabComponent, AdminSettingEditorComponent],
                    imports: [
                        AdaptModalModule,
                        AdaptButtonModule,
                        CommonModule,
                        DefinitionTabModule,
                        RouterModule,
                        TranslateModule,
                        ReactiveFormsModule,
                        RxDefinitionPickerModule,
                        RxPermissionEditorModule,
                        AdaptRxTextfieldModule,
                        AdaptRxLabelModule,
                        AdaptRxCheckboxModule
                    ],
                    exports: [ConfigurationDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=configuration-definition-tab.module.js.map