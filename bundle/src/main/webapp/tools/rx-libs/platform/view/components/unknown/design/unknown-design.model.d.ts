import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
export declare class UnknownDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
    label: string;
    rxInit(): void;
    private getInspector;
}
