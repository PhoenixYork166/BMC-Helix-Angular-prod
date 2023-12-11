import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, isNil, noop, without } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { ContextualLabelFieldsEditorModalComponent } from './contextual-label-fields-editor/contextual-label-fields-editor-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class ContextualLabelFieldsComponent extends ValueAccessor {
    constructor(rxModalService, translateService) {
        super();
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.vmSubject = new BehaviorSubject({
            fieldNames: [],
            isEditorDisabled: true,
            isFieldRemovable: false
        });
        this.vm$ = this.vmSubject.asObservable();
    }
    ngOnInit() {
        var _a;
        (_a = this.value) !== null && _a !== void 0 ? _a : (this.value = []);
        this.updateViewValues();
    }
    focus(data) {
        this.openContextualLabelFieldsEditor(data.fieldIndex);
    }
    onWriteValue(value) {
        if (!isNil(value)) {
            this.updateViewValues();
        }
    }
    ngOnChanges(changes) {
        this.updateViewValues();
    }
    updateViewValues() {
        const fieldNames = this.value.map((field) => { var _a, _b; return (_b = (_a = this.options.options.find(({ id }) => id === field.id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ''; });
        this.vmSubject.next({
            fieldNames,
            isEditorDisabled: this.isDisabled && !fieldNames.length,
            isFieldRemovable: !this.isDisabled
        });
    }
    openContextualLabelFieldsEditor(activeFieldIndex) {
        this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label'),
            data: {
                contextualLabelFields: this.value ? cloneDeep(this.value) : [],
                options: this.options.options,
                isReadOnly: this.isDisabled,
                activeFieldIndex
            },
            content: ContextualLabelFieldsEditorModalComponent,
            testID: 'edit-contextual-label-fields'
        })
            .then((contextualLabelFields) => {
            this.value = contextualLabelFields;
        })
            .catch(noop);
    }
    editContextualLabelField(activeFieldIndex) {
        this.openContextualLabelFieldsEditor(activeFieldIndex);
    }
    removeContextualLabelField(activeFieldIndex) {
        this.value = without(this.value, this.value[activeFieldIndex]);
    }
}
ContextualLabelFieldsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsComponent, deps: [{ token: i1.RxModalService }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ContextualLabelFieldsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ContextualLabelFieldsComponent, selector: "rx-contextual-label-fields", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ContextualLabelFieldsComponent,
            multi: true
        }
    ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div class=\"pb-1\">\n    <adapt-button\n      btn-type=\"tertiary\"\n      rx-id=\"open-contextual-label-fields-editor-link\"\n      class=\"d-icon-plus_circle p-0\"\n      (click)=\"openContextualLabelFieldsEditor()\"\n      [disabled]=\"vm.isEditorDisabled\"\n    >\n      {{ 'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.label' | translate }}\n    </adapt-button>\n    <adapt-icon\n      name=\"question_circle_o\"\n      class=\"ml-2\"\n      placement=\"right\"\n      maxWidth=\"400\"\n      [adaptPopover]=\"\n        'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.edit-fields.tooltip' | translate\n      \"\n    ></adapt-icon>\n  </div>\n\n  <span *ngIf=\"!vm.fieldNames.length\" class=\"text-tertiary\" rx-id=\"contextual-label-empty-state\">{{\n    'com.bmc.arsys.rx.client.named-list-designer.contextual-label-fields.empty-state.message' | translate\n  }}</span>\n\n  <div *ngIf=\"vm.fieldNames.length\" rx-id=\"contextual-label-fields\">\n    <div\n      *ngFor=\"let fieldName of vm.fieldNames; let index = index\"\n      class=\"d-flex border rounded px-2 mb-1 align-items-center\"\n    >\n      <strong class=\"flex-grow-1\">{{ fieldName }}</strong>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-pencil p-1\"\n        rx-id=\"edit-button\"\n        (click)=\"editContextualLabelField(index)\"\n      ></adapt-button>\n      <adapt-button\n        btn-type=\"tertiary\"\n        class=\"d-icon-right-cross_adapt p-1\"\n        rx-id=\"remove-button\"\n        *ngIf=\"vm.isFieldRemovable\"\n        (click)=\"removeContextualLabelField(index)\"\n      ></adapt-button>\n    </div>\n  </div>\n</ng-container>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe, "translate": i2.TranslatePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ContextualLabelFieldsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-contextual-label-fields',
                    templateUrl: './contextual-label-fields.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ContextualLabelFieldsComponent,
                            multi: true
                        }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.TranslateService }]; }, propDecorators: { options: [{
                type: Input
            }] } });
//# sourceMappingURL=contextual-label-fields.component.js.map