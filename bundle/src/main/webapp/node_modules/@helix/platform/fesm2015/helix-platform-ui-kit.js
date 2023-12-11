import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, HostBinding, Input, Output, NgModule, Pipe, Injectable, Inject, forwardRef, Directive } from '@angular/core';
import * as i1$1 from '@bmc-ux/adapt-angular';
import { AdaptBusyModule, DismissReasons, AdaptButtonModule, AdaptModalModule, AdaptRxTextfieldModule, DockedPanelContext, ActiveModalRef, AdaptRxTextareaModule, AdaptAccordionModule, AdaptAlertModule } from '@bmc-ux/adapt-angular';
import { NEVER } from 'rxjs';
import * as i1$2 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment-es6';
import * as i3 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { some, toArray, constant, noop, isNil } from 'lodash';

class RxBladeComponent {
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

class RxBladeModule {
}
RxBladeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBladeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeModule, declarations: [RxBladeComponent], imports: [CommonModule], exports: [RxBladeComponent] });
RxBladeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBladeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxBladeComponent],
                    exports: [RxBladeComponent]
                }]
        }] });

class RxBreadcrumbBarComponent {
    constructor() {
        this.items = [];
        this.selectedItem = new EventEmitter();
    }
    onSelectItem(item) {
        this.selectedItem.emit(item);
    }
    trackByFn(index, item) {
        return item.label;
    }
}
RxBreadcrumbBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBreadcrumbBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: { items: "items" }, outputs: { selectedItem: "selectedItem" }, ngImport: i0, template: "<ol *ngIf=\"items\" class=\"breadcrumb m-0 p-0\">\n  <li\n    *ngFor=\"let item of items; trackBy: trackByFn; let last = last\"\n    class=\"breadcrumb-item rx-ellipsis\"\n    [class.active]=\"last\"\n  >\n    <a (click)=\"onSelectItem(item)\" *ngIf=\"!last\" href=\"javascript:void(0)\">{{ item.label }}</a>\n    <span *ngIf=\"last\">{{ item.label }}</span>\n  </li>\n</ol>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-breadcrumb-bar',
                    templateUrl: './breadcrumb-bar.component.html'
                }]
        }], propDecorators: { items: [{
                type: Input
            }], selectedItem: [{
                type: Output
            }] } });

class RxBreadcrumbBarModule {
}
RxBreadcrumbBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBreadcrumbBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarModule, declarations: [RxBreadcrumbBarComponent], imports: [CommonModule], exports: [RxBreadcrumbBarComponent] });
RxBreadcrumbBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBreadcrumbBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [RxBreadcrumbBarComponent],
                    declarations: [RxBreadcrumbBarComponent]
                }]
        }] });

class RxBusyIndicatorComponent {
    constructor() {
        this.defaultSubscription = NEVER.subscribe();
        this.defaultOptions = {
            busy: this.defaultSubscription,
            backdrop: true,
            message: '',
            minDuration: 0,
            delay: 0,
            loaderType: 'section'
        };
        this.config = this.defaultOptions;
    }
    ngOnInit() {
        this.updateConfig();
    }
    ngOnChanges(changes) {
        if (changes.options && !changes.options.firstChange) {
            this.updateConfig();
        }
    }
    ngOnDestroy() {
        this.defaultSubscription.unsubscribe();
    }
    updateConfig() {
        this.config = Object.assign(Object.assign({}, this.defaultOptions), this.options);
    }
}
RxBusyIndicatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxBusyIndicatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: { options: "options" }, usesOnChanges: true, ngImport: i0, template: "<span [ngBusy]=\"config\"></span>\n", directives: [{ type: i1$1.AdaptBusyDirective, selector: "[adapt-busy], [ngBusy]", inputs: ["ngBusy", "adaptRadarDisableEventSending", "busyPromise", "determinate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-busy-indicator',
                    templateUrl: './busy-indicator.component.html'
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxBusyIndicatorModule {
}
RxBusyIndicatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBusyIndicatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, declarations: [RxBusyIndicatorComponent], imports: [CommonModule, i1$1.AdaptBusyModule], exports: [RxBusyIndicatorComponent] });
RxBusyIndicatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, imports: [[CommonModule, AdaptBusyModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBusyIndicatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptBusyModule.forRoot()],
                    declarations: [RxBusyIndicatorComponent],
                    exports: [RxBusyIndicatorComponent]
                }]
        }] });

class RxHumanizedDatePipe {
    constructor(datePipe, translateService) {
        this.datePipe = datePipe;
        this.translateService = translateService;
    }
    transform(value) {
        const now = moment();
        const date = moment(value);
        if (date.isSame(now, 'day')) {
            return this.translateService.instant('com.bmc.dsm.chatbot.common.today.label');
        }
        else if (this.isYesterday(date)) {
            return this.translateService.instant('com.bmc.dsm.chatbot.common.yesterday.label');
        }
        else {
            return this.datePipe.transform(value, 'fullDate');
        }
    }
    isYesterday(value) {
        const yesterday = moment().subtract(1, 'day').startOf('day');
        return value.isSame(yesterday, 'day');
    }
}
RxHumanizedDatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, deps: [{ token: i1.DatePipe }, { token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Pipe });
RxHumanizedDatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, name: "rxHumanizedDatePipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rxHumanizedDatePipe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }, { type: i1$2.TranslateService }]; } });

class RxHumanizedDateModule {
}
RxHumanizedDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxHumanizedDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDateModule, declarations: [RxHumanizedDatePipe], exports: [RxHumanizedDatePipe] });
RxHumanizedDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxHumanizedDateModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxHumanizedDatePipe],
                    exports: [RxHumanizedDatePipe]
                }]
        }] });

class RxJsonViewerComponent {
    constructor() {
        this.data = {};
    }
}
RxJsonViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxJsonViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxJsonViewerComponent, selector: "rx-json-viewer", inputs: { data: "data" }, ngImport: i0, template: "<textarea class=\"form-control\" readonly>{{ data | json }}</textarea>\n", styles: [":host{display:flex;padding:12px;flex-grow:1}.form-control{resize:none}\n"], pipes: { "json": i1.JsonPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-json-viewer',
                    templateUrl: './json-viewer.component.html',
                    styleUrls: ['./json-viewer.component.scss']
                }]
        }], propDecorators: { data: [{
                type: Input
            }] } });

class RxJsonViewerModule {
}
RxJsonViewerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxJsonViewerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerModule, declarations: [RxJsonViewerComponent], imports: [CommonModule], exports: [RxJsonViewerComponent] });
RxJsonViewerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxJsonViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxJsonViewerComponent],
                    exports: [RxJsonViewerComponent]
                }]
        }] });

const RX_MODAL = {
    modalStyles: {
        primary: 'primary',
        warning: 'warning',
        danger: 'danger',
        info: 'info',
        success: 'success'
    },
    modalTypes: {
        alert: 'alert',
        confirm: 'confirm',
        prompt: 'prompt'
    }
};

class RxModalComponent {
    constructor(context) {
        this.context = context;
        this.answer = '';
        this.config = this.context.getData();
    }
    onConfirm() {
        if (this.config.modalType === RX_MODAL.modalTypes.prompt) {
            this.context.close({ response: true, answer: this.answer });
        }
        else {
            this.context.close(true);
        }
    }
}
RxModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalComponent, deps: [{ token: i1$1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
RxModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxModalComponent, selector: "rx-modal", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.modalConfig.title }}</h5>\n\n  <button\n    class=\"close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"context.close(false)\"\n  ></button>\n</div>\n\n<div class=\"modal-body\">\n  <span class=\"message\" *ngIf=\"config.modalType !== 'prompt'\">{{ config.modalConfig.message }}</span>\n\n  <adapt-rx-textfield\n    *ngIf=\"config.modalType === 'prompt'\"\n    [label]=\"config.modalConfig.message\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"answer\"\n  ></adapt-rx-textfield>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button btn-type=\"primary\" (click)=\"onConfirm()\">\n    {{ config.modalConfig.buttons.confirmButton }}\n  </button>\n\n  <button\n    adapt-button\n    *ngIf=\"config.modalConfig.buttons.dismissButton\"\n    btn-type=\"secondary\"\n    (click)=\"context.close(false)\"\n  >\n    {{ config.modalConfig.buttons.dismissButton }}\n  </button>\n</div>\n\n<div class=\"sr-only\" role=\"alert\">{{ config.modalConfig.title }} {{ config.modalConfig.message }}</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:20px}.modal-body .message{white-space:pre-wrap}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n"], components: [{ type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i1$2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-modal',
                    templateUrl: './modal.component.html',
                    styleUrls: ['./modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }]; } });

class RxModalService {
    constructor(adaptModalService, translateService, adaptDockedPanelService) {
        this.adaptModalService = adaptModalService;
        this.translateService = translateService;
        this.adaptDockedPanelService = adaptDockedPanelService;
    }
    isAnyDockedPanelDirty() {
        return some(this.adaptDockedPanelService.openedPanels, (dockedPanelInstance) => { var _a, _b; return (_b = (_a = dockedPanelInstance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
    }
    isAnyModalDirty() {
        return some(toArray(this.adaptModalService.openedModals.values()), (modalRef) => { var _a, _b; return (_b = (_a = modalRef.instance.contentInstanceRef) === null || _a === void 0 ? void 0 : _a.isDirty) === null || _b === void 0 ? void 0 : _b.call(_a); });
    }
    confirm(modalConfig, allowDismiss = true) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.yes.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.no.label'));
        return this.adaptModalService
            .open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.confirm, modalConfig },
            type: modalConfig.modalStyle,
            isDialog: true,
            beforeDismiss: () => allowDismiss
        })
            .then((result) => result === true)
            .catch(constant(false));
    }
    alert(modalConfig) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'));
        return this.adaptModalService.open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.alert, modalConfig },
            type: modalConfig.modalStyle,
            isDialog: true
        });
    }
    prompt(modalConfig) {
        this.setButtons(modalConfig, this.translateService.instant('com.bmc.arsys.rx.client.common.ok.label'), this.translateService.instant('com.bmc.arsys.rx.client.common.cancel.label'));
        return this.adaptModalService
            .open({
            content: RxModalComponent,
            data: { modalType: RX_MODAL.modalTypes.prompt, modalConfig },
            type: modalConfig.modalStyle
        })
            .then((result) => {
            return (result === null || result === void 0 ? void 0 : result.response) ? result : { response: false };
        })
            .catch(constant({
            response: false
        }));
    }
    setButtons(modalConfig, confirmButton, dismissButton) {
        if (modalConfig.buttons) {
            modalConfig.buttons.confirmButton = modalConfig.buttons.confirmButton || confirmButton;
            modalConfig.buttons.dismissButton = modalConfig.buttons.dismissButton || dismissButton;
        }
        else {
            modalConfig.buttons = {
                confirmButton,
                dismissButton
            };
        }
    }
    open(config, isModal) {
        var _a;
        let api = null;
        const onApiReady = (_a = config.data) === null || _a === void 0 ? void 0 : _a.onApiReady;
        const updatedConfig = Object.assign(Object.assign({}, config), { data: Object.assign(Object.assign({}, config.data), { onApiReady: (dialogApi) => {
                    onApiReady === null || onApiReady === void 0 ? void 0 : onApiReady(dialogApi);
                    api = dialogApi;
                } }), beforeDismiss: (reason) => {
                const canClose = !Object.values(DismissReasons).includes(reason);
                if (!canClose) {
                    api === null || api === void 0 ? void 0 : api.dismissDialog();
                }
                return canClose;
            } });
        const result = isModal
            ? this.adaptModalService.open(updatedConfig)
            : this.adaptDockedPanelService.open(updatedConfig);
        return result.then((data) => {
            api = null;
            return data;
        }, (reason) => {
            api = null;
            return Promise.reject(reason);
        });
    }
    /**
     * @deprecated The method is deprecated, use openModal instead
     */
    openDialog(config) {
        return this.open(config, true);
    }
    openModal(config) {
        return this.open(config, true);
    }
    openDockedPanel(config) {
        return this.open(config, false);
    }
}
RxModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, deps: [{ token: i1$1.AdaptModalService }, { token: i1$2.TranslateService }, { token: i1$1.AdaptDockedPanelService }], target: i0.ɵɵFactoryTarget.Injectable });
RxModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AdaptModalService }, { type: i1$2.TranslateService }, { type: i1$1.AdaptDockedPanelService }]; } });

class RxModalModule {
}
RxModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, declarations: [RxModalComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptModalModule,
        TranslateModule,
        AdaptRxTextfieldModule] });
RxModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, providers: [RxModalService], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptModalModule,
            TranslateModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptModalModule,
                        TranslateModule,
                        AdaptRxTextfieldModule
                    ],
                    declarations: [RxModalComponent],
                    entryComponents: [RxModalComponent],
                    providers: [RxModalService]
                }]
        }] });

class RxUtilityModalsService {
    constructor(rxModalService, translateService) {
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.confirmationResult = null;
    }
    confirmExternalChange(message) {
        return this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: `${message} ${this.translateService.instant('com.bmc.arsys.rx.client.common.continue-confirmation.message')}`
        });
    }
    confirm(message, title = this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'), style = RX_MODAL.modalStyles.warning) {
        return this.rxModalService.confirm({
            title,
            modalStyle: style,
            message
        });
    }
    confirmUnsavedChanges() {
        // allow to open only one confirmation dialog
        if (!this.confirmationResult) {
            this.confirmationResult = this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.common.unsaved-data.message')
            }, false)
                .then((result) => {
                this.confirmationResult = null;
                return result;
            });
        }
        return this.confirmationResult;
    }
}
RxUtilityModalsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, deps: [{ token: RxModalService }, { token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Injectable });
RxUtilityModalsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUtilityModalsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: RxModalService }, { type: i1$2.TranslateService }]; } });

class RxModalClass {
    constructor(context, injector) {
        this.context = context;
        this.injector = injector;
        this._isDirty = false;
        this.dialogApi = {
            dismissDialog: this.dismissDialog.bind(this),
            isDirty: this.isDirty.bind(this)
        };
        this.rxUtilityModalsService = injector.get(RxUtilityModalsService);
    }
    get allowDismiss() {
        var _a;
        return (_a = this.context.getData().allowDismiss) !== null && _a !== void 0 ? _a : true;
    }
    set allowDismiss(value) {
        this.context.getData().allowDismiss = value;
    }
    markAsDirty() {
        this._isDirty = true;
    }
    isDirty() {
        return this._isDirty;
    }
    ngOnInit() {
        this.context.getData().onApiReady(this.dialogApi);
    }
    dismissDialog() {
        if (this.allowDismiss === false) {
            return;
        }
        if (this.isDirty()) {
            this.rxUtilityModalsService.confirmUnsavedChanges().then((result) => {
                if (result) {
                    this.context.dismiss(null);
                }
            });
        }
        else {
            this.context.dismiss(null);
        }
    }
}
RxModalClass.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass, deps: [{ token: DockedPanelContext || ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxModalClass.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxModalClass, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DockedPanelContext || ActiveModalRef]
                }] }, { type: i0.Injector }]; } });

class RxNameValuePairsEditorComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.nameValuePairs = [];
        this.addButtonLabel = '';
        this.registerOnTouched = noop;
    }
    writeValue(value) {
        if (value !== this.nameValuePairs) {
            this.nameValuePairs = value;
        }
    }
    registerOnChange(callback) {
        this.onChangeCallback = callback;
    }
    validate(control) {
        return some(this.nameValuePairs, { key: '' }) || some(this.nameValuePairs, { value: '' })
            ? {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.required-field.label'),
                text: this.translateService.instant('com.bmc.arsys.rx.client.view-components.validation.required.message')
            }
            : null;
    }
    addNameValuePair() {
        this.nameValuePairs.push({
            key: '',
            value: ''
        });
        this.onChangeCallback(this.nameValuePairs);
    }
    deleteNameValuePair(index) {
        this.nameValuePairs.splice(index, 1);
        this.onChangeCallback(this.nameValuePairs);
    }
}
RxNameValuePairsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorComponent, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxNameValuePairsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxNameValuePairsEditorComponent, selector: "rx-name-value-pairs-editor", inputs: { addButtonLabel: "addButtonLabel" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div>\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"tertiary\"\n    class=\"d-icon-plus_circle px-0 align-self-start\"\n    rx-id=\"add-button\"\n    (click)=\"addNameValuePair()\"\n  >\n    {{ addButtonLabel }}\n  </button>\n  <div class=\"d-flex\" *ngFor=\"let pair of nameValuePairs; let $index = index\">\n    <adapt-rx-textfield\n      name=\"name\"\n      [(ngModel)]=\"pair.key\"\n      [required]=\"true\"\n      attr.rx-id=\"name\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-name.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n      [autofocus]=\"true\"\n    ></adapt-rx-textfield>\n    <adapt-rx-textfield\n      name=\"value\"\n      [(ngModel)]=\"pair.value\"\n      [required]=\"true\"\n      attr.rx-id=\"value\"\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.name-value-pairs-editor.enter-value.placeholder' | translate }}\"\n      class=\"d-block form-group pr-4 flex-fill\"\n      (ngModelChange)=\"onChangeCallback(nameValuePairs)\"\n    ></adapt-rx-textfield>\n    <button\n      class=\"d-icon-trash form-group px-0\"\n      adapt-button\n      btn-type=\"tertiary\"\n      type=\"button\"\n      (click)=\"deleteNameValuePair($index)\"\n    ></button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textfield{max-width:400px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i1$2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-name-value-pairs-editor',
                    templateUrl: './name-value-pairs-editor.component.html',
                    styleUrls: ['./name-value-pairs-editor.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => RxNameValuePairsEditorComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; }, propDecorators: { addButtonLabel: [{
                type: Input
            }] } });

class RxNameValuePairsEditorModule {
}
RxNameValuePairsEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxNameValuePairsEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, declarations: [RxNameValuePairsEditorComponent], imports: [CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule], exports: [RxNameValuePairsEditorComponent] });
RxNameValuePairsEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, imports: [[CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxNameValuePairsEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxNameValuePairsEditorComponent],
                    imports: [CommonModule, AdaptRxTextfieldModule, AdaptButtonModule, FormsModule, TranslateModule],
                    exports: [RxNameValuePairsEditorComponent]
                }]
        }] });

var ProgressIndicatorStatus;
(function (ProgressIndicatorStatus) {
    ProgressIndicatorStatus["InProgress"] = "In progress";
    ProgressIndicatorStatus["Finished"] = "Finished";
    ProgressIndicatorStatus["Failed"] = "Failed";
})(ProgressIndicatorStatus || (ProgressIndicatorStatus = {}));

class ProgressIndicatorModalComponent {
    constructor(context) {
        this.context = context;
        this.deploymentStatus = ProgressIndicatorStatus;
        this.config = this.context.getData();
    }
    close() {
        this.context.close(false);
    }
}
ProgressIndicatorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalComponent, deps: [{ token: i1$1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
ProgressIndicatorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProgressIndicatorModalComponent, selector: "rx-progress-indicator-modal", ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.title }}</h5>\n</div>\n\n<div class=\"modal-body\">\n  <h5 class=\"mt-0\">{{ config.header }}</h5>\n  <p>{{ config.subHeader }}</p>\n\n  <div class=\"operation-status\">\n    <p *ngIf=\"config.status === deploymentStatus.InProgress\" rx-id=\"in-progress-message\">\n      {{ config.inProgressMessage }}\n    </p>\n    <div *ngIf=\"config.status === deploymentStatus.InProgress\" class=\"progress\" rx-id=\"progress-bar\">\n      <div\n        class=\"progress-bar progress-bar-intermediate\"\n        role=\"progressbar\"\n        style=\"width: 100%\"\n        aria-valuenow=\"100\"\n        aria-valuemin=\"0\"\n        aria-valuemax=\"100\"\n      ></div>\n    </div>\n\n    <p\n      *ngIf=\"config.status === deploymentStatus.Finished\"\n      class=\"d-icon-left-check_adapt\"\n      rx-id=\"operation-succeeded-message\"\n    >\n      {{ config.finishedMessage }}\n    </p>\n\n    <p\n      *ngIf=\"config.status === deploymentStatus.Failed\"\n      class=\"d-icon-left-exclamation_triangle\"\n      rx-id=\"operation-failed-message\"\n    >\n      {{ config.failedMessage }}\n    </p>\n\n    <adapt-rx-textarea\n      *ngIf=\"config.operationStatusMessage\"\n      rx-id=\"status-message\"\n      [(ngModel)]=\"config.operationStatusMessage\"\n      label=\"{{ 'com.bmc.arsys.rx.client.common.messages.label' | translate }}\"\n      rows=\"20\"\n      readonly=\"true\"\n      name=\"status-message\"\n    ></adapt-rx-textarea>\n  </div>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <span class=\"mr-auto\" *ngIf=\"config.status === deploymentStatus.InProgress\">\n    {{ 'com.bmc.arsys.rx.innovation-studio.progress.pending.label' | translate }}\n  </span>\n  <button\n    [disabled]=\"config.status === deploymentStatus.InProgress\"\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"context.close()\"\n    rx-id=\"close-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.d-icon-left-check_adapt:before{color:#00a79d}.d-icon-left-exclamation_triangle:before{color:#f83200}.operation-status{display:flex;flex-direction:column;min-height:70px}\n"], components: [{ type: i1$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i1$2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-progress-indicator-modal',
                    templateUrl: './progress-indicator-modal.component.html',
                    styleUrls: ['./progress-indicator-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }]; } });

class ProgressIndicatorModalModule {
}
ProgressIndicatorModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProgressIndicatorModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalModule, declarations: [ProgressIndicatorModalComponent], imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextareaModule, FormsModule, ReactiveFormsModule] });
ProgressIndicatorModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalModule, imports: [[CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextareaModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProgressIndicatorModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProgressIndicatorModalComponent],
                    imports: [CommonModule, TranslateModule, AdaptButtonModule, AdaptRxTextareaModule, FormsModule, ReactiveFormsModule]
                }]
        }] });

var ValidationIssueType;
(function (ValidationIssueType) {
    ValidationIssueType["Warning"] = "warning";
    ValidationIssueType["Error"] = "error";
})(ValidationIssueType || (ValidationIssueType = {}));

class RxValidationIssuesComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.issueSections = [];
        this.correctIssue = new EventEmitter();
        this.ValidationIssueType = ValidationIssueType;
    }
    onCorrectIssue(validationIssue) {
        this.correctIssue.emit(validationIssue);
    }
    ngOnInit() {
        this.emptyText = this.translateService.instant('com.bmc.arsys.rx.client.designer.definition-is-valid.message', {
            definitionTypeDisplayName: this.definitionTypeDisplayName.toLowerCase()
        });
    }
}
RxValidationIssuesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesComponent, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxValidationIssuesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxValidationIssuesComponent, selector: "rx-validation-issues", inputs: { definitionTypeDisplayName: "definitionTypeDisplayName", issueSections: "issueSections" }, outputs: { correctIssue: "correctIssue" }, ngImport: i0, template: "<adapt-accordion [config]=\"{ multiselect: true, tabs: [] }\">\n  <adapt-accordion-tab *ngFor=\"let issueSection of issueSections\" [isOpen]=\"true\" [title]=\"issueSection.title\">\n    <div\n      *ngFor=\"let issue of issueSection.issues\"\n      [ngClass]=\"{\n        'issue-warning': issue.type === ValidationIssueType.Warning,\n        'issue-error': issue.type === ValidationIssueType.Error\n      }\"\n      class=\"issue\"\n    >\n      <span class=\"d-icon-exclamation_triangle\"></span>\n\n      <div class=\"issue-info\">\n        <div class=\"issue-type\">{{ issue.type | titlecase }}</div>\n        <div class=\"description\">{{ issue.description }}</div>\n        <button\n          *ngIf=\"!issue.disableCorrection\"\n          (click)=\"onCorrectIssue(issue)\"\n          type=\"button\"\n          class=\"btn btn-link correct-issue\"\n        >\n          Correct\n        </button>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<adapt-alert\n  *ngIf=\"issueSections.length === 0\"\n  class=\"p-3 definition-valid-message\"\n  [config]=\"{\n    content: emptyText,\n    variant: 'success',\n    type: 'inline'\n  }\"\n></adapt-alert>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.issue{display:flex}.issue-error .d-icon-exclamation_triangle{color:#f83200}.issue-warning .d-icon-exclamation_triangle{color:#f1b521}.d-icon-exclamation_triangle{margin-right:10px}.issue-info{flex-grow:1}.issue-type{margin-bottom:15px}.correct-issue{float:right}adapt-accordion-tab ::ng-deep .card-block{word-break:break-word}\n"], components: [{ type: i1$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "titlecase": i1.TitleCasePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-validation-issues',
                    templateUrl: './validation-issues.component.html',
                    styleUrls: ['./validation-issues.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; }, propDecorators: { definitionTypeDisplayName: [{
                type: Input
            }], issueSections: [{
                type: Input
            }], correctIssue: [{
                type: Output
            }] } });

class RxValidationIssuesModule {
}
RxValidationIssuesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxValidationIssuesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, declarations: [RxValidationIssuesComponent], imports: [CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule], exports: [RxValidationIssuesComponent] });
RxValidationIssuesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, imports: [[CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxValidationIssuesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptAccordionModule, TranslateModule, AdaptAlertModule],
                    exports: [RxValidationIssuesComponent],
                    declarations: [RxValidationIssuesComponent]
                }]
        }] });

class RxVerticalTextTruncateDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.textToTruncate = '';
        this.rxVerticalTextTruncate = '';
    }
    ngAfterViewInit() {
        this.truncateText();
    }
    ngOnChanges() {
        this.truncateText();
    }
    truncateText() {
        const el = this.renderer.selectRootElement(this.el.nativeElement, true);
        this.textToTruncate = this.rxVerticalTextTruncate;
        if (this.textToTruncate) {
            const words = this.textToTruncate.trim().replace(/\n|\r/g, '').split(' ');
            let resultValue = '';
            for (const word of words) {
                const innerText = el.innerText;
                resultValue = `${innerText} ${word}`;
                if (el.scrollHeight > el.offsetHeight) {
                    // Subtract 3 characters, since we concatenate ...
                    resultValue = `${innerText.slice(0, innerText.length - 3)}...`;
                    break;
                }
            }
            this.renderer.setProperty(el, 'innerText', resultValue);
        }
    }
}
RxVerticalTextTruncateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
RxVerticalTextTruncateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxVerticalTextTruncateDirective, selector: "[rxVerticalTextTruncate]", inputs: { rxVerticalTextTruncate: "rxVerticalTextTruncate" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxVerticalTextTruncate]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { rxVerticalTextTruncate: [{
                type: Input
            }] } });

class RxVerticalTextTruncateModule {
}
RxVerticalTextTruncateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxVerticalTextTruncateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateModule, declarations: [RxVerticalTextTruncateDirective], exports: [RxVerticalTextTruncateDirective] });
RxVerticalTextTruncateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxVerticalTextTruncateModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxVerticalTextTruncateDirective],
                    exports: [RxVerticalTextTruncateDirective]
                }]
        }] });

class RxLineLoaderComponent {
    constructor() {
        this.loaderMessage = '';
    }
}
RxLineLoaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxLineLoaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxLineLoaderComponent, selector: "rx-line-loader", inputs: { loaderMessage: "loaderMessage" }, ngImport: i0, template: "<div class=\"adapt-alert-bar\">\n  <div class=\"progress-bar-intermediate lay1\"></div>\n  <div class=\"progress-bar-intermediate lay2\"></div>\n  <div class=\"progress-bar-intermediate lay3\"></div>\n</div>\n<p *ngIf=\"loaderMessage\" class=\"adapt-alert-bar__text\">{{ loaderMessage }}</p>\n", styles: [".adapt-alert-bar__text{text-align:center;padding:10px 0}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-line-loader',
                    templateUrl: './line-loader.component.html',
                    styleUrls: ['./line-loader.component.scss']
                }]
        }], propDecorators: { loaderMessage: [{
                type: Input
            }] } });

class RxLineLoaderModule {
}
RxLineLoaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLineLoaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderModule, declarations: [RxLineLoaderComponent], imports: [CommonModule], exports: [RxLineLoaderComponent] });
RxLineLoaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLineLoaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxLineLoaderComponent],
                    imports: [CommonModule],
                    exports: [RxLineLoaderComponent]
                }]
        }] });

class RxCustomValidatorsDirective {
    validate(control) {
        return this.rxCustomValidators(control);
    }
}
RxCustomValidatorsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomValidatorsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RxCustomValidatorsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: { rxCustomValidators: "rxCustomValidators" }, providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => RxCustomValidatorsDirective), multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxCustomValidatorsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxCustomValidators][ngModel],[rxCustomValidators][formControl]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => RxCustomValidatorsDirective), multi: true }]
                }]
        }], propDecorators: { rxCustomValidators: [{
                type: Input
            }] } });

class RxDirectivesModule {
}
RxDirectivesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDirectivesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDirectivesModule, declarations: [RxCustomValidatorsDirective], exports: [RxCustomValidatorsDirective] });
RxDirectivesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDirectivesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxCustomValidatorsDirective],
                    exports: [RxCustomValidatorsDirective]
                }]
        }] });

var ConnectionTestStatus;
(function (ConnectionTestStatus) {
    ConnectionTestStatus["Invalid"] = "invalid";
    ConnectionTestStatus["Unknown"] = "unknown";
    ConnectionTestStatus["InProgress"] = "inProgress";
    ConnectionTestStatus["Passed"] = "passed";
    ConnectionTestStatus["Failed"] = "failed";
})(ConnectionTestStatus || (ConnectionTestStatus = {}));

class RxConnectionTesterComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.status = ConnectionTestStatus.Unknown;
        this.buttonType = 'primary';
        this.testConnection = new EventEmitter();
    }
    onTestConnection() {
        this.status = ConnectionTestStatus.InProgress;
        this.testConnection.emit();
    }
    isConnectionTestFailed() {
        return this.status === ConnectionTestStatus.Failed;
    }
    isConnectionTestPassed() {
        return this.status === ConnectionTestStatus.Passed;
    }
    isTestConnectionButtonDisabled() {
        return this.status !== ConnectionTestStatus.Unknown;
    }
    isConnectionTestInProgress() {
        return this.status === ConnectionTestStatus.InProgress;
    }
}
RxConnectionTesterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterComponent, deps: [{ token: i1$2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxConnectionTesterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxConnectionTesterComponent, selector: "rx-connection-tester", inputs: { status: "status", buttonType: "buttonType" }, outputs: { testConnection: "testConnection" }, ngImport: i0, template: "<div class=\"align-items-baseline d-flex\">\n  <button\n    adapt-button\n    [btn-type]=\"buttonType\"\n    type=\"button\"\n    rx-id=\"test-connection-button\"\n    [adaptInlineLoader]=\"isConnectionTestInProgress()\"\n    activeText=\"{{ 'com.bmc.arsys.rx.client.common.connection-tester.connecting.label' | translate }}\"\n    (click)=\"onTestConnection()\"\n    [disabled]=\"isTestConnectionButtonDisabled()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.connection-tester.test-connection.button.label' | translate }}\n  </button>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestFailed()\"\n    [config]=\"{\n      content: translateService.instant('com.bmc.arsys.rx.client.common.connection-tester.connection-failed.message'),\n      variant: 'danger',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n\n  <adapt-alert\n    class=\"ml-4\"\n    *ngIf=\"isConnectionTestPassed()\"\n    [config]=\"{\n      content: translateService.instant(\n        'com.bmc.arsys.rx.client.common.connection-tester.connection-succeeded.message'\n      ),\n      variant: 'success',\n      type: 'inline'\n    }\"\n  ></adapt-alert>\n</div>\n", components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }], directives: [{ type: i1$1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1$2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-connection-tester',
                    templateUrl: './connection-tester.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.TranslateService }]; }, propDecorators: { status: [{
                type: Input
            }], buttonType: [{
                type: Input
            }], testConnection: [{
                type: Output
            }] } });

class RxConnectionTesterModule {
}
RxConnectionTesterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxConnectionTesterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, declarations: [RxConnectionTesterComponent], imports: [CommonModule, i1$1.AdaptBusyModule, i1$1.AdaptAlertModule, AdaptButtonModule, TranslateModule], exports: [RxConnectionTesterComponent] });
RxConnectionTesterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, imports: [[CommonModule, AdaptBusyModule.forRoot(), AdaptAlertModule.forRoot(), AdaptButtonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxConnectionTesterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptBusyModule.forRoot(), AdaptAlertModule.forRoot(), AdaptButtonModule, TranslateModule],
                    declarations: [RxConnectionTesterComponent],
                    exports: [RxConnectionTesterComponent]
                }]
        }] });

class ReadOnlyFieldComponent {
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

class ReadOnlyFieldModule {
}
ReadOnlyFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReadOnlyFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldModule, declarations: [ReadOnlyFieldComponent], exports: [ReadOnlyFieldComponent] });
ReadOnlyFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ReadOnlyFieldComponent],
                    exports: [ReadOnlyFieldComponent]
                }]
        }] });

class ReadOnlyFieldsComponent {
    constructor() {
        this.fields = [];
    }
}
ReadOnlyFieldsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ReadOnlyFieldsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: { fields: "fields" }, ngImport: i0, template: "<rx-read-only-field\n  *ngFor=\"let field of fields\"\n  class=\"d-block form-group\"\n  label=\"{{ field.label }}\"\n  value=\"{{ field.value }}\"\n></rx-read-only-field>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: ReadOnlyFieldComponent, selector: "rx-read-only-field", inputs: ["label", "value"] }], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-read-only-fields',
                    templateUrl: './read-only-fields.component.html',
                    styleUrls: ['./read-only-fields.component.scss']
                }]
        }], propDecorators: { fields: [{
                type: Input
            }] } });

class ReadOnlyFieldsModule {
}
ReadOnlyFieldsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReadOnlyFieldsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, declarations: [ReadOnlyFieldsComponent], imports: [CommonModule, ReadOnlyFieldModule], exports: [ReadOnlyFieldsComponent] });
ReadOnlyFieldsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, imports: [[CommonModule, ReadOnlyFieldModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ReadOnlyFieldsComponent],
                    imports: [CommonModule, ReadOnlyFieldModule],
                    exports: [ReadOnlyFieldsComponent]
                }]
        }] });

class ReadOnlyFieldsModalComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.fields = this.activeModalRef.getData().fields;
    }
    close() {
        this.activeModalRef.close();
    }
}
ReadOnlyFieldsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalComponent, deps: [{ token: i1$1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
ReadOnlyFieldsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ReadOnlyFieldsModalComponent, selector: "rx-read-only-fields-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <rx-read-only-fields [fields]=\"fields\"></rx-read-only-fields>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"close()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":host ::ng-deep rx-read-only-field .read-only-content{max-height:11em;overflow-y:auto;word-break:break-all;white-space:pre-wrap}\n"], components: [{ type: ReadOnlyFieldsComponent, selector: "rx-read-only-fields", inputs: ["fields"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], pipes: { "translate": i1$2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-read-only-fields-modal',
                    templateUrl: './read-only-fields-modal.component.html',
                    styleUrls: ['./read-only-fields-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }]; } });

class ReadOnlyFieldsModalModule {
}
ReadOnlyFieldsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReadOnlyFieldsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, declarations: [ReadOnlyFieldsModalComponent], imports: [CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule], exports: [ReadOnlyFieldsModalComponent] });
ReadOnlyFieldsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, imports: [[CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ReadOnlyFieldsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ReadOnlyFieldsModalComponent],
                    imports: [CommonModule, ReadOnlyFieldModule, TranslateModule, ReadOnlyFieldsModule, AdaptButtonModule],
                    exports: [ReadOnlyFieldsModalComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ConnectionTestStatus, ProgressIndicatorModalComponent, ProgressIndicatorModalModule, ProgressIndicatorStatus, RX_MODAL, ReadOnlyFieldComponent, ReadOnlyFieldModule, ReadOnlyFieldsComponent, ReadOnlyFieldsModalComponent, ReadOnlyFieldsModalModule, ReadOnlyFieldsModule, RxBladeComponent, RxBladeModule, RxBreadcrumbBarComponent, RxBreadcrumbBarModule, RxBusyIndicatorComponent, RxBusyIndicatorModule, RxConnectionTesterComponent, RxConnectionTesterModule, RxCustomValidatorsDirective, RxDirectivesModule, RxHumanizedDateModule, RxHumanizedDatePipe, RxJsonViewerComponent, RxJsonViewerModule, RxLineLoaderComponent, RxLineLoaderModule, RxModalClass, RxModalComponent, RxModalModule, RxModalService, RxNameValuePairsEditorComponent, RxNameValuePairsEditorModule, RxUtilityModalsService, RxValidationIssuesComponent, RxValidationIssuesModule, RxVerticalTextTruncateDirective, RxVerticalTextTruncateModule, ValidationIssueType };
//# sourceMappingURL=helix-platform-ui-kit.js.map
