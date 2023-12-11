import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RX_APPLICATION, RX_DESIGNER, RxComponentCanDeactivateGuard, RxDefinitionNameService, RxGlobalCacheService, RxPageTitleService, RxPreviousStateService } from '@helix/platform/shared/api';
import { RxIframeService } from '@helix/platform/shared/components';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxJsonParserService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { capitalize, get, isEmpty, map as _map, noop } from 'lodash';
import { from, NEVER, ReplaySubject, throwError } from 'rxjs';
import { filter, map, pairwise, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AX_DESIGNER_FRAME } from './designer-frame.const';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@helix/platform/utils";
export class DesignerFrameComponent {
    constructor(router, activatedRoute, rxDefinitionNameService, rxPageTitleService, rxGlobalCacheService, translateService, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxIframeService, rxJsonParserService, rxPreviousStateService, rxGainsightConfiguratorService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.translateService = translateService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxIframeService = rxIframeService;
        this.rxJsonParserService = rxJsonParserService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.isDefinitionDirty = false;
        this.destroyed$ = new ReplaySubject(1);
        this.designerOptions = get(this.router.getCurrentNavigation(), 'extras.state.designerOptions');
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), withLatestFrom(this.activatedRoute.data, (_, data) => data), startWith(undefined), pairwise(), withLatestFrom(this.activatedRoute.params, this.activatedRoute.queryParams), tap(([[prevData, nextData], params]) => {
            if (((prevData === null || prevData === void 0 ? void 0 : prevData.designerMode) &&
                nextData.designerMode &&
                prevData.designerMode !== AX_DESIGNER_FRAME.designerModes.new &&
                nextData.designerMode !== AX_DESIGNER_FRAME.designerModes.edit) ||
                (prevData === null || prevData === void 0 ? void 0 : prevData.definitionType) !== nextData.definitionType) {
                this.intervalId = setInterval(noop, 100000);
                this.busySubscription = NEVER.subscribe();
            }
            this.currentBundleId =
                params.bundleId ||
                    this.rxDefinitionNameService.getBundleId(params.definitionName) ||
                    this.activatedRoute.parent.snapshot.data.defaultBundleId;
            this.setPageTitle(this.currentBundleId, this.activatedRoute.parent.snapshot.data.definitionType, this.activatedRoute.snapshot.data.legacyDesignerName, params.definitionName);
        }), map(([_, params, queryParams]) => this.buildDesignerUrl(this.currentBundleId, this.activatedRoute.parent.snapshot.data.definitionType, this.activatedRoute.snapshot.data.legacyDesignerName, params, queryParams)), takeUntil(this.destroyed$))
            .subscribe((url) => {
            this.rxIframeService.showIframe(url);
            this.iframeComponentApi = this.rxIframeService.getIframeApi();
        });
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        this.rxGainsightConfiguratorService.updateGlobalContext({
            subProductLevel1: {
                name: 'Design'
            },
            subProductLevel2: {
                name: `${capitalize(this.activatedRoute.snapshot.data.definitionType)} designer`
            }
        });
    }
    ngOnDestroy() {
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
        this.destroyed$.next();
        this.destroyed$.complete();
        this.rxIframeService.hideIframe();
    }
    canDeactivate() {
        return !this.isDefinitionDirty;
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges().then((isConfirmed) => {
            if (isConfirmed) {
                this.isDefinitionDirty = false;
            }
            return isConfirmed;
        });
    }
    onMessage(event) {
        var _a, _b;
        const windowMessage = this.rxJsonParserService.tryParseJson(event.data);
        switch (windowMessage === null || windowMessage === void 0 ? void 0 : windowMessage.messageType) {
            case RX_DESIGNER.messageTypes.designerLoaded: {
                (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                clearInterval(this.intervalId);
                break;
            }
            case RX_DESIGNER.messageTypes.closeDesigner: {
                if (this.activatedRoute.parent.snapshot.data.definitionType === 'shell' ||
                    this.activatedRoute.snapshot.data.legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
                    this.rxPreviousStateService.goToPrevState();
                }
                else if (this.activatedRoute.snapshot.data.legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, this.activatedRoute.snapshot.params.bundleId]);
                }
                else {
                    this.router.navigate([
                        RX_APPLICATION.innovationStudioBundleId,
                        this.currentBundleId,
                        `${this.activatedRoute.parent.snapshot.data.definitionType}-definitions`
                    ]);
                }
                break;
            }
            case RX_DESIGNER.messageTypes.afterSave: {
                if (!windowMessage.payload.isEditMode) {
                    this.router.navigate(['edit', windowMessage.payload.definitionName], {
                        relativeTo: this.activatedRoute.parent
                    });
                }
                this.isDefinitionDirty = false;
                break;
            }
            case RX_DESIGNER.messageTypes.waitingForDesignerOptions: {
                this.iframeComponentApi.postMessageToFrame({
                    messageType: 'designerOptions',
                    payload: this.designerOptions
                });
                break;
            }
            case RX_DESIGNER.messageTypes.designerLoadFailed: {
                (_b = this.busySubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
                clearInterval(this.intervalId);
                from(this.router.navigate([
                    RX_APPLICATION.innovationStudioBundleId,
                    this.currentBundleId,
                    `${this.activatedRoute.parent.snapshot.data.definitionType}-definitions`
                ]))
                    .pipe(switchMap(() => {
                    const err = windowMessage.payload.err;
                    return throwError(new HttpErrorResponse({
                        error: err.data,
                        headers: new HttpHeaders(err.config.headers),
                        status: err.status,
                        statusText: err.statusText,
                        url: err.config.url
                    }));
                }))
                    .subscribe();
                break;
            }
            case RX_DESIGNER.messageTypes.definitionStatusChanged: {
                this.isDefinitionDirty = windowMessage.payload.isDirty;
                break;
            }
        }
    }
    buildDesignerUrl(bundleId, type, legacyDesignerName, params, queryParams) {
        const { definitionName, instanceId } = params;
        const debugOptions = window['rx'].logger.getCategories();
        const queryString = debugOptions.length ? `?debug=${debugOptions.join(',')}` : '';
        const baseInnovationStudioUrl = `/${RX_APPLICATION.innovationStudioBundleId}/index.html${queryString}#`;
        if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/iprocess-instance/view/${definitionName}/${instanceId}`;
        }
        else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/enable-chat-for-service`;
        }
        else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.recordDataEditor) {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/irecord-data-editor/${definitionName}`;
        }
        else if (type === 'shell') {
            return `${baseInnovationStudioUrl}/app/bundle/${bundleId}/ishell/config`;
        }
        else {
            let baseUrl = `${baseInnovationStudioUrl}/app/bundle/${bundleId}/i${type}/${definitionName || ''}`;
            if (!isEmpty(queryParams)) {
                const queryParamsString = _map(queryParams, (value, name) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`).join('&');
                baseUrl += `?${queryParamsString}`;
            }
            return this.designerOptions ? `${baseUrl}?waitForDesignerOptions=true` : baseUrl;
        }
    }
    setPageTitle(bundleId, type, legacyDesignerName, definitionName) {
        this.rxGlobalCacheService
            .getBundleFriendlyName(bundleId)
            .pipe(take(1))
            .subscribe((bundleFriendlyName) => {
            if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.processPreview) {
                this.rxPageTitleService.set([
                    this.translateService.instant('com.bmc.arsys.rx.innovation-studio.process-management.process-preview.title'),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
            else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.recordDataEditor) {
                this.rxPageTitleService.set([
                    this.rxDefinitionNameService.getDisplayName(definitionName),
                    this.translateService.instant('com.bmc.arsys.rx.client.data-editor.title'),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
            else if (legacyDesignerName === AX_DESIGNER_FRAME.legacyDesignerNames.chatWizard) {
                this.rxPageTitleService.set([
                    this.translateService.instant('com.bmc.arsys.rx.innovation-studio.publish-chat-enabled-service.label'),
                    bundleFriendlyName
                ], RX_APPLICATION.innovationStudioBundleId);
            }
            else if (type === 'shell') {
                this.rxPageTitleService.set([RX_APPLICATION.shellDefinitionName, bundleFriendlyName], RX_APPLICATION.innovationStudioBundleId);
            }
            else {
                this.rxPageTitleService.set([
                    definitionName
                        ? this.rxDefinitionNameService.getDisplayName(definitionName)
                        : this.translateService.instant('com.bmc.arsys.rx.client.create-new.title'),
                    this.translateService.instant(AX_DESIGNER_FRAME.designerPageTitleKeys[type]),
                    bundleFriendlyName
                ], this.rxGlobalCacheService.applicationId);
            }
        });
    }
}
/** @nocollapse */ DesignerFrameComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameComponent, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxGlobalCacheService }, { token: i3.TranslateService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i4.RxUtilityModalsService }, { token: i5.RxIframeService }, { token: i6.RxJsonParserService }, { token: i2.RxPreviousStateService }, { token: i5.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ DesignerFrameComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DesignerFrameComponent, selector: "ax-designer-frame", host: { listeners: { "window:message": "onMessage($event)" } }, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busySubscription }\"></rx-busy-indicator>\n", styles: [":host{position:relative;display:block;height:100%}\n"], components: [{ type: i4.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DesignerFrameComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-designer-frame',
                    templateUrl: './designer-frame.component.html',
                    styleUrls: ['./designer-frame.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxGlobalCacheService }, { type: i3.TranslateService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i4.RxUtilityModalsService }, { type: i5.RxIframeService }, { type: i6.RxJsonParserService }, { type: i2.RxPreviousStateService }, { type: i5.RxGainsightConfiguratorService }]; }, propDecorators: { onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });
//# sourceMappingURL=designer-frame.component.js.map