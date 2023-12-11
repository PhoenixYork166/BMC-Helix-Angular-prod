import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RxCommandFactoryService, RxServerErrorHandlerService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, forEach, isEmpty, last, some } from 'lodash';
import { BehaviorSubject, combineLatest, EMPTY, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment/bundle-deployment.service';
import { AX_BUNDLE_DETAILS } from '../../bundle-details/bundle-details.constant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../../services/bundle-deployment/bundle-deployment.service";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
export class PackageWizardStepComponent {
    constructor(httpClient, axBundleDeploymentService, rxCommandFactoryService, rxServerErrorHandlerService, rxUtilityModalsService, rxWizardModalComponent, translateService) {
        this.httpClient = httpClient;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxServerErrorHandlerService = rxServerErrorHandlerService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.queueCreateDeploymentPackageCommand = this.rxCommandFactoryService.forResourceType('com.bmc.arsys.rx.application.bundledeploy.command.QueueCreateDeploymentPackageCommand');
        this.destroyed$ = new ReplaySubject(1);
        this.operationStatusSubject = new BehaviorSubject('');
        this.operationStatus$ = this.operationStatusSubject.asObservable();
        this.operationStatusMessage = null;
        this.operationStatuses = {
            pending: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.pending.label'),
            failed: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.failed.label'),
            succeeded: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.status.succeeded.label')
        };
        this.isApprovalConfigurationDataIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => !isEmpty(context.deploymentPackageDescriptor.approvalConfigurationQueryOptions)));
        this.isConfigurationDataIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || context.deploymentPackageDescriptor.isConfigurationDataIncluded));
        this.isDataImportOptionsByRecordDefinitionNameIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation ||
            !isEmpty(context.deploymentPackageDescriptor.dataImportOptionsByRecordDefinitionName)));
        this.isDefinitionsToDeleteByTypeIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || !isEmpty(context.deploymentPackageDescriptor.definitionsToDeleteByType)));
        this.isDefinitionsToDeployByTypeIncluded$ = this.rxWizardModalComponent.context$.pipe(map((context) => this.options.isInstallOperation || !isEmpty(context.deploymentPackageDescriptor.definitionsToDeployByType)));
        this.isPackageDataEmpty$ = combineLatest([
            this.isDefinitionsToDeployByTypeIncluded$,
            this.isDataImportOptionsByRecordDefinitionNameIncluded$,
            this.isConfigurationDataIncluded$,
            this.isDefinitionsToDeleteByTypeIncluded$
        ]).pipe(map((params) => params.every((value) => !value)));
        this.isCreatePackageButtonDisabled$ = this.rxWizardModalComponent.context$.pipe(withLatestFrom(this.isPackageDataEmpty$, this.operationStatus$), map(([context, isPackageDataEmpty, operationStatus]) => operationStatus === this.operationStatuses.pending || !context.isPackageDataModified || isPackageDataEmpty));
    }
    ngOnInit() {
        var _a;
        this.isAllPackageDataIncluded$ = combineLatest([
            this.isDefinitionsToDeployByTypeIncluded$,
            this.isDataImportOptionsByRecordDefinitionNameIncluded$,
            this.isConfigurationDataIncluded$,
            this.isDefinitionsToDeleteByTypeIncluded$
        ].concat(((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) ? [this.isApprovalConfigurationDataIncluded$] : [])).pipe(map((params) => params.every(Boolean)));
        this.rxWizardModalComponent.steps$
            .pipe(withLatestFrom(this.rxWizardModalComponent.tabIndex$, this.operationStatus$), takeUntil(this.destroyed$))
            .subscribe(([steps, tabIndex, operationStatus]) => {
            if (steps[tabIndex].id === 'package' && operationStatus !== this.operationStatuses.succeeded) {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    createPackage(forceStart = false) {
        this.rxWizardModalComponent.context$
            .pipe(take(1), tap(() => {
            var _a;
            this.rxWizardModalComponent.api.updateContext({
                isPackageDataModified: false
            });
            this.operationStatusSubject.next(this.operationStatuses.pending);
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.isContentPackageOperation) {
                this.rxWizardModalComponent.api.setFinishButtonLabel(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.close-and-continue-packaging.label'));
                this.rxWizardModalComponent.api.complete();
            }
        }), map((context) => {
            const parameters = {
                bundlePackageDescriptor: cloneDeep(context.deploymentPackageDescriptor),
                shouldForce: forceStart
            };
            forEach(parameters.bundlePackageDescriptor.dataImportOptionsByRecordDefinitionName, (dataImportOptionByRecordDefinitionName) => {
                delete dataImportOptionByRecordDefinitionName.dataFilterColumnExpressionFormControlOptions;
                delete dataImportOptionByRecordDefinitionName.dataFilterExpression;
                delete dataImportOptionByRecordDefinitionName.defaultFilter;
            });
            return parameters;
        }), switchMap((parameters) => this.queueCreateDeploymentPackageCommand.execute(parameters, { responseType: 'text' })), tap((response) => {
            this.guid = last(response.split('/'));
            this.rxWizardModalComponent.api.updateContext({
                packageGuid: this.guid
            });
        }), switchMap(() => this.axBundleDeploymentService
            .pollDeploymentStatus(this.guid, '/api/rx/application/bundle/createpackagestatus')
            .pipe(takeUntil(this.destroyed$))), tap((deploymentStatus) => {
            if (deploymentStatus.isFinished) {
                this.operationStatusSubject.next(this.operationStatuses.succeeded);
                this.rxWizardModalComponent.api.setFinishButtonLabel(this.translateService.instant('com.bmc.arsys.rx.client.common.close.label'));
                this.rxWizardModalComponent.api.complete();
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else if (deploymentStatus.errorMessage) {
                this.operationStatusSubject.next(this.operationStatuses.failed);
                this.operationStatusMessage = deploymentStatus.errorMessage;
            }
        }), catchError((error) => {
            this.operationStatusSubject.next(this.operationStatuses.failed);
            this.rxWizardModalComponent.api.disableNextButton();
            this.rxWizardModalComponent.api.renew();
            const errorDetails = this.rxServerErrorHandlerService.getServerResponseErrorDetails(error.error);
            if (some(errorDetails, { messageNumber: AX_BUNDLE_DETAILS.errorCodes.packageCreationAlreadyInProgress })) {
                this.rxUtilityModalsService
                    .confirm(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.creation-operation-in-progress.message'))
                    .then((isConfirmed) => {
                    if (isConfirmed) {
                        this.createPackage(true);
                    }
                    else {
                        this.rxWizardModalComponent.api.updateContext({ isPackageDataModified: true });
                    }
                });
            }
            return EMPTY;
        }))
            .subscribe();
    }
}
/** @nocollapse */ PackageWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepComponent, deps: [{ token: i1.HttpClient }, { token: i2.AxBundleDeploymentService }, { token: i3.RxCommandFactoryService }, { token: i3.RxServerErrorHandlerService }, { token: i4.RxUtilityModalsService }, { token: i5.RxWizardModalComponent }, { token: i6.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PackageWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: PackageWizardStepComponent, selector: "ax-package-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.label' | translate }}</h5>\n\n<button\n  adapt-button\n  btn-type=\"primary\"\n  rx-id=\"create-package-button\"\n  type=\"button\"\n  (click)=\"createPackage()\"\n  [disabled]=\"isCreatePackageButtonDisabled$ | async\"\n>\n  {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.create-package.label' | translate }}\n</button>\n\n<span\n  class=\"empty-package-warning d-icon-left-exclamation_triangle\"\n  rx-id=\"empty-package-message\"\n  [hidden]=\"!(isPackageDataEmpty$ | async)\"\n>\n  {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.empty-package.message' | translate }}\n</span>\n\n<ng-container *ngIf=\"!(isPackageDataEmpty$ | async)\">\n  <h6>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.included.label' | translate }}:</h6>\n\n  <ul>\n    <li [hidden]=\"!(isDefinitionsToDeployByTypeIncluded$ | async)\">\n      {{\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n          | translate\n      }}\n    </li>\n    <li [hidden]=\"!(isDataImportOptionsByRecordDefinitionNameIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.data-items.label' | translate }}\n    </li>\n    <li [hidden]=\"!(isConfigurationDataIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.configuration-data.label' | translate }}\n    </li>\n    <li [hidden]=\"!(isApprovalConfigurationDataIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.approval-configurations.label' | translate }}\n    </li>\n    <li [hidden]=\"!(!options?.isInstallOperation && isDefinitionsToDeleteByTypeIncluded$ | async)\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.definitions-to-delete.label' | translate }}\n    </li>\n  </ul>\n</ng-container>\n\n<ng-container *ngIf=\"!(isAllPackageDataIncluded$ | async)\">\n  <h6>{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.not-included.label' | translate }}:</h6>\n\n  <ul>\n    <li [hidden]=\"isDefinitionsToDeployByTypeIncluded$ | async\">\n      {{\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.select-definitions.customized-definitions.label'\n          | translate\n      }}\n    </li>\n    <li [hidden]=\"isDataImportOptionsByRecordDefinitionNameIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.data-items.label' | translate }}\n    </li>\n    <li [hidden]=\"isConfigurationDataIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.configuration-data.label' | translate }}\n    </li>\n    <li [hidden]=\"!(options?.isContentPackageOperation && !(isApprovalConfigurationDataIncluded$ | async))\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.approval-configurations.label' | translate }}\n    </li>\n    <li [hidden]=\"isDefinitionsToDeleteByTypeIncluded$ | async\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.definitions-to-delete.label' | translate }}\n    </li>\n  </ul>\n</ng-container>\n\n<div class=\"mt-4\" *ngIf=\"operationStatus$ | async as operationStatus\">\n  <div *ngIf=\"operationStatus === operationStatuses.pending\">\n    <div class=\"mb-3\">\n      {{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.creating-package.message' | translate }}\n    </div>\n\n    <div class=\"progress\">\n      <div\n        class=\"progress-bar progress-bar-intermediate w-100\"\n        role=\"progressbar\"\n        aria-valuenow=\"100\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n      ></div>\n    </div>\n  </div>\n\n  <adapt-alert\n    *ngIf=\"operationStatus === operationStatuses.succeeded\"\n    [config]=\"{\n      content: translateService.instant(\n        'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.packaging-completed.message'\n      ),\n      dismissible: false,\n      type: 'inline',\n      variant: 'success'\n    }\"\n  ></adapt-alert>\n\n  <div *ngIf=\"operationStatus === operationStatuses.failed\">\n    <adapt-alert\n      [config]=\"{\n        content: translateService.instant(\n          'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.package.packaging-failed.message'\n        ),\n        dismissible: false,\n        type: 'inline',\n        variant: 'danger'\n      }\"\n    ></adapt-alert>\n\n    <adapt-rx-textarea\n      *ngIf=\"operationStatusMessage\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      [ngModel]=\"operationStatusMessage\"\n      rx-id=\"messages-textarea\"\n      rows=\"13\"\n      [disabledStyleForReadonlyState]=\"true\"\n      [readonly]=\"true\"\n    ></adapt-rx-textarea>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.empty-package-warning{margin-left:15px}.empty-package-warning:before{color:#f1b521}\n"], components: [{ type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i7.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i7.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i6.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PackageWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-package-wizard-step',
                    templateUrl: './package-wizard-step.component.html',
                    styleUrls: ['./package-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AxBundleDeploymentService }, { type: i3.RxCommandFactoryService }, { type: i3.RxServerErrorHandlerService }, { type: i4.RxUtilityModalsService }, { type: i5.RxWizardModalComponent }, { type: i6.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=package-wizard-step.component.js.map