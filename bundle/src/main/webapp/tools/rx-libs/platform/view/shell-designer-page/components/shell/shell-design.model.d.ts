import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { IShellDesignProperties, IShellProperties } from './shell-design.types';
export declare class RxShellDesignModel extends ViewDesignerComponentModel<IShellDesignProperties> implements IViewDesignerComponentModel<IShellDesignProperties> {
    allowAppSwitching$: Observable<boolean>;
    globalSearchEnabled$: Observable<boolean>;
    menuItems$: Observable<import("@helix/platform/view/designer").IViewComponentDesignData<import("@helix/platform/shared/api").IPlainObject>[]>;
    private childMenuItemsCount$;
    static getInitialProperties(initialProperties?: IShellProperties): IShellDesignProperties;
    rxInit(): void;
    getPropertiesByName(props: IShellDesignProperties): IShellProperties;
    removeMenuItem(guid: string): void;
    selectMenuItem(guid: string): void;
    private validate;
    private getInspector;
}
