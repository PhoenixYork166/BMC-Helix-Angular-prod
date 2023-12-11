import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IRadioFormControlOptions } from './radio-form-control.interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RadioFormControlComponent extends ValueAccessor<any> implements IFormControlComponent {
    private translateService;
    constructor(translateService: TranslateService);
    options: IRadioFormControlOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<RadioFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadioFormControlComponent, "rx-radio-form-control", never, { "options": "options"; }, {}, never, never>;
}
