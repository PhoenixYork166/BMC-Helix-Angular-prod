import { NgModule } from '@angular/core';
import { DataImportRegistrationModule } from './data-import/data-import-registration.module';
import { DataExportRegistrationModule } from './data-export/data-export-registration.module';
import { DataTemplatesRegistrationModule } from './data-templates/data-templates-registration.module';
import * as i0 from "@angular/core";
export class DataloadModule {
}
DataloadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DataloadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule] });
DataloadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, providers: [], imports: [[DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DataloadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DataImportRegistrationModule, DataExportRegistrationModule, DataTemplatesRegistrationModule],
                    providers: [],
                    declarations: []
                }]
        }] });
//# sourceMappingURL=dataload.module..js.map