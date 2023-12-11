import { OnDestroy } from '@angular/core';
import { ActiveModalRef, AdaptAgreementState } from '@bmc-ux/adapt-angular';
import { RxGainsightUserPreferencesService } from '../gainsight-user-preferences.service';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class GainsightOptInComponent implements OnDestroy {
    private activeModalRef;
    private rxGainsightUserPreferencesService;
    private translateService;
    private rxNotificationService;
    isQueryInProgress: boolean;
    isSaveButtonDisabled: boolean;
    private accountPerformance;
    private isSaveInProgressSubject;
    private gainsightUserPreferences$;
    state$: import("rxjs").Observable<{
        accountPerformance: boolean;
        accountMarketing: boolean;
    }>;
    vm$: import("rxjs").Observable<{
        state: {
            accountPerformance: boolean;
            accountMarketing: boolean;
        };
        isSaveInProgress: boolean;
    }>;
    constructor(activeModalRef: ActiveModalRef, rxGainsightUserPreferencesService: RxGainsightUserPreferencesService, translateService: TranslateService, rxNotificationService: RxNotificationService);
    handleStateChange(state: AdaptAgreementState): void;
    cancel(): void;
    save(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GainsightOptInComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GainsightOptInComponent, "rx-gainsight-opt-in", never, {}, {}, never, never>;
}
