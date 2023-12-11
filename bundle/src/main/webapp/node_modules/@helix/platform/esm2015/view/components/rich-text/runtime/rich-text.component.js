import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { RxCkEditorConfiguratorService } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@helix/platform/view/api";
export class RichTextComponent extends BaseViewComponent {
    constructor(sanitizer, rxCkEditorConfiguratorService) {
        super();
        this.sanitizer = sanitizer;
        this.rxCkEditorConfiguratorService = rxCkEditorConfiguratorService;
        this.filter = new CKEDITOR.filter('');
        this.api = {
            setProperty: this.setProperty.bind(this)
        };
        this.filter.allow(this.rxCkEditorConfiguratorService.getContentRules());
    }
    ngOnInit() {
        super.ngOnInit();
        this.notifyPropertyChanged('api', this.api);
        this.config.pipe(takeUntil(this.destroyed$)).subscribe((config) => {
            this.isHidden = Boolean(config.hidden);
            this.html = this.updateHtml(config.html);
        });
    }
    updateHtml(value) {
        if (value) {
            value = value.replace(/\n/g, '<br>');
            const fragment = CKEDITOR.htmlParser.fragment.fromHtml(value);
            const writer = new CKEDITOR.htmlParser.basicWriter();
            this.filter.applyTo(fragment);
            fragment.writeHtml(writer);
            value = writer.getHtml(true);
        }
        else {
            value = '';
        }
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    setProperty(propertyPath, value) {
        if (propertyPath === 'hidden') {
            this.isHidden = value;
            this.notifyPropertyChanged(propertyPath, this.isHidden);
        }
        else {
            return throwError(`Rich text: property ${propertyPath} is not settable.`);
        }
    }
}
RichTextComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextComponent, deps: [{ token: i1.DomSanitizer }, { token: i2.RxCkEditorConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
RichTextComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichTextComponent, selector: "rx-rich-text", inputs: { config: "config" }, usesInheritance: true, ngImport: i0, template: `
    <div
      class="text-container focusable"
      [hidden]="isHidden"
      tabindex="0"
      [innerHTML]="html"
      [attr.aria-hidden]="isHidden"
    ></div>
  `, isInline: true, styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.text-container{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichTextComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-text',
                    template: `
    <div
      class="text-container focusable"
      [hidden]="isHidden"
      tabindex="0"
      [innerHTML]="html"
      [attr.aria-hidden]="isHidden"
    ></div>
  `,
                    styleUrls: ['./rich-text.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }, { type: i2.RxCkEditorConfiguratorService }]; }, propDecorators: { config: [{
                type: Input
            }] } });
//# sourceMappingURL=rich-text.component.js.map