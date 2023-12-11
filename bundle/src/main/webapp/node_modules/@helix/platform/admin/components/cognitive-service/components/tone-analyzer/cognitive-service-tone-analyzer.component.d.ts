import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUserOverlayGroupDescriptorChildren, RxSystemConfigurationService } from '@helix/platform/shared/api';
import { RxCognitiveServiceService } from '../../cognitive-service.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CognitiveServiceToneAnalyzerComponent implements OnInit {
    private formBuilder;
    private rxCognitiveServiceService;
    private rxNotificationService;
    private rxSystemConfigurationService;
    private translateService;
    isAdministrator: boolean;
    currentOverlayContext: IUserOverlayGroupDescriptorChildren;
    toneAnalyzerConfigurationForm: FormGroup;
    constructor(formBuilder: FormBuilder, rxCognitiveServiceService: RxCognitiveServiceService, rxNotificationService: RxNotificationService, rxSystemConfigurationService: RxSystemConfigurationService, translateService: TranslateService);
    ngOnInit(): void;
    isFormDirty(): boolean;
    private loadSystemSettings;
    save(): void;
    isSaveButtonDisabled(): boolean;
    isSaveButtonVisible(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CognitiveServiceToneAnalyzerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CognitiveServiceToneAnalyzerComponent, "rx-cognitive-service-tone-analyzer", never, { "isAdministrator": "isAdministrator"; "currentOverlayContext": "currentOverlayContext"; }, {}, never, never>;
}
