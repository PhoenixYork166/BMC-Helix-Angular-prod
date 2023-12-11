import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IViewComponentDesignSandbox, IViewDesignerInspectorConfig } from '@helix/platform/view/designer';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
import { ISelectionFieldProperties } from './selection-field-design.types';
export declare class SelectionFieldDesignModel extends BaseRecordEditorFieldDesign {
    injector: Injector;
    sandbox: IViewComponentDesignSandbox<ISelectionFieldProperties>;
    fieldResourceTypes: string[];
    editingMode$: Observable<string>;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<ISelectionFieldProperties>);
    static getInitialProperties(initialProperties?: ISelectionFieldProperties): ISelectionFieldProperties;
    getInspectorConfig(): Observable<IViewDesignerInspectorConfig>;
    private editInspectorConfig;
}
