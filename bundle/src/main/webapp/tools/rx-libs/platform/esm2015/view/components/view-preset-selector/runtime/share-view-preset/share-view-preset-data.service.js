import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RX_VIEW_PRESET } from '../../view-preset-selector.types';
import { HttpClient } from '@angular/common/http';
import { RxJsonParserService } from '@helix/platform/utils';
import { RX_DATA_PAGE } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@angular/common/http";
import * as i3 from "@helix/platform/utils";
export class RxShareViewPresetDataService {
    constructor(rxRecordInstanceDataPageService, rxRecordInstanceService, httpClient, rxJsonParserService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.httpClient = httpClient;
        this.rxJsonParserService = rxJsonParserService;
    }
    searchUsers(query) {
        return this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_VIEW_PRESET.user.recordDefinitionName,
                propertySelection: [
                    RX_VIEW_PRESET.user.fields.fullName,
                    RX_VIEW_PRESET.user.fields.email,
                    RX_VIEW_PRESET.user.fields.loginId
                ],
                pageSize: RX_DATA_PAGE.defaultPageSize,
                queryExpression: [
                    RX_VIEW_PRESET.user.fields.fullName,
                    RX_VIEW_PRESET.user.fields.email,
                    RX_VIEW_PRESET.user.fields.loginId
                ]
                    .map((fieldId) => `('${fieldId}' LIKE "%${query}%")`)
                    .join(' OR ')
            }
        })
            .pipe(map((result) => result.data));
    }
    getSharedViewPresets(viewPresetSelectorGuid, loginId) {
        return this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_VIEW_PRESET.sharedViewPreset.recordDefinitionName,
                queryExpression: [
                    `'${RX_VIEW_PRESET.sharedViewPreset.fields.viewPresetSelectorGuid}' = "${viewPresetSelectorGuid}"`
                ].join(' AND '),
                propertySelection: [
                    RX_VIEW_PRESET.sharedViewPreset.fields.viewPresetName,
                    RX_VIEW_PRESET.sharedViewPreset.fields.id,
                    RX_VIEW_PRESET.sharedViewPreset.fields.ownerFullName,
                    RX_VIEW_PRESET.sharedViewPreset.fields.sharedUsers
                ]
            }
        })
            .pipe(map((dataPageResult) => dataPageResult.data.filter((sharedViewPreset) => {
            const users = this.rxJsonParserService.tryParseJson(sharedViewPreset[RX_VIEW_PRESET.sharedViewPreset.fields.sharedUsers], []);
            return users.find((user) => user.loginId === loginId);
        })));
    }
    getSharedViewPreset(guid) {
        return this.rxRecordInstanceService.get(RX_VIEW_PRESET.sharedViewPreset.recordDefinitionName, guid);
    }
    createSharedViewPreset(payload) {
        return this.httpClient.post(this.getUrl(), payload, {
            responseType: 'text'
        });
    }
    updateSharedViewPreset(guid, payload) {
        return this.httpClient.put(this.getUrl(guid), payload);
    }
    deleteSharedViewPreset(guid) {
        return this.rxRecordInstanceService.delete(RX_VIEW_PRESET.sharedViewPreset.recordDefinitionName, guid);
    }
    getUrl(guid) {
        return guid
            ? `/api/rx/application/configuration/viewpreset/${guid}`
            : `/api/rx/application/configuration/viewpreset`;
    }
}
RxShareViewPresetDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetDataService, deps: [{ token: i1.RxRecordInstanceDataPageService }, { token: i1.RxRecordInstanceService }, { token: i2.HttpClient }, { token: i3.RxJsonParserService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShareViewPresetDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShareViewPresetDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }, { type: i1.RxRecordInstanceService }, { type: i2.HttpClient }, { type: i3.RxJsonParserService }]; } });
//# sourceMappingURL=share-view-preset-data.service.js.map