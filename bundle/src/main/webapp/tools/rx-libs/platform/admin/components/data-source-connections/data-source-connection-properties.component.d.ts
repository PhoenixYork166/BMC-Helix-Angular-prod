import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxSelectionChangeEvent, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { ConnectionTestStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { RxCognitiveServiceService } from '../cognitive-service/cognitive-service.service';
import { RxCustomDataSourceProviderDataPageService } from './custom-data-source-provider-data-page.service';
import { ICustomDataSourceProviderPickerComponentOptions } from './custom-data-source-provider-picker/custom-data-source-provider-picker-component.types';
import * as i0 from "@angular/core";
export declare class DataSourceConnectionPropertiesComponent implements OnInit, OnDestroy {
    private rxCognitiveServiceService;
    private rxRecordInstanceDataPageService;
    private rxCustomDataSourceProviderDataPageService;
    private rxDefinitionNameService;
    private rxWizardModalComponent;
    private translateService;
    private rxGlobalCacheService;
    connectionPropertiesForm: FormGroup;
    isRasPasswordDisabled: boolean;
    connectionTestStatus: ConnectionTestStatus;
    webApis: RxSelectOption[];
    customDataSourceProvidersPickerOptions: ICustomDataSourceProviderPickerComponentOptions;
    dataSourceAuthenticationTypes: RxSelectOption[];
    isResourceTypeArSystem$: import("rxjs").Observable<boolean>;
    isResourceTypeCustom$: import("rxjs").Observable<boolean>;
    isResourceTypeWebApi$: import("rxjs").Observable<boolean>;
    private destroyed$;
    private defaultSelection;
    private isDataLoaded;
    constructor(rxCognitiveServiceService: RxCognitiveServiceService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxCustomDataSourceProviderDataPageService: RxCustomDataSourceProviderDataPageService, rxDefinitionNameService: RxDefinitionNameService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService, rxGlobalCacheService: RxGlobalCacheService);
    ngOnInit(): void;
    setAuthType(type: string): void;
    onTestConnection(): void;
    private loadCustomDataSourceProviders;
    private loadWebApis;
    optionFormatter: (dataSourceOption: RxSelectOption) => string;
    onWebApiChange(event: RxSelectionChangeEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataSourceConnectionPropertiesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataSourceConnectionPropertiesComponent, "rx-data-source-connection-properties", never, {}, {}, never, never>;
}