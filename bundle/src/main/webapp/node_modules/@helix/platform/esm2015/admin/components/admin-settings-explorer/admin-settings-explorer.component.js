import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeWrap } from '@bmc-ux/adapt-angular';
import { RX_APPLICATION, RxAdminSettingsService, RxBundleCacheService, RxComponentCanDeactivateGuard, RxGlobalCacheService, RxPageTitleService } from '@helix/platform/shared/api';
import { RxUtilityModalsService } from '@helix/platform/ui-kit';
import { RxRuntimeViewRegistryService } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { every, forEach } from 'lodash';
import { BehaviorSubject, combineLatest, NEVER, ReplaySubject } from 'rxjs';
import { filter, pluck, takeUntil } from 'rxjs/operators';
import { AdminCommonSettingsComponent } from '../admin-common-settings/admin-common-settings.component';
import { RxAdminSettingsExplorerService } from '../services/admin-settings-explorer.service';
import { AdminSettingLinkType, AdminSettingViewType } from './admin-settings-explorer.types';
import { RxGainsightConfiguratorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "../services/admin-settings-explorer.service";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@angular/router";
import * as i4 from "@helix/platform/view/runtime";
import * as i5 from "@helix/platform/ui-kit";
import * as i6 from "@ngx-translate/core";
import * as i7 from "@helix/platform/shared/components";
import * as i8 from "@bmc-ux/adapt-angular";
import * as i9 from "../admin-common-settings/admin-common-settings.component";
import * as i10 from "@angular/common";
export class AdminSettingsExplorerComponent {
    constructor(rxAdminSettingsExplorerService, rxAdminSettingsService, rxGlobalCacheService, router, rxBundleCacheService, activatedRoute, rxPageTitleService, rxRuntimeViewRegistryService, rxUtilityModalsService, rxComponentCanDeactivateGuard, changeDetector, translateService, rxGainsightConfiguratorService) {
        this.rxAdminSettingsExplorerService = rxAdminSettingsExplorerService;
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxGlobalCacheService = rxGlobalCacheService;
        this.router = router;
        this.rxBundleCacheService = rxBundleCacheService;
        this.activatedRoute = activatedRoute;
        this.rxPageTitleService = rxPageTitleService;
        this.rxRuntimeViewRegistryService = rxRuntimeViewRegistryService;
        this.rxUtilityModalsService = rxUtilityModalsService;
        this.rxComponentCanDeactivateGuard = rxComponentCanDeactivateGuard;
        this.changeDetector = changeDetector;
        this.translateService = translateService;
        this.rxGainsightConfiguratorService = rxGainsightConfiguratorService;
        this.adminSettingViewType = AdminSettingViewType;
        this.componentName$ = new BehaviorSubject('');
        this.treeWrap = TreeWrap.WrapAll;
        this.emptyStateLabel = this.translateService.instant('com.bmc.arsys.rx.client.admin.admin-settings-explorer.select-from-settings.label');
        this.texts = {
            filterPlaceholder: this.translateService.instant('com.bmc.arsys.rx.client.common.search.label')
        };
        this.destroyed$ = new ReplaySubject(1);
    }
    get selectedTreeNode() {
        return this.selectedTreeNodeValue;
    }
    set selectedTreeNode(node) {
        if (node.data.guid) {
            const prevGuid = this.currentSettingGuid;
            this.currentSettingGuid = node.data.guid;
            this.router
                .navigate([node.data.guid], { relativeTo: this.activatedRoute.parent })
                .then((isNavigationSucceeded) => {
                if (isNavigationSucceeded) {
                    this.selectedTreeNodeValue = node;
                    this.displayView(node.data);
                }
                else {
                    this.currentSettingGuid = prevGuid;
                }
            });
        }
    }
    ngOnInit() {
        this.rxComponentCanDeactivateGuard.setPageComponent(this);
        combineLatest([
            this.activatedRoute.params.pipe(pluck('settingGuid')),
            this.rxAdminSettingsExplorerService.getNavigationTreeConfig()
        ])
            .pipe(filter(([settingGuid, administrationNavigationTree]) => settingGuid !== this.currentSettingGuid), takeUntil(this.destroyed$))
            .subscribe(([settingGuid, administrationNavigationTree]) => {
            if (!this.navigationTree) {
                this.navigationTree = administrationNavigationTree;
            }
            this.currentSettingGuid = settingGuid;
            if (settingGuid !== 'root' && this.navigationTree.length) {
                this.selectedTreeNodeValue = this.findSelectedNode(settingGuid, this.navigationTree);
                if (this.selectedTreeNodeValue) {
                    this.expandParentNodes(this.selectedTreeNodeValue);
                    this.displayView(this.selectedTreeNodeValue.data);
                }
            }
            else {
                this.selectedTreeNodeValue = null;
                this.viewType = null;
                this.setPageTitle();
            }
        });
        if (this.rxGlobalCacheService.applicationId === RX_APPLICATION.innovationStudioBundleId) {
            this.rxGainsightConfiguratorService.updateGlobalContext({
                subProductLevel1: {
                    name: 'Design'
                },
                subProductLevel2: {
                    name: 'Administration'
                }
            });
        }
        else {
            // Clear the global context for runtime administration
            this.rxGainsightConfiguratorService.removeGlobalContext(null);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.rxComponentCanDeactivateGuard.setPageComponent(null);
        this.rxGainsightConfiguratorService.removeGlobalContext(['subProductLevel2']);
    }
    canDeactivate() {
        if (this.adminCommonSettingsComponent) {
            return this.adminCommonSettingsComponent.canClose();
        }
        else {
            return every(this.rxRuntimeViewRegistryService.getAll(), (runtimeView) => runtimeView.canClose());
        }
    }
    confirmDeactivation() {
        return this.rxUtilityModalsService.confirmUnsavedChanges();
    }
    onBeforeLoad() {
        this.busySubscription = NEVER.subscribe();
        // workaround: run changeDetector to avoid the ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detectChanges();
    }
    onAfterLoad() {
        var _a;
        (_a = this.busySubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    setPageTitle(componentSettingLabel) {
        const titleParts = [
            componentSettingLabel,
            this.rxGlobalCacheService.applicationId === RX_APPLICATION.innovationStudioBundleId
                ? this.translateService.instant('com.bmc.arsys.rx.client.common.administration.label')
                : this.translateService.instant('com.bmc.arsys.rx.client.common.settings.label')
        ];
        this.rxPageTitleService.set(titleParts, this.rxGlobalCacheService.applicationId);
    }
    findSelectedNode(settingGuid, sourceTree) {
        let selectedNode;
        forEach(sourceTree, (node) => {
            if (node.data.guid === settingGuid) {
                selectedNode = node;
                return false;
            }
            else {
                selectedNode = this.findSelectedNode(settingGuid, node.children);
                if (selectedNode) {
                    return false;
                }
            }
        });
        return selectedNode;
    }
    expandParentNodes(node) {
        if (node.parent) {
            node.parent.expanded = true;
            if (node.parent.parent) {
                this.expandParentNodes(node.parent);
            }
        }
    }
    displayView(adminNavigationMenuItem) {
        this.setPageTitle(adminNavigationMenuItem.label);
        this.rxBundleCacheService.bundleId = adminNavigationMenuItem.defaultBundleScope;
        if (adminNavigationMenuItem.isCustom) {
            if (adminNavigationMenuItem.linkType === AdminSettingLinkType.InBundle) {
                this.viewType = AdminSettingViewType.RuntimeView;
                this.runtimeViewConfig = { viewDefinitionName: adminNavigationMenuItem.registeredModuleName };
            }
            else if (adminNavigationMenuItem.linkType === AdminSettingLinkType.External) {
                window.open(adminNavigationMenuItem.externalLink, '_blank');
                this.viewType = null;
                this.emptyStateLabel = this.translateService.instant('com.bmc.arsys.rx.client.admin.external-settings.empty-state.label');
            }
        }
        else {
            this.componentName$.next(adminNavigationMenuItem.compName);
            this.viewType = AdminSettingViewType.SharedView;
        }
    }
}
AdminSettingsExplorerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsExplorerComponent, deps: [{ token: i1.RxAdminSettingsExplorerService }, { token: i2.RxAdminSettingsService }, { token: i2.RxGlobalCacheService }, { token: i3.Router }, { token: i2.RxBundleCacheService }, { token: i3.ActivatedRoute }, { token: i2.RxPageTitleService }, { token: i4.RxRuntimeViewRegistryService }, { token: i5.RxUtilityModalsService }, { token: i2.RxComponentCanDeactivateGuard }, { token: i0.ChangeDetectorRef }, { token: i6.TranslateService }, { token: i7.RxGainsightConfiguratorService }], target: i0.ɵɵFactoryTarget.Component });
AdminSettingsExplorerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AdminSettingsExplorerComponent, selector: "rx-admin-settings-explorer", providers: [RxAdminSettingsExplorerService], viewQueries: [{ propertyName: "adminCommonSettingsComponent", first: true, predicate: AdminCommonSettingsComponent, descendants: true }], ngImport: i0, template: "<div class=\"position-relative busy-indicator\">\n  <rx-busy-indicator\n    [options]=\"{\n      busy: busySubscription,\n      loaderType: 'lineLoader',\n      delay: 250,\n      backdrop: false,\n      message: null\n    }\"\n  >\n  </rx-busy-indicator>\n</div>\n\n<adapt-sidebar [openedId]=\"0\" [adjustMainContainerWidth]=\"true\">\n  <adapt-sidebar-item\n    [iconClass]=\"'d-icon-layout_preview'\"\n    [headerTitle]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n    [aria-label]=\"'com.bmc.arsys.rx.client.common.settings.label' | translate\"\n  >\n    <adapt-tree\n      *ngIf=\"navigationTree\"\n      [value]=\"navigationTree\"\n      selectionMode=\"single\"\n      [(selection)]=\"selectedTreeNode\"\n      [filter]=\"true\"\n      [texts]=\"texts\"\n      [wrap]=\"treeWrap\"\n    >\n    </adapt-tree>\n  </adapt-sidebar-item>\n\n  <div class=\"main rx-administration-settings-view\">\n    <rx-runtime-view\n      *ngIf=\"viewType === adminSettingViewType.RuntimeView\"\n      [configuration]=\"runtimeViewConfig\"\n      (beforeLoad)=\"onBeforeLoad()\"\n      (afterLoad)=\"onAfterLoad()\"\n    ></rx-runtime-view>\n\n    <rx-admin-common-settings\n      *ngIf=\"viewType === adminSettingViewType.SharedView\"\n      [componentName$]=\"componentName$\"\n    ></rx-admin-common-settings>\n\n    <div *ngIf=\"!viewType\" class=\"d-flex align-items-center justify-content-center h-100\">\n      <adapt-empty-state [type]=\"'config'\" [label]=\"emptyStateLabel\"></adapt-empty-state>\n    </div>\n  </div>\n</adapt-sidebar>\n", styles: ["adapt-tree ::ng-deep .a-tree__container{margin-left:10px}adapt-sidebar ::ng-deep .adapt-sidebar-main{padding:0}adapt-sidebar ::ng-deep button.close{margin:0}.rx-administration-settings-view{height:100%;overflow:auto}.busy-indicator{bottom:2px}:host rx-runtime-view ::ng-deep rx-runtime-view-root,:host rx-runtime-view ::ng-deep .content-outlet{overflow:visible}\n"], components: [{ type: i5.RxBusyIndicatorComponent, selector: "rx-busy-indicator", inputs: ["options"] }, { type: i8.AdaptSidebarComponent, selector: "adapt-sidebar", inputs: ["className", "navClassName", "panelWidth", "panel2Width", "position", "theme", "widthLimit", "openedId", "adjustMainContainerWidth"], outputs: ["openedIdChange", "isPanelOpenedCurrently"], exportAs: ["adaptSidebar"] }, { type: i8.AdaptSidebarItemComponent, selector: "adapt-sidebar-item", inputs: ["iconClass", "headerTitle", "tooltipText", "aria-label"] }, { type: i8.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }, { type: i4.RuntimeViewComponent, selector: "rx-runtime-view", inputs: ["configuration"], outputs: ["save", "closeView", "cancelView", "beforeLoad", "afterLoad"] }, { type: i9.AdminCommonSettingsComponent, selector: "rx-admin-common-settings", inputs: ["componentName$"] }, { type: i8.AdaptEmptyStateComponent, selector: "adapt-empty-state", inputs: ["label", "type", "inverted"] }], directives: [{ type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i6.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminSettingsExplorerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-settings-explorer',
                    templateUrl: 'admin-settings-explorer.component.html',
                    styleUrls: ['./admin-settings-explorer.component.scss'],
                    providers: [RxAdminSettingsExplorerService]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsExplorerService }, { type: i2.RxAdminSettingsService }, { type: i2.RxGlobalCacheService }, { type: i3.Router }, { type: i2.RxBundleCacheService }, { type: i3.ActivatedRoute }, { type: i2.RxPageTitleService }, { type: i4.RxRuntimeViewRegistryService }, { type: i5.RxUtilityModalsService }, { type: i2.RxComponentCanDeactivateGuard }, { type: i0.ChangeDetectorRef }, { type: i6.TranslateService }, { type: i7.RxGainsightConfiguratorService }]; }, propDecorators: { adminCommonSettingsComponent: [{
                type: ViewChild,
                args: [AdminCommonSettingsComponent]
            }] } });
//# sourceMappingURL=admin-settings-explorer.component.js.map