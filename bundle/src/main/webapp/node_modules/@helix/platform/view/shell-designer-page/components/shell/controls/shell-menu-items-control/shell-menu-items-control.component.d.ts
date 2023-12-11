import { Injector } from '@angular/core';
import { IShellMenuItemsWidgetConfig } from './shell-menu-items-control.types';
import { IShellMenuItem } from '../../shell-design.types';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { IFormWidgetComponent, IPlainObject } from '@helix/platform/shared/api';
import { RxShellDesignModel } from '../../shell-design.model';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxShellMenuItemsControlComponent extends InspectorWidgetBase<IPlainObject, RxShellDesignModel> implements IFormWidgetComponent {
    protected injector: Injector;
    private rxUtilityModalsService;
    options: IShellMenuItemsWidgetConfig;
    isDisabled: boolean;
    menuGroupLabel: string;
    menuItemTypeToLabelMap: {
        [x: string]: string;
    };
    actionNameToLabelMap: {
        [x: string]: string;
    };
    constructor(injector: Injector, rxUtilityModalsService: RxUtilityModalsService);
    edit(menuItem: IShellMenuItem): void;
    remove(menuItem: IShellMenuItem): void;
    canBeRemoved(menuItem: IShellMenuItem): boolean;
    trackByGuid(index: number, menuItem: IShellMenuItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxShellMenuItemsControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxShellMenuItemsControlComponent, "rx-shell-menu-items-control", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
