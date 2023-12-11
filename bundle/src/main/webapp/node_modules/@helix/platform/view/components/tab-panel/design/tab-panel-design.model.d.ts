import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ITabPanelProperties } from './tab-panel-design.types';
import { ITabContainerProperties } from './tab-container-design/tab-container-design.types';
import { ReplaySubject } from 'rxjs';
export declare class TabPanelDesignModel extends ViewDesignerComponentModel<ITabPanelProperties> implements IViewDesignerComponentModel<ITabPanelProperties> {
    tabContainerGuids$: import("rxjs").Observable<string[]>;
    tabContainerComponents$: import("rxjs").Observable<Omit<import("@helix/platform/view/designer").IViewComponentDesignData<ITabContainerProperties>, "children">[]>;
    selectedTabGuid$: ReplaySubject<string>;
    static getInitialProperties(initialProperties?: ITabPanelProperties): ITabPanelProperties;
    rxInit(): void;
    addTab(): void;
    removeTab(guid: string): void;
    selectTab(guid: string, skipSelectComponent?: boolean): void;
    dropPredicate(): boolean;
    moveComponent(guid: string, insertIndex: number): void;
    private validate;
    private getInspector;
}
