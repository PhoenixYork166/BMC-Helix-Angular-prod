import { TranslateService } from '@ngx-translate/core';
import { RxProcessElementRegistryService } from '@helix/platform/process/api';
import { RxStartEventService } from './start-event.service';
import * as i0 from "@angular/core";
export declare class RxStartEventRegistrationModule {
    constructor(rxProcessElementRegistryService: RxProcessElementRegistryService, rxStartEventService: RxStartEventService, translateService: TranslateService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxStartEventRegistrationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxStartEventRegistrationModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxStartEventRegistrationModule>;
}
