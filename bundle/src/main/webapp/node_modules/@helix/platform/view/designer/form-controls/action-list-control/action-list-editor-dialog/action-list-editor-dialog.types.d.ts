import { IViewActionListItem } from '../action-list-control.types';
import { IViewActionDesignModel } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
export interface IActionEditorDialogConfig {
    selectedActions: IViewActionListItem[];
    actionToEdit?: IViewActionListItem;
    isReadOnly: boolean;
}
export interface IViewActionEditorDialogItem {
    isOpen: boolean;
    name: string;
    model: IViewActionDesignModel;
    config$: Observable<IFormBuilderConfig>;
}
