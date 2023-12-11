import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@helix/platform/shared/components';
import { noop } from 'lodash';
import { RxShellGlobalSearchRecordsModalComponent } from './shell-global-search-records-modal/shell-global-search-records-modal.component';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/common";
export class RxShellGlobalSearchRecordsControlComponent extends ValueAccessor {
    constructor(rxModalService) {
        super();
        this.rxModalService = rxModalService;
    }
    openModal(recordToEdit) {
        this.rxModalService
            .openModal({
            title: 'Configure results view',
            data: {
                selectedRecords: this.value,
                recordToEdit,
                isReadOnly: this.isDisabled
            },
            content: RxShellGlobalSearchRecordsModalComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'configure-results-view'
        })
            .then((records) => {
            this.value = records;
        })
            .catch(noop);
    }
    focus() {
        this.openModal();
    }
    edit(record) {
        this.openModal(record);
    }
    remove(record) {
        this.value = this.value.filter((item) => item !== record);
    }
}
RxShellGlobalSearchRecordsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlComponent, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RxShellGlobalSearchRecordsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsControlComponent, selector: "rx-shell-global-search-records-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxShellGlobalSearchRecordsControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-modal-button\" class=\"p-0 pb-1\" (click)=\"openModal()\" [hidden]=\"isDisabled\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Configure results view\n</adapt-button>\n\n<ng-container *ngIf=\"value.length\">\n  <div class=\"my-1\">Records included in search results</div>\n\n  <div class=\"border px-2 py-1 mb-1 global-records-list\" *ngFor=\"let item of value\">\n    <div class=\"d-flex\">\n      <strong class=\"mr-auto mt-1 d-flex global-record-title flex-fill text-truncate\">{{ item.definitionName }}</strong>\n\n      <button\n        class=\"d-icon-left-pencil p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"edit-button\"\n        (click)=\"edit(item)\"\n      ></button>\n\n      <button\n        class=\"d-icon-left-cross_adapt p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"remove-button\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"remove(item)\"\n      ></button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.global-records-list{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.global-record-title{font-size:14px}\n"], components: [{ type: i2.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-global-search-records-control',
                    templateUrl: './shell-global-search-records-control.component.html',
                    styleUrls: ['./shell-global-search-records-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxShellGlobalSearchRecordsControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=shell-global-search-records-control.component.js.map