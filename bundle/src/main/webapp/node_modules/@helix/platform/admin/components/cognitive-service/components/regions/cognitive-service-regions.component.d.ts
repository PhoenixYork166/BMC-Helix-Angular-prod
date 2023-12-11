import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { IUserOverlayGroupDescriptorChildren, RxNotificationService, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveServiceRegionsComponent implements OnInit {
    private formBuilder;
    private rxCognitiveServiceService;
    private rxNotificationService;
    private rxSystemConfigurationService;
    private translateService;
    isAdministrator: boolean;
    currentOverlayContext: IUserOverlayGroupDescriptorChildren;
    cognitiveServiceRegionConfigurationForm: FormGroup;
    settings: RxSelectOption[];
    regions: RxSelectOption[];
    constructor(formBuilder: FormBuilder, rxCognitiveServiceService: RxCognitiveServiceService, rxNotificationService: RxNotificationService, rxSystemConfigurationService: RxSystemConfigurationService, translateService: TranslateService);
    ngOnInit(): void;
    isFormDirty(): boolean;
    private loadSystemSettings;
    optionFormatter(regionNameOption: RxSelectOption): string;
    save(): void;
    isSaveButtonDisabled(): boolean;
    isSaveButtonVisible(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveServiceRegionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveServiceRegionsComponent, "rx-cognitive-service-regions", never, { "isAdministrator": "isAdministrator"; "currentOverlayContext": "currentOverlayContext"; }, {}, never, never>;
}
