import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RX_RECORD_DEFINITION, RxRecordInstanceDataPageService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxNotificationService } from '@helix/platform/shared/api';
import { RX_MODAL, RxModalService } from '@helix/platform/ui-kit';
import { RecordGridComponent } from '@helix/platform/view/components';
import { find, get, isEmpty, map as _map, noop, parseInt, transform } from 'lodash';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CreateEmailProfileComponent } from './create-email-profile/create-email-profile.component';
import { RX_EMAIL_PROFILES } from './email-profiles.constant';
import { RxEmailProfilesService } from './email-profiles.service';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/record/api";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/ui-kit";
import * as i4 from "./email-profiles.service";
import * as i5 from "@ngx-translate/core";
import * as i6 from "@helix/platform/shared/components";
import * as i7 from "@bmc-ux/adapt-angular";
import * as i8 from "@helix/platform/view/components";
export class EmailProfilesAdminComponent {
    constructor(rxRecordInstanceDataPageService, rxRecordInstanceService, rxNotificationService, rxModalService, rxEmailProfilesService, translateService) {
        this.rxRecordInstanceDataPageService = rxRecordInstanceDataPageService;
        this.rxRecordInstanceService = rxRecordInstanceService;
        this.rxNotificationService = rxNotificationService;
        this.rxModalService = rxModalService;
        this.rxEmailProfilesService = rxEmailProfilesService;
        this.translateService = translateService;
        this.getData = (queryParams) => {
            delete queryParams.searchText;
            delete queryParams.shouldIncludeTotalSize;
            queryParams.recorddefinition = RX_EMAIL_PROFILES.aliasMapping.recordDefinitionName;
            queryParams.propertySelection.push(`${RX_RECORD_DEFINITION.coreFieldIds.status}`, `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationId}`);
            if (!queryParams.queryExpression) {
                queryParams.queryExpression = RX_EMAIL_PROFILES.aliasMapping.queryExpression;
            }
            else {
                queryParams.queryExpression += `AND ${RX_EMAIL_PROFILES.aliasMapping.queryExpression}`;
            }
            return this.rxRecordInstanceDataPageService.post({ params: queryParams }).pipe(switchMap((aliasMappings) => {
                if (aliasMappings.totalSize === 0) {
                    return of(aliasMappings);
                }
                else {
                    let expression = '';
                    aliasMappings.data.forEach((aliasMapping) => {
                        if (aliasMapping[RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue] !== null) {
                            if (!isEmpty(expression)) {
                                expression += ' OR ';
                            }
                            expression += `'${RX_RECORD_DEFINITION.coreFieldIds.id}' = "${aliasMapping[RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue]}"`;
                        }
                    });
                    const query = {
                        queryExpression: RX_EMAIL_PROFILES.mailbox.queryExpression,
                        recorddefinition: RX_EMAIL_PROFILES.mailbox.recordDefinitionName
                    };
                    if (!isEmpty(expression)) {
                        query.queryExpression += ` AND ((${expression}))`;
                    }
                    return this.rxRecordInstanceDataPageService.post({ params: query }).pipe(map((outgoingMailboxes) => {
                        if (outgoingMailboxes.totalSize === 0) {
                            return aliasMappings;
                        }
                        else {
                            outgoingMailboxes.data.forEach((outgoingMailbox) => {
                                aliasMappings.data = transform(aliasMappings.data, (result, value) => {
                                    if (value[RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue] ===
                                        outgoingMailbox[RX_RECORD_DEFINITION.coreFieldIds.id]) {
                                        value[RX_EMAIL_PROFILES.aliasMapping.fieldIds.description] =
                                            outgoingMailbox[RX_EMAIL_PROFILES.mailbox.fieldIds.mailboxName.id];
                                        value[RX_EMAIL_PROFILES.aliasMapping.fieldIds.assignee] =
                                            outgoingMailbox[RX_EMAIL_PROFILES.mailbox.fieldIds.mailboxFunction];
                                    }
                                    result.push(value);
                                }, []);
                            });
                            return aliasMappings;
                        }
                    }));
                }
            }));
        };
    }
    ngOnInit() {
        const gridColumns = [
            {
                fieldId: `${RX_RECORD_DEFINITION.coreFieldIds.id}`,
                index: 0,
                title: this.translateService.instant('com.bmc.arsys.rx.client.common.id.label'),
                visible: false
            },
            {
                fieldId: `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasName}`,
                index: 1,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.create-email-profile.profile-name.label'),
                clickable: true,
                actions: [
                    {
                        name: (previousActionResult, selectedRow) => {
                            this.currentRecordInstance = this.rxRecordInstanceService.get(RX_EMAIL_PROFILES.aliasMapping.recordDefinitionName, selectedRow[RX_RECORD_DEFINITION.coreFieldIds.id]);
                            const profileData = {
                                profileName: selectedRow[RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasName],
                                mailbox: selectedRow[RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue],
                                application: selectedRow[RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationId],
                                mailboxType: (() => {
                                    const assignee = parseInt(selectedRow[RX_EMAIL_PROFILES.aliasMapping.fieldIds.assignee], 10);
                                    return _map(RX_EMAIL_PROFILES.mailbox.mailboxFunctions, (mailboxFunction) => mailboxFunction.id).includes(assignee)
                                        ? assignee
                                        : null;
                                })()
                            };
                            this.createEmailProfile(profileData);
                        }
                    }
                ]
            },
            {
                fieldId: `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.description}`,
                index: 2,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.create-email-profile.mailbox.label'),
                sortable: false,
                filterable: false
            },
            {
                fieldId: `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.assignee}`,
                index: 3,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.create-email-profile.mailbox-function.label'),
                sortable: false,
                filterable: false,
                cellTemplate: this.mailboxFunctionCellTemplate
            },
            {
                fieldId: `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue}`,
                index: 4,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.outgoing-mailbox-id.label'),
                visible: false
            },
            {
                fieldId: `${RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationName}`,
                index: 5,
                title: this.translateService.instant('com.bmc.arsys.rx.client.admin.create-email-profile.application.label')
            }
        ];
        const recordDefinition = {
            fieldDefinitions: [
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.description,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_EMAIL_PROFILES.aliasMapping.fieldIds.assignee,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_RECORD_DEFINITION.coreFieldIds.id,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationName,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                },
                {
                    id: RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue,
                    resourceType: RX_RECORD_DEFINITION.resourceTypes.character
                }
            ]
        };
        const actionButtons = [
            {
                label: 'Delete',
                style: 'tertiary',
                icon: 'trash',
                actions: [
                    {
                        name: () => {
                            this.rxModalService
                                .confirm({
                                title: this.translateService.instant('com.bmc.arsys.rx.client.common.warning.label'),
                                modalStyle: RX_MODAL.modalStyles.warning,
                                message: this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.delete-confirmation.message')
                            })
                                .then((response) => {
                                if (response) {
                                    const selectedEmailProfiles = this.emailProfilesGrid.api.getSelectedRows();
                                    const selectedEmailProfileIds = _map(selectedEmailProfiles, RX_RECORD_DEFINITION.coreFieldIds.id);
                                    this.rxEmailProfilesService
                                        .deleteEmailProfiles(RX_EMAIL_PROFILES.aliasMapping.recordDefinitionName, selectedEmailProfileIds)
                                        .subscribe(() => {
                                        this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.deleted-email-profile.message'));
                                        this.refreshEmailProfilesGrid();
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        ];
        this.emailProfilesGridConfig$ = of({
            enableFiltering: true,
            columns: gridColumns,
            getRecordDefinition: () => of(recordDefinition),
            actionButtons: actionButtons,
            getData: this.getData,
            styles: 'flex-fill'
        });
    }
    createEmailProfile(profile) {
        this.rxModalService
            .openDockedPanel({
            title: profile
                ? this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.update-email-profile.message')
                : this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.add-new-email-profile.message'),
            content: CreateEmailProfileComponent,
            size: 'lg',
            data: {
                profile
            }
        })
            .then((emailProfile) => {
            if (!profile) {
                this.currentRecordInstance = this.rxRecordInstanceService.getNew(RX_EMAIL_PROFILES.aliasMapping.recordDefinitionName);
            }
            return this.currentRecordInstance
                .pipe(map((recordInstance) => {
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasType.id, this.translateService.instant(RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasType.defaultValue));
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasName, emailProfile.profileName);
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationId, get(emailProfile, 'application[0].id', 'None'));
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.applicationName, get(emailProfile, 'application[0].name', 'None'));
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.aliasValue, emailProfile.mailbox[0][RX_RECORD_DEFINITION.coreFieldIds.id]);
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.description, 'Email profile');
                recordInstance.setFieldValue(RX_EMAIL_PROFILES.aliasMapping.fieldIds.status, parseInt(emailProfile.mailboxFunction, 10) === RX_EMAIL_PROFILES.mailbox.mailboxFunctions.outgoing.id
                    ? RX_EMAIL_PROFILES.aliasMapping.status.new
                    : RX_EMAIL_PROFILES.aliasMapping.status.assigned);
                return recordInstance;
            }), switchMap((recordInstance) => {
                if (profile) {
                    return this.rxRecordInstanceService.save(recordInstance);
                }
                else {
                    return this.rxRecordInstanceService.create(recordInstance);
                }
            }))
                .subscribe(() => {
                this.refreshEmailProfilesGrid();
                this.rxNotificationService.addSuccessMessage(this.translateService.instant('com.bmc.arsys.rx.client.admin.email-profiles.saved-email-profile.message'));
            });
        })
            .catch(noop);
    }
    refreshEmailProfilesGrid() {
        this.emailProfilesGrid.api.refresh().subscribe();
    }
    getMailboxFunctionType(dataItem) {
        const mailbox = find(RX_EMAIL_PROFILES.mailbox.mailboxFunctions, (mailboxFunction) => mailboxFunction.id === dataItem[RX_EMAIL_PROFILES.aliasMapping.fieldIds.assignee]);
        return mailbox ? this.translateService.instant(mailbox.label) : 'None';
    }
}
EmailProfilesAdminComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesAdminComponent, deps: [{ token: i1.RxRecordInstanceDataPageService }, { token: i1.RxRecordInstanceService }, { token: i2.RxNotificationService }, { token: i3.RxModalService }, { token: i4.RxEmailProfilesService }, { token: i5.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
EmailProfilesAdminComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: EmailProfilesAdminComponent, selector: "rx-admin-email-profiles", viewQueries: [{ propertyName: "emailProfilesGrid", first: true, predicate: ["emailProfilesGrid"], descendants: true }, { propertyName: "mailboxFunctionCellTemplate", first: true, predicate: ["mailboxFunctionCellTemplate"], descendants: true, static: true }], ngImport: i0, template: "<rx-admin-settings header=\"{{ 'com.bmc.arsys.rx.client.admin.email-profiles.header.title' | translate }}\">\n  <div>\n    <button\n      adapt-button\n      type=\"button\"\n      btn-type=\"tertiary\"\n      class=\"d-icon-left-plus_circle\"\n      rx-id=\"new-email-profile-button\"\n      (click)=\"createEmailProfile()\"\n    >\n      {{ 'com.bmc.arsys.rx.client.common.new.label' | translate }}\n    </button>\n  </div>\n  <rx-record-grid rx-id=\"email-profile-grid\" #emailProfilesGrid [config]=\"emailProfilesGridConfig$\"></rx-record-grid>\n</rx-admin-settings>\n\n<ng-template #mailboxFunctionCellTemplate let-dataItem=\"dataItem\">\n  <div>\n    {{ getMailboxFunctionType(dataItem) }}\n  </div>\n</ng-template>\n", components: [{ type: i6.AdminSettingsComponent, selector: "rx-admin-settings", inputs: ["header", "busy"] }, { type: i7.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i8.RecordGridComponent, selector: "rx-record-grid", inputs: ["config"], outputs: ["dataLoaded"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: EmailProfilesAdminComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-admin-email-profiles',
                    templateUrl: './email-profiles.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxRecordInstanceDataPageService }, { type: i1.RxRecordInstanceService }, { type: i2.RxNotificationService }, { type: i3.RxModalService }, { type: i4.RxEmailProfilesService }, { type: i5.TranslateService }]; }, propDecorators: { emailProfilesGrid: [{
                type: ViewChild,
                args: ['emailProfilesGrid']
            }], mailboxFunctionCellTemplate: [{
                type: ViewChild,
                args: ['mailboxFunctionCellTemplate', { static: true }]
            }] } });
//# sourceMappingURL=email-profiles.component.js.map