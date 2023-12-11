import { ValueAccessor } from '../../form-builder/value-accessor';
import { ISwitcherFormControlOptions } from './switch-form-control-options.interface';
import { IFormControlComponent } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class SwitchFormControlComponent extends ValueAccessor<boolean> implements IFormControlComponent {
    options: ISwitcherFormControlOptions;
    id: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SwitchFormControlComponent, "rx-switcher-form-control", never, { "options": "options"; }, {}, never, never>;
}
