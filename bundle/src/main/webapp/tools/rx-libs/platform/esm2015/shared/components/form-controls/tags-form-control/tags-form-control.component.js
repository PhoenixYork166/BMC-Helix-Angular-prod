import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { AdaptMetatagComponent } from '@bmc-ux/adapt-angular';
import { isEmpty, isObject } from 'lodash';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RxStringService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@angular/forms";
export class TagsFormControlComponent extends ValueAccessor {
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
TagsFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: TagsFormControlComponent, deps: [{ token: i1.RxStringService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TagsFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: TagsFormControlComponent, selector: "rx-tags-form-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TagsFormControlComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "adaptTagField", first: true, predicate: ["adaptTagField"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-tag-field\n  #adaptTagField\n  [label]=\"options.label\"\n  [placeholder]=\"options.placeholder\"\n  [required]=\"options.required\"\n  [ngModel]=\"tags\"\n  [disabled]=\"isDisabled\"\n  [popoverContent]=\"options.tooltip?.content\"\n  [popoverIcon]=\"options.tooltip?.iconName\"\n  (ngModelChange)=\"onTagsModelChange($event)\"\n  [replaceModelOnWrite]=\"true\"\n  [delimiterSymbol]=\"null\"\n  [search]=\"autocompleteSearchBound\"\n  [openDropdownOnFocus]=\"true\"\n  [errorCheck]=\"options.errorCheck\"\n  (initTagEditing)=\"onInitTagEditing($event)\"\n>\n</adapt-tag-field>\n", styles: [":host ::ng-deep .adapt-mt-wrapper{padding-left:5px;padding-right:5px}\n"], components: [{ type: i2.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
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
        }], ctorParameters: function () { return [{ type: i1.RxStringService }, { type: i0.Renderer2 }]; }, propDecorators: { options: [{
                type: Input
            }], adaptTagField: [{
                type: ViewChild,
                args: ['adaptTagField', { static: true }]
            }] } });
//# sourceMappingURL=tags-form-control.component.js.map