import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Injector, QueryList, ViewChildren } from '@angular/core';
import { ActiveModalRef, AdaptAccordionTabComponent, DismissReasons, toNumber, TreeWrap } from '@bmc-ux/adapt-angular';
import { RX_EXPRESSION_EDITOR, RxExpressionEditorService } from '@helix/platform/shared/components';
import { RxGuidService, RxStringService } from '@helix/platform/utils';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { cloneDeep, findIndex, flow, get, map as _map, pull, set, sortBy, toPath, transform } from 'lodash';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewDesignerFacade } from '../../../+state/view-designer.facade';
import { RxActionListModelManagerService } from '../action-list-model-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "../../../+state/view-designer.facade";
import * as i5 from "../action-list-model-manager.service";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@ngx-translate/core";
import * as i8 from "@angular/common";
import * as i9 from "@angular/cdk/drag-drop";
export class ActionListEditorDialogComponent extends RxModalClass {
    constructor(rxViewActionRegistryService, rxStringService, activeModalRef, viewDesignerFacade, rxActionListModelManagerService, rxExpressionEditorService, rxGuidService, translateService, injector) {
        super(activeModalRef, injector);
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxStringService = rxStringService;
        this.activeModalRef = activeModalRef;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxActionListModelManagerService = rxActionListModelManagerService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxGuidService = rxGuidService;
        this.translateService = translateService;
        this.injector = injector;
        this.availableActionDescriptors$ = this.rxViewActionRegistryService.getLicensedActions();
        this.selectedActions = [];
        this.config = this.activeModalRef.getData();
        this.treeWrap = TreeWrap.WrapAll;
        this.destroyed$ = new ReplaySubject(1);
        this.isEditorDirtySubject = new BehaviorSubject(false);
        this.isSaveButtonDisabled$ = this.isEditorDirtySubject.asObservable().pipe(map((isDirty) => !isDirty));
        this.availableActionTreeNodes$ = this.availableActionDescriptors$.pipe(map((actions) => actions
            .filter((action) => !action.hidden)
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((action) => ({
            data: action,
            label: action.label
        }))));
        this.actionLabelsMap$ = this.availableActionDescriptors$.pipe(map((actions) => transform(actions, (result, action) => {
            result[action.name] = action.label;
        }, {})));
        this.config.selectedActions = _map(this.config.selectedActions, (action) => (Object.assign(Object.assign({}, action), { data: Object.assign(Object.assign({}, action.data), { index: toNumber(action.data.index) }) })));
        this.selectedActions = flow((actions) => sortBy(actions, (action) => action.data.index), (actions) => _map(actions, (action) => {
            const descriptor = this.rxViewActionRegistryService.get(action.data.name);
            this.viewDesignerFacade.setActionDataDictionaryBranch(action.guid, action.data.index, action.data.name);
            const model = this.rxActionListModelManagerService.create(descriptor, action.guid, action.data);
            return {
                isOpen: Boolean(this.config.actionToEdit) && action.guid === this.config.actionToEdit.guid,
                model,
                config$: model.sandbox.actionPropertyEditorConfig$.pipe(map((config) => [{ controls: config }])),
                name: descriptor.name
            };
        }))(this.config.selectedActions);
    }
    isDirty() {
        return this.isEditorDirtySubject.getValue();
    }
    addAction(actionDescriptor, index = this.selectedActions.length) {
        const guid = this.rxGuidService.generate();
        this.viewDesignerFacade.setActionDataDictionaryBranch(guid, index, actionDescriptor.name);
        const model = this.rxActionListModelManagerService.create(actionDescriptor, guid, {
            name: actionDescriptor.name,
            index
        });
        this.selectedActions.splice(index, 0, {
            isOpen: true,
            model,
            config$: model.sandbox.actionPropertyEditorConfig$.pipe(map((config) => [{ controls: config }])),
            name: actionDescriptor.name
        });
        this.updateIndexProp();
        this.markEditorAsDirty();
        setTimeout(() => {
            this.accordionTabEls.toArray()[index].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    onSave() {
        const result = this.selectedActions.map((action) => {
            var _a, _b, _c;
            return ({
                guid: action.model.guid,
                data: action.model.getPropertiesByName(),
                children: (_c = (_b = (_a = action.model).getChildren) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : null
            });
        });
        this.activeModalRef.close(result);
    }
    removeAction(action) {
        pull(this.selectedActions, action);
        this.rxActionListModelManagerService.remove(action.model.guid);
        this.viewDesignerFacade.removeActionDataDictionaryBranch(action.model.guid);
        this.markEditorAsDirty();
    }
    moveAction(fromIndex, toIndex) {
        moveItemInArray(this.selectedActions, fromIndex, toIndex);
        this.updateIndexProp();
        this.markEditorAsDirty();
    }
    toggleOpen(expandAll) {
        this.selectedActions.forEach((action) => (action.isOpen = expandAll));
    }
    onSelectedActionsListDrop(event) {
        var _a;
        const data = event.item.data;
        if ((_a = data.model) === null || _a === void 0 ? void 0 : _a.guid) {
            this.moveAction(event.previousIndex, event.currentIndex);
        }
        else {
            this.addAction(data, event.currentIndex);
        }
    }
    openExpressionEditor(model, propertyPath, propertyLabel, isReadOnly = false, element) {
        this.rxExpressionEditorService
            .openEditor({
            property: {
                path: propertyPath,
                value: get(model.sandbox.getActionProperties(), propertyPath),
                label: propertyLabel
            },
            isReadOnly,
            expressionConfigurator: model.getExpressionConfigurator(),
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
            ],
            expressionPropertyNavigator: {
                getProperties: () => {
                    const properties = Array.from(element.querySelectorAll('rx-expression-form-control')).map((controlElement) => {
                        const path = controlElement.getAttribute('property-path');
                        return {
                            path,
                            value: get(model.sandbox.getActionProperties(), path),
                            label: controlElement.getAttribute('property-label')
                        };
                    });
                    return of(properties);
                }
            }
        })
            .pipe(map(({ path, value }) => {
            const props = model.sandbox.getActionProperties();
            const headPropertyName = path in props ? path : toPath(path)[0];
            return set({ [headPropertyName]: cloneDeep(props[headPropertyName]) }, path, value);
        }))
            .subscribe((props) => {
            model.sandbox.updateActionProperties(props);
            this.markEditorAsDirty();
        });
    }
    onEvent(event, model, element) {
        if (event.type === RX_EXPRESSION_EDITOR.events.openExpressionEditor) {
            this.openExpressionEditor(model, event.payload.propertyPath, event.payload.propertyLabel, event.payload.isReadOnly, element);
        }
    }
    updateIndexProp() {
        this.selectedActions.forEach((action, index) => {
            action.model.sandbox.updateActionProperties({
                index
            });
        });
        this.viewDesignerFacade.updateActionDataDictionaryBranchOrder(this.selectedActions.reduce((result, action, index) => {
            result[action.model.guid] = index;
            return result;
        }, {}));
    }
    markEditorAsDirty() {
        this.isEditorDirtySubject.next(true);
    }
    ngAfterViewInit() {
        const openActionIndex = findIndex(this.selectedActions, 'isOpen');
        if (openActionIndex !== -1) {
            this.accordionTabEls.toArray()[openActionIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
    ngOnDestroy() {
        this.isEditorDirtySubject.complete();
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.viewDesignerFacade.removeAllActionDataDictionaryBranches();
    }
    cancel() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
ActionListEditorDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogComponent, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxStringService }, { token: i3.ActiveModalRef }, { token: i4.ViewDesignerFacade }, { token: i5.RxActionListModelManagerService }, { token: i6.RxExpressionEditorService }, { token: i2.RxGuidService }, { token: i7.TranslateService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ActionListEditorDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListEditorDialogComponent, selector: "rx-action-list-editor-dialog", providers: [RxActionListModelManagerService], viewQueries: [{ propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\" *ngIf=\"availableActionTreeNodes$ | async as availableActionTreeNodes\">\n          <div\n            *ngIf=\"availableActionTreeNodes.length; else adaptTreeEmptyStateTemplate\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"'selected-action-list'\"\n          >\n            <adapt-tree\n              [value]=\"availableActionTreeNodes\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-action adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"action.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"action.data\"\n                >\n                  <div (dblclick)=\"addAction(action.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addAction(action.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ action.data.label }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <ng-template #adaptTreeEmptyStateTemplate>\n            <div class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n              <adapt-empty-state\n                class=\"w-100\"\n                label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.available-actions.empty-state.message' | translate }}\"\n                type=\"search\"\n              ></adapt-empty-state>\n            </div>\n          </ng-template>         \n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <div class=\"d-flex align-items-center\">\n          <h4 class=\"mt-2\">\n            {{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.title' | translate }}\n          </h4>\n\n          <adapt-icon\n            class=\"ml-2\"\n            name=\"question_circle_o\"\n            adaptPopover=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.tooltip' | translate }}\"\n            appendToBody=\"true\"\n          >\n          </adapt-icon>\n        </div>\n\n        <div *ngIf=\"selectedActions.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-action-list\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedActionsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <div\n            *ngFor=\"\n              let action of selectedActions;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n            class=\"designer-modal-accordion-content\"\n            cdkDrag\n            cdkDragLockAxis=\"y\"\n            [cdkDragData]=\"action\"\n            [cdkDragDisabled]=\"config.isReadOnly\"\n            #container\n          >\n            <div *ngIf=\"!config.isReadOnly\" class=\"designer-modal-drag-handle d-icon-left-dots\" cdkDragHandle></div>\n\n            <adapt-accordion-tab\n              class=\"d-block\"\n              [isOpen]=\"action.isOpen\"\n              (open)=\"action.isOpen = true\"\n              (close)=\"action.isOpen = false\"\n            >\n              <div class=\"card-title-text w-100\">\n                <div class=\"designer-modal-card-title-content\">\n                  <div class=\"left-header-block\" [class.pl-0]=\"config.isReadOnly\">\n                    <div *ngIf=\"actionLabelsMap$ | async as actionLabelsMap\" class=\"rx-ellipsis\" [title]=\"actionLabelsMap[action.name]\"\n                      rx-id=\"card-title\">\n                      {{ actionLabelsMap[action.name] }}\n                    </div>\n                  </div>\n\n                  <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                    <div class=\"designer-modal-card-title-index-buttons\">\n                      <button\n                        class=\"d-icon-left-triangle_down rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"last\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index + 1)\"\n                        rx-id=\"move-down-button\"\n                      ></button>\n\n                      <button\n                        class=\"d-icon-left-triangle_up rx-button-unstyled\"\n                        type=\"button\"\n                        [disabled]=\"first\"\n                        (click)=\"$event.stopPropagation(); moveAction(index, index - 1)\"\n                        rx-id=\"move-up-button\"\n                      ></button>\n                    </div>\n\n                    <button\n                      class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                      adapt-button\n                      size=\"small\"\n                      type=\"button\"\n                      (click)=\"$event.stopPropagation(); removeAction(action)\"\n                      rx-id=\"remove-button\"\n                    >\n                      {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <rx-form-builder\n                class=\"d-block\"\n                [config]=\"action.config$ | async\"\n                [model]=\"action.model.sandbox.actionProperties$ | async\"\n                (modelChange)=\"action.model.sandbox.updateActionProperties($event); markEditorAsDirty()\"\n                (editorEvent)=\"onEvent($event, action.model, container)\"\n                [isReadOnly]=\"config.isReadOnly\"\n              ></rx-form-builder>\n            </adapt-accordion-tab>\n          </div>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedActions.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.view-components.action-list.selected-actions.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"cancel()\">\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) :\n    ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i3.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i3.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i6.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i3.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i9.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i3.AdaptPopoverDirective, selector: "[adaptPopover]", inputs: ["adaptPopover", "popoverTitle", "placement", "fallbackPlacement", "triggers", "container", "appendToBody", "closeBtn", "popupDelay", "disablePopover", "popoverClass", "autoClose", "closeOnOutOfView", "maxWidth", "minWidth"], outputs: ["shown", "hidden"], exportAs: ["adaptPopover"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }], pipes: { "translate": i7.TranslatePipe, "async": i8.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListEditorDialogComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-editor-dialog',
                    templateUrl: './action-list-editor-dialog.component.html',
                    styleUrls: ['./action-list-editor-dialog.component.scss'],
                    providers: [RxActionListModelManagerService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxStringService }, { type: i3.ActiveModalRef }, { type: i4.ViewDesignerFacade }, { type: i5.RxActionListModelManagerService }, { type: i6.RxExpressionEditorService }, { type: i2.RxGuidService }, { type: i7.TranslateService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=action-list-editor-dialog.component.js.map