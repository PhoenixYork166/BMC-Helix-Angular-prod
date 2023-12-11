import { Observable } from 'rxjs';
import { RxUserPreferencesService } from '@helix/platform/shared/api';
import { IViewPresetSelectorState, IViewPresetSelectorUserPreferencesApplyResult } from './view-preset-selector.types';
import { RxShareViewPresetService } from './share-view-preset/share-view-preset.service';
import * as i0 from "@angular/core";
export declare class RxViewPresetSelectorUserPreferencesService {
    private rxUserPreferencesService;
    private rxShareViewPresetService;
    private viewPresetSelectorGuid;
    constructor(rxUserPreferencesService: RxUserPreferencesService, rxShareViewPresetService: RxShareViewPresetService);
    save(viewPresetSelectorState: IViewPresetSelectorState): Observable<any>;
    applyUserPreferences(viewPresetSelectorGuid: string, viewPresetSelectorState: IViewPresetSelectorState): Observable<IViewPresetSelectorUserPreferencesApplyResult>;
    private get;
    private checkSharedViewPresets;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewPresetSelectorUserPreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewPresetSelectorUserPreferencesService>;
}
