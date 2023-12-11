import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RxModalComponent } from './modal.component';
import { RxModalService } from './modal.service';
import * as i0 from "@angular/core";
export class RxModalModule {
}
RxModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, declarations: [RxModalComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptModalModule,
        TranslateModule,
        AdaptRxTextfieldModule] });
RxModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, providers: [RxModalService], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptModalModule,
            TranslateModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptModalModule,
                        TranslateModule,
                        AdaptRxTextfieldModule
                    ],
                    declarations: [RxModalComponent],
                    entryComponents: [RxModalComponent],
                    providers: [RxModalService]
                }]
        }] });
//# sourceMappingURL=modal.module.js.map