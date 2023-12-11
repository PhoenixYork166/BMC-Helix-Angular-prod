import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxGainsightUserPreferencesService } from '../gainsight-user-preferences.service';
import { catchError, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, of, throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../gainsight-user-preferences.service";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/shared/api";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/common";
export class GainsightOptInComponent {
    constructor(activeModalRef, rxGainsightUserPreferencesService, translateService, rxNotificationService) {
        this.activeModalRef = activeModalRef;
        this.rxGainsightUserPreferencesService = rxGainsightUserPreferencesService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.isQueryInProgress = true;
        this.isSaveButtonDisabled = true;
        this.isSaveInProgressSubject = new BehaviorSubject(false);
        this.gainsightUserPreferences$ = this.rxGainsightUserPreferencesService.getGainsightUserPreferences().pipe(take(1), catchError(() => {
            this.cancel();
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-created.message'));
            return of(null);
        }), shareReplay(1));
        this.state$ = this.gainsightUserPreferences$.pipe(tap(() => {
            this.isQueryInProgress = false;
        }), filter((gainsightUserPreferences) => Boolean(gainsightUserPreferences)), map((gainsightUserPreferences) => ({
            accountPerformance: gainsightUserPreferences.trackUsage != false,
            accountMarketing: false
        })));
        this.vm$ = combineLatest([this.state$, this.isSaveInProgressSubject]).pipe(map(([state, isSaveInProgress]) => ({
            state,
            isSaveInProgress
        })));
    }
    handleStateChange(state) {
        this.isSaveButtonDisabled = false;
        this.accountPerformance = state.accountPerformance;
    }
    cancel() {
        this.activeModalRef.dismiss();
    }
    save() {
        this.isSaveInProgressSubject.next(true);
        this.gainsightUserPreferences$
            .pipe(take(1), map((gainsightUserPreferences) => (Object.assign(Object.assign({}, gainsightUserPreferences), { trackUsage: this.accountPerformance }))), switchMap((gainsightUserPreferences) => this.rxGainsightUserPreferencesService.saveGainsightUserPreferences(gainsightUserPreferences)), catchError((error) => {
            this.isSaveInProgressSubject.next(false);
            return throwError(error);
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-preferences-saved.success.message'));
            this.isSaveInProgressSubject.next(false);
            this.activeModalRef.close();
        }, () => this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-updated.message')));
    }
    ngOnDestroy() {
        this.isSaveInProgressSubject.complete();
    }
}
GainsightOptInComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightOptInComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxGainsightUserPreferencesService }, { token: i3.TranslateService }, { token: i4.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
GainsightOptInComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GainsightOptInComponent, selector: "rx-gainsight-opt-in", ngImport: i0, template: "<rx-line-loader\n  *ngIf=\"isQueryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <div [hidden]=\"isQueryInProgress\" class=\"modal-body\">\n    <adapt-agreement-card\n      (stateChange)=\"handleStateChange($event)\"\n      [showShadow]=\"false\"\n      [showMarketingSection]=\"false\"\n      [state]=\"vm.state\"\n      rx-id=\"gainsight-agreement\"\n    >\n    </adapt-agreement-card>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      class=\"btn btn-primary\"\n      (click)=\"save()\"\n      rx-id=\"save-button\"\n      [disabled]=\"isSaveButtonDisabled || vm.isSaveInProgress\"\n      [adaptInlineLoader]=\"vm.isSaveInProgress\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", components: [{ type: i5.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1.AdaptAgreementCardComponent, selector: "adapt-agreement-card", inputs: ["multiProductUsage", "state", "showOrganizationSettings", "showMarketingSection", "showShadow"], outputs: ["stateChange"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i3.TranslatePipe, "async": i6.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightOptInComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-gainsight-opt-in',
                    templateUrl: './gainsight-opt-in.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxGainsightUserPreferencesService }, { type: i3.TranslateService }, { type: i4.RxNotificationService }]; } });
//# sourceMappingURL=gainsight-opt-in.component.js.map