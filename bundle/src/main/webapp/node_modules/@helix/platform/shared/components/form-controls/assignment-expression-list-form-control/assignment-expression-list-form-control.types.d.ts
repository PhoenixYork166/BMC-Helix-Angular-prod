import { IExpressionConfigurator } from '@helix/platform/shared/api';
import { IExpressionFormControlOptions } from '../expression-form-control/expression-form-control.types';
import { ITextFormControlOptions } from '../text-form-control/text-form-control-options.interface';
import { ISelectFormControlOptions } from '../select-form-control/select-form-control.interfaces';
export declare enum AssignmentExpressionListTargetFieldType {
    Text = "text",
    Select = "select"
}
export interface IAssignmentExpressionListFormControlOptions {
    addItemText?: string;
    confirmationMessage?: string;
    sourceFieldOptions: {
        expressionConfigurator: IExpressionConfigurator;
        options: IExpressionFormControlOptions;
        propertyName?: string;
    };
    targetFieldOptions: {
        options: ITextFormControlOptions | ISelectFormControlOptions;
        propertyName?: string;
        type: AssignmentExpressionListTargetFieldType;
    };
}
