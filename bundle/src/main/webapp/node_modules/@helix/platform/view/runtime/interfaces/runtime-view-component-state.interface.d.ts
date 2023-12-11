import { BehaviorSubject } from 'rxjs';
import { ComponentExpression } from '../component/component-expression.class';
import { IViewComponentEventState } from './runtime-view-component-event-state.interface';
import { IViewComponentRuntimeState } from './view-component-runtime-state.interface';
import { IViewComponentDescriptor } from '@helix/platform/view/api';
export interface IViewComponentState {
    guid: string;
    type: string;
    config$: BehaviorSubject<IViewComponentRuntimeState>;
    configState: IViewComponentRuntimeState;
    publicState: IViewComponentRuntimeState;
    expressions: ComponentExpression[];
    dependentViewComponentsMap: Map<string, string[]>;
    eventStates: IViewComponentEventState;
    isDataViewComponent: boolean;
    configPropertyName: string;
    parentViewComponentGuid: string;
    childViewComponentGuids: string[];
    componentDescriptor: IViewComponentDescriptor;
}
