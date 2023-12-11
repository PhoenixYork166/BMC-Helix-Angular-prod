import { TranslateService } from '@ngx-translate/core';
import { RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxEndEventService } from './end-event.service';
import * as i0 from "@angular/core";
export declare class RxEndEventRegistrationModule {
    constructor(rxEndEventService: RxEndEventService, rxProcessElementRegistryService: RxProcessElementRegistryService, translateService: TranslateService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEndEventRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxEndEventRegistrationModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxEndEventRegistrationModule>;
}
