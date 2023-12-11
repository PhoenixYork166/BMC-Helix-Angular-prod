import { IOverlayDescriptor } from '../overlay/overlay.types';
export interface ICustomizationOptions {
    allowOverlay?: boolean;
    definitionTypeDisplayName: string;
    scope?: string;
    isDisabled: boolean;
    overlayGroupId?: string;
    overlayDescriptor?: IOverlayDescriptor;
}
export interface ICustomizationControlValue {
    allowOverlay: boolean;
    scope: string;
}
export interface IScopeSelectionOption {
    id: string;
    name: string;
}
export interface ICustomizationOptionsEditorData {
    definitionScopeName: string;
    definitionTypeDisplayName: string;
    allowOverlay: boolean;
    isDisabled: boolean;
    scopeSelectionOptions: IScopeSelectionOption[];
    overlayOperation: string;
}
