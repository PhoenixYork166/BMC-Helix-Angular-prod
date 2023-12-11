import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { IViewComponentDropPredicateData, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { IButtonBarProperties } from './button-bar-design.types';
export declare class ButtonBarDesignModel extends ViewDesignerComponentModel<IButtonBarProperties> implements IViewDesignerComponentModel<IButtonBarProperties> {
    hasChildren$: Observable<boolean>;
    componentProperties$: Observable<IButtonBarProperties>;
    static getInitialProperties(initialProperties?: IButtonBarProperties): IButtonBarProperties;
    rxInit(): void;
    dropPredicate(data: IViewComponentDropPredicateData): boolean;
    private validate;
    private getInspector;
}
