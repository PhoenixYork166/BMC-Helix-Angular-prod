import { OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListBuilderTextsModel, RxListBuilderItem } from '@bmc-ux/adapt-angular';
import { RxIframeSecurityService } from './iframe-security.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class IframeSecurityAdminComponent extends BaseViewComponent implements OnInit {
    private rxIframeSecurityService;
    private rxNotificationService;
    private rxUrlUtilsService;
    private translateService;
    hostClass: string;
    iframeAllowedSitesListBuilder: NgModel;
    trustedWebsitesListBuilder: NgModel;
    busy: Subscription;
    sections: {
        iframeAllowedSites: {
            infoMessage: string;
            name: string;
            settingName: string;
            title: string;
            urls: any[];
        };
        trustedWebsites: {
            infoMessage: string;
            name: string;
            settingName: string;
            title: string;
            urls: any[];
        };
    };
    listBuilderTexts: ListBuilderTextsModel;
    private counter;
    private invalidUrlMsg;
    private duplicateUrlMsg;
    constructor(rxIframeSecurityService: RxIframeSecurityService, rxNotificationService: RxNotificationService, rxUrlUtilsService: RxUrlUtilsService, translateService: TranslateService);
    ngOnInit(): void;
    generateId: () => number;
    iframeAllowedSitesValidation: (value: string, items: RxListBuilderItem[]) => string;
    trustedWebsitesValidation: (value: string, items: RxListBuilderItem[]) => string;
    isDirty(): boolean;
    onSaveClick(): void;
    private itemValidation;
    static ɵfac: i0.ɵɵFactoryDeclaration<IframeSecurityAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IframeSecurityAdminComponent, "rx-admin-iframe-security", never, {}, {}, never, never>;
}
