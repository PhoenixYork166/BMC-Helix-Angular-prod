import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IRxDisabledProp, IRxStandardProps } from '@helix/platform/view/api';
export interface ISelectGroupProperties extends IRxStandardProps, IRxDisabledProp {
}
export interface ISelectGroupFieldProperties {
    label: string;
    namedListDefinitionName: string;
    fieldId: string;
    index: string;
    optionFilterFieldId?: string;
    guid: string;
}
export interface ISelectGroupFormControlOptions {
    targetFieldOptions: RxSelectOption[];
}
