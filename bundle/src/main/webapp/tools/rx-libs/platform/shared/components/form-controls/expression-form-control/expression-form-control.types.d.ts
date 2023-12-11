import { Observable } from 'rxjs';
import { IDataDictionary, IExpressionOperator } from '@helix/platform/shared/api';
import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface IExpressionFormControlOptions {
    label?: string;
    expressionEditorPropertyName?: string;
    clickToBuildExpressionLabel?: string;
    isLabelHidden?: boolean;
    dataDictionary$: Observable<IDataDictionary>;
    operators: IExpressionOperator[];
    isRequired?: boolean;
    tooltip?: AdaptRxControlLabelTooltip;
}
