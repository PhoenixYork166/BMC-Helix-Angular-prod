import { IDefinition } from '@helix/platform/shared/api';
export interface IIntervalTimeCriteria {
    resourceType: string;
    days: number;
    hours: number;
    minutes: number;
}
export interface IScheduleTimeCriteria {
    resourceType: string;
    monthDays: number[];
    weekDays: string[];
    hours: number[];
    minute: number;
}
export interface ITriggerEvent {
    executionOrder?: number;
    eventTypeDisplayName?: string;
    eventTypes?: string[];
    poolNumber?: number;
    timeCriteria?: IIntervalTimeCriteria | IScheduleTimeCriteria;
}
export interface IRuleDefinition extends IDefinition {
    numberOfAvailablePools: number;
    triggerEvent: ITriggerEvent;
}
