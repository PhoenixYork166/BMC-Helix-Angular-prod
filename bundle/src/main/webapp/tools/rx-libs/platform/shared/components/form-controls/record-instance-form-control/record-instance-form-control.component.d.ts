import { Renderer2 } from '@angular/core';
import { IFormControlComponent, IFormFocusable, IPlainObject } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { ITextFormControlOptions } from '../text-form-control/text-form-control-options.interface';
import { AdaptRxTextfieldComponent } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class RecordInstanceFormControlComponent extends ValueAccessor<object> implements IFormControlComponent, IFormFocusable {
    private renderer;
    options: ITextFormControlOptions;
    editor: AdaptRxTextfieldComponent;
    model: IPlainObject;
    constructor(renderer: Renderer2);
    focus(): void;
    onModelChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordInstanceFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordInstanceFormControlComponent, "rx-record-instance-form-control", never, { "options": "options"; }, {}, never, never>;
}
