import { Renderer2 } from '@angular/core';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ITextFormControlOptions } from './text-form-control-options.interface';
import { AdaptRxTextfieldComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class TextFormControlComponent extends ValueAccessor<string> implements IFormControlComponent, IFormFocusable {
    private renderer;
    options: ITextFormControlOptions;
    editor: AdaptRxTextfieldComponent;
    constructor(renderer: Renderer2);
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextFormControlComponent, "rx-text-form-control", never, { "options": "options"; }, {}, never, never>;
}
