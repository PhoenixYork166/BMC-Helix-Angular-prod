import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IViewComponentSetProperty } from '@helix/platform/view/runtime';
export interface IContainerConfig {
    columnCount?: string;
    hidden?: RxEvaluatedExpression;
    rowWrap?: string;
    styles?: string;
}
export interface IContainerApi extends IViewComponentSetProperty {
}
