import { TranslateService } from '@ngx-translate/core';
import { RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxCreateListProcessActionService } from './process/create-list-process-action.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/elements";
export declare class RxCreateListRegistrationModule {
    constructor(rxCreateListProcessActionService: RxCreateListProcessActionService, rxProcessElementRegistryService: RxProcessElementRegistryService, translateService: TranslateService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCreateListRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxCreateListRegistrationModule, never, [typeof i1.RxExpressionInputMapInspectorWidgetModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxCreateListRegistrationModule>;
}
