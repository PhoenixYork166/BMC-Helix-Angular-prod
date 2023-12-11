import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApprovalNotification } from './approval-notifications.types';
import * as i0 from "@angular/core";
export declare class RxApprovalNotificationsService {
    private httpClient;
    approvalNotificationApi: string;
    constructor(httpClient: HttpClient);
    getApprovalNotification(notificationRecordInstanceId: string): Observable<IApprovalNotification>;
    createApprovalNotification(approvalNotificationRecord: IApprovalNotification): Observable<any>;
    updateApprovalNotification(approvalNotificationRecord: IApprovalNotification): Observable<any>;
    deleteApprovalNotifications(recordInstanceIds: string[]): Observable<any[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApprovalNotificationsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApprovalNotificationsService>;
}
