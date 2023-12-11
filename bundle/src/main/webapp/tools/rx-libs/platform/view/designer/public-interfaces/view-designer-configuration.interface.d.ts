import { IViewComponentDescriptor } from '@helix/platform/view/api';
export interface IViewDesignerConfiguration {
    bundleId: string;
    viewDefinitionName?: string;
    layoutTemplate?: number;
    paletteComponentsPredicate?: (descriptor: IViewComponentDescriptor) => boolean;
    disablePreview?: boolean;
}
