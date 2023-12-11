import * as i0 from '@angular/core';
import { Injectable, Component, ViewChild, ElementRef, ViewChildren, Input, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@helix/platform/view/designer';
import { RxViewRevertCustomizationComponent, RxViewCustomizationOptionsComponent, RX_VIEW_MODEL, RxViewDesignerComponent, ViewDesignerComponentModel, ViewDesignerCanvasModule, ViewDesignerFacade, validateCssClassName, RxComponentPermissionEditorWidgetComponent, validateCssClassNames, RxComponentPermissionEditorWidgetModule, ViewDesignerModule } from '@helix/platform/view/designer';
import * as i1$1 from '@angular/router';
import { pluck, switchMap, tap, map, distinctUntilChanged, skip, withLatestFrom, pairwise } from 'rxjs/operators';
import * as i1$2 from '@helix/platform/ui-kit';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i2 from '@helix/platform/shared/api';
import { RX_APPLICATION, RX_PERMISSION, Tooltip, RxExpressionConfigurator, ExpressionOperatorRowsByGroup, ExpressionOperatorGroup } from '@helix/platform/shared/api';
import * as i1$5 from '@helix/platform/view/api';
import { RX_SHELL, OpenViewActionModalSize, RX_VIEW_DEFINITION, RxViewLayout, ViewComponentPropertyType, RxViewDefinitionCacheService, RX_LAUNCH_BEHAVIOR, OpenViewActionType, OpenViewActionLaunchBehavior, RX_LEGACY_ICONS } from '@helix/platform/view/api';
import { values, findIndex, noop, omit, map as map$1, isEmpty, reject, pick, transform, forEach, trim, keys, get } from 'lodash';
import { combineLatest, of } from 'rxjs';
import * as i4 from '@helix/platform/shared/components';
import { RxDefinitionPickerType, ValueAccessor, InspectorWidgetBase, SwitchFormControlComponent, RxDefinitionPickerModule, TextFormControlComponent, SelectFormControlComponent, TagsFormControlComponent, IconPickerFormControlComponent } from '@helix/platform/shared/components';
import * as i7 from '@angular/forms';
import { NgForm, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i1$3 from '@bmc-ux/adapt-angular';
import { TreeWrap, DismissReasons, AdaptAccordionTabComponent, AdaptEmptyStateModule, AdaptButtonModule, AdaptAccordionModule, AdaptTreeModule, AdaptDropdownModule } from '@bmc-ux/adapt-angular';
import * as i2$1 from '@helix/platform/record/api';
import * as i6 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i8 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i1$4 from '@helix/platform/utils';
import { RxOpenViewModelHelperService } from '@helix/platform/view/actions';

class RxShellModel {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.viewDesignerFacade.setViewInspectorConfig(this.getInspector());
    }
    getInspector() {
        const layout = [
            {
                label: 'General',
                controls: [
                    {
                        component: RxViewRevertCustomizationComponent
                    },
                    {
                        component: RxViewCustomizationOptionsComponent
                    }
                ]
            }
        ];
        return {
            inspectorSectionConfigs: layout
        };
    }
}
RxShellModel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellModel.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellModel, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; } });

class RxShellDesignerPageComponent {
    constructor(activatedRoute, rxComponentCanDeactivateGuard, rxUtilityModalsService, rxDefinitionNameService, rxPageTitleService, rxBundleCacheService, rxGlobalCacheService, rxPreviousStateService) {
        this.activatedRoute = activatedRoute;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxPageTitleService = rxPageTitleService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.rxPreviousStateService = rxPreviousStateService;
        this.configuration$ = this.activatedRoute.params.pipe(pluck('bundleId'), switchMap((bundleId) => this.rxGlobalCacheService.getBundleDescriptor(bundleId)), tap((bundleDescriptor) => {
            this.rxBundleCacheService.bundleId = bundleDescriptor.id;
            this.rxPageTitleService.set(['Application shell', bundleDescriptor.friendlyName], RX_APPLICATION.innovationStudioBundleId);
        }), map((bundleDescriptor) => ({
            bundleId: bundleDescriptor.id,
            viewDefinitionName: this.rxDefinitionNameService.getDefinitionName(bundleDescriptor.id, RX_APPLICATION.shellDefinitionName),
            disablePreview: true,
            paletteComponentsPredicate: (descriptor) => values(RX_SHELL.navBar).includes(descriptor.type)
        })));
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
    }
    ngOnDestroy() {
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
    }
    canDeactivate() {
        if (this.viewDesignerComponent) {
            return this.viewDesignerComponent.canDeactivate();
        }
        return true;
    }
    onCloseDesigner() {
        this.rxPreviousStateService.goToPrevState();
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
}
RxShellDesignerPageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageComponent, deps: [{ token: i1$1.ActivatedRoute }, { token: i2.RxComponentCanDeactivateGuard }, { token: i1$2.RxUtilityModalsService }, { token: i2.RxDefinitionNameService }, { token: i2.RxPageTitleService }, { token: i2.RxBundleCacheService }, { token: i2.RxGlobalCacheService }, { token: i2.RxPreviousStateService }], target: i0.ɵɵFactoryTarget.Component });
RxShellDesignerPageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignerPageComponent, selector: "rx-shell-designer-page", providers: [
        RxShellModel,
        {
            provide: RX_VIEW_MODEL,
            useExisting: RxShellModel
        }
    ], viewQueries: [{ propertyName: "viewDesignerComponent", first: true, predicate: RxViewDesignerComponent, descendants: true }], ngImport: i0, template: "<rx-view-designer\n  *ngIf=\"configuration$ | async as config\"\n  [configuration]=\"config\"\n  (closeDesigner)=\"onCloseDesigner()\"\n></rx-view-designer>\n", styles: [""], components: [{ type: i1.RxViewDesignerComponent, selector: "rx-view-designer", inputs: ["configuration"], outputs: ["viewDefinitionSaved", "viewDefinitionErrorLoading", "closeDesigner"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-designer-page',
                    templateUrl: './shell-designer-page.component.html',
                    styleUrls: ['./shell-designer-page.component.scss'],
                    providers: [
                        RxShellModel,
                        {
                            provide: RX_VIEW_MODEL,
                            useExisting: RxShellModel
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActivatedRoute }, { type: i2.RxComponentCanDeactivateGuard }, { type: i1$2.RxUtilityModalsService }, { type: i2.RxDefinitionNameService }, { type: i2.RxPageTitleService }, { type: i2.RxBundleCacheService }, { type: i2.RxGlobalCacheService }, { type: i2.RxPreviousStateService }]; }, propDecorators: { viewDesignerComponent: [{
                type: ViewChild,
                args: [RxViewDesignerComponent, { static: false }]
            }] } });

class RxShellGlobalSearchRecordsModalComponent extends RxModalClass {
    constructor(activeModalRef, recordDefinitionDataPageService, definitionNameService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.recordDefinitionDataPageService = recordDefinitionDataPageService;
        this.definitionNameService = definitionNameService;
        this.injector = injector;
        this.config = this.activeModalRef.getData();
        this.filteredRecordDefinitionItems = [];
        this.treeWrap = TreeWrap.WrapAll;
        this.DismissReasons = DismissReasons;
        this.definitionPickerOptions = {
            label: 'Display view when clicked',
            definitionType: RxDefinitionPickerType.View,
            required: true
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.selectedRecords = this.config.selectedRecords.map((record) => {
            var _a;
            return (Object.assign(Object.assign({}, record), { isOpen: record.name === ((_a = this.config.recordToEdit) === null || _a === void 0 ? void 0 : _a.name) }));
        });
        this.getRecordDefinitions().subscribe((records) => {
            this.availableRecordDefinitionItems = records;
            this.updateFilteredItems();
        });
    }
    updateFilteredItems() {
        this.filteredRecordDefinitionItems = this.availableRecordDefinitionItems
            .filter((item) => !this.selectedRecords.find((record) => record.name === item.name))
            .map((item) => ({
            data: item,
            label: item.definitionName
        }));
    }
    addRecord(recordItem) {
        this.markAsDirty();
        this.selectedRecords.push(Object.assign(Object.assign({}, recordItem), { isOpen: true, view: null }));
        this.updateFilteredItems();
        setTimeout(() => {
            this.accordionTabEls.last.nativeElement.scrollIntoView({
                block: 'nearest'
            });
        });
    }
    toggleOpen(expandAll) {
        this.selectedRecords.forEach((record) => (record.isOpen = expandAll));
    }
    onSelectedRecordsListDrop(event) {
        this.addRecord(event.item.data);
    }
    removeRecord(record) {
        this.markAsDirty();
        this.selectedRecords = this.selectedRecords.filter((item) => item.name !== record.name);
        this.updateFilteredItems();
    }
    onSave() {
        const result = this.selectedRecords.map((record) => ({
            name: record.name,
            view: record.view,
            definitionName: record.definitionName
        }));
        this.activeModalRef.close(result);
    }
    getRecordDefinitions() {
        return this.recordDefinitionDataPageService
            .get({
            params: {
                propertySelection: 'name',
                excludeCustomRecordDefinitions: true
            }
        })
            .pipe(map((result) => result.data.map((record) => ({
            name: record.name,
            definitionName: this.definitionNameService.getDisplayName(record.name)
        }))));
    }
    ngAfterViewInit() {
        const selectedRecordIndex = findIndex(this.selectedRecords, 'isOpen');
        if (selectedRecordIndex !== -1) {
            this.accordionTabEls.toArray()[selectedRecordIndex].nativeElement.scrollIntoView({
                block: 'nearest'
            });
        }
    }
}
RxShellGlobalSearchRecordsModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalComponent, deps: [{ token: i1$3.ActiveModalRef }, { token: i2$1.RxRecordDefinitionDataPageService }, { token: i2.RxDefinitionNameService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxShellGlobalSearchRecordsModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsModalComponent, selector: "rx-shell-global-search-records-modal", viewQueries: [{ propertyName: "selectedRecordsForm", first: true, predicate: ["selectedRecordsForm"], descendants: true, read: NgForm, static: true }, { propertyName: "accordionTabEls", predicate: AdaptAccordionTabComponent, descendants: true, read: ElementRef }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body modal-body d-flex mh-100\">\n  <div class=\"row flex-grow-1 w-100\">\n    <div *ngIf=\"!config.isReadOnly\" class=\"col-4 border-right d-flex flex-column mh-100\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.title' | translate }}\n        </h4>\n      </div>\n\n      <div class=\"rx-card card flex-grow-1 mt-2\">\n        <div class=\"card-block\">\n          <div\n            *ngIf=\"filteredRecordDefinitionItems.length\"\n            cdkDropList\n            cdkDropListSortingDisabled\n            [cdkDropListConnectedTo]=\"['selected-record-items']\"\n          >\n            <adapt-tree\n              [value]=\"filteredRecordDefinitionItems\"\n              filter=\"true\"\n              [wrap]=\"treeWrap\"\n            >\n              <ng-template let-record adaptTreeNodeTemplate>\n                <div\n                  *ngIf=\"record.data\"\n                  class=\"rx-tree-draggable-node\"\n                  cdkDrag\n                  [cdkDragData]=\"record.data\"\n                >\n                  <div (dblclick)=\"addRecord(record.data)\">\n                    <button\n                      type=\"button\"\n                      class=\"rx-button-unstyled d-icon-plus_circle\"\n                      (click)=\"addRecord(record.data)\"\n                    ></button>\n\n                    <span class=\"rx-tree-node-label ml-3\">{{ record.data.definitionName }}</span>\n                  </div>\n                </div>\n              </ng-template>\n            </adapt-tree>\n          </div>\n\n          <div *ngIf=\"!filteredRecordDefinitionItems.length\"\n               class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n            <adapt-empty-state\n              class=\"w-100\"\n              label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.available-records.empty-state.message' | translate }}\"\n              type=\"search\"\n            ></adapt-empty-state>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"d-flex flex-column mh-100 {{ config.isReadOnly ? 'col' : 'col-8' }}\">\n      <div class=\"d-flex align-items-start justify-content-between\">\n        <h4 class=\"mt-2\">\n          {{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.title' | translate }}\n        </h4>\n\n        <div *ngIf=\"selectedRecords.length\" class=\"btn-group\">\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"expand-all-button\"\n            (click)=\"toggleOpen(true)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.expand-all.label' | translate }}\n          </button>\n\n          <button\n            adapt-button\n            btn-type=\"tertiary\"\n            type=\"button\"\n            rx-id=\"collapse-all-button\"\n            (click)=\"toggleOpen(false)\"\n          >\n            {{ 'com.bmc.arsys.rx.client.common.collapse-all.label' | translate }}\n          </button>\n        </div>\n      </div>\n\n      <div\n        id=\"selected-record-items\"\n        class=\"designer-modal-accordion-wrapper\"\n        cdkDropList\n        (cdkDropListDropped)=\"onSelectedRecordsListDrop($event)\"\n      >\n        <adapt-accordion [multiselect]=\"true\">\n          <form #selectedRecordsForm=\"ngForm\">\n            <div\n              *ngFor=\"\n              let record of selectedRecords;\n              let index = index;\n              let first = first;\n              let last = last;\n            \"\n              class=\"designer-modal-accordion-content\"\n              cdkDrag\n              cdkDragLockAxis=\"y\"\n              [cdkDragDisabled]=\"true\"\n            >\n              <adapt-accordion-tab\n                class=\"d-block\"\n                [isOpen]=\"record.isOpen\"\n                (open)=\"record.isOpen = true\"\n                (close)=\"record.isOpen = false\"\n              >\n                <div class=\"card-title-text w-100\">\n                  <div class=\"designer-modal-card-title-content\">\n                    <div class=\"left-header-block pl-0\">\n                      <div class=\"rx-ellipsis\" [title]=\"record.definitionName\" rx-id=\"card-title\">\n                        {{ record.definitionName }}\n                      </div>\n                    </div>\n\n                    <div *ngIf=\"!config.isReadOnly\" class=\"right-header-block\">\n                      <button\n                        class=\"d-icon-left-cross_adapt p-1 pr-4 ml-3\"\n                        adapt-button\n                        size=\"small\"\n                        type=\"button\"\n                        (click)=\"$event.stopPropagation(); removeRecord(record)\"\n                        rx-id=\"remove-button\"\n                      >\n                        {{ 'com.bmc.arsys.rx.client.common.remove.label' | translate }}\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <rx-definition-picker\n                  class=\"d-block w-50\"\n                  [name]=\"'selectedRecordName-' + index\"\n                  required=\"true\"\n                  [isDisabled]=\"config.isReadOnly\"\n                  [options]=\"definitionPickerOptions\"\n                  [(ngModel)]=\"record.view\"\n                  (ngModelChange)=\"markAsDirty()\"\n                ></rx-definition-picker>\n              </adapt-accordion-tab>\n            </div>\n          </form>\n        </adapt-accordion>\n      </div>\n\n      <div *ngIf=\"!selectedRecords.length\" class=\"d-flex justify-content-center h-100 align-items-center mt-2\">\n        <adapt-empty-state\n          class=\"w-100\"\n          label=\"{{ 'com.bmc.arsys.rx.client.shell.shell-global-search-records.record-included-in-search-results.empty-state.message' | translate }}\"\n          type=\"config\"\n        ></adapt-empty-state>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!config.isReadOnly\"\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    [disabled]=\"selectedRecordsForm.form.invalid || !isDirty()\"\n    (click)=\"onSave()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    btn-type=\"secondary\"\n    type=\"button\"\n    rx-id=\"cancel-button\"\n    (click)=\"activeModalRef.dismiss(DismissReasons.CLOSE_BTN)\"\n  >\n    {{ config.isReadOnly ? ('com.bmc.arsys.rx.client.common.close.label' | translate) : ('com.bmc.arsys.rx.client.common.cancel.label' | translate) }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}:host::ng-deep .a-tree__node_leaf .a-tree__toggle{display:none}\n"], components: [{ type: i1$3.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i1$3.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }, { type: i1$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i1$3.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i1$3.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i4.RxDefinitionPickerComponent, selector: "rx-definition-picker", inputs: ["options", "isDisabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i1$3.AdaptTreeNodeTemplateDirective, selector: "[adaptTreeNodeTemplate]", inputs: ["adaptTreeNodeTemplate"] }, { type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i8.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-global-search-records-modal',
                    templateUrl: './shell-global-search-records-modal.component.html',
                    styleUrls: ['./shell-global-search-records-modal.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1$3.ActiveModalRef }, { type: i2$1.RxRecordDefinitionDataPageService }, { type: i2.RxDefinitionNameService }, { type: i0.Injector }]; }, propDecorators: { accordionTabEls: [{
                type: ViewChildren,
                args: [AdaptAccordionTabComponent, { read: ElementRef }]
            }], selectedRecordsForm: [{
                type: ViewChild,
                args: ['selectedRecordsForm', { read: NgForm, static: true }]
            }] } });

class RxShellGlobalSearchRecordsControlComponent extends ValueAccessor {
    constructor(rxModalService) {
        super();
        this.rxModalService = rxModalService;
    }
    openModal(recordToEdit) {
        this.rxModalService
            .openModal({
            title: 'Configure results view',
            data: {
                selectedRecords: this.value,
                recordToEdit,
                isReadOnly: this.isDisabled
            },
            content: RxShellGlobalSearchRecordsModalComponent,
            size: OpenViewActionModalSize.Large,
            testID: 'configure-results-view'
        })
            .then((records) => {
            this.value = records;
        })
            .catch(noop);
    }
    focus() {
        this.openModal();
    }
    edit(record) {
        this.openModal(record);
    }
    remove(record) {
        this.value = this.value.filter((item) => item !== record);
    }
}
RxShellGlobalSearchRecordsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlComponent, deps: [{ token: i1$2.RxModalService }], target: i0.ɵɵFactoryTarget.Component });
RxShellGlobalSearchRecordsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellGlobalSearchRecordsControlComponent, selector: "rx-shell-global-search-records-control", inputs: { options: "options" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RxShellGlobalSearchRecordsControlComponent,
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: "<adapt-button btn-type=\"tertiary\" rx-id=\"open-modal-button\" class=\"p-0 pb-1\" (click)=\"openModal()\" [hidden]=\"isDisabled\">\n  <span class=\"d-icon-plus_circle\"></span>\n  Configure results view\n</adapt-button>\n\n<ng-container *ngIf=\"value.length\">\n  <div class=\"my-1\">Records included in search results</div>\n\n  <div class=\"border px-2 py-1 mb-1 global-records-list\" *ngFor=\"let item of value\">\n    <div class=\"d-flex\">\n      <strong class=\"mr-auto mt-1 d-flex global-record-title flex-fill text-truncate\">{{ item.definitionName }}</strong>\n\n      <button\n        class=\"d-icon-left-pencil p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"edit-button\"\n        (click)=\"edit(item)\"\n      ></button>\n\n      <button\n        class=\"d-icon-left-cross_adapt p-1\"\n        adapt-button\n        btn-type=\"tertiary\"\n        size=\"small\"\n        type=\"button\"\n        rx-id=\"remove-button\"\n        *ngIf=\"!isDisabled\"\n        (click)=\"remove(item)\"\n      ></button>\n    </div>\n  </div>\n</ng-container>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.global-records-list{margin-bottom:5px;border:1px solid #d6d7d8;border-radius:2px;padding:5px 10px;word-break:break-all;font-weight:var(--font-weight-bold)}.global-record-title{font-size:14px}\n"], components: [{ type: i1$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-global-search-records-control',
                    templateUrl: './shell-global-search-records-control.component.html',
                    styleUrls: ['./shell-global-search-records-control.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RxShellGlobalSearchRecordsControlComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RxModalService }]; }, propDecorators: { options: [{
                type: Input
            }] } });

class RxShellMenuItemsControlComponent extends InspectorWidgetBase {
    constructor(injector, rxUtilityModalsService) {
        super(injector);
        this.injector = injector;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.menuGroupLabel = 'Menu group';
        this.menuItemTypeToLabelMap = {
            [RX_SHELL.navBar.menuItem]: 'Menu item',
            [RX_SHELL.navBar.menuGroup]: this.menuGroupLabel,
            [RX_SHELL.navBar.userMenu]: this.menuGroupLabel
        };
        this.actionNameToLabelMap = {
            [RX_SHELL.actions.launchURL]: 'Launch URL',
            [RX_SHELL.actions.navigateToView]: 'Navigate to view',
            [RX_SHELL.actions.navigateToSmartReporting]: 'Navigate to Smart Reporting'
        };
    }
    edit(menuItem) {
        this.designerItemModel.selectMenuItem(menuItem.guid);
    }
    remove(menuItem) {
        this.rxUtilityModalsService
            .confirm('Are you sure you want to delete this menu item?')
            .then((isConfirmed) => {
            if (isConfirmed) {
                this.designerItemModel.removeMenuItem(menuItem.guid);
            }
        });
    }
    canBeRemoved(menuItem) {
        return menuItem.type !== RX_SHELL.navBar.userMenu && !this.isDisabled;
    }
    trackByGuid(index, menuItem) {
        return menuItem.guid;
    }
}
RxShellMenuItemsControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlComponent, deps: [{ token: i0.Injector }, { token: i1$2.RxUtilityModalsService }], target: i0.ɵɵFactoryTarget.Component });
RxShellMenuItemsControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemsControlComponent, selector: "rx-shell-menu-items-control", inputs: { options: "options", isDisabled: "isDisabled" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"this.designerItemModel.menuItems$ | async as menuItems\">\n  <p *ngIf=\"menuItems.length === 0\">\n    No menu items have been defined. Drag and drop menu groups or menu items onto the canvas to define the menu.\n  </p>\n\n  <div *ngFor=\"let item of menuItems; trackBy: trackByGuid\">\n    <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: item }\"></ng-container>\n\n    <div class=\"ml-2\" *ngFor=\"let child of item.children; trackBy: trackByGuid\">\n      <ng-container *ngTemplateOutlet=\"itemTpl; context: { $implicit: child }\"></ng-container>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #itemTpl let-item>\n  <div class=\"border px-2 py-1 mb-2 d-flex align-items-start\">\n    <div class=\"mr-auto\">\n      <div class=\"font-weight-bold\">{{ item.data.menuItemName || item.data.menuGroupName }}</div>\n      <span class=\"text-secondary\">{{ menuItemTypeToLabelMap[item.type] }}</span>\n      <span class=\"text-secondary\" *ngIf=\"item.data.actionName\">\n        ({{ actionNameToLabelMap[item.data.actionName] }})</span\n      >\n    </div>\n\n    <button\n      class=\"d-icon-left-pencil p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"edit-button\"\n      (click)=\"edit(item)\"\n    ></button>\n\n    <button\n      class=\"d-icon-left-cross_adapt p-1\"\n      adapt-button\n      btn-type=\"tertiary\"\n      size=\"small\"\n      type=\"button\"\n      rx-id=\"remove-button\"\n      *ngIf=\"canBeRemoved(item)\"\n      (click)=\"remove(item)\"\n    ></button>\n  </div>\n</ng-template>\n", components: [{ type: i1$3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-menu-items-control',
                    templateUrl: './shell-menu-items-control.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1$2.RxUtilityModalsService }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });

class RxShellDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.allowAppSwitching$ = this.sandbox.getComponentPropertyValue('allowAppSwitching');
        this.globalSearchEnabled$ = this.sandbox.getComponentPropertyValue('globalSearchEnabled');
        this.menuItems$ = this.sandbox.getChildComponentsTree();
        this.childMenuItemsCount$ = this.sandbox
            .getChildComponentGuids((component) => component.type === RX_SHELL.navBar.menuItem, true)
            .pipe(map((items) => items.length), distinctUntilChanged());
    }
    static getInitialProperties(initialProperties) {
        const result = Object.assign(Object.assign({ allowAppSwitching: true, globalSearchDisabled: true, globalSearchRecords: [] }, initialProperties), { 
            // removing custom search state if definition saved in old designer
            // as custom state not supported anymore
            globalSearchUseDefault: true, globalSearchCustomSearchState: null });
        // additional inverted design field
        result.globalSearchEnabled = !result.globalSearchDisabled;
        return result;
    }
    rxInit() {
        this.sandbox.getComponentPropertyValue('globalSearchDisabled').subscribe((globalSearchDisabled) => {
            this.sandbox.updateInspectorConfig(this.getInspector(globalSearchDisabled));
        });
        this.globalSearchEnabled$.subscribe((globalSearchEnabled) => {
            this.sandbox.updateComponentProperties({ globalSearchDisabled: !globalSearchEnabled });
        });
        combineLatest([
            this.sandbox.getComponentPropertyValue('globalSearchRecords'),
            this.sandbox.getComponentPropertyValue('globalSearchDisabled'),
            this.childMenuItemsCount$
        ]).subscribe(([globalSearchRecords, globalSearchDisabled, childMenuItemsCount]) => {
            this.sandbox.setValidationIssues(this.validate(globalSearchRecords, globalSearchDisabled, childMenuItemsCount));
        });
    }
    getPropertiesByName(props) {
        return omit(props, 'globalSearchEnabled');
    }
    removeMenuItem(guid) {
        this.sandbox.removeComponents([guid]);
    }
    selectMenuItem(guid) {
        this.sandbox.selectComponent(guid);
    }
    validate(globalSearchRecords, globalSearchDisabled, childMenuItemsCount) {
        const validationIssues = [];
        if (childMenuItemsCount === 0) {
            validationIssues.push(this.sandbox.createError('Please add at least one menu item.'));
        }
        if (!globalSearchDisabled && globalSearchRecords.length === 0) {
            validationIssues.push(this.sandbox.createError('Please include at least one record in the global search results view.', 'globalSearchRecords'));
        }
        return validationIssues;
    }
    getInspector(globalSearchDisabled) {
        const globalSearchSectionItems = [
            {
                name: 'globalSearchEnabled',
                component: SwitchFormControlComponent,
                options: {
                    label: 'Enable global search'
                }
            }
        ];
        if (!globalSearchDisabled) {
            globalSearchSectionItems.push({
                name: 'globalSearchRecords',
                component: RxShellGlobalSearchRecordsControlComponent
            });
        }
        return {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'allowAppSwitching',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Enable application launcher'
                            }
                        }
                    ]
                },
                {
                    label: 'Global search',
                    controls: globalSearchSectionItems
                },
                {
                    label: 'Menu items',
                    controls: [
                        {
                            component: RxShellMenuItemsControlComponent,
                            options: {
                                model: this
                            }
                        }
                    ]
                }
            ]
        };
    }
}

class RxShellDesignComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
    }
    dropPredicate(data) {
        return data.draggedViewComponentDescriptor.type !== RX_SHELL.navBar.action;
    }
    dropPredicateAction(data) {
        return data.draggedViewComponentDescriptor.type === RX_SHELL.navBar.action;
    }
}
RxShellDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignComponent, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxShellDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellDesignComponent, selector: "rx-shell-design", inputs: { model: "model" }, ngImport: i0, template: "<div class=\"shell-design d-flex align-items-start pl-2\">\n  <span class=\"a-product\">\n    <span class=\"a-product__logo logo-light logo-helix\"></span>\n    <span class=\"a-product__name\">\n      {{ viewDesignerFacade.bundleFriendlyName$ | async }}\n    </span>\n  </span>\n\n  <span class=\"a-sep\"></span>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet d-block flex-grow-1\"\n    [class.allow-app-switch]=\"model.allowAppSwitching$ | async\"\n    [class.global-search]=\"model.globalSearchEnabled$ | async\"\n    dropListOrientation=\"horizontal\"\n    [dropPredicate]=\"dropPredicate\"\n  ></rx-canvas-outlet>\n\n  <rx-canvas-outlet\n    class=\"shell-design-outlet actions d-block flex-grow-1\"\n    [name]=\"'actions'\"\n    [dropPredicate]=\"dropPredicateAction\"\n    dropListOrientation=\"horizontal\"\n  ></rx-canvas-outlet>\n\n  <span *ngIf=\"model.globalSearchEnabled$ | async\" class=\"shell-button d-icon-search ml-auto\"></span>\n  <span *ngIf=\"model.allowAppSwitching$ | async\" class=\"shell-button d-icon-tiles ml-auto\"></span>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.shell-design{background:#313538;color:#fff;min-height:50px;border-bottom:2px solid #f86e00;padding-right:60px}.shell-design-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{display:flex;flex-flow:row wrap;min-height:50px}:host::ng-deep .shell-design-outlet.actions>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{justify-content:flex-end}.shell-design-outlet ::ng-deep .canvas-rx-shell-user-menu{position:absolute;top:0;right:calc(-150px - 44px)}.shell-design-outlet.allow-app-switch ::ng-deep .canvas-rx-shell-user-menu,.shell-design-outlet.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 86px)}.shell-design-outlet.allow-app-switch.global-search ::ng-deep .canvas-rx-shell-user-menu{right:calc(-150px - 128px)}.shell-design-outlet.actions{max-width:150px;min-width:150px}.shell-button{font-size:20px;margin-top:10px;width:42px;text-align:center}.a-product{margin-top:10px}\n"], components: [{ type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-design',
                    templateUrl: './shell-design.component.html',
                    styleUrls: ['./shell-design.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; }, propDecorators: { model: [{
                type: Input
            }] } });

class RxShellGlobalSearchRecordsModalModule {
}
RxShellGlobalSearchRecordsModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellGlobalSearchRecordsModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, declarations: [RxShellGlobalSearchRecordsModalComponent], imports: [CommonModule,
        FormsModule,
        DragDropModule,
        AdaptEmptyStateModule,
        AdaptButtonModule,
        AdaptAccordionModule,
        RxDefinitionPickerModule,
        AdaptTreeModule,
        TranslateModule], exports: [RxShellGlobalSearchRecordsModalComponent] });
RxShellGlobalSearchRecordsModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, imports: [[
            CommonModule,
            FormsModule,
            DragDropModule,
            AdaptEmptyStateModule,
            AdaptButtonModule,
            AdaptAccordionModule,
            RxDefinitionPickerModule,
            AdaptTreeModule,
            TranslateModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellGlobalSearchRecordsModalComponent],
                    exports: [RxShellGlobalSearchRecordsModalComponent],
                    entryComponents: [RxShellGlobalSearchRecordsModalComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        DragDropModule,
                        AdaptEmptyStateModule,
                        AdaptButtonModule,
                        AdaptAccordionModule,
                        RxDefinitionPickerModule,
                        AdaptTreeModule,
                        TranslateModule
                    ]
                }]
        }] });

class RxShellGlobalSearchRecordsControlModule {
}
RxShellGlobalSearchRecordsControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellGlobalSearchRecordsControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlModule, declarations: [RxShellGlobalSearchRecordsControlComponent], imports: [CommonModule, AdaptButtonModule, RxShellGlobalSearchRecordsModalModule], exports: [RxShellGlobalSearchRecordsControlComponent] });
RxShellGlobalSearchRecordsControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlModule, imports: [[CommonModule, AdaptButtonModule, RxShellGlobalSearchRecordsModalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellGlobalSearchRecordsControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellGlobalSearchRecordsControlComponent],
                    exports: [RxShellGlobalSearchRecordsControlComponent],
                    entryComponents: [RxShellGlobalSearchRecordsControlComponent],
                    imports: [CommonModule, AdaptButtonModule, RxShellGlobalSearchRecordsModalModule]
                }]
        }] });

class RxShellMenuItemsControlModule {
}
RxShellMenuItemsControlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellMenuItemsControlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlModule, declarations: [RxShellMenuItemsControlComponent], imports: [CommonModule, AdaptButtonModule] });
RxShellMenuItemsControlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlModule, imports: [[CommonModule, AdaptButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemsControlModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellMenuItemsControlComponent],
                    imports: [CommonModule, AdaptButtonModule]
                }]
        }] });

class RxShellDesignAdapterService {
    constructor(rxGuidService) {
        this.rxGuidService = rxGuidService;
    }
    adaptDefinition(componentDefinition) {
        this.addAddUserMenu(componentDefinition);
        this.addActionsOutlet(componentDefinition);
    }
    addAddUserMenu(componentDefinition) {
        const userMenuGuid = this.rxGuidService.generate();
        const userMenuDefinition = {
            resourceType: RX_VIEW_DEFINITION.resourceTypes.containerViewComponent,
            guid: userMenuGuid,
            type: RX_SHELL.navBar.userMenu,
            layout: JSON.stringify(RxViewLayout.getViewLayoutForDefaultOutlet()),
            componentDefinitions: [],
            propertiesByName: {
                menuGroupName: 'User menu'
            }
        };
        const userMenu = componentDefinition.componentDefinitions.find((component) => component.type === RX_SHELL.navBar.userMenu);
        if (!userMenu) {
            const layout = JSON.parse(componentDefinition.layout);
            layout.outlets[0].columns[0].children.push(userMenuGuid);
            componentDefinition.layout = JSON.stringify(layout);
            componentDefinition.componentDefinitions.push(userMenuDefinition);
        }
    }
    addActionsOutlet(componentDefinition) {
        const layout = JSON.parse(componentDefinition.layout);
        if (!layout.outlets.find((outlet) => outlet.name === RX_SHELL.outlets.actions)) {
            layout.outlets.push(RxViewLayout.getOutlet(RX_SHELL.outlets.actions));
            componentDefinition.layout = JSON.stringify(layout);
        }
    }
}
RxShellDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService, deps: [{ token: i1$4.RxGuidService }], target: i0.ɵɵFactoryTarget.Injectable });
RxShellDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$4.RxGuidService }]; } });

class RxShellDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellDesignAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxShellDesignAdapterService = rxShellDesignAdapterService;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.componentName,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                },
                {
                    name: RX_SHELL.outlets.actions
                }
            ],
            properties: [
                {
                    name: 'allowAppSwitching',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchDisabled',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchUseDefault',
                    designType: ViewComponentPropertyType.Boolean
                },
                {
                    name: 'globalSearchRecords',
                    designType: ViewComponentPropertyType.Array
                }
            ],
            name: 'Navigation bar',
            hidden: true,
            group: 'Shell navigation',
            icon: 'layout',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellDesignComponent),
            designComponentModel: RxShellDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            options: {
                static: true
            }
        });
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RX_SHELL.componentName, this.rxShellDesignAdapterService);
    }
}
RxShellDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, deps: [{ token: i1$5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxDefinitionAdapterRegistryService }, { token: RxShellDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, declarations: [RxShellDesignComponent], imports: [CommonModule,
        ViewDesignerCanvasModule,
        RxShellGlobalSearchRecordsControlModule,
        RxShellMenuItemsControlModule] });
RxShellDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, providers: [RxShellDesignAdapterService], imports: [[
            CommonModule,
            ViewDesignerCanvasModule,
            RxShellGlobalSearchRecordsControlModule,
            RxShellMenuItemsControlModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellDesignComponent],
                    imports: [
                        CommonModule,
                        ViewDesignerCanvasModule,
                        RxShellGlobalSearchRecordsControlModule,
                        RxShellMenuItemsControlModule
                    ],
                    providers: [RxShellDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxDefinitionAdapterRegistryService }, { type: RxShellDesignAdapterService }]; } });

class RxShellMenuItemDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.label$ = this.componentProperties$.pipe(pluck('menuItemName'));
        this.isActionItem$ = this.sandbox.getParentComponentGuid().pipe(switchMap((guid) => this.sandbox.getLayout(guid)), map((layout) => this.isActionItem(layout)));
        this.menuItemIcon$ = this.sandbox.getComponentPropertyValue('menuItemIcon');
        this.iconClass$ = this.menuItemIcon$.pipe(map((className) => (className ? `d-icon-left-${className}` : '')));
        this.menuItemNameLabel = 'Label';
        this.rxViewDefinitionCacheService = this.injector.get(RxViewDefinitionCacheService);
        this.viewDesignerFacade = this.injector.get(ViewDesignerFacade);
        this.rxOpenViewModelHelperService = this.injector.get(RxOpenViewModelHelperService);
        this.shellActions = {
            [RX_SHELL.actions.launchURL]: {
                name: RX_SHELL.actions.launchURL,
                label: 'Launch URL',
                parameters: [
                    {
                        name: 'url',
                        component: TextFormControlComponent,
                        options: {
                            label: 'URL',
                            required: true
                        }
                    },
                    {
                        name: 'launchBehavior',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Launch behavior',
                            options: map$1(RX_LAUNCH_BEHAVIOR, (value) => ({
                                name: value.content,
                                id: value.value
                            })),
                            required: true,
                            sortAlphabetically: false
                        }
                    }
                ],
                requiredParams: {
                    url: 'URL',
                    launchBehavior: 'Launch behavior'
                },
                defaultParams: {
                    url: null,
                    launchBehavior: RX_LAUNCH_BEHAVIOR.newWindow.value
                }
            },
            [RX_SHELL.actions.navigateToView]: {
                name: RX_SHELL.actions.navigateToView,
                label: 'Open view',
                requiredParams: {
                    viewDefinitionName: 'View'
                },
                defaultParams: {
                    viewDefinitionName: null,
                    'viewParams.*': null,
                    'presentation.type': OpenViewActionType.FullWidth,
                    'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow,
                    'presentation.modalSize': null,
                    'presentation.title': null
                }
            },
            [RX_SHELL.actions.navigateToSmartReporting]: {
                name: RX_SHELL.actions.navigateToSmartReporting,
                label: 'Navigate to Smart Reporting'
            }
        };
        this.viewDefinitionName$ = this.sandbox.getComponentPropertyValue('viewDefinitionName');
        this.inputParams$ = this.viewDefinitionName$.pipe(switchMap((viewDefinitionName) => this.getViewInputParams(viewDefinitionName)), map((params) => map$1(params, 'name')), tap((currentViewInputNames) => {
            this.currentViewInputNames = currentViewInputNames;
        }));
        this.currentViewInputNames = [];
        this.isInShellRoot$ = this.sandbox.getParentComponentGuid().pipe(switchMap((guid) => this.viewDesignerFacade.getComponentType(guid)), map((type) => type === RX_SHELL.componentName), tap((isInShellRoot) => (this.isInShellRoot = isInShellRoot)));
    }
    static getInitialProperties(initialProperties) {
        const result = Object.assign({ menuItemName: 'New menu item', menuItemIcon: null, hidden: false, styles: null, actionName: RX_SHELL.actions.navigateToView, 'presentation.type': OpenViewActionType.FullWidth, 'presentation.launchBehavior': OpenViewActionLaunchBehavior.SameWindow }, initialProperties);
        // navigateToState not supported anymore, so converting to navigateToView
        if (result.actionName === RX_SHELL.actions.navigateToState) {
            result.actionName = RX_SHELL.actions.navigateToView;
            delete result.state;
        }
        if (result.actionName === RX_SHELL.actions.navigateToView) {
            result['presentation.modalSize'] = OpenViewActionModalSize.Medium;
        }
        return result;
    }
    static getDefaultPermissions() {
        return [
            {
                ownerId: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                type: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
            }
        ];
    }
    rxInit() {
        combineLatest([this.componentProperties$, this.inputParams$, this.isInShellRoot$, this.isActionItem$]).subscribe(([props, inputParams, isInShellRoot, isActionItem]) => {
            this.sandbox.updateInspectorConfig(this.getInspector(props, inputParams, isInShellRoot, isActionItem));
            this.sandbox.setValidationIssues(this.validate(props));
        });
        // clear view input params after viewDefinitionName is changed
        this.viewDefinitionName$
            .pipe(skip(1), withLatestFrom(this.componentProperties$))
            .subscribe(([viewDefinitionName, props]) => {
            const viewParams = this.getEmptyViewParams(props);
            if (!isEmpty(viewParams)) {
                this.sandbox.updateComponentProperties(viewParams);
            }
        });
        this.sandbox.getComponentPropertyValue('menuItemName').subscribe((menuGroupName) => {
            this.sandbox.setBreadcrumbs(menuGroupName);
        });
        // clear previous action properties after actionName is changed
        this.sandbox
            .getComponentPropertyValue('actionName')
            .pipe(pairwise(), withLatestFrom(this.componentProperties$))
            .subscribe(([[prevActionName, actionName], props]) => {
            const prevProps = this.getActionDefaultProps(prevActionName, props);
            const nextProps = this.getActionDefaultProps(actionName, props);
            const result = Object.assign(Object.assign({}, prevProps), nextProps);
            if (!isEmpty(result)) {
                this.sandbox.updateComponentProperties(result);
            }
        });
    }
    getPropertiesByName(props) {
        const componentProps = ['menuItemName', 'menuItemIcon', 'hidden', 'styles', 'actionName'];
        const viewParams = props.actionName === RX_SHELL.actions.navigateToView
            ? this.currentViewInputNames.map((name) => `viewParams.${name}`)
            : [];
        const actionProps = reject(this.getActionProps(props.actionName, props), (prop) => {
            return props['presentation.type'] === OpenViewActionType.FullWidth
                ? prop === 'presentation.modalSize' || prop === 'presentation.title'
                : prop === 'presentation.launchBehavior';
        });
        return pick(props, ...componentProps, ...actionProps, ...viewParams);
    }
    getEmptyViewParams(props) {
        return transform(props, (result, value, key) => {
            if (key.startsWith('viewParams')) {
                result[key] = null;
            }
        }, {});
    }
    getActionDefaultProps(actionName, props) {
        const currentAction = this.shellActions[actionName];
        return transform(currentAction.defaultParams, (res, value, name) => {
            if (name.endsWith('.*')) {
                const key = name.replace('*', '');
                forEach(props, (propValue, propName) => {
                    if (propName.startsWith(key)) {
                        res[propName] = value;
                    }
                });
            }
            else {
                res[name] = value;
            }
        }, {});
    }
    getActionProps(actionName, props) {
        const currentAction = this.shellActions[actionName];
        return transform(currentAction.defaultParams, (res, value, name) => {
            if (!name.endsWith('.*')) {
                res.push(name);
            }
        }, []);
    }
    getInspector(props, viewInputParamNames, isInShellRoot, isActionItem = false) {
        var _a;
        const inspector = {
            inspectorSectionConfigs: [
                {
                    label: 'General',
                    controls: [
                        {
                            name: 'menuItemName',
                            component: TextFormControlComponent,
                            options: {
                                label: this.menuItemNameLabel,
                                required: true
                            }
                        },
                        {
                            name: 'hidden',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Hidden'
                            }
                        },
                        {
                            name: 'styles',
                            component: TagsFormControlComponent,
                            options: {
                                label: 'CSS classes',
                                placeholder: 'Add CSS classes',
                                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                                errorCheck: validateCssClassName
                            }
                        },
                        {
                            component: RxComponentPermissionEditorWidgetComponent,
                            options: {
                                label: 'Permissions',
                                type: 'view',
                                componentGuid: this.sandbox.guid
                            }
                        }
                    ]
                }
            ]
        };
        const menuItemIconControl = {
            name: 'menuItemIcon',
            component: IconPickerFormControlComponent,
            options: {
                label: 'Icon'
            }
        };
        if (!isInShellRoot || isActionItem) {
            inspector.inspectorSectionConfigs[0].controls.splice(1, 0, menuItemIconControl);
        }
        const actionSection = {
            label: 'Action',
            controls: [
                {
                    name: 'actionName',
                    component: SelectFormControlComponent,
                    options: {
                        label: 'Action name',
                        options: map$1(this.shellActions, (actionDescriptor) => ({
                            name: actionDescriptor.label,
                            id: actionDescriptor.name
                        }))
                    }
                }
            ]
        };
        inspector.inspectorSectionConfigs.push(actionSection);
        if (props.actionName) {
            const actionDescriptor = this.shellActions[props.actionName];
            if ((_a = actionDescriptor === null || actionDescriptor === void 0 ? void 0 : actionDescriptor.parameters) === null || _a === void 0 ? void 0 : _a.length) {
                actionSection.controls.push(...actionDescriptor.parameters);
            }
            if (props.actionName === RX_SHELL.actions.navigateToView) {
                actionSection.controls.push(...this.rxOpenViewModelHelperService.getOpenViewInspector(viewInputParamNames.map((name) => ({ name })), props['presentation.type'], props['presentation.modalSize'], this.expressionConfigurator));
            }
        }
        return inspector;
    }
    validate(props) {
        const validationIssues = [];
        if (!trim(props.menuItemName)) {
            validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuItemName'));
        }
        validationIssues.push(...this.validateActionParams(props), ...validateCssClassNames(props.styles));
        return validationIssues;
    }
    validateActionParams(props) {
        const validationIssues = [];
        const currentAction = this.shellActions[props.actionName];
        (keys(currentAction.requiredParams) || [])
            .filter((param) => !props[param])
            .forEach((param) => {
            validationIssues.push(this.sandbox.createError(`${currentAction.requiredParams[param] || param} cannot be blank.`, param));
        });
        return validationIssues;
    }
    getViewInputParams(viewDefinitionName) {
        return viewDefinitionName
            ? this.rxViewDefinitionCacheService.getViewDefinition(viewDefinitionName).pipe(pluck('inputParams'))
            : of([]);
    }
    isActionItem(layout) {
        const actionOutlet = layout === null || layout === void 0 ? void 0 : layout.outlets.find((outlet) => outlet.name === RX_SHELL.outlets.actions);
        return (actionOutlet && RxViewLayout.outletHasChild(actionOutlet, this.sandbox.guid)) || false;
    }
}

class RxShellMenuItemDesignComponent {
}
RxShellMenuItemDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellMenuItemDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuItemDesignComponent, selector: "rx-shell-menu-item-design", inputs: { model: "model" }, ngImport: i0, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\">{{ model.label$ | async }}</span>\n", styles: [":host{min-height:42px;display:flex;align-items:center}.label{padding:0 10px;font-size:14px;cursor:pointer}\n"], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-menu-item-design',
                    templateUrl: './shell-menu-item-design.component.html',
                    styleUrls: ['./shell-menu-item-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });

class RxShellMenuItemExpressionConfigurator extends RxExpressionConfigurator {
    constructor() {
        super(...arguments);
        this.commonDataDictionary$ = of([
            {
                label: 'General',
                expanded: true,
                children: [
                    {
                        label: 'Current person ID',
                        expression: '${keywords.personId}'
                    },
                    {
                        label: 'Current user ID',
                        expression: '${keywords.userId}'
                    }
                ]
            }
        ]);
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
}

class RxShellMenuItemDesignAdapterService {
    adaptDefinition(componentDefinition) {
        if (componentDefinition.propertiesByName.menuItemIcon) {
            componentDefinition.propertiesByName.menuItemIcon = get(RX_LEGACY_ICONS, componentDefinition.propertiesByName.menuItemIcon, componentDefinition.propertiesByName.menuItemIcon);
        }
    }
}
RxShellMenuItemDesignAdapterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxShellMenuItemDesignAdapterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignAdapterService, decorators: [{
            type: Injectable
        }] });

class RxShellMenuItemDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver, rxDefinitionAdapterRegistryService, rxShellMenuItemDesignAdapterService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxShellMenuItemDesignAdapterService = rxShellMenuItemDesignAdapterService;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.menuItem,
            properties: [
                {
                    name: 'menuItemName',
                    localizable: true
                },
                {
                    name: 'hidden',
                    designType: ViewComponentPropertyType.Boolean
                }
            ],
            name: 'Menu item',
            group: 'Shell navigation',
            icon: 'list',
            index: 2,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuItemDesignComponent),
            designComponentModel: RxShellMenuItemDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            expressionConfigurator: RxShellMenuItemExpressionConfigurator
        });
        this.rxDefinitionAdapterRegistryService.registerDesignAdapter(RX_SHELL.navBar.menuItem, this.rxShellMenuItemDesignAdapterService);
    }
}
RxShellMenuItemDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, deps: [{ token: i1$5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.RxDefinitionAdapterRegistryService }, { token: RxShellMenuItemDesignAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellMenuItemDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, declarations: [RxShellMenuItemDesignComponent], imports: [CommonModule] });
RxShellMenuItemDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, providers: [RxShellMenuItemDesignAdapterService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuItemDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellMenuItemDesignComponent],
                    imports: [CommonModule],
                    providers: [RxShellMenuItemDesignAdapterService]
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.RxDefinitionAdapterRegistryService }, { type: RxShellMenuItemDesignAdapterService }]; } });

class RxShellMenuGroupDesignModel extends ViewDesignerComponentModel {
    constructor() {
        super(...arguments);
        this.componentProperties$ = this.sandbox.componentProperties$;
        this.label$ = this.componentProperties$.pipe(pluck('menuGroupName'));
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ menuGroupName: 'Menu group', hidden: false, styles: null }, initialProperties);
    }
    static getDefaultPermissions() {
        const defaultPermissions = [
            {
                ownerId: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermission,
                type: RX_PERMISSION.permissionDialogMetadata.viewComponent.defaultPermittedAction
            }
        ];
        return defaultPermissions;
    }
    rxInit() {
        this.sandbox.updateInspectorConfig(this.getInspector());
        this.componentProperties$.subscribe((props) => {
            this.sandbox.setValidationIssues(this.validate(props));
        });
        this.sandbox.getComponentPropertyValue('menuGroupName').subscribe((menuGroupName) => {
            this.sandbox.setBreadcrumbs(menuGroupName);
        });
    }
    validate(props) {
        const validationIssues = [];
        if (!trim(props.menuGroupName)) {
            validationIssues.push(this.sandbox.createError('Label cannot be blank.', 'menuGroupName'));
        }
        validationIssues.push(...validateCssClassNames(props.styles));
        return validationIssues;
    }
    getInspector() {
        return {
            inspectorSectionConfigs: [
                {
                    label: 'Properties',
                    controls: [
                        {
                            name: 'menuGroupName',
                            component: TextFormControlComponent,
                            options: {
                                label: 'Label',
                                required: true
                            }
                        },
                        {
                            name: 'hidden',
                            component: SwitchFormControlComponent,
                            options: {
                                label: 'Hidden'
                            }
                        },
                        {
                            name: 'styles',
                            component: TagsFormControlComponent,
                            options: {
                                label: 'CSS classes',
                                placeholder: 'Add CSS classes',
                                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                                errorCheck: validateCssClassName
                            }
                        },
                        {
                            component: RxComponentPermissionEditorWidgetComponent,
                            options: {
                                label: 'Permissions',
                                type: 'view',
                                componentGuid: this.sandbox.guid
                            }
                        }
                    ]
                }
            ]
        };
    }
}

class RxShellMenuGroupDesignComponent {
    dropPredicate(data) {
        return data.draggedViewComponentDescriptor.type === RX_SHELL.navBar.menuItem;
    }
}
RxShellMenuGroupDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellMenuGroupDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellMenuGroupDesignComponent, selector: "rx-shell-menu-group-design", inputs: { model: "model" }, ngImport: i0, template: "<div adaptDropdown [autoClose]=\"false\" [placement]=\"['bottom-left']\">\n  <div class=\"label-wrapper pr-0\" adaptDropdownToggle>\n    <span class=\"label d-icon-right-angle_down\">{{ model.label$ | async }}</span>\n  </div>\n\n  <rx-canvas-outlet adaptDropdownMenu [dropPredicate]=\"dropPredicate\"></rx-canvas-outlet>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.label-wrapper{min-height:42px;display:flex;align-items:center;cursor:pointer}.label{padding:0 10px;font-size:14px}rx-canvas-outlet{background:#313538;color:#fff;width:250px;overflow-x:hidden}rx-canvas-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{min-height:200px}\n"], components: [{ type: i1$3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i1$3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1$3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-menu-group-design',
                    templateUrl: './shell-menu-group-design.component.html',
                    styleUrls: ['./shell-menu-group-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });

class RxShellMenuGroupDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.menuGroup,
            properties: [
                {
                    name: 'menuGroupName',
                    localizable: true
                },
                {
                    name: 'hidden',
                    designType: ViewComponentPropertyType.Boolean
                }
            ],
            name: 'Menu',
            group: 'Shell navigation',
            icon: 'app_list',
            index: 1,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellMenuGroupDesignComponent),
            designComponentModel: RxShellMenuGroupDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ]
        });
    }
}
RxShellMenuGroupDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, deps: [{ token: i1$5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellMenuGroupDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, declarations: [RxShellMenuGroupDesignComponent], imports: [CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule] });
RxShellMenuGroupDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, imports: [[CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellMenuGroupDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellMenuGroupDesignComponent],
                    imports: [CommonModule, ViewDesignerCanvasModule, RxComponentPermissionEditorWidgetModule, AdaptDropdownModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });

class RxShellUserMenuDesignComponent {
    dropPredicate(data) {
        return data.draggedViewComponentDescriptor.type === RX_SHELL.navBar.menuItem;
    }
}
RxShellUserMenuDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellUserMenuDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellUserMenuDesignComponent, selector: "rx-shell-user-menu-design", ngImport: i0, template: "<div adaptDropdown [autoClose]=\"false\" [placement]=\"['bottom-right']\">\n  <div class=\"label-wrapper pr-0\" adaptDropdownToggle>\n    <span class=\"label d-icon-user_circle d-icon-right-angle_down\"></span>\n  </div>\n\n  <div adaptDropdownMenu class=\"drop\">\n    <rx-canvas-outlet [dropPredicate]=\"dropPredicate\"></rx-canvas-outlet>\n    <div class=\"d-icon-left-wrench_o px-3 pt-2\">My Preferences</div>\n    <div class=\"d-icon-left-exit px-3 py-2\">Sign Out</div>\n  </div>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.label-wrapper{min-height:42px;display:flex;align-items:center;cursor:pointer}.label{padding:0 5px;font-size:20px}.drop{background:#313538;color:#fff;width:250px}rx-canvas-outlet ::ng-deep>rx-canvas-item-container>.row>.col>rx-canvas-item-column>.cdk-drop-list{min-height:200px}\n"], components: [{ type: i1$3.AdaptDropdownDirective, selector: "adapt-dropdown, [adaptDropdown]", inputs: ["autoClose", "customClass", "closeOnEscape", "placement", "animationPlacement", "holdFocusInMenu", "holdFocusOnOpen", "autoFocusFirst", "restoreFocusAfterClose", "focusNextElementAfterClose", "appendToBody", "appendTo", "positionTo", "anchorPositionTrackingIntervalMs", "enableAnchorPositionTracking", "recalculatePositionOnElementResize", "setMobileState", "mobileView"], outputs: ["onOpen", "onClose", "anchorPositionChange", "popupAnimationDone"], exportAs: ["adaptDropdown"] }, { type: i1.CanvasOutletComponent, selector: "rx-canvas-outlet", inputs: ["name", "skipParentPredicate", "containerComponent", "dropListOrientation", "dropPredicate"], outputs: ["beforeViewComponentDrop"] }], directives: [{ type: i1$3.AdaptDropdownToggleDirective, selector: "[adaptDropdownToggle]", inputs: ["showCaret", "dropdownTogglerType"] }, { type: i1$3.AdaptDropdownMenuDirective, selector: "[adaptDropdownMenu]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-user-menu-design',
                    templateUrl: './shell-user-menu-design.component.html',
                    styleUrls: ['./shell-user-menu-design.component.scss']
                }]
        }] });

class RxShellUserMenuDesignModel extends ViewDesignerComponentModel {
}

class RxShellUserMenuDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.userMenu,
            properties: [],
            name: 'User menu',
            hidden: true,
            group: 'Shell navigation',
            icon: 'cube_square',
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellUserMenuDesignComponent),
            designComponentModel: RxShellUserMenuDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            outlets: [
                {
                    name: RX_VIEW_DEFINITION.defaultOutletName
                }
            ],
            options: {
                static: true
            }
        });
    }
}
RxShellUserMenuDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, deps: [{ token: i1$5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellUserMenuDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, declarations: [RxShellUserMenuDesignComponent], imports: [CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule] });
RxShellUserMenuDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, imports: [[CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellUserMenuDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellUserMenuDesignComponent],
                    imports: [CommonModule, ViewDesignerCanvasModule, AdaptDropdownModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });

class RxShellActionDesignModel extends RxShellMenuItemDesignModel {
    constructor() {
        super(...arguments);
        this.iconClass$ = this.menuItemIcon$.pipe(map((className) => (className ? `d-icon-${className}` : '')));
        this.menuItemNameLabel = 'Tooltip';
    }
    static getInitialProperties(initialProperties) {
        var _a;
        const result = super.getInitialProperties(Object.assign(Object.assign({}, initialProperties), { menuItemName: (_a = initialProperties === null || initialProperties === void 0 ? void 0 : initialProperties.menuItemName) !== null && _a !== void 0 ? _a : 'New action' }));
        result.menuItemIcon = result.menuItemIcon || 'triangle_right_circle_o';
        return result;
    }
    validate(props) {
        const validationIssues = super.validate(props);
        if (!props.menuItemIcon) {
            validationIssues.push(this.sandbox.createError(`Icon cannot be blank.`, 'menuItemIcon'));
        }
        return validationIssues;
    }
}

class RxShellActionDesignComponent {
}
RxShellActionDesignComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RxShellActionDesignComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxShellActionDesignComponent, selector: "rx-shell-action-design", inputs: { model: "model" }, ngImport: i0, template: "<span class=\"label\" [ngClass]=\"model.iconClass$ | async\" [title]=\"model.label$ | async\"></span>\n", styles: [":host{min-height:42px;display:flex;align-items:center;justify-content:center;min-width:42px}.label{font-size:20px;cursor:pointer}\n"], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-shell-action-design',
                    templateUrl: './shell-action-design.component.html',
                    styleUrls: ['./shell-action-design.component.scss']
                }]
        }], propDecorators: { model: [{
                type: Input
            }] } });

class RxShellActionDesignModule {
    constructor(rxViewComponentRegistryService, componentFactoryResolver) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        rxViewComponentRegistryService.register({
            type: RX_SHELL.navBar.action,
            properties: [
                {
                    name: 'menuItemName',
                    localizable: true
                },
                {
                    name: 'hidden',
                    designType: ViewComponentPropertyType.Boolean
                }
            ],
            name: 'Action',
            group: 'Shell navigation',
            icon: 'triangle_right_circle_o',
            index: 3,
            designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(RxShellActionDesignComponent),
            designComponentModel: RxShellActionDesignModel,
            bundleId: RX_APPLICATION.platformBundleId,
            expressionConfigurator: RxShellMenuItemExpressionConfigurator
        });
    }
}
RxShellActionDesignModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, deps: [{ token: i1$5.RxViewComponentRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
RxShellActionDesignModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, declarations: [RxShellActionDesignComponent], imports: [CommonModule] });
RxShellActionDesignModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellActionDesignModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellActionDesignComponent],
                    imports: [CommonModule]
                }]
        }], ctorParameters: function () { return [{ type: i1$5.RxViewComponentRegistryService }, { type: i0.ComponentFactoryResolver }]; } });

class RxShellComponentsModule {
}
RxShellComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, imports: [RxShellDesignModule,
        RxShellMenuItemDesignModule,
        RxShellMenuGroupDesignModule,
        RxShellUserMenuDesignModule,
        RxShellActionDesignModule] });
RxShellComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, imports: [[
            RxShellDesignModule,
            RxShellMenuItemDesignModule,
            RxShellMenuGroupDesignModule,
            RxShellUserMenuDesignModule,
            RxShellActionDesignModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        RxShellDesignModule,
                        RxShellMenuItemDesignModule,
                        RxShellMenuGroupDesignModule,
                        RxShellUserMenuDesignModule,
                        RxShellActionDesignModule
                    ]
                }]
        }] });

class RxShellDesignerPageModule {
}
RxShellDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxShellDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, declarations: [RxShellDesignerPageComponent], imports: [CommonModule, ViewDesignerModule, RxShellComponentsModule], exports: [RxShellDesignerPageComponent] });
RxShellDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, imports: [[CommonModule, ViewDesignerModule, RxShellComponentsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxShellDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxShellDesignerPageComponent],
                    exports: [RxShellDesignerPageComponent],
                    imports: [CommonModule, ViewDesignerModule, RxShellComponentsModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RxShellDesignerPageComponent, RxShellDesignerPageModule };
//# sourceMappingURL=helix-platform-view-shell-designer-page.js.map
