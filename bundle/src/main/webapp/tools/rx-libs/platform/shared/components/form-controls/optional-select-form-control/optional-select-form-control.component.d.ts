import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ISelectOption } from '../select-form-control';
import { IOptionalSelectFormControlOptions } from './optional-select-form-control.interfaces';
import * as i0 from "@angular/core";
export declare class OptionalSelectFormControlComponent extends ValueAccessor<string> implements IFormControlComponent {
    options: IOptionalSelectFormControlOptions;
    switcherValue: boolean;
    selectValue: ISelectOption[];
    onSwitcherChange(newValue: boolean): void;
    onWriteValue(value: string): void;
    onSelectionChange(value: ISelectOption[]): void;
    optionFormatter(option: ISelectOption): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionalSelectFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionalSelectFormControlComponent, "rx-optional-select-form-control", never, { "options": "options"; }, {}, never, never>;
}
