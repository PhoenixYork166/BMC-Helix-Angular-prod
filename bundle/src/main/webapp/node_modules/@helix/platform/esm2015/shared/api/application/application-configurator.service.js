import { Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { get } from 'lodash';
import { AdaptDockedPanelService, AdaptModalService } from '@bmc-ux/adapt-angular';
import { RxRootInjector } from './root-injector.class';
import { RxUpgradeTrackerService } from '../upgrade-tracker/upgrade-tracker.service';
import { RxGlobalCacheService } from '../caching/global-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "../upgrade-tracker/upgrade-tracker.service";
import * as i2 from "../caching/global-cache.service";
import * as i3 from "@angular/router";
import * as i4 from "@bmc-ux/adapt-angular";
export class RxApplicationConfiguratorService {
    constructor(injector, rxUpgradeTrackerService, rxGlobalCacheService, document, router, adaptModalService, adaptDockedPanelService) {
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.document = document;
        this.router = router;
        this.adaptModalService = adaptModalService;
        this.adaptDockedPanelService = adaptDockedPanelService;
        RxRootInjector.injector = injector;
    }
    configure() {
        this.patchCkEditor();
        this.rxGlobalCacheService.applicationId$
            .pipe(filter(Boolean), take(1))
            .subscribe((applicationId) => this.document.body.parentNode.setAttribute('rx-app', applicationId));
        this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(() => {
            this.rxUpgradeTrackerService.displayUpgradeNotification(false);
        });
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.adaptModalService.closeAllModals();
            for (let i = this.adaptDockedPanelService.openedPanels.length - 1; i >= 0; i--) {
                this.adaptDockedPanelService.close(this.adaptDockedPanelService.openedPanels[i].id);
            }
        });
    }
    // monkey patch CKEDITOR.dialog.add method to remove 'popup' option from Link -> Target dropdown
    patchCkEditor() {
        const ckEditorDialogAdd = CKEDITOR.dialog.add.bind(CKEDITOR.dialog);
        CKEDITOR.dialog.add = function (name, dialogDefinition) {
            if (typeof dialogDefinition === 'string') {
                ckEditorDialogAdd(name, dialogDefinition);
            }
            else {
                const patchedDialogDefinitionFunc = function (editor) {
                    const dialogDefinitionObj = dialogDefinition(editor);
                    if (name === 'link') {
                        const linkTargetConfig = dialogDefinitionObj.contents.find((item) => item.id === 'target');
                        get(linkTargetConfig, 'elements[0].children[0].items').splice(2, 1);
                    }
                    return dialogDefinitionObj;
                };
                ckEditorDialogAdd(name, patchedDialogDefinitionFunc);
            }
        };
    }
}
RxApplicationConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, deps: [{ token: i0.Injector }, { token: i1.RxUpgradeTrackerService }, { token: i2.RxGlobalCacheService }, { token: DOCUMENT }, { token: i3.Router }, { token: i4.AdaptModalService }, { token: i4.AdaptDockedPanelService }], target: i0.ɵɵFactoryTarget.Injectable });
RxApplicationConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxApplicationConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.RxUpgradeTrackerService }, { type: i2.RxGlobalCacheService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3.Router }, { type: i4.AdaptModalService }, { type: i4.AdaptDockedPanelService }]; } });
//# sourceMappingURL=application-configurator.service.js.map