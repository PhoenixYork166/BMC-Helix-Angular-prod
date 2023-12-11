import { Component, ElementRef, Injector, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActiveModalRef, AdaptAccordionTabComponent, AdaptModalService, DismissReasons } from '@bmc-ux/adapt-angular';
import { ActionListControlComponent, getAvailableOnDevicesInspectorConfig } from '@helix/platform/view/designer';
import { cloneDeep, isEqual, omit } from 'lodash';
import { RxDefinitionPickerType, RxExpressionEditorService } from '@helix/platform/shared/components';
import { Tooltip } from '@helix/platform/shared/api';
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { of } from 'rxjs';
import { RxModalClass } from '@helix/platform/ui-kit';
import { NgForm } from '@angular/forms';
import { RxGuidService } from '@helix/platform/utils';
import { RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/record/api";
import * as i5 from "@helix/platform/utils";
import * as i6 from "@helix/platform/view/designer";
import * as i7 from "@angular/common";
import * as i8 from "@angular/cdk/drag-drop";
import * as i9 from "@angular/forms";
export class RecordGridRowActionEditorModalComponent extends RxModalClass {
    constructor(context, adaptModalService, rxExpressionEditorService, translateService, rxRecordDefinitionCacheService, ngZone, rxGuidService, injector) {
        super(context, injector);
        this.context = context;
        this.adaptModalService = adaptModalService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.translateService = translateService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.ngZone = ngZone;
        this.rxGuidService = rxGuidService;
        this.injector = injector;
        this.rowActions = [];
        this.selectFormControlOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.field-name.label'),
            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.field-name.tooltip')),
            options: [],
            emptyOption: true
        };
        this.availableOnDevicesFormControlOptions = getAvailableOnDevicesInspectorConfig().options;
        this.recordDefinitionPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.security-definition-name.label'),
            tooltip: new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.security-definition-name.tooltip')),
            definitionType: RxDefinitionPickerType.StandardDataRecord,
            required: false
        };
        this.iconPickerOptions = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.icon.label'),
            appendToBody: true,
            required: false
        };
    }
    ngOnInit() {
        super.ngOnInit();
        const params = this.context.getData();
        this.expressionConfigurator = params.expressionConfigurator;
        this.rowActionIndex = params.rowActionIndex;
        this.activeActionIndex = params.activeActionIndex;
        this.isReadOnly = params.isReadOnly;
        this.rowActions = cloneDeep(params.rowActions).map((rowAction, index) => {
            this.setSecurityFieldDefinitions(rowAction);
            return Object.assign(Object.assign({}, rowAction), { isOpen: index === this.rowActionIndex });
        });
    }
    ngAfterViewInit() {
        this.openActiveAction();
        if (this.rowActionIndex) {
            this.accordionTabEls.toArray()[this.rowActionIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    cancel() {
        this.context.dismiss(DismissReasons.CLOSE_BTN);
    }
    trackByGuid(index, rowAction) {
        return rowAction.guid;
    }
    addRowAction() {
        this.markAsDirty();
        this.rowActions.push(Object.assign({ guid: this.rxGuidService.generate(), label: 'New row action' + (this.rowActions.length === 0 ? '' : ' ' + this.rowActions.length), icon: '', recordDefinitionName: null, fieldId: null, recordInstance: null, disabled: null, hidden: null, actions: [], isOpen: true, securityFieldDefinitions$: of(this.getSelectFormControlOptions()) }, RX_AVAILABLE_ON_DEVICES_DEFAULT_VALUE));
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    removeRowAction(index, $event) {
        $event.stopPropagation();
        this.markAsDirty();
        this.rowActions.splice(index, 1);
    }
    openExpressionEditor(event, rowAction, propertyPath) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: propertyPath,
                value: rowAction[propertyPath],
                label: this.getRowActionLabel(propertyPath)
            },
            isReadOnly: false,
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.function.label'),
                    icon: 'd-icon-mathematical_function'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component.label'),
                    icon: 'd-icon-file_o'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                    icon: 'd-icon-file_o_gear'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-input-parameter.label'),
                    icon: 'd-icon-arrow_right_square_input'
                }
            ]
        })
            .subscribe((expression) => {
            this.markAsDirty();
            rowAction[propertyPath] = expression.value;
        });
    }
    getExpressionFormControlOptions(propertyPath) {
        return {
            label: this.getRowActionLabel(propertyPath),
            tooltip: propertyPath === 'recordInstance'
                ? new Tooltip(this.translateService.instant('com.bmc.arsys.rx.client.view-components.record-grid-row-actions.recordInstance.tooltip'))
                : null,
            dataDictionary$: this.context.getData().expressionConfigurator.getDataDictionary(propertyPath),
            operators: this.context.getData().expressionConfigurator.getOperators(propertyPath)
        };
    }
    saveActions() {
        const rowActions = this.rowActions.map((rowAction) => (Object.assign(Object.assign({}, omit(rowAction, ['isOpen', 'securityFieldDefinitions$'])), { action: 'rowAction' })));
        this.context.close(rowActions);
    }
    moveRowAction(fromIndex, toIndex) {
        moveItemInArray(this.rowActions, fromIndex, toIndex);
        this.markAsDirty();
    }
    onDropInSelectedRowActionsContainer($event) {
        moveItemInArray(this.rowActions, $event.previousIndex, $event.currentIndex);
        this.markAsDirty();
    }
    onRecordDefinitionChange(rowAction) {
        this.markAsDirty();
        rowAction.fieldId = null;
        this.setSecurityFieldDefinitions(rowAction);
    }
    setSecurityFieldDefinitions(rowAction) {
        rowAction.securityFieldDefinitions$ = rowAction.recordDefinitionName
            ? this.rxRecordDefinitionCacheService
                .getRecordDefinition(rowAction.recordDefinitionName)
                .pipe(map((recordDefinition) => this.getSelectFormControlOptions(recordDefinition)))
            : of(this.getSelectFormControlOptions());
    }
    getRowActionLabel(key) {
        let rowActionLabel;
        switch (key) {
            case 'disabled':
                rowActionLabel = 'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.disabled.label';
                break;
            case 'hidden':
                rowActionLabel = 'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.hidden.label';
                break;
            case 'recordInstance':
                rowActionLabel = 'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.recordInstance.label';
                break;
        }
        return this.translateService.instant(rowActionLabel);
    }
    getSelectFormControlOptions(recordDefinition = null) {
        return Object.assign(Object.assign({}, this.selectFormControlOptions), { options: recordDefinition
                ? recordDefinition.fieldDefinitions.map((definition) => ({
                    name: definition.name,
                    id: String(definition.id)
                }))
                : [] });
    }
    openActiveAction() {
        if (this.activeActionIndex >= 0 && this.rowActionIndex >= 0) {
            this.ngZone.runOutsideAngular(() => {
                // timeout is required to let control set initial value
                setTimeout(() => {
                    const listControl = this.actionListControlComponents.find((control) => { var _a; return isEqual(control.value, (_a = this.rowActions[this.rowActionIndex]) === null || _a === void 0 ? void 0 : _a.actions); });
                    if (listControl) {
                        listControl.focus({ actionIndex: this.activeActionIndex });
                    }
                });
            });
        }
    }
    toggleOpen(expandAll) {
        this.rowActions.forEach((action) => (action.isOpen = expandAll));
    }
}
RecordGridRowActionEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRowActionEditorModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i1.AdaptModalService }, { token: i2.RxExpressionEditorService }, { token: i3.TranslateService }, { token: i4.RxRecordDefinitionCacheService }, { token: i0.NgZone }, { token: i5.RxGuidService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordGridRowActionEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridRowActionEditorModalComponent, selector: "rx-record-grid-row-action-editor-modal", viewQueries: [{ propertyName: "rowActionsForm", first: true, predicate: ["rowActionsForm"], descendants: true, read: NgForm, static: true }, { propertyName: "selectedRowActionsDropList", first: true, predicate: ["selectedRowActionsDropList"], descendants: true, read: CdkDropList }, { propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }, { propertyName: "draggableSelectedRowAction", predicate: ["draggableSelectedRowAction"], descendants: true, read: CdkDrag }, { propertyName: "actionListControlComponents", predicate: ActionListControlComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <button\n          *ngIf=\"!isReadOnly\"\n          class=\"mt-2 p-0\"\n          rx-id=\"add-button\"\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          (click)=\"addRowAction()\"\n        >\n          <span class=\"d-icon-left-plus_circle\"></span>\n\n          {{\n            'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.add-row-action.button.label' | translate\n          }}\n        </button>\n\n        <div *ngIf=\"rowActions.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selectedRowActionsDropList\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        [cdkDropListData]=\"rowActions\"\n        (cdkDropListDropped)=\"onDropInSelectedRowActionsContainer($event)\"\n        #selectedRowActionsDropList=\"cdkDropList\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <form #rowActionsForm=\"ngForm\">\n            <div\n              *ngFor=\"\n                let rowAction of rowActions;\n                let index = index;\n                let first = first;\n                let last = last;\n                trackBy: trackByGuid\n              \"\n              class=\"designer-modal-accordion-content\"\n              cdkDrag\n              cdkDragLockAxis=\"y\"\n              [cdkDragData]=\"rowAction\"\n              [cdkDragDisabled]=\"isReadOnly\"\n              #draggableSelectedRowAction\n            >\n              <div *ngIf=\"!isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"rowAction.isOpen\"\n                (open)=\"rowAction.isOpen = true\"\n                (close)=\"rowAction.isOpen = false\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block\" [class.pl-0]=\"isReadOnly\">\n                      <div class=\"rx-ellipsis\" [title]=\"rowAction.label\" rx-id=\"card-title\">\n                        {{ rowAction.label }}\n                      </div>\n                    </div>\n\n                    <div *ngIf=\"!isReadOnly\" class=\"right-header-block\">\n                      <div class=\"designer-modal-card-title-index-buttons\">\n                        <button\n                          class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                          type=\"button\"\n                          [disabled]=\"last\"\n                          (click)=\"$event.stopPropagation(); moveRowAction(index, index + 1)\"\n                          rx-id=\"move-down-button\"\n                        ></button>\n\n                        <button\n                          class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                          type=\"button\"\n                          [disabled]=\"first\"\n                          (click)=\"$event.stopPropagation(); moveRowAction(index, index - 1)\"\n                          rx-id=\"move-up-button\"\n                        ></button>\n                      </div>\n\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"removeRowAction(index, $event)\"\n                        rx-id=\"remove-button\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"d-flex row\">\n                  <adapt-rx-textfield\n                    class=\"form-group d-block col-4\"\n                    label=\"{{\n                      'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.label-field.label' | translate\n                    }}\"\n                    [disabled]=\"isReadOnly\"\n                    [required]=\"true\"\n                    [name]=\"'label_' + rowAction.guid\"\n                    rx-id=\"label\"\n                    [(ngModel)]=\"rowAction.label\"\n                    (ngModelChange)=\"markAsDirty()\"\n                    rxNoWhitespace\n                  >\n                  </adapt-rx-textfield>\n\n                  <rx-icon-picker-form-control\n                    [disabled]=\"isReadOnly\"\n                    class=\"form-group d-block col-4 px-2\"\n                    [options]=\"iconPickerOptions\"\n                    [name]=\"'icon_' + rowAction.guid\"\n                    rx-id=\"icon\"\n                    [(ngModel)]=\"rowAction.icon\"\n                    (ngModelChange)=\"markAsDirty()\"\n                  ></rx-icon-picker-form-control>\n                </div>\n\n                <div class=\"d-flex row\">\n                  <rx-definition-picker\n                    [isDisabled]=\"isReadOnly\"\n                    [options]=\"recordDefinitionPickerOptions\"\n                    [(ngModel)]=\"rowAction.recordDefinitionName\"\n                    [name]=\"'recordDefinition_' + rowAction.guid\"\n                    rx-id=\"recordDefinition\"\n                    (ngModelChange)=\"onRecordDefinitionChange(rowAction)\"\n                    class=\"form-group d-block col-4\"\n                  >\n                  </rx-definition-picker>\n\n                  <rx-select-form-control\n                    [options]=\"(rowAction.securityFieldDefinitions$ | async) || selectFormControlOptions\"\n                    [(ngModel)]=\"rowAction.fieldId\"\n                    [name]=\"'fieldId_' + rowAction.guid\"\n                    rx-id=\"fieldId\"\n                    [disabled]=\"!rowAction.recordDefinitionName || isReadOnly\"\n                    [appendToBody]=\"true\"\n                    class=\"col-4 px-2\"\n                    (ngModelChange)=\"markAsDirty()\"\n                  >\n                  </rx-select-form-control>\n\n                  <rx-expression-form-control\n                    [disabled]=\"!rowAction.recordDefinitionName || isReadOnly\"\n                    [options]=\"getExpressionFormControlOptions('recordInstance')\"\n                    propertyPath=\"recordInstance\"\n                    [ngModel]=\"rowAction.recordInstance\"\n                    (events)=\"openExpressionEditor($event, rowAction, 'recordInstance')\"\n                    [name]=\"'recordInstance_' + rowAction.guid\"\n                    rx-id=\"recordInstance\"\n                    class=\"col-4\"\n                  >\n                  </rx-expression-form-control>\n                </div>\n\n                <div class=\"d-flex row\">\n                  <rx-expression-form-control\n                    [disabled]=\"isReadOnly\"\n                    [options]=\"getExpressionFormControlOptions('disabled')\"\n                    propertyPath=\"disabled\"\n                    [ngModel]=\"rowAction.disabled\"\n                    (events)=\"openExpressionEditor($event, rowAction, 'disabled')\"\n                    [name]=\"'disabled_' + rowAction.guid\"\n                    rx-id=\"disabled\"\n                    class=\"col-4\"\n                  >\n                  </rx-expression-form-control>\n\n                  <rx-expression-form-control\n                    [disabled]=\"isReadOnly\"\n                    [options]=\"getExpressionFormControlOptions('hidden')\"\n                    propertyPath=\"hidden\"\n                    [ngModel]=\"rowAction.hidden\"\n                    (events)=\"openExpressionEditor($event, rowAction, 'hidden')\"\n                    [name]=\"'hidden_' + rowAction.guid\"\n                    rx-id=\"hidden\"\n                    class=\"col-4\"\n                  >\n                  </rx-expression-form-control>\n\n                  <rx-select-form-control\n                    [options]=\"availableOnDevicesFormControlOptions\"\n                    [(ngModel)]=\"rowAction.availableOnDevices\"\n                    [name]=\"'availableOnDevices_' + rowAction.guid\"\n                    rx-id=\"availableOnDevices\"\n                    [disabled]=\"isReadOnly\"\n                    [appendToBody]=\"true\"\n                    class=\"col-4 px-2\"\n                    (ngModelChange)=\"markAsDirty()\"\n                    required\n                  >\n                  </rx-select-form-control>\n                </div>\n\n                <div class=\"d-flex row\">\n                  <rx-action-list-control\n                    class=\"d-inline-block col-4 mt-2\"\n                    [(ngModel)]=\"rowAction.actions\"\n                    (ngModelChange)=\"markAsDirty()\"\n                    [name]=\"'action_' + rowAction.guid\"\n                  ></rx-action-list-control>\n                </div>\n              </adapt-accordion-tab>\n            </div>\n          </form>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!rowActions.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{\n            'com.bmc.arsys.rx.client.view-components.record-grid-row-actions.empty-state.message' | translate\n          }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"rowActionsForm.invalid || !isDirty()\"\n    (click)=\"saveActions()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i2.IconPickerFormControlComponent, selector: "rx-icon-picker-form-control", inputs: ["options"] }, { type: i2.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }, { type: i2.SelectFormControlComponent, selector: "rx-select-form-control", inputs: ["options", "appendToBody", "formControl"] }, { type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i6.ActionListControlComponent, selector: "rx-action-list-control", inputs: ["options", "tooltip"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i9.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i9.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i9.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i8.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i5.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }, { type: i9.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i3.TranslatePipe, "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridRowActionEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-record-grid-row-action-editor-modal',
                    templateUrl: './record-grid-row-action-editor-modal.component.html',
                    styleUrls: ['./record-grid-row-action-editor-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i1.AdaptModalService }, { type: i2.RxExpressionEditorService }, { type: i3.TranslateService }, { type: i4.RxRecordDefinitionCacheService }, { type: i0.NgZone }, { type: i5.RxGuidService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }], rowActionsForm: [{
                type: ViewChild,
                args: ['rowActionsForm', { static: true, read: NgForm }]
            }], draggableSelectedRowAction: [{
                type: ViewChildren,
                args: ['draggableSelectedRowAction', { read: CdkDrag }]
            }], selectedRowActionsDropList: [{
                type: ViewChild,
                args: ['selectedRowActionsDropList', { read: CdkDropList }]
            }], actionListControlComponents: [{
                type: ViewChildren,
                args: [ActionListControlComponent]
            }] } });
//# sourceMappingURL=record-grid-row-action-editor-modal.component.js.map