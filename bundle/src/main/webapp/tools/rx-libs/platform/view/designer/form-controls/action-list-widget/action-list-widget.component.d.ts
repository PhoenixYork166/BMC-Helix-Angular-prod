import { Injector, OnDestroy, OnInit } from '@angular/core';
import { IFormFocusable, IFormWidgetComponent } from '@helix/platform/shared/api';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { ViewDesignerComponentModel } from '../../model/view-designer-component-model.class';
import { IViewComponentDesignSandbox } from '../../public-interfaces/view-component-design-sandbox.interface';
import { ActionListControlComponent } from '../action-list-control/action-list-control.component';
import { IActionListWidgetComponentOptions } from './action-list-widget.types';
import { IViewActionListItem } from '../action-list-control/action-list-control.types';
import * as i0 from "@angular/core";
export declare class ActionListWidgetComponent extends InspectorWidgetBase<IActionListWidgetComponentOptions, ViewDesignerComponentModel> implements OnInit, OnDestroy, IFormWidgetComponent, IFormFocusable {
    protected injector: Injector;
    actionListControlComponent: ActionListControlComponent;
    options: IActionListWidgetComponentOptions;
    actions: IViewActionListItem[];
    modelSandbox: IViewComponentDesignSandbox;
    private destroyed$;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onActionsChange(actions: IViewActionListItem[]): void;
    focus(data: any): void;
    private getActionComponentPayloads;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionListWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionListWidgetComponent, "rx-action-list-widget", never, {}, {}, never, never>;
}
