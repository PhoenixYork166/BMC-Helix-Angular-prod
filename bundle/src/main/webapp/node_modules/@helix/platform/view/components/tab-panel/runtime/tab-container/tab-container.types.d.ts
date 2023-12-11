import { IContainerConfig } from '../../../container';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
export interface ITabContainerConfig extends IContainerConfig {
    label: string;
    enableLazyLoading: RxEvaluatedExpression<boolean>;
}
export interface ITabContainerState extends ITabContainerConfig {
    isRendered: boolean;
}
