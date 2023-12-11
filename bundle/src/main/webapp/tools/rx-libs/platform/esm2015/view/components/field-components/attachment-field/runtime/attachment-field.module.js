import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptDownloadModule, AdaptRxUploaderModule } from '@bmc-ux/adapt-angular';
import { ReadOnlyFieldModule } from '@helix/platform/ui-kit';
import { AttachmentFieldComponent } from './attachment-field.component';
import { UploaderService } from '@helix/platform/record/api';
import { TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
export function UploaderFactory() {
    return new UploaderService();
}
export class AttachmentFieldModule {
}
AttachmentFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AttachmentFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldModule, declarations: [AttachmentFieldComponent], imports: [i1.AdaptRxUploaderModule, CommonModule,
        ReadOnlyFieldModule,
        ReactiveFormsModule,
        TranslateModule,
        AdaptDownloadModule] });
AttachmentFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldModule, imports: [[
            AdaptRxUploaderModule.forRoot({
                uploader: {
                    provide: 'UploaderService',
                    useFactory: UploaderFactory,
                    deps: []
                }
            }),
            CommonModule,
            ReadOnlyFieldModule,
            ReactiveFormsModule,
            TranslateModule,
            AdaptDownloadModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AttachmentFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AdaptRxUploaderModule.forRoot({
                            uploader: {
                                provide: 'UploaderService',
                                useFactory: UploaderFactory,
                                deps: []
                            }
                        }),
                        CommonModule,
                        ReadOnlyFieldModule,
                        ReactiveFormsModule,
                        TranslateModule,
                        AdaptDownloadModule
                    ],
                    declarations: [AttachmentFieldComponent],
                    entryComponents: [AttachmentFieldComponent]
                }]
        }] });
//# sourceMappingURL=attachment-field.module.js.map