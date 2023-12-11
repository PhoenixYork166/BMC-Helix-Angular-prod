import { IExpressionFormControlOptions } from '../../form-controls/expression-form-control/expression-form-control.types';
export interface IExpressionInspectorControlOptions extends Omit<IExpressionFormControlOptions, 'dataDictionary$' & 'operators'> {
}
