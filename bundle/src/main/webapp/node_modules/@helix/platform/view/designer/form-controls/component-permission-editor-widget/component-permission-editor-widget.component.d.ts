import { OnDestroy, OnInit } from '@angular/core';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { IViewDefinitionPermission } from '@helix/platform/view/api';
import { IComponentPermissionEditorConfig } from './component-permission-editor-widget.types';
import { IFormWidgetComponent } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxComponentPermissionEditorWidgetComponent implements OnInit, OnDestroy, IFormWidgetComponent {
    private viewDesignerFacade;
    options: IComponentPermissionEditorConfig;
    isDisabled: boolean;
    permissions: IViewDefinitionPermission[];
    private destroyed$;
    constructor(viewDesignerFacade: ViewDesignerFacade);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onPermissionsChange(permissions: IViewDefinitionPermission[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxComponentPermissionEditorWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxComponentPermissionEditorWidgetComponent, "rx-component-permission-editor-widget", never, { "options": "options"; "isDisabled": "isDisabled"; }, {}, never, never>;
}
