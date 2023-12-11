import { NgZone, OnDestroy } from '@angular/core';
import { RxAngularApplicationService, RxCommandFactoryService, RxCurrentUserService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxViewDefinitionCacheService } from '@helix/platform/view/api';
import { Observable } from 'rxjs';
import { RxUserMessageDataPageService } from './user-message-data-page.service';
import { IRxMessage, IRxMessages } from './user-message.interfaces';
import * as i0 from "@angular/core";
export declare class RxUserMessageService implements OnDestroy {
    private rxCommandFactoryService;
    private rxCurrentUserService;
    private rxUserMessageDataPageService;
    private rxViewDefinitionCacheService;
    private rxLogService;
    private rxAngularApplicationService;
    private rxGlobalCacheService;
    private ngZone;
    constructor(rxCommandFactoryService: RxCommandFactoryService, rxCurrentUserService: RxCurrentUserService, rxUserMessageDataPageService: RxUserMessageDataPageService, rxViewDefinitionCacheService: RxViewDefinitionCacheService, rxLogService: RxLogService, rxAngularApplicationService: RxAngularApplicationService, rxGlobalCacheService: RxGlobalCacheService, ngZone: NgZone);
    private subscription;
    private cancelMessagePolling$;
    private userMessagesCommand;
    private messageFetchedSubject;
    private messageCountSubject;
    messageFetched$: Observable<void>;
    messageCount$: Observable<number>;
    private activeMessagesFilterExpression;
    private dismissedMessagesFilterExpression;
    userMessageModel: {
        userMessageDef: {
            definitionName: string;
            dataPageType: string;
            updateStateOfAllUserMessagesCommand: string;
            updateStateOfUserMessagesCommand: string;
            fields: {
                subject: string;
                body: string;
                recipient: string;
            };
            status: {
                unread: string;
                read: string;
                dismissed: string;
            };
        };
        pageSize: number;
        messages: {
            active: {
                type: string;
                count: number;
                list: any[];
                queryExpr: string;
                loadingInProgress: boolean;
            };
            dismissed: {
                type: string;
                count: number;
                list: any[];
                queryExpr: string;
                loadingInProgress: boolean;
            };
        };
    };
    private bodyFieldId;
    private convertLineBreaks;
    private updateDsmApplicationViewUrls;
    cancelMessagePolling(): void;
    launchMessagePolling(): void;
    getMessages(type?: string, getMore?: boolean, suppressTokenRefresh?: boolean): Observable<IRxMessages>;
    handleSuccessfulDismiss(messageDismissed?: IRxMessage): void;
    dismissNotification(message?: IRxMessage): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserMessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUserMessageService>;
}
