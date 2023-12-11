import { Component, Injector, ViewChild } from '@angular/core';
import { ActiveModalRef, AdaptTabsComponent, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalFlowConfigurationComponent } from '../approval-flow-configuration/approval-flow-configuration.component';
import { RecordRegistrationComponent } from '../record-registration/record-registration.component';
import { SelfApprovalConfigurationComponent } from '../self-approval-configuration/self-approval-configuration.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@bmc-ux/adapt-angular";
import * as i4 from "../record-registration/record-registration.component";
import * as i5 from "../self-approval-configuration/self-approval-configuration.component";
import * as i6 from "../approval-flow-configuration/approval-flow-configuration.component";
import * as i7 from "@angular/common";
export class ApprovalConfigurationEditorComponent extends RxModalClass {
    constructor(translateService, rxNotificationService, activeModalRef, injector) {
        super(activeModalRef, injector);
        this.translateService = translateService;
        this.rxNotificationService = rxNotificationService;
        this.activeModalRef = activeModalRef;
        this.injector = injector;
        this.activatedTabs = [true, false, false];
        this.selectedRecordDefinition = this.activeModalRef.getData().selectedRecordDefinition;
        this.editMode = this.activeModalRef.getData().editMode;
    }
    isDirty() {
        var _a, _b, _c;
        return (((_a = this.recordRegistrationComponent) === null || _a === void 0 ? void 0 : _a.isFormDirty()) ||
            ((_b = this.approvalFlowConfigurationComponent) === null || _b === void 0 ? void 0 : _b.isDirty()) ||
            ((_c = this.selfApprovalConfigurationComponent) === null || _c === void 0 ? void 0 : _c.isDirty()));
    }
    onRecordRegistered(registeredRecordDefinitionName) {
        this.editMode = true;
        this.selectedRecordDefinition = registeredRecordDefinitionName;
    }
    isSaveButtonDisabled() {
        var _a, _b, _c;
        if (this.editMode) {
            return !((_a = this.recordRegistrationComponent) === null || _a === void 0 ? void 0 : _a.canSave()) && !((_b = this.approvalFlowConfigurationComponent) === null || _b === void 0 ? void 0 : _b.canSave());
        }
        else {
            return !((_c = this.recordRegistrationComponent) === null || _c === void 0 ? void 0 : _c.canSave());
        }
    }
    saveApprovalConfiguration() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = this.recordRegistrationComponent) === null || _a === void 0 ? void 0 : _a.isFormDirty()) && ((_b = this.recordRegistrationComponent) === null || _b === void 0 ? void 0 : _b.isFormValid())) {
            this.recordRegistrationComponent.save();
        }
        else if (((_c = this.recordRegistrationComponent) === null || _c === void 0 ? void 0 : _c.isFormDirty()) && !((_d = this.recordRegistrationComponent) === null || _d === void 0 ? void 0 : _d.isFormValid())) {
            this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.validation.error'));
            this.tabSetComponent.setActiveTab(0, true, null);
        }
        if (this.editMode && ((_e = this.approvalFlowConfigurationComponent) === null || _e === void 0 ? void 0 : _e.canSave())) {
            (_f = this.approvalFlowConfigurationComponent) === null || _f === void 0 ? void 0 : _f.markInvalidGroupsAndFlows();
            if ((_g = this.approvalFlowConfigurationComponent) === null || _g === void 0 ? void 0 : _g.areFlowGroupsValid()) {
                this.approvalFlowConfigurationComponent.saveFlowGroups();
            }
            else if ((_h = this.approvalFlowConfigurationComponent) === null || _h === void 0 ? void 0 : _h.hasFlowGroups()) {
                this.rxNotificationService.addWarningMessage(this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.message.validation.error'));
                this.tabSetComponent.setActiveTab(2, true, null);
            }
        }
    }
    closeModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
}
ApprovalConfigurationEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationEditorComponent, deps: [{ token: i1.TranslateService }, { token: i2.RxNotificationService }, { token: i3.ActiveModalRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ApprovalConfigurationEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ApprovalConfigurationEditorComponent, selector: "rx-approval-configuration-editor", viewQueries: [{ propertyName: "approvalFlowConfigurationComponent", first: true, predicate: ApprovalFlowConfigurationComponent, descendants: true }, { propertyName: "recordRegistrationComponent", first: true, predicate: RecordRegistrationComponent, descendants: true }, { propertyName: "selfApprovalConfigurationComponent", first: true, predicate: SelfApprovalConfigurationComponent, descendants: true }, { propertyName: "tabSetComponent", first: true, predicate: ["tabSetComponent"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"designer-modal-body d-flex mh-100 flex-column\">\n  <adapt-tabset [fullHeight]=\"true\" #tabSetComponent (tab-active-changed)=\"activatedTabs[$event.index] = true\">\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.tab.registration' | translate }}\"\n    >\n      <rx-record-registration\n        [registeredRecordDefinitionName]=\"selectedRecordDefinition\"\n        [isEditMode]=\"editMode\"\n        (recordRegistered)=\"onRecordRegistered($event)\"\n      ></rx-record-registration>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.tab.selfApproval' | translate }}\"\n      [disabled]=\"!editMode\"\n    >\n      <rx-self-approval-configuration\n        [registeredRecordDefinitionName]=\"selectedRecordDefinition\"\n        *ngIf=\"editMode && activatedTabs[1]\"\n      >\n      </rx-self-approval-configuration>\n    </adapt-tab-panel>\n\n    <adapt-tab-panel\n      adapt-tab-title=\"{{ 'com.bmc.arsys.rx.client.approval.configuration.tab.approvalFlows' | translate }}\"\n      [disabled]=\"!editMode\"\n    >\n      <rx-approval-flow-configuration\n        [registeredRecordDefinitionName]=\"selectedRecordDefinition\"\n        *ngIf=\"editMode && activatedTabs[2]\"\n      ></rx-approval-flow-configuration>\n    </adapt-tab-panel>\n  </adapt-tabset>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"save-button\"\n    [disabled]=\"isSaveButtonDisabled()\"\n    (click)=\"saveApprovalConfiguration()\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n  </button>\n  <button adapt-button type=\"button\" btn-type=\"secondary\" rx-id=\"close-button\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.close.label' | translate }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}.designer-modal-body{height:645px;min-height:calc(100% - 61px)!important}.designer-modal-accordion-wrapper{display:flex;flex-direction:column;height:100%;overflow:auto;padding-top:10px}.designer-modal-accordion-content{position:relative}.designer-modal-accordion-content.cdk-drag-preview{z-index:1200!important}.designer-modal-drag-handle{cursor:move;position:absolute;top:0;left:0;height:46px;padding:14px 10px 14px 14px;z-index:1}.designer-modal-card-title-content{width:100%;display:flex}.designer-modal-card-title-content .left-header-block,.designer-modal-card-title-content .right-header-block{display:flex;align-items:center}.designer-modal-card-title-content .left-header-block{flex-grow:1;min-width:0;font-size:14px;padding-left:22px}.designer-modal-card-sub-title{color:#7c7f81;font-weight:normal}.designer-modal-card-title-index-buttons{display:flex;font-size:19px}.rx-card{overflow:auto}.rx-tree-draggable-node{cursor:pointer}.rx-tree-draggable-node.cdk-drag-preview{z-index:1200!important}.rx-tree-draggable-node.cdk-drag{opacity:1}.rx-tree-node-label{word-break:break-all}rx-form-builder{max-width:400px}\n"], components: [{ type: i3.AdaptTabsComponent, selector: "adapt-tabset", inputs: ["showTabToolbar", "customCssTabContent", "fullHeight", "texts", "enableDnD", "customClassTabList", "allow-tabs-adding", "id", "testID", "dropdown-title", "fadeColor", "carouselMode", "justify", "type", "tab-active"], outputs: ["tab-index-closed", "tab-active-changed", "add-tab-clicked", "tabClicked", "tabDropped"], exportAs: ["adaptTabset"] }, { type: i3.AdaptTabsPanelComponent, selector: "adapt-tab-panel, div[tab-panel]", inputs: ["isActive", "badge-type", "animateBadge", "showBadgeAlert", "badgeAlertVariant", "badgeCustomClass", "adapt-tab-title", "disabled", "isHidden", "icon", "subtext", "icon-right", "icon-close", "aria-label", "aria-labelledby", "kebabMenu", "id", "renderContentWhenInactive", "badge"] }, { type: i4.RecordRegistrationComponent, selector: "rx-record-registration", inputs: ["registeredRecordDefinitionName", "isEditMode"], outputs: ["recordRegistered"] }, { type: i5.SelfApprovalConfigurationComponent, selector: "rx-self-approval-configuration", inputs: ["registeredRecordDefinitionName"] }, { type: i6.ApprovalFlowConfigurationComponent, selector: "rx-approval-flow-configuration", inputs: ["registeredRecordDefinitionName"] }, { type: i3.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i1.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ApprovalConfigurationEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-approval-configuration-editor',
                    templateUrl: './approval-configuration-editor.component.html',
                    styleUrls: ['./approval-configuration-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }, { type: i2.RxNotificationService }, { type: i3.ActiveModalRef }, { type: i0.Injector }]; }, propDecorators: { approvalFlowConfigurationComponent: [{
                type: ViewChild,
                args: [ApprovalFlowConfigurationComponent]
            }], recordRegistrationComponent: [{
                type: ViewChild,
                args: [RecordRegistrationComponent]
            }], selfApprovalConfigurationComponent: [{
                type: ViewChild,
                args: [SelfApprovalConfigurationComponent]
            }], tabSetComponent: [{
                type: ViewChild,
                args: ['tabSetComponent']
            }] } });
//# sourceMappingURL=approval-configuration-editor.component.js.map