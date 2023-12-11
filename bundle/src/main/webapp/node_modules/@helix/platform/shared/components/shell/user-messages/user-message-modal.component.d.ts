import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxUserMessageService } from './user-message.service';
import { IRxMessage } from './user-message.interfaces';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxUserMessageModalComponent implements OnInit, OnDestroy {
    context: ActiveModalRef;
    private rxUserMessageService;
    private translateService;
    private renderer;
    scrollableNotifications: ElementRef;
    private messageSubscription;
    loadingInProgress: boolean;
    RX_USER_MESSAGE: {
        title: string;
        showAll: string;
        dismissAll: string;
        noActiveMessage: string;
        dismissMessage: string;
        loadMore: string;
        fetchMessageFrequency: number;
        messageTypes: {
            active: string;
            dismissed: string;
        };
        definitions: {
            userMessage: {
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
        };
    };
    messages: {
        active: {
            type: string;
            count: number;
            list: IRxMessage[];
            queryExpr: string;
            loadingInProgress: boolean;
        };
        dismissed: {
            type: string;
            count: number;
            list: IRxMessage[];
            queryExpr: string;
            loadingInProgress: boolean;
        };
    };
    constructor(context: ActiveModalRef, rxUserMessageService: RxUserMessageService, translateService: TranslateService, renderer: Renderer2);
    ngOnInit(): void;
    getMoreMessages(messageType: string, event: any): void;
    dismissMessage(message: IRxMessage): void;
    getContentTitleText(key: string, count: number): string;
    closeModal(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserMessageModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxUserMessageModalComponent, "rx-user-message-modal", never, {}, {}, never, never>;
}
