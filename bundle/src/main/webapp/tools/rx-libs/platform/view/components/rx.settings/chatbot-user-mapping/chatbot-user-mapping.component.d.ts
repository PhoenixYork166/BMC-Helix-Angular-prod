import { OnInit } from '@angular/core';
import { RxCommandFactoryService, RxNotificationService } from '@helix/platform/shared/api';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class ChatbotUserMappingComponent extends BaseViewComponent implements OnInit {
    private translateService;
    private rxCommandFactoryService;
    private rxNotificationService;
    private encryptedChatUserAndChatId;
    private chatbotProvider;
    isMappingInProgress: boolean;
    message: string;
    mappingStatus: string;
    constructor(translateService: TranslateService, rxCommandFactoryService: RxCommandFactoryService, rxNotificationService: RxNotificationService);
    ngOnInit(): void;
    isMappingButtonVisible(): boolean;
    mapUser(): void;
    private updateMessage;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatbotUserMappingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatbotUserMappingComponent, "com-bmc-arsys-rx-user-mapping", never, {}, {}, never, never>;
}
