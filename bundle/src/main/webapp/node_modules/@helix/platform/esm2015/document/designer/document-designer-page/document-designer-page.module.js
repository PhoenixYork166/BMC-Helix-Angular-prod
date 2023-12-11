import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentDesignerModule } from '../document-designer/document-designer.module';
import { DocumentDesignerPageComponent } from './document-designer-page.component';
import * as i0 from "@angular/core";
export class DocumentDesignerPageModule {
}
DocumentDesignerPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DocumentDesignerPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, declarations: [DocumentDesignerPageComponent], imports: [CommonModule, DocumentDesignerModule, TranslateModule], exports: [DocumentDesignerPageComponent] });
DocumentDesignerPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, imports: [[CommonModule, DocumentDesignerModule, TranslateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DocumentDesignerPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DocumentDesignerPageComponent],
                    exports: [DocumentDesignerPageComponent],
                    imports: [CommonModule, DocumentDesignerModule, TranslateModule]
                }]
        }] });
//# sourceMappingURL=document-designer-page.module.js.map