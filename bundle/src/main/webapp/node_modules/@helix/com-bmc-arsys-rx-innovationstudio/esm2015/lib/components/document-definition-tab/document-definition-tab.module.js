import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentDefinitionTabComponent } from './document-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import * as i0 from "@angular/core";
export class DocumentDefinitionTabModule {
}
/** @nocollapse */ DocumentDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ DocumentDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, declarations: [DocumentDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [DocumentDefinitionTabComponent] });
/** @nocollapse */ DocumentDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [DocumentDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=document-definition-tab.module.js.map