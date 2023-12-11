import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdaptAlertModule, AdaptButtonModule } from '@bmc-ux/adapt-angular';
import { RxModalModule } from '@helix/platform/ui-kit';
import { RuntimeViewCanvasModule } from '@helix/platform/view/runtime';
import { RecordEditorComponentDefinitionAdapterService } from './record-editor-component-definition-adapter.service';
import { RecordEditorComponent } from './record-editor.component';
import { TranslateModule } from '@ngx-translate/core';
import { RxRecordEditorUtilsService } from '../common/record-editor-utils.service';
import { RxAssociationManagerService } from './association-manager.class';
import { RxAssociationDefinitionCacheService, RxAssociationInstanceDataPageService } from '@helix/platform/association/api';
import { RxRecordDefinitionCacheService, RxRecordInstanceService, RxRecordInstanceUtilsService } from '@helix/platform/record/api';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import { RxViewComponentType } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "./record-editor-component-definition-adapter.service";
import * as i3 from "@bmc-ux/adapt-angular";
// AoT requires an exported function for factories
export function AssociationManagerFactory(rxAssociationInstanceDataPageService, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, rxRecordInstanceService, rxJsonParserService, rxAssociationDefinitionCacheService) {
    const service = function (options) {
        return new RxAssociationManagerService(options, rxAssociationInstanceDataPageService, rxRecordDefinitionCacheService, rxRecordInstanceUtilsService, rxRecordInstanceService, rxJsonParserService, rxAssociationDefinitionCacheService);
    };
    return service;
}
export class RecordEditorModule {
    constructor(rxDefinitionAdapterRegistryService, recordEditorComponentDefinitionAdapterService) {
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.recordEditorComponentDefinitionAdapterService = recordEditorComponentDefinitionAdapterService;
        rxDefinitionAdapterRegistryService.registerRuntimeAdapter(RxViewComponentType.RecordEditor, this.recordEditorComponentDefinitionAdapterService);
    }
}
RecordEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorModule, deps: [{ token: i1.RxDefinitionAdapterRegistryService }, { token: i2.RecordEditorComponentDefinitionAdapterService }], target: i0.ɵɵFactoryTarget.NgModule });
RecordEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorModule, declarations: [RecordEditorComponent], imports: [CommonModule,
        RuntimeViewCanvasModule,
        ReactiveFormsModule,
        AdaptButtonModule,
        RxModalModule,
        TranslateModule, i3.AdaptAlertModule], exports: [RecordEditorComponent] });
RecordEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorModule, providers: [
        RecordEditorComponentDefinitionAdapterService,
        RxRecordEditorUtilsService,
        {
            provide: RxAssociationManagerService,
            useFactory: AssociationManagerFactory,
            deps: [
                RxAssociationInstanceDataPageService,
                RxRecordDefinitionCacheService,
                RxRecordInstanceUtilsService,
                RxRecordInstanceService,
                RxJsonParserService,
                RxAssociationDefinitionCacheService
            ]
        }
    ], imports: [[
            CommonModule,
            RuntimeViewCanvasModule,
            ReactiveFormsModule,
            AdaptButtonModule,
            RxModalModule,
            TranslateModule,
            AdaptAlertModule.forRoot()
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RecordEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RuntimeViewCanvasModule,
                        ReactiveFormsModule,
                        AdaptButtonModule,
                        RxModalModule,
                        TranslateModule,
                        AdaptAlertModule.forRoot()
                    ],
                    providers: [
                        RecordEditorComponentDefinitionAdapterService,
                        RxRecordEditorUtilsService,
                        {
                            provide: RxAssociationManagerService,
                            useFactory: AssociationManagerFactory,
                            deps: [
                                RxAssociationInstanceDataPageService,
                                RxRecordDefinitionCacheService,
                                RxRecordInstanceUtilsService,
                                RxRecordInstanceService,
                                RxJsonParserService,
                                RxAssociationDefinitionCacheService
                            ]
                        }
                    ],
                    exports: [RecordEditorComponent],
                    declarations: [RecordEditorComponent],
                    entryComponents: [RecordEditorComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.RxDefinitionAdapterRegistryService }, { type: i2.RecordEditorComponentDefinitionAdapterService }]; } });
//# sourceMappingURL=record-editor.module.js.map