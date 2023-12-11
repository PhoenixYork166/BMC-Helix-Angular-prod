import { ChangeDetectionStrategy, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, fromEvent, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER } from '@angular/cdk/keycodes';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { isNumber } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class IconBrowserDialogComponent {
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
            .pipe(filter((event) => [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER].includes(event.keyCode)), tap((event) => event.preventDefault()), withLatestFrom(this.filteredIcons$, this.selectedIndex$), takeUntil(this.destroyed$))
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
IconBrowserDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogComponent, deps: [{ token: i1.ActiveModalRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
IconBrowserDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconBrowserDialogComponent, selector: "rx-icon-browser-dialog", viewQueries: [{ propertyName: "iconsList", first: true, predicate: ["iconsList"], descendants: true, read: ElementRef }, { propertyName: "iconButtons", predicate: ["iconButton"], descendants: true, read: ElementRef }], ngImport: i0, template: "<div class=\"modal-body mh-100\">\n  <div class=\"d-flex w-100 h-100\">\n    <ng-container *ngIf=\"filteredIcons$ | async as filteredIcons\">\n      <div class=\"w-100 h-100\">\n        <adapt-rx-search\n          class=\"icon-search-field\"\n          [formControl]=\"searchFormControl\"\n          [autofocus]=\"true\"\n          (keydown)=\"$event.stopPropagation()\"\n        ></adapt-rx-search>\n\n        <div class=\"icons-browser d-flex\">\n          <ul #iconsList class=\"icons-list h-100\" *ngIf=\"filteredIcons?.length; else noIconsFound\" tabindex=\"0\">\n            <li\n              *ngFor=\"let icon of filteredIcons; trackBy: trackByFn\"\n              class=\"icon-list-item\"\n              [class.icon-list-item-selected]=\"isIconSelected(icon)\"\n            >\n              <button\n                #iconButton\n                class=\"icon-button p-0\"\n                tabindex=\"-1\"\n                [ngClass]=\"'d-icon-' + icon.id\"\n                (click)=\"selectIcon(icon)\"\n              >\n                <span class=\"sr-only\">{{ icon.name }}</span>\n              </button>\n            </li>\n          </ul>\n\n          <ng-template #noIconsFound>\n            <div class=\"icon-empty-state flex-grow-1\">\n              <adapt-empty-state class=\"flex-grow-1\" [type]=\"'search'\" [label]=\"'No icons found'\"></adapt-empty-state>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"filteredIcons?.length\"\n        class=\"icon-preview d-flex flex-column justify-content-center align-items-center\"\n      >\n        <ng-container *ngIf=\"selectedIcon$ | async as selectedIcon; else noIconSelected\">\n          <adapt-icon [name]=\"selectedIcon.id\" [testID]=\"selectedIcon.id\"></adapt-icon>\n\n          <p class=\"icon-title mt-1 mb-0\">{{ selectedIcon.name }}</p>\n        </ng-container>\n\n        <ng-template #noIconSelected>\n          <p class=\"no-icon-selected mb-0\">No icon selected</p>\n        </ng-template>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    rx-id=\"select-button\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    [disabled]=\"isSelectButtonDisabled$ | async\"\n    (click)=\"onSelect()\"\n  >\n    Select\n  </button>\n\n  <button rx-id=\"cancel-button\" adapt-button btn-type=\"secondary\" type=\"button\" (click)=\"onCancel()\">Cancel</button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:645px;overflow:hidden}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.icons-browser{display:flex;height:calc(100% - 38px - 15px)}.icon-search-field{display:block;margin-bottom:15px;max-width:853px}.icons-list{display:flex;flex-wrap:wrap;align-content:flex-start;overflow-y:auto;flex-grow:1;list-style:none;padding:1px 0 0;margin:0}.icons-list:focus{outline:none;box-shadow:inset 0 0 0 .2rem #00a79da6}.icon-empty-state{display:flex;align-items:center}.icon-list-item{margin:-1px -1px 0 0}.icon-list-item-selected .icon-button{background:#d6d7d8}.icon-button{width:72px;height:72px;border:1px solid #d6d7d8;background:transparent;font-size:2rem;color:#313538}.icon-button:hover{background:#f0f1f1}.icon-preview{margin-left:15px;margin-top:53px;flex-shrink:0;text-align:center;width:142px;height:143px;border:1px solid #d6d7d8;padding:10px 0}.icon-preview adapt-icon{font-size:70px;line-height:70px}.icon-preview .icon-title{color:#626668;max-height:40px;overflow:hidden}.no-icon-selected{font-size:.875rem;color:#626668}\n"], components: [{ type: i1.AdaptRxSearchComponent, selector: "adapt-rx-search", inputs: ["mode", "autocomplete", "placeholder", "size", "searchButton", "searchButtonText", "clearButtonText", "debounceTime", "ariaControlsPopupId", "ariaActiveDescendant", "initialAlign"], outputs: ["editModeChange"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconBrowserDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-icon-browser-dialog',
                    templateUrl: './icon-browser-dialog.component.html',
                    styleUrls: ['./icon-browser-dialog.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { iconButtons: [{
                type: ViewChildren,
                args: ['iconButton', { read: ElementRef }]
            }], iconsList: [{
                type: ViewChild,
                args: ['iconsList', { read: ElementRef }]
            }] } });
//# sourceMappingURL=icon-browser-dialog.component.js.map