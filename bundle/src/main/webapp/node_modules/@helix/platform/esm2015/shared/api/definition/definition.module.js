import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxDefinitionNamePipe } from './definition-name.pipe';
import { RxDefinitionScopePipe } from './definition-scope.pipe';
import * as i0 from "@angular/core";
export class RxDefinitionModule {
}
RxDefinitionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RxDefinitionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe], imports: [CommonModule], exports: [RxDefinitionNamePipe, RxDefinitionScopePipe] });
RxDefinitionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxDefinitionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                    exports: [RxDefinitionNamePipe, RxDefinitionScopePipe],
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=definition.module.js.map