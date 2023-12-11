import { OnInit } from '@angular/core';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ILabelFormControlOptions } from './label-form-control-options.interface';
import * as i0 from "@angular/core";
export declare class LabelFormControlComponent extends ValueAccessor<boolean> implements IFormControlComponent, OnInit {
    private translateService;
    options: ILabelFormControlOptions;
    label: string;
    constructor(translateService: TranslateService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelFormControlComponent, "rx-label-form-control", never, { "options": "options"; }, {}, never, never>;
}
