import { Component } from '@angular/core';
import { uniqBy, flatMap } from 'lodash';
import { DockedPanelContext, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { RxModalService, RX_MODAL } from '@helix/platform/ui-kit';
import { FormControl } from '@angular/forms';
import { forkJoin, of, ReplaySubject } from 'rxjs';
import { startWith, switchMap, map, takeUntil, tap } from 'rxjs/operators';
import { RxHkmAccessMappingService } from '../hkm-access-mapping.service';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@ngx-translate/core";
import * as i4 from "@helix/platform/ui-kit";
import * as i5 from "../hkm-access-mapping.service";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
export class HkmAccessMapEditorComponent {
    constructor(dockedPanelContext, rxNotificationService, translateService, rxModalService, rxHkmAccessMappingService) {
        this.dockedPanelContext = dockedPanelContext;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.rxModalService = rxModalService;
        this.rxHkmAccessMappingService = rxHkmAccessMappingService;
        this.destroyed$ = new ReplaySubject(1);
        this.userGroupToFoldersMap = new Map();
        this.selectedItsmSupportGroups = [];
        this.alertConfig = {
            title: '',
            content: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.mapping-info.message'),
            type: 'inline',
            variant: 'info'
        };
        const contextData = this.dockedPanelContext.getData();
        this.selectedItsmSupportGroups = contextData.selectedSupportGroups;
        this.portals = contextData.hkmPortals;
        this.company = contextData.company;
        this.portalUserGroups = contextData.selectedHkmPortal.userGroups;
        this.selectedPortal = new FormControl([contextData.selectedHkmPortal]);
        this.selectedUserGroups = new FormControl(contextData.selectedHkmUserGroups);
    }
    ngOnInit() {
        this.selectedPortal.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(([portal]) => {
            this.portalUserGroups = portal.userGroups;
            this.selectedUserGroups.reset([]);
        });
        this.selectedUserGroups.valueChanges
            .pipe(takeUntil(this.destroyed$), startWith(this.selectedUserGroups.value || []), switchMap((userGroups) => {
            if (userGroups.length === 0) {
                return of(userGroups);
            }
            const [selectedPortal] = this.selectedPortal.value;
            const folderAcecssRequests = userGroups.map((userGroup) => {
                return this.rxHkmAccessMappingService
                    .getFolderAccess(userGroup.id, selectedPortal.portalId, selectedPortal.nodeId)
                    .pipe(tap((folders) => this.userGroupToFoldersMap.set(userGroup, folders)));
            });
            return forkJoin(folderAcecssRequests).pipe(map(() => userGroups));
        }))
            .subscribe((userGroups) => {
            this.setUpFoldersFromHkmPortalUserGroups(userGroups);
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    cancel() {
        this.dockedPanelContext.dismiss(DismissReasons.ESC);
    }
    save() {
        if (this.selectedItsmSupportGroups.length === 0) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.select-support-group.message'));
            return;
        }
        if (this.selectedUserGroups.value.length === 0) {
            this.rxNotificationService.addErrorMessage(this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.select-user-group.message'));
            return;
        }
        const hkmGroupFoldersNames = this.hkmFolders.map((data) => data.name);
        const selectedUserGroups = this.selectedUserGroups.value;
        const mappingConfigurations = this.selectedItsmSupportGroups.map((itsmSupportGroup) => ({
            AppCompanyID: this.company.permissionId,
            AppCompanyName: this.company.name,
            AppGroupName: itsmSupportGroup.supportGroupName,
            AppName: 'ITSM',
            IsMapped: true,
            AppGroupID: itsmSupportGroup.permissionGroupId,
            HKMPortalID: this.selectedPortal.value[0].portalId,
            HKMPortalName: this.selectedPortal.value[0].portalName,
            HKMRoleName: selectedUserGroups.map((group) => group.role).join(','),
            HKMGroupID: selectedUserGroups.map((group) => group.id).join(','),
            HKMGroupFoldersNames: hkmGroupFoldersNames,
            HKMGroupName: selectedUserGroups.map((group) => group.name).join(',')
        }));
        this.rxHkmAccessMappingService.saveAccessMappings(mappingConfigurations).subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.connection-mapping.mapping-saved.message'));
            this.dockedPanelContext.close(DismissReasons.CLOSE_BTN);
        }, () => {
            this.dockedPanelContext.close(DismissReasons.BACKDROP_CLICK);
        });
    }
    hkmFolderSortFn(first, second) {
        if (first.hasFolderChildren !== second.hasFolderChildren) {
            return +second.hasFolderChildren - +first.hasFolderChildren;
        }
        return first.name.localeCompare(second.name);
    }
    setUpFoldersFromHkmPortalUserGroups(userGroups) {
        const items = flatMap(userGroups, (group) => this.userGroupToFoldersMap
            .get(group)
            .filter((folder) => folder.haveAccess)
            .map((folder) => ({ group, folder })));
        items.sort((first, second) => this.hkmFolderSortFn(first.folder, second.folder));
        const uniqueItems = uniqBy(items, (item) => item.folder.nodeId);
        this.hkmFolders = uniqueItems.map((item) => item.folder);
        this.filesTree = uniqueItems.map((item) => ({
            data: item,
            expandedIcon: item.folder.hasFolderChildren ? 'd-icon-folder_open' : 'd-icon-folder_o',
            collapsedIcon: item.folder.hasFolderChildren ? 'd-icon-folder' : 'd-icon-folder_o',
            label: item.folder.name,
            level: 1,
            expression: `'${item.folder.nodeId}'`,
            children: null,
            leaf: !item.folder.hasFolderChildren
        }));
    }
    deleteVisibilityGroup(group) {
        this.rxModalService
            .confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.translateService.instant('com.bmc.arsys.rx.client.hkm-access-mapping-editor.delete-visibility-group.message')
        })
            .then((result) => {
            if (result) {
                this.selectedItsmSupportGroups.forEach((element, index) => {
                    if (element.supportGroupName === group.supportGroupName) {
                        this.selectedItsmSupportGroups.splice(index, 1);
                    }
                });
            }
        });
    }
    onNodeExpand({ node }) {
        if (node && !node.children) {
            this.rxHkmAccessMappingService
                .getFolderAccess(node.data.group.id, node.data.folder.portalId, node.data.folder.nodeId)
                .subscribe((hkmFolders) => {
                node.children = hkmFolders
                    .filter((folder) => folder.haveAccess)
                    .sort(this.hkmFolderSortFn)
                    .map((folder) => ({
                    data: { group: node.data.group, folder },
                    expandedIcon: folder.hasFolderChildren ? 'd-icon-folder_open' : 'd-icon-folder_o',
                    collapsedIcon: folder.hasFolderChildren ? 'd-icon-folder' : 'd-icon-folder_o',
                    label: folder.name,
                    level: 1,
                    expression: `'${folder.nodeId}'`,
                    children: null,
                    leaf: !folder.hasFolderChildren
                }));
            });
        }
    }
    supportGroupFormatter(group) {
        return group.supportGroupName;
    }
    userGroupOptionformatter(group) {
        return group.name;
    }
    hkmPortalFormatter(portal) {
        return portal.portalName;
    }
}
HkmAccessMapEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMapEditorComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.RxNotificationService }, { token: i3.TranslateService }, { token: i4.RxModalService }, { token: i5.RxHkmAccessMappingService }], target: i0.ɵɵFactoryTarget.Component });
HkmAccessMapEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: HkmAccessMapEditorComponent, selector: "rx-hkm-access-map-editor", ngImport: i0, template: "<div class=\"container col d-flex flex-column\" style=\"overflow-y: auto\">\n  <div class=\"row justify-content-between\">\n    <div class=\"col-5 form-control-label\">\n      <adapt-rx-textfield\n        [disabled]=\"true\"\n        rx-id=\"company-field\"\n        [label]=\"'com.bmc.arsys.rx.client.hkm-access-mapping.company.label' | translate\"\n        [(ngModel)]=\"company.name\"\n      ></adapt-rx-textfield>\n    </div>\n    <div class=\"col-1 d-flex align-items-end p-2 justify-content-center\">\n      <adapt-icon name=\"arrow_right\"></adapt-icon>\n    </div>\n    <div class=\"col-6 form-control-label\">\n      <adapt-rx-select\n        [formControl]=\"selectedPortal\"\n        [options]=\"portals\"\n        rx-id=\"portal-select\"\n        [optionFormatter]=\"hkmPortalFormatter\"\n        [label]=\"'com.bmc.arsys.rx.client.hkm-access-mapping-editor.header.label' | translate\"\n      ></adapt-rx-select>\n    </div>\n  </div>\n  <hr />\n  <div class=\"row\">\n    <div class=\"col\">\n      <adapt-alert [config]=\"alertConfig\"></adapt-alert>\n    </div>\n  </div>\n  <div class=\"row flex-grow-1 py-3 justify-content-between\">\n    <div class=\"col-5 d-flex flex-column\">\n      <div class=\"pb-1\">\n        <span class=\"form-control-label\">\n          {{\n            'com.bmc.arsys.rx.client.hkm-access-mapping-editor.support-group.label'\n              | translate: { count: selectedItsmSupportGroups.length }\n          }}\n        </span>\n      </div>\n      <div class=\"card flex-grow-1\" rx-id=\"selected-support-groups\">\n        <div\n          class=\"d-flex px-2 align-items-center adapt-rx-list-item cursor-pointer\"\n          *ngFor=\"let group of selectedItsmSupportGroups\"\n        >\n          <span>{{ group.supportGroupName }}</span>\n          <button\n            type=\"button\"\n            [disabled]=\"false\"\n            class=\"btn btn-link d-icon-trash p-1\"\n            rx-id=\"delete-button\"\n            (click)=\"deleteVisibilityGroup(group)\"\n          ></button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-1 d-flex p-2 mt-4 justify-content-center\">\n      <adapt-icon [name]=\"'arrow_right'\"></adapt-icon>\n    </div>\n    <div class=\"col-6 d-flex flex-column\">\n      <adapt-rx-select\n        [formControl]=\"selectedUserGroups\"\n        rx-id=\"user-groups-select\"\n        [label]=\"'com.bmc.arsys.rx.client.hkm-access-mapping-editor.select-hkm-user-groups.label' | translate\"\n        [options]=\"portalUserGroups\"\n        [optionFormatter]=\"userGroupOptionformatter\"\n        [selectAllButton]=\"true\"\n        [deselectAllButton]=\"true\"\n        [enableFilter]=\"true\"\n        [multiple]=\"true\"\n      >\n      </adapt-rx-select>\n      <div class=\"mt-3 pb-1\">\n        <span class=\"form-control-label\">\n          {{ 'com.bmc.arsys.rx.client.hkm-access-mapping-editor.accessible-folders.title' | translate }}\n        </span>\n      </div>\n      <div class=\"card flex-grow-1 p-2\">\n        <div class=\"mh-100\" style=\"overflow-y: auto\">\n          <adapt-tree [value]=\"filesTree\" (onNodeExpand)=\"onNodeExpand($event)\"> </adapt-tree>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"dp-footer\">\n  <div>\n    <button rx-id=\"save-button\" type=\"button\" class=\"btn btn-primary mr-2\" (click)=\"save()\">\n      {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n    </button>\n  </div>\n  <div>\n    <button rx-id=\"cancel-button\" type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\">\n      {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n    </button>\n  </div>\n</div>\n", components: [{ type: i1.AdaptRxTextfieldComponent, selector: "adapt-rx-textfield", inputs: ["prepend", "append", "isPassword", "autocomplete", "placeholder", "size", "fieldTagText", "fieldTagType", "showValidState", "showValidStateIcon", "showInvalidStateIcon", "validStateMessage", "disabledStyleForReadonlyState"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i1.AdaptRxSelectComponent, selector: "adapt-rx-select", inputs: ["options", "emptyOption", "optionFormatter", "optionContentTemplate", "disabledOptionResolver", "titleFormatter", "focusFirst", "texts", "multiple", "singleSelectStyle", "enableFilter", "inline", "selectAllButton", "deselectAllButton", "loadMoreButton", "loadMoreCallback", "loadMoreInProgress", "loadingState", "placeholder", "size", "closeOnSelect", "placement", "appendToBody", "popupMaxHeight", "popupClass", "pageSize", "ariaInvalid", "virtualScroll", "virtualScrollItemSize", "virtualScrollTemplateCacheSize", "minBufferPx", "maxBufferPx"], outputs: ["onSelectionChange", "onPopupOpenChange", "onFilterValueChange"] }, { type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptTreeComponent, selector: "adapt-tree", inputs: ["value", "filter", "texts", "filterBtnClearText", "filterPlaceholder", "testID", "lazy", "lazyLoading", "trim", "wrap", "selectAllButton", "deselectAllButton", "treeScrollHeight", "adaptRadarDisableEventSending", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "validateDrop"], outputs: ["onNodeDrop", "lazyLoad"] }], directives: [{ type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "translate": i3.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: HkmAccessMapEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-hkm-access-map-editor',
                    templateUrl: './hkm-access-map-editor.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.RxNotificationService }, { type: i3.TranslateService }, { type: i4.RxModalService }, { type: i5.RxHkmAccessMappingService }]; } });
//# sourceMappingURL=hkm-access-map-editor.component.js.map