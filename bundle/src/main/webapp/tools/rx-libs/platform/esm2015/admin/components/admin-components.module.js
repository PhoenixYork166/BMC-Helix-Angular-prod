import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdaptAccordionModule, AdaptBusyModule, AdaptButtonModule, AdaptDockedPanelModule, AdaptEmptyStateModule, AdaptModalModule, AdaptSidebarModule, AdaptTreeModule } from '@bmc-ux/adapt-angular';
import { AdminSettingsModule, RxFormBuilderModule } from '@helix/platform/shared/components';
import { RxBusyIndicatorModule } from '@helix/platform/ui-kit';
import { ViewActionsModule } from '@helix/platform/view/actions';
import { RecordGridModule, ViewComponentsModule } from '@helix/platform/view/components';
import { RuntimeViewModule } from '@helix/platform/view/runtime';
import { TranslateModule } from '@ngx-translate/core';
import { AdminCommonSettingsBladeComponent } from './admin-common-settings-blade/admin-common-settings-blade.component';
import { AdminCommonSettingsEditorComponent } from './admin-common-settings-editor/admin-common-settings-editor.component';
import { AdminCommonSettingsComponent } from './admin-common-settings/admin-common-settings.component';
import { AdminComponentsRoutingModule } from './admin-components-routing.module';
import { AdminSettingsExplorerComponent } from './admin-settings-explorer/admin-settings-explorer.component';
import { ApplicationIssuesRegistrationModule } from './application-issues/application-issues-registration.module';
import { ApprovalConfigurationRegistrationModule } from './approval-configuration/approval-configuration-registration.module';
import { ApprovalNotificationsRegistrationModule } from './approval-notifications/approval-notifications-registration.module';
import { BmcServiceCloudAccountRegistrationModule } from './bmc-service-cloud-account/bmc-service-cloud-account-registration.module';
import { ChatbotsRegistrationModule } from './chatbots/chatbots-registration.module';
import { CognitiveConsumptionRegistrationModule } from './cognitive-consumption/cognitive-consumption-registration.module';
import { CognitiveSearchRegistrationModule } from './cognitive-search/cognitive-search-registration.module';
import { CognitiveServiceRegistrationModule } from './cognitive-service/cognitive-service-registration.module';
import { CognitiveTrainingRegistrationModule } from './cognitive-training/cognitive-training-registration.module';
import { ComaroundKnowledgeRegistrationModule } from './comaround-knowledge/comaround-knowledge-registration.module';
import { ConnectorMappingRegistrationModule } from './connection-mapping/connector-mapping';
import { DataSourceMappingModule } from './connection-mapping/data-source-mapping/data-source-mapping.module';
import { WebApiMappingRegistrationModule } from './connection-mapping/web-api-mapping/web-api-mapping-registration.module';
import { ConnectorConfigurationRegistrationModule } from './connector-configuration/connector-configuration-registration.module';
import { DataSourceConnectionsRegistrationModule } from './data-source-connections/data-source-connections-registration.module';
import { EmailProfilesRegistrationModule } from './email-profiles/email-profiles-registration.module';
import { FunctionalRolesRegistrationModule } from './functional-roles/functional-roles-registration.module';
import { HkmAccessMappingRegistrationModule } from './hkm-access-mapping/hkm-access-mapping-registration.module';
import { IframeSecurityRegistrationModule } from './iframe-security/iframe-security-registration.module';
import { JitterbitApisRegistrationModule } from './ipaas/jitterbit-apis/jitterbit-apis-registration.module';
import { JitterbitConfigurationRegistrationModule } from './ipaas/jitterbit-configuration/jitterbit-configuration-registration.module';
import { MulesoftApisRegistrationModule } from './ipaas/mulesoft-apis/mulesoft-apis-registration.module';
import { MulesoftConfigurationRegistrationModule } from './ipaas/mulesoft-configuration/mulesoft-configuration-registration.module';
import { IssueReportingConfigurationModule } from './issue-reporting-configuration/issue-reporting-configuration-registration.module';
import { ManageTenantRegistrationModule } from './manage-tenant/manage-tenant-registration.module';
import { OutgoingMailboxStatusRegistrationModule } from './outgoing-mailbox-status/outgoing-mailbox-status-registration.module';
import { PermissionsPolicyHeaderRegistrationModule } from './permissions-policy-header/permissions-policy-header-registration.module';
import { RealTimeTranslationRegistrationModule } from './real-time-translation';
import { RolePermissionsRegistrationModule } from './role-permissions';
import { RssoOauthRegistrationModule } from './rsso-oauth/rsso-oauth-registration.module';
import { RulePoolManagementRegistrationModule } from './rule-pool-management/rule-pool-management-registration.module';
import { ServerInformationRegistrationModule } from './server-information';
import { ServerLogsRegistrationModule } from './server-logs/server-logs-registration.module';
import { ServicesProviderRegionRegistrationModule } from './services-provider-region';
import { RxAdminCommonSettingsService } from './services/admin-common-settings.service';
import { SummarizationServiceRegistrationModule } from './summarization-service';
import { SummarizationTestingRegistrationModule } from './summarization-testing/summarization-testing-registration.module';
import { ToneAnalysisTestingRegistrationModule } from './tone-analysis-testing/tone-analysis-testing-registration.module';
import { VirtualChatConfigurationRegistrationModule } from './virtual-chat-configuration/virtual-chat-configuration-registration.module';
import { WebApiConnectionsRegistrationModule } from './web-api-connections/web-api-connections-registration.module';
import { WebhookCallbackConfigurationRegistrationModule } from './webhook-callback-configuration/webhook-callback-configuration-registration.module';
import { SearchFiltersRegistrationModule } from './search-filters';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export class AdminComponentsModule {
}
AdminComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdminComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsModule, declarations: [AdminSettingsExplorerComponent,
        AdminCommonSettingsComponent,
        AdminCommonSettingsEditorComponent,
        AdminCommonSettingsBladeComponent], imports: [AdaptDockedPanelModule,
        AdaptModalModule,
        AdaptTreeModule,
        AdaptEmptyStateModule,
        AdaptSidebarModule,
        AdaptButtonModule, i1.AdaptBusyModule, AdaptAccordionModule,
        BmcServiceCloudAccountRegistrationModule,
        AdminComponentsRoutingModule,
        AdminSettingsModule,
        ApplicationIssuesRegistrationModule,
        ApprovalConfigurationRegistrationModule,
        ApprovalNotificationsRegistrationModule,
        ChatbotsRegistrationModule,
        CognitiveConsumptionRegistrationModule,
        CognitiveSearchRegistrationModule,
        CognitiveServiceRegistrationModule,
        CognitiveTrainingRegistrationModule,
        ComaroundKnowledgeRegistrationModule,
        CommonModule,
        ConnectorConfigurationRegistrationModule,
        ConnectorMappingRegistrationModule,
        DataSourceConnectionsRegistrationModule,
        DataSourceMappingModule,
        EmailProfilesRegistrationModule,
        FormsModule,
        FunctionalRolesRegistrationModule,
        IframeSecurityRegistrationModule,
        IssueReportingConfigurationModule,
        JitterbitApisRegistrationModule,
        JitterbitConfigurationRegistrationModule,
        ManageTenantRegistrationModule,
        MulesoftApisRegistrationModule,
        MulesoftConfigurationRegistrationModule,
        OutgoingMailboxStatusRegistrationModule,
        RecordGridModule,
        RolePermissionsRegistrationModule,
        RulePoolManagementRegistrationModule,
        RuntimeViewModule,
        RxFormBuilderModule,
        RxBusyIndicatorModule,
        ServerInformationRegistrationModule,
        ServerLogsRegistrationModule,
        ServicesProviderRegionRegistrationModule,
        SummarizationServiceRegistrationModule,
        SummarizationTestingRegistrationModule,
        RealTimeTranslationRegistrationModule,
        RssoOauthRegistrationModule,
        TranslateModule,
        VirtualChatConfigurationRegistrationModule,
        ViewActionsModule,
        ViewComponentsModule,
        WebApiMappingRegistrationModule,
        WebApiConnectionsRegistrationModule,
        WebhookCallbackConfigurationRegistrationModule,
        ToneAnalysisTestingRegistrationModule,
        PermissionsPolicyHeaderRegistrationModule,
        HkmAccessMappingRegistrationModule,
        SearchFiltersRegistrationModule] });
AdminComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsModule, providers: [RxAdminCommonSettingsService], imports: [[
            AdaptDockedPanelModule,
            AdaptModalModule,
            AdaptTreeModule,
            AdaptEmptyStateModule,
            AdaptSidebarModule,
            AdaptButtonModule,
            AdaptBusyModule.forRoot(),
            AdaptAccordionModule,
            BmcServiceCloudAccountRegistrationModule,
            AdminComponentsRoutingModule,
            AdminSettingsModule,
            ApplicationIssuesRegistrationModule,
            ApprovalConfigurationRegistrationModule,
            ApprovalNotificationsRegistrationModule,
            ChatbotsRegistrationModule,
            CognitiveConsumptionRegistrationModule,
            CognitiveSearchRegistrationModule,
            CognitiveServiceRegistrationModule,
            CognitiveTrainingRegistrationModule,
            ComaroundKnowledgeRegistrationModule,
            CommonModule,
            ConnectorConfigurationRegistrationModule,
            ConnectorMappingRegistrationModule,
            DataSourceConnectionsRegistrationModule,
            DataSourceMappingModule,
            EmailProfilesRegistrationModule,
            FormsModule,
            FunctionalRolesRegistrationModule,
            IframeSecurityRegistrationModule,
            IssueReportingConfigurationModule,
            JitterbitApisRegistrationModule,
            JitterbitConfigurationRegistrationModule,
            ManageTenantRegistrationModule,
            MulesoftApisRegistrationModule,
            MulesoftConfigurationRegistrationModule,
            OutgoingMailboxStatusRegistrationModule,
            RecordGridModule,
            RolePermissionsRegistrationModule,
            RulePoolManagementRegistrationModule,
            RuntimeViewModule,
            RxFormBuilderModule,
            RxBusyIndicatorModule,
            ServerInformationRegistrationModule,
            ServerLogsRegistrationModule,
            ServicesProviderRegionRegistrationModule,
            SummarizationServiceRegistrationModule,
            SummarizationTestingRegistrationModule,
            RealTimeTranslationRegistrationModule,
            RssoOauthRegistrationModule,
            TranslateModule,
            VirtualChatConfigurationRegistrationModule,
            ViewActionsModule,
            ViewComponentsModule,
            WebApiMappingRegistrationModule,
            WebApiConnectionsRegistrationModule,
            WebhookCallbackConfigurationRegistrationModule,
            ToneAnalysisTestingRegistrationModule,
            PermissionsPolicyHeaderRegistrationModule,
            HkmAccessMappingRegistrationModule,
            SearchFiltersRegistrationModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AdminComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptDockedPanelModule,
                        AdaptModalModule,
                        AdaptTreeModule,
                        AdaptEmptyStateModule,
                        AdaptSidebarModule,
                        AdaptButtonModule,
                        AdaptBusyModule.forRoot(),
                        AdaptAccordionModule,
                        BmcServiceCloudAccountRegistrationModule,
                        AdminComponentsRoutingModule,
                        AdminSettingsModule,
                        ApplicationIssuesRegistrationModule,
                        ApprovalConfigurationRegistrationModule,
                        ApprovalNotificationsRegistrationModule,
                        ChatbotsRegistrationModule,
                        CognitiveConsumptionRegistrationModule,
                        CognitiveSearchRegistrationModule,
                        CognitiveServiceRegistrationModule,
                        CognitiveTrainingRegistrationModule,
                        ComaroundKnowledgeRegistrationModule,
                        CommonModule,
                        ConnectorConfigurationRegistrationModule,
                        ConnectorMappingRegistrationModule,
                        DataSourceConnectionsRegistrationModule,
                        DataSourceMappingModule,
                        EmailProfilesRegistrationModule,
                        FormsModule,
                        FunctionalRolesRegistrationModule,
                        IframeSecurityRegistrationModule,
                        IssueReportingConfigurationModule,
                        JitterbitApisRegistrationModule,
                        JitterbitConfigurationRegistrationModule,
                        ManageTenantRegistrationModule,
                        MulesoftApisRegistrationModule,
                        MulesoftConfigurationRegistrationModule,
                        OutgoingMailboxStatusRegistrationModule,
                        RecordGridModule,
                        RolePermissionsRegistrationModule,
                        RulePoolManagementRegistrationModule,
                        RuntimeViewModule,
                        RxFormBuilderModule,
                        RxBusyIndicatorModule,
                        ServerInformationRegistrationModule,
                        ServerLogsRegistrationModule,
                        ServicesProviderRegionRegistrationModule,
                        SummarizationServiceRegistrationModule,
                        SummarizationTestingRegistrationModule,
                        RealTimeTranslationRegistrationModule,
                        RssoOauthRegistrationModule,
                        TranslateModule,
                        VirtualChatConfigurationRegistrationModule,
                        ViewActionsModule,
                        ViewComponentsModule,
                        WebApiMappingRegistrationModule,
                        WebApiConnectionsRegistrationModule,
                        WebhookCallbackConfigurationRegistrationModule,
                        ToneAnalysisTestingRegistrationModule,
                        PermissionsPolicyHeaderRegistrationModule,
                        HkmAccessMappingRegistrationModule,
                        SearchFiltersRegistrationModule
                    ],
                    providers: [RxAdminCommonSettingsService],
                    declarations: [
                        AdminSettingsExplorerComponent,
                        AdminCommonSettingsComponent,
                        AdminCommonSettingsEditorComponent,
                        AdminCommonSettingsBladeComponent
                    ]
                }]
        }] });
//# sourceMappingURL=admin-components.module.js.map