import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { throwError } from 'rxjs';
import { RX_BUNDLE, Tooltip } from '@helix/platform/shared/api';
import { catchError } from 'rxjs/operators';
import { isEmpty, last } from 'lodash';
import { ProgressIndicatorStatus } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { AxBundleDeploymentService } from '../../../services/bundle-deployment';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "../../../services/bundle-deployment";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
export class CreateBundleModalComponent {
    constructor(context, translateService, axBundleDeploymentService) {
        this.context = context;
        this.translateService = translateService;
        this.axBundleDeploymentService = axBundleDeploymentService;
        this.bundleId = '';
        this.bundleCreationStatus = '';
        this.bundleCreationFinishedMessage = '';
        this.bundleName = '';
        this.bundleShortName = '';
        this.deploymentStatus = ProgressIndicatorStatus;
        this.groupId = '';
        this.type = this.context.getData().type === RX_BUNDLE.bundleTypes.application
            ? this.translateService.instant('com.bmc.arsys.rx.client.common.application.label')
            : this.translateService.instant('com.bmc.arsys.rx.client.common.library.label');
        this.bundleNameTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.name.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
        this.bundleShortNameTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.short-name.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
        this.groupIdTooltip = new Tooltip(this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.group-id.tooltip', {
            bundleType: this.type.toLowerCase()
        }));
    }
    create() {
        this.bundleCreationStatus = ProgressIndicatorStatus.InProgress;
        this.axBundleDeploymentService
            .create({
            id: this.bundleId,
            name: this.bundleShortName,
            friendlyName: this.bundleName,
            developerId: this.groupId,
            isApplication: this.context.getData().type === RX_BUNDLE.bundleTypes.application
        })
            .pipe(catchError((error) => {
            this.bundleCreationStatus = ProgressIndicatorStatus.Failed;
            this.bundleCreationFinishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-bundle.failure.message', { bundleType: this.type });
            return throwError(error);
        }))
            .subscribe((response) => {
            this.axBundleDeploymentService
                .pollDeploymentStatus(last(response.headers.get('location').split('/')))
                .subscribe((deploymentStatus) => {
                if (deploymentStatus.isFinished) {
                    this.bundleCreationStatus = ProgressIndicatorStatus.Finished;
                    this.bundleCreationFinishedMessage = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.bundle.create.successful.label', { bundleType: this.type });
                }
                else if (deploymentStatus.errorMessage) {
                    this.bundleCreationStatus = ProgressIndicatorStatus.Failed;
                    this.bundleCreationFinishedMessage = deploymentStatus.errorMessage;
                }
            });
        });
    }
    close(bundleId) {
        if (!isEmpty(bundleId) && this.bundleCreationStatus === ProgressIndicatorStatus.Finished) {
            this.context.close({ bundleId });
        }
        else {
            this.context.close();
        }
    }
    dismiss() {
        this.context.dismiss();
    }
    setBundleId() {
        this.bundleId = `${this.groupId}.${this.bundleShortName}`;
    }
}
/** @nocollapse */ CreateBundleModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i3.AxBundleDeploymentService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateBundleModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateBundleModalComponent, selector: "ax-create-bundle-modal", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{\n      'com.bmc.arsys.rx.innovation-studio.workspace.bundle.new.label'\n        | translate: { bundleType: this.type.toLowerCase() }\n    }}\n  </h5>\n  <button\n    class=\"close dp-close\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"bundleCreationStatus === deploymentStatus.InProgress\"\n    (click)=\"dismiss()\"\n  ></button>\n</div>\n<div class=\"modal-body\">\n  <form #createBundleForm=\"ngForm\">\n    <adapt-rx-textfield\n      rx-id=\"bundle-name\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.name.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleName\"\n      maxlength=\"254\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"bundleName\"\n      [tooltip]=\"bundleNameTooltip\"\n      [autofocus]=\"true\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"bundle-short-name\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.short-name.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleShortName\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"bundleShortName\"\n      pattern=\"^([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$\"\n      (ngModelChange)=\"setBundleId()\"\n      [tooltip]=\"bundleShortNameTooltip\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"group-id\"\n      label=\"{{ 'com.bmc.arsys.rx.innovation-studio.workspace.groupId.label' | translate }}\"\n      [(ngModel)]=\"groupId\"\n      pattern=\"[a-zA-Z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)*\"\n      required=\"true\"\n      class=\"d-block form-group\"\n      name=\"groupId\"\n      (ngModelChange)=\"setBundleId()\"\n      [tooltip]=\"groupIdTooltip\"\n      [disabled]=\"\n        bundleCreationStatus === deploymentStatus.InProgress || bundleCreationStatus === deploymentStatus.Finished\n      \"\n    >\n    </adapt-rx-textfield>\n    <adapt-rx-textfield\n      rx-id=\"id\"\n      label=\"{{\n        'com.bmc.arsys.rx.innovation-studio.workspace.bundle.id.label' | translate: { bundleType: this.type }\n      }}\"\n      [(ngModel)]=\"bundleId\"\n      class=\"d-block form-group\"\n      name=\"bundleId\"\n      [disabled]=\"true\"\n    >\n    </adapt-rx-textfield>\n  </form>\n  <div *ngIf=\"bundleCreationStatus === deploymentStatus.InProgress\" class=\"progress\" rx-id=\"progress-bar\">\n    <div\n      class=\"progress-bar progress-bar-intermediate\"\n      role=\"progressbar\"\n      style=\"width: 100%\"\n      aria-valuenow=\"100\"\n      aria-valuemin=\"0\"\n      aria-valuemax=\"100\"\n    ></div>\n  </div>\n  <p\n    *ngIf=\"bundleCreationStatus === deploymentStatus.Finished\"\n    class=\"d-icon-left-check_adapt\"\n    rx-id=\"operation-succeeded-message\"\n  >\n    {{ bundleCreationFinishedMessage }}\n  </p>\n  <p\n    *ngIf=\"bundleCreationStatus === deploymentStatus.Failed\"\n    class=\"d-icon-left-exclamation_triangle\"\n    rx-id=\"operation-failed-message\"\n  >\n    {{ bundleCreationFinishedMessage }}\n  </p>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    *ngIf=\"bundleCreationStatus !== deploymentStatus.Finished\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    (click)=\"create()\"\n    [disabled]=\"\n      bundleCreationStatus === deploymentStatus.InProgress || createBundleForm.pristine || createBundleForm.invalid\n    \"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"close(bundleId)\"\n    [disabled]=\"bundleCreationStatus === deploymentStatus.InProgress\"\n    rx-id=\"close-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.d-icon-left-check_adapt:before{color:#00a79d}.d-icon-left-exclamation_triangle:before{color:#f83200}\n"], components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateBundleModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-create-bundle-modal',
                    templateUrl: './create-bundle-modal.component.html',
                    styleUrls: ['./create-bundle-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i3.AxBundleDeploymentService }]; } });
//# sourceMappingURL=create-bundle-modal.component.js.map