import { IOverlayDescriptor } from '@helix/platform/shared/api';
export interface IRevertCustomizationOptions {
    allowOverlay?: boolean;
    scope?: string;
    overlayGroupId: string;
    overlayDescriptor: IOverlayDescriptor;
}
