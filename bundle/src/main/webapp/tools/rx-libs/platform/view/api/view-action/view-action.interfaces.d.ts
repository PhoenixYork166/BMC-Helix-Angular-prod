import { IExpressionEvaluator } from '../expressions/expression-evaluator.types';
import { ViewComponentPropertyType } from '../registries/view-component-descriptor.types';
import { Injector, Type } from '@angular/core';
import { IExpressionConfigurator, IFormControlBuilderConfig, IFormControlComponent, IPlainObject } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { AdaptRxControlLabelTooltip } from '@bmc-ux/adapt-angular';
export interface IViewActionService<TActionParams = any, TActionResult = any> {
    execute(params: TActionParams): Observable<TActionResult>;
}
export interface IViewActionOutputDataDictionary extends Array<IViewActionOutputDataDictionaryBranch> {
}
export interface IViewActionOutputDataDictionaryBranch {
    label: string;
    expression: string;
    children?: IViewActionOutputDataDictionary;
}
export interface IViewActionDescriptor {
    name: string;
    bundleId: string;
    label?: string;
    availableInBundles?: Array<string | RegExp>;
    hidden?: boolean;
    service: IViewActionService;
    designManager?: IViewActionDesignManager;
    designModel?: IViewActionDesignModelConstructor;
    parameters?: IViewActionParamDescriptor[];
}
export interface IViewActionChildData<TProperties = IPlainObject> {
    guid: string;
    data: TProperties;
    type: string;
}
export interface IViewActionChildSetData<TProperties = IPlainObject> {
    type: string;
    guid?: string;
    data?: TProperties;
}
export interface IViewActionDesignSandbox<TDesignActionProperties = IViewActionDesignProperties> {
    readonly actionProperties$: Observable<ViewActionDesignEditableProperties<TDesignActionProperties>>;
    readonly actionPropertyEditorConfig$: Observable<IViewActionDesignPropertyEditorConfig>;
    readonly guid: string;
    readonly descriptor: IViewActionDescriptor;
    readonly destroyed$: Observable<void>;
    readonly children$: Observable<IViewActionChildData[]>;
    updateActionProperties(props: Partial<ViewActionDesignEditableProperties<TDesignActionProperties>>): void;
    setActionProperties(props: ViewActionDesignEditableProperties<TDesignActionProperties>): void;
    getActionProperties(): TDesignActionProperties;
    getActionPropertyValue<TDesignActionPropertyName extends keyof TDesignActionProperties>(propertyName: TDesignActionPropertyName): TDesignActionProperties[TDesignActionPropertyName];
    setActionPropertyEditorConfig(config: IViewActionDesignPropertyEditorConfig): void;
    getActionPropertyEditorConfig(): IViewActionDesignPropertyEditorConfig;
    setActionOutputDataDictionary(dataDictionary: IViewActionOutputDataDictionary): void;
    setChildren(data: IViewActionChildSetData[]): void;
    getChildren(): IViewActionChildSetData[];
}
export interface IViewActionDesignModelConstructor<TViewActionDesignProperties = IViewActionDesignProperties> {
    new (injector: Injector, sandbox: IViewActionDesignSandbox<TViewActionDesignProperties>): IViewActionDesignModel<TViewActionDesignProperties>;
    getInitialProperties?(initialProperties: ViewActionDesignEditableProperties<TViewActionDesignProperties>): ViewActionDesignEditableProperties<TViewActionDesignProperties>;
}
export interface IViewActionDesignModel<TViewActionDesignProperties = IViewActionDesignProperties> {
    readonly guid: string;
    readonly sandbox: IViewActionDesignSandbox<TViewActionDesignProperties>;
    getPropertiesByName(): TViewActionDesignProperties;
    getExpressionConfigurator(): IExpressionConfigurator;
    getChildren?(): IViewActionChildSetData[];
}
export interface IViewActionDesignManager<T = IViewActionDesignProperties> {
    validate(actionProperties: T, propertyName: string): Observable<IPlainObject[]>;
}
export interface IViewActionDesignProperties {
    $condition$?: string;
    readonly name: string;
    index: number;
}
export interface IViewActionDesignPropertyEditorConfig extends Array<IFormControlBuilderConfig> {
}
export declare type ViewActionDesignEditableProperties<TViewActionDesignProperties> = Omit<TViewActionDesignProperties, 'name' | 'index'>;
export interface IViewActionParamDescriptor {
    name: string;
    label?: string;
    tooltip?: AdaptRxControlLabelTooltip;
    localizable?: boolean;
    type?: ViewComponentPropertyType;
    designType?: ViewComponentPropertyType;
    defaultValue?: any;
    evaluatorService?: IExpressionEvaluator;
    enableExpressionEvaluation?: boolean;
    isRequired?: boolean;
    editor?: Type<IFormControlComponent>;
    editorOptions?: IPlainObject;
    attributes?: IViewActionParamAttribute[];
}
export interface IViewActionParamAttribute {
    name: string;
    localizable?: boolean;
}
export interface IViewActionExpressionConfigurator extends IExpressionConfigurator {
}
