import * as i3 from '@helix/platform/shared/api';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from '@angular/core';
import { Injectable, Pipe, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment-es6';
import { compact, chain, toLower, startCase, sortBy } from 'lodash';
import * as i1 from '@angular/common/http';
import * as i2 from '@helix/platform/utils';

class RxRuleDefinitionDataPageService extends DataPage {
    constructor(injector) {
        super(injector, 'com.bmc.arsys.rx.application.rule.datapage.RuleDefinitionDataPageQuery');
        this.injector = injector;
    }
}
RxRuleDefinitionDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxRuleDefinitionDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionDataPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionDataPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const RX_RULE_DEFINITION = {
    ruleElementResourceTypes: {
        scheduleTime: 'com.bmc.arsys.rx.services.rule.domain.ScheduleTime',
        intervalTime: 'com.bmc.arsys.rx.services.rule.domain.IntervalTime'
    },
    actionTypeNames: {
        connector: 'connector'
    },
    timerTypes: {
        interval: 'Interval',
        schedule: 'Schedule'
    }
};

class RxRuleTriggerEventPipe {
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

class RxRuleTriggerTimeCriteriaDisplayValuePipe {
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

class RxRulePipesModule {
}
RxRulePipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRulePipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe], imports: [CommonModule], exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe] });
RxRulePipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePipesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe],
                    exports: [RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe]
                }]
        }] });

const renameRuleDefinitionCommand = 'com.bmc.arsys.rx.application.rule.command.RenameRuleDefinitionCommand';
const revertRuleCustomizationResourceType = 'com.bmc.arsys.rx.application.rule.command.RevertRuleDefinitionCommand';
class RxRuleDefinitionService {
    constructor(httpClient, rxGuidService, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxGuidService = rxGuidService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.renameCommand = rxCommandFactoryService.forResourceType(renameRuleDefinitionCommand);
        this.revertCustomizationCommand = rxCommandFactoryService.forResourceType(revertRuleCustomizationResourceType);
    }
    get(ruleDefinitionName) {
        return this.httpClient.get(this.getUrl(ruleDefinitionName));
    }
    rename(oldRuleDefinitionName, newRuleDefinitionName) {
        return this.renameCommand.execute({
            name: oldRuleDefinitionName,
            newName: newRuleDefinitionName
        });
    }
    revertCustomization(ruleDefinitionName) {
        return this.revertCustomizationCommand.execute({ ruleDefinitionName });
    }
    update(ruleDefinition) {
        return this.httpClient.put(this.getUrl(ruleDefinition.name), ruleDefinition);
    }
    getUrl(ruleDefinitionName) {
        return `/api/rx/application/rule/ruledefinition/${encodeURIComponent(ruleDefinitionName)}`;
    }
}
RxRuleDefinitionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, deps: [{ token: i1.HttpClient }, { token: i2.RxGuidService }, { token: i3.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRuleDefinitionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuleDefinitionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxGuidService }, { type: i3.RxCommandFactoryService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { RX_RULE_DEFINITION, RxRuleDefinitionDataPageService, RxRuleDefinitionService, RxRulePipesModule, RxRuleTriggerEventPipe, RxRuleTriggerTimeCriteriaDisplayValuePipe, renameRuleDefinitionCommand, revertRuleCustomizationResourceType };
//# sourceMappingURL=helix-platform-rule-api.js.map
