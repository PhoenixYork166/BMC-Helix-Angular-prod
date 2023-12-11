import { Component, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RX_PERMISSION, RxBundleCacheService, RxGroupDataPageService, RxRoleDataPageService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { cloneDeep, compact, find, flow, forEach, identity, isEmpty, isNumber, map as _map, pull, remove, uniqBy } from 'lodash';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/record/api";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "@ngx-translate/core";
import * as i6 from "../../select-with-pagination/select-with-pagination.component";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
export class RxPermissionEditorDialogComponent extends RxModalClass {
    constructor(activeModalRef, rxGroupDataPage, rxRecordInstanceUtilsService, rxRoleDataPage, rxModalService, rxBundleCache, renderer, injector, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxGroupDataPage = rxGroupDataPage;
        this.rxRecordInstanceUtilsService = rxRecordInstanceUtilsService;
        this.rxRoleDataPage = rxRoleDataPage;
        this.rxModalService = rxModalService;
        this.rxBundleCache = rxBundleCache;
        this.renderer = renderer;
        this.injector = injector;
        this.translateService = translateService;
        this.permissions = [];
        this.permissionTypes = RX_PERMISSION.permissionType;
        this.areSecurityLabelsAvailable = false;
        this.permissionScope = '';
        this.canSave = false;
        this.buttonLabels = {
            group: this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.group.label'),
            role: this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.role.label'),
            securityLabel: this.translateService.instant('com.bmc.arsys.rx.client.permission-editor.button.securityLabel.label')
        };
    }
    isDirty() {
        return this.canSave;
    }
    ngOnInit() {
        super.ngOnInit();
        const modalData = this.activeModalRef.getData();
        this.metadata = RX_PERMISSION.permissionDialogMetadata[modalData.type];
        this.actionsData = this.metadata.actions;
        this.permissionScope = modalData.permissionScope || '';
        this.permissions = _map(modalData.assignedPermissions, (assignedPermission) => {
            const permissionType = this.getPermissionOwnerType(assignedPermission);
            const permission = {
                permittedActions: {},
                type: permissionType,
                selectedPermissionDescriptor: [
                    {
                        value: assignedPermission.ownerId.value,
                        displayValue: assignedPermission.ownerId.name
                    }
                ],
                isWarningShown: false
            };
            this.setPermissionRestriction(permission, assignedPermission.type);
            if (assignedPermission.ownerId.roleApplicationName) {
                permission.selectedPermissionDescriptor[0].applicationName = assignedPermission.ownerId.roleApplicationName;
            }
            return permission;
        });
        this.canSave = false;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.renderer.selectRootElement(this.addNewPermissionButton.nativeElement, true).focus();
        });
    }
    dismiss() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    roleLoader(startIndex, pageSize, searchQuery) {
        const queryParams = {
            propertySelection: ['applicationName', 'roleName', 'roleID'].join(','),
            sortBy: 'roleName'
        };
        const queryExpression = this.formAdditionalQueryCriteria(searchQuery, 'roleName');
        if (queryExpression) {
            queryParams.queryExpression = queryExpression;
        }
        if (this.permissionScope !== RX_PERMISSION.permissionScope.all) {
            queryParams.applicationName = this.rxBundleCache.bundleId;
        }
        return this.rxRoleDataPage
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((roleDataPage) => ({
            totalSize: roleDataPage.totalSize,
            options: _map(roleDataPage.data, (role) => ({
                displayValue: role.roleName,
                value: role.roleID,
                applicationName: role.applicationName
            }))
        })));
    }
    groupLoader(startIndex, pageSize, searchQuery) {
        const queryExpression = compact([
            this.formAdditionalQueryCriteria(searchQuery, 'groupName'),
            `('${RX_PERMISSION.groupCategoryFieldId}' != ${RX_PERMISSION.restrictedGroupCategoryForNonFieldPermissions.dynamic}
      AND '${RX_PERMISSION.groupIdFieldId}' != ${RX_PERMISSION.restrictedGroupIdForNonFieldPermissions.subAdministratorGroup})`
        ]).join(' AND ');
        const queryParams = {
            queryExpression: queryExpression,
            propertySelection: ['groupName', 'groupId'].join(','),
            sortBy: 'groupName'
        };
        return this.rxGroupDataPage
            .get({
            params: Object.assign({ startIndex, pageSize }, queryParams)
        })
            .pipe(map((groupDataPage) => ({
            totalSize: groupDataPage.totalSize,
            options: _map(groupDataPage.data, (group) => ({
                displayValue: group.groupName,
                value: group.groupId
            }))
        })));
    }
    addNewPermission() {
        const permission = {
            permittedActions: {},
            type: RX_PERMISSION.permissionType.role,
            selectedPermissionDescriptor: null,
            isWarningShown: false
        };
        this.setPermissionRestriction(permission);
        this.permissions.push(permission);
    }
    setRestrictionForAllPermissions(actionValue) {
        forEach(this.permissions, (permission) => {
            this.setPermissionRestriction(permission, actionValue);
        });
    }
    removePermission(permission) {
        pull(this.permissions, permission);
        this.canSave = true;
    }
    setPermissionType(permission, type) {
        permission.type = type;
        permission.selectedPermissionDescriptor = null;
        this.setPermissionRestriction(permission);
    }
    setPermissionRestriction(permission, actionValue = '', isChecked = true) {
        if (isChecked) {
            forEach(this.actionsData, (action) => {
                permission.permittedActions[action.value] = action.value === actionValue;
            });
        }
        this.canSave = true;
    }
    save() {
        const permissionOwners = uniqBy(this.getPermissionOwners(), 'ownerId.name');
        if (permissionOwners.length !== this.permissions.length) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'Duplicate and misconfigured entries will be removed. Do you want to continue?'
            })
                .then((value) => {
                if (value) {
                    this.activeModalRef.close({
                        permissions: permissionOwners
                    });
                }
                else {
                    forEach(this.permissions, (permission) => {
                        permission.isWarningShown = !find(permission.permittedActions, identity);
                    });
                }
            });
        }
        else {
            this.activeModalRef.close({
                permissions: permissionOwners
            });
        }
    }
    getPermissionOwners() {
        remove(this.permissions, (permission) => isEmpty(permission.selectedPermissionDescriptor));
        const actualPermissions = cloneDeep(this.permissions);
        return flow((permissions) => _map(permissions, (permission) => {
            if (this.actionsData.length === 0) {
                return this.getPermissionOwner(permission, this.metadata.defaultPermittedAction);
            }
            else {
                let permissionOwner;
                forEach(this.actionsData, (action) => {
                    if (permission.permittedActions[action.value]) {
                        permissionOwner = this.getPermissionOwner(permission, action.value);
                    }
                });
                return permissionOwner;
            }
        }), compact)(actualPermissions);
    }
    getPermissionOwner(permission, type) {
        const permissionOwner = {
            ownerId: {
                value: permission.selectedPermissionDescriptor[0].value === RX_RECORD_DEFINITION.securityLabelIds.assigneeGroup
                    ? RX_RECORD_DEFINITION.groupIds.assigneeGroup
                    : permission.selectedPermissionDescriptor[0].value,
                type: (permission.type === RX_PERMISSION.permissionType.securityLabel
                    ? RX_PERMISSION.permissionType.group
                    : permission.type).toUpperCase(),
                name: permission.selectedPermissionDescriptor[0].displayValue
            },
            type: type
        };
        if (this.permissionScope === RX_PERMISSION.permissionScope.all &&
            permissionOwner.ownerId.type === RX_PERMISSION.permissionType.role.toUpperCase()) {
            permissionOwner.ownerId.roleApplicationName = permission.selectedPermissionDescriptor[0].applicationName;
        }
        return permissionOwner;
    }
    getPermissionOwnerType(permissionOwner) {
        const permissionOwnerId = permissionOwner.ownerId.value;
        if (isNumber(permissionOwnerId)) {
            return permissionOwnerId < 0 ? RX_PERMISSION.permissionType.role : RX_PERMISSION.permissionType.group;
        }
        else {
            return permissionOwner.type ? permissionOwner.type.toLowerCase() : RX_PERMISSION.permissionType.role;
        }
    }
    formAdditionalQueryCriteria(searchQuery, fieldName) {
        return searchQuery
            ? `('${fieldName}' LIKE "%${this.rxRecordInstanceUtilsService.escapeTextWildcards(searchQuery)}%")`
            : null;
    }
    keepKeyValueOrder() {
        return 0;
    }
    onPermissionDescriptorSelected() {
        this.canSave = true;
    }
}
RxPermissionEditorDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorDialogComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxGroupDataPageService }, { token: i3.RxRecordInstanceUtilsService }, { token: i2.RxRoleDataPageService }, { token: i4.RxModalService }, { token: i2.RxBundleCacheService }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxPermissionEditorDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxPermissionEditorDialogComponent, selector: "rx-permission-editor-dialog", viewQueries: [{ propertyName: "addNewPermissionButton", first: true, predicate: ["addNewPermissionButton"], descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.permission-editor.title' | translate }}</h5>\n  <button class=\"close dp-close\" rx-id=\"x-button\" (click)=\"dismiss()\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"p-0\"\n    #addNewPermissionButton\n    rx-id=\"add-new-permission-button\"\n    (click)=\"addNewPermission()\"\n  >\n    <span class=\"d-icon-plus_circle\"></span>\n    {{ 'com.bmc.arsys.rx.client.permission-editor.button.add-permission.label' | translate }}\n  </button>\n\n  <div class=\"border-bottom pb-1 d-flex align-items-center\">\n    <div class=\"permission-type mr-2\">\n      <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.column.type.label' | translate }}\">\n      </adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-role-selection d-flex align-items-center mr-2\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.permission-type.title' | translate }}\"\n      ></adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-warning\"></div>\n\n    <div class=\"permission-actions d-flex justify-content-center mr-2\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex flex-column justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-control-label class=\"text-center\" label=\"{{ action.label | translate }}\"></adapt-rx-control-label>\n        <adapt-button\n          btn-type=\"secondary\"\n          size=\"xtra-small\"\n          (click)=\"setRestrictionForAllPermissions(action.value)\"\n          [disabled]=\"permissions.length === 0\"\n        >\n          {{ 'com.bmc.arsys.rx.client.permission-editor.button.set-all.caption' | translate }}\n        </adapt-button>\n      </div>\n    </div>\n\n    <div class=\"remove-permission\"></div>\n  </div>\n\n  <div class=\"border-bottom py-2 d-flex\" *ngFor=\"let permission of permissions\">\n    <div class=\"permission-type mr-2\">\n      <div class=\"btn-group\">\n        <div *ngFor=\"let permissionType of permissionTypes | keyvalue: keepKeyValueOrder\">\n          <button\n            adapt-button\n            type=\"button\"\n            [btn-type]=\"permission.type === permissionType.value ? 'primary' : 'secondary'\"\n            *ngIf=\"\n              permissionType.value !== permissionTypes.securityLabel ||\n              (permissionType.value === permissionTypes.securityLabel && areSecurityLabelsAvailable)\n            \"\n            (click)=\"setPermissionType(permission, permissionType.value)\"\n          >\n            {{ buttonLabels[permissionType.value] }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"permission-role-selection mr-2\">\n      <rx-select-with-pagination\n        class=\"select-max-width\"\n        *ngIf=\"permission.type === permissionTypes.role\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"roleLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n\n      <rx-select-with-pagination\n        *ngIf=\"permission.type === permissionTypes.group\"\n        class=\"select-max-width\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"groupLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n    </div>\n\n    <div class=\"permission-warning d-flex align-items-center\">\n      <span *ngIf=\"permission.isWarningShown\" class=\"d-icon-exclamation_triangle\"> </span>\n    </div>\n\n    <div class=\"permission-actions d-flex\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-checkbox\n          class=\"checkbox-inline m-0\"\n          [(ngModel)]=\"permission.permittedActions[action.value]\"\n          (ngModelChange)=\"setPermissionRestriction(permission, action.value, $event)\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n    </div>\n\n    <div class=\"remove-permission d-flex justify-content-end mr-2\">\n      <button class=\"close\" (click)=\"removePermission(permission)\"></button>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" [disabled]=\"!canSave\" rx-id=\"save-button\" (click)=\"save()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"dismiss()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{min-height:600px}.permission-type{flex:2}.permission-role-selection{flex:3;width:5rem}.permission-actions{flex:1}.permission-warning,.remove-permission{margin-top:5px;flex:.3}.permission-action{flex:1}:host ::ng-deep adapt-select{max-width:300px}:host ::ng-deep .dropdown-item{white-space:normal;word-break:break-all}.permission-warning{color:#f83200}.checkbox-inline{height:20px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i6.RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i5.TranslatePipe, "keyvalue": i7.KeyValuePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-permission-editor-dialog',
                    templateUrl: './permission-editor-dialog.component.html',
                    styleUrls: ['./permission-editor-dialog.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxGroupDataPageService }, { type: i3.RxRecordInstanceUtilsService }, { type: i2.RxRoleDataPageService }, { type: i4.RxModalService }, { type: i2.RxBundleCacheService }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i5.TranslateService }]; }, propDecorators: { addNewPermissionButton: [{
                type: ViewChild,
                args: ['addNewPermissionButton', { read: ElementRef }]
            }] } });
//# sourceMappingURL=permission-editor-dialog.component.js.map