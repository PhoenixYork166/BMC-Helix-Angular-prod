import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamedListDefinitionTabComponent } from './named-list-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class NamedListDefinitionTabModule {
}
/** @nocollapse */ NamedListDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ NamedListDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, declarations: [NamedListDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule], exports: [NamedListDefinitionTabComponent] });
/** @nocollapse */ NamedListDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: NamedListDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NamedListDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule],
                    exports: [NamedListDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=named-list-definition-tab.module.js.map