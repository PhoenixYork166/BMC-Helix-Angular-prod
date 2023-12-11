import { RxButtonBarAlignment } from '../button-bar.types';
import { IRxStandardProps } from '@helix/platform/view/api';
export interface IButtonBarProperties extends IRxStandardProps {
    alignment: RxButtonBarAlignment;
    name?: string;
}
