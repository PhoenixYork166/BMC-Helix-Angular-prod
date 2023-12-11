/// <reference types="ckeditor" />
import { RxLocalizationService } from '@helix/platform/shared/api';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxCkEditorConfiguratorService {
    private translateService;
    private rxLocalizationService;
    private rxUrlUtilsService;
    constructor(translateService: TranslateService, rxLocalizationService: RxLocalizationService, rxUrlUtilsService: RxUrlUtilsService);
    getCKEditorConfig(): any;
    getContentRules(): CKEDITOR.filter.allowedContentRules;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCkEditorConfiguratorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCkEditorConfiguratorService>;
}
