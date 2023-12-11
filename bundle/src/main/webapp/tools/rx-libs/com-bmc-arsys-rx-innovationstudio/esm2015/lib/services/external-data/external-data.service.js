import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { remove } from 'lodash';
import { map, switchMap } from 'rxjs/operators';
import { RxDocumentDefinitionDataPageService } from '@helix/platform/document/api';
import { RxSessionExpirationService } from '@helix/platform/shared/api';
import { RxWebApiDefinitionDataPageService } from '@helix/platform/web-api/api';
import { RxDataSourceDataPageService } from './data-source-data-page.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./data-source-data-page.service";
import * as i3 from "@helix/platform/document/api";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/web-api/api";
export class RxExternalDataService {
    constructor(httpClient, rxDataSourceDataPageService, rxDocumentDefinitionDataPageService, rxSessionExpirationService, rxWebApiDefinitionDataPageService) {
        this.httpClient = httpClient;
        this.rxDataSourceDataPageService = rxDataSourceDataPageService;
        this.rxDocumentDefinitionDataPageService = rxDocumentDefinitionDataPageService;
        this.rxSessionExpirationService = rxSessionExpirationService;
        this.rxWebApiDefinitionDataPageService = rxWebApiDefinitionDataPageService;
    }
    getArsTables(pageSize, startIndex, dataSourceName, tableName, sortBy = []) {
        const queryParams = {
            pageSize,
            startIndex,
            dataSourceName
        };
        if (tableName.length) {
            Object.assign(queryParams, { tableName });
        }
        if (sortBy.length) {
            Object.assign(queryParams, { sortBy });
        }
        return this.rxDataSourceDataPageService.get({
            params: queryParams
        });
    }
    getArsTableDefinition(dataSourceName, tableName) {
        return this.httpClient.get(`/api/rx/application/datasource/table/${dataSourceName}/${tableName}`);
    }
    getDataSourceNames(dataSourceType) {
        return this.httpClient.get(`/api/rx/application/datasource/type/${dataSourceType}`);
    }
    getDataSourceTypes() {
        return this.httpClient.get('/api/rx/application/datasource/type');
    }
    getWebApiDefinitions() {
        return this.rxSessionExpirationService
            .keepSessionAlive()
            .pipe(switchMap(() => this.rxWebApiDefinitionDataPageService.get()));
    }
    getWebApiDocuments(webApiRequestDefinitions) {
        return this.rxDocumentDefinitionDataPageService.get().pipe(map((documentDefinitions) => {
            remove(documentDefinitions.data, (document) => !webApiRequestDefinitions[document.name]);
            documentDefinitions.totalSize = documentDefinitions.data.length;
            return documentDefinitions;
        }));
    }
}
/** @nocollapse */ RxExternalDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService, deps: [{ token: i1.HttpClient }, { token: i2.RxDataSourceDataPageService }, { token: i3.RxDocumentDefinitionDataPageService }, { token: i4.RxSessionExpirationService }, { token: i5.RxWebApiDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ RxExternalDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExternalDataService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxDataSourceDataPageService }, { type: i3.RxDocumentDefinitionDataPageService }, { type: i4.RxSessionExpirationService }, { type: i5.RxWebApiDefinitionDataPageService }]; } });
//# sourceMappingURL=external-data.service.js.map