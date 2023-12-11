import { IViewActionListItem } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { ISelectFormControlOptions } from '@helix/platform/shared/components';
import { IActionButtonProperties } from '../../../../action-button/action-button.types';
export interface IRowAction extends IActionButtonProperties {
    actions: IViewActionListItem[];
    guid: string;
}
export interface IRowActionData extends IRowAction {
    isOpen: boolean;
    securityFieldDefinitions$?: Observable<ISelectFormControlOptions>;
}
