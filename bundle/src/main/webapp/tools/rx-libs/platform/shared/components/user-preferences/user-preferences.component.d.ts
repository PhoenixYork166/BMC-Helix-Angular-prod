import { OnInit } from '@angular/core';
import { ActiveModalRef, RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxCurrentUserService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxUserPreferencesComponent implements OnInit {
    private activeModalRef;
    private rxCurrentUserService;
    private rxRecordInstanceDataPageService;
    private rxRecordInstanceService;
    private translateService;
    private preferredLocale;
    private recordInstance;
    private defaultSelection;
    queryInProgress: boolean;
    selectedLocale: RxSelectOption[];
    isAbleToChangeLocale: boolean;
    supportedLocales: RxSelectOption[];
    constructor(activeModalRef: ActiveModalRef, rxCurrentUserService: RxCurrentUserService, rxRecordInstanceDataPageService: RxRecordInstanceDataPageService, rxRecordInstanceService: RxRecordInstanceService, translateService: TranslateService);
    ngOnInit(): void;
    init(): void;
    applyUserPreferences(): void;
    cancel(): void;
    optionFormatter: (option: RxSelectOption) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserPreferencesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxUserPreferencesComponent, "rx-user-preferences", never, {}, {}, never, never>;
}
