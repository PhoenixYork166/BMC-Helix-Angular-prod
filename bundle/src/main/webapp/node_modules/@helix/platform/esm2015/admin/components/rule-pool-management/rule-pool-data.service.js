import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RxDataPageFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
export class RxRulePoolDataService {
    constructor(rxDataPageService) {
        this.rxDataPageService = rxDataPageService;
        this.resource = this.rxDataPageService.withType('com.bmc.arsys.rx.application.rule.datapage.RulePoolStatisticsDataPageQuery');
    }
    getRulePoolStatistics() {
        return this.resource.get().pipe(map((dataPageResult) => dataPageResult.data));
    }
}
RxRulePoolDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolDataService, deps: [{ token: i1.RxDataPageFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRulePoolDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRulePoolDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataPageFactoryService }]; } });
//# sourceMappingURL=rule-pool-data.service.js.map