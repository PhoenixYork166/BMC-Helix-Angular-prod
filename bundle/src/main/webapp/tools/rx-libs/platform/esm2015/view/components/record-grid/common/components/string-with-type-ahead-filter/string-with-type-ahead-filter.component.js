import { Component, Input } from '@angular/core';
import { AdaptFilterControlsComponent } from '@bmc-ux/adapt-angular';
import { RxNamedListDefinitionService, RxNamedListService } from '@helix/platform/named-list/api';
import { RxFeatureService } from '@helix/platform/shared/api';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { RX_RECORD_GRID } from '../../../record-grid.constant';
import { RxRecordGridAdvancedFilterValue } from '../../types/record-grid-advanced-filter-value.class';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/named-list/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "../named-filter-options-list/named-filter-options-list.component";
import * as i4 from "@bmc-ux/adapt-angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@ngx-translate/core";
export class RxStringWithTypeAheadFilterComponent {
    constructor(rxNamedListService, rxNamedListDefinitionService, rxFeatureService) {
        this.rxNamedListService = rxNamedListService;
        this.rxNamedListDefinitionService = rxNamedListDefinitionService;
        this.rxFeatureService = rxFeatureService;
        this.namedFilterOptions = [];
        this.selectedValues = [];
        this.isSearchInProgress = false;
        this.search = (text$) => text$.pipe(debounceTime(250), distinctUntilChanged(), tap(() => {
            this.isSearchInProgress = true;
        }), switchMap((term) => this.getSelectOptions(term)), finalize(() => {
            this.isSearchInProgress = false;
        }));
    }
    set filterValue(values) {
        this._filterValue = values;
        this.selectedValues = (values === null || values === void 0 ? void 0 : values.filterValue) || [];
    }
    get filterValue() {
        return this._filterValue;
    }
    ngOnInit() {
        var _a;
        this.namedListDefinition$ = this.rxNamedListDefinitionService
            .get(this.filterOption.data.namedListDefinition)
            .pipe(shareReplay(1));
        this.typeaheadKeystrokeCount =
            (_a = this.filterOption.data.typeaheadKeystrokeCount) !== null && _a !== void 0 ? _a : RX_RECORD_GRID.defaultTypeaheadKeystrokeCount;
    }
    onValueChange(selectedValues) {
        var _a;
        this.filterControlsComponent.onFilterOptionModelChange(new RxRecordGridAdvancedFilterValue(selectedValues.map((selectedValue) => this.rxNamedListService.isNamedListOption(selectedValue)
            ? selectedValue
            : { displayValue: undefined, value: selectedValue, title: '', contextualFields: [] }), (_a = this.filterValue) === null || _a === void 0 ? void 0 : _a.namedOptions));
    }
    getSelectOptions(term) {
        return term.length >= this.typeaheadKeystrokeCount
            ? this.namedListDefinition$.pipe(switchMap((namedListDefinition) => this.rxNamedListService
                .getOptionPageByLabelOrValue(namedListDefinition, term, this.filterOption.data.additionalQueryCriteria)
                .pipe(map((optionPage) => optionPage.options))))
            : of([]);
    }
}
RxStringWithTypeAheadFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterComponent, deps: [{ token: i1.RxNamedListService }, { token: i1.RxNamedListDefinitionService }, { token: i2.RxFeatureService }], target: i0.ɵɵFactoryTarget.Component });
RxStringWithTypeAheadFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxStringWithTypeAheadFilterComponent, selector: "rx-string-with-type-ahead-filter", inputs: { filterOption: "filterOption", filterControlsComponent: "filterControlsComponent", filterValue: "filterValue", namedFilterOptions: "namedFilterOptions" }, ngImport: i0, template: "<rx-named-filter-options-list\n  *ngIf=\"namedFilterOptions?.length\"\n  [namedFilterOptions]=\"namedFilterOptions\"\n  [filterOption]=\"filterOption\"\n  [filterValue]=\"filterValue\"\n  [filterControlsComponent]=\"filterControlsComponent\"\n></rx-named-filter-options-list>\n\n<div style=\"position: relative\">\n  <adapt-tag-field\n    [search]=\"search\"\n    [ngModel]=\"selectedValues\"\n    (ngModelChange)=\"onValueChange($event)\"\n    [replaceModelOnWrite]=\"true\"\n    [selectItemTemplate]=\"selectItemTemplate\"\n    [tagTemplate]=\"tagTemplate\"\n    [openDropdownOnFocus]=\"typeaheadKeystrokeCount === 0\"\n    [placeholder]=\"'com.bmc.arsys.rx.client.view-components.record-grid.filters.typeahead.placeholder' | translate\"\n  ></adapt-tag-field>\n  <div *ngIf=\"isSearchInProgress\" class=\"position-absolute text-info inline-loader\">\n    <div class=\"d-icon-circle_75_o animated infinite spin-360 transition-out slow\"></div>\n  </div>\n</div>\n\n<ng-template #tagTemplate let-tag=\"tag\">\n  {{ tag.displayValue ?? tag.value }}\n</ng-template>\n\n<ng-template #selectItemTemplate let-result=\"result\">\n  {{ result.displayValue ?? result.value }}\n\n  <div\n    *ngIf=\"result.contextualFields\"\n    class=\"text-secondary selection-item-contextual-fields text-truncate\"\n    [title]=\"result.title\"\n  >\n    <span class=\"breadcrumb-item active\" *ngFor=\"let contextualFieldValue of result.contextualFields\">\n      <small> {{ contextualFieldValue }} </small>\n    </span>\n  </div>\n</ng-template>\n", styles: [".inline-loader{z-index:10;right:15px;top:8px}.selection-item-contextual-fields{max-width:300px}\n"], components: [{ type: i3.RxNamedFilterOptionsListComponent, selector: "rx-named-filter-options-list", inputs: ["namedFilterOptions", "filterOption", "filterValue", "filterControlsComponent", "defaultFilterValue"], outputs: ["namedFilterOptionsChange"] }, { type: i4.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i7.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxStringWithTypeAheadFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-string-with-type-ahead-filter',
                    templateUrl: './string-with-type-ahead-filter.component.html',
                    styleUrls: ['./string-with-type-ahead-filter.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNamedListService }, { type: i1.RxNamedListDefinitionService }, { type: i2.RxFeatureService }]; }, propDecorators: { filterOption: [{
                type: Input
            }], filterControlsComponent: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], namedFilterOptions: [{
                type: Input
            }] } });
//# sourceMappingURL=string-with-type-ahead-filter.component.js.map