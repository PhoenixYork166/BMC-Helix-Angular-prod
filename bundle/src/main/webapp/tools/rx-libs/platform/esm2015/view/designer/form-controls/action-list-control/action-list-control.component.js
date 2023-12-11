import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop, sortBy, transform, without } from 'lodash';
import { ActionListEditorDialogComponent } from './action-list-editor-dialog/action-list-editor-dialog.component';
import { OpenViewActionModalSize, RxViewActionRegistryService } from '@helix/platform/view/api';
import { ValueAccessor } from '@helix/platform/shared/components';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/ui-kit";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "@angular/common";
export class ActionListControlComponent extends ValueAccessor {
    constructor(rxModalService, rxViewActionRegistryService) {
        super();
        this.rxModalService = rxModalService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.availableActions$ = this.rxViewActionRegistryService.getLicensedActions();
        this.selectedActions = [];
        this.availableActions$.subscribe((actions) => {
            this.actionLabelsMap = transform(actions, (result, action) => {
                result[action.name] = action.label;
            }, {});
        });
    }
    focus(data) {
        if ((data === null || data === void 0 ? void 0 : data.actionIndex) >= 0) {
            this.openActionSelector(this.selectedActions.find((item) => item.data.index === data.actionIndex));
        }
        else {
            this.openActionSelector();
        }
    }
    openActionSelector(actionToEdit) {
        this.rxModalService
            .openModal({
            title: 'Edit actions',
            data: {
                selectedActions: this.value,
                actionToEdit,
                isReadOnly: this.isDisabled
            },
            content: ActionListEditorDialogComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'edit-actions'
        })
            .then((actions) => {
            this.value = actions;
        })
            .catch(noop);
    }
    onSetValue() {
        this.updateSortedActionsList();
    }
    onWriteValue(value) {
        this.updateSortedActionsList();
    }
    removeAction(action) {
        this.value = without(this.value, action);
    }
    editAction(action) {
        this.openActionSelector(action);
    }
    updateSortedActionsList() {
        this.selectedActions = sortBy(this.value, (action) => action.data.index);
    }
}
ActionListControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlComponent, deps: [{ token: i1.RxModalService }, { token: i2.RxViewActionRegistryService }], target: i0.ɵɵFactoryTarget.Component });
ActionListControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListControlComponent, selector: "rx-action-list-control", inputs: { options: "options", tooltip: "tooltip" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ActionListControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button rx-id=\"open-modal-button\" btn-type=\"tertiary\" class=\"px-0 py-0 pb-1\" (click)=\"openActionSelector()\">\n  <adapt-icon name=\"plus_circle\" class=\"mr-1\"></adapt-icon>\n  Edit actions\n</adapt-button>\n\n<span *ngIf=\"tooltip\" class=\"align-middle\">\n  <span class=\"letter-space\"></span>\n  <adapt-icon [name]=\"'question_circle_o'\" [adaptPopover]=\"tooltip\" appendToBody=\"true\"></adapt-icon>\n</span>\n\n<div rx-id=\"columns\">\n  <span *ngIf=\"selectedActions.length === 0\" class=\"text-tertiary\">No actions added.</span>\n</div>\n\n<ul class=\"list-unstyled mb-0\" *ngIf=\"selectedActions.length > 0\">\n  <li class=\"border px-2 py-1 mb-1 d-flex align-items-center\" *ngFor=\"let action of selectedActions\">\n    <strong class=\"mr-auto\">{{ actionLabelsMap[action.data.name] }}</strong>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      (click)=\"editAction(action)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      *ngIf=\"!isDisabled\"\n      (click)=\"removeAction(action)\"\n    ></button>\n  </li>\n</ul>\n", components: [{ type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-control',
                    templateUrl: './action-list-control.component.html',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ActionListControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxModalService }, { type: i2.RxViewActionRegistryService }]; }, propDecorators: { options: [{
                type: Input
            }], tooltip: [{
                type: Input
            }] } });
//# sourceMappingURL=action-list-control.component.js.map