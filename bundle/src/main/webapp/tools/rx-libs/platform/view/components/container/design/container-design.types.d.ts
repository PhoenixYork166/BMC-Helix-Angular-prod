import { ContainerRowWrap } from '../container.types';
import { IRxStandardProps } from '@helix/platform/view/api';
export interface IContainerProperties extends IRxStandardProps {
    columnCount: string;
    rowWrap: ContainerRowWrap;
    name?: string;
}
