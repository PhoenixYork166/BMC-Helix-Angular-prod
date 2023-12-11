import { IViewComponentDescriptor } from '@helix/platform/view/api';
import { IPlainObject } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
export interface IViewDesignerCanvasLayout {
    guid: string;
    model: any;
    descriptor: IViewComponentDescriptor;
    viewComponentWithParents?: {
        guid: string;
        type: string;
    }[];
    outlets: IViewDesignerCanvasOutlet[];
    isSelected$: Observable<boolean>;
    factory: any;
    label?: any;
}
export interface IViewDesignerCanvasColumn {
    children: IViewDesignerCanvasLayout[];
    span: number;
    dndListIds: string[];
    listId: string;
}
export interface IViewDesignerCanvasOutlet {
    name: string;
    columns: IViewDesignerCanvasColumn[];
}
export interface IViewComponentDragData {
    draggedViewComponentDescriptor: IViewComponentDescriptor;
    draggedViewComponentGuid?: string;
    draggedViewComponentParents?: {
        guid: string;
        type: string;
    }[];
}
export interface IViewComponentDropPredicateData extends IViewComponentDragData {
    dropTargetViewComponentWithParents: {
        guid: string;
        type: string;
    }[];
}
export interface IViewComponentDropData extends IViewComponentDragData {
    initialPropertiesByName: IPlainObject;
    columnIndex: number;
    preventDrop?: boolean;
}
