import { PipeTransform } from '@angular/core';
import { IIntervalTimeCriteria, IScheduleTimeCriteria } from './rule-definition.types';
import * as i0 from "@angular/core";
export declare class RxRuleTriggerTimeCriteriaDisplayValuePipe implements PipeTransform {
    transform(ruleTriggerTimeCriteria: IIntervalTimeCriteria | IScheduleTimeCriteria): string;
    private buildIntervalTimeDisplayValue;
    private buildScheduleTimeDisplayValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRuleTriggerTimeCriteriaDisplayValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RxRuleTriggerTimeCriteriaDisplayValuePipe, "rxRuleTriggerTimeCriteriaDisplayValue">;
}
