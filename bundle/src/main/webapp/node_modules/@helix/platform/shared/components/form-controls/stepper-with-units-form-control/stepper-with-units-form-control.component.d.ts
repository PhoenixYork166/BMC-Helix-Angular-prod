import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IStepperOptions, IStepperWithUnitsFormControlOptions } from './stepper-with-units-form-control.interface';
import * as i0 from "@angular/core";
export declare class StepperWithUnitsFormControlComponent extends ValueAccessor<string> implements IFormControlComponent {
    options: IStepperWithUnitsFormControlOptions;
    get unit(): RxSelectOption[];
    set unit(value: RxSelectOption[]);
    get stepper(): number;
    set stepper(value: number);
    stepperOptions: IStepperOptions;
    maxValue: number;
    minValue: number;
    private stepperValue;
    private unitValue;
    private stepperValueByUnitsCache;
    writeValue(value: string): void;
    optionFormatter(option: RxSelectOption): string;
    private updateStepperConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperWithUnitsFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperWithUnitsFormControlComponent, "rx-stepper-with-units-form-control", never, { "options": "options"; }, {}, never, never>;
}
