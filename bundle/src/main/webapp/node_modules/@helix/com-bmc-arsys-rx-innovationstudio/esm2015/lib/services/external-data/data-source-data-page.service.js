import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
const dataSourceDataPageQuery = 'com.bmc.arsys.rx.application.datasource.datapage.DataSourceDataPageQuery';
export class RxDataSourceDataPageService extends DataPage {
    constructor(injector) {
        super(injector, dataSourceDataPageQuery);
        this.injector = injector;
    }
}
/** @nocollapse */ RxDataSourceDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxDataSourceDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataSourceDataPageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data-source-data-page.service.js.map