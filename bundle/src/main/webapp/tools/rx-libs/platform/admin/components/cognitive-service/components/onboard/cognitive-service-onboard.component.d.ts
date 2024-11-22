import { Injector, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DockedPanelContext, KeyValueObject, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { IUserOverlayGroupDescriptorChildren, RxCommandFactoryService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { IServiceConfig } from '../../cognitive-service.interfaces';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import * as i0 from "@angular/core";
export declare class CognitiveServiceOnboardComponent extends RxModalClass implements OnInit {
    private dockedPanelContext;
    private rxCognitiveServiceService;
    private rxCommandFactoryService;
    private rxModalService;
    private rxNotificationService;
    private rxRecordInstanceDataPageService;
    private rxSystemConfigurationService;
    private translateService;
    protected injector: Injector;
    isAdministrator: boolean;
    currentOverlayContext: IUserOverlayGroupDescriptorChildren;
    ownCognitivePoviderConfigurationForm: NgForm;
    supportedCognitiveProviders: RxSelectOption[];
    cognitiveProvider: [RxSelectOption];
    regions: RxSelectOption[];
    providerServices: KeyValueObject<IServiceConfig>;
    isOnboardingInProgress: boolean;
    private defaultServiceId;
    private defaultSelection;
    constructor(dockedPanelContext: DockedPanelContext, rxCognitiveServiceService: RxCognitiveServiceService, rxCommandFactoryService: RxCommandFactoryService, rxModalService: RxModalService, rxNotificationService: RxNotificationService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxSystemConfigurationService: RxSystemConfigurationService, translateService: TranslateService, injector: Injector);
    ngOnInit(): void;
    isDirty(): boolean;
    private loadCredentialAndRegions;
    private setBotLocaleConversation;
    private loadServiceProviderApiKey;
    optionFormatter: (regionNameOption: RxSelectOption) => string;
    isOnboardButtonDisabled(): boolean;
    close(): void;
    onboard(): void;
    keepKeyValueOrder(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveServiceOnboardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveServiceOnboardComponent, "rx-cognitive-service-onboard", never, { "isAdministrator": "isAdministrator"; "currentOverlayContext": "currentOverlayContext"; }, {}, never, never>;
}
