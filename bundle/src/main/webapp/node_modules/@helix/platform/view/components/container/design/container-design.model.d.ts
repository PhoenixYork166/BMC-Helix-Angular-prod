import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { Observable } from 'rxjs';
import { IContainerProperties } from './container-design.types';
export declare class ContainerDesignModel extends ViewDesignerComponentModel<IContainerProperties> implements IViewDesignerComponentModel<IContainerProperties> {
    componentProperties$: Observable<IContainerProperties>;
    hasChildren$: Observable<boolean>;
    static getInitialProperties(initialProperties?: IContainerProperties): IContainerProperties;
    rxInit(): void;
    private validate;
    getPropertiesByName(properties: IContainerProperties): IContainerProperties;
    setContainerLayout(columnSizes: number[]): void;
    private getDefaultColumnSpans;
    private getInspector;
}
