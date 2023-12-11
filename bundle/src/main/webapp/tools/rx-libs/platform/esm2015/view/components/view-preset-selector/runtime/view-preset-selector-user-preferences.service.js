import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { find, pick } from 'lodash';
import { RxUserPreferencesService } from '@helix/platform/shared/api';
import { RxViewComponentType } from '@helix/platform/view/api';
import { RxShareViewPresetService } from './share-view-preset/share-view-preset.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./share-view-preset/share-view-preset.service";
export class RxViewPresetSelectorUserPreferencesService {
    constructor(rxUserPreferencesService, rxShareViewPresetService) {
        this.rxUserPreferencesService = rxUserPreferencesService;
        this.rxShareViewPresetService = rxShareViewPresetService;
    }
    save(viewPresetSelectorState) {
        const customViewPresets = viewPresetSelectorState.customViewPresetOptions.map((customViewPresetOption) => pick(customViewPresetOption, ['guid', 'label', 'userSharedViewPresetGuid']));
        const sharedViewPresets = viewPresetSelectorState.sharedViewPresetOptions.map((sharedViewPresetOption) => pick(sharedViewPresetOption, ['guid', 'label']));
        const data = {
            preferences: JSON.stringify({
                customViewPresets,
                sharedViewPresets,
                viewPresetGuid: viewPresetSelectorState.appliedViewPresetOption.guid
            }),
            componentTypeName: RxViewComponentType.ViewPresetSelector,
            version: '1.0',
            componentId: this.viewPresetSelectorGuid
        };
        return this.rxUserPreferencesService.setUiComponentPreferences(data, this.viewPresetSelectorGuid);
    }
    applyUserPreferences(viewPresetSelectorGuid, viewPresetSelectorState) {
        this.viewPresetSelectorGuid = viewPresetSelectorGuid;
        return this.get(viewPresetSelectorGuid).pipe(map((preferences) => {
            viewPresetSelectorState.customViewPresetOptions = preferences.customViewPresets;
            if (preferences.sharedViewPresets) {
                viewPresetSelectorState.sharedViewPresetOptions = preferences.sharedViewPresets.map((preset) => (Object.assign(Object.assign({}, preset), { isShared: true })));
            }
            viewPresetSelectorState.appliedViewPresetOption =
                find(viewPresetSelectorState.customViewPresetOptions, { guid: preferences.viewPresetGuid }) ||
                    find(viewPresetSelectorState.systemViewPresetOptions, { guid: preferences.viewPresetGuid }) ||
                    find(viewPresetSelectorState.sharedViewPresetOptions, { guid: preferences.viewPresetGuid }) ||
                    viewPresetSelectorState.systemViewPresetOptions[0];
            return viewPresetSelectorState;
        }), switchMap((state) => this.checkSharedViewPresets(state)));
    }
    get(guid) {
        return this.rxUserPreferencesService.getUiComponentPreferences(guid).pipe(map((preferences) => preferences !== null && preferences !== void 0 ? preferences : {
            customViewPresets: [],
            sharedViewPresets: [],
            viewPresetGuid: null
        }));
    }
    checkSharedViewPresets(state) {
        if (state.sharedViewPresetOptions.length) {
            return this.rxShareViewPresetService.getSharedViewPresetsForCurrentUser(this.viewPresetSelectorGuid).pipe(map((sharedPresets) => {
                let shouldUpdatePreferences = false;
                let removedPresetGuid = null;
                // checking if already added shared presets are still available
                // and updating preset names in case of renaming
                state.sharedViewPresetOptions = state.sharedViewPresetOptions.reduce((result, presetOption) => {
                    const existingPreset = sharedPresets.find((sharedPreset) => sharedPreset.guid === presetOption.guid);
                    if (existingPreset) {
                        if (presetOption.label !== existingPreset.label) {
                            presetOption.label = existingPreset.label;
                            shouldUpdatePreferences = true;
                        }
                        result.push(presetOption);
                    }
                    else {
                        shouldUpdatePreferences = true;
                    }
                    return result;
                }, []);
                // checking if current selected preset is still available
                // and if not - switching to first system preset
                if (state.appliedViewPresetOption.isShared) {
                    const isOptionStillAvailable = state.sharedViewPresetOptions.find((option) => option.guid === state.appliedViewPresetOption.guid);
                    // if preset it not available anymore or sharing was disabled
                    if (!isOptionStillAvailable || !state.isSharingEnabled) {
                        if (!isOptionStillAvailable) {
                            removedPresetGuid = state.appliedViewPresetOption.guid;
                        }
                        state.appliedViewPresetOption = state.systemViewPresetOptions[0];
                    }
                }
                return { state, shouldUpdatePreferences, removedPresetGuid };
            }));
        }
        else {
            return of({ state, shouldUpdatePreferences: false, removedPresetGuid: null });
        }
    }
}
RxViewPresetSelectorUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewPresetSelectorUserPreferencesService, deps: [{ token: i1.RxUserPreferencesService }, { token: i2.RxShareViewPresetService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewPresetSelectorUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewPresetSelectorUserPreferencesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewPresetSelectorUserPreferencesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxUserPreferencesService }, { type: i2.RxShareViewPresetService }]; } });
//# sourceMappingURL=view-preset-selector-user-preferences.service.js.map