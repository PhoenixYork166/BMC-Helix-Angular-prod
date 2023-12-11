import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RealTimeTranslationAdminComponent implements OnInit {
    private rxCommandFactoryService;
    private translateService;
    sourceLanguage: RxSelectOption[];
    targetLanguage: RxSelectOption[];
    sourceText: string;
    translatedText: string;
    supportedLocaleOptions: RxSelectOption[];
    realTimeTranslationForm: NgForm;
    constructor(rxCommandFactoryService: RxCommandFactoryService, translateService: TranslateService);
    ngOnInit(): void;
    optionFormatter(option: RxSelectOption): string;
    reset(): void;
    translate(): void;
    clearTexts(): void;
    isTranslateButtonDisabled(): boolean;
    isClearButtonDisabled(): boolean;
    copyTranslatedText(): void;
    isCopyButtonDisabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RealTimeTranslationAdminComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RealTimeTranslationAdminComponent, "rx-admin-real-time-translation", never, {}, {}, never, never>;
}
