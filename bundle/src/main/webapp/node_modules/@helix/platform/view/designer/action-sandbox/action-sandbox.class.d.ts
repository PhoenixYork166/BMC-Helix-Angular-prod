import { Injector } from '@angular/core';
import { IViewActionDescriptor, IViewActionDesignProperties, IViewActionDesignPropertyEditorConfig, IViewActionDesignSandbox, IViewActionOutputDataDictionary, ViewActionDesignEditableProperties } from '@helix/platform/view/api';
import { IViewComponentDesignSetPayload } from '../public-interfaces/view-component-design.types';
export declare class ActionSandbox implements IViewActionDesignSandbox {
    private injector;
    readonly descriptor: IViewActionDescriptor;
    readonly guid: string;
    private initialProps;
    private destroyedSubject;
    private viewDesignerFacade;
    private actionPropertyEditorConfigSubject;
    private actionPropertiesSubject;
    private children;
    readonly children$: import("rxjs").Observable<import("../public-interfaces/view-component-design.types").IViewComponentDesignData<import("@helix/platform/shared/api").IPlainObject>[]>;
    readonly destroyed$: import("rxjs").Observable<void>;
    readonly actionPropertyEditorConfig$: import("rxjs").Observable<IViewActionDesignPropertyEditorConfig>;
    readonly actionProperties$: import("rxjs").Observable<any>;
    constructor(injector: Injector, descriptor: IViewActionDescriptor, guid: string, initialProps: IViewActionDesignProperties);
    updateActionProperties(props: Partial<ViewActionDesignEditableProperties<IViewActionDesignProperties>>): void;
    setActionProperties(props: ViewActionDesignEditableProperties<IViewActionDesignProperties>): void;
    getActionProperties(): IViewActionDesignProperties;
    getActionPropertyValue<T extends keyof IViewActionDesignProperties>(propertyName: T): IViewActionDesignProperties[T];
    setActionPropertyEditorConfig(actionEditorConfig: IViewActionDesignPropertyEditorConfig): void;
    getActionPropertyEditorConfig(): IViewActionDesignPropertyEditorConfig;
    setActionOutputDataDictionary(dataDictionary: IViewActionOutputDataDictionary): void;
    setChildren(data: IViewComponentDesignSetPayload[]): void;
    getChildren(): IViewComponentDesignSetPayload[];
    onDestroy(): void;
}
