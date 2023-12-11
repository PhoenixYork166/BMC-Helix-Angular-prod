import { RxShellMenuItemDesignModel } from '../shell-menu-item/shell-menu-item-design.model';
import { IRxShellMenuItemProperties } from '../shell-menu-item/shell-menu-item-design.types';
import { IViewComponentDesignValidationIssue } from '@helix/platform/view/designer';
export declare class RxShellActionDesignModel extends RxShellMenuItemDesignModel {
    iconClass$: import("rxjs").Observable<string>;
    menuItemNameLabel: string;
    static getInitialProperties(initialProperties?: IRxShellMenuItemProperties): IRxShellMenuItemProperties;
    validate(props: IRxShellMenuItemProperties): IViewComponentDesignValidationIssue[];
}
