import { Component, Input } from '@angular/core';
import { isNil } from 'lodash';
import * as i0 from "@angular/core";
export class ReadOnlyFieldComponent {
    constructor() {
        this.label = '';
        this.value = '';
    }
    getDisplayValue() {
        return !isNil(this.value) ? this.value : '-';
    }
}
ReadOnlyFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ReadOnlyFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: { label: "label", value: "value" }, ngImport: i0, template: "<div class=\"focusable\" tabindex=\"0\">\n  <label>{{ label }}</label>\n  <div class=\"read-only-content\" [textContent]=\"getDisplayValue()\" [title]=\"getDisplayValue()\"></div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}label{margin-bottom:.25rem}.read-only-content{font-weight:var(--font-weight-bold);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-read-only-field',
                    templateUrl: './read-only-field.component.html',
                    styleUrls: ['./read-only-field.component.scss']
                }]
        }], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=read-only-field.component.js.map