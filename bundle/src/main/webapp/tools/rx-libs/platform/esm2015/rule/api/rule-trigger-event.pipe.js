import { Pipe } from '@angular/core';
import { RX_RULE_DEFINITION } from './rule-definition.constant';
import * as i0 from "@angular/core";
export class RxRuleTriggerEventPipe {
    transform(triggerEvent) {
        let result = '';
        if (triggerEvent && triggerEvent.timeCriteria) {
            if (triggerEvent.timeCriteria.resourceType === RX_RULE_DEFINITION.ruleElementResourceTypes.scheduleTime) {
                result = RX_RULE_DEFINITION.timerTypes.schedule;
            }
            else if (triggerEvent.timeCriteria.resourceType === RX_RULE_DEFINITION.ruleElementResourceTypes.intervalTime) {
                result = RX_RULE_DEFINITION.timerTypes.interval;
            }
        }
        else if (triggerEvent && triggerEvent.eventTypes) {
            result = triggerEvent.eventTypes.join(', ');
        }
        else if (triggerEvent && triggerEvent.eventTypeDisplayName) {
            result = triggerEvent.eventTypeDisplayName;
        }
        return result;
    }
}
RxRuleTriggerEventPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerEventPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RxRuleTriggerEventPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerEventPipe, name: "rxRuleTriggerEventPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerEventPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRuleTriggerEventPipe'
                }]
        }] });
//# sourceMappingURL=rule-trigger-event.pipe.js.map