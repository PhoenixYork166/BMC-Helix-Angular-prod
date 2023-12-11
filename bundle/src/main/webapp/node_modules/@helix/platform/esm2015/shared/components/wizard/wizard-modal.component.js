import { Component, Injector, ViewChild } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { cloneDeep, findIndex, isNumber } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../dynamic-component-renderer/dynamic-component-renderer.component";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class RxWizardModalComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.activeTabIndex = 0;
        this.config = this.activeModalRef.getData();
        this.isWizardCompleted = false;
        this.nextSubject = new Subject();
        this.next$ = this.nextSubject.asObservable();
        this.api = {
            isCurrentStepActive: (stepId) => {
                return findIndex(this.config.options.steps, { id: stepId }) === this.activeTabIndex;
            },
            addStep: (step, index) => {
                if (isNumber(index)) {
                    this.config.options.steps.splice(index, 0, step);
                    if (index <= this.activeTabIndex) {
                        setTimeout(() => this.next());
                    }
                }
                else {
                    this.config.options.steps.push(step);
                }
            },
            complete: () => {
                this.isWizardDirty = false;
                this.isWizardCompleted = true;
            },
            disableNextButton: () => {
                this.config.options.isNextButtonDisabled = true;
            },
            enableNextButton: () => {
                this.config.options.isNextButtonDisabled = false;
            },
            disablePreviousButton: () => {
                this.config.options.isPreviousButtonDisabled = true;
            },
            enablePreviousButton: () => {
                this.config.options.isPreviousButtonDisabled = false;
            },
            disableFinishButton: () => {
                this.config.options.isFinishButtonDisabled = true;
            },
            enableFinishButton: () => {
                this.config.options.isFinishButtonDisabled = false;
            },
            getSteps() {
                return cloneDeep(this.config.options.steps);
            },
            markPristine: () => {
                this.isWizardDirty = false;
            },
            markDirty: () => {
                this.isWizardDirty = true;
            },
            removeNextSteps: (startIndex) => {
                this.config.options.steps.splice(startIndex);
            },
            removeStep: (index) => {
                this.config.options.steps.splice(index, 1);
            },
            renew: () => {
                this.isWizardCompleted = false;
            },
            setFinishButtonLabel: (label) => {
                this.config.options.finishButtonLabel = label;
            },
            updateContext: (context, markDirty = true) => {
                Object.assign(this.config.context, context);
                this.contextSubject$.next(this.config.context);
                if (markDirty) {
                    this.api.markDirty();
                }
            }
        };
        this.contextSubject$ = new BehaviorSubject(this.config.context);
        this.stepsSubject$ = new BehaviorSubject(this.config.options.steps);
        this.tabIndexSubject$ = new BehaviorSubject(this.activeTabIndex);
        this.isWizardDirty = false;
        this.context$ = this.contextSubject$.asObservable();
        this.steps$ = this.stepsSubject$.asObservable();
        this.tabIndex$ = this.tabIndexSubject$.asObservable();
    }
    isDirty() {
        return this.isWizardDirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.config.options.isPreviousButtonDisabled = true;
        this.config.options.isNextButtonDisabled = false;
        this.config.options.isFinishButtonDisabled = false;
        this.config.options.steps[this.activeTabIndex].isActivated = true;
    }
    tabChanged({ index }) {
        this.activeTabIndex = index;
        this.config.options.steps[this.activeTabIndex].isActivated = true;
        this.config.options.isPreviousButtonDisabled = index === 0;
        this.config.options.isNextButtonDisabled = index === this.config.options.steps.length - 1;
        this.tabIndexSubject$.next(this.activeTabIndex);
        this.stepsSubject$.next(this.config.options.steps);
    }
    back() {
        this.adaptTabset.setActiveTab(this.activeTabIndex - 1, true, null);
    }
    next(force = false) {
        if (!force) {
            this.nextSubject.next(this.config.options.steps[this.activeTabIndex].id);
        }
        if (force || this.config.options.steps[this.activeTabIndex].handlesNext !== true) {
            this.adaptTabset.setActiveTab(this.activeTabIndex + 1, true, null);
        }
    }
    finish() {
        this.activeModalRef.close(this.config.context);
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.nextSubject.complete();
        this.contextSubject$.complete();
        this.stepsSubject$.complete();
        this.tabIndexSubject$.complete();
    }
}
RxWizardModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxWizardModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWizardModalComponent, selector: "rx-wizard-modal", viewQueries: [{ propertyName: "adaptTabset", first: true, predicate: ["adaptTabset"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.options.title }}</h5>\n\n  <button\n    class=\"close dp-close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"alert alert-info mb-0\" role=\"alert\" *ngIf=\"config.options.notificationMessage\">\n  <div class=\"alert-content\">\n    {{ config.options.notificationMessage }}\n  </div>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-tabset\n    #adaptTabset\n    [type]=\"'stacked'\"\n    [tab-active]=\"activeTabIndex\"\n    (tab-active-changed)=\"tabChanged($event)\"\n    class=\"h-100\"\n    customClassTabList=\"stacked-tab-list\"\n  >\n    <adapt-tab-panel *ngFor=\"let step of config.options.steps\" [adapt-tab-title]=\"step.name\" [disabled]=\"true\">\n      <rx-dynamic-component-renderer\n        *ngIf=\"step.isActivated\"\n        [componentFactory]=\"step.componentFactory\"\n        [context]=\"config.context\"\n        [options]=\"step.options\"\n      ></rx-dynamic-component-renderer>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    *ngIf=\"!isWizardCompleted\"\n    (click)=\"close()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    class=\"mr-2 d-icon-left-angle_left\"\n    [disabled]=\"config.options.isPreviousButtonDisabled\"\n    (click)=\"back()\"\n    rx-id=\"previous-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    class=\"mr-2 d-icon-right-angle_right\"\n    *ngIf=\"activeTabIndex < config.options.steps.length - 1\"\n    [disabled]=\"config.options.isNextButtonDisabled\"\n    (click)=\"next()\"\n    rx-id=\"next-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    *ngIf=\"(config.options.allowFinish && activeTabIndex === config.options.steps.length - 1) || isWizardCompleted\"\n    [disabled]=\"config.options.isFinishButtonDisabled\"\n    (click)=\"finish()\"\n    rx-id=\"finish-button\"\n  >\n    {{ config.options.finishButtonLabel }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}:host .modal-body{height:645px;overflow-y:auto}:host adapt-tabset::ng-deep .stacked{flex:0 0 100%}:host adapt-tabset::ng-deep .stacked .tab-toolbar{flex-shrink:0}:host adapt-tabset::ng-deep .stacked .stacked-tab-list .nav-link-title{max-width:160px;text-align:left;white-space:normal}\n"], components: [{ type: i1.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i2.RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: ["componentFactory", "context", "options"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-wizard-modal',
                    templateUrl: './wizard-modal.component.html',
                    styleUrls: ['./wizard-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i0.Injector }]; }, propDecorators: { adaptTabset: [{
                type: ViewChild,
                args: ['adaptTabset', { static: true }]
            }] } });
//# sourceMappingURL=wizard-modal.component.js.map