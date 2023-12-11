import { Component } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
export class RxFilterByCardSelectionDialogComponent {
    constructor(context, translateService) {
        this.context = context;
        this.translateService = translateService;
        this.alertConfig = {
            content: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid.cards.filter-by-selection.dialog.info.message'),
            type: 'section',
            dismissible: false,
            variant: 'info',
            icon: true
        };
        this.options = this.context.getData().filterableFields;
    }
    optionFormatter(option) {
        return option.name;
    }
    apply() {
        this.context.close(this.field[0].id);
    }
}
RxFilterByCardSelectionDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterByCardSelectionDialogComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RxFilterByCardSelectionDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxFilterByCardSelectionDialogComponent, selector: "rx-filter-by-card-selection", ngImport: i0, template: "<adapt-alert [config]=\"alertConfig\"></adapt-alert>\n\n<div class=\"modal-body pt-0\">\n  <adapt-rx-select\n    [label]=\"\n      'com.bmc.arsys.rx.client.view-components.record-grid.cards.filter-by-selection.dialog.field.label' | translate\n    \"\n    [options]=\"options\"\n    [(ngModel)]=\"field\"\n    [required]=\"true\"\n    [optionFormatter]=\"optionFormatter\"\n    [popupClass]=\"'rx-filter-by-card-selection-field-dropdown'\"\n  >\n  </adapt-rx-select>\n</div>\n\n<div class=\"modal-footer\">\n  <button adapt-button type=\"button\" btn-type=\"primary\" rx-id=\"apply-button\" [disabled]=\"!field\" (click)=\"apply()\">\n    {{ 'com.bmc.arsys.rx.client.common.apply.label' | translate }}\n  </button>\n\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"cancel-button\" (click)=\"context.dismiss()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxFilterByCardSelectionDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-filter-by-card-selection',
                    templateUrl: './filter-by-card-selection-dialog.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }]; } });
//# sourceMappingURL=filter-by-card-selection-dialog.component.js.map