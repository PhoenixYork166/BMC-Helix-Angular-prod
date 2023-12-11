import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionPickerScope, RxDefinitionPickerType, RxWizardModalComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { head } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/forms";
export class RecordDefinitionsStepComponent {
    constructor(translateService, rxWizardModalComponent) {
        this.translateService = translateService;
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.destroyed$ = new ReplaySubject(1);
        this.definitionPickerConfig = {
            label: '',
            definitionType: RxDefinitionPickerType.Record,
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            },
            required: true
        };
        this.primaryDefinitionPickerConfig = Object.assign(Object.assign({}, this.definitionPickerConfig), { label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.primary-record.label') });
        this.secondaryDefinitionPickerConfig = Object.assign(Object.assign({}, this.definitionPickerConfig), { label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.secondary-record.label') });
        this.joinTypes = [RX_RECORD_DEFINITION.joinTypes.inner, RX_RECORD_DEFINITION.joinTypes.outer];
        this.primaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.secondaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.joinTypeFormControl = new FormControl([], Validators.required);
    }
    optionFormatter(selectOption) {
        return selectOption.displayName;
    }
    ngOnInit() {
        this.rxWizardModalComponent.api.disableFinishButton();
        this.rxWizardModalComponent.api.disableNextButton();
        this.primaryRecordDefinitionNameFormControl.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([primaryRecordDefinitionName, context]) => {
            const newContext = { primaryRecordDefinitionName };
            if (primaryRecordDefinitionName !== context.primaryRecordDefinitionName) {
                newContext.joinCriteria = null;
                newContext.selectedFields = null;
            }
            this.rxWizardModalComponent.api.updateContext(newContext);
        });
        this.secondaryRecordDefinitionNameFormControl.valueChanges
            .pipe(withLatestFrom(this.rxWizardModalComponent.context$), takeUntil(this.destroyed$))
            .subscribe(([secondaryRecordDefinitionName, context]) => {
            const newContext = { secondaryRecordDefinitionName };
            if (secondaryRecordDefinitionName !== context.primaryRecordDefinitionName) {
                newContext.joinCriteria = null;
                newContext.selectedFields = null;
            }
            this.rxWizardModalComponent.api.updateContext(newContext);
        });
        this.joinTypeFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((joinType) => {
            this.rxWizardModalComponent.api.updateContext({
                joinType: head(joinType).value
            });
        });
        this.rxWizardModalComponent.context$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((context) => {
            if (context.primaryRecordDefinitionName && context.secondaryRecordDefinitionName && context.joinType) {
                this.rxWizardModalComponent.api.enableNextButton();
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
/** @nocollapse */ RecordDefinitionsStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionsStepComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ RecordDefinitionsStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordDefinitionsStepComponent, selector: "ax-record-definitions-step", ngImport: i0, template: "<div class=\"d-flex flex-column control-width\">\n  <rx-definition-picker\n    [options]=\"primaryDefinitionPickerConfig\"\n    [formControl]=\"primaryRecordDefinitionNameFormControl\"\n    class=\"form-group\"\n  ></rx-definition-picker>\n\n  <rx-definition-picker\n    [options]=\"secondaryDefinitionPickerConfig\"\n    [formControl]=\"secondaryRecordDefinitionNameFormControl\"\n    class=\"form-group\"\n  ></rx-definition-picker>\n\n  <adapt-rx-select\n    [required]=\"true\"\n    [label]=\"'com.bmc.arsys.rx.innovation-studio.join-record-wizard.record-definitions.type.label' | translate\"\n    [options]=\"joinTypes\"\n    [optionFormatter]=\"optionFormatter\"\n    [formControl]=\"joinTypeFormControl\"\n  ></adapt-rx-select>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.control-width{max-width:400px}\n"], components: [{ type: i2.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionsStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-record-definitions-step',
                    templateUrl: './record-definitions-step.component.html',
                    styleUrls: ['./record-definitions-step.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxWizardModalComponent }]; } });
//# sourceMappingURL=record-definitions-step.component.js.map