import { IRecordInstance } from '@helix/platform/record/api';
import { IRowDataItem, IRxRecordGridApi } from '../common/record-grid.types';
import { TypeDecorator } from '@angular/core';
export declare const RX_VIEW_ACTION: {
    viewActionNames: {
        openView: string;
        launchUrl: string;
    };
};
export declare enum OpenViewActionLaunchBehavior {
    SameWindow = "sameWindow",
    NewWindow = "newWindow"
}
export declare enum OpenViewActionModalSize {
    Xsmall = "rx-xs",
    Small = "rx-sm",
    Medium = "rx-md",
    Large = "rx-lg",
    Xlarge = "rx-xl",
    Xxlarge = "rx-xxl",
    FullSize = "rx-full-size"
}
export declare enum OpenViewActionType {
    FullWidth = "fullWidth",
    CenteredModal = "centeredModal",
    DockedLeftModal = "dockedLeftModal",
    DockedRightModal = "dockedRightModal"
}
export declare type RecordsSource = IRxRecordGridApi | IRecordInstance[] | IRecordInstance['id'][] | IRowDataItem | IRowDataItem[] | string;
export interface RxViewAction {
    name: string;
}
export interface RxViewActionDecorator {
    /**
     * Decorator that marks a class as an RxViewAction and supplies configuration metadata.
     */
    (rxViewAction?: RxViewAction): TypeDecorator;
    new (rxViewAction?: RxViewAction): RxViewAction;
}
export declare const RxViewAction: RxViewActionDecorator;
