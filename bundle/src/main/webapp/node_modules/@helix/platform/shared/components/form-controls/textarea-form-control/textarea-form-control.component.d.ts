import { Renderer2 } from '@angular/core';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ITextareaFormControlOptions } from './textarea-form-control-options.interface';
import { AdaptRxTextareaComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class TextareaFormControlComponent extends ValueAccessor<string> implements IFormControlComponent, IFormFocusable {
    private renderer;
    options: ITextareaFormControlOptions;
    editor: AdaptRxTextareaComponent;
    constructor(renderer: Renderer2);
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextareaFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextareaFormControlComponent, "rx-textarea-form-control", never, { "options": "options"; }, {}, never, never>;
}
