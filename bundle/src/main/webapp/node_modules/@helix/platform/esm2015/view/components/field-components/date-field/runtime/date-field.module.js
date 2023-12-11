import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdaptRxDatetimeModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { DateFieldComponent } from './date-field.component';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class DateFieldModule {
}
DateFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldModule, declarations: [DateFieldComponent], imports: [AdaptRxDatetimeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReadOnlyFieldModule,
        TranslateModule] });
DateFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldModule, providers: [DatePipe], imports: [[
            AdaptRxDatetimeModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ReadOnlyFieldModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFieldModule, decorators: [{
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
                    declarations: [DateFieldComponent],
                    providers: [DatePipe],
                    entryComponents: [DateFieldComponent]
                }]
        }] });
//# sourceMappingURL=date-field.module.js.map