import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef, DismissReasons, TreeWrap } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RxGlobalCacheService, RxNotificationService, RxRoleDataPageService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { chain, filter, find, has, map as _map } from 'lodash';
import { forkJoin, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { RxFuntionalRoleService } from '../functional-role.service';
import { TranslateService } from '@ngx-translate/core';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "../functional-role.service";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class FunctionalRoleEditorComponent extends RxModalClass {
    constructor(rxGlobalCacheService, activeModalRef, rxRoleDataPage, rxFuntionalRoleService, rxNotificationService, translateService, injector) {
        super(activeModalRef, injector);
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.activeModalRef = activeModalRef;
        this.rxRoleDataPage = rxRoleDataPage;
        this.rxFuntionalRoleService = rxFuntionalRoleService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.injector = injector;
        this.availableRoles = [];
        this.isEditMode = false;
        this.isSaveButtonDisabled = true;
        this.selectedRolesList = [];
        this.destroyed$ = new ReplaySubject(1);
        this.treeWrap = TreeWrap.WrapAll;
        this.validatorFn = this.functionalRoleNameValidator.bind(this);
    }
    get selectedRoles() {
        return this.selectedRolesList;
    }
    set selectedRoles(roles) {
        this.selectedRolesList = roles;
        this.isSaveButtonDisabled = !this.functionalRoleEditorForm.valid;
    }
    ngOnInit() {
        super.ngOnInit();
        const roleQueryParams = {
            propertySelection: ['applicationName', 'roleName'].join(','),
            includeSmartAppRolesOnly: true
        };
        const excludedBundles = [
            RX_APPLICATION.innovationStudioBundleId,
            RX_APPLICATION.standardlib,
            RX_APPLICATION.settingsBundleId,
            RX_APPLICATION.platformBundleId
        ];
        const startIndex = 0;
        const pageSize = -1;
        this.functionalRole = this.activeModalRef.getData().functionalRole;
        this.isEditMode = Boolean(this.functionalRole.id);
        this.busy = forkJoin([
            this.rxRoleDataPage.get({
                params: Object.assign({ startIndex, pageSize }, roleQueryParams)
            }),
            this.rxGlobalCacheService.getBundleDescriptors()
        ]).subscribe(([roleDataPage, bundleDescriptors]) => {
            this.applicationOptions = bundleDescriptors
                .filter((bundleDescriptor) => !excludedBundles.includes(bundleDescriptor.id))
                .sort((bundleDescriptor, bundleDescriptorToCompare) => bundleDescriptor.friendlyName.localeCompare(bundleDescriptorToCompare.friendlyName))
                .map((bundleDescriptor) => ({
                displayValue: bundleDescriptor.friendlyName,
                value: bundleDescriptor.id
            }));
            if (!this.isEditMode) {
                this.selectedApplication = [this.applicationOptions[0]];
            }
            else {
                let selectedApplication = find(this.applicationOptions, { value: this.functionalRole.applicationName });
                if (!selectedApplication) {
                    selectedApplication = {
                        displayValue: this.functionalRole.applicationName,
                        value: this.functionalRole.applicationName
                    };
                    this.applicationOptions.push(selectedApplication);
                }
                this.selectedApplication = [selectedApplication];
                this.oldRoleName = this.functionalRole.name;
            }
            this.availableRoles = chain(roleDataPage.data)
                .groupBy('applicationName')
                .map((roles, application) => ({
                children: this.getChildren(roles),
                leaf: false,
                label: find(bundleDescriptors, { id: application }).friendlyName,
                key: application,
                data: { name: '', applicationName: application }
            }))
                .value();
            if (this.isEditMode) {
                this.updateParentNodesForSelectedRoles();
            }
        });
        this.functionalRoleEditorForm.statusChanges
            .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((value) => {
            this.isSaveButtonDisabled = !this.functionalRoleEditorForm.valid || this.functionalRoleEditorForm.pristine;
        });
        this.functionalRoleEditorForm.valueChanges
            .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
            .subscribe((value) => {
            this.isSaveButtonDisabled = !this.functionalRoleEditorForm.valid || this.functionalRoleEditorForm.pristine;
        });
    }
    isDirty() {
        return this.functionalRoleEditorForm.dirty;
    }
    getChildren(rolesForApplication) {
        return rolesForApplication.map((role) => {
            const node = {
                children: null,
                leaf: true,
                label: role.roleName,
                key: `${role.applicationName}:${role.roleName}`,
                data: { name: role.roleName, applicationName: role.applicationName }
            };
            if (this.isEditMode) {
                this.checkAndAddToSelectedRoles(node);
            }
            return node;
        });
    }
    checkAndAddToSelectedRoles(node) {
        if (this.functionalRole.applicationRoles) {
            if (has(this.functionalRole.applicationRoles, node.data.applicationName)) {
                const selectedRolesList = this.functionalRole.applicationRoles[node.data.applicationName];
                if (selectedRolesList.includes(node.data.name)) {
                    this.selectedRolesList.push(node);
                }
            }
        }
    }
    updateParentNodesForSelectedRoles() {
        _map(this.selectedRolesList, (role) => {
            const parentNode = find(this.availableRoles, (availableRole) => availableRole.data.applicationName === role.data.applicationName);
            const selectedChildNodes = filter(this.selectedRolesList, (selectedRole) => parentNode.children.find((child) => child.data.name === selectedRole.data.name &&
                parentNode.data.applicationName === selectedRole.data.applicationName));
            if (selectedChildNodes.length === parentNode.children.length) {
                if (!this.selectedRolesList.includes(parentNode)) {
                    this.selectedRolesList.push(parentNode);
                }
            }
            else {
                parentNode.partialSelected = true;
            }
        });
    }
    optionFormatter(option) {
        return option.displayValue;
    }
    save() {
        this.allowDismiss = false;
        this.isSaveButtonDisabled = true;
        if (!this.isEditMode) {
            this.functionalRole.applicationName = this.selectedApplication[0].value;
        }
        const leafNodes = filter(this.selectedRolesList, (role) => role.leaf);
        this.functionalRole.applicationRoles = chain(leafNodes)
            .groupBy((role) => role.data.applicationName)
            .map((roles, applicationName) => ({
            [applicationName]: roles.map((role) => role.label)
        }))
            .reduce((applicationName, roles) => Object.assign(applicationName, roles), {})
            .value();
        const result$ = this.isEditMode
            ? this.rxFuntionalRoleService.save(this.functionalRole, this.oldRoleName)
            : this.rxFuntionalRoleService.create(this.functionalRole);
        result$
            .pipe(finalize(() => {
            this.allowDismiss = true;
            this.isSaveButtonDisabled = false;
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.functional-roles.functional-role-saved.label'));
            this.activeModalRef.close(true);
        });
    }
    functionalRoleNameValidator(control) {
        return control.value && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(control.value)
            ? {
                invalidRoleName: {
                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.functional-roles.functional-role-name-validation.message')
                }
            }
            : null;
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
FunctionalRoleEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRoleEditorComponent, deps: [{ token: i1.RxGlobalCacheService }, { token: i2.ActiveModalRef }, { token: i1.RxRoleDataPageService }, { token: i3.RxFuntionalRoleService }, { token: i1.RxNotificationService }, { token: i4.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FunctionalRoleEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FunctionalRoleEditorComponent, selector: "rx-functional-role-editor", viewQueries: [{ propertyName: "functionalRoleEditorForm", first: true, predicate: ["functionalRoleEditorForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">\n    {{\n      (isEditMode\n        ? 'com.bmc.arsys.rx.client.admin.functional-roles.edit-functional-role.label'\n        : 'com.bmc.arsys.rx.client.admin.functional-roles.create-functional-role.label'\n      ) | translate\n    }}\n  </h5>\n\n  <button class=\"close dp-close\" type=\"button\" rx-id=\"x-button\" [disabled]=\"!allowDismiss\" (click)=\"cancel()\"></button>\n</div>\n\n<div class=\"modal-body functional-role-editor-modal-body d-flex\">\n  <rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section' }\"></rx-busy-indicator>\n\n  <form #functionalRoleEditorForm=\"ngForm\" class=\"w-100\">\n    <div class=\"row h-100\" *ngIf=\"applicationOptions\">\n      <div class=\"col-6 d-flex flex-column mh-100 mt-2\">\n        <adapt-rx-select\n          class=\"form-group d-block\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.application-or-library.label' | translate }}\"\n          rx-id=\"application-name\"\n          [(ngModel)]=\"selectedApplication\"\n          [options]=\"applicationOptions\"\n          [optionFormatter]=\"optionFormatter\"\n          required=\"true\"\n          name=\"application\"\n          [readonly]=\"isEditMode\"\n        >\n        </adapt-rx-select>\n        <adapt-rx-textfield\n          rx-id=\"name\"\n          class=\"form-group d-block\"\n          label=\"{{ 'com.bmc.arsys.rx.client.admin.functional-roles.functional-role-name.label' | translate }}\"\n          required=\"true\"\n          [(ngModel)]=\"functionalRole.name\"\n          name=\"name\"\n          [rxCustomValidators]=\"validatorFn\"\n        >\n        </adapt-rx-textfield>\n        <adapt-rx-textfield\n          rx-id=\"description\"\n          class=\"form-group d-block\"\n          required=\"true\"\n          [(ngModel)]=\"functionalRole.description\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.description.label' | translate }}\"\n          name=\"description\"\n        ></adapt-rx-textfield>\n        <adapt-rx-textfield\n          *ngIf=\"isEditMode\"\n          rx-id=\"id\"\n          class=\"form-group d-block\"\n          [(ngModel)]=\"functionalRole.id\"\n          label=\"{{ 'com.bmc.arsys.rx.client.common.id.label' | translate }}\"\n          name=\"id\"\n          [readonly]=\"true\"\n          [disabledStyleForReadonlyState]=\"true\"\n        ></adapt-rx-textfield>\n      </div>\n      <div class=\"col-6 d-flex flex-column mh-100 mt-2\">\n        <adapt-rx-control-label label=\"Roles\"> </adapt-rx-control-label>\n        <div class=\"card roles-list-wrapper flex-grow-1\">\n          <div class=\"card-block\">\n            <adapt-tree\n              *ngIf=\"availableRoles.length\"\n              [value]=\"availableRoles\"\n              filter=\"true\"\n              selectionMode=\"checkbox\"\n              [(selection)]=\"selectedRoles\"\n              [wrap]=\"treeWrap\"\n            >\n            </adapt-tree>\n          </div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"save()\"\n    [adaptInlineLoader]=\"!allowDismiss\"\n    [disabled]=\"isSaveButtonDisabled || !allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    rx-id=\"cancel-button\"\n    (click)=\"cancel()\"\n    [disabled]=\"!allowDismiss\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.functional-role-editor-modal-body{height:645px}.roles-list-wrapper{overflow:auto}adapt-rx-select,adapt-rx-textfield{max-width:500px}\n"], components: [{ type: i5.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i2.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i2.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionalRoleEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-functional-role-editor',
                    templateUrl: './functional-role-editor.component.html',
                    styleUrls: ['./functional-role-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxGlobalCacheService }, { type: i2.ActiveModalRef }, { type: i1.RxRoleDataPageService }, { type: i3.RxFuntionalRoleService }, { type: i1.RxNotificationService }, { type: i4.TranslateService }, { type: i0.Injector }]; }, propDecorators: { functionalRoleEditorForm: [{
                type: ViewChild,
                args: ['functionalRoleEditorForm', { read: NgForm, static: true }]
            }] } });
//# sourceMappingURL=functional-role-editor.component.js.map