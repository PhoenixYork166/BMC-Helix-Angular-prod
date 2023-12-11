import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { RX_DATA_PAGE } from './data-page.constant';
const DATA_PAGE_API_URL = '/api/rx/application/datapage';
export class DataPage {
    constructor(injector, dataPageType, defaultDataPageRequestConfiguration = {}) {
        this.requiredRequestParams = {
            pageSize: -1,
            startIndex: 0
        };
        this.http = injector.get(HttpClient);
        this.dataPageType = dataPageType;
        this.configuration = defaultDataPageRequestConfiguration;
    }
    get(dataPageRequestConfiguration = {}) {
        const requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
        const requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
        let params = new HttpParams().set('dataPageType', this.dataPageType);
        Object.keys(requestParams).forEach((name) => {
            params = params.set(name, String(requestParams[name]));
        });
        return this.http.get(DATA_PAGE_API_URL, {
            headers: new HttpHeaders(requestHeaders),
            params
        });
    }
    getEmptyDataPage() {
        return of(RX_DATA_PAGE.emptyDataPage);
    }
    post(dataPageRequestConfiguration = {}) {
        const requestParams = Object.assign(Object.assign(Object.assign({}, this.requiredRequestParams), this.configuration.params), dataPageRequestConfiguration.params);
        const requestHeaders = Object.assign(Object.assign({}, this.configuration.headers), dataPageRequestConfiguration.headers);
        const requestBody = { values: { dataPageType: this.dataPageType } };
        Object.keys(requestParams).forEach((name) => {
            requestBody.values[name] = String(requestParams[name]);
        });
        return this.http.post(DATA_PAGE_API_URL, requestBody, {
            headers: new HttpHeaders(requestHeaders)
        });
    }
}
//# sourceMappingURL=data-page.class.js.map