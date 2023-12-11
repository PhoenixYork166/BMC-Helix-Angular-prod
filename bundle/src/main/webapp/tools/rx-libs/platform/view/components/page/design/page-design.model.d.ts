import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
export declare class PageDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
    private rxViewComponentRegistryService;
    componentName$: import("rxjs").Observable<string>;
}
