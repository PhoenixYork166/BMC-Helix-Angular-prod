import { Observable } from 'rxjs';
import { IViewComponentDesignSandbox, IViewDesignerInspectorConfig } from '@helix/platform/view/designer';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design/base-record-editor-field-design.class';
import { Injector } from '@angular/core';
import { IBooleanFieldProperties } from './boolean-field-design.types';
export declare class BooleanFieldDesignModel extends BaseRecordEditorFieldDesign {
    injector: Injector;
    sandbox: IViewComponentDesignSandbox<IBooleanFieldProperties>;
    componentProperties$: Observable<IBooleanFieldProperties>;
    fieldResourceTypes: string[];
    static getInitialProperties(initialProperties?: IBooleanFieldProperties): IBooleanFieldProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<IBooleanFieldProperties>);
    getInspectorConfig(): Observable<IViewDesignerInspectorConfig>;
    private editInspectorConfig;
}
