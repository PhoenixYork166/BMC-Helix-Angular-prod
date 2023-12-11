import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { noop, get, sortBy } from 'lodash';
import { AdaptModalService, AdaptRxTypeaheadComponent } from '@bmc-ux/adapt-angular';
import iconFontConfig from '@bmc-ux/dpl-iconfont/config/if_dpl.json';
import { RX_LEGACY_ICONS } from '@helix/platform/view/api';
import { IconBrowserDialogComponent } from './icon-browser-dialog/icon-browser-dialog.component';
import { ValueAccessor } from '../../form-builder/value-accessor';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
export class IconPickerFormControlComponent extends ValueAccessor {
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
IconPickerFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: IconPickerFormControlComponent, deps: [{ token: i1.AdaptModalService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
IconPickerFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: IconPickerFormControlComponent, selector: "rx-icon-picker-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: IconPickerFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "typeahead", first: true, predicate: AdaptRxTypeaheadComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"d-flex justify-content-between align-items-center pb-1\">\n  <label class=\"form-control-label mb-0\">{{ options.label }}</label>\n\n  <button\n    *ngIf=\"!isDisabled\"\n    adapt-button\n    type=\"button\"\n    class=\"p-0 border-0\"\n    btn-type=\"tertiary\"\n    rx-id=\"browse-button\"\n    (click)=\"openIconBrowserDialog()\"\n  >\n    <span class=\"d-icon-folder_open\"></span>\n    Browse\n  </button>\n</div>\n\n<div class=\"control-wrapper d-flex\">\n  <adapt-rx-typeahead\n    class=\"w-100\"\n    [class.has-selected-icon]=\"selectedIcon\"\n    rx-id=\"input-field\"\n    [required]=\"options.required\"\n    [disabled]=\"isDisabled\"\n    [appendToBody]=\"options.appendToBody\"\n    [typeahead]=\"search\"\n    [inputFormatter]=\"inputFormatter\"\n    [resultTemplate]=\"resultTemplate\"\n    [virtualScroll]=\"true\"\n    [(ngModel)]=\"selectedIcon\"\n    (onSelectItem)=\"onSelectItem($event)\"\n    (onFocus)=\"onFocus($event)\"\n    (onBlur)=\"onBlur()\"\n    [title]=\"selectedIcon?.name ?? ''\"\n  ></adapt-rx-typeahead>\n  <adapt-icon\n    *ngIf=\"selectedIcon\"\n    class=\"icon-preview\"\n    [name]=\"selectedIcon.id\"\n    [testID]=\"selectedIcon.id\"\n  ></adapt-icon>\n</div>\n\n<ng-template #resultTemplate let-result=\"result\">\n  <span class=\"icon-item\" [ngClass]=\"'d-icon-left-' + result.id\"></span>\n  {{ result.name }}\n</ng-template>\n", styles: [".icon-item{display:inline-block;width:22px;margin-right:4px;text-align:center}.control-wrapper{position:relative}.icon-preview{position:absolute;top:50%;left:17px;transform:translateY(-50%);pointer-events:none}::ng-deep adapt-rx-typeahead.has-selected-icon .form-control{padding-left:42px;padding-right:32px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptRxTypeaheadComponent, selector: "adapt-rx-typeahead", inputs: ["autocomplete", "placeholder", "editable", "focusFirst", "restoreFocusAfterClose", "inputFormatter", "typeahead", "resultFormatter", "resultTemplate", "showHint", "placement", "appendToBody", "size", "popupMaxHeight", "disabledStyleForReadonlyState", "virtualScroll", "virtualScrollItemSize", "minBufferPx", "maxBufferPx", "virtualScrollDropdownHeight", "popupClass", "popupWidth", "mobileFocusAutoscrollTopOffset", "showEmptyResultMessage", "resultStatusMessage", "showClearButton", "clearButtonText"], outputs: ["onSelectItem"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
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
        }], ctorParameters: function () { return [{ type: i1.AdaptModalService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], typeahead: [{
                type: ViewChild,
                args: [AdaptRxTypeaheadComponent, { static: true }]
            }] } });
//# sourceMappingURL=icon-picker-form-control.component.js.map