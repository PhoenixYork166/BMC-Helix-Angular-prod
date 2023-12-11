import { IViewComponentActionState } from './runtime-view-component-action-state.interface';
export interface IViewComponentEventState {
    [eventName: string]: IViewComponentActionState[];
}
