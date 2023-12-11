import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RxApprovalNotificationsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.approvalNotificationApi = '/api/com.bmc.arsys.rx.approval/rx/application/approval/configuration/notification';
    }
    getApprovalNotification(notificationRecordInstanceId) {
        return this.httpClient.get(`${this.approvalNotificationApi}/${notificationRecordInstanceId}`);
    }
    createApprovalNotification(approvalNotificationRecord) {
        return this.httpClient.post(this.approvalNotificationApi, approvalNotificationRecord);
    }
    updateApprovalNotification(approvalNotificationRecord) {
        return this.httpClient.put(`${this.approvalNotificationApi}/${approvalNotificationRecord.notificationGuid}`, approvalNotificationRecord);
    }
    deleteApprovalNotifications(recordInstanceIds) {
        return forkJoin(map(recordInstanceIds, (id) => {
            return this.httpClient.delete(`${this.approvalNotificationApi}/${id}`);
        }));
    }
}
RxApprovalNotificationsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalNotificationsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
RxApprovalNotificationsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalNotificationsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApprovalNotificationsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=approval-notifications.service.js.map