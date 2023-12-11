import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IRichTextProperties } from './rich-text-design.types';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
export declare class RichTextDesignModel extends ViewDesignerComponentModel<IRichTextProperties> implements IViewDesignerComponentModel<IRichTextProperties> {
    html$: import("rxjs").Observable<string>;
    static getInitialProperties(initialProperties: IRichTextProperties): IRichTextProperties;
    rxInit(): void;
    private getInspector;
    updateComponentProperties(props: Partial<IRichTextProperties>): void;
}
