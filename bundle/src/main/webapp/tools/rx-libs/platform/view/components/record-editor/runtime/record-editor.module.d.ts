import { RecordEditorComponentDefinitionAdapterService } from './record-editor-component-definition-adapter.service';
import { RxAssociationManagerService } from './association-manager.class';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
import * as i1 from "./record-editor.component";
import * as i2 from "@angular/common";
import * as i3 from "@helix/platform/view/runtime";
import * as i4 from "@angular/forms";
import * as i5 from "@bmc-ux/adapt-angular";
import * as i6 from "@helix/platform/ui-kit";
import * as i7 from "@ngx-translate/core";
export declare function AssociationManagerFactory(rxAssociationInstanceDataPageService: any, rxRecordDefinitionCacheService: any, rxRecordInstanceUtilsService: any, rxRecordInstanceService: any, rxJsonParserService: any, rxAssociationDefinitionCacheService: any): (options: any) => RxAssociationManagerService;
export declare class RecordEditorModule {
    private rxDefinitionAdapterRegistryService;
    private recordEditorComponentDefinitionAdapterService;
    constructor(rxDefinitionAdapterRegistryService: RxDefinitionAdapterRegistryService, recordEditorComponentDefinitionAdapterService: RecordEditorComponentDefinitionAdapterService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RecordEditorModule, [typeof i1.RecordEditorComponent], [typeof i2.CommonModule, typeof i3.RuntimeViewCanvasModule, typeof i4.ReactiveFormsModule, typeof i5.AdaptButtonModule, typeof i6.RxModalModule, typeof i7.TranslateModule, typeof i5.AdaptAlertModule], [typeof i1.RecordEditorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RecordEditorModule>;
}
