import { ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IImageProperties } from './image-design.types';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
export declare class ImageDesignModel extends ViewDesignerComponentModel<IImageProperties> implements IViewDesignerComponentModel<IImageProperties> {
    private recordDefinitionName$;
    private attachmentFields$;
    private rxModalService;
    private rxRecordDefinitionCacheService;
    private maxWidthUnits;
    static getInitialProperties(initialProperties?: IImageProperties): IImageProperties;
    rxInit(): void;
    private getAttachmentFieldsFromRecordDefinition;
    private getInspector;
    private validateEmptyProp;
    private validateMaxWidth;
}
