import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxSearchFiltersService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiPath = '/api/com.bmc.dsm.chatbot/comaround';
    }
    getSearchFilters() {
        return this.httpClient
            .get(`${this.apiPath}/search-filters`)
            .pipe(map((items) => ({ data: items, totalSize: items.length })));
    }
    deleteSearchFilters(ids) {
        return forkJoin(ids.map((id) => this.httpClient.delete(`${this.apiPath}/search-filters/${id}`)));
    }
    createSearchFilter(filter) {
        return this.httpClient.post(`${this.apiPath}/search-filters`, filter);
    }
    updateSearchFilter(filter) {
        return this.httpClient.put(`${this.apiPath}/search-filters`, filter);
    }
    getTags() {
        return this.httpClient.get(`${this.apiPath}/api/tags`);
    }
}
RxSearchFiltersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchFiltersService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxSearchFiltersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchFiltersService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchFiltersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=search-filters.service.js.map