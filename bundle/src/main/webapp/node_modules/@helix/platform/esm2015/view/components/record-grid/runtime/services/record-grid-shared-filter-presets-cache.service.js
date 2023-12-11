import { Injectable } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { map as _map } from 'lodash';
import { map } from 'rxjs/operators';
import { RX_RECORD_GRID } from '../../record-grid.constant';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
export class RxRecordGridSharedFilterPresetsCacheService {
    constructor(rxRecordInstanceDataPageService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.cache = {};
    }
    // return preset from "Record Grid Filter Presets"
    getSharedFilterPresets(recordGridGuid) {
        if (!this.cache[recordGridGuid]) {
            const params = this.getQueryParams(recordGridGuid);
            return this.rxRecordInstanceDataPageService.post({ params }).pipe(map((sharedFilterPresets) => {
                return (this.cache[recordGridGuid] = _map(sharedFilterPresets.data, (sharedFilterPreset) => ({
                    id: sharedFilterPreset[RX_RECORD_DEFINITION.coreFieldIds.id],
                    name: sharedFilterPreset[RX_RECORD_GRID.sharedFilterPresets.fields.name],
                    filters: [
                        {
                            filterOptionId: RX_RECORD_GRID.externalPresetFilterOptionId,
                            value: sharedFilterPreset[RX_RECORD_DEFINITION.coreFieldIds.id]
                        }
                    ],
                    isCreatedByOtherUsers: true,
                    filterExpression: sharedFilterPreset[RX_RECORD_GRID.sharedFilterPresets.fields.filterExpression],
                    isDefault: sharedFilterPreset[RX_RECORD_GRID.sharedFilterPresets.fields.isDefault]
                })));
            }));
        }
        return of(this.cache[recordGridGuid]);
    }
    getQueryParams(recordGridGuid) {
        const queryExpression = `('${RX_RECORD_GRID.sharedFilterPresets.fields.recordGridGuid}'="${recordGridGuid}")`;
        const propertySelection = [
            RX_RECORD_DEFINITION.coreFieldIds.id,
            RX_RECORD_GRID.sharedFilterPresets.fields.name,
            RX_RECORD_GRID.sharedFilterPresets.fields.filterExpression,
            RX_RECORD_GRID.sharedFilterPresets.fields.isDefault
        ].join(',');
        const sortBy = [
            RX_RECORD_GRID.sharedFilterPresets.fields.sortOrder,
            RX_RECORD_GRID.sharedFilterPresets.fields.name
        ].join(',');
        return {
            pageSize: -1,
            startIndex: 0,
            queryExpression: queryExpression,
            propertySelection: propertySelection,
            shouldIncludeTotalSize: false,
            recorddefinition: RX_RECORD_GRID.sharedFilterPresets.recordDefinitionName,
            sortBy
        };
    }
}
RxRecordGridSharedFilterPresetsCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridSharedFilterPresetsCacheService, deps: [{ token: i1.RxRecordInstanceDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRecordGridSharedFilterPresetsCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridSharedFilterPresetsCacheService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRecordGridSharedFilterPresetsCacheService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }]; } });
//# sourceMappingURL=record-grid-shared-filter-presets-cache.service.js.map