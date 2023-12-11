import { Pipe } from '@angular/core';
import moment from 'moment-es6';
import { chain, compact, sortBy, startCase, toLower } from 'lodash';
import { RX_RULE_DEFINITION } from './rule-definition.constant';
import * as i0 from "@angular/core";
export class RxRuleTriggerTimeCriteriaDisplayValuePipe {
    transform(ruleTriggerTimeCriteria) {
        let displayValue;
        switch (ruleTriggerTimeCriteria.resourceType) {
            case RX_RULE_DEFINITION.ruleElementResourceTypes.intervalTime:
                displayValue = this.buildIntervalTimeDisplayValue(ruleTriggerTimeCriteria);
                break;
            case RX_RULE_DEFINITION.ruleElementResourceTypes.scheduleTime:
                displayValue = this.buildScheduleTimeDisplayValue(ruleTriggerTimeCriteria);
                break;
            default:
                displayValue = '';
        }
        return displayValue;
    }
    buildIntervalTimeDisplayValue(intervalTimeCriteria) {
        const displayValueParts = [];
        function buildDisplayValuePart(value, singularUnit, pluralUnit) {
            return value ? `${value} ${value > 1 ? pluralUnit : singularUnit}` : '';
        }
        displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.days, 'day', 'days'));
        displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.hours, 'hour', 'hours'));
        displayValueParts.push(buildDisplayValuePart(intervalTimeCriteria.minutes, 'minute', 'minutes'));
        return `Every ${compact(displayValueParts).join(', ')}`;
    }
    buildScheduleTimeDisplayValue(scheduleTimeCriteria) {
        var _a, _b;
        const weekDayOrderIds = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7
        };
        function enumerateValues(values) {
            const trailingValue = values.length > 1 ? ` and ${values.pop()}` : '';
            return `${values.join(', ')}${trailingValue}`;
        }
        const formattedWeekDays = chain(scheduleTimeCriteria.weekDays)
            .map(toLower)
            .map(startCase)
            .sortBy((weekDay) => weekDayOrderIds[weekDay])
            .value();
        const formattedTime = sortBy(scheduleTimeCriteria.hours).map((hour) => moment(`${hour}:${scheduleTimeCriteria.minute}`, ['H:mm'], 'en').format('h:mmA'));
        const monthDaysPart = ((_a = scheduleTimeCriteria.monthDays) === null || _a === void 0 ? void 0 : _a.length)
            ? `On dates ${enumerateValues(sortBy(scheduleTimeCriteria.monthDays))} of every month`
            : '';
        const weekDaysPart = ((_b = scheduleTimeCriteria.weekDays) === null || _b === void 0 ? void 0 : _b.length)
            ? `${monthDaysPart ? ', and every ' : 'Every '}${enumerateValues(formattedWeekDays)}`
            : '';
        const timePart = ` at ${enumerateValues(formattedTime)}`;
        return `${monthDaysPart}${weekDaysPart}${timePart}`;
    }
}
RxRuleTriggerTimeCriteriaDisplayValuePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RxRuleTriggerTimeCriteriaDisplayValuePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, name: "rxRuleTriggerTimeCriteriaDisplayValue" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleTriggerTimeCriteriaDisplayValuePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxRuleTriggerTimeCriteriaDisplayValue'
                }]
        }] });
//# sourceMappingURL=rule-trigger-time-criteria-display-value.pipe.js.map