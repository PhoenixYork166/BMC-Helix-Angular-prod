import { IActionLabelsMap, IViewActionListItem } from './action-list-control.types';
import { IViewActionDescriptor, RxViewActionRegistryService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class ActionListControlComponent extends ValueAccessor<IViewActionListItem[]> implements IFormControlComponent, IFormFocusable {
    private rxModalService;
    private rxViewActionRegistryService;
    options: any;
    tooltip: string;
    availableActions$: Observable<IViewActionDescriptor[]>;
    actionLabelsMap: IActionLabelsMap;
    selectedActions: IViewActionListItem[];
    constructor(rxModalService: RxModalService, rxViewActionRegistryService: RxViewActionRegistryService);
    focus(data?: {
        actionIndex: number;
    }): void;
    openActionSelector(actionToEdit?: IViewActionListItem): void;
    onSetValue(): void;
    onWriteValue(value: IViewActionListItem[]): void;
    removeAction(action: IViewActionListItem): void;
    editAction(action: IViewActionListItem): void;
    private updateSortedActionsList;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionListControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionListControlComponent, "rx-action-list-control", never, { "options": "options"; "tooltip": "tooltip"; }, {}, never, never>;
}
