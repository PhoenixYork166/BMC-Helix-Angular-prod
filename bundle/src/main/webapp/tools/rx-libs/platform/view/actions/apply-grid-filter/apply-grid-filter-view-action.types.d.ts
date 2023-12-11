import { ApplyGridFilterMode, IRecordGridFilterData, IRxRecordGridApi, IViewActionDesignProperties } from '@helix/platform/view/api';
import { IRecordGridDesignInspectorColumnConfig, IRecordGridFilterModel } from '@helix/platform/view/components';
import { IViewComponentDesignData } from '@helix/platform/view/designer';
export declare const RxApplyGridFilterActionName = "rxApplyGridFilterAction";
export interface IApplyGridFilterViewActionParams extends IViewActionDesignProperties {
    targetApi: IRxRecordGridApi;
    mode: ApplyGridFilterMode;
    filters: IRecordGridFilterData;
}
export interface IApplyGridFilterViewActionDesignProperties extends IViewActionDesignProperties {
    targetApi: string;
    mode: ApplyGridFilterMode;
    filterValue?: IRecordGridFilterModel;
    filters: string;
}
export interface IApplyGridFilterViewActionGridData {
    guid: string;
    columns: Pick<IRecordGridDesignInspectorColumnConfig, 'namedFilterOptions' | 'fieldId'>[];
}
export interface IApplyGridFilterViewActionData extends IViewComponentDesignData<IApplyGridFilterViewActionDesignProperties> {
}
