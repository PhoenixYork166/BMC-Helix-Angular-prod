import { Observable } from 'rxjs';
import { IPlainObject } from '@helix/platform/shared/api';
export interface IViewPresetApi {
    applyViewPreset: (viewPresetSelectorGuid: string, viewPresetGuid: string, sharedViewPresets?: IViewPresetsByViewComponentGuid) => void;
    deleteViewPreset: (viewPresetGuid: string) => void;
    discardViewPresetChanges: (viewPresetGuid: string, sharedViewPresets?: IViewPresetsByViewComponentGuid) => void;
    saveViewPreset: (viewPresetGuid: string) => void;
    shareViewPreset?: (viewPresetSelectorGuid: string) => Observable<any>;
}
export interface IViewPresetsByViewComponentGuid<T = IPlainObject> {
    [viewComponentGuid: string]: T;
}
