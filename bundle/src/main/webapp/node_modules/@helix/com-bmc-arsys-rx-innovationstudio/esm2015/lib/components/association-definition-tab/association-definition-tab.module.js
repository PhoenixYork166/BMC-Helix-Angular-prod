import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { AssociationDefinitionTabComponent } from './association-definition-tab.component';
import { RxAssociationPipesModule } from '@helix/platform/association/api';
import * as i0 from "@angular/core";
export class AssociationDefinitionTabModule {
}
/** @nocollapse */ AssociationDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AssociationDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, declarations: [AssociationDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule], exports: [AssociationDefinitionTabComponent] });
/** @nocollapse */ AssociationDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AssociationDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AssociationDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RxDefinitionModule, RxAssociationPipesModule],
                    exports: [AssociationDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=association-definition-tab.module.js.map