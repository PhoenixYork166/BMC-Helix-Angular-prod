import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Injector, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AdaptModalService } from '@bmc-ux/adapt-angular';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { combineLatest } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { FieldSelectorComponent } from './field-selector/field-selector.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/common";
export class FieldsInspectorWidgetComponent extends InspectorWidgetBase {
    constructor(injector, adaptModalService, renderer) {
        super(injector);
        this.adaptModalService = adaptModalService;
        this.renderer = renderer;
        this.encapsulateClass = true;
    }
    focus() {
        this.renderer.selectRootElement(this.openModalButton.nativeElement, true).click();
    }
    openModal() {
        combineLatest([
            this.designerItemModel.childFieldIds$,
            this.designerItemModel.recordFieldDefinitionItems$,
            this.designerItemModel.isExtensionView$,
            this.designerItemModel.associationDefinitionName$
        ])
            .pipe(take(1), concatMap(([selectedFieldIds, availableFields, isExtensionView, associationDefinitionName]) => this.adaptModalService.open({
            content: FieldSelectorComponent,
            data: {
                selectedFieldIds,
                availableFields: isExtensionView && associationDefinitionName
                    ? availableFields.filter((field) => field.resourceType !== RX_RECORD_DEFINITION.resourceTypes.attachment)
                    : availableFields,
                hideSystemFields: this.options.hideSystemFields
            },
            size: 'sm',
            hideBackdrop: false,
            customClass: 'rx-record-editor-field-selector-modal'
        })))
            .subscribe((selectedFieldIds) => {
            this.designerItemModel.updateSelectedFieldComponents(selectedFieldIds);
        });
    }
    removeField(guid) {
        this.designerItemModel.removeComponent([guid]);
    }
    trackByGuid(index, item) {
        return item.guid;
    }
}
FieldsInspectorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetComponent, deps: [{ token: i0.Injector }, { token: i1.AdaptModalService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
FieldsInspectorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FieldsInspectorWidgetComponent, selector: "rx-fields-inspector-widget", host: { properties: { "class.rx-record-definition-fields": "this.encapsulateClass" } }, viewQueries: [{ propertyName: "openModalButton", first: true, predicate: ["openModalButton"], descendants: true, read: ElementRef, static: true }], usesInheritance: true, ngImport: i0, template: "<adapt-button\n  btn-type=\"tertiary\"\n  #openModalButton\n  rx-id=\"open-modal-button\"\n  class=\"px-0 py-0\"\n  (click)=\"openModal()\"\n  [hidden]=\"options.isDisabled\"\n>\n  <span class=\"d-icon-plus_circle\"></span>\n  Quick edit fields\n</adapt-button>\n\n<div rx-id=\"columns\">\n  <span *ngIf=\"(designerItemModel.selectedFieldComponents$ | async).length === 0\" class=\"text-tertiary\"\n    >No fields added.</span\n  >\n</div>\n\n<div class=\"mt-2\">\n  <div\n    class=\"rx-field-item\"\n    *ngFor=\"let field of designerItemModel.selectedFieldComponents$ | async; trackBy: trackByGuid\"\n  >\n    <div>\n      <div class=\"rx-field-name\">{{ field.label }}</div>\n\n      <div class=\"rx-field-type\">\n        <small>{{ field.componentName }}</small>\n      </div>\n    </div>\n\n    <div class=\"rx-action-button\">\n      <span\n        *ngIf=\"!options.isDisabled\"\n        (click)=\"removeField(field.guid)\"\n        class=\"d-icon-cross btn-link\"\n        rx-id=\"delete-button\"\n      >\n      </span>\n    </div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.rx-record-definition-fields .rx-field-item{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;font-size:12px;display:flex;justify-content:space-between;word-break:break-all}.rx-record-definition-fields .rx-field-name{font-weight:var(--font-weight-bold)}.rx-record-definition-fields .rx-field-type{color:#959899}.rx-record-definition-fields .d-icon-cross{cursor:pointer}.rx-record-definition-fields .d-icon-cross:not(:hover){color:#313538}.rx-record-editor-field-selector-modal .modal{justify-content:flex-end}.rx-record-editor-field-selector-modal .modal-scroll-container{padding:15px;min-height:0}.rx-record-editor-field-selector-modal .modal-dialog{margin:auto 0 0 auto;min-height:0;width:350px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FieldsInspectorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-fields-inspector-widget',
                    templateUrl: './fields-inspector-widget.component.html',
                    styleUrls: ['./fields-inspector-widget.component.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.AdaptModalService }, { type: i0.Renderer2 }]; }, propDecorators: { encapsulateClass: [{
                type: HostBinding,
                args: ['class.rx-record-definition-fields']
            }], openModalButton: [{
                type: ViewChild,
                args: ['openModalButton', { read: ElementRef, static: true }]
            }] } });
//# sourceMappingURL=fields-inspector-widget.component.js.map