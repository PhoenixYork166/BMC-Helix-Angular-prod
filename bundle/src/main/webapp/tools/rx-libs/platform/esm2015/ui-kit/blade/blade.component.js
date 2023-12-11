import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RxBladeComponent {
    constructor() {
        this.isBladeCollapsed = false;
        this.title = '';
        this.dockTo = 'left';
        this.toggle = new EventEmitter();
        this.isBladeExpanded = true;
    }
    set isExpanded(value) {
        this.isBladeExpanded = value;
        this.isBladeCollapsed = !value;
    }
    get isExpanded() {
        return this.isBladeExpanded;
    }
    toggleBlade() {
        this.toggle.emit();
    }
}
RxBladeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBladeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBladeComponent, selector: "rx-blade", inputs: { title: "title", isExpanded: "isExpanded", dockTo: "dockTo" }, outputs: { toggle: "toggle" }, host: { properties: { "class.collapsed": "this.isBladeCollapsed", "class": "this.dockTo" } }, ngImport: i0, template: "<div class=\"header\">\n  <button\n    type=\"button\"\n    class=\"toggle\"\n    [attr.rx-id]=\"'toggle-button'\"\n    [class.btn-block]=\"isExpanded\"\n    (click)=\"toggleBlade()\"\n  >\n    <span [ngClass]=\"{ icon: true, 'd-icon-arrow_right': dockTo === 'right', 'd-icon-arrow_left': dockTo === 'left' }\">\n    </span>\n    {{ title }}\n  </button>\n</div>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;flex-shrink:0;width:280px;height:100%;background:white;transition:margin-left .3s,margin-right .3s}:host.right{border-left:1px solid #d6d7d8;margin-right:0}:host.right .icon{float:right}:host.left{border-right:1px solid #d6d7d8;margin-left:0}:host.left .icon{float:left}:host.left.collapsed{margin-left:-280px}:host.left.collapsed .header{left:280px}:host.left.collapsed .icon{transform:rotate(180deg);margin-right:10px}:host.right.collapsed{margin-right:-280px}:host.right.collapsed .header{text-align:right;right:280px}:host.right.collapsed .icon{transform:rotate(180deg);margin-left:10px}.toggle{font-size:16px;color:#626668;position:relative;display:inline-block;height:36px;font-weight:var(--font-weight-bold);text-align:center;line-height:2.2em;padding:0 20px;border:none;border-bottom:1px solid #d6d7d8;background:white}.toggle:focus{box-shadow:none}.icon{font-size:12px}.header{position:relative}.content{overflow:auto;height:100%}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-blade',
                    templateUrl: './blade.component.html',
                    styleUrls: ['blade.component.scss']
                }]
        }], propDecorators: { isBladeCollapsed: [{
                type: HostBinding,
                args: ['class.collapsed']
            }], title: [{
                type: Input
            }], isExpanded: [{
                type: Input
            }], dockTo: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class']
            }], toggle: [{
                type: Output
            }] } });
//# sourceMappingURL=blade.component.js.map