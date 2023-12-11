import { OnInit } from '@angular/core';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ICounterFormControlOptions } from './counter-form-control-options.interface';
import { AdaptRxCounterComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class CounterFormControlComponent extends ValueAccessor<number> implements IFormControlComponent, OnInit, IFormFocusable {
    options: ICounterFormControlOptions;
    isDisabled: boolean;
    adaptRxCounterComponent: AdaptRxCounterComponent;
    ngOnInit(): void;
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CounterFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CounterFormControlComponent, "rx-counter-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
