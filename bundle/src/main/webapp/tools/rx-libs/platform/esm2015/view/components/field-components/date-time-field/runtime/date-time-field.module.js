import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { DateTimeFieldComponent } from './date-time-field.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class DateTimeFieldModule {
}
DateTimeFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateTimeFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldModule, declarations: [DateTimeFieldComponent], imports: [AdaptRxDatetimeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReadOnlyFieldModule,
        TranslateModule] });
DateTimeFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldModule, providers: [DatePipe], imports: [[
            AdaptRxDatetimeModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ReadOnlyFieldModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptRxDatetimeModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ReadOnlyFieldModule,
                        TranslateModule
                    ],
                    declarations: [DateTimeFieldComponent],
                    providers: [DatePipe],
                    entryComponents: [DateTimeFieldComponent]
                }]
        }] });
//# sourceMappingURL=date-time-field.module.js.map