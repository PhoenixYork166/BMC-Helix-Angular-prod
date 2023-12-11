import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { noop } from 'lodash';
import { RecordIndexesEditorComponent } from './record-indexes-editor.component';
import { OpenViewActionModalSize } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class RecordIndexesControlComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
    }
    openIndexesEditor(indexToEditIndex = null) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label'),
            data: {
                indexes: this.value,
                indexToEditIndex,
                isReadOnly: this.options.isReadOnly,
                fields: this.options.definitionModel.fields
            },
            content: RecordIndexesEditorComponent,
            size: OpenViewActionModalSize.Large
        })
            .then((indexes) => {
            this.value = indexes;
        })
            .catch(noop);
    }
    removeIndex($index) {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.record-designer.indexes.delete-index-confirmation.message')
        })
            .then((result) => {
            if (result) {
                this.value = this.value.filter((index, itemIndex) => itemIndex !== $index);
            }
        });
    }
    focus(data) {
        if (data === null || data === void 0 ? void 0 : data.indexToEditIndex) {
            this.openIndexesEditor(data.indexToEditIndex);
        }
        else {
            this.openIndexesEditor();
        }
    }
}
RecordIndexesControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
RecordIndexesControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordIndexesControlComponent, selector: "rx-record-indexes", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RecordIndexesControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-indexes-editor\" class=\"p-0 pb-1\" (click)=\"openIndexesEditor()\">\n  <span class=\"d-icon-plus_circle\"></span>\n  {{ 'com.bmc.arsys.rx.client.record-designer.indexes.edit-indexes.label' | translate }}\n</adapt-button>\n\n<div class=\"record-index rounded mb-1 border font-weight-bold\" *ngFor=\"let index of value; let $index = index\">\n  <div class=\"d-flex mb-1\">\n    <span rx-id=\"record-index-name\" [title]=\"index.indexName\">\n      <span *ngIf=\"!index.isAutomaticIndex\">{{\n        index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n      }}</span>\n      <span *ngIf=\"index.isAutomaticIndex\"\n        >{{\n          'com.bmc.arsys.rx.client.record-designer.indexes.automatic-index.label'\n            | translate\n              : {\n                  indexName:\n                    index.indexName || 'com.bmc.arsys.rx.client.record-designer.indexes.new-index.label' | translate\n                }\n        }}\n        <adapt-icon\n          name=\"question_circle_o\"\n          class=\"ml-2\"\n          [adaptPopover]=\"'com.bmc.arsys.rx.client.record-designer.indexes.system-index.tooltip' | translate\"\n        >\n        </adapt-icon>\n      </span>\n    </span>\n\n    <button\n      class=\"ml-auto rx-button-unstyled d-icon-left-pencil btn-link\"\n      type=\"button\"\n      rx-id=\"open-index-editor\"\n      (click)=\"openIndexesEditor($index)\"\n      *ngIf=\"!index.isAutomaticIndex\"\n    ></button>\n\n    <button\n      type=\"button\"\n      class=\"rx-button-unstyled d-icon-cross btn-link\"\n      rx-id=\"remove-index\"\n      (click)=\"removeIndex($index)\"\n      *ngIf=\"!options.isReadOnly && !index.isAutomaticIndex\"\n    ></button>\n  </div>\n\n  <div class=\"caption ellipsis\">\n    {{\n      (index.unique\n        ? 'com.bmc.arsys.rx.client.record-designer.indexes.unique-index.label'\n        : 'com.bmc.arsys.rx.client.record-designer.indexes.non-unique-index.label.value'\n      ) | translate\n    }},\n    {{\n      index.indexFieldIds.length === 1\n        ? ('com.bmc.arsys.rx.client.record-designer.indexes.one-field-index.label' | translate)\n        : ('com.bmc.arsys.rx.client.record-designer.indexes.many-fields-index.label'\n          | translate: { fieldCount: index.indexFieldIds.length })\n    }}\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.record-index{padding:5px 10px;word-break:break-all}.record-index .caption{color:#959899;font-size:10px}.d-icon-cross,.d-icon-left-pencil{cursor:pointer}.d-icon-cross:not(:hover),.d-icon-left-pencil:not(:hover){color:#313538}\n"], components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }], pipes: { "translate": i2.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordIndexesControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-indexes',
                    templateUrl: './record-indexes-control.component.html',
                    styleUrls: ['./record-indexes-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RecordIndexesControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=record-indexes-control.component.js.map