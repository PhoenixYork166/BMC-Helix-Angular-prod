import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { RxShareViewPresetDataService } from './share-view-preset-data.service';
import { RxJsonParserService, RxStringService } from '@helix/platform/utils';
import { RX_VIEW_PRESET } from '../../view-preset-selector.types';
import { RxCurrentUserService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "./share-view-preset-data.service";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
export class RxShareViewPresetService {
    constructor(rxShareViewPresetDataService, rxStringService, rxJsonParserService, rxCurrentUserService) {
        this.rxShareViewPresetDataService = rxShareViewPresetDataService;
        this.rxStringService = rxStringService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxCurrentUserService = rxCurrentUserService;
    }
    getAutocompleteSearch(text$) {
        return text$.pipe(debounceTime(250), distinctUntilChanged(), switchMap((searchTerm) => {
            const trimmedValue = searchTerm.trim();
            if (trimmedValue.length > 0) {
                return this.rxShareViewPresetDataService.searchUsers(trimmedValue);
            }
            else {
                return of([]);
            }
        }), map((users) => users.map((user) => ({
            text: user[RX_VIEW_PRESET.user.fields.fullName],
            data: {
                loginId: user[RX_VIEW_PRESET.user.fields.loginId],
                fullName: user[RX_VIEW_PRESET.user.fields.fullName],
                emailAddress: user[RX_VIEW_PRESET.user.fields.email]
            }
        }))));
    }
    getSharedViewPresetUsers(guid) {
        return this.rxShareViewPresetDataService
            .getSharedViewPreset(guid)
            .pipe(map((sharedViewPreset) => this.rxJsonParserService.tryParseJson(sharedViewPreset === null || sharedViewPreset === void 0 ? void 0 : sharedViewPreset.fieldInstances[RX_VIEW_PRESET.sharedViewPreset.fields.sharedUsers].value, [])));
    }
    getSharedViewPresetData(guid) {
        return this.rxShareViewPresetDataService.getSharedViewPreset(guid).pipe(map((sharedViewPreset) => ({
            viewPresetName: sharedViewPreset === null || sharedViewPreset === void 0 ? void 0 : sharedViewPreset.fieldInstances[RX_VIEW_PRESET.sharedViewPreset.fields.viewPresetName].value,
            sharedViewPresets: this.rxJsonParserService.tryParseJson(sharedViewPreset === null || sharedViewPreset === void 0 ? void 0 : sharedViewPreset.fieldInstances[RX_VIEW_PRESET.sharedViewPreset.fields.viewPresetInfo].value, null)
        })));
    }
    createUpdateSharedViewPreset(payload, presetGuid) {
        if (presetGuid) {
            return this.rxShareViewPresetDataService.updateSharedViewPreset(presetGuid, payload).pipe(map(() => presetGuid));
        }
        else {
            return this.rxShareViewPresetDataService.createSharedViewPreset(payload);
        }
    }
    saveSharedViewPreset(data, presetGuid) {
        const sharedUsers$ = data.sharedUsers ? of(data.sharedUsers) : this.getSharedViewPresetUsers(presetGuid);
        return combineLatest([data.runtimeViewModelApi.shareViewPreset(data.presetSelectorGuid), sharedUsers$]).pipe(map(([sharedViewPresets, sharedUsers]) => ({
            viewPresetName: data.currentViewPreset.label,
            viewName: '',
            viewPresetGuid: data.presetSelectorGuid,
            submitter: this.rxCurrentUserService.get().fullName,
            sharedUsers,
            presetInformation: JSON.stringify(sharedViewPresets)
        })), switchMap((payload) => this.createUpdateSharedViewPreset(payload, presetGuid)));
    }
    deleteSharedViewPreset(sharedViewPresetInstanceGuid) {
        return this.rxShareViewPresetDataService.deleteSharedViewPreset(sharedViewPresetInstanceGuid);
    }
    getSharedViewPresetsForCurrentUser(presetSelectorGuid) {
        return this.rxShareViewPresetDataService
            .getSharedViewPresets(presetSelectorGuid, this.rxCurrentUserService.getName())
            .pipe(map((presets) => presets.map((preset) => ({
            label: preset[RX_VIEW_PRESET.sharedViewPreset.fields.viewPresetName],
            guid: preset[RX_VIEW_PRESET.sharedViewPreset.fields.id],
            ownerFullName: preset[RX_VIEW_PRESET.sharedViewPreset.fields.ownerFullName]
        }))));
    }
}
RxShareViewPresetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetService, deps: [{ token: i1.RxShareViewPresetDataService }, { token: i2.RxStringService }, { token: i2.RxJsonParserService }, { token: i3.RxCurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShareViewPresetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxShareViewPresetDataService }, { type: i2.RxStringService }, { type: i2.RxJsonParserService }, { type: i3.RxCurrentUserService }]; } });
//# sourceMappingURL=share-view-preset.service.js.map