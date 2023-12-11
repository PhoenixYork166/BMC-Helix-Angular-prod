import { TagType, TagModel } from '@bmc-ux/adapt-angular';
import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface ITagsFormControlOptions {
    label?: string;
    required?: boolean;
    tooltip?: AdaptRxControlLabelTooltip;
    placeholder?: string;
    autocompleteValues?: ITagAutocompleteValue[];
    errorCheck?: (tag: ITagsFormControlModel) => boolean;
}
export interface ITagData {
    value: string;
}
export declare type ITagsFormControlModel = TagType<ITagData>;
export declare type ITagAutocompleteValue = TagModel<ITagData>;
