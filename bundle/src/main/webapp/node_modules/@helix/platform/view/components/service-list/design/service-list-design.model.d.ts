import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IServiceListProperties } from '../service-list.types';
export declare class ServiceListDesignModel extends ViewDesignerComponentModel<IServiceListProperties> {
    static getInitialProperties(initialProperties?: IServiceListProperties): IServiceListProperties;
    rxInit(): void;
    private getCommonProps;
    private getInspector;
}
