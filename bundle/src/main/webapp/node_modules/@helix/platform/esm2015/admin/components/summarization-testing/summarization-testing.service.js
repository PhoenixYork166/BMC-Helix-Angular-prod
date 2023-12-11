import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@helix/platform/shared/api";
export class RxSummarizationTestingService {
    constructor(httpClient, rxCommandFactoryService) {
        this.httpClient = httpClient;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.textSummarizationCommand = 'com.bmc.arsys.rx.application.cognitive.command.SummarizeTextCommand';
        this.recordSummarizationCommand = 'com.bmc.arsys.rx.application.cognitive.command.SummarizeFromRecInstCommand';
    }
    getTextSummarization(payload) {
        return this.rxCommandFactoryService.forResourceType(this.textSummarizationCommand).execute(payload);
    }
    getRecordInstanceSummarization(payload) {
        return this.rxCommandFactoryService.forResourceType(this.recordSummarizationCommand).execute(payload);
    }
}
RxSummarizationTestingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSummarizationTestingService, deps: [{ token: i1.HttpClient }, { token: i2.RxCommandFactoryService }], target: i0.ɵɵFactoryTarget.Injectable });
RxSummarizationTestingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSummarizationTestingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSummarizationTestingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.RxCommandFactoryService }]; } });
//# sourceMappingURL=summarization-testing.service.js.map