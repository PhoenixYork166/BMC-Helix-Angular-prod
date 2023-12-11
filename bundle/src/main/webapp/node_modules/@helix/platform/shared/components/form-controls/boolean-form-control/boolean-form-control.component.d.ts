import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ICheckboxFormControlOptions } from './boolean-form-control-options.interface';
import * as i0 from "@angular/core";
export declare class BooleanFormControlComponent extends ValueAccessor<boolean> implements IFormControlComponent {
    options: ICheckboxFormControlOptions;
    isDisabled: boolean;
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BooleanFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BooleanFormControlComponent, "rx-checkbox-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
