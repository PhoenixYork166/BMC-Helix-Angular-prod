import { IViewDefinitionPermission, IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IRxShellMenuGroupProps } from './shell-menu-group-design.types';
import { Observable } from 'rxjs';
export declare class RxShellMenuGroupDesignModel extends ViewDesignerComponentModel<IRxShellMenuGroupProps> implements IViewDesignerComponentModel<IRxShellMenuGroupProps> {
    componentProperties$: Observable<IRxShellMenuGroupProps>;
    label$: Observable<string>;
    static getInitialProperties(initialProperties?: IRxShellMenuGroupProps): IRxShellMenuGroupProps;
    static getDefaultPermissions(): IViewDefinitionPermission[];
    rxInit(): void;
    private validate;
    private getInspector;
}
