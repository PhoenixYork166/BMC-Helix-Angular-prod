import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { DismissReasons, DockedPanelContext } from '@bmc-ux/adapt-angular';
import { RxSearchFiltersService } from '../search-filters.service';
import { RxModalClass, RxModalService, RX_MODAL } from '@helix/platform/ui-kit';
import { FormControl, FormGroup } from '@angular/forms';
import { AdaptValidators } from '@bmc-ux/adapt-angular';
import { debounceTime, distinctUntilChanged, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "../search-filters.service";
import * as i2 from "@bmc-ux/adapt-angular";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@angular/forms";
export class SearchFiltersEditorComponent extends RxModalClass {
    constructor(rxSearchFiltersService, dockedPanelContext, injector, rxNotificationService, translateService, rxModalService) {
        super(dockedPanelContext, injector);
        this.rxSearchFiltersService = rxSearchFiltersService;
        this.dockedPanelContext = dockedPanelContext;
        this.injector = injector;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.tagsOperators = ['OR', 'AND'];
        this.isEditMode = Boolean(this.dockedPanelContext.getData());
        this.tags$ = this.rxSearchFiltersService.getTags().pipe(shareReplay(1));
        this.searchFilterEditorFormGroup = new FormGroup({
            name: new FormControl('', AdaptValidators.required()),
            tagsOperator: new FormControl([], AdaptValidators.required()),
            tags: new FormControl([], AdaptValidators.required())
        });
        this.tagSuggestions = (text$) => text$.pipe(debounceTime(200), distinctUntilChanged(), withLatestFrom(this.tags$), map(([term, tags]) => tags.filter((tag) => tag.startsWith(term))));
    }
    ngOnInit() {
        if (this.isEditMode) {
            this.searchFilterEditorFormGroup.setValue({
                name: this.dockedPanelContext.getData().name,
                tagsOperator: [this.dockedPanelContext.getData().tagsOperator],
                tags: this.dockedPanelContext.getData().tags
            });
        }
    }
    save() {
        const { id } = this.dockedPanelContext.getData() || {};
        const [tagsOperator] = this.searchFilterEditorFormGroup.value.tagsOperator;
        const filter = Object.assign(Object.assign({ id }, this.searchFilterEditorFormGroup.getRawValue()), { tagsOperator });
        const operation = this.isEditMode
            ? this.rxSearchFiltersService.updateSearchFilter(filter)
            : this.rxSearchFiltersService.createSearchFilter(filter);
        operation.subscribe(() => {
            this.close();
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.common.saved-successfully.message'));
        });
    }
    close() {
        this.dockedPanelContext.close(DismissReasons.CLOSE_BTN);
    }
    cancel() {
        if (this.searchFilterEditorFormGroup.dirty) {
            this.rxModalService
                .confirm({
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                modalStyle: RX_MODAL.modalStyles.warning,
                message: this.translateService.instant('com.bmc.arsys.rx.client.common.unsaved-data.message')
            })
                .then((result) => {
                if (result) {
                    this.close();
                }
            });
        }
        else {
            this.close();
        }
    }
}
SearchFiltersEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersEditorComponent, deps: [{ token: i1.RxSearchFiltersService }, { token: i2.DockedPanelContext }, { token: i0.Injector }, { token: i3.RxNotificationService }, { token: i4.TranslateService }, { token: i5.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
SearchFiltersEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: SearchFiltersEditorComponent, selector: "rx-search-filters-editor", usesInheritance: true, ngImport: i0, template: "<div class=\"dp-body\">\n  <form [formGroup]=\"searchFilterEditorFormGroup\">\n    <div class=\"form-group\">\n      <adapt-rx-textfield\n        [formControlName]=\"'name'\"\n        [label]=\"'com.bmc.arsys.rx.client.admin.search-filters-editor.form-control.name.label' | translate\"\n      ></adapt-rx-textfield>\n    </div>\n\n    <div class=\"form-group\">\n      <adapt-rx-select\n        [formControlName]=\"'tagsOperator'\"\n        [options]=\"tagsOperators\"\n        [label]=\"'com.bmc.arsys.rx.client.admin.search-filters-editor.form-control.relationship.label' | translate\"\n        required\n      ></adapt-rx-select>\n    </div>\n\n    <div class=\"form-group\">\n      <adapt-tag-field\n        [formControlName]=\"'tags'\"\n        required\n        [suppressManual]=\"true\"\n        [label]=\"'com.bmc.arsys.rx.client.admin.search-filters-editor.form-control.tags.label' | translate\"\n        placeholder=\"\"\n        [search]=\"tagSuggestions\"\n        [openDropdownOnFocus]=\"true\"\n      ></adapt-tag-field>\n    </div>\n  </form>\n</div>\n\n<div class=\"dp-footer\">\n  <button\n    class=\"btn btn-primary mr-2\"\n    (click)=\"save()\"\n    [disabled]=\"this.searchFilterEditorFormGroup.invalid || !this.searchFilterEditorFormGroup.dirty\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button class=\"btn btn-secondary\" (click)=\"cancel()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i2.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i2.AdaptMetatagComponent, selector: "adapt-metatag, adapt-tag-field", inputs: ["prefix", "suffix", "maxTagLength", "truncateConfig", "id", "testID", "name", "ariaLabel", "search", "maxHeight", "suppressManual", "label", "placeholder", "mainErrorText", "warningStateText", "width", "errorCheck", "warningCheck", "selectItemTemplate", "tagTemplate", "replaceModelOnWrite", "delimiterSymbol", "popupClass", "disabledInput", "openDropdownOnFocus", "selectItemFormatter", "fullWidthEdit", "tagStyleFormatter"], outputs: ["focus", "blur", "removeTag", "addTag", "initTagEditing"] }], directives: [{ type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i4.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: SearchFiltersEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-search-filters-editor',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    templateUrl: './search-filters-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxSearchFiltersService }, { type: i2.DockedPanelContext }, { type: i0.Injector }, { type: i3.RxNotificationService }, { type: i4.TranslateService }, { type: i5.RxModalService }]; } });
//# sourceMappingURL=search-filters-editor.component.js.map