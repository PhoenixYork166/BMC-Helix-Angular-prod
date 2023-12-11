import { IChildComponentData, IViewComponentSetProperty } from '@helix/platform/view/runtime';
import { ITabContainerConfig, ITabContainerState } from './tab-container/tab-container.types';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
export interface ITabPanelChildComponentData extends IChildComponentData<ITabContainerConfig> {
    state: ITabContainerState;
}
export interface ITabPanelApi extends IViewComponentSetProperty {
}
export interface ITabPanelConfig {
    hidden?: RxEvaluatedExpression;
    styles?: string;
}
export interface ITabPanelState extends ITabPanelConfig {
    activeTabIndex: number;
}
export interface ITabPanelComponentData {
    adaptTabsetIndex: number;
    tab: ITabPanelChildComponentData;
}
