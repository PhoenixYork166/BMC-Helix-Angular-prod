import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { TimeFieldComponent } from './time-field.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class TimeFieldModule {
}
TimeFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldModule, declarations: [TimeFieldComponent], imports: [AdaptRxDatetimeModule, CommonModule, ReadOnlyFieldModule, TranslateModule, ReactiveFormsModule] });
TimeFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldModule, providers: [DatePipe], imports: [[AdaptRxDatetimeModule, CommonModule, ReadOnlyFieldModule, TranslateModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxDatetimeModule, CommonModule, ReadOnlyFieldModule, TranslateModule, ReactiveFormsModule],
                    declarations: [TimeFieldComponent],
                    providers: [DatePipe],
                    entryComponents: [TimeFieldComponent]
                }]
        }] });
//# sourceMappingURL=time-field.module.js.map