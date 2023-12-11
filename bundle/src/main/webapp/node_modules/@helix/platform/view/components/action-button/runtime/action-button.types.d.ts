import { RxEvaluatedExpression } from '@helix/platform/shared/api';
import { IRecordInstance } from '@helix/platform/record/api';
import { IActionButtonProperties } from '../action-button.types';
export interface IActionButtonConfig extends IActionButtonProperties {
    disabled?: RxEvaluatedExpression;
    hidden?: RxEvaluatedExpression;
    recordInstance?: RxEvaluatedExpression<IRecordInstance>;
}
export interface IActionButtonState extends IActionButtonConfig {
    buttonLabel?: string;
}
