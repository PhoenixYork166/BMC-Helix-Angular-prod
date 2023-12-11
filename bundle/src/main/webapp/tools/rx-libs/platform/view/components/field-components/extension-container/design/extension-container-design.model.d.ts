import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Injector } from '@angular/core';
import { IExtensionContainerProperties } from './extension-container-design.types';
export declare class ExtensionContainerDesignModel extends ViewDesignerComponentModel {
    protected injector: Injector;
    protected sandbox: IViewComponentDesignSandbox<IExtensionContainerProperties>;
    componentProperties$: import("rxjs").Observable<IExtensionContainerProperties>;
    parentGuid$: import("rxjs").Observable<string>;
    initialProperties: IExtensionContainerProperties;
    constructor(injector: Injector, sandbox: IViewComponentDesignSandbox<IExtensionContainerProperties>);
    private getInspectorConfig;
}
