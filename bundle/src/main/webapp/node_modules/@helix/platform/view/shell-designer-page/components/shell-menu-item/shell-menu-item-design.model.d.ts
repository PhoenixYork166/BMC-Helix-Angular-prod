import { IFormControlBuilderConfig, IPlainObject } from '@helix/platform/shared/api';
import { IViewDefinitionPermission, IViewDesignerComponentModel, RxViewDefinitionCacheService } from '@helix/platform/view/api';
import { IViewComponentDesignValidationIssue, ViewDesignerComponentModel, ViewDesignerFacade } from '@helix/platform/view/designer';
import { IRxShellMenuItemProperties } from './shell-menu-item-design.types';
import { Observable } from 'rxjs';
import { RxOpenViewModelHelperService } from '@helix/platform/view/actions';
export interface IShellActionDescriptor {
    name: string;
    label: string;
    parameters?: IFormControlBuilderConfig[];
    requiredParams?: IPlainObject;
    defaultParams?: IPlainObject;
}
export declare class RxShellMenuItemDesignModel extends ViewDesignerComponentModel<IRxShellMenuItemProperties> implements IViewDesignerComponentModel<IRxShellMenuItemProperties> {
    componentProperties$: Observable<IRxShellMenuItemProperties>;
    label$: Observable<string>;
    isActionItem$: Observable<boolean>;
    menuItemIcon$: Observable<string>;
    iconClass$: Observable<string>;
    menuItemNameLabel: string;
    rxViewDefinitionCacheService: RxViewDefinitionCacheService;
    viewDesignerFacade: ViewDesignerFacade;
    rxOpenViewModelHelperService: RxOpenViewModelHelperService;
    shellActions: {
        [actionName: string]: IShellActionDescriptor;
    };
    private viewDefinitionName$;
    private inputParams$;
    private currentViewInputNames;
    isInShellRoot: boolean;
    private isInShellRoot$;
    static getInitialProperties(initialProperties?: IRxShellMenuItemProperties): IRxShellMenuItemProperties;
    static getDefaultPermissions(): IViewDefinitionPermission[];
    rxInit(): void;
    getPropertiesByName(props: IRxShellMenuItemProperties): IRxShellMenuItemProperties;
    private getEmptyViewParams;
    private getActionDefaultProps;
    private getActionProps;
    private getInspector;
    protected validate(props: IRxShellMenuItemProperties): IViewComponentDesignValidationIssue[];
    private validateActionParams;
    private getViewInputParams;
    private isActionItem;
}
