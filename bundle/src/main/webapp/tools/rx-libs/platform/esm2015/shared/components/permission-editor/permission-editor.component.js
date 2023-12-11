import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ValueAccessor } from '../form-builder/value-accessor';
import { RxPermissionEditorDialogComponent } from './permission-editor-dialog/permission-editor-dialog.component';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxPermissionEditorComponent extends ValueAccessor {
    constructor(rxModalService) {
        super();
        this.rxModalService = rxModalService;
    }
    openEditor() {
        this.rxModalService
            .openModal({
            content: RxPermissionEditorDialogComponent,
            data: {
                assignedPermissions: cloneDeep(this.value),
                type: this.options.type,
                permissionScope: this.options.permissionScope,
                onApiReady: (dialogApi) => {
                    this.dialogApi = dialogApi;
                }
            }
        })
            .then((data) => {
            this.dialogApi = null;
            this.value = data.permissions;
        })
            .catch(() => {
            this.dialogApi = null;
        });
    }
    isDirty() {
        var _a;
        return Boolean((_a = this.dialogApi) === null || _a === void 0 ? void 0 : _a.isDirty());
    }
}
RxPermissionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorComponent, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RxPermissionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxPermissionEditorComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex justify-content-between align-items-center\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    adapt-button\n    type=\"button\"\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"edit-button\"\n    *ngIf=\"!isDisabled\"\n    (click)=\"openEditor()\"\n  >\n    <span class=\"d-icon-pencil\"></span>\n    Edit\n  </button>\n</div>\n\n<div class=\"permissions\">\n  <div *ngIf=\"value?.length === 0\">\n    <h6 class=\"my-1\">None set (Admins only)</h6>\n  </div>\n\n  <div class=\"d-flex justify-content-between align-items-center pt-2\" *ngFor=\"let permission of value\">\n    <div class=\"permission-name\">\n      {{ permission.ownerId.name }}\n    </div>\n\n    <adapt-tag>{{ permission.type }}</adapt-tag>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.permission-name{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host ::ng-deep .a-tag{font-size:10px}\n"], components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i2.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-permission-editor',
                    templateUrl: './permission-editor.component.html',
                    styleUrls: ['./permission-editor.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxPermissionEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=permission-editor.component.js.map