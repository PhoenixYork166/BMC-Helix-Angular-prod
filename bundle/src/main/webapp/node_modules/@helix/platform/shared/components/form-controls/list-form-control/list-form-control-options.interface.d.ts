import { IListItem } from './list-item.interface';
export interface IListFormControlOptions {
    label: string;
    addItemText: string;
    emptyListText?: string;
    items: IListItem[];
}
