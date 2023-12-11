import { Observable } from 'rxjs';
import { IRuntimeViewOutputParameter } from './runtime-view-output-parameter.interface';
export interface IRuntimeViewApi {
    save(closeViewAfterSave?: boolean): Observable<never>;
    close(): Observable<IRuntimeViewOutputParameter>;
    cancel(): Observable<never>;
    refresh(): Observable<never>;
    canClose(): boolean;
    applyViewPreset(viewPresetSelectorGuid: string, viewPresetGuid: string): Observable<never>;
    deleteViewPreset(viewPresetGuid: string): Observable<never>;
    discardViewPresetChanges(viewPresetGuid: string): Observable<never>;
    saveViewPreset(viewPresetGuid: string): Observable<never>;
}
