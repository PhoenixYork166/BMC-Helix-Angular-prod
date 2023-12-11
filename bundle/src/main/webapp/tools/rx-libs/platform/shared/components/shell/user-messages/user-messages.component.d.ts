import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RxUserMessageService } from './user-message.service';
import { IRxActiveMessage, IRxMessage } from './user-message.interfaces';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class RxUserMessagesComponent implements OnDestroy, OnInit {
    private adaptModalService;
    private rxUserMessageService;
    private renderer;
    scrollableNotifications: ElementRef;
    private subscription;
    loadingInProgress: boolean;
    activeMessage: IRxActiveMessage;
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
    constructor(adaptModalService: AdaptModalService, rxUserMessageService: RxUserMessageService, renderer: Renderer2);
    ngOnInit(): void;
    getMoreMessages(event: any): void;
    dismissMessage(message?: IRxMessage): void;
    viewAllMessages(): Promise<boolean | string>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserMessagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxUserMessagesComponent, "rx-user-messages", never, {}, {}, never, never>;
}
