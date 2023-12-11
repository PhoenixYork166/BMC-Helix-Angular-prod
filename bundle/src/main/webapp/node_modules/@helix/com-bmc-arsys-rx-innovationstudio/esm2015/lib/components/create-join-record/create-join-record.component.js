import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxRecordDefinitionCacheService, RxRecordDefinitionService, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxBundleCacheService, RX_APPLICATION } from '@helix/platform/shared/api';
import { finalize, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { JoinCriteriaExpressionConfigurator } from './join-criteria-expression-configurator';
import { RxRecordDesignerService } from '@helix/platform/record/designer';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/record/api";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@angular/router";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@helix/platform/record/designer";
import * as i8 from "@angular/forms";
export class CreateJoinRecordComponent extends RxModalClass {
    constructor(injector, activeModalRef, rxRecordDefinitionService, rxDefinitionNameService, rxBundleCache, router, translateService, rxRecordDefinitionCacheService, rxExpressionEditorService, rxRecordDesignerService, changeDetector) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.rxRecordDefinitionService = rxRecordDefinitionService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxBundleCache = rxBundleCache;
        this.router = router;
        this.translateService = translateService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxRecordDesignerService = rxRecordDesignerService;
        this.changeDetector = changeDetector;
        this.destroyed$ = new ReplaySubject(1);
        this.expressionFormControlLabel = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.label');
        this.expressionFormControlTooltip = this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.tooltip');
        this.primaryRecordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.primary-record.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.secondaryRecordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.secondary-record.label'),
            definitionType: RxDefinitionPickerType.Record,
            required: true
        };
        this.joinTypes = [RX_RECORD_DEFINITION.joinTypes.inner, RX_RECORD_DEFINITION.joinTypes.outer];
        this.primaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.secondaryRecordDefinitionNameFormControl = new FormControl('', Validators.required);
        this.primaryRecordDefinition$ = this.primaryRecordDefinitionNameFormControl.valueChanges.pipe(startWith(null), switchMap((primaryRecordDefinitionName) => primaryRecordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(primaryRecordDefinitionName)
            : of(null)), shareReplay(1));
        this.secondaryRecordDefinition$ = this.secondaryRecordDefinitionNameFormControl.valueChanges.pipe(startWith(null), switchMap((secondaryRecordDefinitionName) => secondaryRecordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordDefinition(secondaryRecordDefinitionName)
            : of(null)), shareReplay(1));
        this.createJoinRecordForm = new FormGroup({
            name: new FormControl('', Validators.required),
            primaryRecordDefinitionName: this.primaryRecordDefinitionNameFormControl,
            secondaryRecordDefinitionName: this.secondaryRecordDefinitionNameFormControl,
            joinType: new FormControl([], Validators.required),
            joinCriteria: new FormControl('')
        });
        this.expressionConfigurator = new JoinCriteriaExpressionConfigurator(this.primaryRecordDefinition$, this.secondaryRecordDefinition$, this.injector);
        this.expressionFormControlOptions = {
            label: this.expressionFormControlLabel,
            tooltip: {
                iconName: 'question_circle_o',
                content: this.expressionFormControlTooltip
            },
            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
            operators: this.expressionConfigurator.getOperators()
        };
    }
    ngOnInit() {
        super.ngOnInit();
        combineLatest([this.primaryRecordDefinition$, this.secondaryRecordDefinition$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            this.createJoinRecordForm.controls.joinCriteria.reset();
        });
    }
    optionFormatter(selectOption) {
        return selectOption.displayName;
    }
    openEditor() {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                value: this.createJoinRecordForm.controls.joinCriteria.value,
                path: 'joinCriteria',
                label: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-criteria.on-statement.label')
            },
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.field.label'),
                    icon: 'd-icon-field_text'
                }
            ]
        })
            .pipe(takeUntil(this.destroyed$))
            .subscribe((expression) => {
            this.createJoinRecordForm.controls.joinCriteria.setValue(expression.value);
            this.changeDetector.markForCheck();
        });
    }
    createRecord() {
        const createJoinRecordFormValue = this.createJoinRecordForm.value;
        const recordDefinitionName = this.rxDefinitionNameService.getDefinitionName(this.rxBundleCache.bundleId, createJoinRecordFormValue.name);
        const joinRecordDefinition = {
            allowFieldsOverlay: false,
            allowIndexesOverlay: false,
            allowNonAdminToDeleteRecordInstances: false,
            allowOtherPropertiesOverlay: false,
            allowPermissionsOverlay: false,
            name: recordDefinitionName,
            primaryRecordDefinitionName: createJoinRecordFormValue.primaryRecordDefinitionName,
            secondaryRecordDefinitionName: createJoinRecordFormValue.secondaryRecordDefinitionName,
            joinType: createJoinRecordFormValue.joinType[0].value,
            joinCriteria: this.rxRecordDesignerService.getJoinCriteriaArExpression(createJoinRecordFormValue.joinCriteria, createJoinRecordFormValue.primaryRecordDefinitionName, createJoinRecordFormValue.secondaryRecordDefinitionName),
            resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.join.recordDefinitionType,
            fieldDefinitions: [
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'Display ID',
                    id: 1,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                },
                {
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character,
                    name: 'ID',
                    id: 379,
                    fieldOption: RX_RECORD_DEFINITION.fieldOptions.system
                }
            ]
        };
        this.allowDismiss = false;
        this.rxRecordDefinitionService
            .create(joinRecordDefinition)
            .pipe(finalize(() => {
            this.allowDismiss = true;
            this.changeDetector.markForCheck();
        }))
            .subscribe(() => {
            this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'record', 'edit2', recordDefinitionName]);
        });
    }
    cancel() {
        this.dismissDialog();
    }
}
/** @nocollapse */ CreateJoinRecordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordComponent, deps: [{ token: i0.Injector }, { token: i1.ActiveModalRef }, { token: i2.RxRecordDefinitionService }, { token: i3.RxDefinitionNameService }, { token: i3.RxBundleCacheService }, { token: i4.Router }, { token: i5.TranslateService }, { token: i2.RxRecordDefinitionCacheService }, { token: i6.RxExpressionEditorService }, { token: i7.RxRecordDesignerService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ CreateJoinRecordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CreateJoinRecordComponent, selector: "rx-create-join-record", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{ 'com.bmc.arsys.rx.client.record-designer.create-new-join-record-editor.title' | translate }}\n  </h5>\n  <button\n    class=\"close close-inverse\"\n    data-dismiss=\"modal\"\n    type=\"button\"\n    rx-id=\"x-button\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"d-flex flex-column control-width\">\n    <form [formGroup]=\"createJoinRecordForm\">\n      <adapt-rx-textfield\n        autofocus\n        rx-id=\"name\"\n        class=\"d-block form-group\"\n        formControlName=\"name\"\n        label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n      ></adapt-rx-textfield>\n\n      <rx-definition-picker\n        class=\"d-block form-group\"\n        rx-id=\"primary-record-definition-name\"\n        [options]=\"primaryRecordDefinitionPickerOptions\"\n        formControlName=\"primaryRecordDefinitionName\"\n      ></rx-definition-picker>\n\n      <rx-definition-picker\n        class=\"d-block form-group\"\n        rx-id=\"secondary-record-definition-name\"\n        [options]=\"secondaryRecordDefinitionPickerOptions\"\n        formControlName=\"secondaryRecordDefinitionName\"\n      ></rx-definition-picker>\n\n      <adapt-rx-select\n        class=\"d-block form-group\"\n        rx-id=\"join-type\"\n        [required]=\"true\"\n        [label]=\"'com.bmc.arsys.rx.innovation-studio.create-join-record-modal.join-type.label' | translate\"\n        [options]=\"joinTypes\"\n        [optionFormatter]=\"optionFormatter\"\n        formControlName=\"joinType\"\n      ></adapt-rx-select>\n\n      <rx-expression-form-control\n        rx-id=\"join-criteria\"\n        class=\"d-block form-group\"\n        (events)=\"openEditor()\"\n        [options]=\"expressionFormControlOptions\"\n        formControlName=\"joinCriteria\"\n      ></rx-expression-form-control>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"createJoinRecordForm.pristine || createJoinRecordForm.invalid || !allowDismiss\"\n    (click)=\"createRecord()\"\n    rx-id=\"create-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.create.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    [disabled]=\"!allowDismiss\"\n    (click)=\"cancel()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i6.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i6.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i8.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i8.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i5.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CreateJoinRecordComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-create-join-record',
                    templateUrl: './create-join-record.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.ActiveModalRef }, { type: i2.RxRecordDefinitionService }, { type: i3.RxDefinitionNameService }, { type: i3.RxBundleCacheService }, { type: i4.Router }, { type: i5.TranslateService }, { type: i2.RxRecordDefinitionCacheService }, { type: i6.RxExpressionEditorService }, { type: i7.RxRecordDesignerService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=create-join-record.component.js.map