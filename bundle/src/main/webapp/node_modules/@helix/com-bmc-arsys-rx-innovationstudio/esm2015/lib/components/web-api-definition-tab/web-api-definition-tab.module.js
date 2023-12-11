import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { WebApiDefinitionTabComponent } from './web-api-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import * as i0 from "@angular/core";
export class WebApiDefinitionTabModule {
}
/** @nocollapse */ WebApiDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ WebApiDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, declarations: [WebApiDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule], exports: [WebApiDefinitionTabComponent] });
/** @nocollapse */ WebApiDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: WebApiDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [WebApiDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, TranslateModule],
                    exports: [WebApiDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=web-api-definition-tab.module.js.map