import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { RxJsonParserService } from '@helix/platform/utils';
import { IUserOverlayGroupDescriptorChildren, RxCurrentUserService, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveServiceConnectionsComponent implements OnInit {
    private rxCognitiveServiceService;
    private rxCurrentUserService;
    private rxNotificationService;
    private rxSystemConfigurationService;
    private rxJsonParserService;
    private translateService;
    isAdministrator: boolean;
    currentOverlayContext: IUserOverlayGroupDescriptorChildren;
    isNativeClassificationProvider: boolean;
    connectionInfo: {
        helixClassifierKey: string;
        helixClassifierSecret: string;
        naturalLanguageClassifierAPIKey: string;
        searchAPIKey: string;
        toneAnalyzerAPIKey: string;
        serviceAccountCredentials: string;
        apiKey: string;
    };
    serviceDefinitions: {
        helixClassifier: {
            id: string;
            title: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            serviceType: string;
            fields: ({
                label: string;
                name: string;
                readonly: boolean;
                type: string;
                required: boolean;
                rxId?: undefined;
            } | {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
                readonly?: undefined;
            })[];
        };
        classification: {
            id: string;
            title: string;
            model: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            serviceType: string;
            fields: {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
            }[];
        };
        serviceAccountCredentials: {
            id: string;
            title: string;
            model: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            serviceType: string;
            fields: {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
                jsonValidatorErrorMessage: string;
            }[];
        };
        discovery: {
            id: string;
            title: string;
            model: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            serviceType: string;
            fields: {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
            }[];
        };
        toneAnalyzer: {
            id: string;
            title: string;
            model: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            serviceType: string;
            fields: {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
            }[];
        };
        microsoft: {
            id: string;
            title: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            fields: ({
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
                pattern?: undefined;
            } | {
                name: string;
                label: string;
                type: string;
                required: boolean;
                pattern: RegExp;
                rxId: string;
            })[];
        };
        google: {
            id: string;
            title: string;
            model: string;
            isOpen: boolean;
            isApiKeyTest: boolean;
            fields: {
                name: string;
                label: string;
                type: string;
                required: boolean;
                rxId: string;
                jsonValidatorErrorMessage: string;
            }[];
        };
    };
    realTimeTranslationProvider: string;
    availableServicesList: any[];
    connectionTestStatusesByServiceId: KeyValueObject<ConnectionTestStatus>;
    connectionTestStatus: ConnectionTestStatus;
    isFormFieldChanged: boolean;
    availableServices: KeyValueObject<boolean>;
    constructor(rxCognitiveServiceService: RxCognitiveServiceService, rxCurrentUserService: RxCurrentUserService, rxNotificationService: RxNotificationService, rxSystemConfigurationService: RxSystemConfigurationService, rxJsonParserService: RxJsonParserService, translateService: TranslateService);
    ngOnInit(): void;
    isFormDirty(): boolean;
    private loadServices;
    private loadClassificationServiceProvider;
    private loadRealTimeTranslationProviders;
    private loadHelixCognitiveSystemSettings;
    private loadCognitiveSystemSettings;
    private isConnectionTestStatusInvalid;
    private getConnectionTestPayload;
    resetConnectionTest(serviceId: string, form: NgForm): void;
    onTestConnection(serviceId: string, form: NgForm): void;
    save(): void;
    isSaveButtonDisabled(): boolean;
    isSaveButtonVisible(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveServiceConnectionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveServiceConnectionsComponent, "rx-cognitive-service-connections", never, { "isAdministrator": "isAdministrator"; "currentOverlayContext": "currentOverlayContext"; "isNativeClassificationProvider": "isNativeClassificationProvider"; }, {}, never, never>;
}
