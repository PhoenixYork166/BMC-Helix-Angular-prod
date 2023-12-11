import { IViewActionDesignProperties } from '@helix/platform/view/api';
export interface IViewActionListItem<TDesignProperties = IViewActionDesignProperties> {
    guid: string;
    data: TDesignProperties;
}
export interface IActionLabelsMap {
    [name: string]: string;
}
