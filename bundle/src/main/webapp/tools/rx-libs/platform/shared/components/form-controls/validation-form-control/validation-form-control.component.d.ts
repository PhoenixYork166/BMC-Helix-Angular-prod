import { EventEmitter } from '@angular/core';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IValidationFormControlOptions, MessageType } from './validation-form-control-options.types';
import * as i0 from "@angular/core";
export declare class ValidationFormControlComponent extends ValueAccessor<string> implements IFormControlComponent {
    options: IValidationFormControlOptions;
    events: EventEmitter<any>;
    messageType: typeof MessageType;
    correctIssue(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValidationFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ValidationFormControlComponent, "rx-validation-form-control", never, { "options": "options"; }, { "events": "events"; }, never, never>;
}
