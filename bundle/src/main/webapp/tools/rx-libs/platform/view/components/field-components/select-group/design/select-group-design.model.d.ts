import { IViewComponentDesignData, IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IFieldDefinition, RxFieldDefinitionService, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ISelectGroupFieldProperties, ISelectGroupProperties } from './select-group-design.types';
import { RecordEditorMode } from '../../../record-editor/common/record-editor.types';
export declare class SelectGroupDesignModel extends ViewDesignerComponentModel {
    injector: Injector;
    protected sandbox: IViewComponentDesignSandbox<ISelectGroupProperties>;
    rxRecordDefinitionCacheService: RxRecordDefinitionCacheService;
    rxFieldDefinitionService: RxFieldDefinitionService;
    recordEditorGuid$: Observable<string>;
    recordEditorMode$: Observable<RecordEditorMode>;
    recordDefinitionName$: Observable<string>;
    fieldDefinitions$: Observable<IFieldDefinition[]>;
    inspectorTargetFieldOptions$: Observable<any[]>;
    fieldsDesignData$: Observable<Omit<IViewComponentDesignData<ISelectGroupFieldProperties>, "children">[]>;
    fieldProperties$: Observable<ISelectGroupFieldProperties[]>;
    static getInitialProperties(initialProperties?: ISelectGroupProperties): ISelectGroupProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<ISelectGroupProperties>);
    onFieldPropertiesChange(fieldProperties: ISelectGroupFieldProperties[]): void;
    isFieldRequired(field: IViewComponentDesignData<ISelectGroupFieldProperties>): Observable<boolean>;
    getPropertiesByName(properties: any): Pick<any, "disabled" | "hidden" | "styles" | "availableOnDevices">;
    private validate;
    private getFieldComponentPayloads;
    private getBaseInspectorConfig;
}
