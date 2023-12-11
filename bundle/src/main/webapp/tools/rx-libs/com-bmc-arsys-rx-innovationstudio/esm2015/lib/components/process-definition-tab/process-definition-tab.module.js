import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessDefinitionTabComponent } from './process-definition-tab.component';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { ProcessManagementModule } from '../process-management/process-management.module';
import { RxDefinitionModule } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class ProcessDefinitionTabModule {
}
/** @nocollapse */ ProcessDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ ProcessDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, declarations: [ProcessDefinitionTabComponent], imports: [CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule], exports: [ProcessDefinitionTabComponent] });
/** @nocollapse */ ProcessDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, imports: [[CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ProcessDefinitionTabComponent],
                    imports: [CommonModule, DefinitionTabModule, ProcessManagementModule, RxDefinitionModule],
                    exports: [ProcessDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=process-definition-tab.module.js.map