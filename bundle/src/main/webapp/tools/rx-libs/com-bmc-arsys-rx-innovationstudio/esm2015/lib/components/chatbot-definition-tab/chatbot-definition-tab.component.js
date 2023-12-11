import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RX_CHATBOTS, RxChatbotDefinitionService } from '@helix/platform/chatbot/api';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_APPLICATION, RxBundleCacheService, RxChatbotDefinitionDataPageService, RxDefinitionNameService, RxOverlayService } from '@helix/platform/shared/api';
import { RenameDefinitionModalComponent } from '@helix/platform/shared/components';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { find, map as _map, noop } from 'lodash';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, finalize, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AX_BUNDLE_DETAILS } from '../bundle-details/bundle-details.constant';
import { DefinitionTabComponent } from '../definition-tab/definition-tab.component';
import { AX_CHATBOT_DEFINITION_TAB } from './chatbot-definition-tab.contant';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "@ngx-translate/core";
import * as i5 from "@helix/platform/chatbot/api";
import * as i6 from "../definition-tab/definition-tab.component";
import * as i7 from "@angular/common";
export class ChatbotDefinitionTabComponent {
    constructor(router, rxChatbotDefinitionDataPageService, rxDefinitionNameService, rxOverlayService, rxBundleCacheService, rxModalService, translateService, rxChatbotDefinitionService) {
        this.router = router;
        this.rxChatbotDefinitionDataPageService = rxChatbotDefinitionDataPageService;
        this.rxDefinitionNameService = rxDefinitionNameService;
        this.rxOverlayService = rxOverlayService;
        this.rxBundleCacheService = rxBundleCacheService;
        this.rxModalService = rxModalService;
        this.translateService = translateService;
        this.rxChatbotDefinitionService = rxChatbotDefinitionService;
        this.rowSelectionChanged$ = new BehaviorSubject([]);
        this.definitionActions$ = this.rowSelectionChanged$.pipe(map((selectedRows) => this.getDefinitionActions(selectedRows)));
        this.definitions$ = this.rxChatbotDefinitionDataPageService.get();
        this.gridColumns = [];
        this.isActionInProgress = false;
        this.botNameMaxLength = this.rxBundleCacheService.bundleId === RX_APPLICATION.chatbotBundleId
            ? 254
            : 254 - (this.rxBundleCacheService.bundleId + ':').length;
    }
    getDefinitionActions(selectedRows) {
        const isBundleEditable = this.rxOverlayService.isBundleEditable(this.rxBundleCacheService.bundleId);
        return [
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.new,
                isDisabled: !this.rxOverlayService.areNewDefinitionsAllowedSync(this.bundleDescriptor)
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.rename,
                isDisabled: !isBundleEditable || selectedRows.length !== 1
            },
            {
                id: AX_BUNDLE_DETAILS.standardDefinitionActionNames.delete,
                isDisabled: !isBundleEditable || selectedRows.length === 0
            }
        ];
    }
    ngOnInit() {
        this.gridColumns = [
            AX_BUNDLE_DETAILS.definitionGridColumns.name,
            {
                title: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.titleKey,
                fieldId: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.fieldId
            },
            AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime,
            AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy
        ];
        const fieldDefinitions = [
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_CHATBOT_DEFINITION_TAB.definitionGridColumns.description.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastUpdateTime.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.dateTime
            },
            {
                id: AX_BUNDLE_DETAILS.definitionGridColumns.lastChangedBy.fieldId,
                resourceType: RX_RECORD_DEFINITION.resourceTypes.character
            }
        ];
        const fieldDefinitionsById = fieldDefinitions.reduce((result, fieldDefinition) => {
            result[fieldDefinition.id] = fieldDefinition;
            return result;
        }, {});
        this.recordDefinition = {
            fieldDefinitions,
            fieldDefinitionsById
        };
    }
    onAddDefinition() {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.chatbot.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.new-chatbot.title'),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                autoFocus: false,
                maxLength: this.botNameMaxLength,
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames: _map(this.definitionTabComponent.recordGrid.adaptTableConfig.data, AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId)
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), withLatestFrom(this.rxBundleCacheService.getCurrentBundleDescriptor()), switchMap(([chatbotName, bundleDescriptor]) => {
            const newChatbotName = this.rxBundleCacheService.bundleId === RX_APPLICATION.chatbotBundleId
                ? chatbotName
                : this.rxDefinitionNameService.getDefinitionName(this.rxBundleCacheService.bundleId, chatbotName);
            return this.rxChatbotDefinitionService.create(newChatbotName, bundleDescriptor).pipe(tap(() => {
                this.router.navigate([RX_APPLICATION.innovationStudioBundleId, 'chatbot', 'edit', newChatbotName]);
            }));
        }), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRenameDefinition({ selectedRow, definitionNames }) {
        const definitionType = this.translateService.instant('com.bmc.arsys.rx.client.definition-type.chatbot.label');
        from(this.rxModalService
            .openModal({
            title: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.title', {
                definitionType: definitionType.toLowerCase()
            }),
            size: 'sm',
            content: RenameDefinitionModalComponent,
            data: {
                maxLength: this.botNameMaxLength,
                definitionName: selectedRow.name,
                fieldLabel: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.definition-name.label', { definitionType }),
                validationErrorText: this.translateService.instant('com.bmc.arsys.rx.client.rename-definition-modal.name-validation.message', { definitionType }),
                definitionType,
                definitionNames
            }
        })
            .catch(noop))
            .pipe(filter(Boolean), tap(() => {
            this.isActionInProgress = true;
        }), switchMap((newChatbotName) => this.rxChatbotDefinitionService.rename(selectedRow.id, newChatbotName)), finalize(() => {
            this.isActionInProgress = false;
        }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            .subscribe();
    }
    onDeleteDefinition(selectedRows) {
        from(this.rxModalService.confirm({
            title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
            modalStyle: RX_MODAL.modalStyles.warning,
            message: this.definitionTabComponent.getDeleteSelectedDefinitionMessage()
        }))
            .pipe(switchMap((response) => {
            const defaultChatbot = find(selectedRows, {
                id: RX_CHATBOTS.chatbotSettings.defaultBotId
            });
            if (defaultChatbot && response) {
                return from(this.rxModalService.confirm({
                    title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                    modalStyle: RX_MODAL.modalStyles.warning,
                    message: this.translateService.instant('com.bmc.arsys.rx.client.admin.chatbots.configurations-delete-confirmation.message', { defaultChatbotName: defaultChatbot[AX_BUNDLE_DETAILS.definitionGridColumns.name.fieldId] })
                }));
            }
            else if (response) {
                return of(true);
            }
            else {
                return of(false);
            }
        }), tap((result) => {
            this.isActionInProgress = result;
        }), switchMap((response) => response
            ? this.rxChatbotDefinitionService.delete(_map(selectedRows, 'id')).pipe(tap(() => {
                this.isActionInProgress = false;
            }), switchMap(() => this.definitionTabComponent.recordGrid.api.refresh()))
            : of({})), finalize(() => {
            this.isActionInProgress = false;
        }))
            .subscribe();
    }
    onRowSelectionChanged(selectedRows) {
        this.rowSelectionChanged$.next(selectedRows);
    }
}
/** @nocollapse */ ChatbotDefinitionTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabComponent, deps: [{ token: i1.Router }, { token: i2.RxChatbotDefinitionDataPageService }, { token: i2.RxDefinitionNameService }, { token: i2.RxOverlayService }, { token: i2.RxBundleCacheService }, { token: i3.RxModalService }, { token: i4.TranslateService }, { token: i5.RxChatbotDefinitionService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ChatbotDefinitionTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ChatbotDefinitionTabComponent, selector: "ax-chatbot-definition-tab", inputs: { bundleDescriptor: "bundleDescriptor" }, viewQueries: [{ propertyName: "definitionTabComponent", first: true, predicate: DefinitionTabComponent, descendants: true, static: true }], ngImport: i0, template: "<ax-definition-tab\n  [definitionActions]=\"definitionActions$ | async\"\n  [gridColumns]=\"gridColumns\"\n  [recordDefinition]=\"recordDefinition\"\n  [definitions$]=\"definitions$\"\n  [isActionInProgress]=\"isActionInProgress\"\n  [definitionType]=\"'chatbot'\"\n  (rowSelectionChanged)=\"onRowSelectionChanged($event)\"\n  (addDefinition)=\"onAddDefinition()\"\n  (renameDefinition)=\"onRenameDefinition($event)\"\n  (deleteDefinition)=\"onDeleteDefinition($event)\"\n></ax-definition-tab>\n", components: [{ type: i6.DefinitionTabComponent, selector: "ax-definition-tab", inputs: ["isActionInProgress", "definitionType", "definitionActions", "gridColumns", "definitions$", "recordDefinition", "editRouterLink"], outputs: ["customAction", "deleteDefinition", "renameDefinition", "revertCustomization", "copyDefinition", "addDefinition", "rowSelectionChanged"] }], pipes: { "async": i7.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-chatbot-definition-tab',
                    templateUrl: './chatbot-definition-tab.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RxChatbotDefinitionDataPageService }, { type: i2.RxDefinitionNameService }, { type: i2.RxOverlayService }, { type: i2.RxBundleCacheService }, { type: i3.RxModalService }, { type: i4.TranslateService }, { type: i5.RxChatbotDefinitionService }]; }, propDecorators: { bundleDescriptor: [{
                type: Input
            }], definitionTabComponent: [{
                type: ViewChild,
                args: [DefinitionTabComponent, { static: true }]
            }] } });
//# sourceMappingURL=chatbot-definition-tab.component.js.map