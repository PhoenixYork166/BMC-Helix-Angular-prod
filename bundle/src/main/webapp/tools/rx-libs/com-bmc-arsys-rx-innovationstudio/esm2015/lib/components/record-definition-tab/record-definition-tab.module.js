import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AxRecordDefinitionTypePipe } from './record-definition-type.pipe';
import { CreateCustomRecordModule } from '../create-custom-record/create-custom-record.module';
import { CreateJoinRecordModule } from '../create-join-record/create-join-record.module';
import { DefinitionTabModule } from '../definition-tab/definition-tab.module';
import { ExternalRecordWizardModule } from '../external-record-wizard/external-record-wizard.module';
import { JoinRecordWizardModule } from '../join-record-wizard/join-record-wizard.module';
import { RecordDefinitionTabComponent } from './record-definition-tab.component';
import * as i0 from "@angular/core";
export class RecordDefinitionTabModule {
}
/** @nocollapse */ RecordDefinitionTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ RecordDefinitionTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, declarations: [RecordDefinitionTabComponent, AxRecordDefinitionTypePipe], imports: [CommonModule,
        DefinitionTabModule,
        ExternalRecordWizardModule,
        JoinRecordWizardModule,
        CreateCustomRecordModule,
        CreateJoinRecordModule], exports: [RecordDefinitionTabComponent] });
/** @nocollapse */ RecordDefinitionTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, imports: [[
            CommonModule,
            DefinitionTabModule,
            ExternalRecordWizardModule,
            JoinRecordWizardModule,
            CreateCustomRecordModule,
            CreateJoinRecordModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordDefinitionTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DefinitionTabModule,
                        ExternalRecordWizardModule,
                        JoinRecordWizardModule,
                        CreateCustomRecordModule,
                        CreateJoinRecordModule
                    ],
                    declarations: [RecordDefinitionTabComponent, AxRecordDefinitionTypePipe],
                    exports: [RecordDefinitionTabComponent]
                }]
        }] });
//# sourceMappingURL=record-definition-tab.module.js.map