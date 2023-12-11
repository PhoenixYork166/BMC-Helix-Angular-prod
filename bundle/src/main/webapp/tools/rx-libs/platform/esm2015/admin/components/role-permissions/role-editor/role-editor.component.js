import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxGlobalCacheService, RxGroupDataPageService, RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { find, map as _map } from 'lodash';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { RX_ROLE_PERMISSIONS } from '../role-permissions.constant';
import { RxRolePermissionsService } from '../role-permissions.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "../role-permissions.service";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@angular/forms";
import * as i6 from "@helix/platform/ui-kit";
export class RoleEditorComponent extends RxModalClass {
    constructor(rxGlobalCacheService, rxGroupDataPageService, rxRolePermissionsService, rxNotificationService, dockedPanelContext, translateService, injector) {
        super(dockedPanelContext, injector);
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxGroupDataPageService = rxGroupDataPageService;
        this.rxRolePermissionsService = rxRolePermissionsService;
        this.rxNotificationService = rxNotificationService;
        this.dockedPanelContext = dockedPanelContext;
        this.translateService = translateService;
        this.injector = injector;
        this.isEditMode = false;
        this.isSaveInProgress = false;
        this.isSaveButtonDisabled = true;
        this.maxRoleId = RX_ROLE_PERMISSIONS.maxRoleId;
        this.minRoleId = RX_ROLE_PERMISSIONS.minRoleId;
        this.validDefinitionNameRegex = RX_RECORD_DEFINITION.validDefinitionNameRegex;
        this.destroyed$ = new ReplaySubject(1);
        this.validatorFn = this.roleNameValidator.bind(this);
        this.testSearch = (text$) => text$.pipe(distinctUntilChanged(), map((term) => this.groupList.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
        this.productionSearch = (text$) => text$.pipe(distinctUntilChanged(), map((term) => this.groupList.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));
    }
    ngOnInit() {
        super.ngOnInit();
        this.getApplicationList();
        this.getGroupList();
        this.role = this.dockedPanelContext.getData().role;
        this.isEditMode = Boolean(this.role.roleName);
        this.isSaveButtonDisabled = !this.roleEditorForm.valid;
        this.roleEditorForm.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((value) => {
            this.isSaveButtonDisabled = !this.roleEditorForm.valid || this.roleEditorForm.pristine;
        });
        if (this.isEditMode) {
            let selectedApplication = find(this.applicationOptions, { value: this.role.applicationName });
            if (!selectedApplication) {
                selectedApplication = {
                    displayValue: this.role.applicationName,
                    value: this.role.applicationName
                };
                this.applicationOptions.push(selectedApplication);
            }
            this.selectedApplication = [selectedApplication];
            this.oldRoleName = this.role.roleName;
        }
    }
    isDirty() {
        return this.roleEditorForm.dirty;
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    save() {
        this.isSaveInProgress = true;
        this.isSaveButtonDisabled = true;
        if (!this.isEditMode) {
            this.role.applicationName = this.selectedApplication[0].value;
        }
        const saveRole$ = this.isEditMode
            ? this.rxRolePermissionsService.update(this.role, this.oldRoleName)
            : this.rxRolePermissionsService.create(this.role);
        saveRole$
            .pipe(catchError((error) => {
            this.isSaveInProgress = false;
            this.isSaveButtonDisabled = false;
            return throwError(error);
        }))
            .subscribe((response) => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.role-saved.message'));
            this.isSaveInProgress = false;
            this.isSaveButtonDisabled = false;
            this.dockedPanelContext.close(saveRole$);
        });
    }
    getGroupList() {
        const startIndex = 0;
        const pageSize = -1;
        const queryParams = {
            propertySelection: ['groupName', 'groupId'].join(','),
            sortBy: 'groupName'
        };
        this.rxGroupDataPageService
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((groupDataPage) => {
            this.groupList = _map(groupDataPage.data, 'groupName');
        }))
            .subscribe();
    }
    getApplicationList() {
        this.rxGlobalCacheService.getBundleDescriptors().subscribe((bundleDescriptors) => {
            this.applicationOptions = bundleDescriptors
                .sort((bundleDescriptor, bundleDescriptorToCompare) => bundleDescriptor.friendlyName.localeCompare(bundleDescriptorToCompare.friendlyName))
                .map((bundleDescriptor) => ({
                displayValue: bundleDescriptor.friendlyName,
                value: bundleDescriptor.id
            }));
        });
    }
    closeModal() {
        this.dockedPanelContext.dismiss(DismissReasons.CLOSE_BTN);
    }
    roleNameValidator(control) {
        return control.value && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(control.value)
            ? {
                invalidRoleName: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.role-permissions.role-name-validation.message')
                }
            }
            : null;
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RoleEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RoleEditorComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i1.RxGroupDataPageService }, { token: i2.RxRolePermissionsService }, { token: i1.RxNotificationService }, { token: i3.DockedPanelContext }, { token: i4.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RoleEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RoleEditorComponent, selector: "rx-role-editor", viewQueries: [{ propertyName: "roleEditorForm", first: true, predicate: ["roleEditorForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <h4 class=\"m-0 mb-3\">{{ 'com.bmc.arsys.rx.client.admin.role-permissions.general-information.label' | translate }}</h4>\n  <form #roleEditorForm=\"ngForm\">\n    <adapt-rx-select\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.application-or-library.label' | translate }}\"\n      rx-id=\"application-name\"\n      [(ngModel)]=\"selectedApplication\"\n      [options]=\"applicationOptions\"\n      [optionFormatter]=\"optionFormatter\"\n      name=\"application\"\n      required=\"true\"\n      [readonly]=\"isEditMode\"\n    >\n    </adapt-rx-select>\n\n    <adapt-rx-textfield\n      rx-id=\"role-name\"\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.role-permissions.role-name.label' | translate }}\"\n      name=\"roleName\"\n      required=\"true\"\n      [(ngModel)]=\"role.roleName\"\n      [rxCustomValidators]=\"validatorFn\"\n    >\n    </adapt-rx-textfield>\n\n    <adapt-rx-counter\n      rx-id=\"role-id\"\n      class=\"form-group d-block\"\n      required=\"true\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.role-permissions.role-id.label' | translate }}\"\n      name=\"roleId\"\n      adaptIntegerNumber\n      [max]=\"maxRoleId\"\n      [min]=\"minRoleId\"\n      [adaptMax]=\"maxRoleId\"\n      [adaptMin]=\"minRoleId\"\n      [(ngModel)]=\"role.roleID\"\n    ></adapt-rx-counter>\n\n    <div class=\"d-row\">\n      <h4 class=\"form-group\">{{ 'com.bmc.arsys.rx.client.admin.role-permissions.group-mapping.label' | translate }}</h4>\n    </div>\n\n    <adapt-rx-typeahead\n      rx-id=\"test\"\n      class=\"form-group d-block\"\n      [(ngModel)]=\"role.test\"\n      name=\"test\"\n      [typeahead]=\"testSearch\"\n      label=\"Test\"\n      placeholder=\"Enter test group name\"\n    ></adapt-rx-typeahead>\n\n    <adapt-rx-typeahead\n      rx-id=\"production\"\n      class=\"form-group d-block\"\n      [(ngModel)]=\"role.production\"\n      name=\"production\"\n      [typeahead]=\"productionSearch\"\n      label=\"Production\"\n      placeholder=\"Enter production group name\"\n    ></adapt-rx-typeahead>\n\n    <adapt-rx-textfield\n      rx-id=\"datatag\"\n      class=\"form-group d-block\"\n      label=\"{{ 'com.bmc.arsys.rx.client.admin.role-permissions.datatag.label' | translate }}\"\n      name=\"datatag\"\n      placeholder=\"Enter datatag\"\n      [(ngModel)]=\"role.datatag\"\n    ></adapt-rx-textfield>\n  </form>\n</div>\n<div class=\"dp-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    class=\"mr-2\"\n    (click)=\"save()\"\n    [disabled]=\"isSaveButtonDisabled\"\n    [adaptInlineLoader]=\"isSaveInProgress\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"closeModal()\">Cancel</button>\n</div>\n", components: [{ type: i3.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i3.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i3.AdaptRxTypeaheadComponent, selector: "adapt-rx-typeahead", inputs: ["autocomplete", "placeholder", "editable", "focusFirst", "restoreFocusAfterClose", "inputFormatter", "typeahead", "resultFormatter", "resultTemplate", "showHint", "placement", "appendToBody", "size", "popupMaxHeight", "disabledStyleForReadonlyState", "virtualScroll", "virtualScrollItemSize", "minBufferPx", "maxBufferPx", "virtualScrollDropdownHeight", "popupClass", "popupWidth", "mobileFocusAutoscrollTopOffset", "showEmptyResultMessage", "resultStatusMessage", "showClearButton", "clearButtonText"], outputs: ["onSelectItem"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i5.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i3.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i3.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i3.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i3.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RoleEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-role-editor',
                    templateUrl: './role-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i1.RxGroupDataPageService }, { type: i2.RxRolePermissionsService }, { type: i1.RxNotificationService }, { type: i3.DockedPanelContext }, { type: i4.TranslateService }, { type: i0.Injector }]; }, propDecorators: { roleEditorForm: [{
                type: ViewChild,
                args: ['roleEditorForm', { read: NgForm, static: true }]
            }] } });
//# sourceMappingURL=role-editor.component.js.map