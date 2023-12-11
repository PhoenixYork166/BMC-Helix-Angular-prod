import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { chain, isEmpty } from 'lodash';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { RxFileService } from '@helix/platform/utils';
import { AX_BUNDLE_DEPLOYMENT } from './bundle-deployment.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/utils";
export class AxBundleDeploymentService {
    constructor(httpClient, ngZone, translateService, rxFileService) {
        this.httpClient = httpClient;
        this.ngZone = ngZone;
        this.translateService = translateService;
        this.rxFileService = rxFileService;
        this.createBundleUrl = '/api/rx/application/bundle/bundledescriptor/';
        this.deployBundleUrl = '/api/rx/application/bundle/deploymentpackage/';
        this.deploymentStatusUrl = '/api/rx/application/bundle/deploymentstatus';
        this.cancelPolling$ = new Subject();
    }
    create(bundleDescriptor) {
        return this.httpClient.post(this.createBundleUrl, bundleDescriptor, { observe: 'response' });
    }
    downloadContentPackage(bundleId, packageId) {
        return this.httpClient
            .get(`${this.deployBundleUrl}${bundleId}/${packageId}`, { responseType: 'arraybuffer', observe: 'response' })
            .pipe(tap((fileStream) => {
            const arrayBufferView = new Uint8Array(fileStream.body);
            const file = new Blob([arrayBufferView], {
                type: fileStream.headers.get('content-type')
            });
            const fileName = this.rxFileService.extractFileName(fileStream);
            this.ngZone.runOutsideAngular(() => {
                saveAs(file, fileName);
            });
        }));
    }
    download(bundleId, packageId) {
        return this.httpClient.get(this.deployBundleUrl + `${bundleId}/${packageId}`, {
            observe: 'response',
            responseType: 'arraybuffer'
        });
    }
    install(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'INSTALL' }),
            observe: 'response'
        });
    }
    reinstall(bundleId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'INSTALL', 'Reinstall-To-Bundle-Id': bundleId }),
            observe: 'response'
        });
    }
    update(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({ 'Expect-Package-Type': 'UPDATE' }),
            observe: 'response'
        });
    }
    import(bundleId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.httpClient.post(this.deployBundleUrl, formData, {
            headers: new HttpHeaders({
                'Expect-Package-Type': 'EXPORT',
                'Reinstall-To-Bundle-Id': bundleId
            }),
            observe: 'response'
        });
    }
    uninstall(bundleId) {
        return this.httpClient.delete(this.deployBundleUrl + `${bundleId}`, {
            observe: 'response'
        });
    }
    buildStatusMessage(deploymentParsedStatus) {
        const newLine = '\n';
        const errorMessages = !isEmpty(deploymentParsedStatus.errorMessages)
            ? chain(deploymentParsedStatus.errorMessages)
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.errors.label'))
                .join(newLine)
                .value()
            : '';
        const definitionImportStatusMessages = !isEmpty(deploymentParsedStatus.definitionsStatusContent)
            ? chain(deploymentParsedStatus.definitionsStatusContent)
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.definition.status.messages.label'))
                .join(newLine)
                .value()
            : '';
        const tenantDataImportStatusMessages = !isEmpty(deploymentParsedStatus.tenantDataStatusContent)
            ? Object.keys(deploymentParsedStatus.tenantDataStatusContent).map((key) => chain(deploymentParsedStatus.tenantDataStatusContent[key])
                .unshift(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.data.status.messages.label', {
                tenant: key
            }))
                .join(newLine)
                .value())
            : [];
        return chain(tenantDataImportStatusMessages)
            .unshift(errorMessages, definitionImportStatusMessages)
            .compact()
            .join(newLine + newLine)
            .value();
    }
    pollDeploymentStatus(guid, customDeploymentStatusUrl) {
        return timer(0, AX_BUNDLE_DEPLOYMENT.deploymentStatusPollInterval)
            .pipe(takeUntil(this.cancelPolling$), switchMap(() => this.httpClient.get((customDeploymentStatusUrl || this.deploymentStatusUrl) + `/${guid}`)), tap((deploymentStatus) => {
            if (AX_BUNDLE_DEPLOYMENT.deploymentStatuses.failed.includes(deploymentStatus.packageDeployStatus) ||
                AX_BUNDLE_DEPLOYMENT.deploymentStatuses.failed.includes(deploymentStatus.packageExportStatus)) {
                this.cancelPolling$.next();
                deploymentStatus.errorMessage = this.buildStatusMessage(deploymentStatus.deploymentParsedStatus);
            }
            else if (AX_BUNDLE_DEPLOYMENT.deploymentStatuses.succeeded.includes(deploymentStatus.packageDeployStatus) ||
                AX_BUNDLE_DEPLOYMENT.deploymentStatuses.succeeded.includes(deploymentStatus.packageExportStatus)) {
                this.cancelPolling$.next();
                deploymentStatus.isFinished = true;
            }
        }));
    }
}
/** @nocollapse */ AxBundleDeploymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, deps: [{ token: i1.HttpClient }, { token: i0.NgZone }, { token: i2.TranslateService }, { token: i3.RxFileService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ AxBundleDeploymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AxBundleDeploymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i0.NgZone }, { type: i2.TranslateService }, { type: i3.RxFileService }]; } });
//# sourceMappingURL=bundle-deployment.service.js.map