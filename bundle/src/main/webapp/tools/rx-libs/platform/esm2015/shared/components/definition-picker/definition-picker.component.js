import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdaptDropdownDirective, AdaptRxTextfieldComponent } from '@bmc-ux/adapt-angular';
import { RX_BUNDLE, RxBundleCacheService, RxDefinitionNameService, RxGlobalCacheService } from '@helix/platform/shared/api';
import { RxStringService } from '@helix/platform/utils';
import { find, get, throttle } from 'lodash';
import { of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ValueAccessor } from '../form-builder/value-accessor';
import { RxDefinitionPickerCacheService } from './definition-picker-cache.service';
import { RX_DEFINITION_PICKER, RxDefinitionPickerScope } from './definition-picker.types';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./definition-picker-cache.service";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
export class RxDefinitionPickerComponent extends ValueAccessor {
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
            .pipe(filter((isOpen) => Boolean(isOpen)), first(), takeUntil(this.destroyed$))
            .subscribe((isOpen) => {
            this.getDefinitions(this.definitionScopes[0]);
        });
        this.onPickerToggle$
            .pipe(filter((isOpen) => !isOpen), takeUntil(this.destroyed$))
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
RxDefinitionPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionPickerComponent, deps: [{ token: i0.Renderer2 }, { token: i1.RxBundleCacheService }, { token: i1.RxDefinitionNameService }, { token: i2.RxDefinitionPickerCacheService }, { token: i1.RxGlobalCacheService }, { token: i3.RxStringService }, { token: i4.TranslateService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RxDefinitionPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: { options: "options", isDisabled: "isDisabled" }, host: { listeners: { "window:resize": "onWindowResize()", "window:paste": "onPaste($event)", "window:keypress": "onKeypress($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxDefinitionPickerComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "dropdownButton", first: true, predicate: ["dropdownButton"], descendants: true, static: true }, { propertyName: "dropdownMenuHeader", first: true, predicate: ["dropdownMenuHeader"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["definitionPicker"], descendants: true, static: true }, { propertyName: "definitionTreeElementRef", first: true, predicate: ["definitionTree"], descendants: true }, { propertyName: "searchField", first: true, predicate: ["searchField"], descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<adapt-rx-control-label\n  [label]=\"options.label\"\n  [tooltip]=\"options.tooltip\"\n  [showRequiredLabel]=\"!!options.required\"\n></adapt-rx-control-label>\n\n<div\n  class=\"dropdown\"\n  adaptDropdown\n  appendToBody=\"true\"\n  [autoClose]=\"'outside'\"\n  (onOpen)=\"onPickerToggle$.next(true);setDropdownWidth()\"\n  (onClose)=\"onPickerToggle$.next(false)\"\n  [autoFocusFirst]=\"false\"\n  #definitionPicker=\"adaptDropdown\"\n>\n  <button\n    rx-id=\"toggle-button\"\n    #dropdownButton\n    class=\"btn btn-secondary\"\n    adaptDropdownToggle\n    type=\"button\"\n    [disabled]=\"isDisabled\"\n  >\n    <span class=\"rx-selected-item\" [title]=\"value || ''\">\n      {{ (value | rxDefinitionNamePipe) || config.texts.placeholder }}\n    </span>\n\n    <span\n      rx-id=\"clear-button\"\n      class=\"d-icon-cross_adapt btn-link\"\n      (click)=\"clearDefinition($event)\"\n      *ngIf=\"value && !isDisabled\"\n    >\n    </span>\n  </button>\n\n  <div class=\"dropdown-menu\" [style.width.px]=\"dropdownWidth\" adaptDropdownMenu>\n    <div class=\"rx-dropdown-panel-header\" [ngClass]=\"searchMode ? 'pl-1' : 'pr-1'\">\n      <div class=\"d-flex\" *ngIf=\"!searchMode; else searchControls\" #dropdownMenuHeader>\n        <div class=\"btn-group bundle-btn-group\">\n          <button\n            type=\"button\"\n            adapt-button\n            *ngFor=\"let definitionScope of definitionScopes\"\n            class=\"rx-header-button\"\n            [btn-type]=\"activeDefinitionScope === definitionScope ? 'primary' : 'secondary'\"\n            size=\"xtra-small\"\n            (click)=\"getDefinitions(definitionScope)\"\n          >\n            <span>{{ definitionScope === 'bundle' ? (currentBundleFriendlyName$ | async) : allDefinitionsLabel }}</span>\n          </button>\n        </div>\n\n        <button\n          type=\"button\"\n          rx-id=\"search-button\"\n          class=\"d-icon-search btn btn-sm btn-link ml-1\"\n          *ngIf=\"!searchMode\"\n          (click)=\"$event.stopPropagation(); enableSearchMode()\"\n        ></button>\n      </div>\n    </div>\n\n    <ul #definitionTree class=\"rx-bundles\" *ngIf=\"dropdownWidth && bundles$ | async as bundles; else busyLoader\">\n      <adapt-empty-state\n        class=\"d-block mt-5\"\n        *ngIf=\"!bundles.length\"\n        type=\"search\"\n        [label]=\"config.texts.noDefinitionsFound\"\n      ></adapt-empty-state>\n\n      <li\n        class=\"rx-bundle\"\n        *ngFor=\"let bundle of bundles; trackBy: trackByBundle\"\n        (click)=\"bundle.isExpanded = !bundle.isExpanded\"\n      >\n        <span\n          rx-id=\"expand-bundle-button\"\n          class=\"expand-arrow d-icon-angle_right\"\n          [class.open]=\"bundle.isExpanded\"\n        ></span>\n\n        <adapt-highlight [result]=\"bundle.name\" [term]=\"searchQuery\"></adapt-highlight>\n\n        <div class=\"rx-definitions\" *ngIf=\"bundle.isExpanded\">\n          <button\n            class=\"dropdown-item\"\n            (click)=\"$event.stopPropagation(); selectDefinition(definition.name)\"\n            *ngFor=\"let definition of bundle.definitions; trackBy: trackByDefinition\"\n            [class.active]=\"value === definition.name\"\n            [title]=\"definition.name\"\n            type=\"button\"\n          >\n            <span *ngIf=\"!definition.isPublic\">* </span>\n\n            <adapt-highlight [result]=\"definition.displayName\" [term]=\"searchQuery\"></adapt-highlight>\n          </button>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<ng-template #busyLoader>\n  <rx-busy-indicator></rx-busy-indicator>\n</ng-template>\n\n<ng-template #searchControls>\n  <button\n    type=\"button\"\n    rx-id=\"back-button\"\n    class=\"d-icon-arrow_left btn btn-sm btn-link mr-1\"\n    (click)=\"$event.stopPropagation(); disableSearchMode()\"\n  ></button>\n\n  <adapt-rx-textfield\n    #searchField\n    (ngModelChange)=\"search($event)\"\n    [autofocus]=\"true\"\n    [(ngModel)]=\"searchQuery\"\n    size=\"sm\"\n  ></adapt-rx-textfield>\n</ng-template>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-dropdown-panel-header{border-bottom:1px solid #d6d7d8;display:flex;align-items:center;padding:0 10px;width:100%;height:50px;margin-top:-5px}.bundle-btn-group{max-width:calc(100% - 38px)}.rx-header-button{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rx-header-button.btn-primary{display:revert}adapt-rx-textfield{flex-grow:1;align-items:center;margin:0}.expand-arrow{padding:5px;transition:.2s}.expand-arrow.open{transform:rotate(90deg)}.rx-bundle{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 5px;line-height:30px;cursor:pointer}.rx-bundle ::ng-deep mark{padding:0}.rx-bundles{overflow-y:auto;margin:0;list-style:none;padding:5px 0;width:100%;height:275px}span[rx-id=clear-button]{cursor:pointer;margin-right:5px}span[rx-id=clear-button]:not(:hover){color:#313538}span[rx-id=search-button]{cursor:pointer;padding-left:10px}span[rx-id=search-button]:not(:hover){color:#313538}span[rx-id=back-button]{cursor:pointer;padding-right:10px}span[rx-id=back-button]:not(:hover){color:#313538}span[rx-id=expand-bundle-button]{display:inline-flex;width:15px}.rx-selected-item{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-menu{height:330px!important}.dropdown-toggle{width:100%;display:flex;text-align:left}.dropdown-item{white-space:nowrap;overflow:hidden;padding:0 15px 0 30px;text-overflow:ellipsis}\n"], components: [{ type: i5.AdaptRxControlLabelComponent, selector: "adapt-rx-control-label", inputs: ["for", "id", "label", "subLabel", "requiredLabel", "showRequiredLabel", "tooltip", "testID"] }, { type: i5.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i5.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i5.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i5.AdaptHighlightDirective, selector: "adapt-highlight, ngb-highlight", inputs: ["highlightClass", "result", "term"], outputs: ["wordMatch"] }, { type: i6.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i5.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }], directives: [{ type: i5.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "rxDefinitionNamePipe": i1.RxDefinitionNamePipe, "async": i7.AsyncPipe } });
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
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.RxBundleCacheService }, { type: i1.RxDefinitionNameService }, { type: i2.RxDefinitionPickerCacheService }, { type: i1.RxGlobalCacheService }, { type: i3.RxStringService }, { type: i4.TranslateService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
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
//# sourceMappingURL=definition-picker.component.js.map