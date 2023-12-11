import { IChildComponentData } from '@helix/platform/view/runtime';
import { RxButtonBarAlignment } from '../button-bar.types';
import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IRxAvailableOnDevicesProp } from '@helix/platform/view/api';
export interface IButtonBarConfig extends IRxAvailableOnDevicesProp {
    alignment: RxButtonBarAlignment;
    hidden: RxEvaluatedExpression;
    styles: string;
}
export interface IButtonBarChildComponentData extends IChildComponentData {
    showInDropdown: boolean;
}
