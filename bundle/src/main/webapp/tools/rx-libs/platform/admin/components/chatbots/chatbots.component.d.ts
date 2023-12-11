import { OnInit, TemplateRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ColumnConfig, DataCellTemplateParams } from '@bmc-ux/adapt-table';
import { RxChatbotDefinitionService } from '@helix/platform/chatbot/api';
import { RxAdminSettingsService, RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { IRecordGridConfig, RecordGridComponent } from '@helix/platform/view/components';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ChatbotsAdminComponent extends BaseViewComponent implements OnInit {
    private rxAdminSettingsService;
    private rxChatbotDefinitionService;
    private rxCurrentUserService;
    private rxModalService;
    private rxNotificationService;
    private translateService;
    chatbotConfigurationsRecordGrid: RecordGridComponent;
    nameColumnTemplate: TemplateRef<DataCellTemplateParams>;
    displayChatbotsDropdownSwitch: NgModel;
    busy: Subscription;
    recordGridConfig: Observable<IRecordGridConfig>;
    private componentSettings;
    sections: {
        chatbotConfigurations: {
            title: string;
            isExpanded: boolean;
        };
        globalChatbotSettings: {
            title: string;
            displayChatbotsDropdown: boolean;
            isExpanded: boolean;
        };
    };
    isAdministrator: boolean;
    constructor(rxAdminSettingsService: RxAdminSettingsService, rxChatbotDefinitionService: RxChatbotDefinitionService, rxCurrentUserService: RxCurrentUserService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, translateService: TranslateService);
    ngOnInit(): void;
    getCellValue(dataItem: string[], column: ColumnConfig): string;
    onSaveClick(): void;
    openChatbot(row: string[]): void;
    private refreshChatbotGrid;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatbotsAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatbotsAdminComponent, "rx-admin-chatbots", never, {}, {}, never, never>;
}
