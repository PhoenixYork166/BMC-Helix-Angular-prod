import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptLoginPageModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { AdaptTextFieldModule } from '@bmc-ux/obsolete';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import * as i0 from "@angular/core";
export class LoginPageModule {
}
LoginPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageModule, declarations: [LoginPageComponent], imports: [CommonModule,
        LoginPageRoutingModule,
        TranslateModule,
        FormsModule,
        AdaptLoginPageModule,
        AdaptTextFieldModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule] });
LoginPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageModule, imports: [[
            CommonModule,
            LoginPageRoutingModule,
            TranslateModule,
            FormsModule,
            AdaptLoginPageModule,
            AdaptTextFieldModule,
            AdaptButtonModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LoginPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [LoginPageComponent],
                    imports: [
                        CommonModule,
                        LoginPageRoutingModule,
                        TranslateModule,
                        FormsModule,
                        AdaptLoginPageModule,
                        AdaptTextFieldModule,
                        AdaptButtonModule,
                        AdaptRxTextfieldModule
                    ]
                }]
        }] });
//# sourceMappingURL=login-page.module.js.map