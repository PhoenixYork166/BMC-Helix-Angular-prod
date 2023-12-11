import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { RouterModule } from '@angular/router';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import { RuleDefinitionTabComponent } from './rule-definition-tab.component';
import { RxRulePipesModule } from '@helix/platform/rule/api';
import * as i0 from "@angular/core";
export class RuleDefinitionTabModule {
}
/** @nocollapse */ RuleDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RuleDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, declarations: [RuleDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule], exports: [RuleDefinitionTabComponent] });
/** @nocollapse */ RuleDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RuleDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RuleDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, RouterModule, RxDefinitionModule, RxRulePipesModule],
                    exports: [RuleDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=rule-definition-tab.module.js.map