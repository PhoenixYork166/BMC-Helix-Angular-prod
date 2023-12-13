import { Component, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { FormBuilder, Validators } from '@angular/forms';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { forEach, includes, map } from 'lodash';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { RxExpressionEditorService } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import { RxGuidService } from '@helix/platform/utils';
import { NamedFilterOptionExpressionConfigurator } from './named-filter-option-expression-configurator.class';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/forms";
import * as i5 from "@ngx-translate/core";
import * as i6 from "./named-filter-option-expression-configurator.class";
import * as i7 from "@angular/common";
import * as i8 from "@angular/cdk/drag-drop";
export class RecordGridNamedFilterOptionsEditorModalComponent extends RxModalClass {
    constructor(activeModalRef, rxGuidService, rxExpressionEditorService, formBuilder, translateService, expressionConfigurator, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.rxGuidService = rxGuidService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.expressionConfigurator = expressionConfigurator;
        this.config = this.activeModalRef.getData();
        this.namedFilterOptionsFormArray = this.formBuilder.array([]);
        this.accordionTabs = {};
    }
    ngOnInit() {
        super.ngOnInit();
        this.expressionConfigurator.configureForProperty({
            propertyPath: 'namedFilterOptions',
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.All)
        });
        this.queryExpressionOptions = {
            label: 'Filter',
            dataDictionary$: this.expressionConfigurator.getDataDictionary('namedFilterOptions'),
            operators: this.expressionConfigurator.getOperators('namedFilterOptions'),
            isRequired: true
        };
        forEach(this.config.namedFilterOptions, (props, index) => {
            this.accordionTabs[props.guid] = index === this.config.activeIndex;
            this.namedFilterOptionsFormArray.push(this.getFormGroup(props));
        });
        if (this.config.isReadOnly) {
            this.namedFilterOptionsFormArray.disable();
        }
    }
    ngAfterViewInit() {
        if (this.config.activeIndex) {
            this.accordionTabEls.toArray()[this.config.activeIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    addNamedFilterOption() {
        this.markAsDirty();
        const guid = this.rxGuidService.generate();
        this.accordionTabs[guid] = true;
        let title = 'New filter option';
        let counter = 0;
        let titleAlreadyExists = false;
        const titles = map(this.namedFilterOptionsFormArray.getRawValue(), 'title');
        do {
            title = counter === 0 ? title : `New filter option ${counter}`;
            counter++;
            titleAlreadyExists = includes(titles, title);
        } while (titleAlreadyExists);
        this.namedFilterOptionsFormArray.push(this.getFormGroup({
            data: {
                title,
                filterExpression: '',
                index: this.namedFilterOptionsFormArray.length
            },
            guid
        }));
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    removeNamedFilterOption(index) {
        this.namedFilterOptionsFormArray.removeAt(index);
        this.markAsDirty();
    }
    openExpressionEditor(title, filterExpression) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: 'namedFilterOptions',
                value: filterExpression.value,
                label: title.value
            },
            isReadOnly: false,
            expressionConfigurator: this.expressionConfigurator,
            legend: [
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.keyword.label'),
                    icon: 'd-icon-dollar'
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.legend.view-component-property.label'),
                    icon: 'd-icon-file_o_gear'
                }
            ]
        })
            .subscribe((expression) => {
            filterExpression.setValue(expression.value);
            this.markAsDirty();
        });
    }
    moveNamedFilterOption(fromIndex, toIndex) {
        moveItemInArray(this.namedFilterOptionsFormArray.controls, fromIndex, toIndex);
        this.markAsDirty();
    }
    onSelectedNamedFilterOptionDrop(event) {
        moveItemInArray(this.namedFilterOptionsFormArray.controls, event.previousIndex, event.currentIndex);
        this.markAsDirty();
    }
    onSave() {
        const formValues = this.namedFilterOptionsFormArray.getRawValue();
        const namedFilterOptions = formValues.map(({ guid, title, filterExpression }, index) => ({
            guid,
            data: {
                title,
                filterExpression,
                index
            }
        }));
        this.activeModalRef.close(namedFilterOptions);
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    toggleOpen(expandAll) {
        forEach(this.accordionTabs, (val, key) => {
            this.accordionTabs[key] = expandAll;
        });
    }
    getCheckTitleDuplicateValidator(currentNamedFilterOption) {
        return (control) => {
            const title = control.value;
            if (title &&
                this.namedFilterOptionsFormArray.controls.some((namedFilterOption) => namedFilterOption.value.title === title && namedFilterOption.value.guid !== currentNamedFilterOption.guid)) {
                return { duplicateFilterOptionName: { message: 'Filter option with this name already exists.' } };
            }
            return null;
        };
    }
    getFormGroup(properties) {
        return this.formBuilder.group({
            guid: properties.guid,
            title: [
                properties.data.title,
                [
                    Validators.required,
                    this.getCheckTitleDuplicateValidator(properties).bind(this),
                    (control) => {
                        var _a;
                        return ((_a = control === null || control === void 0 ? void 0 : control.value) === null || _a === void 0 ? void 0 : _a.includes(';'))
                            ? { invalidName: { message: 'A filter option name cannot contain any of the following characters: ;' } }
                            : null;
                    }
                ]
            ],
            filterExpression: [properties.data.filterExpression, Validators.required]
        });
    }
}
RecordGridNamedFilterOptionsEditorModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridNamedFilterOptionsEditorModalComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.RxGuidService }, { token: i3.RxExpressionEditorService }, { token: i4.FormBuilder }, { token: i5.TranslateService }, { token: i6.NamedFilterOptionExpressionConfigurator }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RecordGridNamedFilterOptionsEditorModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RecordGridNamedFilterOptionsEditorModalComponent, selector: "rx-named-filter-options-editor-modal", providers: [NamedFilterOptionExpressionConfigurator], viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div class=\"d-flex flex-column mh-100 col\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <button\n          *ngIf=\"!config.isReadOnly\"\n          class=\"mt-2 p-0\"\n          rx-id=\"add-button\"\n          adapt-button\n          type=\"button\"\n          btn-type=\"tertiary\"\n          (click)=\"addNamedFilterOption()\"\n        >\n          <span class=\"d-icon-left-plus_circle\"></span>\n\n          {{\n            'com.bmc.arsys.rx.client.view-components.named-filter-options.add-named-filter-option.button.label'\n              | translate\n          }}\n        </button>\n\n        <div *ngIf=\"namedFilterOptionsFormArray.controls.length\" class=\"btn-group\">\n          <button adapt-button btn-type=\"tertiary\" type=\"button\" rx-id=\"expand-all-button\" (click)=\"toggleOpen(true)\">\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        *ngIf=\"namedFilterOptionsFormArray.controls.length\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedNamedFilterOptionDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let namedFilterOption of namedFilterOptionsFormArray.controls;\n              let index = index;\n              let first = first;\n              let last = last\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"namedFilterOption\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [formGroup]=\"namedFilterOption\"\n              [isOpen]=\"accordionTabs[namedFilterOption.get('guid').value]\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div class=\"rx-ellipsis\" [title]=\"namedFilterOption.get('title').value\" rx-id=\"card-title\">\n                      {{ namedFilterOption.get('title').value }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveNamedFilterOption(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveNamedFilterOption(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeNamedFilterOption(index)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <adapt-rx-textfield\n                class=\"form-group d-block\"\n                rx-id=\"filter-option-name-field\"\n                label=\"{{\n                  'com.bmc.arsys.rx.client.view-components.named-filter-options.name-field.label' | translate\n                }}\"\n                formControlName=\"title\"\n                [required]=\"true\"\n                (ngModelChange)=\"markAsDirty()\"\n                rxNoWhitespace\n              ></adapt-rx-textfield>\n\n              <rx-expression-form-control\n                formControlName=\"filterExpression\"\n                rx-id=\"query-expression-field\"\n                [options]=\"queryExpressionOptions\"\n                (events)=\"\n                  openExpressionEditor(namedFilterOption.get('title'), namedFilterOption.get('filterExpression'))\n                \"\n                [required]=\"true\"\n                (ngModelChange)=\"markAsDirty()\"\n              ></rx-expression-form-control>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div\n        *ngIf=\"!namedFilterOptionsFormArray.controls.length\"\n        class=\"d-flex justify-content-center h-100 align-items-center mt-2\"\n      >\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.view-components.named-filter-options.empty-state.message' | translate }}\"\n          type=\"search\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"this.namedFilterOptionsFormArray.invalid || !isDirty()\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{\n      config.isReadOnly\n        ? ('com.bmc.arsys.rx.client.common.close.label' | translate)\n        : ('com.bmc.arsys.rx.client.common.cancel.label' | translate)\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i3.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }, { type: i1.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i8.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RxNoWhitespaceValidator, selector: "[rxNoWhitespace]", inputs: ["rxNoWhitespace"] }, { type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordGridNamedFilterOptionsEditorModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-named-filter-options-editor-modal',
                    templateUrl: './named-filter-options-editor-modal.component.html',
                    styleUrls: ['./named-filter-options-editor-modal.component.scss'],
                    providers: [NamedFilterOptionExpressionConfigurator]
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.RxGuidService }, { type: i3.RxExpressionEditorService }, { type: i4.FormBuilder }, { type: i5.TranslateService }, { type: i6.NamedFilterOptionExpressionConfigurator }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=named-filter-options-editor-modal.component.js.map