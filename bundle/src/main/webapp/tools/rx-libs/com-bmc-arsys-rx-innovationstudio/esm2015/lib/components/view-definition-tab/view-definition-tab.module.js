import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDefinitionTabComponent } from './view-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RouterModule } from '@angular/router';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RenameDefinitionModalModule } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export class ViewDefinitionTabModule {
}
/** @nocollapse */ ViewDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ViewDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, declarations: [ViewDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule], exports: [ViewDefinitionTabComponent] });
/** @nocollapse */ ViewDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ViewDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ViewDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RenameDefinitionModalModule],
                    exports: [ViewDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=view-definition-tab.module.js.map