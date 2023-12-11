import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RX_CHATBOTS, RxChatbotDefinitionService } from '@helix/platform/chatbot/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RxAdminSettingsService, RxCurrentUserService, RxNotificationService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent, RowSelectionMode } from '@helix/platform/view/components';
import { BaseViewComponent } from '@helix/platform/view/runtime';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, find, head, includes, map, noop, toString } from 'lodash';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/chatbot/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/shared/components";
import * as i6 from "@bmc-ux/adapt-angular";
import * as i7 from "@helix/platform/view/components";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
export class ChatbotsAdminComponent extends BaseViewComponent {
    constructor(rxAdminSettingsService, rxChatbotDefinitionService, rxCurrentUserService, rxModalService, rxNotificationService, translateService) {
        super();
        this.rxAdminSettingsService = rxAdminSettingsService;
        this.rxChatbotDefinitionService = rxChatbotDefinitionService;
        this.rxCurrentUserService = rxCurrentUserService;
        this.rxModalService = rxModalService;
        this.rxNotificationService = rxNotificationService;
        this.translateService = translateService;
        this.sections = cloneDeep(RX_CHATBOTS.sections);
        this.isAdministrator = this.rxCurrentUserService.isAdministrator();
    }
    ngOnInit() {
        this.notifyPropertyChanged('api', {
            isDirty: () => this.displayChatbotsDropdownSwitch.dirty
        });
        if (this.isAdministrator) {
            this.busy = this.rxAdminSettingsService
                .getComponentSettings(RX_CHATBOTS.componentSettings.componentName, {
                'default-bundle-scope': RX_APPLICATION.settingsBundleId
            })
                .subscribe((componentSettings) => {
                this.componentSettings = componentSettings.values;
                const componentSetting = find(this.componentSettings, {
                    settingName: RX_CHATBOTS.componentSettings.settingNames.displayChatbotsDropdown
                });
                this.sections.globalChatbotSettings.displayChatbotsDropdown = JSON.parse(componentSetting.settingValue);
            });
        }
        this.recordGridConfig = of({
            enableFiltering: true,
            recordDefinitionName: RX_CHATBOTS.chatbotSettings.recordDefinitionName,
            enableRowSelection: RowSelectionMode.Multiple,
            columns: [
                {
                    index: 0,
                    fieldId: String(RX_CHATBOTS.chatbotSettings.recordFieldIds.name),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.chatbot.title'),
                    cellTemplate: this.nameColumnTemplate
                },
                {
                    index: 1,
                    fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.description),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.description.title')
                },
                {
                    index: 2,
                    fieldId: String(RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.application-library-id.title')
                },
                {
                    index: 3,
                    fieldId: String(RX_RECORD_DEFINITION.coreFieldIds.id),
                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.chatbot-id.title')
                }
            ],
            actionButtons: [
                {
                    label: 'Rename',
                    style: 'tertiary',
                    icon: 'pencil',
                    disabled: () => {
                        return !this.isAdministrator || this.chatbotConfigurationsRecordGrid.api.getSelectedRows().length !== 1;
                    },
                    actions: [
                        {
                            name: () => {
                                const selectedChatbot = head(this.chatbotConfigurationsRecordGrid.api.getSelectedRows());
                                this.rxModalService
                                    .openModal({
                                    title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.rename-chatbot.title'),
                                    size: 'sm',
                                    content: RenameDefinitionModalComponent,
                                    data: {
                                        definitionName: selectedChatbot[RX_CHATBOTS.chatbotSettings.recordFieldIds.name],
                                        infoText: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.name-uniqueness-validation.message'),
                                        fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.name.label'),
                                        validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.name-validation.message'),
                                        definitionType: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.chatbot.title'),
                                        definitionNames: this.chatbotConfigurationsRecordGrid.adaptTableConfig.data
                                            .filter((chatbot) => chatbot[RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId] ===
                                            selectedChatbot[RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId])
                                            .map((chatbot) => chatbot[RX_CHATBOTS.chatbotSettings.recordFieldIds.name])
                                    }
                                })
                                    .then((definitionName) => {
                                    this.rxChatbotDefinitionService
                                        .rename(selectedChatbot[RX_RECORD_DEFINITION.coreFieldIds.id], definitionName)
                                        .subscribe(() => {
                                        this.refreshChatbotGrid();
                                    });
                                })
                                    .catch(noop);
                            }
                        }
                    ]
                },
                {
                    label: this.translateService.instant('com.bmc.arsys.rx.client.common.delete.label'),
                    style: 'tertiary',
                    icon: 'trash',
                    disabled: () => {
                        return !this.isAdministrator || this.chatbotConfigurationsRecordGrid.api.getSelectedRows().length === 0;
                    },
                    actions: [
                        {
                            name: () => {
                                let confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.delete-confirmation.message');
                                const selectedChatbots = this.chatbotConfigurationsRecordGrid.api.getSelectedRows();
                                const selectedChatbotIds = map(selectedChatbots, RX_RECORD_DEFINITION.coreFieldIds.id);
                                if (includes(selectedChatbotIds, RX_CHATBOTS.chatbotSettings.defaultBotId)) {
                                    const defaultChatbot = find(selectedChatbots, [
                                        RX_RECORD_DEFINITION.coreFieldIds.id,
                                        RX_CHATBOTS.chatbotSettings.defaultBotId
                                    ]);
                                    confirmationMessage = this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.configurations-delete-confirmation.message', { defaultChatbotName: defaultChatbot[RX_CHATBOTS.chatbotSettings.recordFieldIds.name] });
                                }
                                this.rxModalService
                                    .confirm({
                                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                    modalStyle: RX_MODAL.modalStyles.warning,
                                    message: confirmationMessage
                                })
                                    .then((result) => {
                                    if (result) {
                                        this.rxChatbotDefinitionService.delete(selectedChatbotIds).subscribe(() => {
                                            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.delete-success.message'));
                                            this.refreshChatbotGrid();
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        });
    }
    getCellValue(dataItem, column) {
        return dataItem[column.field];
    }
    onSaveClick() {
        const componentSetting = find(this.componentSettings, [
            'settingName',
            RX_CHATBOTS.componentSettings.settingNames.displayChatbotsDropdown
        ]);
        componentSetting.settingValue = toString(this.sections.globalChatbotSettings.displayChatbotsDropdown);
        this.rxAdminSettingsService
            .updateComponentSettings(`${RX_CHATBOTS.componentSettings.componentName}/${head(this.componentSettings).ownerKeyValue1}`, this.componentSettings)
            .subscribe(() => {
            this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.global-chatbot-settings-saved.message'));
            this.displayChatbotsDropdownSwitch.control.markAsPristine();
        });
    }
    openChatbot(row) {
        if (row) {
            const bundleId = row[RX_CHATBOTS.chatbotSettings.recordFieldIds.bundleId];
            const encodedBotName = encodeURIComponent(row[RX_CHATBOTS.chatbotSettings.recordFieldIds.name]);
            const chatbotDesignerUrl = `/innovationstudio/index.html#/app/bundle/${bundleId}/ichatbot/${encodedBotName}`;
            window.open(chatbotDesignerUrl);
        }
    }
    refreshChatbotGrid() {
        this.chatbotConfigurationsRecordGrid.api.refresh().subscribe();
    }
}
ChatbotsAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsAdminComponent, deps: [{ token: i1.RxAdminSettingsService }, { token: i2.RxChatbotDefinitionService }, { token: i1.RxCurrentUserService }, { token: i3.RxModalService }, { token: i1.RxNotificationService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
ChatbotsAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ChatbotsAdminComponent, selector: "rx-admin-chatbots", viewQueries: [{ propertyName: "chatbotConfigurationsRecordGrid", first: true, predicate: ["chatbotConfigurationsRecordGrid"], descendants: true, static: true }, { propertyName: "nameColumnTemplate", first: true, predicate: ["nameColumnTemplate"], descendants: true, static: true }, { propertyName: "displayChatbotsDropdownSwitch", first: true, predicate: ["displayChatbotsDropdownSwitch"], descendants: true, read: NgModel }], usesInheritance: true, ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.chatbots.header.title' | translate }}\">\n  <adapt-accordion [multiselect]=\"true\" class=\"pb-4\">\n    <adapt-accordion-tab\n      [title]=\"sections.chatbotConfigurations.title | translate\"\n      [isOpen]=\"sections.chatbotConfigurations.isExpanded\"\n    >\n      <rx-record-grid #chatbotConfigurationsRecordGrid [config]=\"recordGridConfig\"></rx-record-grid>\n    </adapt-accordion-tab>\n\n    <adapt-accordion-tab\n      *ngIf=\"isAdministrator\"\n      [title]=\"sections.globalChatbotSettings.title | translate\"\n      [isOpen]=\"sections.globalChatbotSettings.isExpanded\"\n    >\n      <adapt-rx-switch\n        class=\"d-block\"\n        name=\"displayChatbotsDropdown\"\n        label=\" {{ 'com.bmc.arsys.rx.client.admin.chatbots.display-available-chatbots.label' | translate }} \"\n        [(ngModel)]=\"sections.globalChatbotSettings.displayChatbotsDropdown\"\n        #displayChatbotsDropdownSwitch=\"ngModel\"\n      ></adapt-rx-switch>\n\n      <button\n        class=\"mt-4\"\n        rx-id=\"save-button\"\n        adapt-button\n        btn-type=\"primary\"\n        size=\"small\"\n        type=\"button\"\n        [disabled]=\"!displayChatbotsDropdownSwitch.dirty\"\n        (click)=\"onSaveClick()\"\n      >\n        {{ 'com.bmc.arsys.rx.client.common.save.label' | translate }}\n      </button>\n    </adapt-accordion-tab>\n  </adapt-accordion>\n</rx-admin-settings>\n\n<ng-template #nameColumnTemplate let-dataItem=\"dataItem\" let-column=\"column\">\n  <a href=\"javascript:void(0)\" (click)=\"openChatbot(dataItem)\">\n    {{ getCellValue(dataItem, column) | rxDefinitionNamePipe }}\n  </a>\n</ng-template>\n", components: [{ type: i5.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i6.AdaptAccordionComponent, selector: "adapt-accordion", inputs: ["config", "multiselect", "bordered"], outputs: ["openTab", "closeTab"] }, { type: i6.AdaptAccordionTabComponent, selector: "adapt-accordion-tab", inputs: ["title", "renderContentWhenClosed", "customClass", "multiline", "icon", "disabled", "isOpen"], outputs: ["open", "close"] }, { type: i7.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }, { type: i6.AdaptRxSwitchComponent, selector: "adapt-rx-switch", inputs: ["value", "size", "isLabelBefore", "checked"] }, { type: i6.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "translate": i4.TranslatePipe, "rxDefinitionNamePipe": i1.RxDefinitionNamePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotsAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-chatbots',
                    templateUrl: './chatbots.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxAdminSettingsService }, { type: i2.RxChatbotDefinitionService }, { type: i1.RxCurrentUserService }, { type: i3.RxModalService }, { type: i1.RxNotificationService }, { type: i4.TranslateService }]; }, propDecorators: { chatbotConfigurationsRecordGrid: [{
                type: ViewChild,
                args: ['chatbotConfigurationsRecordGrid', { static: true }]
            }], nameColumnTemplate: [{
                type: ViewChild,
                args: ['nameColumnTemplate', { static: true }]
            }], displayChatbotsDropdownSwitch: [{
                type: ViewChild,
                args: ['displayChatbotsDropdownSwitch', { read: NgModel, static: false }]
            }] } });
//# sourceMappingURL=chatbots.component.js.map