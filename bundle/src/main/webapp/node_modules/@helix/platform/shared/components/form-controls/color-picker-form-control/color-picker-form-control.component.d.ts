import { IFormControlComponent } from '@helix/platform/shared/api';
import { RxColorUtilsService } from '@helix/platform/utils';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IColorPickerFormControlOptions } from './color-picker-form-control-options.interface';
import { Color } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class ColorPickerFormControlComponent extends ValueAccessor<string> implements IFormControlComponent {
    private rxColorUtilsService;
    options: IColorPickerFormControlOptions;
    isDisabled: boolean;
    private colorValue;
    constructor(rxColorUtilsService: RxColorUtilsService);
    get color(): string;
    set color(color: string);
    onWriteValue(value: string): void;
    setColor(color: Color): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerFormControlComponent, "rx-color-picker-form-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
