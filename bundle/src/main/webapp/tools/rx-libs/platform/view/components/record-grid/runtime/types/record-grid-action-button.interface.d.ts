import { BooleanLike } from '@helix/platform/shared/api';
import { IRxRecordGridAction } from './record-grid-action.types';
import { IRowDataItem } from '@helix/platform/view/api';
export interface IRecordGridActionButton {
    actions?: IRxRecordGridAction[];
    clickable?: BooleanLike;
    /**
     * If the property set as the function, the function will be called only on row selection change
     */
    disabled?: BooleanLike | ((selectedRows: IRowDataItem[]) => boolean);
    fieldId?: string;
    guid?: string;
    hidden?: BooleanLike | ((selectedRows: IRowDataItem[]) => boolean);
    icon?: string;
    iconCls?: string;
    iconAlignment?: string;
    label?: string;
    size?: string;
    style?: string;
}
