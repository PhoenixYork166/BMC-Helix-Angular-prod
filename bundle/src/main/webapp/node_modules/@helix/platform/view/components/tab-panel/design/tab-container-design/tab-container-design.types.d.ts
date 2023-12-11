import { ContainerRowWrap } from '../../../container/container.types';
import { IRxStandardProps } from '@helix/platform/view/api';
export interface ITabContainerProperties extends IRxStandardProps {
    columnCount: string;
    enableLazyLoading: boolean;
    label: string;
    rowWrap: ContainerRowWrap;
}
export interface ITabContainerDesignProperties extends ITabContainerProperties {
}
