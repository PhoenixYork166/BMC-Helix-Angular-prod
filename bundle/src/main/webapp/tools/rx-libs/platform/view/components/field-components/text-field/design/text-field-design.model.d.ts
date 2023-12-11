import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IViewComponentDesignSandbox, IViewDesignerInspectorConfig } from '@helix/platform/view/designer';
import { BaseRecordEditorFieldDesign } from '../../base-record-editor-field/design';
import { ITextFieldProperties } from './text-field-design.types';
export declare class TextFieldDesignModel extends BaseRecordEditorFieldDesign {
    injector: Injector;
    sandbox: IViewComponentDesignSandbox<ITextFieldProperties>;
    fieldResourceTypes: string[];
    private translateService;
    static getInitialProperties(initialProperties?: ITextFieldProperties): ITextFieldProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<ITextFieldProperties>);
    getInspectorConfig(): Observable<IViewDesignerInspectorConfig>;
    private getNamedListInspectorConfig;
    getPropertiesByName(properties: ITextFieldProperties): ITextFieldProperties;
}
