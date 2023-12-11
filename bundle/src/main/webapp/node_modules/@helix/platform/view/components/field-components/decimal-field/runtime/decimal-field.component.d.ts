import { OnInit } from '@angular/core';
import { IViewComponent } from '@helix/platform/view/runtime';
import { IntegerFieldComponent } from '../../integer-field/runtime/integer-field.component';
import * as i0 from "@angular/core";
export declare class DecimalFieldComponent extends IntegerFieldComponent implements OnInit, IViewComponent {
    getDisplayValue(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DecimalFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DecimalFieldComponent, "rx-decimal-field", never, {}, {}, never, never>;
}
