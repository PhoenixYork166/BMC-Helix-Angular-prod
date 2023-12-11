import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdaptTabsModule } from '@bmc-ux/adapt-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AssociationDefinitionTabModule } from '../association-definition-tab/association-definition-tab.module';
import { DocumentDefinitionTabModule } from '../document-definition-tab/document-definition-tab.module';
import { RecordDefinitionTabModule } from '../record-definition-tab/record-definition-tab.module';
import { ViewDefinitionTabModule } from '../view-definition-tab/view-definition-tab.module';
import { ProcessDefinitionTabModule } from '../process-definition-tab/process-definition-tab.module';
import { BundleDefinitionsComponent } from './bundle-definitions.component';
import { RuleDefinitionTabModule } from '../rule-definition-tab/rule-definition-tab.module';
import { NamedListDefinitionTabModule } from '../named-list-definition-tab/named-list-definition-tab.module';
import { WebApiDefinitionTabModule } from '../web-api-definition-tab/web-api-definition-tab.module';
import { ChatbotDefinitionTabModule } from '../chatbot-definition-tab/chatbot-definition-tab.module';
import { EventDefinitionTabModule } from '../event-definition-tab/event-definition-tab.module';
import { EventStatisticsDefinitionTabModule } from '../event-statistics-definition-tab/event-statistics-definition-tab.module';
import { ConfigurationDefinitionTabModule } from '../configuration-definition-tab/configuration-definition-tab.module';
import * as i0 from "@angular/core";
export class BundleDefinitionsModule {
}
/** @nocollapse */ BundleDefinitionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ BundleDefinitionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, declarations: [BundleDefinitionsComponent], imports: [AdaptTabsModule,
        ProcessDefinitionTabModule,
        AssociationDefinitionTabModule,
        ChatbotDefinitionTabModule,
        CommonModule,
        NamedListDefinitionTabModule,
        DocumentDefinitionTabModule,
        RecordDefinitionTabModule,
        RuleDefinitionTabModule,
        RouterModule,
        TranslateModule,
        ViewDefinitionTabModule,
        EventDefinitionTabModule,
        EventStatisticsDefinitionTabModule,
        WebApiDefinitionTabModule,
        ConfigurationDefinitionTabModule], exports: [BundleDefinitionsComponent] });
/** @nocollapse */ BundleDefinitionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, imports: [[
            AdaptTabsModule,
            ProcessDefinitionTabModule,
            AssociationDefinitionTabModule,
            ChatbotDefinitionTabModule,
            CommonModule,
            NamedListDefinitionTabModule,
            DocumentDefinitionTabModule,
            RecordDefinitionTabModule,
            RuleDefinitionTabModule,
            RouterModule,
            TranslateModule,
            ViewDefinitionTabModule,
            EventDefinitionTabModule,
            EventStatisticsDefinitionTabModule,
            WebApiDefinitionTabModule,
            ConfigurationDefinitionTabModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: BundleDefinitionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptTabsModule,
                        ProcessDefinitionTabModule,
                        AssociationDefinitionTabModule,
                        ChatbotDefinitionTabModule,
                        CommonModule,
                        NamedListDefinitionTabModule,
                        DocumentDefinitionTabModule,
                        RecordDefinitionTabModule,
                        RuleDefinitionTabModule,
                        RouterModule,
                        TranslateModule,
                        ViewDefinitionTabModule,
                        EventDefinitionTabModule,
                        EventStatisticsDefinitionTabModule,
                        WebApiDefinitionTabModule,
                        ConfigurationDefinitionTabModule
                    ],
                    declarations: [BundleDefinitionsComponent],
                    exports: [BundleDefinitionsComponent]
                }]
        }] });
//# sourceMappingURL=bundle-definitions.module.js.map