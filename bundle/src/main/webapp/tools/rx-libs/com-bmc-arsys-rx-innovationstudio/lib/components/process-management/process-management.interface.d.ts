import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IBundleInfo, IDataPageResult, IPlainObject } from '@helix/platform/shared/api';
import { IBreadcrumbItem } from '@helix/platform/ui-kit';
export interface IProcessManagementModel {
    bundleDescriptor: IBundleInfo;
    processDefinitionOptions: RxSelectOption[];
    isProcessHistoryEnabled: boolean;
    processActionButtonsState: IProcessActionButtonsState;
    processInstanceCounts: IPlainObject;
    breadcrumbItems: IBreadcrumbItem[];
}
export interface IProcessActionButtonsState {
    isRunButtonDisabled: boolean;
    isViewButtonDisabled: boolean;
}
export interface IProcessInstanceStatusCounts extends IDataPageResult {
    status: string;
}
