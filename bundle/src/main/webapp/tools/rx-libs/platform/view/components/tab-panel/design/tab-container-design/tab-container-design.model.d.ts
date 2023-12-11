import { Injector } from '@angular/core';
import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITabContainerDesignProperties, ITabContainerProperties } from './tab-container-design.types';
export declare class TabContainerDesignModel extends ViewDesignerComponentModel {
    protected injector: Injector;
    protected sandbox: IViewComponentDesignSandbox<ITabContainerProperties>;
    componentProperties$: Observable<ITabContainerProperties>;
    hiddenOnCanvas$: BehaviorSubject<boolean>;
    selectedTabGuid$: Subject<string>;
    static getInitialProperties(initialProperties?: ITabContainerProperties): ITabContainerDesignProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<ITabContainerProperties>);
    setContainerLayout(columnSizes: number[]): void;
    private getDefaultColumnSpans;
    private getInspector;
}
