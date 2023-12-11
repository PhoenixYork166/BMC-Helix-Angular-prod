import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxServerErrorHandlerService } from '../../error-handling';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/utils";
import * as i3 from "../../error-handling";
export class RxSmartReportingService {
    constructor(httpClient, rxJsonParserService, rxServerErrorHandlerService) {
        this.httpClient = httpClient;
        this.rxJsonParserService = rxJsonParserService;
        this.rxServerErrorHandlerService = rxServerErrorHandlerService;
        this.smartReportingUrl$ = this._getSmartReportingUrl().pipe(catchError((error) => {
            this.rxServerErrorHandlerService.handle(error);
            return of('');
        }), shareReplay(1));
    }
    // We have to open a blank tab and then or change its url or close it.
    // Sadly there is no other way around it (even forcing a click on a button for example).
    // https://tech.europace.de/how-to-open-async-calls-in-a-new-tab-instead-of-new-window-within-an-angularjs-app/
    openSmartReporting(target = '_blank', queryParams = {}) {
        const smartReportingPopup = window.open('', target);
        return this._getSmartReportingUrl(queryParams).pipe(map((smartReportingUrl) => {
            smartReportingPopup.location.href = smartReportingUrl;
            return true;
        }), catchError((errorResponse) => {
            smartReportingPopup.close();
            if (errorResponse.error === '[]') {
                return of(false);
            }
            throw errorResponse;
        }));
    }
    getSmartReportingUrl() {
        return this.smartReportingUrl$;
    }
    _getSmartReportingUrl(queryParams = {}) {
        return this.httpClient
            .get('/api/rx/application/smartreporting/url', {
            responseType: 'text',
            params: queryParams
        })
            .pipe(map((url) => decodeURIComponent(url)));
    }
}
RxSmartReportingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, deps: [{ token: i1.HttpClient }, { token: i2.RxJsonParserService }, { token: i3.RxServerErrorHandlerService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSmartReportingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSmartReportingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxJsonParserService }, { type: i3.RxServerErrorHandlerService }]; } });
//# sourceMappingURL=smart-reporting.service.js.map