import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RX_APPLICATION } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { assign, cloneDeep, compact, includes, initial, last, some } from 'lodash';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, pluck, shareReplay, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
export class OptionsWizardStepComponent {
    constructor(rxWizardModalComponent, translateService) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.translateService = translateService;
        this.versionRegexp = /^((\d+\.\d+)(\.\d+)?)(.*)$/;
        this.isApplication$ = this.rxWizardModalComponent.context$.pipe(take(1), pluck('bundleDetails', 'isApplication'));
        this.bundlesList$ = this.rxWizardModalComponent.context$.pipe(take(1), map((context) => context.bundleDescriptors
            .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName))
            .reduce((result, bundleDescriptor) => {
            if (!includes([
                RX_APPLICATION.standardlib,
                RX_APPLICATION.innovationStudioBundleId,
                RX_APPLICATION.platformBundleId,
                context.bundleDetails.id
            ], bundleDescriptor.id)) {
                result.push(Object.assign({}, bundleDescriptor));
            }
            return result;
        }, [])), shareReplay(1));
        this.destroyed$ = new ReplaySubject(1);
        this.versionIncrementValidator = (fromVersionControl) => (control) => {
            let isValidateIncrementation = true;
            if ((fromVersionControl === null || fromVersionControl === void 0 ? void 0 : fromVersionControl.value) && control.value && this.versionRegexp.test(control.value)) {
                isValidateIncrementation = this.isValidateIncrementation(fromVersionControl.value, control.value);
            }
            return isValidateIncrementation
                ? null
                : {
                    invalidVersion: {
                        value: control.value,
                        message: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.version-increment.error.message')
                    }
                };
        };
    }
    ngOnInit() {
        combineLatest([this.bundlesList$, this.rxWizardModalComponent.context$])
            .pipe(take(1))
            .subscribe(([bundlesList, context]) => {
            var _a, _b, _c, _d, _e, _f;
            const dependentBundles = bundlesList.filter((bundleDescriptor) => some(context.bundleDetails.dependentBundles, { id: bundleDescriptor.id }));
            const optionsFormGroup = {};
            if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.bundleUpdateFromVersion) {
                optionsFormGroup.bundleUpdateFromVersion = new FormControl(context.deploymentPackageDescriptor.bundleUpdateFromVersion);
            }
            if ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.fields) === null || _d === void 0 ? void 0 : _d.customPackageName) {
                optionsFormGroup.customPackageName = new FormControl(context.deploymentPackageDescriptor.customPackageName);
            }
            Object.assign(optionsFormGroup, {
                id: new FormControl(context.bundleDetails.id),
                friendlyName: new FormControl(context.deploymentPackageDescriptor.friendlyName, [Validators.required]),
                version: new FormControl(context.deploymentPackageDescriptor.version, compact([
                    Validators.required,
                    Validators.pattern(this.versionRegexp),
                    ((_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.fields) === null || _f === void 0 ? void 0 : _f.bundleUpdateFromVersion)
                        ? this.versionIncrementValidator(optionsFormGroup.bundleUpdateFromVersion)
                        : null
                ])),
                description: new FormControl(context.deploymentPackageDescriptor.description, [Validators.required]),
                dependentBundles: new FormControl(dependentBundles)
            });
            this.optionsForm = new FormGroup(optionsFormGroup);
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, {
                friendlyName: context.bundleDetails.friendlyName,
                version: context.bundleDetails.version,
                description: context.bundleDetails.description,
                id: context.bundleDetails.id,
                dependentBundles: dependentBundles.map((dependentBundleDetails) => ({
                    id: dependentBundleDetails.id,
                    name: dependentBundleDetails.friendlyName,
                    version: dependentBundleDetails.version
                }))
            });
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            }, false);
        });
        this.optionsForm.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([value, context]) => {
            const newDeploymentPackageDescriptor = cloneDeep(context.deploymentPackageDescriptor);
            assign(newDeploymentPackageDescriptor, value);
            newDeploymentPackageDescriptor.dependentBundles = value.dependentBundles.map((dependentBundleDetails) => ({
                id: dependentBundleDetails.id,
                name: dependentBundleDetails.friendlyName,
                version: dependentBundleDetails.version
            }));
            this.rxWizardModalComponent.api.updateContext({
                deploymentPackageDescriptor: newDeploymentPackageDescriptor
            });
            if (this.optionsForm.valid) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    optionFormatter(field) {
        return `${field.friendlyName}, ${field.version}`;
    }
    isValidateIncrementation(currentVersion, newVersion) {
        let isUpdateToVersionIncrementedCorrectly = false;
        const newVersionBase = this.getBaseVersion(newVersion);
        const currentVersionBase = this.getBaseVersion(currentVersion);
        if (newVersionBase) {
            const newVersionBaseProperties = newVersionBase.split('.');
            const currentVersionBaseProperties = currentVersionBase.split('.');
            // check if the last digit incremented correctly
            // e.g. 1.1 > 1.2
            //      1.1 > 1.1.1
            //      1.1.0 > 1.1.1
            const isTheLastDigitNotDecremented = newVersionBaseProperties.length === currentVersionBaseProperties.length
                ? +last(newVersionBaseProperties) >= +last(currentVersionBaseProperties)
                : +last(initial(newVersionBaseProperties)) >= +last(currentVersionBaseProperties);
            // create regular expression based on current version
            // only the last and additional component can be changed
            // e.g. 1.1.0 > 1.1.n or 1.1.n-SNAPSHOT
            //      1.0 > 1.n or 1.n-SNAPSHOT or 1.1.n or 1.1.n-SNAPSHOT
            const correctRegExpGroup = currentVersionBaseProperties.length === 3 ? 2 : 3;
            const regExpSuffix = correctRegExpGroup === 2 ? '(\\.\\d+)' : '(\\.\\d+)(\\.\\d+)?';
            const updateToVersionRegExp = new RegExp('^' + currentVersionBase.match(this.versionRegexp)[correctRegExpGroup] + regExpSuffix + '$');
            isUpdateToVersionIncrementedCorrectly =
                updateToVersionRegExp.test(newVersionBase) && isTheLastDigitNotDecremented;
        }
        return isUpdateToVersionIncrementedCorrectly;
    }
    // get version without the optional qualifier, e.g. 1.1.0-SNAPSHOT > 1.1.0
    getBaseVersion(version) {
        const baseVersion = version.match(this.versionRegexp);
        return baseVersion ? baseVersion[1] : null;
    }
}
/** @nocollapse */ OptionsWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ OptionsWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionsWizardStepComponent, selector: "ax-options-wizard-step", inputs: { options: "options" }, ngImport: i0, template: "<h5 class=\"mt-0\">{{ 'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.label' | translate }}</h5>\n\n<ng-container [formGroup]=\"optionsForm\">\n  <div class=\"row h-100\">\n    <div class=\"col-6\">\n      <adapt-rx-textfield\n        *ngIf=\"options?.fields.customPackageName\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.packaging.package-name.label' | translate\"\n        class=\"d-block form-group\"\n        formControlName=\"customPackageName\"\n        name=\"customPackageName\"\n        required=\"true\"\n      ></adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"\n          ((isApplication$ | async)\n            ? 'com.bmc.arsys.rx.client.common.application-name.label'\n            : 'com.bmc.arsys.rx.client.common.library-name.label'\n          ) | translate\n        \"\n        formControlName=\"friendlyName\"\n        required=\"true\"\n        [readonly]=\"options?.fields.friendlyName?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"friendlyName\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        *ngIf=\"options?.fields?.bundleUpdateFromVersion\"\n        [disabledStyleForReadonlyState]=\"true\"\n        [label]=\"\n          'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-from-version.label' | translate\n        \"\n        [pattern]=\"versionRegexp\"\n        [readonly]=\"true\"\n        class=\"d-block form-group\"\n        formControlName=\"bundleUpdateFromVersion\"\n        name=\"bundleUpdateFromVersion\"\n        [tooltip]=\"{\n          content: options?.fields.bundleUpdateFromVersion?.tooltip || bundleUpdateFromVersionTooltip,\n          iconName: 'question_circle_o',\n          placement: 'right'\n        }\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"options?.fields.version?.label || 'com.bmc.arsys.rx.client.common.version.label' | translate\"\n        formControlName=\"version\"\n        required=\"true\"\n        [readonly]=\"options?.fields.version?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"version\"\n        [pattern]=\"versionRegexp\"\n        [class.mb-0]=\"optionsForm.controls.version.errors?.invalidVersion\"\n        [tooltip]=\"\n          options?.fields.version?.hideTooltip\n            ? null\n            : {\n                content: versionTooltip,\n                iconName: 'question_circle_o',\n                placement: 'right'\n              }\n        \"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        [label]=\"'com.bmc.arsys.rx.client.common.description.label' | translate\"\n        formControlName=\"description\"\n        required=\"true\"\n        [readonly]=\"options?.fields.description?.disabled\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"description\"\n      >\n      </adapt-rx-textfield>\n\n      <adapt-rx-textfield\n        formControlName=\"id\"\n        [label]=\"\n          ((isApplication$ | async)\n            ? 'com.bmc.arsys.rx.client.common.application-id.label'\n            : 'com.bmc.arsys.rx.client.common.library-id.label'\n          ) | translate\n        \"\n        [readonly]=\"true\"\n        [disabledStyleForReadonlyState]=\"true\"\n        class=\"d-block form-group\"\n        name=\"id\"\n      >\n      </adapt-rx-textfield>\n    </div>\n\n    <div class=\"col-6 d-flex flex-column h-100\" *ngIf=\"!options?.fields.dependentBundlesList?.hidden\">\n      <adapt-rx-select\n        [inline]=\"true\"\n        [multiple]=\"true\"\n        [options]=\"bundlesList$ | async\"\n        [optionFormatter]=\"optionFormatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [popupMaxHeight]=\"560\"\n        [formControl]=\"optionsForm.controls.dependentBundles\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.depends-on.label' | translate\"\n        class=\"h-100\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #bundleUpdateFromVersionTooltip>\n  <div\n    [innerHTML]=\"\n      'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.update-from-version.tooltip' | translate\n    \"\n  ></div>\n</ng-template>\n\n<ng-template #versionTooltip>\n  <div\n    *ngIf=\"options?.fields.version?.tooltip; else defaultVersionTooltip\"\n    [innerHTML]=\"options?.fields.version?.tooltip | translate\"\n  ></div>\n</ng-template>\n\n<ng-template #defaultVersionTooltip>\n  <div\n    [innerHTML]=\"'com.bmc.arsys.rx.innovation-studio.bundle-action-wizard.options.version.tooltip' | translate\"\n  ></div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;height:100%}.ax-dependent-bundles-list{overflow-y:scroll}\n"], components: [{ type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i2.TranslatePipe, "async": i5.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionsWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-options-wizard-step',
                    templateUrl: 'options-wizard-step.component.html',
                    styleUrls: ['./options-wizard-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=options-wizard-step.component.js.map