import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { IPlainObject } from '../common-types';
import { IFormBuilderConfig } from '../form-builder';
import { IDataDictionaryBranch } from '../data-dictionary';
export interface IDesignerConfiguration {
    bundleId: string;
    definitionName: string;
    designerOptions?: IPlainObject;
}
export interface IDesignerElementService<TElementDefinition = IPlainObject, TElementModel = IPlainObject> {
    getDefinitionFromModel(model: TElementModel): Partial<TElementDefinition>;
    getInspectorConfig(model: TElementModel, options?: IPlainObject): IFormBuilderConfig;
    getModelFromDefinition(definition: TElementDefinition, options?: IPlainObject): TElementModel;
    getShape(options: IPlainObject): any;
    setCommonDataDictionaryBranch(guid: string, dataDictionaryBranch: Observable<IDataDictionaryBranch>): void;
    validate(model: TElementModel, availableCells: any): Observable<IValidationIssue[]>;
}
interface IDesignerPaletteIcon {
    path: string;
    position: string;
}
export interface IDesignerPaletteItem {
    border: string;
    icon?: IDesignerPaletteIcon;
    label: string;
    shape: string;
}
export interface IDesignerElementDescriptor {
    elementService: IDesignerElementService;
    group: string;
    paletteItem: IDesignerPaletteItem;
    resourceType: string;
    shapeClass: any;
    shapeType: string;
    type: string;
    viewShapeClass: any;
    viewShapeType: string;
}
export interface IDesignerElementRegistry {
    get(type: string): IDesignerElementDescriptor;
    getAll(): IDesignerElementDescriptor[];
    register(descriptor: IDesignerElementDescriptor): void;
}
export interface IDesignerGraph<TDefinition, TModel> {
    reset(): void;
    addDefaultElements(model: TModel): void;
    getDefinitionFromGraph(): Partial<TDefinition>;
    loadGraphFromDefinition(definition: TDefinition): any;
}
export interface IDesignerGraphConfig {
    injector: Injector;
    options: IPlainObject;
}
export interface IDesignerStencilElement {
    group: string;
    label: string;
    value: {
        [name: string]: string;
    };
    selected?: boolean;
}
export interface IDesignerStencilElementGroups {
    [name: string]: {
        name?: string;
        priority: number;
    };
}
export interface IDesignerStencilElementTree {
    expanded?: boolean;
    label: string;
    children: IDesignerStencilElement[];
    allChildElementsSelected?: boolean;
    someChildElementsSelected?: boolean;
}
export interface IAssignmentExpression {
    assignTarget: string;
    expression: string;
}
export interface IMultiInstanceLoopDefinition {
    completionCondition: string;
    inputDataItem: string;
    isSequential: boolean;
    loopDataInputRef: string;
}
export interface IServerActionModel {
    actionTypeName: string;
    deprecatedText: string;
    guid: string;
    inputMap: IPlainObject;
    isDeprecated: boolean;
    label: string;
    name: string;
    outputMap: IAssignmentExpression[];
    resourceType: string;
    type: string;
}
export interface IProcessActionElementModel extends IServerActionModel {
    description: string;
    multiInstanceLoopDefinition: IMultiInstanceLoopDefinition;
    runAsUser: string;
}
export interface IDesignerModel<TDefinition, TDefinitionModel> {
    bundleId: string;
    definitionName: string;
    isDesignMode: boolean;
    definitionModelFromDefinition: TDefinitionModel;
    definitionModel: TDefinitionModel;
    isDirty: boolean;
    savedDefinitionName: string;
    originalDefinition: TDefinition;
}
export {};
