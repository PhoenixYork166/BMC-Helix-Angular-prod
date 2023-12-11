import { PipeTransform } from '@angular/core';
import { ITriggerEvent } from './rule-definition.types';
import * as i0 from "@angular/core";
export declare class RxRuleTriggerEventPipe implements PipeTransform {
    transform(triggerEvent: ITriggerEvent): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRuleTriggerEventPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxRuleTriggerEventPipe, "rxRuleTriggerEventPipe">;
}
