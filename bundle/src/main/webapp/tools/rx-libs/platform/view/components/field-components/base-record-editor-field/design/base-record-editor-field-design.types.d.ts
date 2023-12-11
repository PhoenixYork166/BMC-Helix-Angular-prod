import { IRxDisabledProp, IRxStandardProps } from '@helix/platform/view/api';
export interface IBaseRecordEditorFieldProperties extends IRxStandardProps, IRxDisabledProp {
    fieldId: string;
    label: string;
    value?: string;
}
