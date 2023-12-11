import * as i0 from '@angular/core';
import { Component, HostBinding, Input, NgModule, EventEmitter, ElementRef, Output, ViewChildren, Injectable, ViewChild, HostListener, ChangeDetectionStrategy, ViewContainerRef, Inject, SimpleChange, Directive, Renderer2 } from '@angular/core';
import * as i4 from '@angular/common';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, ReplaySubject, of, forkJoin, concat, EMPTY, throwError, Observable, BehaviorSubject, combineLatest, fromEvent, merge, iif, Subscription, timer, NEVER, from, noop as noop$1 } from 'rxjs';
import * as i1 from '@helix/platform/ui-kit';
import { RxBusyIndicatorModule, RxModalService, RxBreadcrumbBarModule, RxModalClass, RX_MODAL, RxModalModule, RxDirectivesModule, RxLineLoaderModule } from '@helix/platform/ui-kit';
import * as i2 from '@angular/forms';
import { NgControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormControl, NgModel, Validators, NgForm } from '@angular/forms';
import * as i1$1 from '@bmc-ux/adapt-angular';
import { AdaptButtonComponent, AdaptRxFormControlModule, AdaptButtonModule, AdaptRxCheckboxModule, AdaptPopoverModule, AdaptHighlightModule, AdaptRxLabelModule, AdaptRxTextfieldModule, AdaptEmptyStateModule, AdaptDropdownModule, AdaptTooltipModule, AdaptAccordionModule, AdaptRxSearchModule, DismissReasons, AdaptIconModule, AdaptModalModule, AdaptTreeModule, AdaptRxFeedbackModule, AdaptRxSelectModule, AdaptRxUploaderModule, AdaptColorPickerModule, AdaptRxCounterComponent, AdaptRxValidatorsModule, AdaptRxCounterModule, RxDatetimePickerMode, AdaptRxDatetimeModule, AdaptButtonGroupComponent, AdaptButtonGroupModule, AdaptRxTypeaheadComponent, AdaptRxTypeaheadModule, AdaptRxSwitchModule, AdaptMetatagModule, AdaptTagModule, AdaptRxTextareaModule, AdaptRxRadiobuttonModule, AdaptModalService, SelectModelFormat, AdaptRxSelectComponent, AdaptAlertModule, AdaptTranslateService, AdaptDockedPanelModule, AdaptCloseModule, AdaptAgreementModule, AdaptBusyModule, AdaptNavigationModule, AdaptTabsModule } from '@bmc-ux/adapt-angular';
import * as i4$1 from '@ngx-translate/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as i5 from '@helix/platform/association/api';
import * as i4$2 from '@helix/platform/named-list/api';
import * as i2$1 from '@helix/platform/process/api';
import * as i3 from '@helix/platform/record/api';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import * as i3$1 from '@helix/platform/view/api';
import { RX_VIEW_DEFINITION, OpenViewActionModalSize, RX_LEGACY_ICONS, RX_VIEW_ACTION, RX_SHELL } from '@helix/platform/view/api';
import { map, shareReplay, filter as filter$1, first, takeUntil, switchMap, debounceTime, tap, startWith, distinctUntilChanged, concatMap, finalize, take, switchMapTo, takeWhile, withLatestFrom, catchError, defaultIfEmpty, skip } from 'rxjs/operators';
import * as i1$2 from '@helix/platform/shared/api';
import { RX_BUNDLE, RxDefinitionModule, RX_APPLICATION, ExpressionOperator, RX_THEMING, ExpressionParserToken, RX_OVERLAY, FormBuilderEvent, RxNotificationModule, RX_PERMISSION, DataPage, RxComponentCanDeactivateGuard, RxAuthService, RxCurrentUserService, RxGlobalCacheService, RxAngularApplicationService, RxSystemConfigurationService, RxFeatureService, RX_USER, DevelopmentMode } from '@helix/platform/shared/api';
import { filter, throttle, get, find, remove, sortBy, flow, reduce, isArray, trim, endsWith, includes, startsWith, noop, last, uniqueId, isEmpty, map as map$1, compact, findIndex, has, isString, isUndefined, head, isNil, castArray, isEqual, kebabCase, forEach, isNull, isNumber, upperFirst, isNaN, size, isObject, once, pull, uniqBy, identity, cloneDeep, keyBy, keys, merge as merge$1, set, lowerCase, isBoolean, max, some, pullAllBy, reject, mapValues } from 'lodash';
import * as i1$3 from '@helix/platform/utils';
import { RxError, RxNoWhitespaceValidatorModule, RX_NUMBER, RxUniqueValidatorModule } from '@helix/platform/utils';
import * as i4$3 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i2$2 from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import * as i1$4 from '@angular/router';
import { RouterModule, Router, NavigationEnd, NavigationError, NavigationCancel, NavigationStart } from '@angular/router';
import { AdaptSearchModule, AdaptTypeaheadSubModule, AdaptCheckbox2Module, AdaptTextFieldModule, AdaptSelectModule } from '@bmc-ux/obsolete';
import * as i3$2 from 'ckeditor4-angular';
import { CKEditorComponent, CKEditorModule } from 'ckeditor4-angular';
import { saveAs } from 'file-saver';
import moment from 'moment-es6';
import iconFontConfig from '@bmc-ux/dpl-iconfont/config/if_dpl.json';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER } from '@angular/cdk/keycodes';
import * as i6 from '@bmc-ux/adapt-table';
import { AdaptTableModule } from '@bmc-ux/adapt-table';
import { __awaiter } from 'tslib';
import * as i3$3 from '@bmc-ux/adapt-radar';
import { AdaptRadarHostingType, AdaptRadarProductAreaName, AdaptRadarSupportedProviders, AdaptRadarGainsightIdentifyActionName, AdaptRadarModule } from '@bmc-ux/adapt-radar';
import * as i4$4 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

class AdminSettingsComponent {
    constructor() {
        this.hostClass = 'd-flex flex-column position-relative h-100';
        this.busy = null;
    }
}
AdminSettingsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AdminSettingsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminSettingsComponent, selector: "rx-admin-settings", inputs: { header: "header", busy: "busy" }, host: { properties: { "class": "this.hostClass" } }, ngImport: i0, template: "<rx-busy-indicator [options]=\"{ busy: busy, loaderType: 'section', delay: 500 }\"></rx-busy-indicator>\n\n<div [class.is-hidden]=\"busy && !busy.closed\" class=\"h-100 d-flex flex-column\">\n  <h1 *ngIf=\"header\">{{ header }}</h1>\n\n  <ng-content></ng-content>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.is-hidden{display:none!important}:host{padding:1rem}\n"], components: [{ type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-settings',
                    templateUrl: './admin-settings.component.html',
                    styleUrls: ['./admin-settings.component.scss']
                }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }], header: [{
                type: Input
            }], busy: [{
                type: Input
            }] } });

class AdminSettingsModule {
}
AdminSettingsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdminSettingsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, declarations: [AdminSettingsComponent], imports: [CommonModule, RxBusyIndicatorModule], exports: [AdminSettingsComponent] });
AdminSettingsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, providers: [RxModalService], imports: [[CommonModule, RxBusyIndicatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AdminSettingsComponent],
                    providers: [RxModalService],
                    imports: [CommonModule, RxBusyIndicatorModule],
                    exports: [AdminSettingsComponent]
                }]
        }] });

class ValueAccessor {
    get value() {
        return this.innerValue;
    }
    set value(value) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.onChange(value);
            this.onSetValue(value);
        }
    }
    touch() { }
    writeValue(value) {
        this.innerValue = value;
        this.onWriteValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onWriteValue(value) { }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    // helper that called when control sets value to model
    onSetValue(value) { }
}

class RxBooleanComponent extends ValueAccessor {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxBlur = new EventEmitter();
    }
    ngOnInit() {
        this.control = this.injector.get(NgControl).control;
    }
    getButtonType(value) {
        return value === this.value ? 'primary' : 'secondary';
    }
    onButtonBlur(event) {
        if (!event.relatedTarget || !this.buttons.find((element) => element.nativeElement === event.relatedTarget)) {
            this.onTouched();
            this.rxBlur.emit(event);
        }
    }
    setValue(value) {
        if (this.value === value) {
            this.value = null;
        }
        else {
            this.value = value;
        }
    }
}
RxBooleanComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxBooleanComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxBooleanComponent, selector: "rx-boolean", inputs: { shouldDisplayAsCheckbox: "shouldDisplayAsCheckbox", required: "required", isDisabled: "isDisabled", label: "label", tooltip: "tooltip" }, outputs: { rxBlur: "rxBlur" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxBooleanComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "buttons", predicate: AdaptButtonComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"!shouldDisplayAsCheckbox\" [class.has-danger]=\"adaptRxFeedbackRef.hasUIErrorState\">\n  <adapt-rx-control-label [label]=\"label\" [showRequiredLabel]=\"required\"></adapt-rx-control-label>\n\n  <div\n    class=\"btn-group\"\n    [attr.tabindex]=\"isDisabled ? 0 : undefined\"\n    [attr.aria-label]=\"isDisabled ? label + value : label\"\n    [class.focusable]=\"isDisabled\"\n  >\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(true)\"\n      (click)=\"setValue(true)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.true' | translate\"\n      [attr.aria-pressed]=\"value === true\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"true-button\"\n    >\n      <span class=\"d-icon-check_adapt\"></span>\n    </button>\n\n    <button\n      adapt-button\n      size=\"small\"\n      [disabled]=\"isDisabled\"\n      [btn-type]=\"getButtonType(false)\"\n      (click)=\"setValue(false)\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.false' | translate\"\n      [attr.aria-pressed]=\"value === false\"\n      (blur)=\"onButtonBlur($event)\"\n      rx-id=\"false-button\"\n    >\n      <span class=\"d-icon-circle_slash_o\"></span>\n    </button>\n  </div>\n\n  <adapt-rx-feedback\n    #adaptRxFeedbackRef\n    [errors]=\"control.errors\"\n    [controlTouched]=\"control.touched\"\n  ></adapt-rx-feedback>\n</div>\n\n<adapt-rx-checkbox\n  *ngIf=\"shouldDisplayAsCheckbox\"\n  [required]=\"required\"\n  [readonly]=\"isDisabled\"\n  [label]=\"label\"\n  [(ngModel)]=\"value\"\n  (onBlur)=\"onTouched(); rxBlur.emit($event)\"\n  [tooltip]=\"\n    tooltip\n      ? {\n          iconName: 'question_circle_o',\n          content: tooltip,\n          popoverMode: true\n        }\n      : null\n  \"\n>\n</adapt-rx-checkbox>\n", styles: [".btn-group{display:flex}.btn-group .btn-primary{margin-top:0;margin-bottom:0}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i1$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-boolean',
                    templateUrl: './boolean.component.html',
                    styleUrls: ['./boolean.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxBooleanComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { shouldDisplayAsCheckbox: [{
                type: Input
            }], required: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], label: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], rxBlur: [{
                type: Output
            }], buttons: [{
                type: ViewChildren,
                args: [AdaptButtonComponent, { read: ElementRef }]
            }] } });

class RxBooleanModule {
}
RxBooleanModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxBooleanModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, declarations: [RxBooleanComponent], imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AdaptRxFormControlModule,
        AdaptButtonModule,
        AdaptRxCheckboxModule,
        TranslateModule,
        AdaptPopoverModule], exports: [RxBooleanComponent] });
RxBooleanModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, imports: [[
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            AdaptRxFormControlModule,
            AdaptButtonModule,
            AdaptRxCheckboxModule,
            TranslateModule,
            AdaptPopoverModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxBooleanModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxFormControlModule,
                        AdaptButtonModule,
                        AdaptRxCheckboxModule,
                        TranslateModule,
                        AdaptPopoverModule
                    ],
                    declarations: [RxBooleanComponent],
                    exports: [RxBooleanComponent]
                }]
        }] });

class RxDefinitionPickerCacheService {
    constructor(recordDefinitionDataPageService, processDefinitionDataPageService, viewDefinitionDataPageService, namedListDefinitionDataPageService, associationDefinitionDataPageService, rxChatbotDefinitionDataPageService) {
        this.recordDefinitionDataPageService = recordDefinitionDataPageService;
        this.processDefinitionDataPageService = processDefinitionDataPageService;
        this.viewDefinitionDataPageService = viewDefinitionDataPageService;
        this.namedListDefinitionDataPageService = namedListDefinitionDataPageService;
        this.associationDefinitionDataPageService = associationDefinitionDataPageService;
        this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
        this.registeredConsumerCount = 0;
        this.bundleRecordDefinitionDescriptors = {};
        this.bundleDataRecordDefinitionDescriptors = {};
        this.bundleRegularRecordDefinitionDescriptors = {};
        this.bundleRegularDataRecordDefinitionDescriptors = {};
        this.bundleStandardDataRecordDefinitionDescriptors = {};
        this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
        this.bundleInheritableRecordDefinitionDescriptors = {};
        this.bundleProcessDefinitionDescriptors = {};
        this.bundlePublicProcessDefinitionDescriptors = {};
        this.bundleViewDefinitionDescriptor = {};
        this.bundleNamedListDefinitionDescriptors = {};
        this.bundleAssociationDefinitionDescriptors = {};
        this.bundleChatbotDefinitionDescriptors = {};
    }
    getBundleRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRecordDefinitionDescriptors[bundleId]) {
            this.bundleRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRecordDefinitionDescriptors[bundleId];
    }
    getBundleDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleDataRecordDefinitionDescriptors[bundleId];
    }
    getBundleStandardDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleStandardDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleStandardDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleStandardDataRecordDefinitionDescriptors[bundleId];
    }
    getAllRecordDefinitionDescriptors() {
        if (!this.allRecordDefinitionDescriptors) {
            this.allRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRecordDefinitionDescriptors;
    }
    getAllDataRecordDefinitionDescriptors() {
        if (!this.allDataRecordDefinitionDescriptors) {
            this.allDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allDataRecordDefinitionDescriptors;
    }
    getAllStandardDataRecordDefinitionDescriptors() {
        if (!this.allStandardDataRecordDefinitionDescriptors) {
            this.allStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allStandardDataRecordDefinitionDescriptors;
    }
    getRxRecordDefinitionDescriptors() {
        if (!this.rxRecordDefinitionDescriptors) {
            this.rxRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    rxDefinitionsOnly: true,
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRecordDefinitionDescriptors;
    }
    getRxDataRecordDefinitionDescriptors() {
        if (!this.rxDataRecordDefinitionDescriptors) {
            this.rxDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxDataRecordDefinitionDescriptors;
    }
    getRxStandardDataRecordDefinitionDescriptors() {
        if (!this.rxStandardDataRecordDefinitionDescriptors) {
            this.rxStandardDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    excludeAuditRecordDefinitions: true,
                    excludeCustomRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxStandardDataRecordDefinitionDescriptors;
    }
    getAllRegularRecordDefinitionDescriptors() {
        if (!this.allRegularRecordDefinitionDescriptors) {
            this.allRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRegularRecordDefinitionDescriptors;
    }
    getAllRegularDataRecordDefinitionDescriptors() {
        if (!this.allRegularDataRecordDefinitionDescriptors) {
            this.allRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    excludeAuditRecordDefinitions: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allRegularDataRecordDefinitionDescriptors;
    }
    getRxRegularRecordDefinitionDescriptors() {
        if (!this.rxRegularRecordDefinitionDescriptors) {
            this.rxRegularRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRegularRecordDefinitionDescriptors;
    }
    getRxRegularDataRecordDefinitionDescriptors() {
        if (!this.rxRegularDataRecordDefinitionDescriptors) {
            this.rxRegularDataRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    rxDefinitionsOnly: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.rxRegularDataRecordDefinitionDescriptors;
    }
    getBundleRegularRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRegularRecordDefinitionDescriptors[bundleId]) {
            this.bundleRegularRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRegularRecordDefinitionDescriptors[bundleId];
    }
    getBundleRegularDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleRegularDataRecordDefinitionDescriptors[bundleId]) {
            this.bundleRegularDataRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    resourceType: RX_RECORD_DEFINITION.recordDefinitionTypes.regular.recordDefinitionType,
                    excludeAuditRecordDefinitions: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleRegularDataRecordDefinitionDescriptors[bundleId];
    }
    getAllPublicRegularDataRecordDefinitionDescriptors() {
        if (!this.allPublicRegularDataRecordDefinitionDescriptors) {
            this.allPublicRegularDataRecordDefinitionDescriptors = this.getAllRegularDataRecordDefinitionDescriptors().pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.allPublicRegularDataRecordDefinitionDescriptors;
    }
    getRxPublicRegularDataRecordDefinitionDescriptors() {
        if (!this.rxPublicRegularDataRecordDefinitionDescriptors) {
            this.rxPublicRegularDataRecordDefinitionDescriptors = this.getRxRegularDataRecordDefinitionDescriptors().pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.rxPublicRegularDataRecordDefinitionDescriptors;
    }
    getBundlePublicRegularDataRecordDefinitionDescriptors(bundleId) {
        if (!this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId]) {
            this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId] =
                this.getBundleRegularDataRecordDefinitionDescriptors(bundleId).pipe(map((recordDefinitionDescriptors) => filter(recordDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })));
        }
        return this.bundlePublicRegularDataRecordDefinitionDescriptors[bundleId];
    }
    getAllInheritableRecordDefinitionDescriptors() {
        if (!this.allInheritableRecordDefinitionDescriptors) {
            this.allInheritableRecordDefinitionDescriptors = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    inheritableDefinitionsOnly: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allInheritableRecordDefinitionDescriptors;
    }
    getBundleInheritableRecordDefinitionDescriptors(bundleId) {
        if (!this.bundleInheritableRecordDefinitionDescriptors[bundleId]) {
            this.bundleInheritableRecordDefinitionDescriptors[bundleId] = this.recordDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    inheritableDefinitionsOnly: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleInheritableRecordDefinitionDescriptors[bundleId];
    }
    getAllProcessDefinitionDescriptors() {
        if (!this.allProcessDefinitionDescriptors) {
            this.allProcessDefinitionDescriptors = this.processDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allProcessDefinitionDescriptors;
    }
    getAllPublicProcessDefinitionDescriptors() {
        if (!this.allPublicProcessDefinitionDescriptors) {
            this.allPublicProcessDefinitionDescriptors = this.getAllProcessDefinitionDescriptors().pipe(map((processDefinitionDescriptors) => filter(processDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })), shareReplay(1));
        }
        return this.allPublicProcessDefinitionDescriptors;
    }
    getBundleProcessDefinitionDescriptors(bundleId) {
        if (!this.bundleProcessDefinitionDescriptors[bundleId]) {
            this.bundleProcessDefinitionDescriptors[bundleId] = this.processDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleProcessDefinitionDescriptors[bundleId];
    }
    getBundlePublicProcessDefinitionDescriptors(bundleId) {
        if (!this.bundlePublicProcessDefinitionDescriptors[bundleId]) {
            this.bundlePublicProcessDefinitionDescriptors[bundleId] = this.getBundleProcessDefinitionDescriptors(bundleId).pipe(map((processDefinitionDescriptors) => filter(processDefinitionDescriptors, { scope: RX_BUNDLE.definitionScopeTypes.public })));
        }
        return this.bundlePublicProcessDefinitionDescriptors[bundleId];
    }
    getAllViewDefinitionDescriptors() {
        if (!this.allViewDefinitionDescriptors) {
            this.allViewDefinitionDescriptors = this.viewDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    viewType: RX_VIEW_DEFINITION.types.regular
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allViewDefinitionDescriptors;
    }
    getBundleViewDefinitionDescriptors(bundleId) {
        if (!this.bundleViewDefinitionDescriptor[bundleId]) {
            this.bundleViewDefinitionDescriptor[bundleId] = this.viewDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true,
                    viewType: RX_VIEW_DEFINITION.types.regular
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleViewDefinitionDescriptor[bundleId];
    }
    getAllNamedListDefinitionDescriptors() {
        if (!this.allNamedListDefinitionDescriptors) {
            this.allNamedListDefinitionDescriptors = this.namedListDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allNamedListDefinitionDescriptors;
    }
    getBundleNamedListDefinitionDescriptors(bundleId) {
        if (!this.bundleNamedListDefinitionDescriptors[bundleId]) {
            this.bundleNamedListDefinitionDescriptors[bundleId] = this.namedListDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleNamedListDefinitionDescriptors[bundleId];
    }
    getAllAssociationDefinitionDescriptors() {
        if (!this.allAssociationDefinitionDescriptors) {
            this.allAssociationDefinitionDescriptors = this.associationDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['name', 'scope']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allAssociationDefinitionDescriptors;
    }
    getBundleAssociationDefinitionDescriptors(bundleId) {
        if (!this.bundleAssociationDefinitionDescriptors[bundleId]) {
            this.bundleAssociationDefinitionDescriptors[bundleId] = this.associationDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['name', 'scope'],
                    requireDependent: true
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleAssociationDefinitionDescriptors[bundleId];
    }
    getAllChatbotDefinitionDescriptors() {
        if (!this.allChatbotDefinitionDescriptors) {
            this.allChatbotDefinitionDescriptors = this.rxChatbotDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': ''
                },
                params: {
                    propertySelection: ['chatbotName']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.allChatbotDefinitionDescriptors;
    }
    getBundleChatbotDefinitionDescriptors(bundleId) {
        if (!this.bundleChatbotDefinitionDescriptors[bundleId]) {
            this.bundleChatbotDefinitionDescriptors[bundleId] = this.rxChatbotDefinitionDataPageService
                .get({
                headers: {
                    'default-bundle-scope': bundleId
                },
                params: {
                    propertySelection: ['chatbotName']
                }
            })
                .pipe(map((response) => response.data), shareReplay(1));
        }
        return this.bundleChatbotDefinitionDescriptors[bundleId];
    }
    registerConsumer() {
        this.registeredConsumerCount++;
    }
    unRegisterConsumer() {
        this.registeredConsumerCount--;
        if (this.registeredConsumerCount === 0) {
            this.clear();
        }
    }
    clear() {
        this.bundleRecordDefinitionDescriptors = {};
        this.bundleDataRecordDefinitionDescriptors = {};
        this.bundleRegularRecordDefinitionDescriptors = {};
        this.bundleRegularDataRecordDefinitionDescriptors = {};
        this.bundleStandardDataRecordDefinitionDescriptors = {};
        this.bundleInheritableRecordDefinitionDescriptors = {};
        this.bundleProcessDefinitionDescriptors = {};
        this.bundlePublicProcessDefinitionDescriptors = {};
        this.bundleViewDefinitionDescriptor = {};
        this.bundleNamedListDefinitionDescriptors = {};
        this.bundleAssociationDefinitionDescriptors = {};
        this.bundleChatbotDefinitionDescriptors = {};
        this.bundlePublicRegularDataRecordDefinitionDescriptors = {};
        this.rxRecordDefinitionDescriptors = null;
        this.rxDataRecordDefinitionDescriptors = null;
        this.rxStandardDataRecordDefinitionDescriptors = null;
        this.allRecordDefinitionDescriptors = null;
        this.allDataRecordDefinitionDescriptors = null;
        this.allStandardDataRecordDefinitionDescriptors = null;
        this.allRegularRecordDefinitionDescriptors = null;
        this.allRegularDataRecordDefinitionDescriptors = null;
        this.rxRegularRecordDefinitionDescriptors = null;
        this.rxRegularDataRecordDefinitionDescriptors = null;
        this.allInheritableRecordDefinitionDescriptors = null;
        this.allProcessDefinitionDescriptors = null;
        this.allPublicProcessDefinitionDescriptors = null;
        this.allViewDefinitionDescriptors = null;
        this.allNamedListDefinitionDescriptors = null;
        this.allAssociationDefinitionDescriptors = null;
        this.allChatbotDefinitionDescriptors = null;
        this.allPublicRegularDataRecordDefinitionDescriptors = null;
        this.rxPublicRegularDataRecordDefinitionDescriptors = null;
    }
}
RxDefinitionPickerCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, deps: [{ token: i3.RxRecordDefinitionDataPageService }, { token: i2$1.RxProcessDefinitionDataPageService }, { token: i3$1.RxViewDefinitionDataPageService }, { token: i4$2.RxNamedListDefinitionDataPageService }, { token: i5.RxAssociationDefinitionDataPageService }, { token: i1$2.RxChatbotDefinitionDataPageService }], target: i0.ɵɵFactoryTarget.Injectable });
RxDefinitionPickerCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i3.RxRecordDefinitionDataPageService }, { type: i2$1.RxProcessDefinitionDataPageService }, { type: i3$1.RxViewDefinitionDataPageService }, { type: i4$2.RxNamedListDefinitionDataPageService }, { type: i5.RxAssociationDefinitionDataPageService }, { type: i1$2.RxChatbotDefinitionDataPageService }]; } });

var RxDefinitionPickerType;
(function (RxDefinitionPickerType) {
    RxDefinitionPickerType["View"] = "view";
    RxDefinitionPickerType["Record"] = "record";
    RxDefinitionPickerType["DataRecord"] = "dataRecord";
    RxDefinitionPickerType["StandardDataRecord"] = "standardDataRecord";
    RxDefinitionPickerType["RegularRecord"] = "regularRecord";
    RxDefinitionPickerType["RegularDataRecord"] = "regularDataRecord";
    RxDefinitionPickerType["PublicRegularDataRecord"] = "publicRegularDataRecord";
    RxDefinitionPickerType["InheritableRecord"] = "inheritableRecord";
    RxDefinitionPickerType["NamedList"] = "namedList";
    RxDefinitionPickerType["Association"] = "association";
    RxDefinitionPickerType["Process"] = "process";
    RxDefinitionPickerType["PublicProcess"] = "publicProcess";
    RxDefinitionPickerType["Chatbot"] = "chatbot";
})(RxDefinitionPickerType || (RxDefinitionPickerType = {}));
var RxDefinitionPickerScope;
(function (RxDefinitionPickerScope) {
    RxDefinitionPickerScope["All"] = "all";
    RxDefinitionPickerScope["Bundle"] = "bundle";
    RxDefinitionPickerScope["Rx"] = "rx";
})(RxDefinitionPickerScope || (RxDefinitionPickerScope = {}));
const RX_DEFINITION_PICKER = {
    definitionScopes: {
        all: RxDefinitionPickerScope.All,
        bundle: RxDefinitionPickerScope.Bundle,
        rx: RxDefinitionPickerScope.Rx
    },
    definitionTypes: {
        [RxDefinitionPickerType.View]: {
            type: RxDefinitionPickerType.View,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-views.label',
            dataGetters: {
                all: 'getAllViewDefinitionDescriptors',
                bundle: 'getBundleViewDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Record]: {
            type: RxDefinitionPickerType.Record,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRecordDefinitionDescriptors',
                rx: 'getRxRecordDefinitionDescriptors',
                bundle: 'getBundleRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.DataRecord]: {
            type: RxDefinitionPickerType.DataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllDataRecordDefinitionDescriptors',
                rx: 'getRxDataRecordDefinitionDescriptors',
                bundle: 'getBundleDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.StandardDataRecord]: {
            type: RxDefinitionPickerType.StandardDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllStandardDataRecordDefinitionDescriptors',
                rx: 'getRxStandardDataRecordDefinitionDescriptors',
                bundle: 'getBundleStandardDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.RegularRecord]: {
            type: RxDefinitionPickerType.RegularRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRegularRecordDefinitionDescriptors',
                rx: 'getRxRegularRecordDefinitionDescriptors',
                bundle: 'getBundleRegularRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.RegularDataRecord]: {
            type: RxDefinitionPickerType.RegularDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllRegularDataRecordDefinitionDescriptors',
                rx: 'getRxRegularDataRecordDefinitionDescriptors',
                bundle: 'getBundleRegularDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.PublicRegularDataRecord]: {
            type: RxDefinitionPickerType.PublicRegularDataRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllPublicRegularDataRecordDefinitionDescriptors',
                rx: 'getRxPublicRegularDataRecordDefinitionDescriptors',
                bundle: 'getBundlePublicRegularDataRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.InheritableRecord]: {
            type: RxDefinitionPickerType.InheritableRecord,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-records.label',
            dataGetters: {
                all: 'getAllInheritableRecordDefinitionDescriptors',
                bundle: 'getBundleInheritableRecordDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.NamedList]: {
            type: RxDefinitionPickerType.NamedList,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-named-lists.label',
            dataGetters: {
                all: 'getAllNamedListDefinitionDescriptors',
                bundle: 'getBundleNamedListDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Association]: {
            type: RxDefinitionPickerType.Association,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-associations.label',
            dataGetters: {
                all: 'getAllAssociationDefinitionDescriptors',
                bundle: 'getBundleAssociationDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Process]: {
            type: RxDefinitionPickerType.Process,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
            dataGetters: {
                all: 'getAllProcessDefinitionDescriptors',
                bundle: 'getBundleProcessDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.PublicProcess]: {
            type: RxDefinitionPickerType.Process,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-processes.label',
            dataGetters: {
                all: 'getAllPublicProcessDefinitionDescriptors',
                bundle: 'getBundlePublicProcessDefinitionDescriptors'
            }
        },
        [RxDefinitionPickerType.Chatbot]: {
            type: RxDefinitionPickerType.Chatbot,
            allDefinitionsLabelKey: 'com.bmc.arsys.rx.client.definition-picker.all-chatbots.label',
            dataGetters: {
                all: 'getAllChatbotDefinitionDescriptors',
                bundle: 'getBundleChatbotDefinitionDescriptors'
            }
        }
    }
};

class RxDefinitionPickerComponent extends ValueAccessor {
    constructor(renderer, rxBundleCacheService, rxDefinitionNameService, rxDefinitionPickerCacheService, rxGlobalCacheService, rxStringService, translateService, changeDetectorRef) {
        super();
        this.renderer = renderer;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxDefinitionPickerCacheService = rxDefinitionPickerCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxStringService = rxStringService;
        this.translateService = translateService;
        this.changeDetectorRef = changeDetectorRef;
        this.isDisabled = false;
        this.searchMode = false;
        this.searchQuery = '';
        this.onPickerToggle$ = new Subject();
        this.bundleId = '';
        this.destroyed$ = new ReplaySubject(1);
        this.globalDefinitionsLabel = this.translateService.instant('com.bmc.arsys.rx.client.common.global-items.label');
        this.defaultOptions = {
            availableDefinitionPickerStates: {
                definitionButtonsGroups: [RxDefinitionPickerScope.Bundle, RxDefinitionPickerScope.All],
                search: RxDefinitionPickerScope.All
            },
            texts: {
                placeholder: this.translateService.instant('com.bmc.arsys.rx.client.common.select.label'),
                noBundleDeployed: this.translateService.instant('com.bmc.arsys.rx.client.definition-picker.no-bundle-deployed.label'),
                noDefinitionsFound: this.translateService.instant('com.bmc.arsys.rx.client.definition-picker.no-definitions-found.label')
            }
        };
        this.scrollHandlerThrottled = throttle(this.scrollHandler.bind(this), 100);
    }
    onWindowResize() {
        if (this.dropdown.isOpen()) {
            this.dropdown.close();
        }
    }
    ngOnInit() {
        this.config = Object.assign(Object.assign(Object.assign({}, this.defaultOptions), this.options), { texts: Object.assign(Object.assign({}, this.defaultOptions.texts), this.options.texts) });
        this.rxDefinitionPickerCacheService.registerConsumer();
        this.bundleId = this.config.bundleId || this.rxBundleCacheService.bundleId;
        this.getCurrentBundleFriendlyName();
        this.definitionTypeDescriptor = RX_DEFINITION_PICKER.definitionTypes[this.config.definitionType];
        this.definitionScopes = this.config.availableDefinitionPickerStates.definitionButtonsGroups;
        this.searchScope = this.config.availableDefinitionPickerStates.search;
        this.allDefinitionsLabel = this.translateService.instant(this.definitionTypeDescriptor.allDefinitionsLabelKey);
        this.onPickerToggle$
            .pipe(filter$1((isOpen) => Boolean(isOpen)), first(), takeUntil(this.destroyed$))
            .subscribe((isOpen) => {
            this.getDefinitions(this.definitionScopes[0]);
        });
        this.onPickerToggle$
            .pipe(filter$1((isOpen) => !isOpen), takeUntil(this.destroyed$))
            .subscribe(() => this.resetPickerState());
        window.addEventListener('scroll', this.scrollHandlerThrottled, true);
    }
    ngOnDestroy() {
        this.rxDefinitionPickerCacheService.unRegisterConsumer();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        window.removeEventListener('scroll', this.scrollHandlerThrottled, true);
    }
    scrollHandler(event) {
        var _a, _b;
        if (this.dropdown.isOpen() &&
            get(event.target, 'style.visibility') !== 'hidden' &&
            !(event.target === ((_a = this.definitionTreeElementRef) === null || _a === void 0 ? void 0 : _a.nativeElement) ||
                event.target === ((_b = this.searchField) === null || _b === void 0 ? void 0 : _b.inputRef.nativeElement))) {
            this.dropdown.close();
        }
    }
    getDefinitionProperties(definitionDescriptors) {
        return this.rxGlobalCacheService.getLicensedBundleDescriptors().pipe(map((bundleDescriptors) => {
            return definitionDescriptors.map((definitionDescriptor) => {
                const bundleId = this.rxDefinitionNameService.getBundleId(definitionDescriptor.name);
                const bundleDescriptor = find(bundleDescriptors, { id: bundleId });
                const bundleName = bundleDescriptor
                    ? bundleDescriptor.friendlyName || bundleDescriptor.id
                    : bundleId || this.globalDefinitionsLabel;
                return {
                    bundleName,
                    bundleId,
                    scope: definitionDescriptor.scope,
                    name: definitionDescriptor.name,
                    displayName: this.rxDefinitionNameService.getDisplayName(definitionDescriptor.name)
                };
            });
        }));
    }
    groupDefinitionsByBundle(definitionProperties) {
        const isBundleScopeSelected = this.activeDefinitionScope === RxDefinitionPickerScope.Bundle;
        let hasExpandedBundle = false;
        const bundleGroups = definitionProperties
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
            .reduce((bundles, currentDefinitionProperties) => {
            let bundle = bundles.find((bundleItem) => bundleItem.name === currentDefinitionProperties.bundleName);
            const isSelectedDefinition = this.value === currentDefinitionProperties.name;
            if (!bundle) {
                bundle = {
                    id: currentDefinitionProperties.bundleId,
                    name: currentDefinitionProperties.bundleName,
                    isPublic: currentDefinitionProperties.scope === RX_BUNDLE.definitionScopeTypes.public,
                    definitions: [],
                    isExpanded: false
                };
                bundles.push(bundle);
            }
            if (isSelectedDefinition) {
                bundle.isExpanded = true;
                hasExpandedBundle = true;
            }
            bundle.definitions.push({
                name: currentDefinitionProperties.name,
                displayName: currentDefinitionProperties.displayName,
                isPublic: currentDefinitionProperties.scope === RX_BUNDLE.definitionScopeTypes.public
            });
            return bundles;
        }, [])
            .sort((firstBundle, secondBundle) => {
            if ((this.activeDefinitionScope === RxDefinitionPickerScope.Bundle && this.bundleId === firstBundle.id) ||
                firstBundle.name === this.globalDefinitionsLabel) {
                return -1;
            }
            if ((this.activeDefinitionScope === RxDefinitionPickerScope.Bundle && this.bundleId === secondBundle.id) ||
                secondBundle.name === this.globalDefinitionsLabel) {
                return 1;
            }
            return firstBundle.name.localeCompare(secondBundle.name);
        });
        if (isBundleScopeSelected && !hasExpandedBundle && bundleGroups[0]) {
            bundleGroups[0].isExpanded = true;
        }
        return bundleGroups;
    }
    getDefinitions(definitionScope) {
        this.activeDefinitionScope = definitionScope;
        const dataGetter = this.definitionTypeDescriptor.dataGetters[definitionScope];
        let definitions$;
        if (definitionScope === RX_DEFINITION_PICKER.definitionScopes.bundle) {
            definitions$ = this.rxGlobalCacheService.getBundleDescriptor(this.bundleId).pipe(switchMap((bundle) => {
                return bundle ? this.rxDefinitionPickerCacheService[dataGetter](this.bundleId) : of([]);
            }));
        }
        else {
            definitions$ = this.rxDefinitionPickerCacheService[dataGetter]();
        }
        return (this.bundles$ = definitions$.pipe(switchMap((descriptors) => this.getDefinitionProperties(descriptors)), map((definitionsProperties) => this.groupDefinitionsByBundle(definitionsProperties))));
    }
    selectDefinition(definitionName) {
        this.dropdown.close();
        this.setValue(definitionName).then(() => {
            // additional reset after value set to update expanded sections
            this.resetPickerState();
        });
    }
    clearDefinition(e) {
        e.stopPropagation();
        this.setValue(null);
    }
    setValue(newValue) {
        if (this.value !== newValue) {
            if (this.options.beforeValueChange) {
                return this.options.beforeValueChange(this.value, newValue).then((response) => {
                    if (response) {
                        this.value = newValue;
                    }
                    return response;
                });
            }
            else {
                this.value = newValue;
                return Promise.resolve(true);
            }
        }
        else {
            return Promise.resolve(false);
        }
    }
    setDropdownWidth() {
        setTimeout(() => {
            const dropdownButton = this.renderer.selectRootElement(this.dropdownButton.nativeElement, true);
            const dropdownMenuHeader = this.renderer.selectRootElement(this.dropdownMenuHeader.nativeElement, true);
            // 14px - combined left and right padding around the buttons in the header
            // 2px - border
            this.dropdownWidth = Math.max(dropdownButton.clientWidth, dropdownMenuHeader.clientWidth + 14) + 2;
            // This is needed when definition picker is used in a component with OnPush change detection strategy
            // TODO: this needs to be revisited when OnPush strategy is applied to the definition picker itself.
            this.changeDetectorRef.markForCheck();
        });
    }
    enableSearchMode(searchQuery) {
        this.searchMode = true;
        this.previousDefinitionScope = this.activeDefinitionScope;
        if (searchQuery) {
            this.searchQuery = searchQuery;
            this.search(searchQuery);
        }
        else {
            this.getDefinitions(this.searchScope);
        }
    }
    disableSearchMode() {
        this.resetPickerState();
    }
    resetPickerState() {
        this.getDefinitions(this.searchMode ? this.previousDefinitionScope : this.activeDefinitionScope);
        this.searchMode = false;
        this.searchQuery = '';
    }
    search(searchQuery) {
        return (this.bundles$ = this.getDefinitions(this.searchScope).pipe(debounceTime(250), map((descriptors) => descriptors
            .filter((descriptor) => {
            return searchQuery.includes(':')
                ? this.rxStringService.caseInsensitiveSearch(descriptor.name, this.getBundleNameSearchQuery(searchQuery))
                : true;
        })
            .map((descriptor) => (Object.assign(Object.assign({}, descriptor), { definitions: descriptor.definitions.filter((definition) => {
                return this.rxStringService.caseInsensitiveSearch(definition.displayName, this.getDefinitionNameSearchQuery(searchQuery));
            }) })))
            .filter((descriptor) => descriptor.definitions.length > 0)
            .map((descriptor) => (Object.assign(Object.assign({}, descriptor), { isExpanded: true }))))));
    }
    focus() {
        this.renderer.selectRootElement(this.dropdownButton.nativeElement, true).click();
    }
    onPaste(event) {
        const pastedText = event.clipboardData.getData('text/plain');
        if (this.dropdown.isOpen() && !this.searchMode && pastedText) {
            this.enableSearchMode(pastedText);
        }
    }
    onKeypress(event) {
        if (this.dropdown.isOpen() && !this.searchMode && event.key) {
            this.enableSearchMode(event.key);
        }
    }
    trackByBundle(index, bundle) {
        return bundle.id;
    }
    trackByDefinition(index, bundle) {
        return bundle.name;
    }
    ngOnChanges(changes) {
        if (changes.options && !changes.options.firstChange) {
            if (changes.options.currentValue.bundleId !== changes.options.previousValue.bundleId) {
                this.bundleId = this.options.bundleId;
                this.getCurrentBundleFriendlyName();
                this.getDefinitions(this.definitionScopes[0]);
            }
            else if (changes.options.currentValue.definitionType !== changes.options.previousValue.definitionType) {
                this.definitionTypeDescriptor =
                    RX_DEFINITION_PICKER.definitionTypes[changes.options.currentValue.definitionType];
                this.allDefinitionsLabel = this.translateService.instant(this.definitionTypeDescriptor.allDefinitionsLabelKey);
                this.getDefinitions(this.definitionScopes[0]);
                this.value = null;
            }
        }
    }
    getCurrentBundleFriendlyName() {
        this.currentBundleFriendlyName$ = this.rxGlobalCacheService
            .getBundleDescriptor(this.bundleId)
            .pipe(map((descriptor) => (descriptor === null || descriptor === void 0 ? void 0 : descriptor.friendlyName) || this.config.texts.noBundleDeployed));
    }
    getBundleNameSearchQuery(searchQuery) {
        return this.rxDefinitionNameService.getBundleId(searchQuery) || searchQuery;
    }
    getDefinitionNameSearchQuery(searchQuery) {
        return this.rxDefinitionNameService.getDisplayName(searchQuery);
    }
}
RxDefinitionPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerComponent, deps: [{ token: i0.Renderer2 }, { token: i1$2.RxBundleCacheService }, { token: i1$2.RxDefinitionNameService }, { token: RxDefinitionPickerCacheService }, { token: i1$2.RxGlobalCacheService }, { token: i1$3.RxStringService }, { token: i4$1.TranslateService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RxDefinitionPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: { options: "options", isDisabled: "isDisabled" }, host: { listeners: { "window:resize": "onWindowResize()", "window:paste": "onPaste($event)", "window:keypress": "onKeypress($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxDefinitionPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "dropdownMenuHeader", first: true, predicate: ["dropdownMenuHeader"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["definitionPicker"], descendants: true, static: true }, { propertyName: "definitionTreeElementRef", first: true, predicate: ["definitionTree"], descendants: true }, { propertyName: "searchField", first: true, predicate: ["searchField"], descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-rx-control-label\n  [label]=\"options.label\"\n  [tooltip]=\"options.tooltip\"\n  [showRequiredLabel]=\"!!options.required\"\n></adapt-rx-control-label>\n\n<div\n  class=\"dropdown\"\n  adaptDropdown\n  appendToBody=\"true\"\n  [autoClose]=\"'outside'\"\n  (onOpen)=\"onPickerToggle$.next(true);setDropdownWidth()\"\n  (onClose)=\"onPickerToggle$.next(false)\"\n  [autoFocusFirst]=\"false\"\n  #definitionPicker=\"adaptDropdown\"\n>\n  <button\n    rx-id=\"toggle-button\"\n    #dropdownButton\n    class=\"btn btn-secondary\"\n    adaptDropdownToggle\n    type=\"button\"\n    [disabled]=\"isDisabled\"\n  >\n    <span class=\"rx-selected-item\" [title]=\"value || ''\">\n      {{ (value | rxDefinitionNamePipe) || config.texts.placeholder }}\n    </span>\n\n    <span\n      rx-id=\"clear-button\"\n      class=\"d-icon-cross_adapt btn-link\"\n      (click)=\"clearDefinition($event)\"\n      *ngIf=\"value && !isDisabled\"\n    >\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <div class=\"rx-dropdown-panel-header\" [ngClass]=\"searchMode ? 'pl-1' : 'pr-1'\">\n      <div class=\"d-flex\" *ngIf=\"!searchMode; else searchControls\" #dropdownMenuHeader>\n        <div class=\"btn-group bundle-btn-group\">\n          <button\n            type=\"button\"\n            adapt-button\n            *ngFor=\"let definitionScope of definitionScopes\"\n            class=\"rx-header-button\"\n            [btn-type]=\"activeDefinitionScope === definitionScope ? 'primary' : 'secondary'\"\n            size=\"xtra-small\"\n            (click)=\"getDefinitions(definitionScope)\"\n          >\n            <span>{{ definitionScope === 'bundle' ? (currentBundleFriendlyName$ | async) : allDefinitionsLabel }}</span>\n          </button>\n        </div>\n\n        <button\n          type=\"button\"\n          rx-id=\"search-button\"\n          class=\"d-icon-search btn btn-sm btn-link ml-1\"\n          *ngIf=\"!searchMode\"\n          (click)=\"$event.stopPropagation(); enableSearchMode()\"\n        ></button>\n      </div>\n    </div>\n\n    <ul #definitionTree class=\"rx-bundles\" *ngIf=\"dropdownWidth && bundles$ | async as bundles; else busyLoader\">\n      <adapt-empty-state\n        class=\"d-block mt-5\"\n        *ngIf=\"!bundles.length\"\n        type=\"search\"\n        [label]=\"config.texts.noDefinitionsFound\"\n      ></adapt-empty-state>\n\n      <li\n        class=\"rx-bundle\"\n        *ngFor=\"let bundle of bundles; trackBy: trackByBundle\"\n        (click)=\"bundle.isExpanded = !bundle.isExpanded\"\n      >\n        <span\n          rx-id=\"expand-bundle-button\"\n          class=\"expand-arrow d-icon-angle_right\"\n          [class.open]=\"bundle.isExpanded\"\n        ></span>\n\n        <adapt-highlight [result]=\"bundle.name\" [term]=\"searchQuery\"></adapt-highlight>\n\n        <div class=\"rx-definitions\" *ngIf=\"bundle.isExpanded\">\n          <button\n            class=\"dropdown-item\"\n            (click)=\"$event.stopPropagation(); selectDefinition(definition.name)\"\n            *ngFor=\"let definition of bundle.definitions; trackBy: trackByDefinition\"\n            [class.active]=\"value === definition.name\"\n            [title]=\"definition.name\"\n            type=\"button\"\n          >\n            <span *ngIf=\"!definition.isPublic\">* </span>\n\n            <adapt-highlight [result]=\"definition.displayName\" [term]=\"searchQuery\"></adapt-highlight>\n          </button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<ng-template #busyLoader>\n  <rx-busy-indicator></rx-busy-indicator>\n</ng-template>\n\n<ng-template #searchControls>\n  <button\n    type=\"button\"\n    rx-id=\"back-button\"\n    class=\"d-icon-arrow_left btn btn-sm btn-link mr-1\"\n    (click)=\"$event.stopPropagation(); disableSearchMode()\"\n  ></button>\n\n  <adapt-rx-textfield\n    #searchField\n    (ngModelChange)=\"search($event)\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"searchQuery\"\n    size=\"sm\"\n  ></adapt-rx-textfield>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-dropdown-panel-header{border-bottom:1px solid #d6d7d8;display:flex;align-items:center;padding:0 10px;width:100%;height:50px;margin-top:-5px}.bundle-btn-group{max-width:calc(100% - 38px)}.rx-header-button{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rx-header-button.btn-primary{display:revert}adapt-rx-textfield{flex-grow:1;align-items:center;margin:0}.expand-arrow{padding:5px;transition:.2s}.expand-arrow.open{transform:rotate(90deg)}.rx-bundle{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 5px;line-height:30px;cursor:pointer}.rx-bundle ::ng-deep mark{padding:0}.rx-bundles{overflow-y:auto;margin:0;list-style:none;padding:5px 0;width:100%;height:275px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}span[rx-id=search-button]{cursor:pointer;padding-left:10px}span[rx-id=search-button]:not(:hover){color:#313538}span[rx-id=back-button]{cursor:pointer;padding-right:10px}span[rx-id=back-button]:not(:hover){color:#313538}span[rx-id=expand-bundle-button]{display:inline-flex;width:15px}.rx-selected-item{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-menu{height:330px!important}.dropdown-toggle{width:100%;display:flex;text-align:left}.dropdown-item{white-space:nowrap;overflow:hidden;padding:0 15px 0 30px;text-overflow:ellipsis}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }, { type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i1$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "rxDefinitionNamePipe": i1$2.RxDefinitionNamePipe, "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-definition-picker',
                    templateUrl: './definition-picker.component.html',
                    styleUrls: ['./definition-picker.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxDefinitionPickerComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1$2.RxBundleCacheService }, { type: i1$2.RxDefinitionNameService }, { type: RxDefinitionPickerCacheService }, { type: i1$2.RxGlobalCacheService }, { type: i1$3.RxStringService }, { type: i4$1.TranslateService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], dropdownButton: [{
                type: ViewChild,
                args: ['dropdownButton', { static: true }]
            }], dropdownMenuHeader: [{
                type: ViewChild,
                args: ['dropdownMenuHeader', { static: false }]
            }], dropdown: [{
                type: ViewChild,
                args: ['definitionPicker', { static: true }]
            }], definitionTreeElementRef: [{
                type: ViewChild,
                args: ['definitionTree', { static: false }]
            }], searchField: [{
                type: ViewChild,
                args: ['searchField', { static: false }]
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize']
            }], onPaste: [{
                type: HostListener,
                args: ['window:paste', ['$event']]
            }], onKeypress: [{
                type: HostListener,
                args: ['window:keypress', ['$event']]
            }] } });

class RxDefinitionPickerModule {
}
RxDefinitionPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDefinitionPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, declarations: [RxDefinitionPickerComponent], imports: [AdaptHighlightModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxBusyIndicatorModule, i1$1.AdaptDropdownModule, AdaptButtonModule,
        RxDefinitionModule,
        AdaptRxLabelModule,
        AdaptRxTextfieldModule,
        AdaptEmptyStateModule,
        TranslateModule], exports: [RxDefinitionPickerComponent] });
RxDefinitionPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, providers: [RxDefinitionPickerCacheService], imports: [[
            AdaptHighlightModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxBusyIndicatorModule,
            AdaptDropdownModule.forRoot(),
            AdaptButtonModule,
            RxDefinitionModule,
            AdaptRxLabelModule,
            AdaptRxTextfieldModule,
            AdaptEmptyStateModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptHighlightModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxBusyIndicatorModule,
                        AdaptDropdownModule.forRoot(),
                        AdaptButtonModule,
                        RxDefinitionModule,
                        AdaptRxLabelModule,
                        AdaptRxTextfieldModule,
                        AdaptEmptyStateModule,
                        TranslateModule
                    ],
                    declarations: [RxDefinitionPickerComponent],
                    exports: [RxDefinitionPickerComponent],
                    providers: [RxDefinitionPickerCacheService]
                }]
        }] });

class RxSelectExpressionDropdownComponent {
}
RxSelectExpressionDropdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxSelectExpressionDropdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectExpressionDropdownComponent, selector: "rx-select-expression-dropdown", ngImport: i0, template: "", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-expression-dropdown',
                    templateUrl: './select-expression-dropdown.component.html',
                    styleUrls: ['./select-expression-dropdown.component.scss']
                }]
        }] });

class RxSelectExpressionDropdownModule {
}
RxSelectExpressionDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectExpressionDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownModule, declarations: [RxSelectExpressionDropdownComponent], exports: [RxSelectExpressionDropdownComponent] });
RxSelectExpressionDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectExpressionDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSelectExpressionDropdownComponent],
                    imports: [],
                    exports: [RxSelectExpressionDropdownComponent]
                }]
        }] });

const RX_SELECT_EXPRESSION_DROPDOWN = {
    dropDownOptionsValue: {
        select: 'Select',
        expression: 'Expression'
    },
    dropDownDisplayValue: {
        buildExpression: 'Build Expression',
        editExpression: 'Edit Expression'
    }
};

const RX_DESIGNER_CANVAS = {
    paperOptions: {
        backgroundColor: '#FFFFFF',
        backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHUlEQVQYV2NkYGAwBuKzQIwXMBJSAJMfVUidcAQAnUQBC6jEGBUAAAAASUVORK5CYII=',
        height: 800,
        width: 1000
    }
};

class RxDesignerCanvasComponent {
    constructor(elementRef, rxCommandManagerService) {
        this.elementRef = elementRef;
        this.rxCommandManagerService = rxCommandManagerService;
        this.elementSelected = new EventEmitter();
    }
    ngOnInit() {
        this.commandManager = new joint.dia.CommandManager({
            graph: this.graph,
            cmdBeforeAdd: (cmdName, cell, graph, options) => {
                return this.commandManager.enabled && !(options === null || options === void 0 ? void 0 : options.ignoreCommandManager);
            }
        });
        this.rxCommandManagerService.set(this.commandManager);
        this.paper = new joint.dia.Paper({
            defaultLink: new joint.shapes.bpmn.Flow(),
            embeddingMode: true,
            gridSize: 5,
            height: RX_DESIGNER_CANVAS.paperOptions.height,
            interactive: this.configuration.interactive,
            model: this.graph,
            width: RX_DESIGNER_CANVAS.paperOptions.width,
            restrictTranslate: function (elementView) {
                // TODO-VS: implement restrictTranslate logic
                return false;
            },
            validateEmbedding: function (childView, parentView) {
                // TODO-VS: implement validateEmbedding logic
                return true;
            }
        });
        this.paper.drawBackground({
            color: RX_DESIGNER_CANVAS.paperOptions.backgroundColor,
            image: RX_DESIGNER_CANVAS.paperOptions.backgroundImage,
            repeat: 'repeat',
            position: {
                x: -1,
                y: -1
            }
        });
        this.paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: true,
            cursor: 'grab',
            padding: 32,
            paper: this.paper
        });
        this.paper.on('blank:pointerdown', (evt) => {
            this.paperScroller.startPanning(evt);
            this.elementSelected.emit(null);
        });
        this.paper.on('cell:pointerup', (cellView, evt) => {
            if (cellView) {
                this.elementSelected.emit(cellView.model.prop('elementModel/guid'));
            }
        });
        if (this.configuration.interactive) {
            this.commandManager.enable = () => {
                this.commandManager.enabled = true;
            };
            this.commandManager.disable = () => {
                this.commandManager.enabled = false;
            };
            this.commandManager.enable();
            this.paper.on('cell:expand:begin cell:collapse:begin', () => {
                this.commandManager.disable();
            });
            this.paper.on('cell:expand:done cell:collapse:done', (cellView) => {
                if (!cellView.model.get('inCallActivity')) {
                    this.commandManager.enable();
                }
            });
        }
        this.paperScroller.render();
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.appendChild(this.paperScroller.el);
        this.paperScroller.center();
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.droppedElement) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.addElementToCanvas(changes.droppedElement.currentValue);
        }
    }
    hasRedo() {
        return this.commandManager.hasRedo();
    }
    hasUndo() {
        return this.commandManager.hasUndo();
    }
    onClearCanvas() {
        // TODO-VS: add clear logic
    }
    onCopy() {
        // TODO-VS: add copy logic
    }
    onCut() {
        // TODO-VS: add cut logic
    }
    onExportToPng() {
        // TODO-VS: add export logic
    }
    onPaste() {
        // TODO-VS: add paste logic
    }
    onPrint() {
        // TODO-VS: add print logic
    }
    onRedo() {
        this.commandManager.redo();
    }
    onUndo() {
        this.commandManager.undo();
    }
    onZoomIn() {
        // TODO-VS: add zoom in logic
    }
    onZoomOut() {
        // TODO-VS: add zoom out logic
    }
    // TODO-VS: update types
    addElementToCanvas(dropData) {
        const paperDropArea = this.getCanvasDropArea(this.paper.$el);
        const localPoint = this.paper.clientToLocalPoint({ x: dropData.dropPoint.x, y: dropData.dropPoint.y });
        if (this.canDrop(paperDropArea, localPoint)) {
            const elementService = this.configuration.elementRegistry.get(dropData.item.data.value.type).elementService;
            const droppedElementShape = elementService.getShape(Object.assign({ position: localPoint }, dropData.item.data.value));
            this.graph.addCell(droppedElementShape);
            setTimeout(() => {
                this.elementSelected.emit(droppedElementShape.prop('elementModel/guid'));
            });
        }
    }
    // TODO-VS: update types
    canDrop(paperDropArea, localPoint) {
        return (localPoint.x > paperDropArea.x.start &&
            localPoint.x < paperDropArea.x.end &&
            localPoint.y > paperDropArea.y.start &&
            localPoint.y < paperDropArea.y.end);
    }
    // TODO-VS: update types
    getCanvasDropArea(el) {
        const offset = el.offset();
        const innerWidth = el.innerWidth();
        const innerHeight = el.innerHeight();
        return {
            x: {
                start: offset.left,
                end: offset.left + innerWidth
            },
            y: {
                start: offset.top,
                end: offset.top + innerHeight
            }
        };
    }
}
RxDesignerCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasComponent, deps: [{ token: i0.ElementRef }, { token: i1$2.RxCommandManagerService }], target: i0.ɵɵFactoryTarget.Component });
RxDesignerCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerCanvasComponent, selector: "rx-designer-canvas", inputs: { configuration: "configuration", graph: "graph", droppedElement: "droppedElement" }, outputs: { elementSelected: "elementSelected" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"configuration.showToolbar\" class=\"rx-designer-toolbar\">\n  <!-- TODO-VS: Add custom actions -->\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-undo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.undo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"undo-button\"\n    [disabled]=\"!hasUndo()\"\n    (click)=\"onUndo()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-redo\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.redo.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"redo-button\"\n    [disabled]=\"!hasRedo()\"\n    (click)=\"onRedo()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-scissors\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.cut.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"cut-button\"\n    (click)=\"onCut()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_copy_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.copy.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"copy-button\"\n    (click)=\"onCopy()\"\n  ></button>\n\n  <button\n    *ngIf=\"!configuration.isReadOnly && configuration.enableMultiSelection\"\n    class=\"d-icon-files_text\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.paste.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"paste-button\"\n    (click)=\"onPaste()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_plus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-in.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-in-button\"\n    (click)=\"onZoomIn()\"\n  ></button>\n\n  <button\n    class=\"d-icon-search_minus\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.zoom-out.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"zoom-out-button\"\n    (click)=\"onZoomOut()\"\n  ></button>\n\n  <button\n    class=\"d-icon-printer\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.print.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"print-button\"\n    (click)=\"onPrint()\"\n  ></button>\n\n  <button\n    *ngIf=\"configuration.interactive\"\n    class=\"d-icon-cross_square\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.clear-canvas.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"clear-canvas-button\"\n    (click)=\"onClearCanvas()\"\n  ></button>\n\n  <button\n    class=\"d-icon-file_arrow_png_o\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"tertiary\"\n    size=\"large\"\n    adaptTooltip=\"{{ 'com.bmc.arsys.rx.client.common.export-to-png.label' | translate }}\"\n    placement=\"bottom\"\n    rx-id=\"export-to-png-button\"\n    (click)=\"onExportToPng()\"\n  ></button>\n\n  <!-- TODO-VS: Add grid size slider, snaplines checkbox and custom actions -->\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host ::ng-deep .joint-paper-scroller{height:calc(100% - 55px);background-color:#f0f1f1}:host ::ng-deep .joint-paper-scroller .joint-paper .connection{stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .marker-target,:host ::ng-deep .joint-paper-scroller .joint-paper .marker-source{fill:#959899;stroke:#959899}:host ::ng-deep .joint-paper-scroller .joint-paper .joint-element .fobj div{font-size:12px}:host ::ng-deep .joint-paper-scroller .joint-paper g .label{font-size:12px;font-weight:inherit}.rx-designer-toolbar{display:flex;height:55px;border-bottom:1px solid #d6d7d8;padding-left:300px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-canvas',
                    templateUrl: './designer-canvas.component.html',
                    styleUrls: ['./designer-canvas.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1$2.RxCommandManagerService }]; }, propDecorators: { configuration: [{
                type: Input
            }], graph: [{
                type: Input
            }], droppedElement: [{
                type: Input
            }], elementSelected: [{
                type: Output
            }] } });

// TODO-VS: mode to shared folder after jointJS is updated
class RxDesignerCanvasModule {
}
RxDesignerCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, declarations: [RxDesignerCanvasComponent], imports: [AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule], exports: [RxDesignerCanvasComponent] });
RxDesignerCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, imports: [[AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerCanvasComponent],
                    imports: [AdaptButtonModule, AdaptTooltipModule, CommonModule, TranslateModule],
                    exports: [RxDesignerCanvasComponent]
                }]
        }] });

class RxDesignerHeaderComponent {
    constructor() {
        this.breadcrumbItems = [];
        this.isDesignMode = true;
        this.isPreviewAvailable = false;
        this.isSaveButtonDisabled = false;
        this.breadcrumbSelected = new EventEmitter();
        this.toggleDesignMode = new EventEmitter();
        this.showPreview = new EventEmitter();
        this.save = new EventEmitter();
        this.closeDesigner = new EventEmitter();
    }
}
RxDesignerHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDesignerHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerHeaderComponent, selector: "rx-designer-header", inputs: { bundleName: "bundleName", breadcrumbItems: "breadcrumbItems", isDesignMode: "isDesignMode", isPreviewAvailable: "isPreviewAvailable", isSaveButtonDisabled: "isSaveButtonDisabled" }, outputs: { breadcrumbSelected: "breadcrumbSelected", toggleDesignMode: "toggleDesignMode", showPreview: "showPreview", save: "save", closeDesigner: "closeDesigner" }, ngImport: i0, template: "<div class=\"header-column-left\">\n  <span class=\"bundle-name\">{{ bundleName }}</span>\n</div>\n\n<div class=\"header-column-right\">\n  <div class=\"header-title\">\n    <rx-breadcrumb-bar (selectedItem)=\"breadcrumbSelected.emit($event)\" [items]=\"breadcrumbItems\"></rx-breadcrumb-bar>\n  </div>\n\n  <div class=\"header-buttons\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      size=\"small\"\n      rx-id=\"json-button\"\n      class=\"header-button\"\n      (click)=\"toggleDesignMode.emit()\"\n    >\n      <span [ngClass]=\"{ 'd-icon-brackets_curly': isDesignMode, 'd-icon-app_eye': !isDesignMode }\"></span>\n      {{ isDesignMode ? 'JSON' : 'UI Design' }}\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      rx-id=\"preview-button\"\n      size=\"small\"\n      [hidden]=\"!isPreviewAvailable\"\n      (click)=\"showPreview.emit()\"\n      class=\"header-button\"\n    >\n      <span class=\"d-icon-eye\"></span>\n      Preview\n    </button>\n\n    <div class=\"header-button-divider\"></div>\n\n    <button\n      adapt-button\n      type=\"button\"\n      [disabled]=\"isSaveButtonDisabled\"\n      rx-id=\"save-button\"\n      size=\"small\"\n      (click)=\"save.emit()\"\n      btn-type=\"primary\"\n      class=\"header-button\"\n    >\n      Save\n    </button>\n\n    <button\n      adapt-button\n      type=\"button\"\n      rx-id=\"close-button\"\n      size=\"small\"\n      (click)=\"closeDesigner.emit()\"\n      btn-type=\"secondary\"\n      class=\"header-button\"\n    >\n      Close\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex:0 0 50px;font-size:1.3em;background:#f0f1f1;border-bottom:1px solid #d6d7d8}.bundle-name,.header-title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.bundle-name{padding:0 10px;flex:1}.header-title{flex-grow:1;padding-right:20px}.header-buttons{display:flex;margin-left:auto}.header-button{margin:0 2px}.header-button-divider{margin:auto 5px;display:block;height:20px;width:1px;background-color:#d6d7d8}.header-column-right,.header-column-left{display:flex;align-items:center;height:100%;overflow:hidden}.header-column-right{padding:0 10px;flex-grow:1}.header-column-left{flex:0 0 280px}\n"], components: [{ type: i1.RxBreadcrumbBarComponent, selector: "rx-breadcrumb-bar", inputs: ["items"], outputs: ["selectedItem"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-header',
                    templateUrl: './designer-header.component.html',
                    styleUrls: ['./designer-header.component.scss']
                }]
        }], propDecorators: { bundleName: [{
                type: Input
            }], breadcrumbItems: [{
                type: Input
            }], isDesignMode: [{
                type: Input
            }], isPreviewAvailable: [{
                type: Input
            }], isSaveButtonDisabled: [{
                type: Input
            }], breadcrumbSelected: [{
                type: Output
            }], toggleDesignMode: [{
                type: Output
            }], showPreview: [{
                type: Output
            }], save: [{
                type: Output
            }], closeDesigner: [{
                type: Output
            }] } });

class RxDesignerHeaderModule {
}
RxDesignerHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, declarations: [RxDesignerHeaderComponent], imports: [CommonModule, AdaptButtonModule, RxBreadcrumbBarModule], exports: [RxDesignerHeaderComponent] });
RxDesignerHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, imports: [[CommonModule, AdaptButtonModule, RxBreadcrumbBarModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerHeaderComponent],
                    exports: [RxDesignerHeaderComponent],
                    imports: [CommonModule, AdaptButtonModule, RxBreadcrumbBarModule]
                }]
        }] });

class RxDesignerPaletteComponent {
    constructor() {
        // TODO-VS: update types
        this.elementDropped = new EventEmitter();
        this.searchField = new FormControl();
    }
    // TODO-VS: update types
    onDropListDropped(dropData) {
        this.elementDropped.emit(dropData);
    }
    trackByLabelFn(index, item) {
        return item.label;
    }
}
RxDesignerPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDesignerPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDesignerPaletteComponent, selector: "rx-designer-palette", inputs: { tree: "tree" }, outputs: { elementDropped: "elementDropped" }, ngImport: i0, template: "<adapt-rx-search placeholder=\"Search\" rx-id=\"palette-search-field\" [formControl]=\"searchField\"></adapt-rx-search>\n\n<adapt-accordion [multiselect]=\"true\">\n  <adapt-accordion-tab *ngFor=\"let node of tree; trackBy: trackByLabelFn\" [title]=\"node.label\" [isOpen]=\"true\">\n    <div class=\"node-container\" cdkDropList cdkDropListSortingDisabled (cdkDropListDropped)=\"onDropListDropped($event)\">\n      <div\n        *ngFor=\"let child of node.children; trackBy: trackByLabelFn\"\n        [attr.rx-id]=\"child.label\"\n        cdkDrag\n        [cdkDragData]=\"child\"\n      >\n        <ng-container [ngSwitch]=\"child.paletteItem.label\">\n          <ng-container *ngSwitchCase=\"'inner'\">\n            <div class=\"{{ child.paletteItem.shape }} border-{{ child.paletteItem.border }}\" [title]=\"child.label\">\n              <img\n                *ngIf=\"child.paletteItem.icon\"\n                class=\"icon-{{ child.paletteItem.icon.position }}\"\n                [src]=\"child.paletteItem.icon.path\"\n                [alt]=\"child.label\"\n              />\n\n              <div class=\"inner-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"'outer'\">\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\">\n              <div class=\"outer-icon border-{{ child.paletteItem.border }}\">\n                <img *ngIf=\"child.paletteItem.icon\" [src]=\"child.paletteItem.icon.path\" [alt]=\"child.label\" />\n              </div>\n\n              <div class=\"outer-label\">{{ child.label }}</div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <div class=\"{{ child.paletteItem.shape }}\" [title]=\"child.label\"></div>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </adapt-accordion-tab>\n</adapt-accordion>\n", styles: [".node-container{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:5px;grid-row-gap:8px;font-size:12px}.rectangle{display:flex;justify-content:center;align-items:center;position:relative;width:75px;height:65px;padding:0 5px;border-radius:5px;cursor:move}.circle{display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:move}.circle .outer-icon{display:flex;justify-content:center;align-items:center;align-self:center;width:50px;height:50px;border-radius:50%}.circle .outer-icon img{width:80%}.square{display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:10px;cursor:move}.square .outer-icon{display:flex;justify-content:center;align-items:center;width:40px;height:40px;margin-bottom:10px;transform:rotate(45deg)}.square .outer-icon img{width:80%;transform:rotate(-45deg)}.annotation{width:20px;height:55px;border-style:solid;border-width:3px;border-color:#666;border-right-style:none!important;cursor:move}.border-solid{border-style:solid;border-width:2px;border-color:#666}.border-bold{border-style:solid;border-width:4px;border-color:#666}.border-dashed{border-style:dashed;border-width:1px;border-color:#666}.border-double{border-style:double;border-width:5px;border-color:#666}.icon-top{position:absolute;left:1px;top:2px;width:12px}.icon-bottom{position:absolute;bottom:2px;left:50%;width:10px;border-style:solid;border-width:1px;transform:translate(-50%)}.inner-label{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-align:center}.outer-label{padding-top:5px;text-align:center}\n"], components: [{ type: i1$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4$3.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i4$3.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-designer-palette',
                    templateUrl: './designer-palette.component.html',
                    styleUrls: ['./designer-palette.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { tree: [{
                type: Input
            }], elementDropped: [{
                type: Output
            }] } });

// TODO-VS: mode to shared folder after jointJS is updated
class RxDesignerPaletteModule {
}
RxDesignerPaletteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDesignerPaletteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, declarations: [RxDesignerPaletteComponent], imports: [AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule], exports: [RxDesignerPaletteComponent] });
RxDesignerPaletteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, imports: [[AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDesignerPaletteModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDesignerPaletteComponent],
                    imports: [AdaptAccordionModule, AdaptRxSearchModule, CommonModule, DragDropModule, ReactiveFormsModule],
                    exports: [RxDesignerPaletteComponent]
                }]
        }] });

class RxDynamicComponentRendererComponent {
    ngOnInit() {
        const componentRef = this.container.createComponent(this.componentFactory);
        Object.assign(componentRef.instance, {
            context: this.context,
            options: this.options
        });
    }
}
RxDynamicComponentRendererComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxDynamicComponentRendererComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: { componentFactory: "componentFactory", context: "context", options: "options" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-dynamic-component-renderer',
                    template: '<ng-container #container></ng-container>'
                }]
        }], propDecorators: { componentFactory: [{
                type: Input
            }], context: [{
                type: Input
            }], options: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { static: true, read: ViewContainerRef }]
            }] } });

class RxDynamicComponentRendererModule {
}
RxDynamicComponentRendererModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDynamicComponentRendererModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererModule, declarations: [RxDynamicComponentRendererComponent], imports: [CommonModule], exports: [RxDynamicComponentRendererComponent] });
RxDynamicComponentRendererModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDynamicComponentRendererModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxDynamicComponentRendererComponent],
                    exports: [RxDynamicComponentRendererComponent],
                    entryComponents: [RxDynamicComponentRendererComponent]
                }]
        }] });

class RxErrorPageComponent {
    constructor(document, title, route, rxAuthService, rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService) {
        this.document = document;
        this.title = title;
        this.route = route;
        this.rxAuthService = rxAuthService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.showSignInLink = false;
        this.showApplications = false;
        this.applications$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(switchMap((bundleDescriptors) => {
            const applicationBundleDescriptors = filter(bundleDescriptors, { isApplication: true, isLicensed: true });
            remove(applicationBundleDescriptors, { id: RX_APPLICATION.settingsBundleId });
            if (!this.rxCurrentUserService.isAdministrator()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.dataloadBundleId });
            }
            if (!this.rxCurrentUserService.isAdministrator() && !this.rxCurrentUserService.isBusinessAnalyst()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.innovationStudioBundleId });
            }
            const applications = sortBy(applicationBundleDescriptors, (bundleDescriptor) => bundleDescriptor.friendlyName).map((app) => this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(map((isAngularJsApplication) => {
                let url;
                if (app.hasCustomEntryPoint && app.id !== RX_APPLICATION.innovationStudioBundleId) {
                    url = `/${app.id}/index.html`;
                }
                else if (isAngularJsApplication) {
                    url = `/innovationsuite/index.html#/${app.id}`;
                }
                else {
                    url = `/helix/index.html#/${app.id}`;
                }
                return {
                    id: app.id,
                    friendlyName: app.friendlyName,
                    url
                };
            })));
            return forkJoin(applications);
        }), tap(() => (this.rxGlobalCacheService.applicationId = 'unknown-application')));
        this.destroyed$ = new ReplaySubject(1);
        this.document.body.style.overflow = 'hidden';
    }
    ngOnInit() {
        this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
            var _a;
            this.data = Object.assign({}, data);
            this.title.setTitle(this.data.errorTitle);
            this.showSignInLink = this.data.showSignInLink;
            this.showApplications = (_a = this.data.showApplications) !== null && _a !== void 0 ? _a : false;
        });
    }
    logout() {
        this.rxAuthService.logout().subscribe();
    }
    ngOnDestroy() {
        this.document.body.style.removeProperty('overflow');
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RxErrorPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageComponent, deps: [{ token: DOCUMENT }, { token: i2$2.Title }, { token: i1$4.ActivatedRoute }, { token: i1$2.RxAuthService }, { token: i1$2.RxGlobalCacheService }, { token: i1$2.RxCurrentUserService }, { token: i1$2.RxAngularApplicationService }], target: i0.ɵɵFactoryTarget.Component });
RxErrorPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxErrorPageComponent, selector: "rx-error-page", ngImport: i0, template: "<div class=\"error-wrapper\">\n  <ng-container *ngIf=\"!showApplications\">\n    <h2>{{ this.data.errorTitle }}</h2>\n    <div [innerHTML]=\"this.data.errorMessage\"></div>\n  </ng-container>\n\n  <div *ngIf=\"showApplications\">\n    <h3>\n      The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for\n      future reference.\n    </h3>\n\n    <ul>\n      <li *ngFor=\"let app of applications$ | async\">\n        <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n      </li>\n    </ul>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.error-wrapper{color:#7c7f81;padding:20px;font-family:\"Open Sans\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;font-size:.8125rem}.error-wrapper h2{font-size:var(--h2-font-size);line-height:1.5rem;margin:20px 0 12px;font-weight:normal}.error-wrapper p{margin-top:0;margin-bottom:.625rem}a{color:#00a79d;text-decoration:none;background-color:transparent}\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-error-page',
                    templateUrl: './error-page.component.html',
                    styleUrls: ['error-page.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2$2.Title }, { type: i1$4.ActivatedRoute }, { type: i1$2.RxAuthService }, { type: i1$2.RxGlobalCacheService }, { type: i1$2.RxCurrentUserService }, { type: i1$2.RxAngularApplicationService }]; } });

class RxErrorPageModule {
}
RxErrorPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxErrorPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageModule, declarations: [RxErrorPageComponent], imports: [CommonModule], exports: [RxErrorPageComponent] });
RxErrorPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxErrorPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxErrorPageComponent],
                    imports: [CommonModule],
                    exports: [RxErrorPageComponent]
                }]
        }] });

const RX_EXPRESSION_EDITOR = {
    events: {
        openExpressionEditor: 'rx-open-expression-editor'
    }
};

const RX_DATA_DICTIONARY_ITEM_PLUGIN = {
    name: 'rx-data-dictionary-item',
    widgetAttributeName: 'rx-expression'
};

const narrowOperatorButtons = new Set([
    ExpressionOperator.LeftGrouping,
    ExpressionOperator.RightGrouping,
    ExpressionOperator.DoubleQuote,
    ExpressionOperator.Add,
    ExpressionOperator.Subtract,
    ExpressionOperator.Multiply,
    ExpressionOperator.Divide,
    ExpressionOperator.Remainder,
    ExpressionOperator.GreaterThan,
    ExpressionOperator.LessThan,
    ExpressionOperator.Equal,
    ExpressionOperator.NotEqual,
    ExpressionOperator.GreaterThanOrEqual,
    ExpressionOperator.LessThanOrEqual
]);
class RichExpressionEditorComponent {
    constructor(injector, document, rxTreeService, rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxThemingService) {
        this.injector = injector;
        this.document = document;
        this.rxTreeService = rxTreeService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxThemingService = rxThemingService;
        this.type = "inline" /* INLINE */;
        this.ckConfig = {
            startupFocus: true,
            allowedContent: true,
            extraPlugins: RX_DATA_DICTIONARY_ITEM_PLUGIN.name,
            toolbar: [],
            skin: 'expression-editor',
            title: false,
            entities: false
        };
        this.operatorRows = [];
        this.class = 'd-flex flex-column h-100 border';
        this.operatorsByGroup = { custom: [], platform: [] };
        this.isCkEditorInstanceReady = false;
        this.menuItems = {};
        // Keep operators in descending order by length to find compound operator for autocomplete launch.
        this.autocompleteTriggers = [
            ExpressionOperator.NotEqual,
            ExpressionOperator.GreaterThanOrEqual,
            ExpressionOperator.LessThanOrEqual,
            ExpressionOperator.LessThan,
            ExpressionOperator.GreaterThan,
            ExpressionOperator.Equal
        ];
    }
    ngOnInit() {
        this.control = this.injector.get(NgControl).control;
    }
    ngOnChanges(changes) {
        if (changes.dataDictionary) {
            this.dataDictionaryExpressionsMap = flow((dataDictionary) => this.rxDataDictionaryUtils.addTooltips(dataDictionary), (dataDictionary) => this.rxTreeService.flatten({
                children: dataDictionary
            }), (dataDictionary) => reduce(dataDictionary, (dictionary, node) => {
                if (isArray(node.expression)) {
                    node.expression.forEach((expressionItem) => {
                        dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                    });
                }
                else {
                    dictionary.push(node);
                }
                return dictionary;
            }, []), (dataDictionary) => this.rxObjectUtilsService.mapFromArray(dataDictionary, 'expression'))(this.dataDictionary);
        }
    }
    writeValue(value) {
        if (value) {
            // encode all HTML tags to avoid their rendering by CKEDITOR, i.e.
            // html entered by user should be rendered as plain text
            // For example, <b>STRING</b> should be displayed in the editor exactly the same, as <b>STRING</b>
            value = CKEDITOR.tools.htmlEncode(value);
            value = this.normalizeExpression(value);
        }
        else {
            value = null;
        }
        // Ckeditor instance is not ready on first "writeValue" call.
        if (this.isCkEditorInstanceReady) {
            this.ckComponent.instance.setData(value);
        }
        else {
            this.initialValue = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onCkEditorInstanceReady(event) {
        this.isCkEditorInstanceReady = true;
        // Even if toolbar doesn't have any items, outer container is displayed and needs to be hidden.
        this.document.getElementById(`${event.editor.id}_top`).style.display = 'none';
        this.ckComponent.instance.on('change', () => {
            const value = trim(this.ckComponent.instance.getData());
            if (this.control.value !== value && !this.ckComponent.instance.gettingCursorPosition) {
                this.onChange(value);
                if (value) {
                    const { position, x, y } = this.getCursor();
                    const expressionBeforeCursor = value.substr(0, position);
                    const autocompleteTrigger = this.autocompleteTriggers.find((trigger) => endsWith(expressionBeforeCursor, trigger));
                    if (autocompleteTrigger) {
                        // Remove autocomplete trigger from expression, e.g '${foo} >=' -> '${foo} '.
                        const expressionToParse = expressionBeforeCursor.slice(0, -autocompleteTrigger.length);
                        const node = this.dataDictionaryExpressionsMap.get(this.getLastExpressionFragment(expressionToParse));
                        if (node === null || node === void 0 ? void 0 : node.autocompleteOptions) {
                            this.launchAutocomplete(node.autocompleteOptions, x, y);
                        }
                    }
                }
            }
        });
        this.ckComponent.instance.on('getData', (evt) => {
            evt.data.dataValue = evt.data.dataValue.replace(/<p>|<span>|<\/p>|<\/span>|<br \/>/g, '');
            evt.data.dataValue = CKEDITOR.tools.htmlDecode(evt.data.dataValue);
            // convert 160 and 8203 charCode space to 32 which supported by server
            evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
            evt.data.dataValue = evt.data.dataValue.replace(new RegExp(String.fromCharCode(8203), 'g'), ' ');
        }, null, null, 15);
        this.ckComponent.instance.on('key', (evt) => {
            if (evt.data.keyCode === 13) {
                // Enter key
                evt.cancel();
            }
        });
        this.ckComponent.instance.on('paste', (evt) => {
            if (evt.data.method === 'drop') {
                const value = evt.data.dataTransfer.getData('value');
                if (value) {
                    evt.data.dataValue = value;
                }
            }
            if (evt.data.type === 'html') {
                const container = new CKEDITOR.dom.element('div');
                container.appendHtml(evt.data.dataValue);
                // When selected range with widget is copied to clipboard, start node of bookmark remains unremoved there
                let elementToRemove = container.findOne('[id*="cke_bm_"]');
                if (elementToRemove) {
                    if (CKEDITOR.env.gecko && container.getChildCount() > 1) {
                        elementToRemove = elementToRemove.getParent();
                    }
                    elementToRemove.remove();
                    evt.data.dataValue = container.getHtml();
                }
                container.remove();
            }
        });
        this.ckComponent.instance.on('toHtml', (evt) => {
            // Check if data value has already been converted to html,
            // e.g. while dragging a pill from one position to another withing the expression
            // there is no need to convert it to HTML again
            if (!includes(evt.data.dataValue, 'rx-id="rx-data-dictionary-item"')) {
                evt.data.dataValue = this.rxExpressionParserService.parse(evt.data.dataValue, this.transformToTag.bind(this));
            }
            if (endsWith(evt.data.dataValue, '</span>')) {
                evt.data.dataValue += '<span>&nbsp;</span>';
            }
        }, null, null, 4);
        // Set initial value when "toHtml" listener is already added.
        this.ckComponent.instance.setData(this.initialValue);
        this.ckComponent.instance.contextMenu.addListener(() => this.menuItems);
        this.ckComponent.instance.contextMenu.onHide = () => {
            this.iFrameContentWindow.removeEventListener('keydown', this.keydownHandler);
            this.menuItems = {};
        };
        this.control.statusChanges
            .pipe(map(() => this.control.disabled), startWith(this.control.disabled), distinctUntilChanged())
            .subscribe((disabled) => {
            this.ckComponent.instance.setReadOnly(disabled);
        });
        delete this.ckComponent.instance._.menuItems.paste;
        delete this.ckComponent.instance._.menuItems.cut;
        delete this.ckComponent.instance._.menuItems.copy;
    }
    insertHtml(html) {
        this.ckComponent.instance.insertHtml(html);
    }
    isNarrowOperator(operator) {
        return narrowOperatorButtons.has(operator);
    }
    addOperator(value) {
        if (value !== ExpressionOperator.DoubleQuote && !startsWith(value, '$')) {
            value += '&nbsp;';
        }
        this.insertHtml(value);
    }
    launchAutocomplete(options, x, y) {
        CKEDITOR.skin.loadPart('rx-suggestions', noop);
        const group = 'suggestions';
        this.ckComponent.instance.addMenuGroup(group);
        options.forEach((option, index) => {
            const suggestionBoxItem = 'suggestionBox suggestionBoxItem' + index;
            this.menuItems[suggestionBoxItem] = CKEDITOR.TRISTATE_OFF;
            this.ckComponent.instance.addMenuItem(suggestionBoxItem, {
                label: option.label,
                group,
                onClick: () => {
                    this.ckComponent.instance.focus();
                    this.ckComponent.instance.insertHtml(option.expression);
                }
            });
        });
        this.ckComponent.instance.contextMenu.show(this.ckComponent.instance.document.getBody(), null, x, y);
        const menuPanel = this.ckComponent.instance.contextMenu._.panel;
        menuPanel.element.addClass('rx-suggestions-panel');
        this.iFrameContentWindow = menuPanel._.iframe.$.contentWindow;
        this.iFrameContentWindow.document.documentElement.classList.add('rx-suggestions-panel_container');
        this.rxThemingService.copyCssVariables(RX_THEMING.cssVariablesForCkEditor, this.iFrameContentWindow.document);
        this.iFrameContentWindow.addEventListener('keydown', this.keydownHandler);
    }
    transformToTag(token, expression) {
        let tag = expression;
        if ([
            ExpressionParserToken.ArExpression,
            ExpressionParserToken.RxExpression,
            ExpressionParserToken.SingleQuoteRxExpression,
            ExpressionParserToken.SingleQuoteTextExpression
        ].includes(token)) {
            const node = this.dataDictionaryExpressionsMap.get(expression);
            if (node) {
                tag = [
                    `<span class="expression-node" rx-id="rx-data-dictionary-item" ${RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName}="${expression}" title="${node.tooltip}">`,
                    `<span class="expression-node-icon ${node.icon || 'd-icon-arrow_right_square_input'}">&nbsp;</span>`,
                    `<span class="expression-node-label">${node.label}</span>`,
                    '</span>'
                ].join('');
            }
        }
        return tag;
    }
    normalizeExpression(expression) {
        return this.rxExpressionParserService.parse(expression, (token, expressionFragment) => {
            if (token === ExpressionParserToken.RxStringExpression) {
                // since multiple \x20 spaces get collapsed to a single space in HTML. we have to convert them to
                // non-breaking spaces (&nbsp;) in order to preserve them in expression's literals
                return expressionFragment.replace(/ /g, '&nbsp;');
            }
            else if (token === ExpressionParserToken.ArExpression) {
                return expressionFragment.replace('\\', '');
            }
            else {
                return expressionFragment;
            }
        });
    }
    // parse and get last expression, e.g.
    // '${foo} + ${bar}' -> '${bar}'
    // '${foo} + ${bar}  ' -> '${bar}'
    // '${foo} + "bar"' -> undefined
    getLastExpressionFragment(expression) {
        const expressionMap = new Map();
        const lastExpressionFragment = last(this.rxExpressionParserService
            .parse(expression, (token, expressionFragment) => {
            if (token !== ExpressionParserToken.RxStringExpression) {
                const node = `$$rx-${uniqueId()}-rx$$`;
                expressionMap.set(node, expressionFragment);
                expressionFragment = node;
            }
            return expressionFragment;
        })
            .split(/(\$\$rx-[\d]+-rx\$\$)/g)
            .filter((element) => !isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element)));
        return expressionMap.get(lastExpressionFragment);
    }
    // prevent navigation to the previous page in Edge and Firefox when the user presses the Backspace key
    keydownHandler(event) {
        if (event.code === 'Backspace') {
            event.preventDefault();
        }
    }
    // Insert a dummy element into current position of caret
    // in order to get coordinates of caret and expression fragment before the caret
    // https://ckeditor.com/old/comment/65868#comment-65868
    getCursor() {
        this.ckComponent.instance.gettingCursorPosition = true;
        const dummyElement = this.ckComponent.instance.document.createElement('span');
        const range = this.ckComponent.instance.getSelection().getRanges()[0];
        range.trim(false, true);
        const startContainer = range.startContainer;
        const nextNode = startContainer.getChild(range.startOffset);
        if (nextNode) {
            dummyElement.insertBefore(nextNode);
        }
        else {
            startContainer.append(dummyElement);
        }
        let x = 0;
        let y = 0;
        let nodeElement = dummyElement.$;
        while (nodeElement.offsetParent) {
            x += nodeElement.offsetLeft;
            y += nodeElement.offsetTop;
            nodeElement = nodeElement.offsetParent;
        }
        x += nodeElement.offsetLeft;
        y += nodeElement.offsetTop;
        y += 30;
        dummyElement.setText(this.ckComponent.instance.id);
        const position = this.ckComponent.instance.getData().indexOf(this.ckComponent.instance.id);
        dummyElement.remove();
        this.ckComponent.instance.gettingCursorPosition = false;
        return {
            x,
            y,
            position
        };
    }
}
RichExpressionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichExpressionEditorComponent, deps: [{ token: i0.Injector }, { token: DOCUMENT }, { token: i1$3.RxTreeService }, { token: i1$2.RxExpressionParserService }, { token: i1$3.RxObjectUtilsService }, { token: i1$2.RxDataDictionaryUtils }, { token: i1$2.RxThemingService }], target: i0.ɵɵFactoryTarget.Component });
RichExpressionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: { dataDictionary: "dataDictionary", operatorRows: "operatorRows" }, host: { properties: { "class": "this.class" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RichExpressionEditorComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "ckComponent", first: true, predicate: CKEditorComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ckeditor\n  class=\"flex-grow-1 position-relative form-control border\"\n  [config]=\"ckConfig\"\n  [type]=\"type\"\n  (ready)=\"onCkEditorInstanceReady($event)\"\n  [ngClass]=\"{ 'invalid-expression-border': control.invalid }\"\n></ckeditor>\n\n<adapt-rx-feedback [errors]=\"control.errors\"></adapt-rx-feedback>\n\n<div class=\"border-top bg-gray-200 pt-3 pb-1 px-2\" *ngIf=\"control.enabled\">\n  <div class=\"d-flex flex-wrap justify-content-center\" *ngFor=\"let row of operatorRows\">\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"secondary\"\n      class=\"mx-1 mb-2 bg-white\"\n      [ngClass]=\"isNarrowOperator(operator.value) ? 'narrow-operator' : 'wide-operator'\"\n      (click)=\"addOperator(operator.value)\"\n      [adaptPopover]=\"operator.tooltip ? tooltipContent : null\"\n      [popoverTitle]=\"operator.tooltip?.title\"\n      triggers=\"mouseover:mouseout\"\n      placement=\"auto\"\n      *ngFor=\"let operator of row\"\n    >\n      {{ operator.displayValue }}\n\n      <ng-template #tooltipContent>\n        <span [innerHtml]=\"operator?.tooltip?.content\"></span>\n      </ng-template>\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep ckeditor{border-color:transparent!important}:host::ng-deep ckeditor>div{padding:20px;overflow-y:auto;outline:0;position:absolute;top:0;bottom:0;left:0;right:0}:host::ng-deep ckeditor>textarea{display:none}:host::ng-deep .expression-node{margin-bottom:.25rem}.wide-operator{min-width:6.5rem}.narrow-operator{width:3rem}.invalid-expression-border{border-color:#f83200!important}\n"], components: [{ type: i3$2.CKEditorComponent, selector: "ckeditor", inputs: ["tagName", "type", "editorUrl", "data", "readOnly", "config"], outputs: ["ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }, { type: i1$1.AdaptRxFeedbackComponent, selector: "adapt-rx-feedback", inputs: ["ariaErrorMessage", "errors", "controlTouched", "successMessage", "warningMessage", "alertFeedbackStyle", "alertFeedbackTruncation"], outputs: ["messageAppeared"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RichExpressionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rich-expression-editor',
                    templateUrl: 'rich-expression-editor.component.html',
                    styleUrls: ['rich-expression-editor.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RichExpressionEditorComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1$3.RxTreeService }, { type: i1$2.RxExpressionParserService }, { type: i1$3.RxObjectUtilsService }, { type: i1$2.RxDataDictionaryUtils }, { type: i1$2.RxThemingService }]; }, propDecorators: { dataDictionary: [{
                type: Input
            }], operatorRows: [{
                type: Input
            }], ckComponent: [{
                type: ViewChild,
                args: [CKEditorComponent, { static: true }]
            }], class: [{
                type: HostBinding,
                args: ['class']
            }] } });

class DataDictionaryNodeComponent {
    constructor() {
        this.expressionNodeSelected = new EventEmitter();
    }
}
DataDictionaryNodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataDictionaryNodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataDictionaryNodeComponent, selector: "rx-data-dictionary-node", inputs: { node: "node", filterQuery: "filterQuery" }, outputs: { expressionNodeSelected: "expressionNodeSelected" }, ngImport: i0, template: "<ng-container *ngIf=\"!node.data.expression; else expressionNode\">\n  <adapt-highlight class=\"p-1\" [title]=\"node.label\" [result]=\"node.label\" [term]=\"filterQuery\">></adapt-highlight>\n</ng-container>\n\n<ng-template #expressionNode>\n  <div class=\"d-flex\" rx-id=\"node\">\n    <button\n      type=\"button\"\n      (click)=\"expressionNodeSelected.emit(node)\"\n      class=\"expression-node-button btn btn-link d-icon-plus_circle py-1 px-2\"\n    ></button>\n\n    <span class=\"expression-node\" [draggable]=\"true\" [attr.rx-expression]=\"node.data.expression\">\n      <span [ngClass]=\"node.data.icon || 'd-icon-arrow_right_square_input'\" class=\"expression-node-icon\"></span>\n\n      <adapt-highlight class=\"expression-node-label\" [title]=\"node.label\" [result]=\"node.label\" [term]=\"filterQuery\"\n        >></adapt-highlight\n      >\n    </span>\n\n    <i\n      *ngIf=\"node.data.info?.type === 'function'\"\n      class=\"py-1 px-2 d-icon-question_circle_o\"\n      [adaptPopover]=\"functionInfo\"\n      [popoverTitle]=\"node.data.info.data.signature\"\n      [autoClose]=\"'outside'\"\n      [maxWidth]=\"'350'\"\n    >\n      <ng-template #functionInfo>\n        <p>{{ node.data.info.data.description }}</p>\n\n        <table *ngIf=\"node.data.info.data.parameters?.length\">\n          <tr>\n            <th class=\"pr-4\">Parameter</th>\n            <th>Description</th>\n          </tr>\n\n          <tr class=\"mt-1\" *ngFor=\"let parameter of node.data.info.data.parameters\">\n            <td class=\"align-top\">{{ $any(parameter).name }}</td>\n            <td class=\"align-top\">{{ $any(parameter).description }}</td>\n          </tr>\n        </table>\n      </ng-template>\n    </i>\n  </div>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.expression-node{cursor:move}.expression-node-button{color:#4e5255}\n"], components: [{ type: i1$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-data-dictionary-node',
                    templateUrl: './data-dictionary-node.component.html',
                    styleUrls: ['./data-dictionary-node.component.scss']
                }]
        }], propDecorators: { node: [{
                type: Input
            }], filterQuery: [{
                type: Input
            }], expressionNodeSelected: [{
                type: Output
            }] } });

class DataDictionaryComponent {
    constructor() {
        this.nodeSelected = new EventEmitter();
        this.dragStart = new EventEmitter();
    }
    onDragStart(event) {
        const value = event.target.getAttribute('rx-expression');
        if (value) {
            event.dataTransfer.setData('value', value);
        }
        else {
            event.preventDefault();
        }
    }
    ngOnChanges(changes) {
        if (changes.dataDictionary) {
            this.tree = this.prepareTreeForAdapt(this.dataDictionary);
        }
    }
    onNodeExpand(e) { }
    onNodeSelected(node) {
        this.nodeSelected.next(node);
    }
    prepareTreeForAdapt(dataDictionary) {
        return flow((dictionary) => map$1(dictionary, (element) => {
            var _a;
            return !element.hidden && (element.expression || ((_a = element.children) === null || _a === void 0 ? void 0 : _a.length))
                ? {
                    label: element.label,
                    children: this.prepareTreeForAdapt(element.children),
                    expanded: element.expanded,
                    data: {
                        expression: isArray(element.expression) ? element.expression[0] : element.expression,
                        icon: element.icon,
                        info: element.info
                    },
                    key: uniqueId(),
                    draggable: Boolean(element.expression)
                }
                : null;
        }), (dictionary) => compact(dictionary))(dataDictionary);
    }
}
DataDictionaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DataDictionaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DataDictionaryComponent, selector: "rx-data-dictionary", inputs: { dataDictionary: "dataDictionary" }, outputs: { nodeSelected: "nodeSelected", dragStart: "dragStart" }, host: { listeners: { "dragstart": "onDragStart($event)" } }, usesOnChanges: true, ngImport: i0, template: "<adapt-tree #treeComponent [value]=\"tree\" filter=\"true\" (onNodeExpand)=\"onNodeExpand($event)\" [draggableNodes]=\"true\">\n  <ng-template let-node adaptTreeNodeTemplate>\n    <rx-data-dictionary-node\n      [filterQuery]=\"treeComponent.filterQuery\"\n      [node]=\"node\"\n      (expressionNodeSelected)=\"onNodeSelected($event)\"\n    ></rx-data-dictionary-node>\n  </ng-template>\n</adapt-tree>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host::ng-deep .a-tree__content{align-items:center;cursor:default}:host::ng-deep .a-tree__label:hover{color:inherit}:host::ng-deep .a-tree__toggle{cursor:pointer}\n"], components: [{ type: i1$1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: DataDictionaryNodeComponent, selector: "rx-data-dictionary-node", inputs: ["node", "filterQuery"], outputs: ["expressionNodeSelected"] }], directives: [{ type: i1$1.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataDictionaryComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-data-dictionary',
                    templateUrl: './data-dictionary.component.html',
                    styleUrls: ['./data-dictionary.component.scss']
                }]
        }], propDecorators: { dataDictionary: [{
                type: Input
            }], nodeSelected: [{
                type: Output
            }], dragStart: [{
                type: Output
            }], onDragStart: [{
                type: HostListener,
                args: ['dragstart', ['$event']]
            }] } });

class ExpressionEditorComponent extends RxModalClass {
    constructor(activeModalRef, translateService, rxExpressionParserService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.injector = injector;
        this.isPropertyContextReady = false;
        this.config = this.activeModalRef.getData();
        this.expressionConfigurator = this.config.expressionConfigurator;
        this.availableExpressionProperties = [];
        this.invalidExpressionMessage = this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.invalid-expression.message');
    }
    get expression() {
        return this.currentProperty && this.currentProperty.value;
    }
    set expression(value) {
        if (this.currentProperty) {
            this.currentProperty.value = value;
        }
    }
    get isReadOnly() {
        return this.config.isReadOnly;
    }
    get isNavigationEnabled() {
        return this.isPropertyContextReady && (this.hasPreviousProperty() || this.hasNextProperty());
    }
    get isPreviousButtonDisabled() {
        return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasPreviousProperty();
    }
    get isNextButtonDisabled() {
        return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasNextProperty();
    }
    ngOnInit() {
        super.ngOnInit();
        this.initialize(this.config.property).subscribe();
    }
    onSave() {
        this.writeValue().subscribe({
            complete: () => {
                this.activeModalRef.close();
            }
        });
    }
    onNodeSelected(node) {
        this.richExpressionEditor.insertHtml(node.data.expression);
    }
    navigateToNextProperty() {
        this.navigateToProperty(this.getCurrentPropertyIndex() + 1);
    }
    navigateToPreviousProperty() {
        this.navigateToProperty(this.getCurrentPropertyIndex() - 1);
    }
    cancelModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isDirty() {
        return this.richExpressionEditorControl.dirty;
    }
    navigateToProperty(index) {
        this.isPropertyContextReady = false;
        concat(this.writeValue(), 
        // getPropertyByIndex must be called when writeValue observable will be
        // completed to make sure availableExpressionProperties are up to date.
        of(index).pipe(concatMap((i) => this.initialize(this.getPropertyByIndex(i)))))
            .pipe(finalize(() => {
            this.isPropertyContextReady = true;
            this.richExpressionEditorControl.control.markAsPristine();
        }))
            .subscribe();
    }
    initialize(property) {
        return concat(this.updateAvailableExpressionProperties(), this.expressionConfigurator.getDataDictionary(property.path).pipe(tap((dataDictionary) => {
            this.currentProperty = property;
            this.operatorRows = this.expressionConfigurator.getOperatorRows(property.path);
            this.dataDictionary = dataDictionary;
            this.legend = sortBy(this.config.legend, 'label');
            this.isPropertyContextReady = true;
        }), take(1), switchMapTo(EMPTY)));
    }
    writeValue() {
        return this.expressionConfigurator.validateProperty(this.currentProperty.path, this.currentProperty.value).pipe(tap((isValid) => {
            if (isValid) {
                this.config.api.writeValue(this.currentProperty.path, this.rxExpressionParserService.stripSpaces(this.currentProperty.value));
            }
            else {
                this.richExpressionEditorControl.control.setErrors({
                    invalidExpression: {
                        message: this.invalidExpressionMessage
                    }
                });
            }
        }), switchMap((isValid) => (isValid ? EMPTY : throwError(new RxError()))));
    }
    updateAvailableExpressionProperties() {
        return this.config.expressionPropertyNavigator
            ? this.config.expressionPropertyNavigator.getProperties().pipe(take(1), tap((properties) => {
                this.availableExpressionProperties = properties;
            }), switchMapTo(EMPTY))
            : EMPTY;
    }
    hasPreviousProperty() {
        const currentIndex = this.getCurrentPropertyIndex();
        return currentIndex > 0;
    }
    hasNextProperty() {
        const currentIndex = this.getCurrentPropertyIndex();
        return currentIndex !== this.availableExpressionProperties.length - 1 && currentIndex !== -1;
    }
    getCurrentPropertyIndex() {
        return findIndex(this.availableExpressionProperties, { path: this.currentProperty.path });
    }
    getPropertyByIndex(propertyIndex) {
        return this.availableExpressionProperties[propertyIndex];
    }
}
ExpressionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i4$1.TranslateService }, { token: i1$2.RxExpressionParserService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ExpressionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionEditorComponent, selector: "rx-expression-editor", viewQueries: [{ propertyName: "richExpressionEditor", first: true, predicate: RichExpressionEditorComponent, descendants: true, static: true }, { propertyName: "richExpressionEditorControl", first: true, predicate: RichExpressionEditorComponent, descendants: true, read: NgModel, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body row\">\n  <div class=\"d-flex flex-column h-100\" [ngClass]=\"isReadOnly ? 'col' : 'col-6'\">\n    <div class=\"d-flex align-items-center\">\n      <ng-container *ngIf=\"isNavigationEnabled\">\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_left mr-1\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToPreviousProperty()\"\n          [disabled]=\"isPreviousButtonDisabled\"\n          rx-id=\"previous-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_right mr-2\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToNextProperty()\"\n          [disabled]=\"isNextButtonDisabled\"\n          rx-id=\"next-button\"\n        ></button>\n      </ng-container>\n\n      <h5 class=\"m-0 text-truncate\">\n        {{\n          'com.bmc.arsys.rx.client.expression-editor.expression-for-property.label'\n            | translate: { propertyName: currentProperty?.label || (currentProperty?.path | titlecase) }\n        }}\n      </h5>\n    </div>\n\n    <div class=\"flex flex-grow-1 h-100 mt-2\">\n      <rx-rich-expression-editor\n        class=\"flex-grow-1 h-100\"\n        [dataDictionary]=\"dataDictionary\"\n        [(ngModel)]=\"expression\"\n        [operatorRows]=\"operatorRows\"\n        [disabled]=\"isReadOnly\"\n      ></rx-rich-expression-editor>\n    </div>\n  </div>\n\n  <div class=\"col-6 d-flex flex-column h-100 pr-0\" *ngIf=\"!isReadOnly\">\n    <ng-template #legendContentTemplate>\n      <div class=\"text-left p-2\">\n        <div *ngFor=\"let item of legend; let last = last\" [class.pb-2]=\"!last\">\n          <span class=\"legend-item-icon px-2 py-1\" [ngClass]=\"item.icon\"></span>\n          <span class=\"ml-2\">{{ item.label }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <h5 class=\"mt-0\">\n      {{ 'com.bmc.arsys.rx.client.expression-editor.available-values.label' | translate }}\n      <adapt-icon\n        name=\"info_circle_o_adapt\"\n        [adaptTooltip]=\"legendContentTemplate\"\n        width=\"260\"\n        placement=\"bottom\"\n      ></adapt-icon>\n    </h5>\n\n    <div class=\"data-dictionary-container flex-grow-1\">\n      <rx-data-dictionary\n        [dataDictionary]=\"dataDictionary\"\n        (nodeSelected)=\"onNodeSelected($event)\"\n      ></rx-data-dictionary>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    (click)=\"onSave()\"\n    [disabled]=\"richExpressionEditorControl.invalid || richExpressionEditorControl.pristine\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancelModal()\" rx-id=\"cancel-button\">\n    {{\n      (isReadOnly ? 'com.bmc.arsys.rx.client.common.close.label' : 'com.bmc.arsys.rx.client.common.cancel.label')\n        | translate\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:706px}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.data-dictionary-container{overflow-y:auto;padding-right:15px}:host::ng-deep .expression-node{display:flex;border:0;overflow:hidden;border-radius:.125rem}:host::ng-deep .expression-node-icon{color:#fff;background-color:#3cb6ce;padding:.25rem .5rem}:host::ng-deep .expression-node-label{background-color:#d6d7d8;padding:.25rem .5rem}.legend-item-icon{display:inline-block;background:#00a79d;border-radius:var(--border-radius) 0 0 var(--border-radius);width:1.75rem;text-align:center}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: ["dataDictionary", "operatorRows"] }, { type: i1$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: DataDictionaryComponent, selector: "rx-data-dictionary", inputs: ["dataDictionary"], outputs: ["nodeSelected", "dragStart"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4$1.TranslatePipe, "titlecase": i4.TitleCasePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-editor',
                    templateUrl: './expression-editor.component.html',
                    styleUrls: ['./expression-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i4$1.TranslateService }, { type: i1$2.RxExpressionParserService }, { type: i0.Injector }]; }, propDecorators: { richExpressionEditor: [{
                type: ViewChild,
                args: [RichExpressionEditorComponent, { static: true }]
            }], richExpressionEditorControl: [{
                type: ViewChild,
                args: [RichExpressionEditorComponent, { read: NgModel, static: true }]
            }] } });

class RxDataDictionaryItemPluginService {
    constructor() {
        CKEDITOR.plugins.add(RX_DATA_DICTIONARY_ITEM_PLUGIN.name, {
            requires: 'widget',
            init(editor) {
                editor.widgets.add('rx-data-dictionary-item-widget', {
                    inline: true,
                    upcast(element) {
                        return has(element.attributes, RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName);
                    },
                    downcast(element) {
                        return new CKEDITOR.htmlParser.cdata(element.attributes[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName]);
                    },
                    // @ts-ignore
                    // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins_widget_definition.html#method-getClipboardHtml
                    getClipboardHtml() {
                        return this.element.getAttributes()[RX_DATA_DICTIONARY_ITEM_PLUGIN.widgetAttributeName];
                    }
                });
            }
        });
    }
}
RxDataDictionaryItemPluginService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxDataDictionaryItemPluginService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDataDictionaryItemPluginService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ExpressionEditorModule {
    constructor(rxDataDictionaryItemPluginService) { }
}
ExpressionEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, deps: [{ token: RxDataDictionaryItemPluginService }], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, declarations: [ExpressionEditorComponent,
        RichExpressionEditorComponent,
        DataDictionaryComponent,
        DataDictionaryNodeComponent], imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdaptButtonModule,
        AdaptHighlightModule,
        AdaptIconModule,
        AdaptModalModule,
        AdaptSearchModule,
        CKEditorModule,
        AdaptTooltipModule,
        AdaptTreeModule,
        AdaptPopoverModule,
        AdaptRxFeedbackModule,
        AdaptTypeaheadSubModule,
        TranslateModule], exports: [ExpressionEditorComponent] });
ExpressionEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            AdaptButtonModule,
            AdaptHighlightModule,
            AdaptIconModule,
            AdaptModalModule,
            AdaptSearchModule,
            CKEditorModule,
            AdaptTooltipModule,
            AdaptTreeModule,
            AdaptPopoverModule,
            AdaptRxFeedbackModule,
            AdaptTypeaheadSubModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ExpressionEditorComponent,
                        RichExpressionEditorComponent,
                        DataDictionaryComponent,
                        DataDictionaryNodeComponent
                    ],
                    exports: [ExpressionEditorComponent],
                    entryComponents: [ExpressionEditorComponent],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        AdaptButtonModule,
                        AdaptHighlightModule,
                        AdaptIconModule,
                        AdaptModalModule,
                        AdaptSearchModule,
                        CKEditorModule,
                        AdaptTooltipModule,
                        AdaptTreeModule,
                        AdaptPopoverModule,
                        AdaptRxFeedbackModule,
                        AdaptTypeaheadSubModule,
                        TranslateModule
                    ]
                }]
        }], ctorParameters: function () { return [{ type: RxDataDictionaryItemPluginService }]; } });

class RxExpressionEditorService {
    constructor(translateService, rxModalService) {
        this.translateService = translateService;
        this.rxModalService = rxModalService;
    }
    openEditor(config, onDialogApiReady) {
        return new Observable((observer) => {
            this.rxModalService
                .openModal({
                title: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.edit-expression.title'),
                data: Object.assign(Object.assign({}, config), { api: {
                        writeValue(propertyPath, propertyValue) {
                            observer.next({ path: propertyPath, value: propertyValue });
                        }
                    }, onApiReady: (dialogApi) => {
                        onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(dialogApi);
                    } }),
                content: ExpressionEditorComponent,
                size: (config.isReadOnly ? 'sm' : OpenViewActionModalSize.Large)
            })
                .then(() => observer.complete())
                .catch((e) => {
                onDialogApiReady === null || onDialogApiReady === void 0 ? void 0 : onDialogApiReady(null);
                return isString(e) ? new RxError(e) : e;
            });
        });
    }
}
RxExpressionEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, deps: [{ token: i4$1.TranslateService }, { token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i4$1.TranslateService }, { type: i1.RxModalService }]; } });

var AssignmentExpressionListTargetFieldType;
(function (AssignmentExpressionListTargetFieldType) {
    AssignmentExpressionListTargetFieldType["Text"] = "text";
    AssignmentExpressionListTargetFieldType["Select"] = "select";
})(AssignmentExpressionListTargetFieldType || (AssignmentExpressionListTargetFieldType = {}));

class TextFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
    focus() {
        this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
    }
}
TextFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TextFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextFormControlComponent, selector: "rx-text-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-textfield\n  #editor\n  [isPassword]=\"options.isPassword\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  [maxlength]=\"options.maxLength\"\n  [minlength]=\"options.minLength\"\n  [rxNoWhitespace]=\"!!(options.allowWhitespace === false || (options.required && options.allowWhitespace !== true))\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { type: i1$3.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-text-form-control',
                    templateUrl: './text-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], editor: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });

class SelectFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.appendToBody = false;
        this.adaptSelectValue = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    writeValue(value) {
        super.writeValue(value);
        this.adaptSelectValue = this.getAdaptSelectValue(value);
    }
    focus() {
        const el = this.renderer.selectRootElement(this.adaptSelectComponent.selectButtonRef.nativeElement, true);
        el.focus();
        el.click();
    }
    sortAlphabetically(items) {
        return items.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));
    }
    ngOnInit() {
        if (this.formControl) {
            const adaptControl = this.adaptSelectComponent.ngControl.control;
            adaptControl.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
                if (adaptControl.hasError('required') && !this.formControl.hasError('required')) {
                    Object.assign(adaptControl.errors, this.formControl.errors);
                    this.formControl.setErrors(adaptControl.errors, { emitEvent: false });
                }
            });
            this.formControl.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
                if (this.formControl.invalid) {
                    adaptControl.setErrors(this.formControl.errors, { emitEvent: false });
                }
            });
        }
        this.isSortAlphabetically = isUndefined(this.options.sortAlphabetically) || this.options.sortAlphabetically;
        this.selectOptions = this.isSortAlphabetically
            ? this.sortAlphabetically(this.options.options)
            : this.options.options;
        this.tooltip = this.options.tooltip
            ? {
                iconName: this.options.tooltip.iconName,
                content: this.popoverContent,
                placement: this.options.tooltip.placement,
                popoverMode: this.options.tooltip.popoverMode
            }
            : null;
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.selectOptions = this.isSortAlphabetically
                ? this.sortAlphabetically(changes.options.currentValue.options)
                : changes.options.currentValue.options;
            // ADAPT select value must be updated if options are changed, this logic can be eliminated if ADAPT #4116 issue will be resolved.
            this.adaptSelectValue = this.getAdaptSelectValue(this.value);
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    onSelectionChange(value) {
        let selectValue = map$1(value, 'id');
        selectValue = this.options.multiple ? selectValue : head(selectValue);
        if (this.options.beforeValueChange) {
            this.options.beforeValueChange(this.value, selectValue).then((allowValueChange) => {
                if (allowValueChange) {
                    this.value = selectValue;
                    this.adaptSelectValue = this.getAdaptSelectValue(selectValue);
                }
                else {
                    this.adaptSelectComponent.writeValue(this.adaptSelectValue);
                }
            });
        }
        else {
            this.value = selectValue;
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    // We have to convert value for ADAPT select, e.g:
    // - "foo" -> [{id: "foo", name: "Foo"}] or,
    // - ["foo", "bar"] => [{id: "foo", name: "Foo"}, {id: "bar", name: "Bar"}].
    // This logic can be eliminated if #4116 issue will be resolved.
    getAdaptSelectValue(value) {
        var _a;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.options) && !isNil(value)
            ? filter(this.options.options, (option) => includes(castArray(value), option.id))
            : [];
    }
}
SelectFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
SelectFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectFormControlComponent, selector: "rx-select-form-control", inputs: { options: "options", appendToBody: "appendToBody", formControl: "formControl" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptSelectComponent", first: true, predicate: ["adaptSelectComponent"], descendants: true, static: true }, { propertyName: "popoverContent", first: true, predicate: ["popoverContent"], descendants: true, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-rx-select\n  #adaptSelectComponent\n  [options]=\"selectOptions\"\n  [required]=\"options.required\"\n  [emptyOption]=\"options.emptyOption\"\n  [multiple]=\"options.multiple\"\n  [selectAllButton]=\"options.multiple && !options.hideSelectAllButton\"\n  [deselectAllButton]=\"options.multiple && !options.hideDeselectAllButton\"\n  [enableFilter]=\"options.enableFilter\"\n  [ngModel]=\"adaptSelectValue\"\n  (ngModelChange)=\"onSelectionChange($event)\"\n  [tooltip]=\"tooltip\"\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [optionFormatter]=\"optionFormatter\"\n  [appendToBody]=\"appendToBody\"\n  class=\"d-block m-0\"\n>\n</adapt-rx-select>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", components: [{ type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-form-control',
                    templateUrl: './select-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], formControl: [{
                type: Input
            }], adaptSelectComponent: [{
                type: ViewChild,
                args: ['adaptSelectComponent', { static: true }]
            }], popoverContent: [{
                type: ViewChild,
                args: ['popoverContent', { static: true }]
            }] } });

class ExpressionFormControlComponent extends ValueAccessor {
    constructor(rxExpressionParserService, rxObjectUtilsService, rxDataDictionaryUtils, rxTreeService, changeDetectorRef) {
        super();
        this.rxExpressionParserService = rxExpressionParserService;
        this.rxObjectUtilsService = rxObjectUtilsService;
        this.rxDataDictionaryUtils = rxDataDictionaryUtils;
        this.rxTreeService = rxTreeService;
        this.changeDetectorRef = changeDetectorRef;
        this.events = new EventEmitter();
        this.nodes = [];
        this.valueSubject = new Subject();
        this.expressionNodeMap = new Map();
        this.destroyed$ = new ReplaySubject(1);
        this.isTouched = false;
    }
    get propertyLabel() {
        var _a, _b;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.expressionEditorPropertyName) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.label) || null;
    }
    ngOnInit() {
        this.dataDictionary$ = this.options.dataDictionary$.pipe(takeUntil(this.destroyed$));
        (isNil(this.value) ? this.valueSubject.asObservable() : concat(of(this.value), this.valueSubject.asObservable()))
            .pipe(distinctUntilChanged(), switchMap((value) => 
        // When value is not defined don't subscribe to data dictionary observable.
        value
            ? this.dataDictionary$.pipe(tap(this.onDataDictionaryChange.bind(this)), 
            // Unsubscribe from data dictionary observable when value is removed.
            takeWhile(() => Boolean(this.value)))
            : EMPTY.pipe(finalize(() => this.updateNodes()))), takeUntil(this.destroyed$))
            .subscribe();
    }
    onWriteValue(value) {
        this.valueSubject.next(value);
    }
    openEditor() {
        this.isTouched = true;
        this.events.emit({
            type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
            payload: {
                propertyPath: this.propertyPath,
                propertyLabel: this.propertyLabel,
                isReadOnly: this.isDisabled
            }
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onDataDictionaryChange(dataDictionary) {
        this.dataDictionaryExpressionMap = flow((dictionary) => this.rxDataDictionaryUtils.addTooltips(dictionary), (dictionary) => this.rxTreeService.flatten({
            children: dictionary
        }), (dictionary) => reduce(dictionary, (dictionary, node) => {
            if (isArray(node.expression)) {
                node.expression.forEach((expressionItem) => {
                    dictionary.push(Object.assign(Object.assign({}, node), { expression: expressionItem }));
                });
            }
            else {
                dictionary.push(node);
            }
            return dictionary;
        }, []), (dictionary) => this.rxObjectUtilsService.mapFromArray(dictionary, 'expression'))(dataDictionary);
        this.updateNodes();
    }
    getExpressionNode(token, expression) {
        const node = {
            id: `$$rx-${uniqueId()}-rx$$`,
            expression
        };
        const isArExpression = token === ExpressionParserToken.ArExpression;
        if (token === ExpressionParserToken.RxExpression ||
            token === ExpressionParserToken.SingleQuoteRxExpression ||
            token === ExpressionParserToken.SingleQuoteTextExpression ||
            isArExpression) {
            const dataDictionaryItem = this.dataDictionaryExpressionMap.get(expression);
            if (dataDictionaryItem) {
                node.label = dataDictionaryItem.label;
                node.tooltip = dataDictionaryItem.tooltip;
            }
            else if (isArExpression || token === ExpressionParserToken.SingleQuoteTextExpression) {
                node.label = expression;
            }
            else {
                node.isInvalid = true;
            }
        }
        return node;
    }
    updateNodes() {
        if (this.dataDictionaryExpressionMap) {
            this.expressionNodeMap.clear();
            this.nodes = this.value
                ? map$1(this.rxExpressionParserService
                    .parse(this.value, (token, expression) => {
                    if (token !== ExpressionParserToken.RxStringExpression) {
                        if (token === ExpressionParserToken.ArExpression) {
                            expression = expression.replace('\\', '');
                        }
                        const node = this.getExpressionNode(token, expression);
                        this.expressionNodeMap.set(node.id, node);
                        expression = node.id;
                    }
                    return expression;
                }, this.options.operators)
                    .split(/(\$\$rx-[\d]+-rx\$\$)/g)
                    .filter((element) => !isEmpty(element) && !/^((\$\$rx-)|(-rx\$\$)|([\s]+))$/.test(element)), (nodeId) => this.expressionNodeMap.get(nodeId) || {
                    id: nodeId,
                    expression: nodeId
                })
                : [];
            this.changeDetectorRef.markForCheck();
        }
    }
}
ExpressionFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlComponent, deps: [{ token: i1$2.RxExpressionParserService }, { token: i1$3.RxObjectUtilsService }, { token: i1$2.RxDataDictionaryUtils }, { token: i1$3.RxTreeService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ExpressionFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: { options: "options", isDisabled: "isDisabled", propertyPath: "propertyPath" }, outputs: { events: "events" }, host: { properties: { "attr.property-path": "this.propertyPath", "attr.property-label": "this.propertyLabel" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label\n  *ngIf=\"!options.isLabelHidden\"\n  [label]=\"options.label\"\n  [showRequiredLabel]=\"options.isRequired\"\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: popoverContent,\n          popoverMode: options.tooltip.popoverMode,\n          placement: options.tooltip.placement,\n          iconName: options.tooltip.iconName\n        }\n      : null\n  \"\n></adapt-rx-control-label>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n\n<button\n  type=\"button\"\n  adapt-button\n  [btn-type]=\"'tertiary'\"\n  [ngClass]=\"{ 'bg-hover': nodes.length }\"\n  class=\"position-relative text-left overflow-hidden w-100 rounded p-0\"\n  (click)=\"openEditor()\"\n  [disabled]=\"isDisabled && !nodes.length\"\n>\n  <ng-container *ngIf=\"!nodes.length\">{{\n    options.clickToBuildExpressionLabel ||\n      'com.bmc.arsys.rx.client.expression-form-control.click-to-build-expression.label' | translate\n  }}</ng-container>\n\n  <ng-container *ngFor=\"let node of nodes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        node.isInvalid ? invalidExpression : node.label ? expression : plainText;\n        context: { $implicit: node }\n      \"\n    ></ng-container>\n  </ng-container>\n\n  <span class=\"fade-line position-absolute w-100 text-center\"><span class=\"d-icon-ellipsis_horizontal\"></span></span>\n</button>\n\n<ng-template #plainText let-node>\n  <span class=\"py-1 ml-1 rounded d-inline-block rx-ellipsis\">{{ node.expression }}</span>\n</ng-template>\n\n<ng-template #expression let-node>\n  <span\n    [adaptTooltip]=\"node.tooltip\"\n    placement=\"auto\"\n    class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-gray-300 text-default\"\n    >{{ node.label }}</span\n  >\n</ng-template>\n\n<ng-template #invalidExpression>\n  <span adaptTooltip=\"Error\" placement=\"auto\" class=\"d-inline-block rx-ellipsis p-1 ml-1 rounded bg-danger text-white\">\n    {{ 'com.bmc.arsys.rx.client.common.error.label' | translate }}\n  </span>\n</ng-template>\n\n<div *ngIf=\"options.isRequired && !nodes.length && isTouched\" class=\"text-danger\">\n  {{ 'com.bmc.arsys.rx.client.expression-form-control.validation.required.message' | translate }}\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}button{max-height:7rem;white-space:normal}.fade-line{top:5rem;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.fade-line:before{position:absolute;transition:opacity .25s var(--ease-transition-in-out);background-image:linear-gradient(0deg,#f0f1f1 50%,rgba(255,255,255,0));z-index:-1;top:0;left:0;right:0;bottom:0;opacity:0;content:\"\"}.d-icon-ellipsis_horizontal:before{position:absolute;bottom:.25rem}.bg-hover:hover{background-color:#f0f1f1!important}.bg-hover:hover .fade-line:before{opacity:1}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1$1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-form-control',
                    templateUrl: 'expression-form-control.component.html',
                    styleUrls: ['./expression-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxExpressionParserService }, { type: i1$3.RxObjectUtilsService }, { type: i1$2.RxDataDictionaryUtils }, { type: i1$3.RxTreeService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], propertyPath: [{
                type: HostBinding,
                args: ['attr.property-path']
            }, {
                type: Input
            }], propertyLabel: [{
                type: HostBinding,
                args: ['attr.property-label']
            }], events: [{
                type: Output
            }] } });

class AssignmentExpressionListFormControlComponent extends ValueAccessor {
    constructor(formBuilder, renderer, rxExpressionEditorService, rxModalService, translateService) {
        super();
        this.formBuilder = formBuilder;
        this.renderer = renderer;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.formArray = this.formBuilder.array([]);
        this.defaultOptions = {
            addItemText: 'com.bmc.arsys.rx.client.common.add.label',
            confirmationMessage: 'com.bmc.arsys.rx.client.common.delete-item-confirmation.message',
            sourceFieldOptions: {
                options: {
                    label: 'com.bmc.arsys.rx.client.designer.assignment-expression.source.label',
                    required: true
                },
                propertyName: 'expression'
            },
            targetFieldOptions: {
                options: {
                    label: 'com.bmc.arsys.rx.client.designer.assignment-expression.target.label',
                    required: true
                },
                propertyName: 'assignTarget'
            }
        };
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.value = value;
        });
        this.patchOptions(this.options);
    }
    ngOnChanges(changes) {
        if (changes.options.currentValue !== changes.options.previousValue) {
            this.patchOptions(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.formArray.clear();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    focus(data) {
        const fieldGroup = this.fieldGroups.get(data.index);
        if (data.fieldName === this.currentOptions.targetFieldOptions.propertyName) {
            const targetFieldElement = this.currentOptions.targetFieldOptions.type === AssignmentExpressionListTargetFieldType.Text
                ? fieldGroup.nativeElement.querySelector('rx-text-form-control input')
                : fieldGroup.nativeElement.querySelector('rx-select-form-control button');
            targetFieldElement.focus();
        }
        else if (data.fieldName === this.currentOptions.sourceFieldOptions.propertyName) {
            const sourceFieldButton = fieldGroup.nativeElement.querySelector('rx-expression-form-control button');
            sourceFieldButton.focus();
            sourceFieldButton.click();
        }
    }
    onWriteValue(value) {
        if (!isEqual(value, this.formArray.value)) {
            this.formArray.clear();
            value.forEach((item) => this.addItem(item));
        }
    }
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (isDisabled) {
            this.formArray.disable();
        }
        else {
            this.formArray.enable();
        }
    }
    addItem(item) {
        this.formArray.push(this.formBuilder.group(item !== null && item !== void 0 ? item : {
            [this.currentOptions.targetFieldOptions.propertyName]: null,
            [this.currentOptions.sourceFieldOptions.propertyName]: null
        }));
    }
    openExpressionEditor(event, formControl) {
        this.rxExpressionEditorService
            .openEditor({
            expressionConfigurator: this.currentOptions.sourceFieldOptions.expressionConfigurator,
            isReadOnly: this.isDisabled,
            property: {
                path: event.payload.propertyPath,
                value: formControl.value,
                label: event.payload.propertyLabel
            }
        })
            .subscribe((expression) => {
            formControl.setValue(expression.value);
        });
    }
    removeItem(index) {
        if (!this.isDisabled) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.currentOptions.confirmationMessage
            })
                .then((confirmed) => {
                if (confirmed) {
                    this.formArray.removeAt(index);
                }
            });
        }
    }
    patchOptions(options) {
        this.currentOptions = {
            addItemText: this.translateService.instant(options.addItemText || this.defaultOptions.addItemText),
            confirmationMessage: this.translateService.instant(options.confirmationMessage || this.defaultOptions.confirmationMessage),
            sourceFieldOptions: {
                expressionConfigurator: options.sourceFieldOptions.expressionConfigurator,
                options: Object.assign({ label: this.translateService.instant(this.defaultOptions.sourceFieldOptions.options.label), isRequired: this.defaultOptions.sourceFieldOptions.options.required }, options.sourceFieldOptions.options),
                propertyName: options.sourceFieldOptions.propertyName || this.defaultOptions.sourceFieldOptions.propertyName
            },
            targetFieldOptions: {
                options: Object.assign({ label: this.translateService.instant(this.defaultOptions.targetFieldOptions.options.label), required: this.defaultOptions.targetFieldOptions.options.required }, options.targetFieldOptions.options),
                propertyName: options.targetFieldOptions.propertyName || this.defaultOptions.targetFieldOptions.propertyName,
                type: options.targetFieldOptions.type
            }
        };
    }
}
AssignmentExpressionListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlComponent, deps: [{ token: i2.FormBuilder }, { token: i0.Renderer2 }, { token: RxExpressionEditorService }, { token: i1.RxModalService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
AssignmentExpressionListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AssignmentExpressionListFormControlComponent, selector: "rx-assignment-expression-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AssignmentExpressionListFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "fieldGroups", predicate: ["fieldGroups"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<button\n  *ngIf=\"!isDisabled\"\n  class=\"btn btn-sm btn-link px-0 py-0\"\n  type=\"button\"\n  aria-label=\"{{ 'com.bmc.arsys.rx.client.common.add.label' | translate }}\"\n  rx-id=\"add-item-button\"\n  (click)=\"addItem()\"\n>\n  <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n\n  {{ currentOptions.addItemText }}\n</button>\n\n<div *ngFor=\"let formGroup of formArray.controls; let index = index\" class=\"card mt-2\">\n  <div class=\"card-block p-3\" #fieldGroups>\n    <button\n      *ngIf=\"!isDisabled\"\n      class=\"close position-relative\"\n      type=\"button\"\n      aria-label=\"{{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\"\n      rx-id=\"remove-item-button\"\n      (click)=\"removeItem(index)\"\n    ></button>\n\n    <div class=\"pb-3\">\n      <rx-text-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'text'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-text-form-control>\n\n      <rx-select-form-control\n        *ngIf=\"currentOptions.targetFieldOptions.type === 'select'\"\n        [formControl]=\"formGroup.get(currentOptions.targetFieldOptions.propertyName)\"\n        [options]=\"currentOptions.targetFieldOptions.options\"\n      ></rx-select-form-control>\n    </div>\n\n    <rx-expression-form-control\n      [formControl]=\"formGroup.get(currentOptions.sourceFieldOptions.propertyName)\"\n      [options]=\"currentOptions.sourceFieldOptions.options\"\n      [isDisabled]=\"isDisabled\"\n      [propertyPath]=\"this.propertyPath + '[' + index + '].' + currentOptions.sourceFieldOptions.propertyName\"\n      (events)=\"openExpressionEditor($event, formGroup.get(currentOptions.sourceFieldOptions.propertyName))\"\n    ></rx-expression-form-control>\n  </div>\n</div>\n", components: [{ type: TextFormControlComponent, selector: "rx-text-form-control", inputs: ["options"] }, { type: SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-assignment-expression-list-form-control',
                    templateUrl: './assignment-expression-list-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: AssignmentExpressionListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i0.Renderer2 }, { type: RxExpressionEditorService }, { type: i1.RxModalService }, { type: i4$1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], fieldGroups: [{
                type: ViewChildren,
                args: ['fieldGroups', { read: ElementRef }]
            }] } });

class ExpressionFormControlModule {
}
ExpressionFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, declarations: [ExpressionFormControlComponent], imports: [FormsModule,
        CommonModule,
        AdaptIconModule,
        AdaptTooltipModule,
        AdaptButtonModule,
        AdaptRxLabelModule,
        TranslateModule], exports: [ExpressionFormControlComponent] });
ExpressionFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, imports: [[
            FormsModule,
            CommonModule,
            AdaptIconModule,
            AdaptTooltipModule,
            AdaptButtonModule,
            AdaptRxLabelModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        AdaptIconModule,
                        AdaptTooltipModule,
                        AdaptButtonModule,
                        AdaptRxLabelModule,
                        TranslateModule
                    ],
                    exports: [ExpressionFormControlComponent],
                    declarations: [ExpressionFormControlComponent],
                    entryComponents: [ExpressionFormControlComponent]
                }]
        }] });

class TextFormControlModule {
}
TextFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, declarations: [TextFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule], exports: [TextFormControlComponent] });
TextFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TextFormControlComponent],
                    exports: [TextFormControlComponent],
                    entryComponents: [TextFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, RxNoWhitespaceValidatorModule]
                }]
        }] });

class SelectFormControlModule {
}
SelectFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, declarations: [SelectFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSelectModule], exports: [SelectFormControlComponent] });
SelectFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectFormControlComponent],
                    exports: [SelectFormControlComponent],
                    entryComponents: [SelectFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxSelectModule]
                }]
        }] });

class AssignmentExpressionListFormControlModule {
}
AssignmentExpressionListFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AssignmentExpressionListFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlModule, declarations: [AssignmentExpressionListFormControlComponent], imports: [CommonModule,
        TranslateModule,
        ExpressionFormControlModule,
        ReactiveFormsModule,
        TextFormControlModule,
        SelectFormControlModule], exports: [AssignmentExpressionListFormControlComponent] });
AssignmentExpressionListFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlModule, imports: [[
            CommonModule,
            TranslateModule,
            ExpressionFormControlModule,
            ReactiveFormsModule,
            TextFormControlModule,
            SelectFormControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssignmentExpressionListFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AssignmentExpressionListFormControlComponent],
                    entryComponents: [AssignmentExpressionListFormControlComponent],
                    imports: [
                        CommonModule,
                        TranslateModule,
                        ExpressionFormControlModule,
                        ReactiveFormsModule,
                        TextFormControlModule,
                        SelectFormControlModule
                    ],
                    exports: [AssignmentExpressionListFormControlComponent]
                }]
        }] });

class AttachmentFormControlComponent extends ValueAccessor {
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.customDownload = this.downloadFile.bind(this);
    }
    ngOnInit() {
        if (!this.options.maxFileSize) {
            this.options.maxFileSize = Number.MAX_SAFE_INTEGER.toString();
        }
        if (!this.options.filesCount) {
            this.options.filesCount = '1';
        }
    }
    onModelChange(files) {
        this.value = files.length ? files.map((file) => file.data) : null;
    }
    onWriteValue(value) {
        this.fileObjects = map$1(value, (fileData) => {
            const defaultFileObject = {
                data: fileData,
                allowDeletion: true,
                inUploading: false,
                inDeleting: false,
                uploaded: 100,
                error: false,
                errorText: ''
            };
            const updatedFileObject = (this.fileObjects || []).find(({ data }) => data === fileData) || defaultFileObject;
            updatedFileObject.uploaded = 100;
            return updatedFileObject;
        });
    }
    downloadFile(fileObj) {
        this.ngZone.runOutsideAngular(() => {
            saveAs(fileObj.data, fileObj.data.name);
        });
    }
}
AttachmentFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlComponent, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
AttachmentFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AttachmentFormControlComponent, selector: "rx-attachment-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AttachmentFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-uploader\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    (ngModelChange)=\"onModelChange($event)\"\n    [(ngModel)]=\"fileObjects\"\n    [label]=\"options.label\"\n    [filesCount]=\"options.filesCount\"\n    [maxFileSize]=\"options.maxFileSize\"\n    [enableCustomDownload]=\"true\"\n    [customDownload]=\"customDownload\"\n    [reusable]=\"true\"\n  ></adapt-rx-uploader>\n</div>\n", styles: [":host adapt-rx-uploader ::ng-deep .adapt-uploader-file-uploaded,:host adapt-rx-uploader ::ng-deep .adapt-rx-uploader__restrict{display:none}\n"], components: [{ type: i1$1.AdaptRxUploaderComponent, selector: "adapt-rx-uploader", inputs: ["uploadMode", "selectionMode", "enableFileDialog", "allowedTypes", "forbiddenTypes", "suppressParallel", "filesCount", "allowDuplicates", "showUploadFolderAlert", "visibleFiles", "reusable", "allowDeletion", "customErrors", "indeterminateFileLoader", "url", "deleteUrl", "droppableArea", "enableCustomDownload", "customDownload", "popoverAppendToBody", "showTypesRestriction", "showMinSizeRestriction", "showMaxSizeRestriction", "showFilesCountRestriction", "texts", "icons", "fileErrors", "enableDnD", "maxFileSize", "minFileSize", "chunkSize", "testID"], outputs: ["beforeFileDialogOpen", "afterFileDialogOpen", "beforeFilesAdded", "afterFilesAdded", "dropped", "dragOver", "startFileUploading", "processFileUploading", "endFileUploading", "errorFileUploading", "finishedFileUploading", "removedFileFromQueue", "deletedFile", "cancelUploading"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-attachment-form-control',
                    templateUrl: './attachment-form-control.component.html',
                    styleUrls: ['./attachment-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: AttachmentFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class AttachmentFormControlModule {
}
AttachmentFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AttachmentFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, declarations: [AttachmentFormControlComponent], imports: [CommonModule, FormsModule, i1$1.AdaptRxUploaderModule], exports: [AttachmentFormControlComponent] });
AttachmentFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxUploaderModule.forRoot()]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxUploaderModule.forRoot()],
                    exports: [AttachmentFormControlComponent],
                    declarations: [AttachmentFormControlComponent],
                    entryComponents: [AttachmentFormControlComponent]
                }]
        }] });

class BooleanFormControlComponent extends ValueAccessor {
}
BooleanFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
BooleanFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: BooleanFormControlComponent, selector: "rx-checkbox-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BooleanFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<rx-boolean\n  [label]=\"options.label || options.description\"\n  [required]=\"options.required\"\n  [isDisabled]=\"isDisabled\"\n  [shouldDisplayAsCheckbox]=\"options.shouldDisplayAsCheckbox\"\n  [(ngModel)]=\"value\"\n  [tooltip]=\"options.tooltip\"\n></rx-boolean>\n", components: [{ type: RxBooleanComponent, selector: "rx-boolean", inputs: ["shouldDisplayAsCheckbox", "required", "isDisabled", "label", "tooltip"], outputs: ["rxBlur"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-checkbox-form-control',
                    templateUrl: './boolean-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: BooleanFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class BooleanFormControlModule {
}
BooleanFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BooleanFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, declarations: [BooleanFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule], exports: [BooleanFormControlComponent] });
BooleanFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BooleanFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [BooleanFormControlComponent],
                    exports: [BooleanFormControlComponent],
                    entryComponents: [BooleanFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxCheckboxModule, AdaptRxLabelModule, RxBooleanModule]
                }]
        }] });

class ColorPickerFormControlComponent extends ValueAccessor {
    constructor(rxColorUtilsService) {
        super();
        this.rxColorUtilsService = rxColorUtilsService;
    }
    get color() {
        return this.colorValue;
    }
    set color(color) {
        if (!this.rxColorUtilsService.isSameColor(color, this.value)) {
            this.value = this.rxColorUtilsService.normalize(color);
            this.colorValue = color;
        }
    }
    onWriteValue(value) {
        if (!this.color || !this.rxColorUtilsService.isSameColor(this.color, value)) {
            this.colorValue = this.rxColorUtilsService.normalize(value);
        }
    }
    setColor(color) {
        this.color = (color === null || color === void 0 ? void 0 : color.value) || 'null';
    }
}
ColorPickerFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlComponent, deps: [{ token: i1$3.RxColorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ColorPickerFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ColorPickerFormControlComponent, selector: "rx-color-picker-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ColorPickerFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-control-label [showRequiredLabel]=\"options.required\" [label]=\"options.label\"></adapt-rx-control-label>\n\n  <adapt-color-picker\n    [disabled]=\"isDisabled\"\n    [(ngModel)]=\"color\"\n    [showEmptyOption]=\"!options.required\"\n    [showRecentlyUsedColors]=\"false\"\n    (onSelectColor)=\"setColor($event)\"\n  ></adapt-color-picker>\n</div>\n", components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptColorPickerComponent, selector: "adapt-color-picker, adapt-colorpicker", inputs: ["showThemeColors", "showRecentlyUsedColors", "colorType", "label", "mobileView", "placement", "appendToBody", "disabled", "readonly", "showEmptyOption", "disabledStyleForReadonlyState", "recentlyUsedColors"], outputs: ["onChange", "onSelectColor", "open", "close", "focus", "blur", "recentlyUsedColorsChanged"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-color-picker-form-control',
                    templateUrl: './color-picker-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ColorPickerFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxColorUtilsService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class ColorPickerFormControlModule {
}
ColorPickerFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColorPickerFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, declarations: [ColorPickerFormControlComponent], imports: [CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule], exports: [ColorPickerFormControlComponent] });
ColorPickerFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, imports: [[CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ColorPickerFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptColorPickerModule, AdaptRxLabelModule],
                    declarations: [ColorPickerFormControlComponent],
                    exports: [ColorPickerFormControlComponent]
                }]
        }] });

class CounterFormControlComponent extends ValueAccessor {
    ngOnInit() {
        if (isNil(this.options.maxValue)) {
            this.options.maxValue = this.options.allowIntegerOnly ? RX_NUMBER.maxInteger : Number.MAX_SAFE_INTEGER;
        }
        if (isNil(this.options.minValue)) {
            this.options.minValue = this.options.allowIntegerOnly ? RX_NUMBER.minInteger : Number.MIN_SAFE_INTEGER;
        }
    }
    focus() {
        this.adaptRxCounterComponent.inputEl.nativeElement.focus();
    }
}
CounterFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CounterFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CounterFormControlComponent, selector: "rx-counter-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CounterFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptRxCounterComponent", first: true, predicate: AdaptRxCounterComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-counter\n  *ngIf=\"options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptIntegerNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<adapt-rx-counter\n  *ngIf=\"!options.allowIntegerOnly\"\n  [label]=\"options.label\"\n  [required]=\"options.required\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"value\"\n  [max]=\"options.maxValue\"\n  [min]=\"options.minValue\"\n  [adaptMax]=\"options.maxValue\"\n  [adaptMin]=\"options.minValue\"\n  adaptScientificNumber\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          content: tooltipContent,\n          iconName: 'question_circle_o'\n        }\n      : null\n  \"\n>\n</adapt-rx-counter>\n\n<ng-template #tooltipContent>\n  <div [innerHTML]=\"options.tooltip\"></div>\n</ng-template>\n", components: [{ type: i1$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1$1.AdaptScientificNumberValidatorDirective, selector: "[adaptScientificNumber][ngModel], [adaptScientificNumber][formControl]", inputs: ["adaptScientificNumberMessageFn"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-counter-form-control',
                    templateUrl: './counter-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: CounterFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], adaptRxCounterComponent: [{
                type: ViewChild,
                args: [AdaptRxCounterComponent]
            }] } });

class CounterFormControlModule {
}
CounterFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CounterFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, declarations: [CounterFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule], exports: [CounterFormControlComponent] });
CounterFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CounterFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxValidatorsModule, AdaptRxCounterModule],
                    declarations: [CounterFormControlComponent],
                    exports: [CounterFormControlComponent],
                    entryComponents: [CounterFormControlComponent]
                }]
        }] });

class CoarseGrainedCustomizationOptionsEditorComponent extends RxModalClass {
    constructor(formBuilder, rxModalService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.formBuilder = formBuilder;
        this.rxModalService = rxModalService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.data = this.activeModalRef.getData();
        this.scopeSelectionOptions = this.data.scopeSelectionOptions;
        this.isDisabled = this.data.overlayOperation !== RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        this.initForm();
    }
    isDirty() {
        return this.customizationOptionsForm.dirty;
    }
    isPublic() {
        return this.customizationOptionsForm.get('scope').value[0].id === RX_BUNDLE.definitionScopeTypes.public;
    }
    optionFormatter(option) {
        return option.name;
    }
    submit() {
        if (this.isPublic()) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'If the definition scope is set to Public, it cannot be changed once the definition gets saved. Do you want to continue?'
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else if (this.data.definitionScopeName === RX_BUNDLE.definitionScopeNames.public) {
            this.rxModalService
                .confirm({
                title: 'Warning',
                modalStyle: RX_MODAL.modalStyles.warning,
                message: 'Changing the definition scope from Public to Application or Library can break upgrades. Do you want to continue?'
            })
                .then((result) => {
                if (result) {
                    this.closeModal();
                }
            })
                .catch(noop);
        }
        else {
            this.closeModal();
        }
    }
    onScopeChange(rxSelectionChangeEvent) {
        if (rxSelectionChangeEvent.options[0].id === RX_BUNDLE.definitionScopes.application.type) {
            this.customizationOptionsForm.get('allowOverlay').setValue(false);
        }
    }
    closeModal() {
        const result = this.customizationOptionsForm.getRawValue();
        result.scope = result.scope[0].id;
        this.activeModalRef.close(result);
    }
    initForm() {
        const definitionScopeName = find(this.scopeSelectionOptions, (scopeType) => scopeType.name === this.data.definitionScopeName);
        this.customizationOptionsForm = this.formBuilder.group({
            scope: new FormControl([definitionScopeName]),
            allowOverlay: { value: this.data.allowOverlay || false, disabled: this.data.isDisabled }
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
CoarseGrainedCustomizationOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CoarseGrainedCustomizationOptionsEditorComponent, deps: [{ token: i2.FormBuilder }, { token: i1.RxModalService }, { token: i1$1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CoarseGrainedCustomizationOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CoarseGrainedCustomizationOptionsEditorComponent, selector: "rx-scope-customization-modal", usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form [formGroup]=\"customizationOptionsForm\" class=\"row\">\n    <div class=\"col-lg-5\">\n      <adapt-rx-select\n        label=\"Scope\"\n        rx-id=\"scope\"\n        [options]=\"scopeSelectionOptions\"\n        [optionFormatter]=\"optionFormatter\"\n        [disabled]=\"isDisabled || data.isDisabled\"\n        [tooltip]=\"{\n          iconName: 'question_circle_o',\n          content:\n            'If Scope is set to Application or Library, the definition will be available only to this application or library. If Scope is set to Public, the definition will be available to use by this and other applications and libraries.',\n          placement: 'bottom',\n          popoverMode: true\n        }\"\n        formControlName=\"scope\"\n        (onSelectionChange)=\"onScopeChange($event)\"\n      >\n      </adapt-rx-select>\n    </div>\n\n    <div class=\"col-lg-12\">\n      <h5>{{'com.bmc.arsys.rx.client.customization-options-editor.customization-options.label' | translate}}</h5>\n      <adapt-rx-checkbox\n        label=\"{{'com.bmc.arsys.rx.client.customization-options-editor.allow-future-customization.label'\n        | translate : { definitionType: data.definitionTypeDisplayName } }}\"\n        formControlName=\"allowOverlay\"\n        [disabled]=\"isDisabled || !isPublic()\"\n      >\n      </adapt-rx-checkbox>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!customizationOptionsForm.dirty\"\n    rx-id=\"save-button\"\n    (click)=\"submit()\"\n    type=\"button\"\n  >\n    Save\n  </button>\n\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">Cancel</button>\n</div>\n", components: [{ type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CoarseGrainedCustomizationOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-customization-modal',
                    templateUrl: './coarse-grained-customization-options-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i1.RxModalService }, { type: i1$1.ActiveModalRef }, { type: i0.Injector }]; } });

class CustomizationOptionsComponent extends ValueAccessor {
    constructor(rxModalService, rxBundleCacheService, rxOverlayService) {
        super();
        this.rxModalService = rxModalService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxOverlayService = rxOverlayService;
    }
    ngOnInit() {
        if (this.options) {
            this.updateValues();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.updateValues();
        }
    }
    getOverlayOperation() {
        var _a;
        return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, ((_a = this.options.overlayDescriptor) === null || _a === void 0 ? void 0 : _a.parentOverlayGroupId) || null);
    }
    updateValues() {
        this.setAllowOverlayLabel(this.options.allowOverlay);
        this.rxBundleCacheService
            .getDefinitionScopeName(this.options.scope)
            .pipe(take(1))
            .subscribe((definitionScopeName) => (this.definitionScopeName = definitionScopeName));
        this.rxBundleCacheService
            .getDefinitionScopeSelectionOptions()
            .pipe(take(1))
            .subscribe((scopeSelectionOptions) => (this.scopeSelectionOptions = scopeSelectionOptions));
        if (this.options.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
        }
    }
    openCustomizationOptionsEditor() {
        this.rxModalService
            .openModal({
            title: 'Scope/Customization options',
            content: CoarseGrainedCustomizationOptionsEditorComponent,
            blockKeyboard: false,
            size: 'sm',
            data: {
                definitionScopeName: this.definitionScopeName,
                allowOverlay: this.options.allowOverlay,
                scopeSelectionOptions: this.scopeSelectionOptions,
                isDisabled: this.options.isDisabled,
                overlayOperation: this.overlayOperation,
                definitionTypeDisplayName: this.options.definitionTypeDisplayName
            }
        })
            .then((result) => {
            this.setAllowOverlayLabel(result.allowOverlay);
            this.definitionScopeName = this.scopeSelectionOptions.find((value) => value.id === result.scope).name;
            this.value = result;
        })
            .catch(noop);
    }
    setAllowOverlayLabel(allowOverlay) {
        this.allowOverlayLabel = allowOverlay
            ? RX_OVERLAY.overlayAllowedLabels.allowed
            : RX_OVERLAY.overlayAllowedLabels.notAllowed;
    }
}
CustomizationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i1$2.RxBundleCacheService }, { token: i1$2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
CustomizationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: CustomizationOptionsComponent, selector: "rx-scope-customization-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CustomizationOptionsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-button\n    btn-type=\"tertiary\"\n    rx-id=\"open-customization-options-editor-link\"\n    (click)=\"openCustomizationOptionsEditor()\"\n    class=\"p-0\"\n  >\n    {{ 'com.bmc.arsys.rx.client.designer.scope-customization-options.title' | translate }}\n  </adapt-button>\n  <adapt-icon\n    name=\"question_circle_o\"\n    class=\"ml-2\"\n    placement=\"right\"\n    maxWidth=\"400\"\n    [adaptPopover]=\"'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.tooltip' | translate\"\n  >\n  </adapt-icon>\n</div>\n\n<p rx-id=\"scope-name-label\" class=\"mb-0 pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.scope.label'\n      | translate: { definitionScopeName: definitionScopeName }\n  }}\n</p>\n<div rx-id=\"customization-options-label\" class=\"pt-2\">\n  {{\n    'com.bmc.arsys.rx.client.designer.scope-customization-options.customization.label'\n      | translate: { allowOverlayLabel: allowOverlayLabel }\n  }}\n</div>\n", components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i1$1.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-scope-customization-control',
                    templateUrl: './customization-options.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: CustomizationOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i1$2.RxBundleCacheService }, { type: i1$2.RxOverlayService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class CustomizationOptionsModule {
}
CustomizationOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomizationOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent], imports: [CommonModule,
        FormsModule,
        AdaptTooltipModule,
        AdaptRxSelectModule,
        AdaptButtonModule,
        AdaptCheckbox2Module,
        AdaptPopoverModule,
        AdaptIconModule,
        AdaptRxCheckboxModule,
        ReactiveFormsModule,
        TranslateModule], exports: [CustomizationOptionsComponent] });
CustomizationOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptTooltipModule,
            AdaptRxSelectModule,
            AdaptButtonModule,
            AdaptCheckbox2Module,
            AdaptPopoverModule,
            AdaptIconModule,
            AdaptRxCheckboxModule,
            ReactiveFormsModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: CustomizationOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
                    exports: [CustomizationOptionsComponent],
                    entryComponents: [CustomizationOptionsComponent, CoarseGrainedCustomizationOptionsEditorComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptTooltipModule,
                        AdaptRxSelectModule,
                        AdaptButtonModule,
                        AdaptCheckbox2Module,
                        AdaptPopoverModule,
                        AdaptIconModule,
                        AdaptRxCheckboxModule,
                        ReactiveFormsModule,
                        TranslateModule
                    ]
                }]
        }] });

class DateFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.datePickerControl = new FormControl('');
        this.pickerMode = RxDatetimePickerMode.Date;
    }
    ngOnInit() {
        this.datePickerControl.valueChanges.subscribe((value) => {
            if (value) {
                this.value = moment([value.year, value.month, value.date]).format('YYYY-MM-DD');
            }
            else {
                this.value = null;
            }
        });
    }
    writeValue(value) {
        super.writeValue(value);
        const date = moment(this.value);
        if (date.isValid()) {
            this.datePickerControl.setValue({
                year: date.year(),
                month: date.month(),
                date: date.date()
            });
        }
        else {
            this.datePickerControl.setValue(null);
        }
    }
}
DateFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DateFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateFormControlComponent, selector: "rx-date-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-date-form-control',
                    templateUrl: './date-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DateFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class DateFormControlModule {
}
DateFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, declarations: [DateFormControlComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule], exports: [DateFormControlComponent] });
DateFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxDatetimeModule],
                    declarations: [DateFormControlComponent],
                    exports: [DateFormControlComponent],
                    entryComponents: [DateFormControlComponent]
                }]
        }] });

const FORM_BUILDER = {
    controlTypes: {
        widget: 'widget',
        formControl: 'formControl',
        section: 'section'
    }
};

class AbstractFormControlModel {
    constructor() {
        this.hidden = false;
    }
    hide() {
        this.hidden = true;
    }
    show() {
        this.hidden = false;
    }
}

class FormControlModel extends AbstractFormControlModel {
    constructor(options, formControl) {
        super();
        this.type = FORM_BUILDER.controlTypes.formControl;
        this.isDisabled = false;
        this.formControl = formControl;
        this.name = options.name;
        this.component = options.component;
        this.hidden = options.hidden;
        this.isDisabled = options.isDisabled;
        this.options = options.options || {};
    }
}

class FormSectionModel extends AbstractFormControlModel {
    constructor(options) {
        super();
        this.type = FORM_BUILDER.controlTypes.section;
        this.open = true;
        this.controls = [];
        this.controls = options.controls;
        this.label = options.label;
        this.open = options.open === undefined ? true : options.open;
        this.hidden = options.hidden === undefined ? false : options.hidden;
    }
    collapse() {
        this.open = false;
    }
    expand() {
        this.open = true;
    }
}

class FormWidgetModel extends AbstractFormControlModel {
    constructor(options) {
        super();
        this.type = FORM_BUILDER.controlTypes.widget;
        this.hidden = false;
        this.isDisabled = false;
        this.component = options.component;
        this.hidden = options.hidden;
        this.isDisabled = options.isDisabled;
        this.options = options.options || {};
        this.widgetName = options.widgetName;
    }
}

class FormBuilderFactory {
    control(options, formControl) {
        return new FormControlModel(options, formControl);
    }
    widget(options) {
        return new FormWidgetModel(options);
    }
    section(options) {
        return new FormSectionModel(options);
    }
}
FormBuilderFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormBuilderFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderFactory, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class FormBuilderService {
    constructor() {
        this.editorEventSubject = new Subject();
        this.focusEditorSubject = new Subject();
        this.editorEvent$ = this.editorEventSubject.asObservable();
        this.focusEditor$ = this.focusEditorSubject.asObservable();
    }
    setFocusEditor(focusEditor) {
        this.focusEditorSubject.next(focusEditor);
    }
    dispatch(builderEvent) {
        this.editorEventSubject.next(builderEvent);
    }
}
FormBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderService, decorators: [{
            type: Injectable
        }] });

class FormOutletComponent {
    constructor(cr, formBuilderService, renderer) {
        this.cr = cr;
        this.formBuilderService = formBuilderService;
        this.renderer = renderer;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const factory = this.cr.resolveComponentFactory(this.control.component);
        const controlName = this.getControlName(this.control);
        this.componentRef = this.container.createComponent(factory);
        this.renderer.setAttribute(this.componentRef.location.nativeElement, 'rx-id', kebabCase(controlName));
        this.instance = this.componentRef.instance;
        this.instance.options = this.control.options;
        this.instance.propertyPath = controlName;
        if (this.instance.events) {
            this.instance.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
                this.formBuilderService.dispatch(event);
            });
        }
        this.formBuilderService.focusEditor$.pipe(takeUntil(this.destroyed$)).subscribe(({ editorName, data }) => {
            if (controlName === editorName && this.isFocusable(this.instance)) {
                this.instance.focus(data);
            }
        });
    }
    getControlName(control) {
        if (control instanceof FormWidgetModel) {
            return control.component.name;
        }
        else if (control instanceof FormControlModel) {
            return control.name;
        }
        else {
            return '';
        }
    }
    ngOnChanges(changes) {
        if (changes.control && this.instance) {
            this.instance.options = changes.control.currentValue.options;
            if (this.isSupportChanges(this.instance)) {
                const onChanges = {};
                if (!isEqual(changes.control.previousValue.options, changes.control.currentValue.options)) {
                    onChanges.options = new SimpleChange(changes.control.previousValue.options, changes.control.currentValue.options, false);
                }
                if (changes.control.previousValue.isDisabled !== changes.control.currentValue.isDisabled) {
                    onChanges.disabled = new SimpleChange(changes.control.previousValue.isDisabled, changes.control.currentValue.isDisabled, false);
                }
                if (Object.keys(onChanges).length) {
                    this.instance.ngOnChanges(onChanges);
                }
            }
        }
    }
    ngOnDestroy() {
        this.componentRef.destroy();
        this.componentRef = null;
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    // proxy calls from ControlValueAccessor interface to control component
    writeValue(value) {
        this.instance.writeValue(value);
    }
    registerOnChange(fn) {
        this.instance.registerOnChange(fn);
    }
    registerOnTouched(fn) {
        this.instance.registerOnTouched(fn);
    }
    setDisabledState(isDisabled) {
        this.instance.setDisabledState(isDisabled);
    }
    isFocusable(instance) {
        return Boolean(instance.focus);
    }
    isSupportChanges(instance) {
        return Boolean(instance.ngOnChanges);
    }
}
FormOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormOutletComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: FormBuilderService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
FormOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormOutletComponent, selector: "rx-form-outlet", inputs: { control: "control" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FormOutletComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block;margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-outlet',
                    template: '<ng-container #container></ng-container>',
                    styleUrls: ['./form-outlet.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FormOutletComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: FormBuilderService }, { type: i0.Renderer2 }]; }, propDecorators: { control: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });

class FormWidgetComponent {
    constructor(componentFactoryResolver, formBuilderService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.formBuilderService = formBuilderService;
        this.destroyed$ = new ReplaySubject(1);
        this.isHidden = false;
    }
    ngOnInit() {
        var _a;
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.componentRef = this.container.createComponent(factory);
        this.formWidgetComponent = this.componentRef.instance;
        this.formWidgetComponent.options = this.widget.options;
        this.formWidgetComponent.isDisabled = this.widget.isDisabled;
        (_a = this.formBuilderService.focusEditor$) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroyed$)).subscribe(({ editorName, data }) => {
            if (editorName === this.widget.widgetName && this.isFocusable(this.formWidgetComponent)) {
                this.formWidgetComponent.focus(data);
            }
        });
    }
    ngAfterViewInit() {
        var _a;
        (_a = this.formWidgetComponent.events) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            if (event.type === FormBuilderEvent.HideWidget) {
                this.isHidden = event.payload;
            }
            else {
                this.formBuilderService.dispatch(event);
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.widget && this.formWidgetComponent) {
            if (!isEqual(changes.widget.currentValue.component, changes.widget.previousValue.component)) {
                this.componentRef.destroy();
                const factory = this.componentFactoryResolver.resolveComponentFactory(changes.widget.currentValue.component);
                this.componentRef = this.container.createComponent(factory);
                this.formWidgetComponent = this.componentRef.instance;
            }
            this.formWidgetComponent.options = changes.widget.currentValue.options;
            this.formWidgetComponent.isDisabled = changes.widget.currentValue.isDisabled;
            if (this.isSupportChanges(this.formWidgetComponent)) {
                const onChanges = {};
                if (!isEqual(changes.widget.previousValue.options, changes.widget.currentValue.options)) {
                    onChanges.options = new SimpleChange(changes.widget.previousValue.options, changes.widget.currentValue.options, false);
                }
                if (changes.widget.previousValue.isDisabled !== changes.widget.currentValue.isDisabled) {
                    onChanges.isDisabled = new SimpleChange(changes.widget.previousValue.isDisabled, changes.widget.currentValue.isDisabled, false);
                }
                if (Object.keys(onChanges).length) {
                    this.formWidgetComponent.ngOnChanges(onChanges);
                }
            }
        }
    }
    ngOnDestroy() {
        this.componentRef.destroy();
        this.componentRef = null;
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    isSupportChanges(instance) {
        return Boolean(instance.ngOnChanges);
    }
    isFocusable(instance) {
        return Boolean(instance.focus);
    }
}
FormWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormWidgetComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: FormBuilderService }], target: i0.ɵɵFactoryTarget.Component });
FormWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormWidgetComponent, selector: "rx-form-widget", inputs: { widget: "widget" }, host: { properties: { "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block}:host:not(.isHidden){margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-widget',
                    template: '<ng-container #container></ng-container>',
                    styleUrls: ['./form-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: FormBuilderService }]; }, propDecorators: { widget: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], isHidden: [{
                type: HostBinding,
                args: ['class.isHidden']
            }] } });

class FormSectionComponent {
    constructor() {
        this.controlTypes = FORM_BUILDER.controlTypes;
        this.trackBySectionControls = this.trackBySectionControls.bind(this);
    }
    trackBySectionControls(index, item) {
        return this.guid + item.name || `${item.component.name}` || String(index);
    }
}
FormSectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormSectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormSectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormSectionComponent, selector: "rx-form-section", inputs: { guid: "guid", section: "section" }, ngImport: i0, template: "<adapt-accordion *ngIf=\"section.label\">\n  <adapt-accordion-tab [title]=\"section.label\" [isOpen]=\"true\">\n    <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n      <rx-form-outlet\n        *ngSwitchCase=\"controlTypes.formControl\"\n        [formControl]=\"control.formControl\"\n        [control]=\"control\"\n        [hidden]=\"control.hidden\"\n      ></rx-form-outlet>\n      <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n    </ng-container>\n  </adapt-accordion-tab>\n</adapt-accordion>\n\n<ng-container *ngIf=\"!section.label\">\n  <ng-container *ngFor=\"let control of section.controls; trackBy: trackBySectionControls\" [ngSwitch]=\"control.type\">\n    <rx-form-outlet\n      *ngSwitchCase=\"controlTypes.formControl\"\n      [formControl]=\"control.formControl\"\n      [control]=\"control\"\n      [hidden]=\"control.hidden\"\n    ></rx-form-outlet>\n    <rx-form-widget *ngSwitchCase=\"controlTypes.widget\" [widget]=\"control\"></rx-form-widget>\n  </ng-container>\n</ng-container>\n", components: [{ type: i1$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: FormOutletComponent, selector: "rx-form-outlet", inputs: ["control"] }, { type: FormWidgetComponent, selector: "rx-form-widget", inputs: ["widget"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormSectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-section',
                    templateUrl: './form-section.component.html'
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { guid: [{
                type: Input
            }], section: [{
                type: Input
            }] } });

class FormBuilderComponent {
    constructor(formBuilderFactory, formBuilder, rxGuidService, formBuilderService) {
        this.formBuilderFactory = formBuilderFactory;
        this.formBuilder = formBuilder;
        this.rxGuidService = rxGuidService;
        this.formBuilderService = formBuilderService;
        this.guid = this.rxGuidService.generate();
        this.modelChange = new EventEmitter();
        this.editorEvent = new EventEmitter();
        this.formInitialized = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.formGroup = this.formBuilder.group({});
        this.subscribeOnFormDataChange();
    }
    ngOnInit() {
        if (this.focusEditor$) {
            this.focusEditor$.pipe(takeUntil(this.destroyed$)).subscribe((focusEditorEvent) => {
                this.formBuilderService.setFocusEditor(focusEditorEvent);
            });
        }
        this.formBuilderService.editorEvent$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            this.editorEvent.emit(event);
        });
    }
    ngOnChanges(changes) {
        if (changes.model &&
            changes.model.currentValue &&
            !isEqual(changes.model.currentValue, changes.model.previousValue)) {
            this.updateFormData(changes.model.currentValue);
        }
        if (changes.config) {
            this.prepareLayout(changes.config.currentValue || []);
        }
        if (changes.isReadOnly && changes.isReadOnly.isFirstChange() && changes.isReadOnly.currentValue) {
            this.formGroup.disable();
        }
    }
    ngAfterViewInit() {
        this.formInitialized.next();
    }
    trackByControl(index, item) {
        return `${this.guid}${item.label}`;
    }
    ngOnDestroy() {
        this.formSubscription.unsubscribe();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    dispatch(event) {
        this.formBuilderService.dispatch(event);
    }
    updateFormData(model) {
        this.formSubscription.unsubscribe();
        Object.keys(model).forEach((propertyName) => this.getFormControlByName(propertyName).setValue(model[propertyName]));
        Object.keys(this.formGroup.getRawValue())
            .filter((propertyName) => !has(model, propertyName))
            .forEach((propertyName) => this.formGroup.removeControl(propertyName));
        this.subscribeOnFormDataChange();
    }
    prepareLayout(config) {
        this.layout = {
            controls: config.map((section) => this.formBuilderFactory.section(Object.assign(Object.assign({}, section), { controls: section.controls.map((propertyControlConfig) => {
                    let model;
                    if (this.isFormControl(propertyControlConfig)) {
                        const control = this.getFormControlByName(propertyControlConfig.name);
                        this.isReadOnly || propertyControlConfig.isDisabled
                            ? control.disable({ emitEvent: false })
                            : control.enable({ emitEvent: false });
                        model = this.formBuilderFactory.control(propertyControlConfig, control);
                    }
                    else {
                        model = this.formBuilderFactory.widget(Object.assign(Object.assign({}, propertyControlConfig), { isDisabled: propertyControlConfig.isDisabled || this.isReadOnly }));
                    }
                    return model;
                }) })))
        };
    }
    getFormControlByName(name) {
        let control = this.formGroup.controls[name];
        if (!control) {
            let validators;
            forEach(this.config, (section) => {
                const formControlConfig = find(section.controls, { name });
                if (formControlConfig) {
                    validators = formControlConfig.validators;
                }
                return !formControlConfig;
            });
            control = this.formBuilder.control(null, validators || []);
            this.formGroup.addControl(name, control);
        }
        return control;
    }
    subscribeOnFormDataChange() {
        this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
            // Get a raw value for all form controls including disabled.
            const rawValue = this.formGroup.getRawValue();
            // Check if rawValue is not an empty object, in this case we don't
            // want to emit model change when current model value is null.
            const formData = isEmpty(rawValue) ? null : rawValue;
            if (!isEqual(formData, this.model)) {
                this.modelChange.emit(formData);
            }
        });
    }
    isFormControl(config) {
        return !!config.name;
    }
}
FormBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderComponent, deps: [{ token: FormBuilderFactory }, { token: i2.FormBuilder }, { token: i1$3.RxGuidService }, { token: FormBuilderService }], target: i0.ɵɵFactoryTarget.Component });
FormBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormBuilderComponent, selector: "rx-form-builder", inputs: { config: "config", model: "model", guid: "guid", isReadOnly: "isReadOnly", focusEditor$: "focusEditor$" }, outputs: { modelChange: "modelChange", editorEvent: "editorEvent", formInitialized: "formInitialized" }, providers: [FormBuilderService], usesOnChanges: true, ngImport: i0, template: "<form *ngIf=\"layout\">\n  <rx-form-section\n    *ngFor=\"let control of layout.controls; trackBy: trackByControl\"\n    [section]=\"control\"\n    [guid]=\"guid\"\n  ></rx-form-section>\n</form>\n", components: [{ type: FormSectionComponent, selector: "rx-form-section", inputs: ["guid", "section"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-builder',
                    templateUrl: './form-builder.component.html',
                    providers: [FormBuilderService]
                }]
        }], ctorParameters: function () { return [{ type: FormBuilderFactory }, { type: i2.FormBuilder }, { type: i1$3.RxGuidService }, { type: FormBuilderService }]; }, propDecorators: { config: [{
                type: Input
            }], model: [{
                type: Input
            }], guid: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], focusEditor$: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], editorEvent: [{
                type: Output
            }], formInitialized: [{
                type: Output
            }] } });

class RxFormBuilderModule {
}
RxFormBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxFormBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule], exports: [FormBuilderComponent] });
RxFormBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFormBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptAccordionModule],
                    declarations: [FormWidgetComponent, FormOutletComponent, FormBuilderComponent, FormSectionComponent],
                    exports: [FormBuilderComponent]
                }]
        }] });

class DateTimeFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.datePickerControl = new FormControl('');
        this.pickerMode = RxDatetimePickerMode.DateTime;
    }
    ngOnInit() {
        this.datePickerControl.valueChanges.subscribe((value) => {
            if (value && !isNull(value.hours) && !isNull(value.minutes)) {
                this.value = moment([
                    value.year || 0,
                    value.month || 0,
                    value.date || 0,
                    value.hours,
                    value.minutes,
                    value.seconds || 0
                ]).toISOString();
            }
            else {
                this.value = null;
            }
        });
    }
    writeValue(value) {
        super.writeValue(value);
        const date = moment(this.value);
        if (date.isValid()) {
            this.datePickerControl.setValue({
                year: date.year(),
                month: date.month(),
                date: date.date(),
                hours: date.hour(),
                minutes: date.minutes()
            });
        }
        else {
            this.datePickerControl.setValue(null);
        }
    }
}
DateTimeFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DateTimeFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DateTimeFormControlComponent, selector: "rx-date-time-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateTimeFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-date-time-form-control',
                    templateUrl: './date-time-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DateTimeFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class DateTimeFormControlModule {
}
DateTimeFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateTimeFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, declarations: [DateTimeFormControlComponent], imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule], exports: [DateTimeFormControlComponent] });
DateTimeFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, imports: [[CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DateTimeFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DateTimeFormControlComponent],
                    imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule],
                    exports: [DateTimeFormControlComponent],
                    entryComponents: [DateTimeFormControlComponent]
                }]
        }] });

class GroupButtonFormControlComponent extends ValueAccessor {
    constructor(changeDetectorRef) {
        super();
        this.changeDetectorRef = changeDetectorRef;
    }
    onGroupButtonChange(groupButtonValues) {
        const index = findIndex(groupButtonValues, (buttonValue) => buttonValue);
        this.setValue(this.options.items[index]);
    }
    onWriteValue(value) {
        this.updateModel(value);
    }
    updateModel(value) {
        this.model = this.options.items.map((item) => item.value === value);
    }
    setValue(item) {
        if (this.options.beforeValueChange) {
            this.options.beforeValueChange(this.value, item.value).then((response) => {
                if (response) {
                    this.value = item.value;
                }
                else {
                    this.updateModel(this.value);
                    this.adaptButtonGroupComponent.writeValue(this.model);
                    this.changeDetectorRef.detectChanges();
                }
            });
        }
        else {
            this.value = item.value;
        }
    }
}
GroupButtonFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupButtonFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GroupButtonFormControlComponent, selector: "rx-group-button-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: GroupButtonFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptButtonGroupComponent", first: true, predicate: AdaptButtonGroupComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <adapt-rx-control-label\n    [label]=\"options.label\"\n    [showRequiredLabel]=\"!!options.required\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  ></adapt-rx-control-label>\n\n  <div class=\"mt-1\">\n    <adapt-button-group\n      [(ngModel)]=\"model\"\n      (ngModelChange)=\"onGroupButtonChange($event)\"\n      [disabled]=\"isDisabled\"\n      [config]=\"options.items\"\n      [size]=\"options.size || 'small'\"\n    >\n    </adapt-button-group>\n  </div>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: ["label{display:block}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonGroupComponent, selector: "adapt-button-group", inputs: ["config", "size", "groupType", "isVertical", "multiselectable", "uncheckable", "useCheckboxStyle"], outputs: ["modelArrayChanged"], exportAs: ["adaptBtnGroup"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-group-button-form-control',
                    templateUrl: './group-button-form-control.component.html',
                    styleUrls: ['./group-button-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: GroupButtonFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { adaptButtonGroupComponent: [{
                type: ViewChild,
                args: [AdaptButtonGroupComponent, { static: true }]
            }], options: [{
                type: Input
            }] } });

class GroupButtonFormControlModule {
}
GroupButtonFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GroupButtonFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, declarations: [GroupButtonFormControlComponent], imports: [CommonModule,
        AdaptRxLabelModule,
        AdaptButtonModule,
        AdaptButtonGroupModule,
        AdaptTooltipModule,
        FormsModule], exports: [GroupButtonFormControlComponent] });
GroupButtonFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, imports: [[
            CommonModule,
            AdaptRxLabelModule,
            AdaptButtonModule,
            AdaptButtonGroupModule,
            AdaptTooltipModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GroupButtonFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GroupButtonFormControlComponent],
                    exports: [GroupButtonFormControlComponent],
                    entryComponents: [GroupButtonFormControlComponent],
                    imports: [
                        CommonModule,
                        AdaptRxLabelModule,
                        AdaptButtonModule,
                        AdaptButtonGroupModule,
                        AdaptTooltipModule,
                        FormsModule
                    ]
                }]
        }] });

class IconBrowserDialogComponent {
    constructor(activeModalRef, document) {
        this.activeModalRef = activeModalRef;
        this.document = document;
        this.config = this.activeModalRef.getData();
        this.searchFormControl = new FormControl();
        this.selectedIcon$ = new BehaviorSubject(this.config.selectedIcon);
        this.filteredIcons$ = this.searchFormControl.valueChanges.pipe(debounceTime(200), startWith(''), distinctUntilChanged(), map((query) => query
            ? this.config.icons.filter(({ name }) => name.toLowerCase().indexOf(query.toLowerCase()) > -1)
            : this.config.icons));
        this.isSelectButtonDisabled$ = combineLatest([this.selectedIcon$, this.filteredIcons$]).pipe(map(([selectedIcon, filteredIcons]) => !selectedIcon || !filteredIcons.length || selectedIcon === this.config.selectedIcon));
        this.selectedIndex$ = combineLatest([this.selectedIcon$, this.filteredIcons$]).pipe(map(([selectedIcon, filteredIcons]) => selectedIcon ? filteredIcons.findIndex((icon) => icon.id === selectedIcon.id) : null), distinctUntilChanged());
        this.destroyed$ = new ReplaySubject(1);
    }
    ngAfterViewInit() {
        fromEvent(this.iconsList.nativeElement, 'keydown')
            .pipe(filter$1((event) => [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER].includes(event.keyCode)), tap((event) => event.preventDefault()), withLatestFrom(this.filteredIcons$, this.selectedIndex$), takeUntil(this.destroyed$))
            .subscribe(([event, icons, selectedIndex]) => {
            // we have to subtract 1px from the icon button width to compensate -1 margin trick in the CSS
            const cellsPerLine = Math.floor(this.iconsList.nativeElement.clientWidth / (this.iconButtons.first.nativeElement.offsetWidth - 1));
            let newIndex;
            if ([UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(event.keyCode)) {
                if (isNumber(selectedIndex)) {
                    switch (event.keyCode) {
                        case LEFT_ARROW: {
                            newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
                            break;
                        }
                        case UP_ARROW: {
                            newIndex = selectedIndex - cellsPerLine;
                            if (newIndex < 0) {
                                newIndex = selectedIndex;
                            }
                            break;
                        }
                        case RIGHT_ARROW: {
                            newIndex = selectedIndex < icons.length - 1 ? selectedIndex + 1 : selectedIndex;
                            break;
                        }
                        case DOWN_ARROW: {
                            newIndex = selectedIndex + cellsPerLine;
                            if (newIndex >= icons.length) {
                                newIndex = selectedIndex;
                            }
                            break;
                        }
                    }
                }
                else {
                    newIndex = 0;
                }
                this.selectIcon(icons[newIndex]);
                this.scrollToSelectedIcon();
            }
            else {
                event.preventDefault();
                if (this.selectedIcon$.value) {
                    this.onSelect();
                }
            }
        });
        this.scrollToSelectedIcon();
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.selectedIcon$.complete();
    }
    selectIcon(icon) {
        this.selectedIcon$.next(icon);
    }
    onSelect() {
        this.activeModalRef.close(this.selectedIcon$.value);
    }
    onCancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isIconSelected(icon) {
        var _a;
        return ((_a = this.selectedIcon$.value) === null || _a === void 0 ? void 0 : _a.id) === icon.id;
    }
    scrollToSelectedIcon() {
        this.selectedIcon$.pipe(take(1)).subscribe((selectedIcon) => {
            var _a;
            if (selectedIcon) {
                (_a = this.iconsList.nativeElement.querySelector(`.d-icon-${selectedIcon.id}`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest'
                });
            }
        });
    }
    trackByFn(index, item) {
        return item.id;
    }
}
IconBrowserDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
IconBrowserDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconBrowserDialogComponent, selector: "rx-icon-browser-dialog", viewQueries: [{ propertyName: "iconsList", first: true, predicate: ["iconsList"], descendants: true, read: ElementRef }, { propertyName: "iconButtons", predicate: ["iconButton"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div class=\"modal-body mh-100\">\n  <div class=\"d-flex w-100 h-100\">\n    <ng-container *ngIf=\"filteredIcons$ | async as filteredIcons\">\n      <div class=\"w-100 h-100\">\n        <adapt-rx-search\n          class=\"icon-search-field\"\n          [formControl]=\"searchFormControl\"\n          [autofocus]=\"true\"\n          (keydown)=\"$event.stopPropagation()\"\n        ></adapt-rx-search>\n\n        <div class=\"icons-browser d-flex\">\n          <ul #iconsList class=\"icons-list h-100\" *ngIf=\"filteredIcons?.length; else noIconsFound\" tabindex=\"0\">\n            <li\n              *ngFor=\"let icon of filteredIcons; trackBy: trackByFn\"\n              class=\"icon-list-item\"\n              [class.icon-list-item-selected]=\"isIconSelected(icon)\"\n            >\n              <button\n                #iconButton\n                class=\"icon-button p-0\"\n                tabindex=\"-1\"\n                [ngClass]=\"'d-icon-' + icon.id\"\n                (click)=\"selectIcon(icon)\"\n              >\n                <span class=\"sr-only\">{{ icon.name }}</span>\n              </button>\n            </li>\n          </ul>\n\n          <ng-template #noIconsFound>\n            <div class=\"icon-empty-state flex-grow-1\">\n              <adapt-empty-state class=\"flex-grow-1\" [type]=\"'search'\" [label]=\"'No icons found'\"></adapt-empty-state>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"filteredIcons?.length\"\n        class=\"icon-preview d-flex flex-column justify-content-center align-items-center\"\n      >\n        <ng-container *ngIf=\"selectedIcon$ | async as selectedIcon; else noIconSelected\">\n          <adapt-icon [name]=\"selectedIcon.id\" [testID]=\"selectedIcon.id\"></adapt-icon>\n\n          <p class=\"icon-title mt-1 mb-0\">{{ selectedIcon.name }}</p>\n        </ng-container>\n\n        <ng-template #noIconSelected>\n          <p class=\"no-icon-selected mb-0\">No icon selected</p>\n        </ng-template>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"select-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"isSelectButtonDisabled$ | async\"\n    (click)=\"onSelect()\"\n  >\n    Select\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancel()\">Cancel</button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:645px;overflow:hidden}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.icons-browser{display:flex;height:calc(100% - 38px - 15px)}.icon-search-field{display:block;margin-bottom:15px;max-width:853px}.icons-list{display:flex;flex-wrap:wrap;align-content:flex-start;overflow-y:auto;flex-grow:1;list-style:none;padding:1px 0 0;margin:0}.icons-list:focus{outline:none;box-shadow:inset 0 0 0 .2rem #00a79da6}.icon-empty-state{display:flex;align-items:center}.icon-list-item{margin:-1px -1px 0 0}.icon-list-item-selected .icon-button{background:#d6d7d8}.icon-button{width:72px;height:72px;border:1px solid #d6d7d8;background:transparent;font-size:2rem;color:#313538}.icon-button:hover{background:#f0f1f1}.icon-preview{margin-left:15px;margin-top:53px;flex-shrink:0;text-align:center;width:142px;height:143px;border:1px solid #d6d7d8;padding:10px 0}.icon-preview adapt-icon{font-size:70px;line-height:70px}.icon-preview .icon-title{color:#626668;max-height:40px;overflow:hidden}.no-icon-selected{font-size:.875rem;color:#626668}\n"], components: [{ type: i1$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1$1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-icon-browser-dialog',
                    templateUrl: './icon-browser-dialog.component.html',
                    styleUrls: ['./icon-browser-dialog.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { iconButtons: [{
                type: ViewChildren,
                args: ['iconButton', { read: ElementRef }]
            }], iconsList: [{
                type: ViewChild,
                args: ['iconsList', { read: ElementRef }]
            }] } });

class IconPickerFormControlComponent extends ValueAccessor {
    constructor(adaptModalService, renderer) {
        super();
        this.adaptModalService = adaptModalService;
        this.renderer = renderer;
        this.focus$ = new Subject();
        this.iconGlyphs = iconFontConfig.glyphs;
        this.search = (text$) => {
            const userInput$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            const inputFocus$ = this.focus$.pipe(map((event) => event.target.value));
            return merge(userInput$, inputFocus$).pipe(map((term) => term
                ? this.iconGlyphs.filter(({ name }) => name.toLowerCase().indexOf(term.toLowerCase()) > -1)
                : this.iconGlyphs));
        };
    }
    ngOnInit() {
        this.iconGlyphs = sortBy(this.iconGlyphs, (glyph) => glyph.name.toLowerCase());
    }
    inputFormatter(option) {
        return option.name;
    }
    onSelectItem(event) {
        this.value = event.item.id;
    }
    onWriteValue(value) {
        const iconId = get(RX_LEGACY_ICONS, value, value);
        if (!this.selectedIcon || this.selectedIcon.id !== iconId) {
            this.selectedIcon = this.iconGlyphs.find((icon) => icon.id === iconId);
        }
    }
    onFocus(event) {
        this.focus$.next(event);
    }
    onBlur() {
        this.selectedIcon = this.iconGlyphs.find((icon) => icon.id === this.value);
        const inputValue = this.typeahead.inputRef.nativeElement.value;
        if (!inputValue || !this.selectedIcon) {
            this.value = '';
            this.onWriteValue(this.value);
            this.renderer.setProperty(this.typeahead.inputRef.nativeElement, 'value', '');
        }
    }
    openIconBrowserDialog() {
        this.adaptModalService
            .open({
            title: 'Select icon',
            data: {
                selectedIcon: this.selectedIcon,
                icons: this.iconGlyphs
            },
            content: IconBrowserDialogComponent
        })
            .then((selectedIcon) => {
            this.value = selectedIcon.id;
            this.selectedIcon = selectedIcon;
        })
            .catch(noop);
    }
}
IconPickerFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlComponent, deps: [{ token: i1$1.AdaptModalService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
IconPickerFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconPickerFormControlComponent, selector: "rx-icon-picker-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IconPickerFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "typeahead", first: true, predicate: AdaptRxTypeaheadComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex justify-content-between align-items-center pb-1\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    *ngIf=\"!isDisabled\"\n    adapt-button\n    type=\"button\"\n    class=\"p-0 border-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"browse-button\"\n    (click)=\"openIconBrowserDialog()\"\n  >\n    <span class=\"d-icon-folder_open\"></span>\n    Browse\n  </button>\n</div>\n\n<div class=\"control-wrapper d-flex\">\n  <adapt-rx-typeahead\n    class=\"w-100\"\n    [class.has-selected-icon]=\"selectedIcon\"\n    rx-id=\"input-field\"\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    [appendToBody]=\"options.appendToBody\"\n    [typeahead]=\"search\"\n    [inputFormatter]=\"inputFormatter\"\n    [resultTemplate]=\"resultTemplate\"\n    [virtualScroll]=\"true\"\n    [(ngModel)]=\"selectedIcon\"\n    (onSelectItem)=\"onSelectItem($event)\"\n    (onFocus)=\"onFocus($event)\"\n    (onBlur)=\"onBlur()\"\n    [title]=\"selectedIcon?.name ?? ''\"\n  ></adapt-rx-typeahead>\n  <adapt-icon\n    *ngIf=\"selectedIcon\"\n    class=\"icon-preview\"\n    [name]=\"selectedIcon.id\"\n    [testID]=\"selectedIcon.id\"\n  ></adapt-icon>\n</div>\n\n<ng-template #resultTemplate let-result=\"result\">\n  <span class=\"icon-item\" [ngClass]=\"'d-icon-left-' + result.id\"></span>\n  {{ result.name }}\n</ng-template>\n", styles: [".icon-item{display:inline-block;width:22px;margin-right:4px;text-align:center}.control-wrapper{position:relative}.icon-preview{position:absolute;top:50%;left:17px;transform:translateY(-50%);pointer-events:none}::ng-deep adapt-rx-typeahead.has-selected-icon .form-control{padding-left:42px;padding-right:32px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxTypeaheadComponent, selector: "adapt-rx-typeahead", inputs: ["autocomplete", "placeholder", "editable", "focusFirst", "restoreFocusAfterClose", "inputFormatter", "typeahead", "resultFormatter", "resultTemplate", "showHint", "placement", "appendToBody", "size", "popupMaxHeight", "disabledStyleForReadonlyState", "virtualScroll", "virtualScrollItemSize", "minBufferPx", "maxBufferPx", "virtualScrollDropdownHeight", "popupClass", "popupWidth", "mobileFocusAutoscrollTopOffset", "showEmptyResultMessage", "resultStatusMessage", "showClearButton", "clearButtonText"], outputs: ["onSelectItem"] }, { type: i1$1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-icon-picker-form-control',
                    templateUrl: './icon-picker-form-control.component.html',
                    styleUrls: ['./icon-picker-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: IconPickerFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AdaptModalService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], typeahead: [{
                type: ViewChild,
                args: [AdaptRxTypeaheadComponent, { static: true }]
            }] } });

class IconBrowserDialogModule {
}
IconBrowserDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconBrowserDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, declarations: [IconBrowserDialogComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        AdaptRxSearchModule,
        AdaptIconModule,
        AdaptEmptyStateModule], exports: [IconBrowserDialogComponent] });
IconBrowserDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            AdaptRxSearchModule,
            AdaptIconModule,
            AdaptEmptyStateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        AdaptRxSearchModule,
                        AdaptIconModule,
                        AdaptEmptyStateModule
                    ],
                    declarations: [IconBrowserDialogComponent],
                    exports: [IconBrowserDialogComponent]
                }]
        }] });

class IconPickerFormControlModule {
}
IconPickerFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconPickerFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, declarations: [IconPickerFormControlComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdaptRxTypeaheadModule,
        AdaptButtonModule,
        AdaptIconModule,
        IconBrowserDialogModule], exports: [IconPickerFormControlComponent] });
IconPickerFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            AdaptRxTypeaheadModule,
            AdaptButtonModule,
            AdaptIconModule,
            IconBrowserDialogModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        AdaptRxTypeaheadModule,
                        AdaptButtonModule,
                        AdaptIconModule,
                        IconBrowserDialogModule
                    ],
                    declarations: [IconPickerFormControlComponent],
                    exports: [IconPickerFormControlComponent]
                }]
        }] });

class InputListFormControlComponent extends ValueAccessor {
    constructor(formBuilder) {
        super();
        this.formBuilder = formBuilder;
        this.formArray = this.formBuilder.array([]);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            if (this.formArray.controls.length) {
                this.value = this.formArray.getRawValue();
            }
            else {
                this.value = null;
            }
        });
    }
    addItem() {
        this.formArray.push(new FormControl(''));
    }
    removeItem(index) {
        this.formArray.removeAt(index);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
InputListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlComponent, deps: [{ token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
InputListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: InputListFormControlComponent, selector: "rx-input-list-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputListFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <div class=\"d-flex flex-row justify-content-between align-items-center\">\n    <adapt-rx-control-label [label]=\"options.label\" [showRequiredLabel]=\"options.required\"></adapt-rx-control-label>\n\n    <button adapt-button type=\"button\" btn-type=\"tertiary\" size=\"small\" (click)=\"addItem()\">\n      <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n      Add item\n    </button>\n  </div>\n\n  <div\n    class=\"d-flex flex-row align-items-center w-100 form-group\"\n    *ngFor=\"let control of formArray.controls; let i = index\"\n  >\n    <adapt-rx-textfield class=\"flex-fill\" [formControl]=\"control\"></adapt-rx-textfield>\n    <button\n      (click)=\"removeItem(i)\"\n      class=\"close position-relative ml-2\"\n      type=\"button\"\n      [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.remove.label' | translate\"\n    ></button>\n  </div>\n</div>\n", components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-input-list-form-control',
                    templateUrl: './input-list-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: InputListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class InputListFormControlModule {
}
InputListFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputListFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, declarations: [InputListFormControlComponent], imports: [CommonModule,
        AdaptRxLabelModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        TranslateModule,
        AdaptRxTextfieldModule], exports: [InputListFormControlComponent] });
InputListFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, imports: [[
            CommonModule,
            AdaptRxLabelModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            TranslateModule,
            AdaptRxTextfieldModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InputListFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [InputListFormControlComponent],
                    exports: [InputListFormControlComponent],
                    imports: [
                        CommonModule,
                        AdaptRxLabelModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        TranslateModule,
                        AdaptRxTextfieldModule
                    ]
                }]
        }] });

class LabelFormControlComponent extends ValueAccessor {
    constructor(translateService) {
        super();
        this.translateService = translateService;
    }
    ngOnInit() {
        this.label = this.options.labelKey ? this.translateService.instant(this.options.labelKey) : this.options.label;
    }
}
LabelFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlComponent, deps: [{ token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
LabelFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LabelFormControlComponent, selector: "rx-label-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: LabelFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"label\"></adapt-rx-control-label>\n", components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-label-form-control',
                    templateUrl: './label-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: LabelFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i4$1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class LabelFormControlModule {
}
LabelFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LabelFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, declarations: [LabelFormControlComponent], imports: [AdaptRxLabelModule, TranslateModule], exports: [LabelFormControlComponent] });
LabelFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, imports: [[AdaptRxLabelModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LabelFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [LabelFormControlComponent],
                    exports: [LabelFormControlComponent],
                    entryComponents: [LabelFormControlComponent],
                    imports: [AdaptRxLabelModule, TranslateModule]
                }]
        }] });

class ListItemComponent {
    constructor() {
        this.events = new EventEmitter();
    }
    ngOnInit() {
        this.options = {
            label: this.config.label,
            dataDictionary$: this.config.dataDictionary$,
            operators: this.config.operators
        };
    }
}
ListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListItemComponent, selector: "rx-list-item", inputs: { config: "config", propertyPath: "propertyPath", control: "control" }, outputs: { events: "events" }, ngImport: i0, template: "<adapt-rx-textfield *ngIf=\"!config.dataDictionary$\" [label]=\"config.label\" [formControl]=\"control\">\n</adapt-rx-textfield>\n\n<rx-expression-form-control\n  *ngIf=\"config.dataDictionary$\"\n  [formControl]=\"control\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"options\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", components: [{ type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-list-item',
                    templateUrl: './list-item.component.html'
                }]
        }], propDecorators: { config: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], control: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class ListFormControlComponent extends ValueAccessor {
    constructor(formBuilder, stringService) {
        super();
        this.formBuilder = formBuilder;
        this.stringService = stringService;
        this.events = new EventEmitter();
        this.itemList = this.formBuilder.array([]);
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.itemList.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
            this.value = value;
        });
    }
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (isDisabled) {
            this.itemList.disable();
        }
        else {
            this.itemList.enable();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.clearItems();
    }
    onWriteValue(modelValue) {
        if (!isEqual(modelValue, this.itemList.value)) {
            this.clearItems();
            // initialize values
            forEach(modelValue, (item) => this.addItem(item));
        }
    }
    clearItems() {
        this.itemList.clear();
    }
    addItem(item) {
        const itemControl = this.createItemFormGroup(item);
        this.itemList.push(itemControl);
    }
    createItemFormGroup(item) {
        const formGroupData = {};
        this.options.items.forEach((i) => {
            formGroupData[i.propertyName] = item[i.propertyName] || null;
        });
        return this.formBuilder.group(formGroupData);
    }
    onItemRemove(index) {
        this.itemList.removeAt(index);
    }
    onAddItem() {
        this.addItem({});
    }
}
ListFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlComponent, deps: [{ token: i2.FormBuilder }, { token: i1$3.RxStringService }], target: i0.ɵɵFactoryTarget.Component });
ListFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ListFormControlComponent, selector: "rx-list-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ListFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div [formGroup]=\"itemList\">\n  <button\n    (click)=\"onAddItem()\"\n    type=\"button\"\n    class=\"btn btn-sm btn-link px-0 py-0\"\n    [attr.rx-id]=\"'add-item-button'\"\n    *ngIf=\"!isDisabled\"\n  >\n    <span class=\"d-icon-plus_circle mr-1\" aria-hidden=\"true\"></span>\n    {{ options.addItemText }}\n  </button>\n\n  <div class=\"card mt-2\" *ngFor=\"let itemFormGroup of itemList.controls; let i = index\">\n    <div class=\"card-block p-3\">\n      <button\n        *ngIf=\"!isDisabled\"\n        (click)=\"onItemRemove(i)\"\n        class=\"close position-relative\"\n        type=\"button\"\n        aria-label=\"Remove\"\n      ></button>\n\n      <div\n        class=\"form-group\"\n        [ngClass]=\"{ 'mb-0': last, 'mb-3': !last }\"\n        *ngFor=\"let item of options.items; let first = first; let last = last\"\n        [attr.rx-id]=\"stringService.toRxId(item.label)\"\n      >\n        <rx-list-item\n          [config]=\"item\"\n          [control]=\"itemFormGroup.get(item.propertyName)\"\n          [propertyPath]=\"this.propertyPath + '[' + i + '].' + item.propertyName\"\n          (events)=\"events.emit($event)\"\n        >\n        </rx-list-item>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"isDisabled && options.emptyListText && itemList.controls.length === 0\">{{ options.emptyListText }}</div>\n</div>\n", styles: [".close{z-index:1}\n"], components: [{ type: ListItemComponent, selector: "rx-list-item", inputs: ["config", "propertyPath", "control"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-list-form-control',
                    templateUrl: './list-form-control.component.html',
                    styleUrls: ['./list-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ListFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i1$3.RxStringService }]; }, propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class ListFormControlModule {
}
ListFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, declarations: [ListFormControlComponent, ListItemComponent], imports: [CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule], exports: [ListFormControlComponent] });
ListFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, imports: [[CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ListFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ListFormControlComponent, ListItemComponent],
                    exports: [ListFormControlComponent],
                    entryComponents: [ListFormControlComponent],
                    imports: [CommonModule, ReactiveFormsModule, AdaptRxTextfieldModule, ExpressionFormControlModule]
                }]
        }] });

class OptionalExpressionControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.modelValues = {
            disable: '0',
            enable: '1'
        };
        this.selectValues = {
            all: 'all',
            condition: 'condition'
        };
        this.selectOptions = [
            {
                id: this.selectValues.all,
                name: 'At all times'
            },
            {
                id: this.selectValues.condition,
                name: 'When condition is true'
            }
        ];
        this.selectedCondition = [head(this.selectOptions)];
    }
    ngOnInit() {
        this.expressionFieldOptions = {
            label: 'Condition',
            expressionEditorPropertyName: this.options.expressionEditorPropertyName || upperFirst(this.propertyPath),
            dataDictionary$: this.options.dataDictionary$,
            operators: this.options.operators
        };
    }
    onWriteValue(modelValue) {
        this.conditionValue = '';
        this.selectedCondition = [head(this.selectOptions)];
        if (modelValue === this.modelValues.enable) {
            this.checkbox = true;
        }
        else if (modelValue === this.modelValues.disable) {
            this.checkbox = false;
        }
        else {
            this.checkbox = true;
            this.selectedCondition = [last(this.selectOptions)];
            this.conditionValue = modelValue;
        }
    }
    onSwitcherChange(modelValue) {
        this.selectedCondition = [head(this.selectOptions)];
        this.conditionValue = '';
        this.value = modelValue ? this.modelValues.enable : this.modelValues.disable;
    }
    onSelectChange(selectedValue) {
        this.selectedCondition = selectedValue;
        this.conditionValue = '';
        this.value = head(selectedValue).id === this.selectValues.all ? this.modelValues.enable : '';
    }
    onConditionChange(expressionValue) {
        this.value = expressionValue;
    }
    optionFormatter(option) {
        return option.name;
    }
}
OptionalExpressionControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalExpressionControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalExpressionControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label [label]=\"options.label\"></adapt-rx-control-label>\n\n<div class=\"clearfix\">\n  <adapt-rx-switch\n    [(ngModel)]=\"checkbox\"\n    (ngModelChange)=\"onSwitcherChange($event)\"\n    [disabled]=\"isDisabled\"\n  ></adapt-rx-switch>\n\n  <adapt-rx-select\n    *ngIf=\"checkbox\"\n    class=\"condition-select\"\n    [options]=\"selectOptions\"\n    [ngModel]=\"selectedCondition\"\n    (ngModelChange)=\"onSelectChange($event)\"\n    [disabled]=\"isDisabled\"\n    [optionFormatter]=\"optionFormatter\"\n  ></adapt-rx-select>\n</div>\n\n<rx-expression-form-control\n  *ngIf=\"selectedCondition[0].id === selectValues.condition\"\n  [options]=\"expressionFieldOptions\"\n  [propertyPath]=\"this.propertyPath\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"conditionValue\"\n  (ngModelChange)=\"onConditionChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".condition-select{width:165px;float:right;margin-bottom:0;margin-top:2px}adapt-select ::ng-deep .dropdown_select__menu{left:auto;right:0}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-expression-form-control',
                    templateUrl: './optional-expression-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalExpressionControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./optional-expression-control.component.scss']
                }]
        }], propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class OptionalExpressionControlModule {
}
OptionalExpressionControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OptionalExpressionControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, declarations: [OptionalExpressionControlComponent], imports: [CommonModule,
        FormsModule,
        AdaptRxSwitchModule,
        AdaptTextFieldModule,
        ExpressionFormControlModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule], exports: [OptionalExpressionControlComponent] });
OptionalExpressionControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, imports: [[
            CommonModule,
            FormsModule,
            AdaptRxSwitchModule,
            AdaptTextFieldModule,
            ExpressionFormControlModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [OptionalExpressionControlComponent],
                    exports: [OptionalExpressionControlComponent],
                    entryComponents: [OptionalExpressionControlComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        AdaptRxSwitchModule,
                        AdaptTextFieldModule,
                        ExpressionFormControlModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule
                    ]
                }]
        }] });

class OptionalSelectFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.switcherValue = false;
        this.selectValue = [];
    }
    onSwitcherChange(newValue) {
        this.switcherValue = newValue;
        if (newValue) {
            const option = head(this.options.options);
            if (option && !this.value) {
                this.value = option.id;
            }
        }
        else {
            this.value = null;
        }
    }
    onWriteValue(value) {
        this.switcherValue = !isNull(value);
        this.selectValue = this.value ? [this.options.options.find((option) => option.id === value)] : [];
    }
    onSelectionChange(value) {
        this.value = head(value).id;
    }
    optionFormatter(option) {
        return option.name;
    }
}
OptionalSelectFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalSelectFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalSelectFormControlComponent, selector: "rx-optional-select-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalSelectFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex\">\n    <div class=\"mr-2\">\n      <adapt-rx-switch\n        [ngModel]=\"switcherValue\"\n        (ngModelChange)=\"onSwitcherChange($event)\"\n        [disabled]=\"isDisabled\"\n      ></adapt-rx-switch>\n    </div>\n\n    <adapt-rx-select\n      class=\"mb-0 w-100\"\n      *ngIf=\"switcherValue\"\n      [disabled]=\"isDisabled\"\n      [options]=\"options.options\"\n      [required]=\"options.required\"\n      [ngModel]=\"selectValue\"\n      (ngModelChange)=\"onSelectionChange($event)\"\n      [optionFormatter]=\"optionFormatter\"\n    >\n    </adapt-rx-select>\n  </div>\n</div>\n", components: [{ type: i1$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-select-form-control',
                    templateUrl: './optional-select-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalSelectFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });

class OptionalSelectFormControlModule {
}
OptionalSelectFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OptionalSelectFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, declarations: [OptionalSelectFormControlComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule], exports: [OptionalSelectFormControlComponent] });
OptionalSelectFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalSelectFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdaptRxSwitchModule, AdaptRxSelectModule],
                    exports: [OptionalSelectFormControlComponent],
                    declarations: [OptionalSelectFormControlComponent],
                    entryComponents: [OptionalSelectFormControlComponent]
                }]
        }] });

class StepperWithUnitsFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.stepperOptions = {};
        this.stepperValue = null;
        this.unitValue = [];
        this.stepperValueByUnitsCache = {};
    }
    get unit() {
        return this.unitValue;
    }
    set unit(value) {
        const unitValueId = head(value).id;
        this.unitValue = value;
        this.updateStepperConfig(unitValueId);
        this.stepperValue = this.stepperValueByUnitsCache.hasOwnProperty(unitValueId)
            ? this.stepperValueByUnitsCache[unitValueId]
            : this.stepperOptions.defaultValue;
        this.value = this.stepperValue ? this.stepperValue + unitValueId : null;
    }
    get stepper() {
        return this.stepperValue;
    }
    set stepper(value) {
        this.stepperValue = value;
        this.stepperValueByUnitsCache[head(this.unit).id] = value;
        this.value = !isNil(value) && !isNaN(value) && this.unitValue.length ? value + head(this.unitValue).id : null;
    }
    writeValue(value) {
        var _a;
        if (value) {
            const numberValue = value.match(/^[+-]?\d+(\.\d+)?/);
            this.stepperValue = numberValue ? Number(head(numberValue)) : null;
            if (size(this.options.units)) {
                const regExpString = map$1(this.options.units, 'id').join('|');
                const unitId = head(value.match(new RegExp(regExpString)));
                if (unitId) {
                    this.unitValue = [find(this.options.units, { id: unitId })];
                    this.stepperValueByUnitsCache[unitId] = this.stepperValue;
                    this.updateStepperConfig(unitId);
                }
            }
            else {
                this.unitValue = [];
            }
        }
        else {
            if (this.unitValue.length) {
                this.stepperValue = null;
            }
            else {
                const defaultUnit = (_a = find(this.options.units, { id: this.options.defaultUnit })) !== null && _a !== void 0 ? _a : head(this.options.units);
                this.unitValue = [defaultUnit];
                this.updateStepperConfig(defaultUnit.id);
                this.stepperValue = this.stepperOptions.defaultValue;
            }
        }
    }
    optionFormatter(option) {
        return option.name;
    }
    updateStepperConfig(unitId) {
        this.stepperOptions = this.options.stepperOptionByUnits ? this.options.stepperOptionByUnits[unitId] : {};
        this.maxValue = isUndefined(this.stepperOptions.maxValue) ? Number.MAX_SAFE_INTEGER : this.stepperOptions.maxValue;
        this.minValue = isUndefined(this.stepperOptions.minValue) ? Number.MIN_SAFE_INTEGER : this.stepperOptions.minValue;
    }
}
StepperWithUnitsFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
StepperWithUnitsFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: StepperWithUnitsFormControlComponent, selector: "rx-stepper-with-units-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: StepperWithUnitsFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" [ngClass]=\"{ 'is-required': options.required }\">\n  <label class=\"form-control-label\" *ngIf=\"options.label\">{{ options.label }}</label>\n\n  <div class=\"d-flex flex-row\">\n    <div class=\"control\">\n      <adapt-rx-counter\n        [min]=\"minValue\"\n        [max]=\"maxValue\"\n        [adaptMin]=\"minValue\"\n        [adaptMax]=\"maxValue\"\n        [required]=\"options.required\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"stepper\"\n        [step]=\"options.step || 1\"\n        adaptIntegerNumber\n      >\n      </adapt-rx-counter>\n    </div>\n\n    <div class=\"control ml-1\">\n      <adapt-rx-select\n        [options]=\"options.units\"\n        [disabled]=\"isDisabled\"\n        [(ngModel)]=\"unit\"\n        [optionFormatter]=\"optionFormatter\"\n      >\n      </adapt-rx-select>\n    </div>\n  </div>\n</div>\n", styles: [".control{flex:1}\n"], components: [{ type: i1$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }, { type: i1$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-stepper-with-units-form-control',
                    templateUrl: './stepper-with-units-form-control.component.html',
                    styleUrls: ['./stepper-with-units-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: StepperWithUnitsFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });

class StepperWithUnitsFormControlModule {
}
StepperWithUnitsFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepperWithUnitsFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, declarations: [StepperWithUnitsFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule], exports: [StepperWithUnitsFormControlComponent] });
StepperWithUnitsFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StepperWithUnitsFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, AdaptRxSelectModule, AdaptRxCounterModule, AdaptRxValidatorsModule],
                    declarations: [StepperWithUnitsFormControlComponent],
                    exports: [StepperWithUnitsFormControlComponent],
                    entryComponents: [StepperWithUnitsFormControlComponent]
                }]
        }] });

class SwitchFormControlComponent extends ValueAccessor {
}
SwitchFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SwitchFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SwitchFormControlComponent, selector: "rx-switcher-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SwitchFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-control-label\n    *ngIf=\"options.label\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName\n          }\n        : null\n    \"\n  >\n  </adapt-rx-control-label>\n\n  <ng-template #popoverContent>\n    <span [innerHtml]=\"options.tooltip.content\"></span>\n  </ng-template>\n\n  <adapt-rx-switch [(ngModel)]=\"value\" [label]=\"options.description\" [disabled]=\"isDisabled\"></adapt-rx-switch>\n</div>\n", styles: ["label{display:block}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-switcher-form-control',
                    templateUrl: './switch-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SwitchFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./switch-form-control.component.scss']
                }]
        }], propDecorators: { options: [{
                type: Input
            }] } });

class SwitchFormControlModule {
}
SwitchFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SwitchFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, declarations: [SwitchFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule], exports: [SwitchFormControlComponent] });
SwitchFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SwitchFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SwitchFormControlComponent],
                    exports: [SwitchFormControlComponent],
                    entryComponents: [SwitchFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxSwitchModule, AdaptRxLabelModule]
                }]
        }] });

class TagsFormControlComponent extends ValueAccessor {
    constructor(rxStringService, renderer) {
        super();
        this.rxStringService = rxStringService;
        this.renderer = renderer;
        this.autocompleteSearchBound = this.autocompleteSearch.bind(this);
    }
    focus() {
        // @ts-ignore
        this.renderer.selectRootElement(this.adaptTagField.adaptRxTypeaheadComponent.inputRef.nativeElement, true).focus();
    }
    onTagsModelChange(tags) {
        this.tags = tags;
        this.value = this.getStringFromTags(tags);
    }
    onWriteValue(value) {
        this.tags = this.getTagsFromString(value);
    }
    getStringFromTags(tags) {
        if (isEmpty(tags)) {
            return null;
        }
        const tagsString = tags.map((tag) => (this.isAutocompleteTag(tag) ? tag.data.value : tag).trim()).join(' ');
        return tagsString.replace(/\s{2,}/g, ' ');
    }
    isAutocompleteTag(tag) {
        return isObject(tag);
    }
    getTagsFromString(tagsString) {
        if (tagsString) {
            const tags = tagsString.split(' ');
            const autocompleteValues = this.options.autocompleteValues;
            if (isEmpty(autocompleteValues)) {
                return tags;
            }
            return tags
                .map((tag) => autocompleteValues.find((autocomplete) => autocomplete.data.value === tag) || tag.trim())
                .filter(Boolean);
        }
        return [];
    }
    autocompleteSearch(text$) {
        return text$.pipe(debounceTime(250), distinctUntilChanged(), map((searchTerm) => {
            const autocompleteValues = this.options.autocompleteValues;
            if (isEmpty(autocompleteValues)) {
                return [];
            }
            return autocompleteValues.filter((autocompleteValue) => this.rxStringService.caseInsensitiveSearch(autocompleteValue.text, searchTerm));
        }));
    }
    onInitTagEditing(event) {
        const tag = event.tag;
        if (this.isAutocompleteTag(tag)) {
            event.preventDefault();
        }
    }
}
TagsFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlComponent, deps: [{ token: i1$3.RxStringService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TagsFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TagsFormControlComponent, selector: "rx-tags-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TagsFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptTagField", first: true, predicate: ["adaptTagField"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-tag-field\n  #adaptTagField\n  [label]=\"options.label\"\n  [placeholder]=\"options.placeholder\"\n  [required]=\"options.required\"\n  [ngModel]=\"tags\"\n  [disabled]=\"isDisabled\"\n  [popoverContent]=\"options.tooltip?.content\"\n  [popoverIcon]=\"options.tooltip?.iconName\"\n  (ngModelChange)=\"onTagsModelChange($event)\"\n  [replaceModelOnWrite]=\"true\"\n  [delimiterSymbol]=\"null\"\n  [search]=\"autocompleteSearchBound\"\n  [openDropdownOnFocus]=\"true\"\n  [errorCheck]=\"options.errorCheck\"\n  (initTagEditing)=\"onInitTagEditing($event)\"\n>\n</adapt-tag-field>\n", styles: [":host ::ng-deep .adapt-mt-wrapper{padding-left:5px;padding-right:5px}\n"], components: [{ type: i1$1.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-tags-form-control',
                    templateUrl: './tags-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TagsFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./tags-form-control.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxStringService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], adaptTagField: [{
                type: ViewChild,
                args: ['adaptTagField', { static: true }]
            }] } });

class TagsFormControlModule {
}
TagsFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TagsFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, declarations: [TagsFormControlComponent], imports: [CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule], exports: [TagsFormControlComponent] });
TagsFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, imports: [[CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TagsFormControlComponent],
                    exports: [TagsFormControlComponent],
                    entryComponents: [TagsFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptMetatagModule, AdaptTagModule, AdaptRxLabelModule]
                }]
        }] });

class TextareaFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
    focus() {
        this.renderer.selectRootElement(this.editor.textareaRef.nativeElement, true).focus();
    }
}
TextareaFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TextareaFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TextareaFormControlComponent, selector: "rx-textarea-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextareaFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-textarea\n  #editor\n  label=\"{{ options.label }}\"\n  [required]=\"options.required\"\n  [rows]=\"options.rows\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"\n    options.tooltip\n      ? {\n          iconName: options.tooltip.iconName,\n          content: options.tooltip.content,\n          popoverMode: true\n        }\n      : null\n  \"\n>\n</adapt-rx-textarea>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}adapt-rx-textarea ::ng-deep textarea{resize:none}\n"], components: [{ type: i1$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-textarea-form-control',
                    templateUrl: './textarea-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextareaFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./textarea-form-control.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], editor: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });

class TextareaFormControlModule {
}
TextareaFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextareaFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, declarations: [TextareaFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextareaModule], exports: [TextareaFormControlComponent] });
TextareaFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextareaModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TextareaFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TextareaFormControlComponent],
                    exports: [TextareaFormControlComponent],
                    entryComponents: [TextareaFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextareaModule]
                }]
        }] });

class TimeFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.datePickerControl = new FormControl('');
        this.pickerMode = RxDatetimePickerMode.Time;
    }
    ngOnInit() {
        this.datePickerControl.valueChanges.subscribe((value) => {
            if (value && !isNull(value.hours) && !isNull(value.minutes)) {
                this.value = moment({
                    hour: value.hours,
                    minute: value.minutes,
                    seconds: value.seconds || 0
                }).format('HH:mm:ss');
            }
            else {
                this.value = null;
            }
        });
    }
    writeValue(value) {
        super.writeValue(value);
        const date = moment(this.value, 'LTS');
        if (date.isValid()) {
            this.datePickerControl.setValue({
                hours: date.hour(),
                minutes: date.minutes()
            });
        }
        else {
            this.datePickerControl.setValue(null);
        }
    }
}
TimeFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
TimeFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TimeFormControlComponent, selector: "rx-time-form-control", inputs: { options: "options", isDisabled: "isDisabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TimeFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-rx-datetime\n  [label]=\"options.label\"\n  [disabled]=\"isDisabled\"\n  [mode]=\"pickerMode\"\n  [required]=\"options.required\"\n  [formControl]=\"datePickerControl\"\n>\n</adapt-rx-datetime>\n", components: [{ type: i1$1.AdaptRxDatetimeComponent, selector: "adapt-rx-datetime", inputs: ["placeholder", "inline", "placement", "appendToBody", "inlineLight", "inlineCompact", "dayFilter", "disableWizard", "mode", "hasSeconds", "use12HoursTime", "firstDayOfWeek", "initialDatetime", "defaultDatetime", "disabledStyleForReadonlyState", "popupClass", "texts", "inputFormat"], outputs: ["onPopupOpenChange", "onDatetimeChange"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-time-form-control',
                    templateUrl: './time-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TimeFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class TimeFormControlModule {
}
TimeFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, declarations: [TimeFormControlComponent], imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule], exports: [TimeFormControlComponent] });
TimeFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, imports: [[CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TimeFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TimeFormControlComponent],
                    imports: [CommonModule, AdaptRxDatetimeModule, FormsModule, ReactiveFormsModule],
                    exports: [TimeFormControlComponent],
                    entryComponents: [TimeFormControlComponent]
                }]
        }] });

var MessageType;
(function (MessageType) {
    MessageType["Warning"] = "Warning";
    MessageType["Success"] = "Success";
    MessageType["Info"] = "Info";
    MessageType["Error"] = "Error";
})(MessageType || (MessageType = {}));

const RX_VALIDATION_FORM_CONTROL = {
    events: {
        correctValidationIssue: 'CORRECT_VALIDATION_ISSUE'
    }
};

class ValidationFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.messageType = MessageType;
    }
    correctIssue() {
        this.events.emit({
            type: RX_VALIDATION_FORM_CONTROL.events.correctValidationIssue,
            payload: {
                propertyName: this.options.propertyName,
                componentGuid: this.options.componentGuid
            }
        });
    }
}
ValidationFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ValidationFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ValidationFormControlComponent, selector: "rx-validation-form-control", inputs: { options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0, template: "<p\n  [ngClass]=\"{\n    'text-danger': options.messageType === messageType.Error,\n    'text-warning': options.messageType === messageType.Warning,\n    'text-info': options.messageType === messageType.Info,\n    'text-success': options.messageType === messageType.Success\n  }\"\n  [ngStyle]=\"options.customStyle\"\n>\n  {{ options.text }}\n</p>\n\n<div *ngIf=\"options.componentGuid && !isDisabled\" class=\"text-right\">\n  <button type=\"button\" adapt-button size=\"small\" btn-type=\"tertiary\" (click)=\"correctIssue()\">Correct issue</button>\n</div>\n", components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-validation-form-control',
                    templateUrl: './validation-form-control.component.html'
                }]
        }], propDecorators: { options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class ValidationFormControlModule {
}
ValidationFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ValidationFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, declarations: [ValidationFormControlComponent], imports: [CommonModule, AdaptButtonModule], exports: [ValidationFormControlComponent] });
ValidationFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, imports: [[CommonModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ValidationFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ValidationFormControlComponent],
                    exports: [ValidationFormControlComponent],
                    entryComponents: [ValidationFormControlComponent],
                    imports: [CommonModule, AdaptButtonModule]
                }]
        }] });

class FormControlsModule {
}
FormControlsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormControlsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormControlsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormControlsModule, imports: [AssignmentExpressionListFormControlModule,
        TagsFormControlModule,
        ListFormControlModule,
        LabelFormControlModule,
        BooleanFormControlModule,
        SwitchFormControlModule,
        TextFormControlModule,
        TextareaFormControlModule,
        GroupButtonFormControlModule,
        SelectFormControlModule,
        ValidationFormControlModule,
        OptionalExpressionControlModule,
        OptionalSelectFormControlModule,
        CustomizationOptionsModule,
        StepperWithUnitsFormControlModule,
        ColorPickerFormControlModule,
        CounterFormControlModule,
        DateFormControlModule,
        DateTimeFormControlModule,
        TimeFormControlModule,
        AttachmentFormControlModule,
        ExpressionFormControlModule,
        InputListFormControlModule,
        IconPickerFormControlModule] });
FormControlsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormControlsModule, imports: [[
            AssignmentExpressionListFormControlModule,
            TagsFormControlModule,
            ListFormControlModule,
            LabelFormControlModule,
            BooleanFormControlModule,
            SwitchFormControlModule,
            TextFormControlModule,
            TextareaFormControlModule,
            GroupButtonFormControlModule,
            SelectFormControlModule,
            ValidationFormControlModule,
            OptionalExpressionControlModule,
            OptionalSelectFormControlModule,
            CustomizationOptionsModule,
            StepperWithUnitsFormControlModule,
            ColorPickerFormControlModule,
            CounterFormControlModule,
            DateFormControlModule,
            DateTimeFormControlModule,
            TimeFormControlModule,
            AttachmentFormControlModule,
            ExpressionFormControlModule,
            InputListFormControlModule,
            IconPickerFormControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormControlsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AssignmentExpressionListFormControlModule,
                        TagsFormControlModule,
                        ListFormControlModule,
                        LabelFormControlModule,
                        BooleanFormControlModule,
                        SwitchFormControlModule,
                        TextFormControlModule,
                        TextareaFormControlModule,
                        GroupButtonFormControlModule,
                        SelectFormControlModule,
                        ValidationFormControlModule,
                        OptionalExpressionControlModule,
                        OptionalSelectFormControlModule,
                        CustomizationOptionsModule,
                        StepperWithUnitsFormControlModule,
                        ColorPickerFormControlModule,
                        CounterFormControlModule,
                        DateFormControlModule,
                        DateTimeFormControlModule,
                        TimeFormControlModule,
                        AttachmentFormControlModule,
                        ExpressionFormControlModule,
                        InputListFormControlModule,
                        IconPickerFormControlModule
                    ]
                }]
        }] });

var DefinitionPickerOrExpressionComponentMode;
(function (DefinitionPickerOrExpressionComponentMode) {
    DefinitionPickerOrExpressionComponentMode["Definition"] = "Definition";
    DefinitionPickerOrExpressionComponentMode["Expression"] = "Expression";
})(DefinitionPickerOrExpressionComponentMode || (DefinitionPickerOrExpressionComponentMode = {}));
class DefinitionPickerOrExpressionFormControlComponent extends ValueAccessor {
    constructor() {
        super(...arguments);
        this.events = new EventEmitter();
        this.componentMode = DefinitionPickerOrExpressionComponentMode;
        this.activeMode = DefinitionPickerOrExpressionComponentMode.Definition;
    }
    ngOnInit() {
        this.activeMode = this.isDynamicDefinitionName(this.value)
            ? DefinitionPickerOrExpressionComponentMode.Expression
            : DefinitionPickerOrExpressionComponentMode.Definition;
        this.definitionPickerOptions = {
            definitionType: this.options.definitionType,
            label: this.options.label
        };
        this.expressionFormControlOptions = {
            dataDictionary$: this.options.dataDictionary$,
            operators: this.options.operators,
            label: this.options.label
        };
    }
    selectMode(mode) {
        if (this.activeMode !== mode) {
            this.activeMode = mode;
            this.value = null;
        }
        else if (this.activeMode === mode && this.value) {
            this.events.emit({
                type: RX_EXPRESSION_EDITOR.events.openExpressionEditor,
                payload: {
                    propertyPath: this.propertyPath
                }
            });
        }
    }
    onModelValueChange(expressionValue) {
        this.value = expressionValue;
    }
    isDynamicDefinitionName(definitionName) {
        return Boolean(definitionName === null || definitionName === void 0 ? void 0 : definitionName.match(/\$\{.*\}/));
    }
}
DefinitionPickerOrExpressionFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DefinitionPickerOrExpressionFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DefinitionPickerOrExpressionFormControlComponent, selector: "rx-definition-picker-or-expression-form-control", inputs: { options: "options", propertyPath: "propertyPath" }, outputs: { events: "events" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DefinitionPickerOrExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex flex-row-reverse row toggle-dropdown\">\n  <div class=\"dropdown\" adaptDropdown>\n    <button rx-id=\"toggle-button\" class=\"btn btn-link pl-0\" adaptDropdownToggle type=\"button\">\n      <span class=\"flex-grow-1 rx-ellipsis rx-selected-item\">\n        {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n      </span>\n    </button>\n\n    <div class=\"dropdown-menu\" adaptDropdownMenu>\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Definition)\"\n        [class.active]=\"activeMode === componentMode.Definition\"\n      >\n        Select {{ options.definitionType }}\n      </button>\n\n      <button\n        type=\"button\"\n        class=\"dropdown-item\"\n        (click)=\"selectMode(componentMode.Expression)\"\n        [class.active]=\"activeMode === componentMode.Expression\"\n      >\n        {{ 'com.bmc.arsys.rx.client.expression-editor.edit-expression.title' | translate }}\n      </button>\n    </div>\n  </div>\n</div>\n\n<rx-definition-picker\n  *ngIf=\"activeMode === componentMode.Definition\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  [options]=\"definitionPickerOptions\"\n  [isDisabled]=\"isDisabled\"\n>\n</rx-definition-picker>\n\n<rx-expression-form-control\n  *ngIf=\"activeMode === componentMode.Expression\"\n  [options]=\"expressionFormControlOptions\"\n  [propertyPath]=\"propertyPath\"\n  [disabled]=\"isDisabled\"\n  [ngModel]=\"value\"\n  (ngModelChange)=\"onModelValueChange($event)\"\n  (events)=\"events.emit($event)\"\n>\n</rx-expression-form-control>\n", styles: [".toggle-dropdown{margin-bottom:-29px}[rx-id=toggle-button]{margin-top:-9px;margin-right:5px}\n"], components: [{ type: i1$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i1$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-definition-picker-or-expression-form-control',
                    templateUrl: 'definition-picker-or-expression-form-control.component.html',
                    styleUrls: ['definition-picker-or-expression-form-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DefinitionPickerOrExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { options: [{
                type: Input
            }], propertyPath: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class DefinitionPickerOrExpressionFormControlModule {
}
DefinitionPickerOrExpressionFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DefinitionPickerOrExpressionFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, declarations: [DefinitionPickerOrExpressionFormControlComponent], imports: [FormsModule,
        CommonModule,
        AdaptRxLabelModule,
        AdaptDropdownModule,
        ExpressionFormControlModule,
        RxDefinitionPickerModule,
        TranslateModule], exports: [DefinitionPickerOrExpressionFormControlComponent] });
DefinitionPickerOrExpressionFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, imports: [[
            FormsModule,
            CommonModule,
            AdaptRxLabelModule,
            AdaptDropdownModule,
            ExpressionFormControlModule,
            RxDefinitionPickerModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DefinitionPickerOrExpressionFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        AdaptRxLabelModule,
                        AdaptDropdownModule,
                        ExpressionFormControlModule,
                        RxDefinitionPickerModule,
                        TranslateModule
                    ],
                    exports: [DefinitionPickerOrExpressionFormControlComponent],
                    declarations: [DefinitionPickerOrExpressionFormControlComponent],
                    entryComponents: [DefinitionPickerOrExpressionFormControlComponent]
                }]
        }] });

class RecordInstanceFormControlComponent extends ValueAccessor {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.model = {
            resourceType: RX_RECORD_DEFINITION.resourceTypes.recordInstanceProcessVariable
        };
    }
    focus() {
        this.renderer.selectRootElement(this.editor.inputRef.nativeElement, true).focus();
    }
    onModelChange() {
        this.value = this.model;
    }
}
RecordInstanceFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RecordInstanceFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordInstanceFormControlComponent, selector: "rx-record-instance-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordInstanceFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "editor", first: true, predicate: ["editor"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-rx-control-label class=\"d-block form-group\" [label]=\"options.label\"></adapt-rx-control-label>\n\n<adapt-rx-textfield\n  #editor\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.id.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.id\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n\n<adapt-rx-textfield\n  class=\"d-block form-group\"\n  [label]=\"'com.bmc.arsys.rx.client.record-instance-form-control.record-definition-name.label' | translate\"\n  [required]=\"options.required\"\n  [(ngModel)]=\"model.recordDefinitionName\"\n  [disabled]=\"isDisabled\"\n  [tooltip]=\"options.tooltip\"\n  (ngModelChange)=\"onModelChange()\"\n>\n</adapt-rx-textfield>\n", components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-instance-form-control',
                    templateUrl: './record-instance-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordInstanceFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], editor: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });

class RecordInstanceFormControlModule {
}
RecordInstanceFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RecordInstanceFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, declarations: [RecordInstanceFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule], exports: [RecordInstanceFormControlComponent] });
RecordInstanceFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordInstanceFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RecordInstanceFormControlComponent],
                    exports: [RecordInstanceFormControlComponent],
                    entryComponents: [RecordInstanceFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxTextfieldModule, AdaptRxLabelModule, TranslateModule]
                }]
        }] });

class RadioFormControlComponent extends ValueAccessor {
    constructor(translateService) {
        super();
        this.translateService = translateService;
    }
}
RadioFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlComponent, deps: [{ token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RadioFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RadioFormControlComponent, selector: "rx-radio-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\">\n  <adapt-rx-radiobutton-group\n    [(ngModel)]=\"value\"\n    [label]=\"options.label\"\n    [tooltip]=\"\n      options.tooltip\n        ? {\n            content: popoverContent,\n            popoverMode: options.tooltip.popoverMode,\n            placement: options.tooltip.placement,\n            iconName: options.tooltip.iconName,\n            maxWidth: options.tooltip.maxWidth\n          }\n        : null\n    \"\n    [disabled]=\"isDisabled\"\n  >\n    <adapt-rx-radiobutton\n      class=\"radio-inline\"\n      *ngFor=\"let item of options.items\"\n      [value]=\"item.value\"\n      [label]=\"item.label\"\n    >\n    </adapt-rx-radiobutton>\n  </adapt-rx-radiobutton-group>\n</div>\n\n<ng-template #popoverContent>\n  <span [innerHtml]=\"options.tooltip.content\"></span>\n</ng-template>\n", styles: [".form-group{width:450px}:host::ng-deep adapt-rx-radiobutton .radio{margin:0}:host::ng-deep adapt-rx-radiobutton.radio-inline{margin-left:0!important;margin-right:20px}\n"], components: [{ type: i1$1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1$1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-radio-form-control',
                    templateUrl: './radio-form-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RadioFormControlComponent,
                            multi: true
                        }
                    ],
                    styleUrls: ['./radio-form-control.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i4$1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RadioFormControlModule {
}
RadioFormControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RadioFormControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, declarations: [RadioFormControlComponent], imports: [CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule], exports: [RadioFormControlComponent] });
RadioFormControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, imports: [[CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RadioFormControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RadioFormControlComponent],
                    exports: [RadioFormControlComponent],
                    entryComponents: [RadioFormControlComponent],
                    imports: [CommonModule, FormsModule, AdaptRxRadiobuttonModule, AdaptRxLabelModule]
                }]
        }] });

class RxIframeComponent {
    constructor(rxJsonParserService, domSanitizer) {
        this.rxJsonParserService = rxJsonParserService;
        this.domSanitizer = domSanitizer;
        this.class = 'd-block';
        this.isAbsolutePositioned = false;
        this.isHidden = false;
        this.rxMessage = new EventEmitter();
        this.api = {
            postMessageToFrame: (message) => {
                this.iframe.nativeElement.contentWindow.postMessage(message, '*');
            }
        };
    }
    onMessage(event) {
        if (event.data) {
            const windowMessage = this.rxJsonParserService.tryParseJson(event.data);
            if (windowMessage) {
                this.rxMessage.emit(windowMessage);
            }
        }
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.url) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(changes.url.currentValue);
        }
    }
    updateUrl(url) {
        this.iframe.nativeElement.contentWindow.location.replace(url);
    }
}
RxIframeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeComponent, deps: [{ token: i1$3.RxJsonParserService }, { token: i2$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
RxIframeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIframeComponent, selector: "rx-iframe", inputs: { url: "url" }, outputs: { rxMessage: "rxMessage" }, host: { listeners: { "window:message": "onMessage($event)" }, properties: { "class": "this.class", "class.position-absolute": "this.isAbsolutePositioned", "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "iframe", first: true, predicate: ["frame"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<iframe #frame class=\"w-100 h-100 d-block\" frameborder=\"0\" [src]=\"src\"></iframe>\n", styles: [":host.position-absolute{top:52px;bottom:0;left:0;right:0;height:calc(100% - 52px)}:host.position-absolute.isHidden{z-index:-1;visibility:hidden}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-iframe',
                    templateUrl: './iframe.component.html',
                    styleUrls: ['./iframe.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$3.RxJsonParserService }, { type: i2$2.DomSanitizer }]; }, propDecorators: { url: [{
                type: Input
            }], class: [{
                type: HostBinding,
                args: ['class']
            }], isAbsolutePositioned: [{
                type: HostBinding,
                args: ['class.position-absolute']
            }], isHidden: [{
                type: HostBinding,
                args: ['class.isHidden']
            }], rxMessage: [{
                type: Output
            }], iframe: [{
                type: ViewChild,
                args: ['frame']
            }], onMessage: [{
                type: HostListener,
                args: ['window:message', ['$event']]
            }] } });

class RxIframeModule {
}
RxIframeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxIframeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeModule, declarations: [RxIframeComponent], imports: [CommonModule], exports: [RxIframeComponent] });
RxIframeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RxIframeComponent],
                    exports: [RxIframeComponent]
                }]
        }] });

class RxIframeService {
    constructor(applicationRef, document, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.document = document;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    showIframe(url) {
        if (!this.iframeComponentRef) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RxIframeComponent);
            this.iframeComponentRef = componentFactory.create(this.injector);
            this.iframeComponentRef.instance.isAbsolutePositioned = true;
            this.applicationRef.attachView(this.iframeComponentRef.hostView);
            const rxIframeHtmlElement = this.iframeComponentRef.hostView
                .rootNodes[0];
            this.document.querySelector('rx-root').appendChild(rxIframeHtmlElement);
            this.setIframeUrl(url);
        }
        else {
            this.iframeComponentRef.instance.isHidden = false;
            this.updateIframeUrl(url);
        }
    }
    hideIframe() {
        this.iframeComponentRef.instance.isHidden = true;
        this.updateIframeUrl(`/${RX_APPLICATION.innovationStudioBundleId}/index.html#/blank`);
    }
    getIframeApi() {
        return this.iframeComponentRef.instance.api;
    }
    setIframeUrl(url) {
        this.iframeComponentRef.instance.ngOnChanges({
            url: new SimpleChange(null, url, false)
        });
    }
    updateIframeUrl(url) {
        this.iframeComponentRef.instance.updateUrl(url);
    }
}
RxIframeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, deps: [{ token: i0.ApplicationRef }, { token: DOCUMENT }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxIframeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIframeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }]; } });

class InspectorDirective {
}
InspectorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
InspectorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorDirective, selector: "[rxInspector]", inputs: { designerItemModel: "designerItemModel" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[rxInspector]'
                }]
        }], propDecorators: { designerItemModel: [{
                type: Input
            }] } });

class RxInspectorModule {
}
RxInspectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInspectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxInspectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInspectorModule, declarations: [InspectorDirective], exports: [InspectorDirective] });
RxInspectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInspectorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInspectorModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [InspectorDirective],
                    declarations: [InspectorDirective]
                }]
        }] });

// tslint:disable-next-line:directive-class-suffix
class InspectorControlBase extends ValueAccessor {
    constructor(injector) {
        super();
        this.injector = injector;
        this.events = new EventEmitter();
        this.designerItemModel = this.injector.get(InspectorDirective).designerItemModel;
    }
}
InspectorControlBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorControlBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
InspectorControlBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.3", type: InspectorControlBase, inputs: { propertyPath: "propertyPath", options: "options" }, outputs: { events: "events" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorControlBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { propertyPath: [{
                type: Input
            }], options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class InspectorWidgetBase {
    constructor(injector) {
        this.injector = injector;
        this.events = new EventEmitter();
        this.designerItemModel = this.injector.get(InspectorDirective).designerItemModel;
    }
}
InspectorWidgetBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
InspectorWidgetBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: InspectorWidgetBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { options: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class ExpressionInspectorControlComponent extends InspectorControlBase {
    constructor() {
        super(...arguments);
        this.formControl = this.injector.get(NgControl).control;
    }
    ngOnInit() {
        this.patchOptions();
    }
    ngOnChanges(changes) {
        if (changes.optinos) {
            this.patchOptions();
        }
    }
    patchOptions() {
        this.expressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
    }
}
ExpressionInspectorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ExpressionInspectorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionInspectorControlComponent, selector: "rx-expression-inspector-form-control", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ExpressionFormControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<rx-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"expressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-expression-form-control>\n", components: [{ type: ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-inspector-form-control',
                    templateUrl: './expression-inspector-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ExpressionFormControlComponent,
                            multi: true
                        }
                    ]
                }]
        }] });

class ExpressionInspectorControlModule {
}
ExpressionInspectorControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExpressionInspectorControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, declarations: [ExpressionInspectorControlComponent], imports: [ExpressionFormControlModule, FormsModule, ReactiveFormsModule], exports: [ExpressionInspectorControlComponent] });
ExpressionInspectorControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, imports: [[ExpressionFormControlModule, FormsModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionInspectorControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ExpressionInspectorControlComponent],
                    imports: [ExpressionFormControlModule, FormsModule, ReactiveFormsModule],
                    exports: [ExpressionInspectorControlComponent]
                }]
        }] });

class OptionalExpressionInspectorControlComponent extends InspectorControlBase {
    constructor() {
        super(...arguments);
        this.formControl = this.injector.get(NgControl).control;
    }
    ngOnInit() {
        this.patchOptions();
    }
    ngOnChanges(changes) {
        if (changes.optinos) {
            this.patchOptions();
        }
    }
    patchOptions() {
        this.optionalExpressionFormControlOptions = Object.assign(Object.assign({}, this.options), { dataDictionary$: this.designerItemModel.expressionConfigurator.getDataDictionary(this.propertyPath), operators: this.designerItemModel.expressionConfigurator.getOperators(this.propertyPath) });
    }
}
OptionalExpressionInspectorControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
OptionalExpressionInspectorControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: OptionalExpressionInspectorControlComponent, selector: "rx-optional-expression-inspector-control", providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OptionalExpressionInspectorControlComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<rx-optional-expression-form-control\n  [formControl]=\"formControl\"\n  [propertyPath]=\"propertyPath\"\n  [options]=\"optionalExpressionFormControlOptions\"\n  (events)=\"events.emit($event)\"\n></rx-optional-expression-form-control>\n", components: [{ type: OptionalExpressionControlComponent, selector: "rx-optional-expression-form-control", inputs: ["options", "propertyPath"], outputs: ["events"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-optional-expression-inspector-control',
                    templateUrl: './optional-expression-inspector-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: OptionalExpressionInspectorControlComponent,
                            multi: true
                        }
                    ]
                }]
        }] });

class OptionalExpressionInspectorControlModule {
}
OptionalExpressionInspectorControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OptionalExpressionInspectorControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlModule, declarations: [OptionalExpressionInspectorControlComponent], imports: [OptionalExpressionControlModule, ReactiveFormsModule] });
OptionalExpressionInspectorControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlModule, imports: [[OptionalExpressionControlModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: OptionalExpressionInspectorControlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OptionalExpressionControlModule, ReactiveFormsModule],
                    declarations: [OptionalExpressionInspectorControlComponent]
                }]
        }] });

const RX_ISSUE_REPORTER = {
    recordDefinitionName: 'Reported Errors',
    recordFields: {
        operationId: {
            id: 70100,
            name: 'operationId'
        },
        applicationName: {
            id: 70101,
            name: 'applicationName'
        },
        messageType: {
            id: 70102,
            name: 'messageType'
        },
        messageNumber: {
            id: 70103,
            name: 'messageNumber'
        },
        messageText: {
            id: 70104,
            name: 'messageText'
        },
        details: {
            id: 70109,
            name: 'details'
        }
    },
    messageTypeOptions: { INFO: 0, WARNING: 1, ERROR: 2 }
};

class RxIssueReporterService {
    constructor(rxRecordInstanceService, rxGlobalCacheService, rxBundleCacheService) {
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxBundleCacheService = rxBundleCacheService;
    }
    reportIssue(message, data) {
        return this.prepareIssueDetails(message, data).pipe(switchMap((issueDetails) => {
            return this.rxRecordInstanceService.getNew(RX_ISSUE_REPORTER.recordDefinitionName).pipe(map((recordInstance) => {
                forEach(RX_ISSUE_REPORTER.recordFields, (field) => {
                    let fieldValue = issueDetails[field.name] || null;
                    if (field.id === RX_ISSUE_REPORTER.recordFields.messageType.id) {
                        fieldValue = RX_ISSUE_REPORTER.messageTypeOptions[fieldValue];
                    }
                    recordInstance.setFieldValue(field.id, fieldValue);
                });
                return recordInstance;
            }));
        }), switchMap((recordInstance) => this.rxRecordInstanceService.create(recordInstance)));
    }
    prepareIssueDetails(message, error = {}) {
        return this.rxGlobalCacheService.getBundleDescriptor(this.rxBundleCacheService.bundleId).pipe(map((bundleDescriptor) => ({
            details: message,
            applicationName: bundleDescriptor.friendlyName || null,
            messageType: error.messageType || null,
            messageNumber: error.messageNumber || null,
            operationId: error.operationId || null,
            messageText: error.messageText || error.appendedText ? `${error.messageText} ${error.appendedText}` : null
        })));
    }
}
RxIssueReporterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService, deps: [{ token: i3.RxRecordInstanceService }, { token: i1$2.RxGlobalCacheService }, { token: i1$2.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxIssueReporterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3.RxRecordInstanceService }, { type: i1$2.RxGlobalCacheService }, { type: i1$2.RxBundleCacheService }]; } });

class RxIssueReporterComponent extends RxModalClass {
    constructor(activeModalRef, formBuilder, rxIssueReporterService, rxNotificationService, translateService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.formBuilder = formBuilder;
        this.rxIssueReporterService = rxIssueReporterService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
        this.data = this.activeModalRef.getData();
        this.initForm();
    }
    isDirty() {
        return this.reportForm.dirty;
    }
    reportIssue() {
        this.rxIssueReporterService
            .reportIssue(this.reportForm.get('text').value, this.data)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.issue-report-submitted.message'));
            this.activeModalRef.close();
        });
    }
    initForm() {
        this.reportForm = this.formBuilder.group({
            text: ['', Validators.required]
        });
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
RxIssueReporterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i2.FormBuilder }, { token: RxIssueReporterService }, { token: i1$2.RxNotificationService }, { token: i4$1.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxIssueReporterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxIssueReporterComponent, selector: "rx-issue-reporter", usesInheritance: true, ngImport: i0, template: "<form [formGroup]=\"reportForm\" autocomplete=\"off\" (ngSubmit)=\"reportIssue()\" class=\"modal-body\">\n  <div class=\"form-group\">\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.issue-report-prepared.label' | translate }}\n    </p>\n    <p>\n      {{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.describe-issue-details.label' | translate }}\n    </p>\n\n    <adapt-rx-textarea\n      placeholder=\"{{ 'com.bmc.arsys.rx.client.issue-reporter.dialog.description.placeholder' | translate }}\"\n      rows=\"15\"\n      formControlName=\"text\"\n    >\n    </adapt-rx-textarea>\n  </div>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"cancel()\" class=\"ml-3 float-right\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"primary\" type=\"submit\" [disabled]=\"reportForm.invalid\" class=\"float-right\">\n    {{ 'com.bmc.arsys.rx.client.issue-reporter.submit-report.label' | translate }}\n  </button>\n</form>\n", components: [{ type: i1$1.AdaptRxTextareaComponent, selector: "adapt-rx-textarea", inputs: ["rows", "maxRows", "autocomplete", "placeholder", "size", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-issue-reporter',
                    templateUrl: './issue-reporter.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i2.FormBuilder }, { type: RxIssueReporterService }, { type: i1$2.RxNotificationService }, { type: i4$1.TranslateService }, { type: i0.Injector }]; } });

class RxIssueReporterModule {
    constructor(rxNotificationService, rxModalService, translateService) {
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxNotificationService.issuesToReport$.subscribe((issue) => {
            this.showModal(issue);
        });
    }
    showModal(issue) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.issue-reporter.report-issue.label'),
            data: issue,
            size: 'sm',
            content: RxIssueReporterComponent
        })
            .catch(noop);
    }
}
RxIssueReporterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, deps: [{ token: i1$2.RxNotificationService }, { token: i1.RxModalService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.NgModule });
RxIssueReporterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, declarations: [RxIssueReporterComponent], imports: [AdaptButtonModule,
        AdaptRxTextareaModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxNotificationModule,
        TranslateModule] });
RxIssueReporterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, providers: [AdaptModalService, RxIssueReporterService], imports: [[
            AdaptButtonModule,
            AdaptRxTextareaModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RxNotificationModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxIssueReporterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptButtonModule,
                        AdaptRxTextareaModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RxNotificationModule,
                        TranslateModule
                    ],
                    declarations: [RxIssueReporterComponent],
                    entryComponents: [RxIssueReporterComponent],
                    providers: [AdaptModalService, RxIssueReporterService]
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxNotificationService }, { type: i1.RxModalService }, { type: i4$1.TranslateService }]; } });

class RxSelectWithPaginationComponent {
    constructor(injector) {
        this.injector = injector;
        this.loadMoreCallbackFunc = this.onFilterValueChange.bind(this);
        this.selectedValue = [];
        this.isOptionLoadingInProgress = false;
        this.isFirstOptionPageLoaded = false;
        this.showLoadMoreButton = true;
        this.adaptSelectSettings = {
            enableSearch: true,
            showUncheckAll: true,
            modelFormat: SelectModelFormat.object,
            placement: 'auto'
        };
        this.onFirstTimeDropdownOpen = once(this.onFilterValueChange);
        this.startIndex = 0;
        this.adaptSelectOptions = [];
        this.filterValue$ = new Subject();
        this.options$ = this.filterValue$.pipe(tap(() => {
            this.isOptionLoadingInProgress = true;
        }), debounceTime(250), switchMap((query) => this.loadOptions(query)), startWith([]));
        this.label = '';
        this.required = false;
        this.isMultiSelectionMode = false;
        this.pageSize = 50;
        this.showDefaultTitle = true;
        this.showUncheckAll = true;
        this.readonly = false;
        this.toggleDropdown = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.viewToModelValueAdapter = (viewValue) => viewValue;
        this.modelToViewValueAdapter = (modelValue) => modelValue;
        this.optionFormatter = (option) => option.displayValue;
    }
    ngOnInit() {
        // cannot inject NgControl instance directly due to the angular circular dependency error.
        // see: https://github.com/angular/components/pull/13860/commits/f6b179e02b33c058a018ce4ccc51932d1416331f
        this.formControl = this.injector.get(NgControl);
        this.adaptSelectSettings = Object.assign(Object.assign({}, this.adaptSelectSettings), { showUncheckAll: this.showUncheckAll, pageSize: this.pageSize });
        if (this.isMultiSelectionMode) {
            this.adaptSelectSettings.checkedStyle = 'checkbox';
            this.adaptSelectSettings.showTooltip = true;
        }
    }
    ngOnChanges(changes) {
        if (changes.showDefaultTitle && this.adaptSelectComponent.texts) {
            if (changes.showDefaultTitle.isFirstChange()) {
                this.adaptSelectDefaultTitle = this.adaptSelectComponent.texts.defaultTitle;
                this.adaptSelectComponent.texts.defaultTitle = null;
            }
            this.adaptSelectComponent.texts = Object.assign(Object.assign({}, this.adaptSelectComponent.texts), { defaultTitle: changes.showDefaultTitle.currentValue ? this.adaptSelectDefaultTitle : null });
        }
    }
    resetLoadedOptions() {
        this.onFirstTimeDropdownOpen = once(this.onFilterValueChange);
        this.lastFilterValue = null;
        this.isFirstOptionPageLoaded = false;
        this.adaptSelectOptions = [];
    }
    onFilterValueChange(filterValue = this.lastFilterValue || '') {
        this.filterValue$.next(filterValue);
    }
    loadOptions(filterValue = this.lastFilterValue || '') {
        if (this.lastFilterValue === filterValue) {
            this.startIndex = this.pageSize > 0 ? this.startIndex + this.pageSize : 0;
        }
        else {
            this.lastFilterValue = filterValue;
            this.startIndex = 0;
        }
        return this.optionLoader(this.startIndex, this.pageSize, this.lastFilterValue).pipe(take(1), tap((optionsPage) => {
            const options = optionsPage.options;
            if (this.startIndex === 0) {
                this.adaptSelectOptions = options;
                this.isFirstOptionPageLoaded = true;
            }
            else {
                this.adaptSelectOptions = this.adaptSelectOptions.concat(options);
            }
            this.showLoadMoreButton = optionsPage.totalSize > this.adaptSelectOptions.length;
        }), map(() => this.adaptSelectOptions), finalize(() => {
            this.isOptionLoadingInProgress = false;
        }));
    }
    writeValue(selectedValue) {
        this.selectedValue = this.modelToViewValueAdapter(selectedValue);
    }
    onSelectedValueChange(selectedValue) {
        this.onViewValueChange(this.viewToModelValueAdapter(selectedValue));
    }
    ngDoCheck() {
        if (this.formControl.untouched && this.ngModel.touched) {
            this.ngModel.control.markAsUntouched();
        }
        else if (this.formControl.touched && this.ngModel.untouched) {
            this.ngModel.control.markAsTouched();
        }
        if (this.formControl.pristine && this.ngModel.control.dirty) {
            this.ngModel.control.markAsPristine();
        }
    }
    registerOnChange(fn) {
        this.onViewValueChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onDropdownToggle(isOpen) {
        if (isOpen) {
            this.onFirstTimeDropdownOpen();
            this.toggleDropdown.next(true);
        }
        else {
            this.onTouched();
            this.toggleDropdown.next(false);
            if (this.lastFilterValue) {
                this.onFilterValueChange('');
            }
        }
    }
    ngOnDestroy() {
        this.filterValue$.complete();
    }
}
RxSelectWithPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxSelectWithPaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: { label: "label", required: "required", isMultiSelectionMode: "isMultiSelectionMode", optionLoader: "optionLoader", pageSize: "pageSize", showDefaultTitle: "showDefaultTitle", showUncheckAll: "showUncheckAll", readonly: "readonly", template: "template", viewToModelValueAdapter: "viewToModelValueAdapter", modelToViewValueAdapter: "modelToViewValueAdapter", optionFormatter: "optionFormatter" }, outputs: { toggleDropdown: "toggleDropdown", selectionChange: "selectionChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxSelectWithPaginationComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "ngModel", first: true, predicate: AdaptRxSelectComponent, descendants: true, read: NgModel, static: true }, { propertyName: "adaptSelectComponent", first: true, predicate: AdaptRxSelectComponent, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<adapt-rx-select\n  class=\"mb-0\"\n  [popupClass]=\"'rx-truncate-option-content'\"\n  [label]=\"label\"\n  [multiple]=\"isMultiSelectionMode\"\n  [selectAllButton]=\"showUncheckAll\"\n  [deselectAllButton]=\"isMultiSelectionMode\"\n  [options]=\"options$ | async\"\n  [ngModel]=\"selectedValue\"\n  (ngModelChange)=\"onSelectedValueChange($event)\"\n  [disabled]=\"formControl.disabled\"\n  [readonly]=\"readonly\"\n  [required]=\"required\"\n  [loadMoreCallback]=\"loadMoreCallbackFunc\"\n  [loadMoreButton]=\"!(pageSize === -1) && showLoadMoreButton\"\n  [loadingState]=\"isOptionLoadingInProgress && !isFirstOptionPageLoaded\"\n  [loadMoreInProgress]=\"isOptionLoadingInProgress && isFirstOptionPageLoaded\"\n  (onFilterValueChange)=\"onFilterValueChange($event)\"\n  (onPopupOpenChange)=\"onDropdownToggle($event)\"\n  [optionFormatter]=\"optionFormatter\"\n  [enableFilter]=\"true\"\n  [emptyOption]=\"!isMultiSelectionMode\"\n  [optionContentTemplate]=\"template\"\n  (onSelectionChange)=\"selectionChange.emit($event)\"\n></adapt-rx-select>\n", components: [{ type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-select-with-pagination',
                    templateUrl: './select-with-pagination.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxSelectWithPaginationComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { ngModel: [{
                type: ViewChild,
                args: [AdaptRxSelectComponent, { static: true, read: NgModel }]
            }], adaptSelectComponent: [{
                type: ViewChild,
                args: [AdaptRxSelectComponent, { static: true }]
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], isMultiSelectionMode: [{
                type: Input
            }], optionLoader: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], showDefaultTitle: [{
                type: Input
            }], showUncheckAll: [{
                type: Input
            }], readonly: [{
                type: Input
            }], template: [{
                type: Input
            }], toggleDropdown: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], viewToModelValueAdapter: [{
                type: Input
            }], modelToViewValueAdapter: [{
                type: Input
            }], optionFormatter: [{
                type: Input
            }] } });

class RxSelectWithPaginationModule {
}
RxSelectWithPaginationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectWithPaginationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, declarations: [RxSelectWithPaginationComponent], imports: [AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule], exports: [RxSelectWithPaginationComponent] });
RxSelectWithPaginationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, imports: [[AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectWithPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AdaptRxSelectModule, FormsModule, TranslateModule, CommonModule],
                    exports: [RxSelectWithPaginationComponent],
                    declarations: [RxSelectWithPaginationComponent]
                }]
        }] });

class RxPermissionEditorDialogComponent extends RxModalClass {
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
        this.permissions = map$1(modalData.assignedPermissions, (assignedPermission) => {
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
            options: map$1(roleDataPage.data, (role) => ({
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
            options: map$1(groupDataPage.data, (group) => ({
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
        return flow((permissions) => map$1(permissions, (permission) => {
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
RxPermissionEditorDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorDialogComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i1$2.RxGroupDataPageService }, { token: i3.RxRecordInstanceUtilsService }, { token: i1$2.RxRoleDataPageService }, { token: i1.RxModalService }, { token: i1$2.RxBundleCacheService }, { token: i0.Renderer2 }, { token: i0.Injector }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxPermissionEditorDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxPermissionEditorDialogComponent, selector: "rx-permission-editor-dialog", viewQueries: [{ propertyName: "addNewPermissionButton", first: true, predicate: ["addNewPermissionButton"], descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ 'com.bmc.arsys.rx.client.permission-editor.title' | translate }}</h5>\n  <button class=\"close dp-close\" rx-id=\"x-button\" (click)=\"dismiss()\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <button\n    adapt-button\n    btn-type=\"tertiary\"\n    class=\"p-0\"\n    #addNewPermissionButton\n    rx-id=\"add-new-permission-button\"\n    (click)=\"addNewPermission()\"\n  >\n    <span class=\"d-icon-plus_circle\"></span>\n    {{ 'com.bmc.arsys.rx.client.permission-editor.button.add-permission.label' | translate }}\n  </button>\n\n  <div class=\"border-bottom pb-1 d-flex align-items-center\">\n    <div class=\"permission-type mr-2\">\n      <adapt-rx-control-label label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.column.type.label' | translate }}\">\n      </adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-role-selection d-flex align-items-center mr-2\">\n      <adapt-rx-control-label\n        label=\"{{ 'com.bmc.arsys.rx.client.permission-editor.permission-type.title' | translate }}\"\n      ></adapt-rx-control-label>\n    </div>\n\n    <div class=\"permission-warning\"></div>\n\n    <div class=\"permission-actions d-flex justify-content-center mr-2\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex flex-column justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-control-label class=\"text-center\" label=\"{{ action.label | translate }}\"></adapt-rx-control-label>\n        <adapt-button\n          btn-type=\"secondary\"\n          size=\"xtra-small\"\n          (click)=\"setRestrictionForAllPermissions(action.value)\"\n          [disabled]=\"permissions.length === 0\"\n        >\n          {{ 'com.bmc.arsys.rx.client.permission-editor.button.set-all.caption' | translate }}\n        </adapt-button>\n      </div>\n    </div>\n\n    <div class=\"remove-permission\"></div>\n  </div>\n\n  <div class=\"border-bottom py-2 d-flex\" *ngFor=\"let permission of permissions\">\n    <div class=\"permission-type mr-2\">\n      <div class=\"btn-group\">\n        <div *ngFor=\"let permissionType of permissionTypes | keyvalue: keepKeyValueOrder\">\n          <button\n            adapt-button\n            type=\"button\"\n            [btn-type]=\"permission.type === permissionType.value ? 'primary' : 'secondary'\"\n            *ngIf=\"\n              permissionType.value !== permissionTypes.securityLabel ||\n              (permissionType.value === permissionTypes.securityLabel && areSecurityLabelsAvailable)\n            \"\n            (click)=\"setPermissionType(permission, permissionType.value)\"\n          >\n            {{ buttonLabels[permissionType.value] }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"permission-role-selection mr-2\">\n      <rx-select-with-pagination\n        class=\"select-max-width\"\n        *ngIf=\"permission.type === permissionTypes.role\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"roleLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n\n      <rx-select-with-pagination\n        *ngIf=\"permission.type === permissionTypes.group\"\n        class=\"select-max-width\"\n        [(ngModel)]=\"permission.selectedPermissionDescriptor\"\n        (ngModelChange)=\"onPermissionDescriptorSelected()\"\n        [optionLoader]=\"groupLoader.bind(this)\"\n        [showUncheckAll]=\"false\"\n      ></rx-select-with-pagination>\n    </div>\n\n    <div class=\"permission-warning d-flex align-items-center\">\n      <span *ngIf=\"permission.isWarningShown\" class=\"d-icon-exclamation_triangle\"> </span>\n    </div>\n\n    <div class=\"permission-actions d-flex\" *ngIf=\"actionsData?.length\">\n      <div class=\"permission-action d-flex justify-content-center mr-1\" *ngFor=\"let action of actionsData\">\n        <adapt-rx-checkbox\n          class=\"checkbox-inline m-0\"\n          [(ngModel)]=\"permission.permittedActions[action.value]\"\n          (ngModelChange)=\"setPermissionRestriction(permission, action.value, $event)\"\n        >\n        </adapt-rx-checkbox>\n      </div>\n    </div>\n\n    <div class=\"remove-permission d-flex justify-content-end mr-2\">\n      <button class=\"close\" (click)=\"removePermission(permission)\"></button>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" [disabled]=\"!canSave\" rx-id=\"save-button\" (click)=\"save()\">\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"dismiss()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{min-height:600px}.permission-type{flex:2}.permission-role-selection{flex:3;width:5rem}.permission-actions{flex:1}.permission-warning,.remove-permission{margin-top:5px;flex:.3}.permission-action{flex:1}:host ::ng-deep adapt-select{max-width:300px}:host ::ng-deep .dropdown-item{white-space:normal;word-break:break-all}.permission-warning{color:#f83200}.checkbox-inline{height:20px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: RxSelectWithPaginationComponent, selector: "rx-select-with-pagination", inputs: ["label", "required", "isMultiSelectionMode", "optionLoader", "pageSize", "showDefaultTitle", "showUncheckAll", "readonly", "template", "viewToModelValueAdapter", "modelToViewValueAdapter", "optionFormatter"], outputs: ["toggleDropdown", "selectionChange"] }, { type: i1$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe, "keyvalue": i4.KeyValuePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-permission-editor-dialog',
                    templateUrl: './permission-editor-dialog.component.html',
                    styleUrls: ['./permission-editor-dialog.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i1$2.RxGroupDataPageService }, { type: i3.RxRecordInstanceUtilsService }, { type: i1$2.RxRoleDataPageService }, { type: i1.RxModalService }, { type: i1$2.RxBundleCacheService }, { type: i0.Renderer2 }, { type: i0.Injector }, { type: i4$1.TranslateService }]; }, propDecorators: { addNewPermissionButton: [{
                type: ViewChild,
                args: ['addNewPermissionButton', { read: ElementRef }]
            }] } });

class RxPermissionEditorComponent extends ValueAccessor {
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
    ], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex justify-content-between align-items-center\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    adapt-button\n    type=\"button\"\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"edit-button\"\n    *ngIf=\"!isDisabled\"\n    (click)=\"openEditor()\"\n  >\n    <span class=\"d-icon-pencil\"></span>\n    Edit\n  </button>\n</div>\n\n<div class=\"permissions\">\n  <div *ngIf=\"value?.length === 0\">\n    <h6 class=\"my-1\">None set (Admins only)</h6>\n  </div>\n\n  <div class=\"d-flex justify-content-between align-items-center pt-2\" *ngFor=\"let permission of value\">\n    <div class=\"permission-name\">\n      {{ permission.ownerId.name }}\n    </div>\n\n    <adapt-tag>{{ permission.type }}</adapt-tag>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.permission-name{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host ::ng-deep .a-tag{font-size:10px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
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

class RxPermissionEditorModule {
}
RxPermissionEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxPermissionEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent], imports: [CommonModule,
        RxSelectWithPaginationModule,
        RxModalModule,
        FormsModule,
        AdaptSelectModule,
        AdaptModalModule,
        AdaptButtonModule,
        AdaptTagModule,
        TranslateModule,
        AdaptRxCheckboxModule,
        AdaptRxLabelModule], exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent] });
RxPermissionEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, imports: [[
            CommonModule,
            RxSelectWithPaginationModule,
            RxModalModule,
            FormsModule,
            AdaptSelectModule,
            AdaptModalModule,
            AdaptButtonModule,
            AdaptTagModule,
            TranslateModule,
            AdaptRxCheckboxModule,
            AdaptRxLabelModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxPermissionEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RxSelectWithPaginationModule,
                        RxModalModule,
                        FormsModule,
                        AdaptSelectModule,
                        AdaptModalModule,
                        AdaptButtonModule,
                        AdaptTagModule,
                        TranslateModule,
                        AdaptRxCheckboxModule,
                        AdaptRxLabelModule
                    ],
                    declarations: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent],
                    exports: [RxPermissionEditorDialogComponent, RxPermissionEditorComponent],
                    entryComponents: [RxPermissionEditorComponent, RxPermissionEditorDialogComponent]
                }]
        }] });

class RenameDefinitionModalComponent extends RxModalClass {
    constructor(injector, activeModalRef, rxDefinitionNameService) {
        super(activeModalRef, injector);
        this.injector = injector;
        this.activeModalRef = activeModalRef;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.modalData = this.activeModalRef.getData();
    }
    ngOnInit() {
        super.ngOnInit();
        this.bundleId = this.rxDefinitionNameService.getBundleId(this.modalData.definitionName);
        this.definitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
        this.oldDefinitionDisplayName = this.rxDefinitionNameService.getDisplayName(this.modalData.definitionName);
        this.definitionNames = this.modalData.definitionNames
            .map((definitionName) => this.rxDefinitionNameService.getDisplayName(definitionName))
            .filter((definitionName) => definitionName !== this.definitionDisplayName);
    }
    isDirty() {
        return this.renameDefinitionModalForm.form.dirty;
    }
    getCorrectDefinitionNameValidator() {
        return (control) => {
            let result = null;
            if (control.value && !RX_RECORD_DEFINITION.validDefinitionNameRegex.test(control.value)) {
                result = { invalidDefinitionName: { message: this.modalData.validationErrorText } };
            }
            return result;
        };
    }
    onCancelClick() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    onSaveClick() {
        if (this.bundleId) {
            this.activeModalRef.close(this.rxDefinitionNameService.getDefinitionName(this.bundleId, this.definitionDisplayName));
        }
        else {
            this.activeModalRef.close(this.definitionDisplayName);
        }
    }
}
RenameDefinitionModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalComponent, deps: [{ token: i0.Injector }, { token: i1$1.ActiveModalRef }, { token: i1$2.RxDefinitionNameService }], target: i0.ɵɵFactoryTarget.Component });
RenameDefinitionModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RenameDefinitionModalComponent, selector: "rx-rename-definition-modal", viewQueries: [{ propertyName: "renameDefinitionModalForm", first: true, predicate: ["renameDefinitionModalForm"], descendants: true, read: NgForm, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <adapt-alert\n    *ngIf=\"modalData.infoText\"\n    [config]=\"{ title: modalData.infoText, type: 'inline', variant: 'warning' }\"\n  ></adapt-alert>\n\n  <form #renameDefinitionModalForm=\"ngForm\">\n    <adapt-rx-textfield\n      name=\"definitionDisplayName\"\n      [(ngModel)]=\"definitionDisplayName\"\n      [label]=\"modalData.fieldLabel\"\n      [rxCustomValidators]=\"getCorrectDefinitionNameValidator()\"\n      [maxlength]=\"modalData.maxLength || null\"\n      [rxUnique]=\"{\n        errorMessage:\n          'com.bmc.arsys.rx.client.rename-definition-modal.definition-already-exists.message'\n          | translate: { definitionType: modalData.definitionType },\n        items: definitionNames\n      }\"\n      adaptRequired\n      [autofocus]=\"modalData.autoFocus !== false\"\n    ></adapt-rx-textfield>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"save-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"\n      !renameDefinitionModalForm.form.dirty ||\n      !renameDefinitionModalForm.form.valid ||\n      oldDefinitionDisplayName === definitionDisplayName\n    \"\n    (click)=\"onSaveClick()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancelClick()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.AdaptRequiredValidatorDirective, selector: "[adaptRequired][ngModel],[adaptRequired][formControl]", inputs: ["adaptRequiredMessageFn"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.RxCustomValidatorsDirective, selector: "[rxCustomValidators][ngModel],[rxCustomValidators][formControl]", inputs: ["rxCustomValidators"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i1$3.RxUniqueValidator, selector: "[rxUnique]", inputs: ["rxUnique"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-rename-definition-modal',
                    templateUrl: './rename-definition-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.ActiveModalRef }, { type: i1$2.RxDefinitionNameService }]; }, propDecorators: { renameDefinitionModalForm: [{
                type: ViewChild,
                args: ['renameDefinitionModalForm', { static: true, read: NgForm }]
            }] } });

class RenameDefinitionModalModule {
}
RenameDefinitionModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RenameDefinitionModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, declarations: [RenameDefinitionModalComponent], imports: [i1$1.AdaptAlertModule, AdaptButtonModule,
        AdaptModalModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        CommonModule,
        FormsModule,
        RxDirectivesModule,
        RxUniqueValidatorModule,
        TranslateModule] });
RenameDefinitionModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, imports: [[
            AdaptAlertModule.forRoot(),
            AdaptButtonModule,
            AdaptModalModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            CommonModule,
            FormsModule,
            RxDirectivesModule,
            RxUniqueValidatorModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RenameDefinitionModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RenameDefinitionModalComponent],
                    imports: [
                        AdaptAlertModule.forRoot(),
                        AdaptButtonModule,
                        AdaptModalModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        CommonModule,
                        FormsModule,
                        RxDirectivesModule,
                        RxUniqueValidatorModule,
                        TranslateModule
                    ],
                    entryComponents: [RenameDefinitionModalComponent]
                }]
        }] });

const RX_REVERT_CUSTOMIZATION = {
    events: {
        revertCustomization: 'REVERT_CUSTOMIZATION'
    }
};

class RxRevertCustomizationComponent {
    constructor(rxModalService, rxOverlayService) {
        this.rxModalService = rxModalService;
        this.rxOverlayService = rxOverlayService;
        this.events = new EventEmitter();
        this.showOverlayOptions = false;
        this.isRevertActionHidden = false;
        this.isOverlayOperationHidden = false;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.updateData();
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        if (changes.options &&
            (changes.options.currentValue.overlayGroupId !== ((_a = changes.options.previousValue) === null || _a === void 0 ? void 0 : _a.overlayGroupId) ||
                ((_b = changes.options.currentValue.overlayDescriptor) === null || _b === void 0 ? void 0 : _b.parentOverlayGroupId) !==
                    ((_d = (_c = changes.options.previousValue) === null || _c === void 0 ? void 0 : _c.overlayDescriptor) === null || _d === void 0 ? void 0 : _d.parentOverlayGroupId))) {
            this.updateData();
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    updateData() {
        if (this.options.overlayGroupId) {
            this.overlayOperation = this.getOverlayOperation();
            this.isOverlayOperationHidden = RX_OVERLAY.operationTypes.createdInThisOverlayGroup === this.overlayOperation;
            this.isRevertActionHidden = this.shouldHideRevertAction();
            this.showOverlayOptions = !this.isOverlayOperationHidden || !this.isRevertActionHidden;
        }
        else {
            this.overlayOperation = RX_OVERLAY.operationTypes.createdInThisOverlayGroup;
            this.isOverlayOperationHidden = true;
            this.isRevertActionHidden = true;
        }
        this.events.emit({ type: FormBuilderEvent.HideWidget, payload: !this.showOverlayOptions });
    }
    revertCustomization() {
        this.events.emit({ type: RX_REVERT_CUSTOMIZATION.events.revertCustomization });
    }
    getOverlayOperation() {
        return this.rxOverlayService.getOverlayOperation(this.options.overlayGroupId, this.options.overlayDescriptor ? this.options.overlayDescriptor.parentOverlayGroupId : null);
    }
    shouldHideRevertAction() {
        return this.overlayOperation === RX_OVERLAY.operationTypes.customizedInThisOverlayGroup
            ? !this.options.allowOverlay
            : true;
    }
    onRevertCustomization() {
        this.rxModalService
            .confirm({
            title: 'Warning',
            modalStyle: RX_MODAL.modalStyles.warning,
            message: 'Are you sure you want to revert customization?'
        })
            .then((revert) => {
            if (revert) {
                this.revertCustomization();
            }
        });
    }
}
RxRevertCustomizationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationComponent, deps: [{ token: i1.RxModalService }, { token: i1$2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
RxRevertCustomizationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxRevertCustomizationComponent, selector: "rx-revert-customization", inputs: { options: "options", isDisabled: "isDisabled" }, outputs: { events: "events" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"showOverlayOptions\" class=\"d-flex justify-content-between align-items-end\">\n  <div *ngIf=\"!isOverlayOperationHidden\" class=\"mb-0\">\n    <adapt-rx-control-label label=\"Customization status\" class=\"d-block pb-1\"></adapt-rx-control-label>\n    {{ overlayOperation }}\n  </div>\n\n  <adapt-button\n    class=\"p-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"revert-customization-button\"\n    *ngIf=\"!isRevertActionHidden\"\n    (click)=\"onRevertCustomization()\"\n  >\n    <span class=\"d-icon-left-undo\"></span>\n    Revert\n  </adapt-button>\n</div>\n", components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-revert-customization',
                    templateUrl: './revert-customization.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i1$2.RxOverlayService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], events: [{
                type: Output
            }] } });

class RxRevertCustomizationModule {
}
RxRevertCustomizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxRevertCustomizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationModule, declarations: [RxRevertCustomizationComponent], imports: [CommonModule, AdaptButtonModule, AdaptRxLabelModule], exports: [RxRevertCustomizationComponent] });
RxRevertCustomizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationModule, imports: [[CommonModule, AdaptButtonModule, AdaptRxLabelModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRevertCustomizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AdaptButtonModule, AdaptRxLabelModule],
                    declarations: [RxRevertCustomizationComponent],
                    entryComponents: [RxRevertCustomizationComponent],
                    exports: [RxRevertCustomizationComponent]
                }]
        }] });

class RxSearchComponent {
    constructor(activatedRoute, router, rxDataPageService, rxShellService, rxPageTitleService, translateService, rxBundleCacheService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.rxDataPageService = rxDataPageService;
        this.rxShellService = rxShellService;
        this.rxPageTitleService = rxPageTitleService;
        this.translateService = translateService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.pageSize = 50;
        this.loading = true;
        this.loadingMore = false;
        this.startIndex = 0;
        this.totalSize = 0;
        this.searchString = '';
    }
    ngOnInit() {
        this.rxPageTitleService.set(this.translateService.instant('com.bmc.arsys.rx.client.shell.search.results.label'));
        this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.rxShellService.shellConfig$]).subscribe(([queryParams, shellConfig]) => {
            this.searchString = queryParams.get('q') || '';
            this.globalSearchRecords = map$1(shellConfig.globalSearchRecords, (item) => {
                item.selected = true;
                return item;
            });
            this.recordDefinitionsByName = keyBy(shellConfig.globalSearchRecords, 'name');
            this.loading = false;
            this.getGlobalSearchResults();
        });
        this.columns = [
            {
                field: 'colId',
                width: '45px',
                cellTemplate: this.colIdCellTemplate
            },
            {
                field: 'recordDefinitionName',
                cellTemplate: this.cellTemplate
            }
        ];
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    get searchValue() {
        return this.searchString.trim();
    }
    getGlobalSearchResults(infiniteScroll = false) {
        this.loading = true;
        this.loadingMore = infiniteScroll;
        if (!infiniteScroll) {
            this.startIndex = 0;
            this.totalSize = 0;
        }
        if (this.searchValue) {
            const queryParams = {
                mayHaveText: `%${this.searchValue}%`,
                pageSize: this.pageSize,
                searchResultOption: 'WORDS_AROUND_HIT',
                startIndex: this.startIndex
            };
            if (!isEmpty(this.globalSearchRecords)) {
                queryParams.recordDefinitionNames = map$1(filter(this.globalSearchRecords, 'selected'), 'name').join(',');
            }
            if (queryParams.recordDefinitionNames) {
                this.rxDataPageService
                    .withType('com.bmc.arsys.rx.application.search.datapage.SearchDataPageQuery')
                    .get({ params: queryParams })
                    .pipe(catchError((error) => {
                    this.loading = false;
                    this.loadingMore = false;
                    return throwError(error);
                }))
                    .subscribe((results) => {
                    this.loading = false;
                    this.loadingMore = false;
                    if (this.totalSize > 0) {
                        this.totalSize--;
                    }
                    this.totalSize += this.pageSize === results.totalSize ? results.totalSize + 1 : results.totalSize;
                    const newData = results.data;
                    this.startIndex += newData.length;
                    if (infiniteScroll) {
                        this.searchResults = this.searchResults.concat(newData);
                    }
                    else {
                        this.searchResults = newData;
                    }
                    this.searchResults = sortBy(this.searchResults, 'weight');
                });
            }
            else {
                this.resetSearchResults();
            }
        }
        else {
            this.resetSearchResults();
        }
    }
    resetSearchResults() {
        this.searchResults = [];
        this.totalSize = 0;
        this.loading = false;
        this.loadingMore = false;
    }
    search() {
        const trimmedSearchValue = this.searchString.trim();
        if (trimmedSearchValue) {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { q: trimmedSearchValue },
                queryParamsHandling: 'merge'
            });
        }
    }
    onFiltersChanged() {
        setTimeout(() => this.getGlobalSearchResults());
    }
    onLazyLoad(event) {
        this.getGlobalSearchResults(true);
    }
    selectAllRecords() {
        this.globalSearchRecords.forEach((record) => (record.selected = true));
        this.getGlobalSearchResults();
    }
    unSelectAllRecords() {
        this.globalSearchRecords.forEach((record) => (record.selected = false));
        this.getGlobalSearchResults();
    }
}
RxSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchComponent, deps: [{ token: i1$4.ActivatedRoute }, { token: i1$4.Router }, { token: i1$2.RxDataPageFactoryService }, { token: i3$1.RxShellService }, { token: i1$2.RxPageTitleService }, { token: i4$1.TranslateService }, { token: i1$2.RxBundleCacheService }], target: i0.ɵɵFactoryTarget.Component });
RxSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxSearchComponent, selector: "rx-search", viewQueries: [{ propertyName: "colIdCellTemplate", first: true, predicate: ["colIdCellTemplate"], descendants: true, static: true }, { propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"row\">\n  <div class=\"col-12\">\n    <h1 class=\"mb-4 mt-0\">{{ 'com.bmc.arsys.rx.client.common.search.label' | translate }}</h1>\n  </div>\n  <div class=\"col-6 col-md-4\">\n    <form autocomplete=\"off\" (ngSubmit)=\"search()\">\n      <adapt-rx-search\n        name=\"searchString\"\n        [autofocus]=\"true\"\n        [(ngModel)]=\"searchString\"\n        [placeholder]=\"'com.bmc.arsys.rx.client.shell.searchbox.placeholder' | translate\"\n      ></adapt-rx-search>\n    </form>\n  </div>\n  <div class=\"col-1 pl-0\">\n    <div adaptDropdown>\n      <button adaptDropdownToggle class=\"btn btn-link d-icon-left-filter pl-0\">\n        {{ 'com.bmc.arsys.rx.client.common.filter-data.label' | translate }}\n      </button>\n\n      <div adaptDropdownMenu class=\"dropdown-menu p-2\">\n        <div class=\"mb-3\">{{ 'com.bmc.arsys.rx.client.common.record-definition.label' | translate }}</div>\n\n        <div class=\"d-flex justify-content-between\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-all-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"selectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"select-none-button\"\n            class=\"btn btn-link p-0\"\n            (click)=\"unSelectAllRecords()\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.select-none.label' | translate }}\n          </button>\n        </div>\n\n        <ul *ngIf=\"globalSearchRecords\" class=\"list-unstyled mb-0\">\n          <li *ngFor=\"let record of globalSearchRecords\">\n            <adapt-rx-checkbox\n              class=\"mb-0 mt-3\"\n              [label]=\"record.name | rxDefinitionNamePipe\"\n              [(ngModel)]=\"record.selected\"\n              (change)=\"onFiltersChanged()\"\n            ></adapt-rx-checkbox>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"searchValue && (searchResults?.length || loading)\" class=\"row table-wrapper mt-1\">\n  <div class=\"col-12\">\n    <adapt-table\n      scrollHeight=\"flex\"\n      [value]=\"searchResults\"\n      [columns]=\"columns\"\n      [totalRecords]=\"totalSize\"\n      [rows]=\"searchResults?.length\"\n      [first]=\"startIndex\"\n      [paginator]=\"false\"\n      [scrollable]=\"true\"\n      (onLazyLoad)=\"onLazyLoad($event)\"\n      [lazy]=\"true\"\n      [lazyLoadOnInit]=\"false\"\n      [loading]=\"loading\"\n      [loadingMore]=\"loadingMore\"\n      [enableInfiniteScrolling]=\"true\"\n    >\n    </adapt-table>\n  </div>\n</div>\n\n<ng-template #colIdCellTemplate let-rowIndex=\"rowIndex\">\n  {{ rowIndex + 1 }}\n</ng-template>\n\n<ng-template #cellTemplate let-searchResult=\"dataItem\">\n  <div>\n    <span\n      >{{ searchResult.recordDefinitionName | rxDefinitionNamePipe }}\n      <a\n        [routerLink]=\"[\n          '/',\n          this.rxBundleCacheService.bundleId,\n          'view',\n          recordDefinitionsByName[searchResult.recordDefinitionName].view\n        ]\"\n        [queryParams]=\"{ $0$: searchResult.recordInstanceId }\"\n        >{{ searchResult.recordInstanceDisplayId }}</a\n      ></span\n    >\n  </div>\n  <div>\n    <span>{{ searchResult.title }}</span>\n  </div>\n\n  <adapt-highlight class=\"search-result\" [result]=\"searchResult.wordsAroundHit\" [term]=\"searchValue\"></adapt-highlight>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:flex;flex-direction:column;padding:15px;height:100%;overflow:auto}.table-wrapper{flex-grow:1}:host ::ng-deep adapt-table .at-cell mark{padding:0}:host ::ng-deep adapt-table .ui-table-scrollable-wrapper{border-right:none}:host ::ng-deep adapt-table .at-infinite-scrolling-loader{border-bottom:none;border-top:none}:host ::ng-deep adapt-table .at-header-cell,:host ::ng-deep adapt-table .at-cell{border-bottom:none}.search-result{white-space:pre-wrap;word-wrap:break-word}adapt-rx-search[name=searchString]{max-width:400px;min-width:auto}\n"], components: [{ type: i1$1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1$1.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }, { type: i6.AdaptTableComponent, selector: "adapt-table", inputs: ["sortable", "filterable", "triggerableFilters", "explicitSearchBtn", "enableReorderableRows", "suppressTooltip", "toolbarConfig", "dataColumnsColsTemplate", "dataColumnsHeaderTemplate", "dataColumnsDataCellsTemplate", "headerGroupsTemplate", "alwaysShowHeaderTooltip", "alwaysShowCellTooltip", "expandedCellClass", "expandedGroupsKeys", "nestedGroupPadding", "expandindCellInitialPadding", "groupValueDataCellTemplate", "tooltipInitialDelayMs", "tooltipClass", "rowsCustomClass", "paginatorAlign", "hasEmptyState", "enableInfiniteScrolling", "updateFirstColumnWidth", "busyConfig", "defaultFiltersMatchMode", "wrapCellText", "minBufferPx", "maxBufferPx", "testID", "headerSelectionMode", "disabledSelectedRowsCount", "disabledNotSelectedRowsCount", "disabledSelectedFilteredRowsCount", "disabledNotSelectedFilteredRowsCount", "selectedFilteredRowsCount", "totalRecordsInGroup", "disableRowSelection", "nestingStructureData", "nestingKey", "enableRowEditing", "autoScrollToTop", "paginationTexts", "toolbarTexts", "tableTexts", "filtersTexts", "headerCellMenuTexts", "texts", "loadingMore", "mergeColumns", "disabledRowSelectionResolver", "allowColumnReorderingResolver", "disableRowExpandingResolver", "rowAriaDataResolver", "tableWidthConfig", "expandedRowTemplate", "isRefreshingRowData", "value", "bordered", "paginator", "striped", "loading"], outputs: ["onLazyLoad", "rowDataRefresh", "savedRowEditing", "canceledRowEditing", "groupSelection", "allGroupedRowsSelection", "groupExpansion", "columnsVisibilityChange", "rowDragStart", "rowDragRelease", "rowDragEnd", "rowDragDrop", "export", "toolbarPopupAnimationDone"] }, { type: i1$1.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1$1.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1$1.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["routerLink", "target", "queryParams", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "relativeTo"] }], pipes: { "translate": i4$1.TranslatePipe, "rxDefinitionNamePipe": i1$2.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search',
                    templateUrl: './search.component.html',
                    styleUrls: ['./search.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$4.ActivatedRoute }, { type: i1$4.Router }, { type: i1$2.RxDataPageFactoryService }, { type: i3$1.RxShellService }, { type: i1$2.RxPageTitleService }, { type: i4$1.TranslateService }, { type: i1$2.RxBundleCacheService }]; }, propDecorators: { colIdCellTemplate: [{
                type: ViewChild,
                args: ['colIdCellTemplate', { static: true }]
            }], cellTemplate: [{
                type: ViewChild,
                args: ['cellTemplate', { static: true }]
            }] } });

class RxSearchModule {
}
RxSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, declarations: [RxSearchComponent], imports: [AdaptButtonModule,
        AdaptDropdownModule,
        AdaptHighlightModule,
        AdaptRxCheckboxModule,
        AdaptRxSearchModule, i6.AdaptTableModule, CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule,
        RxDefinitionModule] });
RxSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, imports: [[
            AdaptButtonModule,
            AdaptDropdownModule,
            AdaptHighlightModule,
            AdaptRxCheckboxModule,
            AdaptRxSearchModule,
            AdaptTableModule.forRoot(),
            CommonModule,
            FormsModule,
            TranslateModule,
            RouterModule,
            RxDefinitionModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxSearchComponent],
                    imports: [
                        AdaptButtonModule,
                        AdaptDropdownModule,
                        AdaptHighlightModule,
                        AdaptRxCheckboxModule,
                        AdaptRxSearchModule,
                        AdaptTableModule.forRoot(),
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        RouterModule,
                        RxDefinitionModule
                    ]
                }]
        }] });

const RX_USER_PREFERENCES = {
    supportedLocales: [
        {
            id: 'en',
            name: 'English'
        },
        {
            id: 'fr',
            name: 'français'
        },
        {
            id: 'de',
            name: 'Deutsch'
        },
        {
            id: 'it',
            name: 'italiano'
        },
        {
            id: 'zh-cn',
            name: '中文'
        },
        {
            id: 'ko',
            name: '한국어'
        },
        {
            id: 'pt-br',
            name: 'português'
        },
        {
            id: 'ru',
            name: 'русский'
        },
        {
            id: 'ja',
            name: '日本語'
        },
        {
            id: 'es',
            name: 'Español'
        },
        {
            id: 'nl',
            name: 'Nederlands'
        },
        {
            id: 'sv',
            name: 'svenska'
        },
        {
            id: 'da',
            name: 'dansk'
        },
        {
            id: 'no',
            name: 'norsk'
        }
    ],
    userPreference: {
        recordDefinitionName: 'User Preference',
        fieldIds: {
            loginName: 70061,
            name: 70062,
            value: 70063
        }
    },
    preferenceNames: {
        locale: 'Preferred-User-Locale'
    }
};

class RxUserPreferencesComponent {
    constructor(activeModalRef, rxCurrentUserService, rxRecordInstanceDataPageService, rxRecordInstanceService, translateService) {
        this.activeModalRef = activeModalRef;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.translateService = translateService;
        this.defaultSelection = this.translateService.instant('com.bmc.arsys.rx.client.common.select.label');
        this.selectedLocale = [];
        this.supportedLocales = RX_USER_PREFERENCES.supportedLocales;
        this.optionFormatter = (option) => {
            return get(option, 'name', this.defaultSelection);
        };
    }
    ngOnInit() {
        this.init();
    }
    init() {
        this.preferredLocale = this.rxCurrentUserService.getPreferredLocale();
        this.isAbleToChangeLocale = !this.preferredLocale;
        if (this.isAbleToChangeLocale) {
            this.queryInProgress = true;
            this.rxRecordInstanceDataPageService
                .post({
                params: {
                    recorddefinition: RX_USER_PREFERENCES.userPreference.recordDefinitionName,
                    queryExpression: "('" +
                        RX_USER_PREFERENCES.userPreference.fieldIds.name +
                        '\' = "' +
                        RX_USER_PREFERENCES.preferenceNames.locale +
                        '" AND \'' +
                        RX_USER_PREFERENCES.userPreference.fieldIds.loginName +
                        '\' = "' +
                        this.rxCurrentUserService.getName() +
                        '")',
                    propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id]
                }
            })
                .pipe(switchMap((dataPageResult) => {
                if (dataPageResult.totalSize) {
                    return this.rxRecordInstanceService.get(RX_USER_PREFERENCES.userPreference.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id]);
                }
                else {
                    return this.rxRecordInstanceService.getNew(RX_USER_PREFERENCES.userPreference.recordDefinitionName);
                }
            }))
                .subscribe((recordInstance) => {
                this.recordInstance = recordInstance;
                const selectedLocaleId = this.recordInstance.getFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value);
                this.selectedLocale = [this.supportedLocales.find((locale) => locale.id === selectedLocaleId)];
                this.queryInProgress = false;
            });
        }
        else {
            this.selectedLocale = [this.supportedLocales.find((locale) => locale.id === this.preferredLocale)];
        }
    }
    applyUserPreferences() {
        let save$;
        this.queryInProgress = true;
        const selectedLocaleId = get(this.selectedLocale, '[0].id', '');
        this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.value, selectedLocaleId);
        if (this.recordInstance.id) {
            save$ = this.rxRecordInstanceService.save(this.recordInstance);
        }
        else {
            this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.name, RX_USER_PREFERENCES.preferenceNames.locale);
            this.recordInstance.setFieldValue(RX_USER_PREFERENCES.userPreference.fieldIds.loginName, this.rxCurrentUserService.getName());
            save$ = this.rxRecordInstanceService.create(this.recordInstance);
        }
        save$.subscribe(() => {
            this.queryInProgress = false;
            this.activeModalRef.close();
        });
    }
    cancel() {
        this.activeModalRef.dismiss();
    }
}
RxUserPreferencesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i1$2.RxCurrentUserService }, { token: i3.RxRecordInstanceDataPageService }, { token: i3.RxRecordInstanceService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxUserPreferencesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserPreferencesComponent, selector: "rx-user-preferences", ngImport: i0, template: "<rx-line-loader\n  *ngIf=\"queryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<div [hidden]=\"queryInProgress\" class=\"modal-body\">\n  <form name=\"userPreferencesForm\" novalidate #userPreferencesForm=\"ngForm\">\n    <adapt-rx-select\n      [disabled]=\"!isAbleToChangeLocale || queryInProgress\"\n      [emptyOption]=\"true\"\n      [name]=\"'userPreference'\"\n      [(ngModel)]=\"selectedLocale\"\n      [label]=\"'com.bmc.arsys.rx.client.shell.user-preferences-dialog.language.label' | translate\"\n      [optionFormatter]=\"optionFormatter\"\n      [options]=\"supportedLocales\"\n      rx-id=\"preferred-language\"\n    >\n    </adapt-rx-select>\n    <p class=\"text-danger align-start\" *ngIf=\"!isAbleToChangeLocale\">\n      <span class=\"alert-content\">\n        {{ 'com.bmc.arsys.rx.client.shell.user-preferences-dialog.validation.error.message' | translate }}\n      </span>\n    </p>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"!userPreferencesForm.dirty\"\n    (click)=\"applyUserPreferences()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-preferences',
                    templateUrl: './user-preferences.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i1$2.RxCurrentUserService }, { type: i3.RxRecordInstanceDataPageService }, { type: i3.RxRecordInstanceService }, { type: i4$1.TranslateService }]; } });

const RX_GAINSIGHT = {
    deploymentTypes: [
        { id: 0, name: AdaptRadarHostingType.SaaS },
        { id: 10, name: AdaptRadarHostingType.OnPrem }
    ],
    environmentTypes: ['Production', 'QA', 'Staging', 'Integration'],
    gainsightUrl: 'https://web-sdk.aptrinsic.com/api/aptrinsic.js',
    bmcGainsightUrl: 'https://documents.bmc.com/products/docs/gainsight/main/aptrinsic.js',
    administratorRole: 'Administrator',
    businessAnalystRole: 'Business Analyst',
    regularUserRole: 'Regular User',
    defaultBundle: 'Innovation Suite',
    gainsightConfigurationsApi: '/api/rx/application/telemetry/configuration',
    gainsightUserPreferencesApi: '/api/rx/application/telemetry/user/preferences',
    gainsightSettings: {
        recordInstanceId: 'AGGADG1AAT7X5ARM7T3LRM7T3LA5FG',
        recordDefinitionName: 'com.bmc.arsys.rx.settings:Gainsight Configurations',
        fieldIds: {
            enableGainsight: 58102,
            useAdaptRadar: 58103,
            loadGainsightFromBmcIt: 58104,
            deploymentType: 58105,
            environmentType: 58106,
            id: RX_RECORD_DEFINITION.coreFieldIds.id
        }
    }
};

class RxGainsightConfiguratorService {
    constructor(rxGlobalCacheService, rxRecordInstanceService, adaptRadarService, adaptRadarGainsightProvider, rxCurrentUserService, rxFeatureService, rxLogService, httpClient, rxRecordInstanceUpdateService, rxIframeUtilsService) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.adaptRadarService = adaptRadarService;
        this.adaptRadarGainsightProvider = adaptRadarGainsightProvider;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxFeatureService = rxFeatureService;
        this.rxLogService = rxLogService;
        this.httpClient = httpClient;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxIframeUtilsService = rxIframeUtilsService;
        this.bundleDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor().pipe(take(1), shareReplay(1));
        this.gainsightConfiguration$ = this.bundleDescriptor$.pipe(switchMap((bundleDescriptor) => this.getGainsightConfiguration(bundleDescriptor.id)), shareReplay(1));
        this.globalContextData$ = combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(map(([bundleDescriptor, gainsightConfiguration]) => bundleDescriptor.id === RX_APPLICATION.innovationStudioBundleId
            ? {
                productArea: {
                    name: AdaptRadarProductAreaName.Platform,
                    version: bundleDescriptor.displayVersion,
                    hosting: gainsightConfiguration.settings.deploymentType
                }
            }
            : null), shareReplay(1));
        this.gainsightInitConfiguration$ = iif(() => this.rxFeatureService.isFeatureEnabled('DRD21-11744'), combineLatest([this.bundleDescriptor$, this.gainsightConfiguration$]).pipe(tap(([bundleDescriptor, gainsightConfiguration]) => {
            const company = gainsightConfiguration.company;
            const companyId = gainsightConfiguration.companyId;
            const user = this.rxCurrentUserService.get();
            const hashedUserId = gainsightConfiguration.hashedUserId;
            let isGainsightEnabled = gainsightConfiguration.settings.enableGainsight;
            this.useAdaptRadar = gainsightConfiguration.settings.useAdaptRadar;
            this.productTag = gainsightConfiguration.productTag;
            if (isGainsightEnabled && !gainsightConfiguration.productTag) {
                this.rxLogService.debug(`Gainsight product tag is missing for bundle ${bundleDescriptor.id}.`);
                isGainsightEnabled = false;
            }
            if (isGainsightEnabled) {
                if (this.useAdaptRadar) {
                    this.adaptRadarService.startDataCollecting({
                        providers: [
                            {
                                name: AdaptRadarSupportedProviders.Gainsight,
                                id: this.productTag,
                                oneTimeActions: [
                                    {
                                        name: AdaptRadarGainsightIdentifyActionName.UserIdentify,
                                        data: {
                                            userData: {
                                                id: hashedUserId,
                                                role: user.isAdministrator
                                                    ? RX_GAINSIGHT.administratorRole
                                                    : user.isBusinessAnalyst
                                                        ? RX_GAINSIGHT.businessAnalystRole
                                                        : RX_GAINSIGHT.regularUserRole
                                            },
                                            accountData: {
                                                id: companyId || company,
                                                name: company
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                }
                else {
                    const gainsightUrl = gainsightConfiguration.settings.loadGainsightFromBmcIt
                        ? RX_GAINSIGHT.bmcGainsightUrl
                        : RX_GAINSIGHT.gainsightUrl;
                    this.loadGainsightScript(user, gainsightUrl, hashedUserId, company, companyId);
                }
            }
        }), switchMap(([bundleDescriptor, gainsightConfiguration]) => gainsightConfiguration.settings.enableGainsight && gainsightConfiguration.settings.useAdaptRadar
            ? this.adaptRadarGainsightProvider.init$
            : of(false)), tap((isInitialized) => {
            if (isInitialized) {
                this.isGainsightLoaded = true;
                this.setGlobalContext(this.updatedContext);
            }
        }), switchMap(() => this.gainsightConfiguration$), shareReplay(1)), of(null));
    }
    updateGlobalContext(globalContext, viewDefinitionName) {
        this.gainsightConfiguration$.pipe(take(1)).subscribe((gainsightConfiguration) => {
            var _a, _b, _c;
            if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
                if (viewDefinitionName) {
                    // For runtime views clear all the previous global context before update
                    this.removeGlobalContext(keys(this.updatedContext));
                    globalContext =
                        (_b = (_a = find(gainsightConfiguration.viewMapping, { viewName: viewDefinitionName })) === null || _a === void 0 ? void 0 : _a.globalContext) !== null && _b !== void 0 ? _b : (_c = find(gainsightConfiguration.viewMapping, { default: true })) === null || _c === void 0 ? void 0 : _c.globalContext;
                    globalContext = globalContext && JSON.parse(globalContext);
                    this.updatedContext = globalContext;
                }
                this.setGlobalContext(globalContext);
            }
        });
    }
    setGlobalContext(globalContext) {
        this.globalContextData$.pipe(take(1)).subscribe((globalContextData) => {
            if (this.useAdaptRadar && this.isGainsightLoaded) {
                this.adaptRadarGainsightProvider.setGlobalContext(merge$1(globalContextData, globalContext));
            }
            else if (!this.useAdaptRadar && this.isGainsightLoaded) {
                aptrinsic('set', 'globalContext', merge$1(globalContextData, globalContext));
            }
            else {
                this.updatedContext = globalContext;
            }
        });
    }
    removeGlobalContext(contextList) {
        if (this.isGainsightLoaded) {
            // Clear all global context if list is not specified
            contextList !== null && contextList !== void 0 ? contextList : (contextList = keys(this.updatedContext));
            this.globalContextData$.pipe(take(1)).subscribe((globalContextData) => {
                if (globalContextData) {
                    contextList.forEach((context) => delete globalContextData[context]);
                }
                if (this.useAdaptRadar) {
                    this.adaptRadarGainsightProvider.removeGlobalContext(contextList);
                }
                else {
                    aptrinsic('remove', 'globalContext', contextList);
                }
            });
        }
    }
    loadGainsightScript(user, gainsightUrl, hashedUserId, company, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const param = this.productTag;
            const script = document.getElementsByTagName('script')[0];
            const node = document.createElement('script');
            window['aptrinsic'] =
                window['aptrinsic'] ||
                    function () {
                        (window['aptrinsic'].q = window['aptrinsic'].q || []).push(arguments);
                    };
            window['aptrinsic'].p = param;
            // iframeModeEnabled is set to "false" when embedded in an iFrame, as per Gainsight documentation.
            window['aptrinsic'].c = { iframeModeEnabled: !this.rxIframeUtilsService.isRunningInIframe() };
            node.async = true;
            node.src = gainsightUrl + '?a=' + param;
            node.onload = () => {
                const functionalRoles = user.functionalRoles.reduce((functionalRole, name) => {
                    functionalRole[name] = true;
                    return functionalRole;
                }, {});
                this.isGainsightLoaded = true;
                aptrinsic('identify', {
                    id: hashedUserId,
                    globalId: hashedUserId,
                    role: user.isAdministrator
                        ? RX_GAINSIGHT.administratorRole
                        : user.isBusinessAnalyst
                            ? RX_GAINSIGHT.businessAnalystRole
                            : RX_GAINSIGHT.regularUserRole,
                    functionalRoles
                }, {
                    id: companyId || company,
                    name: company
                });
                this.setGlobalContext(this.updatedContext);
            };
            node.onerror = (error) => {
                this.rxLogService.error(error);
            };
            script.parentNode.insertBefore(node, script);
        });
    }
    getGainsightConfiguration(bundleId) {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            return this.httpClient.get(RX_GAINSIGHT.gainsightConfigurationsApi + '/' + bundleId);
        }
        else {
            return of(null);
        }
    }
    saveGainsightConfiguration(gainsightSettings) {
        return this.rxRecordInstanceService
            .get(RX_GAINSIGHT.gainsightSettings.recordDefinitionName, RX_GAINSIGHT.gainsightSettings.recordInstanceId)
            .pipe(switchMap((recordInstance) => {
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.enableGainsight, gainsightSettings.enableGainsight);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.useAdaptRadar, gainsightSettings.useAdaptRadar);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.loadGainsightFromBmcIt, gainsightSettings.loadGainsightFromBmcIt);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.deploymentType, gainsightSettings.deploymentType);
            recordInstance.setFieldValue(RX_GAINSIGHT.gainsightSettings.fieldIds.environmentType, gainsightSettings.environmentType);
            return this.rxRecordInstanceUpdateService.execute(recordInstance);
        }));
    }
}
RxGainsightConfiguratorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, deps: [{ token: i1$2.RxGlobalCacheService }, { token: i3.RxRecordInstanceService }, { token: i3$3.AdaptRadarService }, { token: i3$3.AdaptRadarGainsightProvider }, { token: i1$2.RxCurrentUserService }, { token: i1$2.RxFeatureService }, { token: i1$2.RxLogService }, { token: i4$4.HttpClient }, { token: i3.RxRecordInstanceUpdateService }, { token: i1$3.RxIframeUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGainsightConfiguratorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightConfiguratorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxGlobalCacheService }, { type: i3.RxRecordInstanceService }, { type: i3$3.AdaptRadarService }, { type: i3$3.AdaptRadarGainsightProvider }, { type: i1$2.RxCurrentUserService }, { type: i1$2.RxFeatureService }, { type: i1$2.RxLogService }, { type: i4$4.HttpClient }, { type: i3.RxRecordInstanceUpdateService }, { type: i1$3.RxIframeUtilsService }]; } });

const RX_USER_MESSAGE = {
    title: 'com.bmc.arsys.rx.client.common.messages.label',
    showAll: 'com.bmc.arsys.rx.client.shell.notification.action.viewAll',
    dismissAll: 'com.bmc.arsys.rx.client.shell.notification.action.clearAll',
    noActiveMessage: 'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label',
    dismissMessage: 'com.bmc.arsys.rx.client.shell.notification.dismiss',
    loadMore: 'com.bmc.arsys.rx.client.shell.notification.action.loadMore',
    fetchMessageFrequency: 60000,
    messageTypes: {
        active: 'active',
        dismissed: 'dismissed'
    },
    definitions: {
        userMessage: {
            definitionName: 'UserMessage',
            dataPageType: 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery',
            updateStateOfAllUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfAllUserMessagesCommand',
            updateStateOfUserMessagesCommand: 'com.bmc.arsys.rx.application.usermessage.command.UpdateStateOfUserMessagesCommand',
            fields: {
                subject: '20000',
                body: '20001',
                recipient: '20002'
            },
            status: {
                unread: '0',
                read: '1',
                dismissed: '2'
            }
        }
    }
};

const userMessageDataPageQuery = 'com.bmc.arsys.rx.application.usermessage.datapage.UserMessageDataPageQuery';
class RxUserMessageDataPageService extends DataPage {
    constructor(injector) {
        super(injector, userMessageDataPageQuery);
        this.injector = injector;
    }
}
RxUserMessageDataPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserMessageDataPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageDataPageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

class RxUserMessageService {
    constructor(rxCommandFactoryService, rxCurrentUserService, rxUserMessageDataPageService, rxViewDefinitionCacheService, rxLogService, rxAngularApplicationService, rxGlobalCacheService, ngZone) {
        this.rxCommandFactoryService = rxCommandFactoryService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxUserMessageDataPageService = rxUserMessageDataPageService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
        this.rxLogService = rxLogService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.ngZone = ngZone;
        this.subscription = new Subscription();
        this.cancelMessagePolling$ = new Subject();
        this.messageFetchedSubject = new Subject();
        this.messageCountSubject = new Subject();
        this.messageFetched$ = this.messageFetchedSubject.asObservable();
        this.messageCount$ = this.messageCountSubject.asObservable();
        this.activeMessagesFilterExpression = `'${RX_RECORD_DEFINITION.coreFieldIds.status}'!=${RX_USER_MESSAGE.definitions.userMessage.status.dismissed}`;
        this.dismissedMessagesFilterExpression = `'${RX_RECORD_DEFINITION.coreFieldIds.status}'=${RX_USER_MESSAGE.definitions.userMessage.status.dismissed}`;
        this.userMessageModel = {
            userMessageDef: RX_USER_MESSAGE.definitions.userMessage,
            pageSize: 30,
            messages: {
                active: {
                    type: RX_USER_MESSAGE.messageTypes.active,
                    count: 0,
                    list: [],
                    queryExpr: this.activeMessagesFilterExpression,
                    loadingInProgress: false
                },
                dismissed: {
                    type: RX_USER_MESSAGE.messageTypes.dismissed,
                    count: 0,
                    list: [],
                    queryExpr: this.dismissedMessagesFilterExpression,
                    loadingInProgress: false
                }
            }
        };
        this.bodyFieldId = this.userMessageModel.userMessageDef.fields.body;
    }
    convertLineBreaks(message) {
        const bodyFieldValue = message[this.bodyFieldId];
        message[this.bodyFieldId] = (bodyFieldValue && bodyFieldValue.replace(/\n/g, '<br>')) || '';
    }
    updateDsmApplicationViewUrls(dataPage) {
        if (dataPage.data.length) {
            const messages = dataPage.data.map((message) => {
                this.convertLineBreaks(message);
                const body = message[this.bodyFieldId];
                const hasHtmlAnchors = /\<\/a/.test(body);
                if (hasHtmlAnchors) {
                    const container = document.createElement('div');
                    container.innerHTML = body;
                    const link = container.querySelector('a');
                    const isViewLink = /\/view\/|\/iview\//.test(link.href);
                    if (isViewLink) {
                        const bundleIdMatch = window.location.hash.match(/#\/([a-zA-Z0-9-\.]*)/);
                        const bundleId = bundleIdMatch && bundleIdMatch[1];
                        return this.rxAngularApplicationService.isAngularJsApplication(bundleId).pipe(switchMap((isAngularJsApplication) => {
                            if (!isAngularJsApplication) {
                                const queryParams = [];
                                let urlWithoutParams = link.href.replace(/(?:[?&]param=)([^&]*)/g, (match, paramValue) => {
                                    queryParams.push(paramValue);
                                    return '';
                                });
                                urlWithoutParams = urlWithoutParams.replace('innovationsuite', 'helix');
                                if (queryParams.length) {
                                    const viewDefinitionName = decodeURI(urlWithoutParams.split('/').pop());
                                    return this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(map((viewDefinition) => {
                                        const newQueryParams = [];
                                        forEach(viewDefinition.inputParams, (inputParam, index) => {
                                            newQueryParams.push(`${inputParam.name}=${queryParams[index]}`);
                                        });
                                        link.href = [urlWithoutParams, newQueryParams.join('&')].join('?');
                                        message[this.bodyFieldId] = container.innerHTML;
                                        return message;
                                    }), catchError((err) => {
                                        this.rxLogService.error(err);
                                        return of(message);
                                    }));
                                }
                                else {
                                    link.href = urlWithoutParams;
                                    message[this.bodyFieldId] = container.innerHTML;
                                    return of(message);
                                }
                            }
                            else {
                                return of(message);
                            }
                        }));
                    }
                }
                return of(message);
            });
            return forkJoin(messages).pipe(map((convertedMessages) => ({
                messages: convertedMessages,
                totalSize: dataPage.totalSize
            })));
        }
        else {
            return of({
                messages: [],
                totalSize: dataPage.totalSize
            });
        }
    }
    cancelMessagePolling() {
        this.cancelMessagePolling$.next();
    }
    launchMessagePolling() {
        this.cancelMessagePolling();
        this.ngZone.runOutsideAngular(() => {
            this.subscription.add(timer(0, RX_USER_MESSAGE.fetchMessageFrequency)
                .pipe(takeUntil(this.cancelMessagePolling$), switchMap((_) => this.getMessages(RX_USER_MESSAGE.messageTypes.active, false, true)))
                .subscribe());
        });
    }
    getMessages(type = RX_USER_MESSAGE.messageTypes.active, getMore = false, suppressTokenRefresh = false) {
        const params = {
            pageSize: this.userMessageModel.pageSize,
            startIndex: 0,
            sortBy: -RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
            queryExpression: '',
            propertySelection: [
                RX_RECORD_DEFINITION.coreFieldIds.modifiedDate,
                RX_RECORD_DEFINITION.coreFieldIds.id,
                this.userMessageModel.userMessageDef.fields.body,
                this.userMessageModel.userMessageDef.fields.subject
            ].join(',')
        };
        this.userMessageModel.messages[type].loadingInProgress =
            getMore || this.userMessageModel.messages[type].list.length === 0;
        set(params, this.userMessageModel.userMessageDef.fields.recipient, this.rxCurrentUserService.get().loginName);
        params.queryExpression = this.userMessageModel.messages[type].queryExpr;
        params.startIndex = getMore ? this.userMessageModel.messages[type].list.length : 0;
        const headers = Object.assign({ 'default-bundle-scope': RX_APPLICATION.innovationStudioBundleId }, (suppressTokenRefresh ? { 'Suppress-Token-Refresh': 'true' } : {}));
        return this.rxUserMessageDataPageService
            .get({
            params,
            headers
        })
            .pipe(switchMap(this.updateDsmApplicationViewUrls.bind(this)), tap((rxMessages) => {
            this.ngZone.run(() => {
                if (rxMessages.messages.length) {
                    if (getMore) {
                        this.userMessageModel.messages[type].list = this.userMessageModel.messages[type].list.concat(rxMessages.messages);
                    }
                    else {
                        this.userMessageModel.messages[type].count = rxMessages.totalSize;
                        this.userMessageModel.messages[type].list = rxMessages.messages;
                        if (type === RX_USER_MESSAGE.messageTypes.active) {
                            this.messageCountSubject.next(rxMessages.totalSize);
                        }
                    }
                }
                else if (!getMore && type === RX_USER_MESSAGE.messageTypes.active) {
                    this.messageCountSubject.next(this.userMessageModel.messages.active.count);
                }
                this.messageFetchedSubject.next();
            });
        }));
    }
    handleSuccessfulDismiss(messageDismissed) {
        const shellNotifications = this.userMessageModel.messages;
        if (messageDismissed) {
            remove(shellNotifications.active.list, messageDismissed);
            shellNotifications.dismissed.list.push(messageDismissed);
            shellNotifications.active.count--;
            shellNotifications.dismissed.count++;
        }
        else {
            shellNotifications.active.list = [];
            shellNotifications.active.count = 0;
        }
        this.messageCountSubject.next(shellNotifications.active.count);
        if (shellNotifications.active.list.length === 0) {
            // avoid making backend call to get new notification on each dismiss
            this.launchMessagePolling();
        }
    }
    dismissNotification(message) {
        if (message) {
            const inputParameter = {};
            inputParameter[message[RX_RECORD_DEFINITION.coreFieldIds.id]] =
                RX_USER_MESSAGE.definitions.userMessage.status.dismissed;
            this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfUserMessagesCommand);
            this.subscription.add(this.userMessagesCommand
                .execute({
                userMessageStateById: inputParameter
            })
                .subscribe(() => this.handleSuccessfulDismiss(message)));
        }
        else {
            this.userMessagesCommand = this.rxCommandFactoryService.forResourceType(RX_USER_MESSAGE.definitions.userMessage.updateStateOfAllUserMessagesCommand);
            this.subscription.add(this.userMessagesCommand.execute().subscribe(() => this.handleSuccessfulDismiss()));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.cancelMessagePolling();
    }
}
RxUserMessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService, deps: [{ token: i1$2.RxCommandFactoryService }, { token: i1$2.RxCurrentUserService }, { token: RxUserMessageDataPageService }, { token: i3$1.RxViewDefinitionCacheService }, { token: i1$2.RxLogService }, { token: i1$2.RxAngularApplicationService }, { token: i1$2.RxGlobalCacheService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
RxUserMessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.RxCommandFactoryService }, { type: i1$2.RxCurrentUserService }, { type: RxUserMessageDataPageService }, { type: i3$1.RxViewDefinitionCacheService }, { type: i1$2.RxLogService }, { type: i1$2.RxAngularApplicationService }, { type: i1$2.RxGlobalCacheService }, { type: i0.NgZone }]; } });

class ShellBase {
    constructor(injector) {
        this.injector = injector;
        this.isShellInitialized = false;
        this.currentMenuItemId = null;
        this.translateService = this.injector.get(TranslateService);
        this.flattenedMenuItems = [];
        this.rxComponentCanDeactivateGuard = this.injector.get(RxComponentCanDeactivateGuard);
        this.rxUserMessageService = this.injector.get(RxUserMessageService);
        this.rxAuthService = this.injector.get(RxAuthService);
        this.rxCurrentUserService = this.injector.get(RxCurrentUserService);
        this.rxRecordInstanceService = this.injector.get(RxRecordInstanceService);
        this.rxGlobalCacheService = this.injector.get(RxGlobalCacheService);
        this.rxAngularApplicationService = this.injector.get(RxAngularApplicationService);
        this.rxSystemConfigurationService = this.injector.get(RxSystemConfigurationService);
        this.rxFeatureService = this.injector.get(RxFeatureService);
        this.adaptTranslateService = this.injector.get(AdaptTranslateService);
        this.rxGainsightConfiguratorService = this.injector.get(RxGainsightConfiguratorService);
        this.router = this.injector.get(Router);
        this.applicationDescriptor$ = this.rxGlobalCacheService.getApplicationBundleDescriptor();
        this.destroyed$ = new ReplaySubject(1);
        this.navigationEnd$ = this.router.events.pipe(filter$1((event) => event instanceof NavigationEnd), filter$1((event) => event.url !== '/unknown-application'));
        this.closeBannerSubject = new Subject();
        this.hasBanner$ = merge(this.rxGainsightConfiguratorService.gainsightInitConfiguration$.pipe(filter$1((gainsightConfiguration) => Boolean(gainsightConfiguration)), map((gainsightConfiguration) => gainsightConfiguration.displayBanner), defaultIfEmpty(false)), this.closeBannerSubject.pipe(map((value) => !value))).pipe(shareReplay(1));
        this.translations = this.adaptTranslateService.getCurrentLanguage();
        this.alertText = this.translations['adapt.agreement.navigation.alertText'];
        this.alertLinkText = this.translations['adapt.agreement.navigation.alertLinkText'];
        this.shellConfig$ = this.getShellConfig();
        this.applicationSwitcherActionItems$ = combineLatest([
            this.applicationDescriptor$,
            this.rxGlobalCacheService.getBundleDescriptors(),
            this.shellConfig$,
            this.rxSystemConfigurationService.queryConfiguration(['Helix-Portal-URL']).pipe(map((value) => get(value, '[0].value')), catchError(() => of(null)))
        ]).pipe(take(1), switchMap(([currentBundleDescriptor, bundleDescriptors, shellConfig, helixPortalUrl]) => {
            if (shellConfig.allowAppSwitching) {
                const applicationList = filter(bundleDescriptors, { isApplication: true, isLicensed: true });
                this.bundleDescriptors = bundleDescriptors;
                this.helixPortalUrl = helixPortalUrl;
                remove(applicationList, currentBundleDescriptor);
                remove(applicationList, { id: RX_APPLICATION.settingsBundleId });
                if (!this.rxCurrentUserService.isAdministrator()) {
                    remove(applicationList, { id: RX_APPLICATION.dataloadBundleId });
                }
                if (!this.rxCurrentUserService.isAdministrator() && !this.rxCurrentUserService.isBusinessAnalyst()) {
                    remove(applicationList, { id: RX_APPLICATION.innovationStudioBundleId });
                }
                remove(applicationList, { showInAppLauncher: false });
                const optedInApplications = applicationList.map((app) => this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(map((isAngularJsApplication) => ({
                    id: app.id,
                    friendlyName: app.localizedDisplayName || app.friendlyName,
                    isAngularJsApplication
                }))));
                return forkJoin(optedInApplications);
            }
            else {
                return of([]);
            }
        }), map((applicationList) => {
            if (includes(['Fixed', 'Floating', 'Bundled'], this.rxCurrentUserService.get().licenseType) &&
                this.helixPortalUrl) {
                applicationList.push({
                    friendlyName: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.bmc-helix-dashboard.label'),
                    url: `${this.helixPortalUrl}/dashboards`
                });
            }
            if (applicationList.length) {
                return {
                    name: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                    tooltip: this.translateService.instant('com.bmc.arsys.rx.client.shell.application-launcher.label'),
                    className: 'd-icon-tiles',
                    switcher: {
                        allItems: {
                            items: sortBy(applicationList
                                .filter((app) => app.id !== this.rxGlobalCacheService.applicationId)
                                .map((app) => {
                                return {
                                    name: app.friendlyName,
                                    action: this.launchApplication.bind(this, app.id, app.isAngularJsApplication, app.url)
                                };
                            }), (application) => lowerCase(application.name))
                        },
                        recentItems: {}
                    }
                };
            }
            else {
                return {};
            }
        }));
        this.showUserMessagesAction = {
            name: this.translateService.instant(RX_USER_MESSAGE.title),
            tooltip: this.translateService.instant(RX_USER_MESSAGE.title),
            count: 0,
            action: noop,
            className: 'd-icon-bell_o'
        };
        this.administrationSettingsAction = {
            name: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
            tooltip: this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label'),
            route: `/${this.rxGlobalCacheService.applicationId}/settings`,
            className: 'd-icon-gear'
        };
        this.brandingInfo$ = this.applicationDescriptor$.pipe(map((applicationDescriptor) => ({
            logoClass: 'logo-helix',
            productName: applicationDescriptor.localizedDisplayName || applicationDescriptor.friendlyName,
            hideMobileLogo: false,
            switcher: {
                filter: {
                    placeholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
                }
            }
        })));
        this.navigationEnd$.pipe(skip(1), takeUntil(this.destroyed$)).subscribe({
            next: () => {
                this.highlightMenuItem(this.getActiveNavigationMenuItem());
            },
            complete: () => {
                this.rxUserMessageService.cancelMessagePolling();
            }
        });
        // ADAPT dropdowns listen to the click events and close themselves when the event is fired.
        // When user clicks inside an iframe though, the event is not propagated to the main window and the
        // dropdowns remain open.
        // Here we simulate the click on the document of the main window to close the dropdowns.
        this.removeWindowBlurListener = injector.get(Renderer2).listen('window', 'blur', () => {
            document.body.click();
        });
    }
    ngOnInit() {
        this.showUserMessagesAction.popover = this.userMessagesPopover;
        this.rxUserMessageService.messageCount$.subscribe((messageCount) => {
            this.showUserMessagesAction.count = messageCount;
        });
        this.navigationMenuItems$ = this.getNavigationMenuItems().pipe(tap(() => {
            // We perform a setTimeout according to Adapt documentation.
            // Else on smaller screens the menus might be displayed horizontally
            // in the shell rather than vertically for smaller screens.
            // https://github.bmc.com/pages/bmc-ux/adapt-angular/#/components/navigation
            setTimeout(() => {
                this.adaptNavigation.checkForHamburger();
                this.isShellInitialized = true;
                const activeNavigationMenuItem = this.getActiveNavigationMenuItem();
                this.highlightMenuItem(activeNavigationMenuItem);
            });
        }));
        this.navigationActionItems$ = combineLatest([
            this.shellConfig$,
            this.getNavigationActionItems(),
            this.applicationSwitcherActionItems$
        ]).pipe(map(([shellConfig, navigationActionItems, applicationSwitcherActionItems]) => [
            ...navigationActionItems,
            this.showUserMessagesAction,
            ...(shellConfig.administrationSettingsState ? [this.administrationSettingsAction] : []),
            applicationSwitcherActionItems
        ]), takeUntil(this.destroyed$));
        const isGainsightFeatureEnabled = this.rxFeatureService.isFeatureEnabled('DRD21-11744');
        this.userProfileMenu$ = combineLatest([this.rxGainsightConfiguratorService.gainsightInitConfiguration$, this.getUserMenuItems()]).pipe(tap(([gainsightConfig, userMenuItems]) => {
            const analyticsMenuItem = find(userMenuItems, { id: 0 });
            if (analyticsMenuItem) {
                const shouldHideAnalyticsMenuItem = !isGainsightFeatureEnabled ||
                    !gainsightConfig.settings.enableGainsight ||
                    isEmpty(gainsightConfig.productTag);
                analyticsMenuItem.hide = shouldHideAnalyticsMenuItem;
            }
        }), map(([gainsightConfig, userMenuItems]) => {
            const currentUser = this.rxCurrentUserService.get();
            const userAvatarUrl = currentUser.personInstanceId
                ? this.rxRecordInstanceService.getAttachmentDownloadUrl(RX_USER.userProfileRecordDefinitionName, RX_USER.userProfilePictureFieldId, currentUser.personInstanceId)
                : '';
            return {
                desc: this.translateService.instant('com.bmc.arsys.rx.client.shell.user-profile.signedin.label'),
                userName: currentUser.fullName,
                image: userAvatarUrl,
                typeLong: true,
                inverted: false,
                signOut: {
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.sign-out.label'),
                    action: this.logout.bind(this)
                },
                menu: userMenuItems
            };
        }));
        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            var _a;
            switch (true) {
                case event instanceof NavigationStart: {
                    this.busySubscription = NEVER.subscribe();
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
    highlightMenuItem(menuItem) {
        if (menuItem) {
            this.currentMenuItemId = menuItem.id;
            this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
        }
        else {
            const lastMenuItem = this.adaptNavigation.searchTree(this.adaptNavigation.menuModel, this.currentMenuItemId);
            if (lastMenuItem) {
                lastMenuItem.active = false;
                if (lastMenuItem.parent) {
                    lastMenuItem.parent.active = false;
                }
            }
            this.currentMenuItemId = null;
            this.adaptNavigation.currentActiveId = null;
        }
    }
    logout() {
        let canDeactivate = this.rxComponentCanDeactivateGuard.canDeactivate();
        if (isBoolean(canDeactivate)) {
            canDeactivate = of(canDeactivate);
        }
        from(canDeactivate)
            .pipe(filter$1(Boolean), tap(() => {
            this.rxComponentCanDeactivateGuard.disable();
        }), switchMap(() => this.rxAuthService.logout()))
            .subscribe();
    }
    launchApplication(bundleId, isAngularJsApplication, portalUrl) {
        let url;
        if (portalUrl) {
            url = portalUrl;
        }
        else {
            const application = find(this.bundleDescriptors, { id: bundleId });
            if (application.hasCustomEntryPoint && application.id !== RX_APPLICATION.innovationStudioBundleId) {
                url = `/${bundleId}/index.html`;
            }
            else if (isAngularJsApplication) {
                url = `/innovationsuite/index.html#/${bundleId}`;
            }
            else {
                url = `/helix/index.html#/${bundleId}`;
            }
        }
        window.open(url);
    }
    closeBanner() {
        this.closeBannerSubject.next(true);
    }
    ngOnDestroy() {
        this.removeWindowBlurListener();
        this.rxUserMessageService.cancelMessagePolling();
        this.closeBannerSubject.complete();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
ShellBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
ShellBase.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ShellBase, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });

const RX_USER_AVAILABILITY = {
    ctmPeople: {
        recordDefinitionName: 'CTM:People',
        fieldIds: {
            loginName: 4,
            assignmentAvailability: 1000000346
        }
    }
};

class RxUserAvailabilityComponent {
    constructor(rxCurrentUserService, activeModalRef, rxRecordInstanceDataPageService, rxRecordInstanceService, rxRecordInstanceUpdateService, rxNotificationService, translateService) {
        this.rxCurrentUserService = rxCurrentUserService;
        this.activeModalRef = activeModalRef;
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxRecordInstanceUpdateService = rxRecordInstanceUpdateService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.isUserAvailableForAssignment = this.rxCurrentUserService.isAvailableForAssignment();
        this.isSaveInProgress = false;
    }
    updateAssignmentAvailability() {
        this.isSaveInProgress = true;
        this.rxRecordInstanceDataPageService
            .post({
            params: {
                recorddefinition: RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName,
                queryExpression: "('" +
                    RX_USER_AVAILABILITY.ctmPeople.fieldIds.loginName +
                    '\' = "' +
                    this.rxCurrentUserService.getName() +
                    '")',
                propertySelection: [RX_RECORD_DEFINITION.coreFieldIds.id]
            }
        })
            .pipe(switchMap((dataPageResult) => this.rxRecordInstanceService.get(RX_USER_AVAILABILITY.ctmPeople.recordDefinitionName, dataPageResult.data[0][RX_RECORD_DEFINITION.coreFieldIds.id])), tap((recordInstance) => recordInstance.setFieldValue(RX_USER_AVAILABILITY.ctmPeople.fieldIds.assignmentAvailability, this.isUserAvailableForAssignment ? '0' : '1')), switchMap((recordInstance) => this.rxRecordInstanceUpdateService.execute(recordInstance)), finalize(() => (this.isSaveInProgress = false)))
            .subscribe(() => {
            this.rxCurrentUserService.setAssignmentAvailability(this.isUserAvailableForAssignment);
            this.activeModalRef.close();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment-saved.message'));
        });
    }
    cancel() {
        this.activeModalRef.close();
    }
}
RxUserAvailabilityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityComponent, deps: [{ token: i1$2.RxCurrentUserService }, { token: i1$1.ActiveModalRef }, { token: i3.RxRecordInstanceDataPageService }, { token: i3.RxRecordInstanceService }, { token: i3.RxRecordInstanceUpdateService }, { token: i1$2.RxNotificationService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxUserAvailabilityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserAvailabilityComponent, selector: "rx-user-availability", ngImport: i0, template: "<div class=\"modal-body\">\n  <form name=\"userAvailabilityForm\" novalidate #userAvailabilityForm=\"ngForm\">\n    <adapt-rx-checkbox\n      class=\"d-block form-group\"\n      rx-id=\"user-availability\"\n      name=\"userAvailability\"\n      [(ngModel)]=\"isUserAvailableForAssignment\"\n      label=\"{{ 'com.bmc.arsys.rx.client.shell.my-availability-dialog.available-for-assignment.label' | translate }}\"\n    ></adapt-rx-checkbox>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    type=\"button\"\n    class=\"btn btn-primary btn-sm\"\n    [disabled]=\"this.isSaveInProgress || !userAvailabilityForm.dirty\"\n    (click)=\"updateAssignmentAvailability()\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n  <button type=\"button\" class=\"btn btn-secondary btn-sm\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1$1.AdaptRxCheckboxComponent, selector: "adapt-rx-checkbox", inputs: ["value", "checked", "indeterminate"], outputs: ["indeterminateChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-availability',
                    templateUrl: './user-availability.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxCurrentUserService }, { type: i1$1.ActiveModalRef }, { type: i3.RxRecordInstanceDataPageService }, { type: i3.RxRecordInstanceService }, { type: i3.RxRecordInstanceUpdateService }, { type: i1$2.RxNotificationService }, { type: i4$1.TranslateService }]; } });

class RxGainsightUserPreferencesService {
    constructor(httpClient, rxFeatureService) {
        this.httpClient = httpClient;
        this.rxFeatureService = rxFeatureService;
    }
    getGainsightUserPreferences() {
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            return this.httpClient.get(RX_GAINSIGHT.gainsightUserPreferencesApi);
        }
        else {
            return of(null);
        }
    }
    saveGainsightUserPreferences(gainsightUserPreferences) {
        return this.httpClient.put(RX_GAINSIGHT.gainsightUserPreferencesApi, gainsightUserPreferences);
    }
}
RxGainsightUserPreferencesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, deps: [{ token: i4$4.HttpClient }, { token: i1$2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Injectable });
RxGainsightUserPreferencesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxGainsightUserPreferencesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i4$4.HttpClient }, { type: i1$2.RxFeatureService }]; } });

class GainsightOptInComponent {
    constructor(activeModalRef, rxGainsightUserPreferencesService, translateService, rxNotificationService) {
        this.activeModalRef = activeModalRef;
        this.rxGainsightUserPreferencesService = rxGainsightUserPreferencesService;
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.isQueryInProgress = true;
        this.isSaveButtonDisabled = true;
        this.isSaveInProgressSubject = new BehaviorSubject(false);
        this.gainsightUserPreferences$ = this.rxGainsightUserPreferencesService.getGainsightUserPreferences().pipe(take(1), catchError(() => {
            this.cancel();
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-created.message'));
            return of(null);
        }), shareReplay(1));
        this.state$ = this.gainsightUserPreferences$.pipe(tap(() => {
            this.isQueryInProgress = false;
        }), filter$1((gainsightUserPreferences) => Boolean(gainsightUserPreferences)), map((gainsightUserPreferences) => ({
            accountPerformance: gainsightUserPreferences.trackUsage != false,
            accountMarketing: false
        })));
        this.vm$ = combineLatest([this.state$, this.isSaveInProgressSubject]).pipe(map(([state, isSaveInProgress]) => ({
            state,
            isSaveInProgress
        })));
    }
    handleStateChange(state) {
        this.isSaveButtonDisabled = false;
        this.accountPerformance = state.accountPerformance;
    }
    cancel() {
        this.activeModalRef.dismiss();
    }
    save() {
        this.isSaveInProgressSubject.next(true);
        this.gainsightUserPreferences$
            .pipe(take(1), map((gainsightUserPreferences) => (Object.assign(Object.assign({}, gainsightUserPreferences), { trackUsage: this.accountPerformance }))), switchMap((gainsightUserPreferences) => this.rxGainsightUserPreferencesService.saveGainsightUserPreferences(gainsightUserPreferences)), catchError((error) => {
            this.isSaveInProgressSubject.next(false);
            return throwError(error);
        }))
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-preferences-saved.success.message'));
            this.isSaveInProgressSubject.next(false);
            this.activeModalRef.close();
        }, () => this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.gainsight.user-profile-not-updated.message')));
    }
    ngOnDestroy() {
        this.isSaveInProgressSubject.complete();
    }
}
GainsightOptInComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightOptInComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: RxGainsightUserPreferencesService }, { token: i4$1.TranslateService }, { token: i1$2.RxNotificationService }], target: i0.ɵɵFactoryTarget.Component });
GainsightOptInComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GainsightOptInComponent, selector: "rx-gainsight-opt-in", ngImport: i0, template: "<rx-line-loader\n  *ngIf=\"isQueryInProgress\"\n  [loaderMessage]=\"'com.bmc.arsys.rx.client.common.loading-data' | translate\"\n></rx-line-loader>\n\n<ng-container class=\"p-0\" *ngIf=\"vm$ | async as vm\">\n  <div [hidden]=\"isQueryInProgress\" class=\"modal-body\">\n    <adapt-agreement-card\n      (stateChange)=\"handleStateChange($event)\"\n      [showShadow]=\"false\"\n      [showMarketingSection]=\"false\"\n      [state]=\"vm.state\"\n      rx-id=\"gainsight-agreement\"\n    >\n    </adapt-agreement-card>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button\n      type=\"button\"\n      class=\"btn btn-primary\"\n      (click)=\"save()\"\n      rx-id=\"save-button\"\n      [disabled]=\"isSaveButtonDisabled || vm.isSaveInProgress\"\n      [adaptInlineLoader]=\"vm.isSaveInProgress\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\" rx-id=\"cancel-button\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</ng-container>\n", components: [{ type: i1.RxLineLoaderComponent, selector: "rx-line-loader", inputs: ["loaderMessage"] }, { type: i1$1.AdaptAgreementCardComponent, selector: "adapt-agreement-card", inputs: ["multiProductUsage", "state", "showOrganizationSettings", "showMarketingSection", "showShadow"], outputs: ["stateChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.AdaptInlineStandaloneDirective, selector: "[adaptInlineLoader]", inputs: ["adaptInlineLoader", "activeText"] }], pipes: { "translate": i4$1.TranslatePipe, "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GainsightOptInComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-gainsight-opt-in',
                    templateUrl: './gainsight-opt-in.component.html',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: RxGainsightUserPreferencesService }, { type: i4$1.TranslateService }, { type: i1$2.RxNotificationService }]; } });

class RxUserMessageModalComponent {
    constructor(context, rxUserMessageService, translateService, renderer) {
        this.context = context;
        this.rxUserMessageService = rxUserMessageService;
        this.translateService = translateService;
        this.renderer = renderer;
        this.loadingInProgress = false;
        this.RX_USER_MESSAGE = RX_USER_MESSAGE;
        this.messages = {
            active: {
                type: '',
                count: 0,
                list: [],
                queryExpr: '',
                loadingInProgress: false
            },
            dismissed: {
                type: '',
                count: 0,
                list: [],
                queryExpr: '',
                loadingInProgress: false
            }
        };
    }
    ngOnInit() {
        this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.dismissed).subscribe(() => {
            this.messages = this.rxUserMessageService.userMessageModel.messages;
        });
        this.messageSubscription = this.rxUserMessageService.messageFetched$.subscribe(() => {
            const scrollPosition = this.scrollableNotifications
                ? this.renderer.selectRootElement(this.scrollableNotifications.nativeElement).scrollTop
                : null;
            if (!scrollPosition || this.loadingInProgress) {
                this.loadingInProgress = false;
                this.messages = this.rxUserMessageService.userMessageModel.messages;
            }
        });
    }
    getMoreMessages(messageType, event) {
        this.loadingInProgress = true;
        this.rxUserMessageService.getMessages(messageType, true).subscribe();
        event.stopPropagation();
    }
    dismissMessage(message) {
        this.rxUserMessageService.dismissNotification(message);
    }
    getContentTitleText(key, count) {
        let contentTitleText;
        switch (key) {
            case RX_USER_MESSAGE.messageTypes.active:
                contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.active.label';
                break;
            case RX_USER_MESSAGE.messageTypes.dismissed:
                contentTitleText = 'com.bmc.arsys.rx.client.shell.notification.dismissed.label';
                break;
        }
        return this.translateService.instant(contentTitleText, { count });
    }
    closeModal() {
        this.context.close(true);
    }
    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }
}
RxUserMessageModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageModalComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: RxUserMessageService }, { token: i4$1.TranslateService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxUserMessageModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessageModalComponent, selector: "rx-user-message-modal", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ RX_USER_MESSAGE.title | translate }}</h5>\n  <button class=\"close dp-close\" type=\"button\" (click)=\"context.close(false)\" rx-id=\"x-button\"></button>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"rx-container\">\n    <div class=\"active-messages\" *ngIf=\"messages.active.count || messages.dismissed.count\" #scrollableNotifications>\n      <div *ngFor=\"let messagesType of messages | keyvalue\">\n        <div class=\"content-title\">\n          {{ getContentTitleText(messagesType.key, messagesType.value.count) }}\n        </div>\n\n        <div *ngIf=\"!messagesType.value.count\" class=\"empty-holder\" [ngSwitch]=\"messagesType.key\">\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.active\">{{\n            'com.bmc.arsys.rx.client.shell.notification.active.noNotifications.label' | translate\n          }}</span>\n          <span *ngSwitchCase=\"RX_USER_MESSAGE.messageTypes.dismissed\">{{\n            'com.bmc.arsys.rx.client.shell.notification.dismissed.noNotifications.label' | translate\n          }}</span>\n        </div>\n\n        <div *ngIf=\"messagesType.value.count\">\n          <div\n            class=\"item\"\n            *ngFor=\"let message of messagesType.value.list\"\n            [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n          >\n            <div class=\"item-content-section\">\n              <div class=\"item-content-inner-section d-flex align-items-center flex-wrap\">\n                <div class=\"item-icon-section d-icon-bell_o\"></div>\n                <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n                <div class=\"item-dismiss-section ml-auto\" *ngIf=\"messagesType.key === RX_USER_MESSAGE.messageTypes.active\">\n                  <button\n                    *ngIf=\"!message.dismissInProgress\"\n                    [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n                    (click)=\"dismissMessage(message)\"\n                    class=\"close\"\n                    rx-id=\"x-button\"\n                    type=\"button\"\n                  ></button>\n\n                  <div class=\"item-dismiss-preloader\">\n                    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n              <div class=\"item-content-date\">\n                {{ message['6'] | date: 'medium' }}\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div\n          class=\"content-load-more\"\n          *ngIf=\"loadingInProgress || messagesType.value.count > messagesType.value.list.length\"\n        >\n          <button\n            type=\"button\"\n            *ngIf=\"!loadingInProgress\"\n            adapt-button\n            btn-type=\"tertiary\"\n            size=\"small\"\n            (click)=\"getMoreMessages(messagesType.key, $event)\"\n            rx-id=\"show-more\"\n          >\n            {{ RX_USER_MESSAGE.loadMore | translate }}\n          </button>\n\n          <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"empty-holder\" *ngIf=\"messages.active.count === 0 && messages.dismissed.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <adapt-button btn-type=\"primary\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </adapt-button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.modal-body{padding:0}.rx-container{width:100%!important;max-width:100%!important}.content-title{height:48px;line-height:48px;padding:0 18px;font-size:14px;font-weight:var(--font-weight-bold);border-left:none;border-right:none;border-top:1px solid #d6d7d8;border-bottom:1px solid #d6d7d8}.empty-holder{height:100px;line-height:100px;text-align:center}.modal-footer{display:flex;justify-content:flex-end;border-top:1px solid #d6d7d8;padding:10px 15px}.modal-footer adapt-button{margin-right:5px}\n", ":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4$1.TranslatePipe, "keyvalue": i4.KeyValuePipe, "date": i4.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessageModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-message-modal',
                    templateUrl: './user-message-modal.component.html',
                    styleUrls: ['./user-message-modal.component.scss', './user-messages.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: RxUserMessageService }, { type: i4$1.TranslateService }, { type: i0.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                type: ViewChild,
                args: ['scrollableNotifications', { static: true }]
            }] } });

class RxUserMessagesComponent {
    constructor(adaptModalService, rxUserMessageService, renderer) {
        this.adaptModalService = adaptModalService;
        this.rxUserMessageService = rxUserMessageService;
        this.renderer = renderer;
        this.subscription = new Subscription();
        this.loadingInProgress = false;
        this.activeMessage = {};
        this.RX_USER_MESSAGE = RX_USER_MESSAGE;
        this.activeMessage.count = 0;
        this.activeMessage.list = [];
    }
    ngOnInit() {
        this.subscription.add(this.rxUserMessageService.messageFetched$.subscribe(() => {
            const scrollPosition = this.scrollableNotifications
                ? this.renderer.selectRootElement(this.scrollableNotifications.nativeElement).scrollTop
                : null;
            if (!scrollPosition || this.loadingInProgress) {
                this.activeMessage = this.rxUserMessageService.userMessageModel.messages.active;
                this.loadingInProgress = false;
            }
        }));
        this.rxUserMessageService.launchMessagePolling();
    }
    getMoreMessages(event) {
        this.loadingInProgress = true;
        this.subscription.add(this.rxUserMessageService.getMessages(RX_USER_MESSAGE.messageTypes.active, true).subscribe());
        event.stopPropagation();
    }
    dismissMessage(message) {
        this.rxUserMessageService.dismissNotification(message);
    }
    viewAllMessages() {
        return this.adaptModalService
            .open({
            content: RxUserMessageModalComponent,
            data: {},
            size: 'lg'
        })
            .catch(noop);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxUserMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessagesComponent, deps: [{ token: i1$1.AdaptModalService }, { token: RxUserMessageService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
RxUserMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUserMessagesComponent, selector: "rx-user-messages", viewQueries: [{ propertyName: "scrollableNotifications", first: true, predicate: ["scrollableNotifications"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"rx-container\">\n  <div class=\"title-section default-border d-flex\">\n    <div class=\"title d-inline\">{{ RX_USER_MESSAGE.title | translate }}</div>\n    <div class=\"buttons-wrapper ml-auto\">\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        (click)=\"viewAllMessages()\"\n        rx-id=\"view-all-messages\"\n      >\n        {{ RX_USER_MESSAGE.showAll | translate }}\n      </button>\n\n      <button\n        type=\"button\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        *ngIf=\"activeMessage.count\"\n        (click)=\"dismissMessage()\"\n        rx-id=\"dismiss-message\"\n      >\n        {{ RX_USER_MESSAGE.dismissAll | translate }}\n      </button>\n    </div>\n  </div>\n\n  <div class=\"empty-holder\" *ngIf=\"activeMessage.count === 0\">\n    {{ RX_USER_MESSAGE.noActiveMessage | translate }}\n  </div>\n\n  <div class=\"active-messages\" *ngIf=\"activeMessage.count\" #scrollableNotifications>\n    <div\n      class=\"item default-border\"\n      *ngFor=\"let message of activeMessage.list\"\n      [ngClass]=\"{ 'item-dismiss': message.dismissInProgress }\"\n    >\n      <div class=\"item-content-section\">\n        <div class=\"item-content-inner-section d-flex align-items-center\">\n          <div class=\"item-icon-section d-icon-bell_o\"></div>\n          <div class=\"item-content-subject font-weight-bold\">{{ message['20000'] }}</div>\n          <div class=\"item-dismiss-section ml-auto\">\n            <button\n              *ngIf=\"!message.dismissInProgress\"\n              [attr.aria-label]=\"RX_USER_MESSAGE.dismissMessage | translate\"\n              (click)=\"dismissMessage(message)\"\n              class=\"close\"\n              rx-id=\"x-button\"\n              type=\"button\"\n            ></button>\n\n            <div class=\"item-dismiss-preloader\">\n              <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"message.dismissInProgress\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"item-content-text text-break\" [innerHTML]=\"message['20001']\"></div>\n        <div class=\"item-content-date\">\n          {{ message['6'] | date: 'medium' }}\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"content-load-more\" *ngIf=\"loadingInProgress || activeMessage.count > activeMessage.list.length\">\n    <button\n      type=\"button\"\n      *ngIf=\"!loadingInProgress\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      (click)=\"getMoreMessages($event)\"\n      rx-id=\"show-more\"\n    >\n      {{ RX_USER_MESSAGE.loadMore | translate }}\n    </button>\n\n    <div class=\"d-preloader d-icon-circle_25_o\" *ngIf=\"loadingInProgress\"></div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.default-border{border-bottom:1px solid #d6d7d8}::ng-deep .adapt-dd-menu-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container{max-width:100%!important;display:inline}::ng-deep .popover-mobile rx-user-messages .rx-container .item-content-section{padding:16px 0}::ng-deep .popover-mobile rx-user-messages .rx-container .title-section{padding:0}::ng-deep .popover-mobile rx-user-messages .rx-container .title{display:none!important}.rx-container{width:480px;max-width:100%}.title-section{height:48px;line-height:48px;padding:0 18px;border-top:none;border-left:none;border-right:none;font-size:15px}.buttons-wrapper{float:right}.empty-holder{height:100px;line-height:100px;text-align:center}.item{display:flex;display:-ms-flexbox;border-top:1px solid #d6d7d8;border-left:none;border-right:none}.item:first-of-type{border-top:none}.item:last-of-type{border-bottom:none}.item-dismiss{opacity:.3}.item-icon-section{padding-right:5px;font-size:25px}.item-content-section{padding:16px 15px;flex:1;overflow:hidden}.item-content-text{font-size:14px;padding-bottom:5px}.item-content-date{font-size:12px;color:#959899}.item-dismiss-section button{margin-top:5px;font-size:small}.item-dismiss-section button:hover,.item-dismiss-section button:focus{background-color:transparent}.item-dismiss-preloader{position:absolute;top:8px;width:35px}.item-dismiss-preloader .d-preloader{line-height:35px}.item-dismiss-preloader .d-preloader:before{font-size:12px}.content-load-more{height:40px;display:flex;align-items:center;justify-content:center}.item-content-subject{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;max-width:calc(100% - 65px)!important}.item-content-inner-section{max-width:calc(100vw - 44px)!important}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "translate": i4$1.TranslatePipe, "date": i4.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserMessagesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-user-messages',
                    templateUrl: './user-messages.component.html',
                    styleUrls: ['user-messages.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AdaptModalService }, { type: RxUserMessageService }, { type: i0.Renderer2 }]; }, propDecorators: { scrollableNotifications: [{
                type: ViewChild,
                args: ['scrollableNotifications', { static: true }]
            }] } });

class RxShellComponent extends ShellBase {
    constructor(adaptModalService, route, rxModalService, rxNotificationService, rxShellService, rxSmartReportingService, rxUpgradeTrackerService, rxViewActionService, injector, adaptNavigationService) {
        super(injector);
        this.adaptModalService = adaptModalService;
        this.route = route;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.rxShellService = rxShellService;
        this.rxSmartReportingService = rxSmartReportingService;
        this.rxUpgradeTrackerService = rxUpgradeTrackerService;
        this.rxViewActionService = rxViewActionService;
        this.injector = injector;
        this.adaptNavigationService = adaptNavigationService;
        this.subscriptions = new Subscription();
        this.rxShellService.resetMenuItemCount();
    }
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.rxShellService.navigateToSmartReporting$
            .pipe(switchMap(() => this.rxSmartReportingService.openSmartReporting()))
            .subscribe((isSmartReportingConfigured) => {
            if (!isSmartReportingConfigured) {
                this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.shell.smart-reporting-not-configured'));
            }
        }));
        this.subscriptions.add(this.rxShellService.navigateToView$.subscribe((menuItem) => this.openView(menuItem)));
        this.subscriptions.add(this.rxShellService.openUserPreferences$.subscribe(() => this.openUserPreferences()));
        this.subscriptions.add(this.rxShellService.openGainsightPreferences$.subscribe(() => this.openGainsightPreferences()));
        this.subscriptions.add(this.rxShellService.openUserAvailability$.subscribe(() => this.openUserAvailability()));
    }
    onNavigationCanceled() {
        if (this.currentMenuItemId !== null) {
            this.adaptNavigation.selectMenuItem(this.currentMenuItemId);
        }
    }
    openView(menuItem) {
        this.rxViewActionService
            .execute(RX_VIEW_ACTION.viewActionNames.openView, menuItem.openViewParams)
            .pipe(take(1))
            .subscribe({
            error: () => {
                this.onNavigationCanceled();
            }
        });
    }
    openUserPreferences() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-preferences.label'),
            content: RxUserPreferencesComponent,
            size: 'sm'
        })
            .then(() => {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.shell.user-preferences-dialog.signout.confirmation.message')
            })
                .then((isLogoutRequested) => {
                if (isLogoutRequested) {
                    this.logout();
                }
            });
        })
            .catch(noop);
    }
    openGainsightPreferences() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
            content: GainsightOptInComponent,
            size: 'sm'
        })
            .catch(noop);
    }
    openUserAvailability() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.my-availability.label'),
            content: RxUserAvailabilityComponent,
            size: 'sm'
        })
            .catch(noop);
    }
    getNavigationActionItems() {
        return this.shellConfig$.pipe(map((shellConfig) => {
            const actions = [];
            shellConfig.navigationActions.forEach((item) => {
                actions.push({
                    action: item.action,
                    className: item.className,
                    name: item.name,
                    tooltip: item.name,
                    hide: item.hide
                });
            });
            if (!shellConfig.globalSearchDisabled) {
                actions.push({
                    name: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    tooltip: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label'),
                    className: 'd-icon-search',
                    route: `/${this.rxGlobalCacheService.applicationId}/search`
                });
            }
            const showUpgradeTrackerAction = {
                action: () => {
                    this.rxUpgradeTrackerService.displayUpgradeNotification(true);
                },
                className: 'd-icon-clock_alert',
                hide: !this.rxUpgradeTrackerService.isUpgradeInProgress,
                name: ''
            };
            this.subscriptions.add(this.rxUpgradeTrackerService.isUpgradeInProgress$.subscribe(() => {
                showUpgradeTrackerAction.hide = !this.rxUpgradeTrackerService.isUpgradeInProgress;
            }));
            actions.push(showUpgradeTrackerAction);
            return actions;
        }));
    }
    getActiveNavigationMenuItem() {
        return find(this.flattenedMenuItems, (menuItem) => menuItem.hide !== true &&
            menuItem.type === RX_SHELL.actions.navigateToView &&
            decodeURIComponent(`/${this.rxGlobalCacheService.applicationId}/view/${menuItem.viewUrl}`) ===
                decodeURIComponent(this.router.url));
    }
    getNavigationMenuItems() {
        return this.shellConfig$.pipe(map((shellConfig) => shellConfig.navigationBarItems));
    }
    getUserMenuItems() {
        return this.shellConfig$.pipe(map((shellConfig) => shellConfig.userMenu.subMenu));
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subscriptions.unsubscribe();
    }
    getShellConfig() {
        return this.applicationDescriptor$.pipe(switchMap((currentBundleDescriptor) => this.rxShellService.getShellConfig(currentBundleDescriptor.id)), tap((shellConfig) => {
            this.flattenedMenuItems = shellConfig.flattenedMenuItems;
        }), shareReplay(1));
    }
}
RxShellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponent, deps: [{ token: i1$1.AdaptModalService }, { token: i1$4.ActivatedRoute }, { token: i1.RxModalService }, { token: i1$2.RxNotificationService }, { token: i3$1.RxShellService }, { token: i1$2.RxSmartReportingService }, { token: i1$2.RxUpgradeTrackerService }, { token: i3$1.RxViewActionService }, { token: i0.Injector }, { token: i1$1.AdaptNavigationService }], target: i0.ɵɵFactoryTarget.Component });
RxShellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellComponent, selector: "rx-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1$1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1$4.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell',
                    templateUrl: './shell.component.html',
                    styleUrls: ['./shell.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AdaptModalService }, { type: i1$4.ActivatedRoute }, { type: i1.RxModalService }, { type: i1$2.RxNotificationService }, { type: i3$1.RxShellService }, { type: i1$2.RxSmartReportingService }, { type: i1$2.RxUpgradeTrackerService }, { type: i3$1.RxViewActionService }, { type: i0.Injector }, { type: i1$1.AdaptNavigationService }]; }, propDecorators: { adaptNavigation: [{
                type: ViewChild,
                args: ['adaptNavigation', { static: true }]
            }], userMessagesPopover: [{
                type: ViewChild,
                args: ['userMessagesPopover', { static: true }]
            }] } });

class DevelopmentModeSelectorComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.developmentModeFormControl = new FormControl(this.activeModalRef.getData().developmentMode);
        this.isSaveButtonDisabled$ = this.developmentModeFormControl.valueChanges.pipe(startWith(this.activeModalRef.getData().developmentMode), map((value) => value === this.activeModalRef.getData().developmentMode));
    }
    closeModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    selectDevelopmentMode() {
        this.activeModalRef.close(this.developmentModeFormControl.value);
    }
}
DevelopmentModeSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DevelopmentModeSelectorComponent, deps: [{ token: i1$1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
DevelopmentModeSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DevelopmentModeSelectorComponent, selector: "rx-development-mode-selector", ngImport: i0, template: "<div class=\"modal-body p-0\">\n  <adapt-alert\n    [config]=\"{\n      content: 'com.bmc.arsys.rx.client.shell.development-mode.close-other-tabs.warning' | translate,\n      dismissible: false,\n      variant: 'warning',\n      type: 'page'\n    }\"\n  ></adapt-alert>\n\n  <div class=\"p-4\">\n    <div class=\"flex\">\n      <adapt-rx-radiobutton-group\n        [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.select.label' | translate\"\n        [autofocus]=\"true\"\n        [formControl]=\"developmentModeFormControl\"\n      >\n        <adapt-rx-radiobutton\n          value=\"1\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.best-practice.label' | translate\"\n        ></adapt-rx-radiobutton>\n        <adapt-rx-radiobutton\n          value=\"0\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.base.label' | translate\"\n        ></adapt-rx-radiobutton>\n      </adapt-rx-radiobutton-group>\n\n      <adapt-alert\n        *ngIf=\"developmentModeFormControl.value === '0' && developmentModeFormControl.dirty\"\n        [config]=\"{\n          type: 'inline',\n          variant: 'warning',\n          dismissible: false,\n          content: 'com.bmc.arsys.rx.client.shell.development-mode.system-upgrade.warning' | translate\n        }\"\n      ></adapt-alert>\n\n      <a\n        adapt-button\n        class=\"d-icon-pop_up pl-0 pb-0\"\n        btn-type=\"tertiary\"\n        size=\"large\"\n        target=\"_blank\"\n        href=\"https://docs.bmc.com/docs/display/helixplatform/Customization+layer\"\n      >\n        <span> {{ 'com.bmc.arsys.rx.client.common.learn-more.label' | translate }}</span>\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"selectDevelopmentMode()\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1$1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1$1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4$1.TranslatePipe, "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DevelopmentModeSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-development-mode-selector',
                    templateUrl: './development-mode-selector.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }]; } });

class FeedbackDialogComponent {
    constructor(dockedPanelContext, domSanitizer, rxOverlayService) {
        this.dockedPanelContext = dockedPanelContext;
        this.domSanitizer = domSanitizer;
        this.rxOverlayService = rxOverlayService;
    }
    ngOnInit() {
        const data = this.dockedPanelContext.getData();
        const requestParams = new HttpParams({
            fromObject: {
                Q_Language: 'EN',
                product: 'BMC Helix Platform',
                productVersion: data.bundleDescriptorVersion,
                tenant: this.rxOverlayService.getCurrentOverlayContext().tenantName
            }
        });
        this.feedbackUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.feedbackUrl.value + '?' + requestParams.toString());
    }
    close() {
        this.dockedPanelContext.close(DismissReasons.CLOSE_BTN);
    }
}
FeedbackDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FeedbackDialogComponent, deps: [{ token: i1$1.DockedPanelContext }, { token: i2$2.DomSanitizer }, { token: i1$2.RxOverlayService }], target: i0.ɵɵFactoryTarget.Component });
FeedbackDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FeedbackDialogComponent, selector: "rx-feedback-dialog", ngImport: i0, template: "<div class=\"h-100 p-0\">\n  <iframe frameborder=\"0\" class=\"d-block h-100 w-100\" [src]=\"feedbackUrl\"> </iframe>\n</div>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FeedbackDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-feedback-dialog',
                    templateUrl: './feedback-dialog.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DockedPanelContext }, { type: i2$2.DomSanitizer }, { type: i1$2.RxOverlayService }]; } });

class RxInnovationStudioShellComponent extends ShellBase {
    constructor(injector, adaptDockedPanelService, adaptModalService, rxSystemConfigurationService, rxOverlayService, rxPreviousStateService, rxModalService) {
        super(injector);
        this.injector = injector;
        this.adaptDockedPanelService = adaptDockedPanelService;
        this.adaptModalService = adaptModalService;
        this.rxSystemConfigurationService = rxSystemConfigurationService;
        this.rxOverlayService = rxOverlayService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.rxModalService = rxModalService;
        this.flattenedMenuItems = [
            {
                name: this.translateService.instant('com.bmc.arsys.rx.innovation-studio.workspace.page.label'),
                id: 0,
                action: () => {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'workspace']);
                }
            },
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.common.administration.label'),
                id: 1,
                action: () => {
                    this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'settings']);
                }
            }
        ];
        this.npsSurveyBaseUrl = 'NPS-Survey-Base-URL';
        this.currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
    }
    getActiveNavigationMenuItem() {
        const url = this.router.url;
        if (includes(url, `${RX_APPLICATION.innovationStudioBundleId}/workspace`)) {
            return this.flattenedMenuItems[0];
        }
        else if (includes(url, `${RX_APPLICATION.innovationStudioBundleId}/settings`)) {
            return this.flattenedMenuItems[1];
        }
    }
    getUserMenuItems() {
        const userMenu = [];
        const currentOverlayContext = this.rxOverlayService.getCurrentOverlayContext();
        if (this.isEligibleForFeedback()) {
            userMenu.push({
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                className: 'd-icon-heart',
                id: 1,
                action: () => {
                    this.openFeedback();
                }
            });
        }
        if (this.rxFeatureService.isFeatureEnabled('DRD21-11744')) {
            userMenu.push({
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
                id: 0,
                className: 'd-icon-app_chart_bar',
                action: () => {
                    this.openGainsightPreferences();
                }
            });
        }
        return of(userMenu);
    }
    isEligibleForFeedback() {
        return (this.currentOverlayContext.overlayGroupId !== RX_OVERLAY.overlayGroupIds.base &&
            !this.currentOverlayContext.isShared);
    }
    openFeedback() {
        let bundleDescriptorVersion;
        this.applicationDescriptor$.subscribe((applicationDescriptor) => {
            bundleDescriptorVersion = applicationDescriptor.version;
        });
        this.rxSystemConfigurationService.getConfiguration(this.npsSurveyBaseUrl).subscribe((feedbackUrl) => {
            this.adaptDockedPanelService.open({
                title: this.translateService.instant('com.bmc.arsys.rx.client.shell.provide-feedback.label'),
                content: FeedbackDialogComponent,
                size: 'md',
                data: { feedbackUrl, bundleDescriptorVersion }
            });
        });
    }
    openGainsightPreferences() {
        this.adaptModalService
            .open({
            title: this.translateService.instant('com.bmc.arsys.rx.client.shell.analytics.label'),
            content: GainsightOptInComponent,
            size: 'sm'
        })
            .catch(noop$1);
    }
    getNavigationMenuItems() {
        return of(this.flattenedMenuItems);
    }
    getNavigationActionItems() {
        const currentDevelopmentMode = this.rxOverlayService.getDevelopmentMode();
        return of([
            {
                name: this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                className: 'd-icon-field_custom',
                tooltip: this.translateService.instant(currentDevelopmentMode === DevelopmentMode.Base
                    ? 'com.bmc.arsys.rx.client.shell.development-mode.base.tooltip'
                    : 'com.bmc.arsys.rx.client.shell.development-mode.best-practice.tooltip'),
                action: () => {
                    this.adaptModalService
                        .open({
                        title: this.translateService.instant('com.bmc.arsys.rx.client.shell.development-mode.title'),
                        content: DevelopmentModeSelectorComponent,
                        size: 'sm',
                        data: { developmentMode: currentDevelopmentMode }
                    })
                        .then((developmentMode) => {
                        this.rxOverlayService.setDevelopmentMode(developmentMode);
                        this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'workspace']).then(() => {
                            window.location.reload();
                        });
                    }, () => { });
                }
            }
        ]);
    }
    getShellConfig() {
        return of({ allowAppSwitching: true });
    }
}
RxInnovationStudioShellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInnovationStudioShellComponent, deps: [{ token: i0.Injector }, { token: i1$1.AdaptDockedPanelService }, { token: i1$1.AdaptModalService }, { token: i1$2.RxSystemConfigurationService }, { token: i1$2.RxOverlayService }, { token: i1$2.RxPreviousStateService }, { token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RxInnovationStudioShellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxInnovationStudioShellComponent, selector: "rx-innovation-studio-shell", viewQueries: [{ propertyName: "adaptNavigation", first: true, predicate: ["adaptNavigation"], descendants: true, static: true }, { propertyName: "userMessagesPopover", first: true, predicate: ["userMessagesPopover"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template #userMessagesPopover>\n  <rx-user-messages></rx-user-messages>\n</ng-template>\n\n<adapt-navigation\n  #adaptNavigation\n  [class.invisible]=\"!isShellInitialized\"\n  [metadata]=\"brandingInfo$ | async\"\n  [menu]=\"(navigationMenuItems$ | async) || []\"\n  [actions]=\"navigationActionItems$ | async\"\n  [profile]=\"userProfileMenu$ | async\"\n></adapt-navigation>\n\n<adapt-alert\n  *ngIf=\"hasBanner$ | async\"\n  [config]=\"{\n    title: 'Note:',\n    type: 'page',\n    variant: 'info',\n    content: ''\n  }\"\n  (onClose)=\"closeBanner()\"\n>\n  <span class=\"alert-content\">\n    <span>\n      {{ alertText }}\n    </span>\n\n    <a href=\"#\" class=\"alert-link\" (click)=\"openGainsightPreferences(); $event.preventDefault()\">\n      {{ alertLinkText }}\n    </a>\n  </span>\n</adapt-alert>\n\n<div [class.invisible]=\"!isShellInitialized\" class=\"busy-indicator position-relative\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<div\n  [class.invisible]=\"!isShellInitialized\"\n  class=\"outlet-content\"\n  [ngClass]=\"{\n    'has-banner': hasBanner$ | async\n  }\"\n>\n  <router-outlet></router-outlet>\n</div>\n", styles: [":host{height:100%}.outlet-content{height:calc(100% - 52px)}.has-banner{height:calc(100% - 96px)}.busy-indicator{bottom:2px}.busy-indicator ::ng-deep .ng-busy{z-index:1}\n"], components: [{ type: RxUserMessagesComponent, selector: "rx-user-messages" }, { type: i1$1.AdaptNavigationComponent, selector: "adapt-navigation", inputs: ["menu", "metadata", "config", "kebabView", "gapWidth", "container", "actions", "profile", "customProfile", "appSwitcherEnabled", "appSwitcherMetaData", "theme", "checkForHamburger", "selectMenuItem", "closeHamburger"], outputs: ["alertClosed"] }, { type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1$4.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate"], exportAs: ["outlet"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxInnovationStudioShellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-innovation-studio-shell',
                    templateUrl: './shell.component.html',
                    styleUrls: ['./shell.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$1.AdaptDockedPanelService }, { type: i1$1.AdaptModalService }, { type: i1$2.RxSystemConfigurationService }, { type: i1$2.RxOverlayService }, { type: i1$2.RxPreviousStateService }, { type: i1.RxModalService }]; }, propDecorators: { adaptNavigation: [{
                type: ViewChild,
                args: ['adaptNavigation', { static: true }]
            }], userMessagesPopover: [{
                type: ViewChild,
                args: ['userMessagesPopover', { static: true }]
            }] } });

class RxShellModule {
}
RxShellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, declarations: [RxShellComponent,
        RxInnovationStudioShellComponent,
        RxUserMessagesComponent,
        RxUserMessageModalComponent,
        DevelopmentModeSelectorComponent,
        FeedbackDialogComponent,
        GainsightOptInComponent], imports: [BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AdaptModalModule,
        AdaptDockedPanelModule, i1$1.AdaptNavigationModule, AdaptTooltipModule,
        AdaptButtonModule,
        AdaptCloseModule,
        AdaptRxSearchModule, i1$1.AdaptAlertModule, AdaptRxRadiobuttonModule,
        TranslateModule,
        RxBusyIndicatorModule,
        AdaptRadarModule,
        AdaptAgreementModule,
        RxLineLoaderModule,
        AdaptBusyModule], exports: [RxShellComponent, RxInnovationStudioShellComponent] });
RxShellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, providers: [RxUserMessageDataPageService, RxUserMessageService], imports: [[
            BrowserModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            AdaptModalModule,
            AdaptDockedPanelModule,
            AdaptNavigationModule.forRoot(),
            AdaptTooltipModule,
            AdaptButtonModule,
            AdaptCloseModule,
            AdaptRxSearchModule,
            AdaptAlertModule.forRoot(),
            AdaptRxRadiobuttonModule,
            TranslateModule,
            RxBusyIndicatorModule,
            AdaptRadarModule,
            AdaptAgreementModule,
            RxLineLoaderModule,
            AdaptBusyModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BrowserModule,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        AdaptModalModule,
                        AdaptDockedPanelModule,
                        AdaptNavigationModule.forRoot(),
                        AdaptTooltipModule,
                        AdaptButtonModule,
                        AdaptCloseModule,
                        AdaptRxSearchModule,
                        AdaptAlertModule.forRoot(),
                        AdaptRxRadiobuttonModule,
                        TranslateModule,
                        RxBusyIndicatorModule,
                        AdaptRadarModule,
                        AdaptAgreementModule,
                        RxLineLoaderModule,
                        AdaptBusyModule
                    ],
                    entryComponents: [RxUserMessageModalComponent],
                    declarations: [
                        RxShellComponent,
                        RxInnovationStudioShellComponent,
                        RxUserMessagesComponent,
                        RxUserMessageModalComponent,
                        DevelopmentModeSelectorComponent,
                        FeedbackDialogComponent,
                        GainsightOptInComponent
                    ],
                    exports: [RxShellComponent, RxInnovationStudioShellComponent],
                    providers: [RxUserMessageDataPageService, RxUserMessageService]
                }]
        }] });

var RxApplicationContext;
(function (RxApplicationContext) {
    RxApplicationContext["Runtime"] = "runtime";
    RxApplicationContext["Designtime"] = "designtime";
})(RxApplicationContext || (RxApplicationContext = {}));

class RxUserAvailabilityModule {
}
RxUserAvailabilityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUserAvailabilityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, declarations: [RxUserAvailabilityComponent], imports: [CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule] });
RxUserAvailabilityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, imports: [[CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserAvailabilityModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxUserAvailabilityComponent],
                    imports: [CommonModule, TranslateModule, FormsModule, AdaptRxCheckboxModule],
                    entryComponents: [RxUserAvailabilityComponent]
                }]
        }] });

class RxUserPreferencesModule {
}
RxUserPreferencesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUserPreferencesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, declarations: [RxUserPreferencesComponent], imports: [CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule] });
RxUserPreferencesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, imports: [[CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUserPreferencesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, TranslateModule, RxLineLoaderModule, AdaptRxSelectModule],
                    declarations: [RxUserPreferencesComponent],
                    entryComponents: [RxUserPreferencesComponent]
                }]
        }] });

class RxWizardModalComponent extends RxModalClass {
    constructor(activeModalRef, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.activeTabIndex = 0;
        this.config = this.activeModalRef.getData();
        this.isWizardCompleted = false;
        this.nextSubject = new Subject();
        this.next$ = this.nextSubject.asObservable();
        this.api = {
            isCurrentStepActive: (stepId) => {
                return findIndex(this.config.options.steps, { id: stepId }) === this.activeTabIndex;
            },
            addStep: (step, index) => {
                if (isNumber(index)) {
                    this.config.options.steps.splice(index, 0, step);
                    if (index <= this.activeTabIndex) {
                        setTimeout(() => this.next());
                    }
                }
                else {
                    this.config.options.steps.push(step);
                }
            },
            complete: () => {
                this.isWizardDirty = false;
                this.isWizardCompleted = true;
            },
            disableNextButton: () => {
                this.config.options.isNextButtonDisabled = true;
            },
            enableNextButton: () => {
                this.config.options.isNextButtonDisabled = false;
            },
            disablePreviousButton: () => {
                this.config.options.isPreviousButtonDisabled = true;
            },
            enablePreviousButton: () => {
                this.config.options.isPreviousButtonDisabled = false;
            },
            disableFinishButton: () => {
                this.config.options.isFinishButtonDisabled = true;
            },
            enableFinishButton: () => {
                this.config.options.isFinishButtonDisabled = false;
            },
            getSteps() {
                return cloneDeep(this.config.options.steps);
            },
            markPristine: () => {
                this.isWizardDirty = false;
            },
            markDirty: () => {
                this.isWizardDirty = true;
            },
            removeNextSteps: (startIndex) => {
                this.config.options.steps.splice(startIndex);
            },
            removeStep: (index) => {
                this.config.options.steps.splice(index, 1);
            },
            renew: () => {
                this.isWizardCompleted = false;
            },
            setFinishButtonLabel: (label) => {
                this.config.options.finishButtonLabel = label;
            },
            updateContext: (context, markDirty = true) => {
                Object.assign(this.config.context, context);
                this.contextSubject$.next(this.config.context);
                if (markDirty) {
                    this.api.markDirty();
                }
            }
        };
        this.contextSubject$ = new BehaviorSubject(this.config.context);
        this.stepsSubject$ = new BehaviorSubject(this.config.options.steps);
        this.tabIndexSubject$ = new BehaviorSubject(this.activeTabIndex);
        this.isWizardDirty = false;
        this.context$ = this.contextSubject$.asObservable();
        this.steps$ = this.stepsSubject$.asObservable();
        this.tabIndex$ = this.tabIndexSubject$.asObservable();
    }
    isDirty() {
        return this.isWizardDirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.config.options.isPreviousButtonDisabled = true;
        this.config.options.isNextButtonDisabled = false;
        this.config.options.isFinishButtonDisabled = false;
        this.config.options.steps[this.activeTabIndex].isActivated = true;
    }
    tabChanged({ index }) {
        this.activeTabIndex = index;
        this.config.options.steps[this.activeTabIndex].isActivated = true;
        this.config.options.isPreviousButtonDisabled = index === 0;
        this.config.options.isNextButtonDisabled = index === this.config.options.steps.length - 1;
        this.tabIndexSubject$.next(this.activeTabIndex);
        this.stepsSubject$.next(this.config.options.steps);
    }
    back() {
        this.adaptTabset.setActiveTab(this.activeTabIndex - 1, true, null);
    }
    next(force = false) {
        if (!force) {
            this.nextSubject.next(this.config.options.steps[this.activeTabIndex].id);
        }
        if (force || this.config.options.steps[this.activeTabIndex].handlesNext !== true) {
            this.adaptTabset.setActiveTab(this.activeTabIndex + 1, true, null);
        }
    }
    finish() {
        this.activeModalRef.close(this.config.context);
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    ngOnDestroy() {
        this.nextSubject.complete();
        this.contextSubject$.complete();
        this.stepsSubject$.complete();
        this.tabIndexSubject$.complete();
    }
}
RxWizardModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModalComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxWizardModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxWizardModalComponent, selector: "rx-wizard-modal", viewQueries: [{ propertyName: "adaptTabset", first: true, predicate: ["adaptTabset"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">{{ config.options.title }}</h5>\n\n  <button\n    class=\"close dp-close\"\n    [attr.aria-label]=\"'com.bmc.arsys.rx.client.common.close.label' | translate\"\n    type=\"button\"\n    (click)=\"close()\"\n  ></button>\n</div>\n\n<div class=\"alert alert-info mb-0\" role=\"alert\" *ngIf=\"config.options.notificationMessage\">\n  <div class=\"alert-content\">\n    {{ config.options.notificationMessage }}\n  </div>\n</div>\n\n<div class=\"modal-body\">\n  <adapt-tabset\n    #adaptTabset\n    [type]=\"'stacked'\"\n    [tab-active]=\"activeTabIndex\"\n    (tab-active-changed)=\"tabChanged($event)\"\n    class=\"h-100\"\n    customClassTabList=\"stacked-tab-list\"\n  >\n    <adapt-tab-panel *ngFor=\"let step of config.options.steps\" [adapt-tab-title]=\"step.name\" [disabled]=\"true\">\n      <rx-dynamic-component-renderer\n        *ngIf=\"step.isActivated\"\n        [componentFactory]=\"step.componentFactory\"\n        [context]=\"config.context\"\n        [options]=\"step.options\"\n      ></rx-dynamic-component-renderer>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    *ngIf=\"!isWizardCompleted\"\n    (click)=\"close()\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    class=\"mr-2 d-icon-left-angle_left\"\n    [disabled]=\"config.options.isPreviousButtonDisabled\"\n    (click)=\"back()\"\n    rx-id=\"previous-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.previous-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    class=\"mr-2 d-icon-right-angle_right\"\n    *ngIf=\"activeTabIndex < config.options.steps.length - 1\"\n    [disabled]=\"config.options.isNextButtonDisabled\"\n    (click)=\"next()\"\n    rx-id=\"next-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.next-step.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    *ngIf=\"(config.options.allowFinish && activeTabIndex === config.options.steps.length - 1) || isWizardCompleted\"\n    [disabled]=\"config.options.isFinishButtonDisabled\"\n    (click)=\"finish()\"\n    rx-id=\"finish-button\"\n  >\n    {{ config.options.finishButtonLabel }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block}:host .modal-body{height:645px;overflow-y:auto}:host adapt-tabset::ng-deep .stacked{flex:0 0 100%}:host adapt-tabset::ng-deep .stacked .tab-toolbar{flex-shrink:0}:host adapt-tabset::ng-deep .stacked .stacked-tab-list .nav-link-title{max-width:160px;text-align:left;white-space:normal}\n"], components: [{ type: i1$1.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i1$1.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: RxDynamicComponentRendererComponent, selector: "rx-dynamic-component-renderer", inputs: ["componentFactory", "context", "options"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-wizard-modal',
                    templateUrl: './wizard-modal.component.html',
                    styleUrls: ['./wizard-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i0.Injector }]; }, propDecorators: { adaptTabset: [{
                type: ViewChild,
                args: ['adaptTabset', { static: true }]
            }] } });

class RxWizardService {
    constructor(rxModalService) {
        this.rxModalService = rxModalService;
    }
    open(config) {
        return this.rxModalService
            .openModal({
            content: RxWizardModalComponent,
            data: Object.assign({}, config)
        })
            .catch(noop);
    }
}
RxWizardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, deps: [{ token: i1.RxModalService }], target: i0.ɵɵFactoryTarget.Injectable });
RxWizardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }]; } });

class RxWizardModule {
}
RxWizardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxWizardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, declarations: [RxWizardModalComponent], imports: [CommonModule,
        AdaptButtonModule,
        AdaptModalModule,
        AdaptAlertModule,
        AdaptTabsModule,
        TranslateModule,
        RxDynamicComponentRendererModule], exports: [RxWizardModalComponent] });
RxWizardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, providers: [RxWizardService], imports: [[
            CommonModule,
            AdaptButtonModule,
            AdaptModalModule,
            AdaptAlertModule,
            AdaptTabsModule,
            TranslateModule,
            RxDynamicComponentRendererModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxWizardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AdaptButtonModule,
                        AdaptModalModule,
                        AdaptAlertModule,
                        AdaptTabsModule,
                        TranslateModule,
                        RxDynamicComponentRendererModule
                    ],
                    declarations: [RxWizardModalComponent],
                    entryComponents: [RxWizardModalComponent],
                    exports: [RxWizardModalComponent],
                    providers: [RxWizardService]
                }]
        }] });

class SelectionFieldOptionsEditorComponent extends RxModalClass {
    constructor(activeModalRef, injector, rxGuidService, translateService) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.rxGuidService = rxGuidService;
        this.translateService = translateService;
        this.isReadOnly = this.activeModalRef.getData().isReadOnly;
        this.selectionOptions = map$1(this.activeModalRef.getData().existingOptions, (option) => ({
            name: option.name,
            id: option.id,
            stringKey: option.stringKey,
            isOpen: false
        }));
        this.duplicateOptionNameMsg = this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.duplicate-option-name.error');
        this.duplicateOptionIdMsg = this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.duplicate-value.message');
    }
    isDirty() {
        var _a;
        return (_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty;
    }
    saveOptions() {
        const optionNamesById = {};
        const optionKeysById = {};
        forEach(this.selectionOptions, (option) => {
            optionNamesById[option.id] = option.name;
        });
        forEach(this.selectionOptions, (option) => {
            optionKeysById[option.id] = option.stringKey;
        });
        this.activeModalRef.close({
            optionNamesById,
            optionLabelsById: optionKeysById
        });
    }
    addOption() {
        let name;
        let counter = 0;
        let existingOption;
        const newOptionLabel = this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.new-option.label');
        do {
            name = counter === 0 ? newOptionLabel : `${newOptionLabel} ` + counter;
            counter++;
            existingOption = find(this.selectionOptions, { name });
        } while (existingOption);
        this.selectionOptions.push({
            name,
            id: this.selectionOptions.length
                ? max(this.selectionOptions.map((option) => option.id)) + 10
                : 0,
            stringKey: this.rxGuidService.generate(),
            isOpen: true
        });
        this.optionSelectionForm.form.markAsDirty();
    }
    removeOption(index) {
        this.selectionOptions.splice(index, 1);
        this.optionSelectionForm.form.markAsDirty();
        this.validateIdAndNames('name');
        this.validateIdAndNames('id');
    }
    expandAll() {
        this.selectionOptions.forEach((option) => (option.isOpen = true));
    }
    collapseAll() {
        this.selectionOptions.forEach((option) => (option.isOpen = false));
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    getDuplicateOptions(type) {
        return filter(this.selectionOptions, (option) => filter(this.selectionOptions, (item) => type === 'name' ? lowerCase(item.name) === trim(lowerCase(option.name)) : item.id === option.id).length > 1);
    }
    validateIdAndNames(type) {
        if (this.optionSelectionForm.invalid) {
            return;
        }
        if (type === 'name') {
            forEach(this.selectionOptions, (option) => {
                option.invalidNameError = null;
            });
            this.getDuplicateOptions(type).forEach((option) => {
                option.invalidNameError = this.duplicateOptionNameMsg;
            });
        }
        if (type === 'id') {
            forEach(this.selectionOptions, (option) => {
                option.invalidIdError = null;
            });
            this.getDuplicateOptions(type).forEach((option) => {
                option.invalidIdError = this.duplicateOptionIdMsg;
            });
        }
    }
    isSaveButtonDisabled() {
        var _a, _b;
        return (!((_a = this.optionSelectionForm) === null || _a === void 0 ? void 0 : _a.dirty) ||
            ((_b = this.optionSelectionForm) === null || _b === void 0 ? void 0 : _b.invalid) ||
            some(this.selectionOptions, (option) => option.invalidNameError || option.invalidIdError));
    }
    trackByIndex(index) {
        return index;
    }
}
SelectionFieldOptionsEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsEditorComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i0.Injector }, { token: i1$3.RxGuidService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SelectionFieldOptionsEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsEditorComponent, selector: "rx-selection-field-options-editor", viewQueries: [{ propertyName: "optionSelectionForm", first: true, predicate: ["optionSelectionForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100 flex-column\">\n  <div class=\"text-right btn-group\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"add-option-button\"\n      class=\"d-icon-left-plus_circle float-left px-0\"\n      (click)=\"addOption()\"\n      *ngIf=\"!isReadOnly\"\n    >\n      {{ 'com.bmc.arsys.rx.client.selection-field-options-editor.add-option.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"expand-button\" (click)=\"expandAll()\" class=\"ml-auto\">\n      {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"tertiary\" rx-id=\"collapse-button\" class=\"pr-0\" (click)=\"collapseAll()\">\n      {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n    </button>\n  </div>\n\n  <div class=\"designer-modal-accordion-wrapper\">\n    <form #optionSelectionForm=\"ngForm\">\n      <adapt-accordion [multiselect]=\"true\" class=\"d-block\">\n        <div\n          *ngFor=\"let option of selectionOptions; let $index = index; trackBy: trackByIndex\"\n          class=\"designer-modal-accordion-content\"\n        >\n          <adapt-accordion-tab\n            class=\"d-block\"\n            [isOpen]=\"option.isOpen\"\n            (open)=\"option.isOpen = true\"\n            (close)=\"option.isOpen = false\"\n          >\n            <div class=\"card-title-text w-100\">\n              <div class=\"designer-modal-card-title-content\">\n                <div class=\"left-header-block pl-0\">\n                  <div class=\"rx-ellipsis\" [title]=\"option.name\" rx-id=\"card-title\">\n                    {{ option.name }}\n                  </div>\n                </div>\n\n                <div class=\"right-header-block\">\n                  <button\n                    class=\"d-icon-left-cross_adapt py-0 pr-3 btn btn-sm\"\n                    adapt-button\n                    size=\"small\"\n                    type=\"button\"\n                    (click)=\"$event.stopPropagation(); removeOption($index)\"\n                    *ngIf=\"!isReadOnly\"\n                  >\n                    {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"d-flex\">\n              <div class=\"w-50 pr-2\">\n                <adapt-rx-textfield\n                  maxlength=\"254\"\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.common.name.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.name\"\n                  [autofocus]=\"true\"\n                  name=\"{{ 'name' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('name')\"\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-textfield>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidNameError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidNameError\n                  }\"\n                ></adapt-alert>\n              </div>\n\n              <div class=\"w-50 pl-2\">\n                <adapt-rx-counter\n                  rx-id=\"option-name\"\n                  label=\"{{ 'com.bmc.arsys.rx.client.selection-field-options-editor.integer-value.label' | translate }}\"\n                  required=\"true\"\n                  [(ngModel)]=\"option.id\"\n                  name=\"{{ 'integerValue' + $index }}\"\n                  (ngModelChange)=\"validateIdAndNames('id')\"\n                  [min]=\"0\"\n                  [max]=\"2147483647\"\n                  [adaptMax]=\"2147483647\"\n                  [adaptMin]=\"0\"\n                  [step]=\"1\"\n                  adaptIntegerNumber\n                  [disabled]=\"isReadOnly\"\n                >\n                </adapt-rx-counter>\n\n                <adapt-alert\n                  *ngIf=\"option.invalidIdError\"\n                  [config]=\"{\n                    variant: 'danger',\n                    dismissible: false,\n                    type: 'inline',\n                    content: option.invalidIdError\n                  }\"\n                ></adapt-alert>\n              </div>\n            </div>\n          </adapt-accordion-tab>\n        </div>\n      </adapt-accordion>\n    </form>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <div *ngIf=\"!isReadOnly\">\n    <button\n      type=\"button\"\n      adapt-button\n      btn-type=\"primary\"\n      rx-id=\"save-button\"\n      (click)=\"saveOptions()\"\n      [disabled]=\"isSaveButtonDisabled()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n\n  <div *ngIf=\"isReadOnly\">\n    <button type=\"button\" adapt-button btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n    </button>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1$1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1$1.AdaptRxCounterComponent, selector: "adapt-rx-counter", inputs: ["prefix", "suffix", "max", "min", "step", "size", "placeholder", "disabledStyleForReadonlyState"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1$1.AdaptIntegerNumberValidatorDirective, selector: "[adaptIntegerNumber][ngModel], [adaptIntegerNumber][formControl]", inputs: ["adaptIntegerNumberMessageFn"] }, { type: i1$1.AdaptMaxValidatorDirective, selector: "[adaptMax][ngModel],[adaptMax][formControl]", inputs: ["adaptMax", "adaptMaxMessageFn"] }, { type: i1$1.AdaptMinValidatorDirective, selector: "[adaptMin][ngModel],[adaptMin][formControl]", inputs: ["adaptMin", "adaptMinMessageFn"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field-options-editor',
                    templateUrl: './selection-field-options-editor.component.html',
                    styleUrls: ['./selection-field-options-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i0.Injector }, { type: i1$3.RxGuidService }, { type: i4$1.TranslateService }]; }, propDecorators: { optionSelectionForm: [{
                type: ViewChild,
                args: ['optionSelectionForm']
            }] } });

class SelectionFieldOptionsComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.currentOptions = [];
        this.defaultOption = [];
    }
    onWriteValue(currentOptionProperties) {
        const currentOptionsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionNamesById) || this.options.optionNamesById;
        const currentLabelsById = (currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.optionLabelsById) || this.options.optionLabelsById;
        this.currentOptions = map$1(currentOptionsById, (name, id) => ({
            name,
            id: Number(id),
            stringKey: currentLabelsById[id]
        }));
        this.defaultOption = !isNil(currentOptionProperties === null || currentOptionProperties === void 0 ? void 0 : currentOptionProperties.defaultValue)
            ? [find(this.currentOptions, { id: Number(currentOptionProperties.defaultValue) })]
            : [];
    }
    openOptionsEditor() {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.selection-field-options-editor.title'),
            content: SelectionFieldOptionsEditorComponent,
            data: {
                existingOptions: this.currentOptions,
                isReadOnly: this.options.isReadOnly
            }
        })
            .then((response) => {
            var _a;
            this.value = {
                defaultValue: (_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue,
                optionNamesById: response.optionNamesById,
                optionLabelsById: response.optionLabelsById
            };
            setTimeout(() => {
                this.validateDefaultValue();
            });
        })
            .catch(noop);
    }
    fetchValue(options) {
        var _a;
        const optionNamesById = {};
        const optionKeysById = {};
        forEach(options, (option) => {
            optionNamesById[option.id] = option.name;
        });
        forEach(options, (option) => {
            optionKeysById[option.id] = option.stringKey;
        });
        return { defaultValue: (_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue, optionNamesById, optionLabelsById: optionKeysById };
    }
    validateDefaultValue() {
        var _a;
        if (!isNil((_a = this.value) === null || _a === void 0 ? void 0 : _a.defaultValue) && !find(this.currentOptions, { id: this.value.defaultValue })) {
            this.defaultOption = [];
            this.value = Object.assign(Object.assign({}, this.value), { defaultValue: null });
        }
    }
    onSelectionChange(event) {
        var _a, _b;
        this.value = Object.assign(Object.assign({}, this.value), { defaultValue: (_b = (_a = event.options[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null });
    }
    focus() {
        this.adaptButtonComponent.elem.nativeElement.focus();
        this.openOptionsEditor();
    }
    optionFormatter(option) {
        return option.name;
    }
    removeOption(option) {
        pullAllBy(this.currentOptions, [option], 'id');
        this.validateDefaultValue();
        this.value = this.fetchValue(this.currentOptions);
    }
}
SelectionFieldOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsComponent, deps: [{ token: i1.RxModalService }, { token: i4$1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
SelectionFieldOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SelectionFieldOptionsComponent, selector: "rx-selection-field-options", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectionFieldOptionsComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptButtonComponent", first: true, predicate: AdaptButtonComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex\">\n  <adapt-rx-control-label\n    label=\"{{ 'com.bmc.arsys.rx.client.common.options.label' | translate }}\"\n    [showRequiredLabel]=\"true\"\n  >\n  </adapt-rx-control-label>\n\n  <adapt-button btn-type=\"tertiary\" class=\"d-icon-left-pencil p-0 ml-auto\" (click)=\"openOptionsEditor()\"\n    >{{ 'com.bmc.arsys.rx.client.common.edit.label' | translate }}\n  </adapt-button>\n</div>\n\n<div class=\"form-group tags-wrapper\">\n  <adapt-tag\n    [removable]=\"true\"\n    (remove)=\"removeOption(option)\"\n    *ngFor=\"let option of currentOptions\"\n    [type]=\"'active'\"\n    [disabled]=\"options.isReadOnly\"\n  >\n    {{ option.name }}</adapt-tag\n  >\n\n  <div class=\"fade-line position-absolute w-100 text-center\">\n    <span class=\"d-icon-ellipsis_horizontal\"></span>\n  </div>\n</div>\n\n<adapt-rx-select\n  label=\"{{ 'com.bmc.arsys.rx.client.common.default-value.label' | translate }}\"\n  [options]=\"currentOptions\"\n  (onSelectionChange)=\"onSelectionChange($event)\"\n  [(ngModel)]=\"defaultOption\"\n  [optionFormatter]=\"optionFormatter\"\n  [emptyOption]=\"true\"\n  *ngIf=\"!options.hideDefaultValue\"\n  [disabled]=\"options.isReadOnly\"\n>\n</adapt-rx-select>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.tags-wrapper{max-height:140px;position:relative;overflow:hidden}.tags-wrapper .fade-line{top:115px;left:0;height:2rem;z-index:1;background-image:linear-gradient(0deg,white 50%,rgba(255,255,255,0));transition:opacity .25s var(--ease-transition-in-out)}.tags-wrapper .fade-line .d-icon-ellipsis_horizontal:before{position:absolute;bottom:1px}\n"], components: [{ type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$1.AdaptTagComponent, selector: "adapt-tag", inputs: ["type", "removable", "disabled"], outputs: ["remove"] }, { type: i1$1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SelectionFieldOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-selection-field-options',
                    templateUrl: './selection-field-options.component.html',
                    styleUrls: ['./selection-field-options.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectionFieldOptionsComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i4$1.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }], adaptButtonComponent: [{
                type: ViewChild,
                args: [AdaptButtonComponent]
            }] } });

class RxSelectionFieldOptionsModule {
}
RxSelectionFieldOptionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxSelectionFieldOptionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent], imports: [AdaptAccordionModule,
        AdaptButtonModule,
        AdaptRxCounterModule,
        AdaptRxLabelModule,
        AdaptRxSelectModule,
        AdaptRxTextfieldModule,
        AdaptTagModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        AdaptAlertModule,
        AdaptRxValidatorsModule], exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent] });
RxSelectionFieldOptionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, imports: [[
            AdaptAccordionModule,
            AdaptButtonModule,
            AdaptRxCounterModule,
            AdaptRxLabelModule,
            AdaptRxSelectModule,
            AdaptRxTextfieldModule,
            AdaptTagModule,
            CommonModule,
            FormsModule,
            TranslateModule,
            AdaptAlertModule,
            AdaptRxValidatorsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxSelectionFieldOptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptAccordionModule,
                        AdaptButtonModule,
                        AdaptRxCounterModule,
                        AdaptRxLabelModule,
                        AdaptRxSelectModule,
                        AdaptRxTextfieldModule,
                        AdaptTagModule,
                        CommonModule,
                        FormsModule,
                        TranslateModule,
                        AdaptAlertModule,
                        AdaptRxValidatorsModule
                    ],
                    declarations: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                    exports: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent],
                    entryComponents: [SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent]
                }]
        }] });

class RxUnknownApplicationComponent {
    constructor(rxGlobalCacheService, rxCurrentUserService, rxAngularApplicationService, title) {
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxAngularApplicationService = rxAngularApplicationService;
        this.title = title;
        this.applications$ = this.rxGlobalCacheService.getBundleDescriptors().pipe(switchMap((bundleDescriptors) => {
            const applicationBundleDescriptors = filter(bundleDescriptors, { isApplication: true, isLicensed: true });
            remove(applicationBundleDescriptors, { id: RX_APPLICATION.settingsBundleId });
            if (!this.rxCurrentUserService.isAdministrator()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.dataloadBundleId });
            }
            if (!this.rxCurrentUserService.isAdministrator() && !this.rxCurrentUserService.isBusinessAnalyst()) {
                remove(applicationBundleDescriptors, { id: RX_APPLICATION.innovationStudioBundleId });
            }
            const applications = sortBy(applicationBundleDescriptors, (bundleDescriptor) => bundleDescriptor.friendlyName).map((app) => this.rxAngularApplicationService.isAngularJsApplication(app.id).pipe(map((isAngularJsApplication) => {
                let url;
                if (app.hasCustomEntryPoint && app.id !== RX_APPLICATION.innovationStudioBundleId) {
                    url = `/${app.id}/index.html`;
                }
                else if (isAngularJsApplication) {
                    url = `/innovationsuite/index.html#/${app.id}`;
                }
                else {
                    url = `/helix/index.html#/${app.id}`;
                }
                return {
                    id: app.id,
                    friendlyName: app.friendlyName,
                    url
                };
            })));
            return forkJoin(applications);
        }), tap(() => {
            this.title.setTitle('Helix');
            this.rxGlobalCacheService.applicationId = 'unknown-application';
        }));
    }
}
RxUnknownApplicationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationComponent, deps: [{ token: i1$2.RxGlobalCacheService }, { token: i1$2.RxCurrentUserService }, { token: i1$2.RxAngularApplicationService }, { token: i2$2.Title }], target: i0.ɵɵFactoryTarget.Component });
RxUnknownApplicationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxUnknownApplicationComponent, selector: "rx-unknown-application", ngImport: i0, template: "<h3>\n  The page you are trying to reach does not exist. Please open one of the applications below and bookmark it for future\n  reference.\n</h3>\n<ul>\n  <li *ngFor=\"let app of applications$ | async\">\n    <a [href]=\"app.url\">{{ app.friendlyName }}</a>\n  </li>\n</ul>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{color:#7c7f81;padding:20px}:host h3{padding-left:20px}\n"], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-unknown-application',
                    templateUrl: './unknown-application.component.html',
                    styleUrls: ['./unknown-application.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxGlobalCacheService }, { type: i1$2.RxCurrentUserService }, { type: i1$2.RxAngularApplicationService }, { type: i2$2.Title }]; } });

class RxUnknownApplicationModule {
}
RxUnknownApplicationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxUnknownApplicationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationModule, declarations: [RxUnknownApplicationComponent], imports: [CommonModule], exports: [RxUnknownApplicationComponent] });
RxUnknownApplicationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxUnknownApplicationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxUnknownApplicationComponent],
                    imports: [CommonModule],
                    exports: [RxUnknownApplicationComponent]
                }]
        }] });

class LocalizedCharacterFieldValueModalComponent extends RxModalClass {
    constructor(activeModalRef, rxLocaleService, rxLocalizationService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxLocaleService = rxLocaleService;
        this.rxLocalizationService = rxLocalizationService;
        this.injector = injector;
        this.isCurrentLocaleSupported = true;
        this.data = this.activeModalRef.getData();
        this.isReadOnly = this.data.isReadOnly;
    }
    isDirty() {
        return this.localeForm.dirty;
    }
    ngOnInit() {
        super.ngOnInit();
        this.init();
    }
    init() {
        this.currentLocaleCode = this.rxLocalizationService.currentLocale;
        this.valueByLocale = this.data.valueByLocale || {};
        this.fieldDefinition = this.data.fieldDefinition || {};
        this.maxLength = this.fieldDefinition.maxLength || null;
        this.getLocalesSubscription = this.rxLocaleService.getLocales().subscribe(({ data }) => {
            const browserLocale = {
                name: 'Browser - Locale',
                code: this.currentLocaleCode,
                value: this.valueByLocale[this.currentLocaleCode]
            };
            this.locales = data.map((locale) => {
                const localeCode = locale[RX_RECORD_DEFINITION.supportedSystemLocales.codeFieldId];
                return {
                    name: locale[RX_RECORD_DEFINITION.supportedSystemLocales.nameFieldId],
                    code: localeCode,
                    value: this.valueByLocale[localeCode] || null
                };
            });
            this.defaultLocale = {
                name: 'English - United States',
                code: 'en-US',
                value: this.valueByLocale['en-US']
            };
            this.currentLocale = this.locales.find((locale) => {
                return locale.code.toLowerCase() === this.currentLocaleCode.toLowerCase();
            });
            if (!this.currentLocale || this.currentLocale.code === this.defaultLocale.code) {
                this.currentLocale = browserLocale;
                this.isCurrentLocaleSupported = false;
            }
            this.gridLocales = flow((locales) => reject(locales, { code: this.defaultLocale.code }), (locales) => reject(locales, (locale) => {
                return !this.data.hideCurrentLocale && locale.code === this.currentLocale.code;
            }))(this.locales);
        });
    }
    ok() {
        if (this.isCurrentLocaleSupported) {
            this.valueByLocale[this.currentLocale.code] = this.currentLocale.value;
        }
        this.activeModalRef.close({
            currentLocaleValue: (this.currentLocale.code === this.defaultLocale.code && this.valueByLocale[this.defaultLocale.code]) ||
                this.valueByLocale[this.currentLocale.code] ||
                this.valueByLocale[this.currentLocale.code.split('-')[0]] ||
                this.valueByLocale[this.defaultLocale.code],
            valueByLocale: mapValues(this.valueByLocale, (value) => value || null)
        });
    }
    close() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
LocalizedCharacterFieldValueModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldValueModalComponent, deps: [{ token: i1$1.ActiveModalRef }, { token: i3.RxLocaleService }, { token: i1$2.RxLocalizationService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
LocalizedCharacterFieldValueModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: LocalizedCharacterFieldValueModalComponent, selector: "rx-localized-character-field-value-modal", viewQueries: [{ propertyName: "localeForm", first: true, predicate: ["localeForm"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body\">\n  <form name=\"localeForm\" novalidate #localeForm=\"ngForm\">\n    <rx-busy-indicator [options]=\"{ busy: getLocalesSubscription }\"></rx-busy-indicator>\n\n    <div class=\"flex-container row\" *ngIf=\"!data.hideCurrentLocale && currentLocale\">\n      <div class=\"col-4\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.current-locale.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-name\">{{ currentLocale?.name }}</div>\n      </div>\n\n      <div class=\"col-2\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n          }}\"\n        >\n        </adapt-rx-control-label>\n        <div class=\"rx-locale-name\" rx-id=\"current-locale-code\">{{ currentLocale?.code }}</div>\n      </div>\n\n      <div class=\"col-6\">\n        <adapt-rx-control-label\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n          }}\"\n          [tooltip]=\"{\n            iconName: 'question_circle_o',\n            content:\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.tooltip'\n              | translate,\n            placement: 'auto',\n            popoverMode: true\n          }\"\n        >\n        </adapt-rx-control-label>\n\n        <adapt-rx-textfield\n          name=\"current-locale\"\n          rx-id=\"current-locale-value\"\n          [disabled]=\"!isCurrentLocaleSupported || isReadOnly\"\n          [maxlength]=\"maxLength\"\n          [(ngModel)]=\"currentLocale.value\"\n          [ariaLabel]=\"\n            'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-current-locale.label'\n              | translate\n          \"\n        >\n        </adapt-rx-textfield>\n      </div>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"row\">\n        <div class=\"col-4\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.default-locale.label'\n                | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-name\">{{ defaultLocale?.name }}</div>\n        </div>\n\n        <div class=\"col-2\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <div class=\"rx-locale-name\" rx-id=\"default-locale-code\">{{ defaultLocale?.code }}</div>\n        </div>\n\n        <div class=\"col-6\">\n          <adapt-rx-control-label\n            label=\"{{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value.label' | translate\n            }}\"\n          >\n          </adapt-rx-control-label>\n\n          <adapt-rx-textfield\n            name=\"default-locale\"\n            rx-id=\"default-locale-value\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[defaultLocale?.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.value-for-default-locale.label'\n                | translate\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"rx-locale-table container\" *ngIf=\"gridLocales?.length > 0\">\n      <div class=\"rx-locale-table-row row\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.locale.label' | translate }}*\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell pl-2 col-2\">\n          <h6>\n            {{ 'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.code.label' | translate }}\n          </h6>\n        </div>\n\n        <div class=\"rx-locale-table-cell col-6\">\n          <h6>\n            {{\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value.label'\n                | translate\n            }}\n          </h6>\n        </div>\n      </div>\n\n      <div class=\"rx-locale-table-row row\" *ngFor=\"let locale of gridLocales\">\n        <div class=\"rx-locale-table-cell pl-0 col-4\">{{ locale.name }}</div>\n        <div class=\"rx-locale-table-cell pl-2 col-2\">{{ locale.code }}</div>\n        <div class=\"rx-locale-table-cell pr-0 col-6\">\n          <adapt-rx-textfield\n            name=\"localized-value {{ locale.code }}\"\n            [maxlength]=\"maxLength\"\n            [(ngModel)]=\"valueByLocale[locale.code]\"\n            [disabled]=\"isReadOnly\"\n            [ariaLabel]=\"\n              'com.bmc.arsys.rx.client.view-components.localized-character-field.dialog.localized-value-for.label'\n                | translate: { locale: locale.name }\n            \"\n          >\n          </adapt-rx-textfield>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"localeForm.pristine || localeForm.invalid\"\n    (click)=\"ok()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"close()\" rx-id=\"cancel-button\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.flex-container{margin-bottom:15px}.flex-container .rx-locale-name{line-height:3}.flex-container .d-textfield__item{color:#959899;display:block;padding-bottom:10px;font-size:14px;line-height:1}.rx-locale-table{border:1px solid #d6d7d8;border-bottom:0;width:100%}.rx-locale-table .rx-locale-table-row{border-bottom:1px solid #d6d7d8;padding:5px;min-height:35px}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell{line-height:3}.rx-locale-table .rx-locale-table-row .rx-locale-table-cell h6{margin:0;line-height:2rem;color:#959899}:host::ng-deep .form-group{margin-bottom:0}\n"], components: [{ type: i1.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i1$1.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i1$1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1$1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i4$1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: LocalizedCharacterFieldValueModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-localized-character-field-value-modal',
                    templateUrl: './localized-character-field-value-modal.component.html',
                    styleUrls: ['./localized-character-field-value-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveModalRef }, { type: i3.RxLocaleService }, { type: i1$2.RxLocalizationService }, { type: i0.Injector }]; }, propDecorators: { localeForm: [{
                type: ViewChild,
                args: ['localeForm']
            }] } });

class RxLocalizedCharacterFieldValueModalModule {
}
RxLocalizedCharacterFieldValueModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxLocalizedCharacterFieldValueModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, declarations: [LocalizedCharacterFieldValueModalComponent], imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AdaptRxFormControlModule,
        AdaptRxTextfieldModule,
        AdaptButtonModule,
        RxBusyIndicatorModule,
        TranslateModule], exports: [LocalizedCharacterFieldValueModalComponent] });
RxLocalizedCharacterFieldValueModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, imports: [[
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            AdaptRxFormControlModule,
            AdaptRxTextfieldModule,
            AdaptButtonModule,
            RxBusyIndicatorModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLocalizedCharacterFieldValueModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        CommonModule,
                        ReactiveFormsModule,
                        AdaptRxFormControlModule,
                        AdaptRxTextfieldModule,
                        AdaptButtonModule,
                        RxBusyIndicatorModule,
                        TranslateModule
                    ],
                    declarations: [LocalizedCharacterFieldValueModalComponent],
                    exports: [LocalizedCharacterFieldValueModalComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AdminSettingsComponent, AdminSettingsModule, AssignmentExpressionListFormControlComponent, AssignmentExpressionListFormControlModule, AssignmentExpressionListTargetFieldType, AttachmentFormControlComponent, AttachmentFormControlModule, BooleanFormControlComponent, BooleanFormControlModule, ColorPickerFormControlComponent, ColorPickerFormControlModule, CounterFormControlComponent, CounterFormControlModule, CustomizationOptionsComponent, CustomizationOptionsModule, DateFormControlComponent, DateFormControlModule, DateTimeFormControlComponent, DateTimeFormControlModule, DefinitionPickerOrExpressionFormControlComponent, DefinitionPickerOrExpressionFormControlModule, ExpressionEditorComponent, ExpressionEditorModule, ExpressionFormControlComponent, ExpressionFormControlModule, ExpressionInspectorControlComponent, ExpressionInspectorControlModule, FormBuilderComponent, FormControlsModule, GroupButtonFormControlComponent, GroupButtonFormControlModule, IconBrowserDialogComponent, IconBrowserDialogModule, IconPickerFormControlComponent, IconPickerFormControlModule, InputListFormControlComponent, InputListFormControlModule, InspectorControlBase, InspectorDirective, InspectorWidgetBase, LabelFormControlComponent, LabelFormControlModule, ListFormControlComponent, ListFormControlModule, LocalizedCharacterFieldValueModalComponent, MessageType, OptionalExpressionControlComponent, OptionalExpressionControlModule, OptionalExpressionInspectorControlComponent, OptionalExpressionInspectorControlModule, OptionalSelectFormControlComponent, OptionalSelectFormControlModule, RX_DEFINITION_PICKER, RX_DESIGNER_CANVAS, RX_EXPRESSION_EDITOR, RX_GAINSIGHT, RX_REVERT_CUSTOMIZATION, RX_SELECT_EXPRESSION_DROPDOWN, RX_VALIDATION_FORM_CONTROL, RadioFormControlComponent, RadioFormControlModule, RecordInstanceFormControlComponent, RecordInstanceFormControlModule, RenameDefinitionModalComponent, RenameDefinitionModalModule, RxApplicationContext, RxBooleanComponent, RxBooleanModule, RxDefinitionPickerCacheService, RxDefinitionPickerComponent, RxDefinitionPickerModule, RxDefinitionPickerScope, RxDefinitionPickerType, RxDesignerCanvasComponent, RxDesignerCanvasModule, RxDesignerHeaderComponent, RxDesignerHeaderModule, RxDesignerPaletteComponent, RxDesignerPaletteModule, RxDynamicComponentRendererComponent, RxDynamicComponentRendererModule, RxErrorPageComponent, RxErrorPageModule, RxExpressionEditorService, RxFormBuilderModule, RxGainsightConfiguratorService, RxGainsightUserPreferencesService, RxIframeComponent, RxIframeModule, RxIframeService, RxInnovationStudioShellComponent, RxInspectorModule, RxIssueReporterModule, RxIssueReporterService, RxLocalizedCharacterFieldValueModalModule, RxPermissionEditorComponent, RxPermissionEditorDialogComponent, RxPermissionEditorModule, RxRevertCustomizationComponent, RxRevertCustomizationModule, RxSearchComponent, RxSearchModule, RxSelectExpressionDropdownComponent, RxSelectExpressionDropdownModule, RxSelectWithPaginationComponent, RxSelectWithPaginationModule, RxSelectionFieldOptionsModule, RxShellComponent, RxShellModule, RxUnknownApplicationComponent, RxUnknownApplicationModule, RxUserAvailabilityModule, RxUserPreferencesModule, RxWizardModalComponent, RxWizardModule, RxWizardService, SelectFormControlComponent, SelectFormControlModule, SelectionFieldOptionsComponent, SelectionFieldOptionsEditorComponent, ShellBase, StepperWithUnitsFormControlComponent, StepperWithUnitsFormControlModule, SwitchFormControlComponent, SwitchFormControlModule, TagsFormControlComponent, TextFormControlComponent, TextFormControlModule, TextareaFormControlComponent, TextareaFormControlModule, TimeFormControlComponent, TimeFormControlModule, ValidationFormControlComponent, ValidationFormControlModule, ValueAccessor };
//# sourceMappingURL=helix-platform-shared-components.js.map
