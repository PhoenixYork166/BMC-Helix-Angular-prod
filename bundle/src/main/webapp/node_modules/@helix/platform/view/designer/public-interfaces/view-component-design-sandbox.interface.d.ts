import { Observable } from 'rxjs';
import { IViewComponentDesignData, IViewComponentDesignSetPayload, ViewComponentAddComponentPayload } from './view-component-design.types';
import { IViewComponentDesignValidationIssue } from './view-component-design-validation-issue.interface';
import { IViewDesignerInspectorConfig } from './view-designer-inspector.types';
import { IViewDesignModel } from '../interfaces/view-design-model.interface';
import { IViewComponentDesignCommonDataDictionaryBranch } from './view-component-design-common-data-dictionary.interfaces';
import { IViewComponentDesignSettablePropertiesDataDictionary } from './view-component-design-settable-properties-data-dictionary.interfaces';
import { IViewComponentDescriptor, IViewDesignerComponentModel, IViewLayout } from '@helix/platform/view/api';
import { IPlainObject } from '@helix/platform/shared/api';
export interface IViewComponentDesignSandbox<TDesignComponentProperties = IPlainObject> {
    readonly descriptor: IViewComponentDescriptor;
    readonly guid: string;
    readonly componentProperties$: Observable<TDesignComponentProperties>;
    readonly isComponentSelected$: Observable<boolean>;
    readonly destroyed$: Observable<boolean>;
    readonly viewModelsInitialized$: Observable<any>;
    readonly isViewReadOnly$: Observable<boolean>;
    readonly componentType: string;
    createError(description: string, propertyName?: string, disableCorrection?: boolean): IViewComponentDesignValidationIssue;
    createWarning(description: string, propertyName?: string, disableCorrection?: boolean): IViewComponentDesignValidationIssue;
    getChildComponentGuids(filterPredicate?: (component: IViewComponentDesignData) => boolean, recursive?: boolean): Observable<string[]>;
    getComponent<TChildComponentDesignProperties = IPlainObject>(guid: string): Observable<IViewComponentDesignData<TChildComponentDesignProperties>>;
    getChildComponents<TChildComponentDesignProperties = IPlainObject>(filterPredicate?: (component: IViewComponentDesignData) => boolean): Observable<Omit<IViewComponentDesignData<TChildComponentDesignProperties>, 'children'>[]>;
    getChildComponentsTree(): Observable<IViewComponentDesignData[]>;
    setChildren(components: IViewComponentDesignSetPayload[], parentGuid?: string): void;
    /**
     * Will update only first level child components with provided types,
     * components with other types will not be changed
     * Useful when host component has child components of different types
     * @internal
     */
    setChildrenByType(components: IViewComponentDesignSetPayload[], types: string[]): void;
    getParentComponentGuid(componentType?: string): Observable<string>;
    setValidationIssues(issues: IViewComponentDesignValidationIssue[]): void;
    updateComponentProperties(componentProperties: Partial<TDesignComponentProperties>): void;
    getComponentPropertyValue<TPropertyName extends keyof TDesignComponentProperties>(propertyName: TPropertyName): Observable<TDesignComponentProperties[TPropertyName]>;
    getComponentPropertyValue<TPropertyName extends keyof TExternalDesignComponentProperties, TExternalDesignComponentProperties = IPlainObject>(propertyName: TPropertyName, componentGuid: string): Observable<TExternalDesignComponentProperties[TPropertyName]>;
    getViewPropertyValue<T extends keyof IViewDesignModel>(propertyName: T): Observable<IViewDesignModel[T]>;
    updateInspectorConfig(inspectorConfig: IViewDesignerInspectorConfig): void;
    setBreadcrumbs(label: string): any;
    addComponent(data: ViewComponentAddComponentPayload | ViewComponentAddComponentPayload[]): void;
    selectComponent(guid: string): void;
    removeComponents(guids: string[], selectParent?: boolean): void;
    moveComponent(guid: string, insertIndex: number, parentGuid: string): void;
    setLayout(cols: number[]): void;
    getLayout(guid: string): Observable<IViewLayout>;
    setCommonDataDictionary(dataDictionaryBranch: IViewComponentDesignCommonDataDictionaryBranch): void;
    setSettablePropertiesDataDictionary(componentName: string, dataDictionary: IViewComponentDesignSettablePropertiesDataDictionary): void;
    getComponentModel<T extends IViewDesignerComponentModel>(guid: string): T;
    getComponentsByType<TComponentDesignProperties>(type: string): Observable<IViewComponentDesignData<TComponentDesignProperties>[]>;
}
