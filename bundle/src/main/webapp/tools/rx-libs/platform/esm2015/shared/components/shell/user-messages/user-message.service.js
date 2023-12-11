import { Injectable, NgZone } from '@angular/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RxAngularApplicationService, RxCommandFactoryService, RxCurrentUserService, RxGlobalCacheService, RxLogService } from '@helix/platform/shared/api';
import { RxViewDefinitionCacheService } from '@helix/platform/view/api';
import { forEach, remove, set } from 'lodash';
import { forkJoin, of, Subject, Subscription, timer } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RxUserMessageDataPageService } from './user-message-data-page.service';
import { RX_USER_MESSAGE } from './user-message.constants';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./user-message-data-page.service";
import * as i3 from "@helix/platform/view/api";
export class RxUserMessageService {
    constructor(rxCommandFactoryService, rxCurrentUserService, rxUserMessageDataPageService, rxViewDefinitionCacheService, rxLogService, rxAngularApplicationService, rxGlobalCacheService, ngZone) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxUserMessageDataPageService = rxUserMessageDataPageService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxLogService = rxLogService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.ngZone = ngZone;
        this.subscription = new Subscription();
        this.cancelMessagePolling$ = new Subject();
        this.messageFetchedSubject = new Subject();
        this.messageCountSubject = new Subject();
        this.messageFetched$ = this.messageFetchedSubject.asObservable();
        this.messageCount$ = this.messageCountSubject.asObservable();
        this.activeMessagesFilterExpression = `'${RX_RECORD_DEFINITION.coreFieldIds.status}'!=${RX_USER_MESSAGE.definitions.userMessage.status.dismissed}`;
        this.dismissedMessagesFilterExpression = `'${RX_RECORD_DEFINITION.coreFieldIds.status}'=${RX_USER_MESSAGE.definitions.userMessage.status.dismissed}`;
        this.userMessageModel = {
            userMessageDef: RX_USER_MESSAGE.definitions.userMessage,
            pageSize: 30,
            messages: {
                active: {
                    type: RX_USER_MESSAGE.messageTypes.active,
                    count: 0,
                    list: [],
                    queryExpr: this.activeMessagesFilterExpression,
                    loadingInProgress: false
                },
                dismissed: {
                    type: RX_USER_MESSAGE.messageTypes.dismissed,
                    count: 0,
                    list: [],
                    queryExpr: this.dismissedMessagesFilterExpression,
                    loadingInProgress: false
                }
            }
        };
        this.bodyFieldId = this.userMessageModel.userMessageDef.fields.body;
    }
    convertLineBreaks(message) {
        const bodyFieldValue = message[this.bodyFieldId];
        message[this.bodyFieldId] = (bodyFieldValue && bodyFieldValue.replace(/\n/g, '<br>')) || '';
    }
    updateDsmApplicationViewUrls(dataPage) {
        if (dataPage.data.length) {
            const messages = dataPage.data.map((message) => {
                this.convertLineBreaks(message);
                const body = message[this.bodyFieldId];
                const hasHtmlAnchors = /\<\/a/.test(body);
                if (hasHtmlAnchors) {
                    const container = document.createElement('div');
                    container.innerHTML = body;
                    const link = container.querySelector('a');
                    const isViewLink = /\/view\/|\/iview\//.test(link.href);
                    if (isViewLink) {
                        const bundleIdMatch = window.location.hash.match(/#\/([a-zA-Z0-9-\.]*)/);
                        const bundleId = bundleIdMatch && bundleIdMatch[1];
                        return this.rxAngularApplicationService.isAngularJsApplication(bundleId).pipe(switchMap((isAngularJsApplication) => {
                            if (!isAngularJsApplication) {
                                const queryParams = [];
                                let urlWithoutParams = link.href.replace(/(?:[?&]param=)([^&]*)/g, (match, paramValue) => {
                                    queryParams.push(paramValue);
                                    return '';
                                });
                                urlWithoutParams = urlWithoutParams.replace('innovationsuite', 'helix');
                                if (queryParams.length) {
                                    const viewDefinitionName = decodeURI(urlWithoutParams.split('/').pop());
                                    return this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(map((viewDefinition) => {
                                        const newQueryParams = [];
                                        forEach(viewDefinition.inputParams, (inputParam, index) => {
                                            newQueryParams.push(`${inputParam.name}=${queryParams[index]}`);
                                        });
                                        link.href = [urlWithoutParams, newQueryParams.join('&')].join('?');
                                        message[this.bodyFieldId] = container.innerHTML;
                                        return message;
                                    }), catchError((err) => {
                                        this.rxLogService.error(err);
                                        return of(message);
                                    }));
                                }
                                else {
                                    link.href = urlWithoutParams;
                                    message[this.bodyFieldId] = container.innerHTML;
                                    return of(message);
                                }
                            }
                            else {
                                return of(message);
                            }
                        }));
                    }
                }
                return of(message);
            });
            return forkJoin(messages).pipe(map((convertedMessages) => ({
                messages: convertedMessages,
                totalSize: dataPage.totalSize
            })));
        }
        else {
            return of({
                messages: [],
                totalSize: dataPage.totalSize
            });
        }
    }
    cancelMessagePolling() {
        this.cancelMessagePolling$.next();
    }
    launchMessagePolling() {
        this.cancelMessagePolling();
        this.ngZone.runOutsideAngular(() => {
            this.subscription.add(timer(0, RX_USER_MESSAGE.fetchMessageFrequency)
                .pipe(takeUntil(this.cancelMessagePolling$), switchMap((_) => this.getMessages(RX_USER_MESSAGE.messageTypes.active, false, true)))
                .subscribe());
        });
    }
    getMessages(type = RX_USER_MESSAGE.messageTypes.active, getMore = false, suppressTokenRefresh = false) {
        const params = {
            pageSize: this.userMessageModel.pageSize,
            startIndex: 0,
            sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
            queryExpression: '',
            propertySelection: [
                RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                RX_RECORD_DEFINITION.coreFieldIds.id,
                this.userMessageModel.userMessageDef.fields.body,
                this.userMessageModel.userMessageDef.fields.subject
            ].join(',')
        };
        this.userMessageModel.messages[type].loadingInProgress =
            getMore || this.userMessageModel.messages[type].list.length === 0;
        set(params, this.userMessageModel.userMessageDef.fields.recipient, this.rxCurrentUserService.get().loginName);
        params.queryExpression = this.userMessageModel.messages[type].queryExpr;
        params.startIndex = getMore ? this.userMessageModel.messages[type].list.length : 0;
        const headers = Object.assign({ 'default-bundle-scope': RX_APPLICATION.innovationStudioBundleId }, (suppressTokenRefresh ? { 'Suppress-Token-Refresh': 'true' } : {}));
        return this.rxUserMessageDataPageService
            .get({
            params,
            headers
        })
            .pipe(switchMap(this.updateDsmApplicationViewUrls.bind(this)), tap((rxMessages) => {
            this.ngZone.run(() => {
                if (rxMessages.messages.length) {
                    if (getMore) {
                        this.userMessageModel.messages[type].list = this.userMessageModel.messages[type].list.concat(rxMessages.messages);
                    }
                    else {
                        this.userMessageModel.messages[type].count = rxMessages.totalSize;
                        this.userMessageModel.messages[type].list = rxMessages.messages;
                        if (type === RX_USER_MESSAGE.messageTypes.active) {
                            this.messageCountSubject.next(rxMessages.totalSize);
                        }
                    }
                }
                else if (!getMore && type === RX_USER_MESSAGE.messageTypes.active) {
                    this.messageCountSubject.next(this.userMessageModel.messages.active.count);
                }
                this.messageFetchedSubject.next();
            });
        }));
    }
    handleSuccessfulDismiss(messageDismissed) {
        const shellNotifications = this.userMessageModel.messages;
        if (messageDismissed) {
            remove(shellNotifications.active.list, messageDismissed);
            shellNotifications.dismissed.list.push(messageDismissed);
            shellNotifications.active.count--;
            shellNotifications.dismissed.count++;
        }
        else {
            shellNotifications.active.list = [];
            shellNotifications.active.count = 0;
        }
        this.messageCountSubject.next(shellNotifications.active.count);
        if (shellNotifications.active.list.length === 0) {
            // avoid making backend call to get new notification on each dismiss
            this.launchMessagePolling();
        }
    }
    dismissNotification(message) {
        if (message) {
            const inputParameter = {};
            inputParameter[message[RX_RECORD_DEFINITION.coreFieldIds.id]] =
                RX_USER_MESSAGE.definitions.userMessage.status.dismissed;
            this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfUserMessagesCommand);
            this.subscription.add(this.userMessagesCommand
                .execute({
                userMessageStateById: inputParameter
            })
                .subscribe(() => this.handleSuccessfulDismiss(message)));
        }
        else {
            this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfAllUserMessagesCommand);
            this.subscription.add(this.userMessagesCommand.execute().subscribe(() => this.handleSuccessfulDismiss()));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.cancelMessagePolling();
    }
}
RxUserMessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService, deps: [{ token: i1.RxCommandFactoryService }, { token: i1.RxCurrentUserService }, { token: i2.RxUserMessageDataPageService }, { token: i3.RxViewDefinitionCacheService }, { token: i1.RxLogService }, { token: i1.RxAngularApplicationService }, { token: i1.RxGlobalCacheService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserMessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxCommandFactoryService }, { type: i1.RxCurrentUserService }, { type: i2.RxUserMessageDataPageService }, { type: i3.RxViewDefinitionCacheService }, { type: i1.RxLogService }, { type: i1.RxAngularApplicationService }, { type: i1.RxGlobalCacheService }, { type: i0.NgZone }]; } });
//# sourceMappingURL=user-message.service.js.map