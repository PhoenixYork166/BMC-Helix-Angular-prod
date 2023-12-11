import { TranslateService } from '@ngx-translate/core';
import { RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxGetRecordProcessActionService } from './process/get-record-process-action.service';
import * as i0 from "@angular/core";
import * as i1 from "./components/get-record-input-map-inspector-widget/get-record-input-map-inspector-widget.module";
export declare class RxGetRecordServerActionRegistrationModule {
    constructor(rxGetRecordProcessActionService: RxGetRecordProcessActionService, rxProcessElementRegistryService: RxProcessElementRegistryService, translateService: TranslateService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxGetRecordServerActionRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxGetRecordServerActionRegistrationModule, never, [typeof i1.RxGetRecordInputMapInspectorWidgetModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxGetRecordServerActionRegistrationModule>;
}
