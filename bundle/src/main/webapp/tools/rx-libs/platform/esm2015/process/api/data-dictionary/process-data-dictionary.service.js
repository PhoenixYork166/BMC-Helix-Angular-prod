import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { isEmpty, omit, reject } from 'lodash';
import { RxIdService, RxObjectUtilsService } from '@helix/platform/utils';
import { RxDataDictionaryUtils, RxDesignerCacheService, RxGlobalCacheService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@ngx-translate/core";
export class RxProcessDataDictionaryService {
    constructor(rxDataDictionaryUtils, rxDesignerCacheService, rxGlobalCacheService, rxIdService, rxObjectUtilsService, translateService) {
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxIdService = rxIdService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.translateService = translateService;
        this.commonActivities = null;
        this.commonActivitiesSubject = new ReplaySubject(1);
        this.commonActivities$ = this.commonActivitiesSubject.asObservable();
        this.commonActivitiesDataDictionaryStateClone$ = this.commonActivities$.pipe(map((activitiesDataDictionaryState) => activitiesDataDictionaryState ? this.rxObjectUtilsService.cloneDeep(activitiesDataDictionaryState) : {}), shareReplay(1));
        this.commonDataDictionary$ = this.getCommonDataDictionary();
    }
    clear() {
        this.setCommonActivities(null);
    }
    getCommonDataDictionary() {
        return combineLatest([
            this.commonActivitiesDataDictionaryStateClone$.pipe(map((componentsDataDictionaryState) => Object.values(componentsDataDictionaryState)))
        ]).pipe(map(([activitiesDataDictionaryBranches]) => {
            return [
                {
                    label: 'General',
                    children: [
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date.label'),
                            icon: 'd-icon-dollar',
                            expression: '$DATE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-date-time.label'),
                            icon: 'd-icon-dollar',
                            expression: '$TIMESTAMP$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-group-ids.label'),
                            icon: 'd-icon-dollar',
                            expression: '$GROUPIDS$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-groups.label'),
                            icon: 'd-icon-dollar',
                            expression: '$GROUPS$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-roles.label'),
                            icon: 'd-icon-dollar',
                            expression: '$ROLES$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-server-urls.label'),
                            icon: 'd-icon-dollar',
                            expression: '$SERVERURL$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-time.label'),
                            icon: 'd-icon-dollar',
                            expression: '$TIME$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user.label'),
                            icon: 'd-icon-dollar',
                            expression: '$USER$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-user-locale.label'),
                            icon: 'd-icon-dollar',
                            expression: '$LOCALE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.current-week-day.label'),
                            icon: 'd-icon-dollar',
                            expression: '$WEEKDAY$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.designer.keywords.new-line.label'),
                            icon: 'd-icon-dollar',
                            expression: '$NEWLINE$'
                        },
                        {
                            label: this.translateService.instant('com.bmc.arsys.rx.client.process-designer.keywords.process-correlation-id.label'),
                            icon: 'd-icon-dollar',
                            expression: '$PROCESSCORRELATIONID$'
                        },
                        {
                            label: 'NULL',
                            icon: 'd-icon-dollar',
                            expression: '$NULL$',
                            hidden: true
                        }
                    ]
                },
                {
                    label: 'Functions',
                    expanded: true,
                    children: reject(this.rxDataDictionaryUtils.getFunctionDataDictionaryBranch(this.rxDesignerCacheService.getFunctionDescriptorsSync()), { label: 'Rule Qualification' })
                },
                {
                    label: 'Activities',
                    expanded: true,
                    children: activitiesDataDictionaryBranches
                }
            ];
        }));
    }
    setCommonActivitiesDataDictionaryBranch(guid, activityDataDictionaryBranch) {
        activityDataDictionaryBranch.pipe(take(1)).subscribe((dataDictionaryBranch) => {
            this.setCommonActivities(isEmpty(dataDictionaryBranch)
                ? omit(this.commonActivities, [guid])
                : Object.assign(Object.assign({}, this.commonActivities), { [guid]: dataDictionaryBranch }));
        });
    }
    setCommonActivities(state) {
        this.commonActivities = state;
        this.commonActivitiesSubject.next(this.commonActivities);
    }
}
RxProcessDataDictionaryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, deps: [{ token: i1.RxDataDictionaryUtils }, { token: i1.RxDesignerCacheService }, { token: i1.RxGlobalCacheService }, { token: i2.RxIdService }, { token: i2.RxObjectUtilsService }, { token: i3.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxProcessDataDictionaryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxProcessDataDictionaryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDataDictionaryUtils }, { type: i1.RxDesignerCacheService }, { type: i1.RxGlobalCacheService }, { type: i2.RxIdService }, { type: i2.RxObjectUtilsService }, { type: i3.TranslateService }]; } });
//# sourceMappingURL=process-data-dictionary.service.js.map