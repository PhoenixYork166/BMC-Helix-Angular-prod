import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotDefinitionTabComponent } from './chatbot-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class ChatbotDefinitionTabModule {
}
/** @nocollapse */ ChatbotDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ChatbotDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, declarations: [ChatbotDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule], exports: [ChatbotDefinitionTabComponent] });
/** @nocollapse */ ChatbotDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ChatbotDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ChatbotDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule],
                    exports: [ChatbotDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=chatbot-definition-tab.module.js.map