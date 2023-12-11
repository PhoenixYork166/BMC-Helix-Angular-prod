import { IViewInputParams, IViewPresetsByViewComponentGuid } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { IRuntimeViewOutputParameter } from './interfaces/index';
import { RuntimeViewModel } from './runtime-view.model';
import * as i0 from "@angular/core";
export declare class RuntimeViewModelApi {
    private runtimeViewModel;
    clear(): void;
    init(model: RuntimeViewModel): void;
    triggerViewActions(guid: string, eventName: string): Promise<void>;
    cancel(skipDirtyCheck?: boolean): Observable<never>;
    close(): Observable<IRuntimeViewOutputParameter>;
    getViewInputParameters(): IViewInputParams;
    applyViewPreset(viewPresetSelectorGuid: string, viewPresetGuid: string, sharedViewPresets?: IViewPresetsByViewComponentGuid): Observable<never>;
    deleteViewPreset(viewPresetGuid: string): Observable<never>;
    discardViewPresetChanges(viewPresetGuid: string, sharedViewPresets?: IViewPresetsByViewComponentGuid): Observable<never>;
    saveViewPreset(viewPresetGuid: string): Observable<never>;
    shareViewPreset(viewPresetSelectorGuid: string): Observable<IViewPresetsByViewComponentGuid>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewModelApi, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RuntimeViewModelApi>;
}
