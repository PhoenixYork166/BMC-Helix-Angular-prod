import { Injectable } from '@angular/core';
import { RecordGridNamedFilterOptionKey } from '@helix/platform/view/api';
import { RxRecordGridFilterHelperService } from '@helix/platform/view/components';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/view/components";
export class RxApplyGridFilterViewActionDefinitionAdapterService {
    constructor(rxJsonParserService, rxRecordGridFilterHelperService) {
        this.rxJsonParserService = rxJsonParserService;
        this.rxRecordGridFilterHelperService = rxRecordGridFilterHelperService;
    }
    adaptDefinition({ componentDefinitions, propertiesByName }) {
        const recordGridFilters = componentDefinitions.map((definition) => {
            let value = definition.propertiesByName.value;
            const parsedValue = this.rxJsonParserService.tryParseJson(value);
            if (parsedValue && parsedValue[RecordGridNamedFilterOptionKey]) {
                value = parsedValue;
            }
            return {
                guid: definition.guid,
                fieldId: definition.propertiesByName.fieldId,
                value
            };
        });
        // @ts-ignore - converting type
        propertiesByName.filters = this.rxRecordGridFilterHelperService.getRecordGridFilterDataFromPredefinedFilter(propertiesByName.filters, recordGridFilters);
    }
}
RxApplyGridFilterViewActionDefinitionAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, deps: [{ token: i1.RxJsonParserService }, { token: i2.RxRecordGridFilterHelperService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplyGridFilterViewActionDefinitionAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplyGridFilterViewActionDefinitionAdapterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i2.RxRecordGridFilterHelperService }]; } });
//# sourceMappingURL=apply-grid-filter-view-action-definition-adapter.service.js.map