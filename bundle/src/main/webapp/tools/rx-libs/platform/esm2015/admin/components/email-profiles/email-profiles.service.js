import { Injectable } from '@angular/core';
import { RxRecordInstanceService } from '@helix/platform/record/api';
import { map } from 'lodash';
import { forkJoin } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
export class RxEmailProfilesService {
    constructor(rxRecordInstanceService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
    }
    deleteEmailProfiles(recordDefinitionName, recordInstanceIds) {
        return forkJoin(map(recordInstanceIds, (id) => {
            return this.rxRecordInstanceService.delete(recordDefinitionName, id);
        }));
    }
}
RxEmailProfilesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEmailProfilesService, deps: [{ token: i1.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
RxEmailProfilesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEmailProfilesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxEmailProfilesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceService }]; } });
//# sourceMappingURL=email-profiles.service.js.map