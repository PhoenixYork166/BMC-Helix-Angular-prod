import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { IUtterancesTone } from '../tone-analysis-testing.interfaces';
import { RxSystemConfigurationService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class UserEngagementToneAnalysisComponent implements OnInit {
    private rxCommandFactoryService;
    private rxSystemConfigurationService;
    languageOptions: RxSelectOption[];
    language: RxSelectOption;
    utterances: string;
    toneScoreThreshold: number;
    defaultToneScoreThreshold: number;
    utteranceTonesData: IUtterancesTone;
    userEngagementToneAnalysisForm: NgForm;
    constructor(rxCommandFactoryService: RxCommandFactoryService, rxSystemConfigurationService: RxSystemConfigurationService);
    ngOnInit(): void;
    clearUtterances(): void;
    setDefaultThreshold(): void;
    optionFormatter(option: RxSelectOption): string;
    analyzeTone(): void;
    reset(): void;
    isAnalyzeToneButtonDisabled(): boolean;
    isResetButtonDisabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserEngagementToneAnalysisComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserEngagementToneAnalysisComponent, "rx-user-engagement-tone-analysis", never, {}, {}, never, never>;
}
