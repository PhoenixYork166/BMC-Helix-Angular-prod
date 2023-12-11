import { ModuleWithProviders } from '@angular/core';
import { RxLogService } from './log.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class RxLoggingModule {
    static forRoot(): ModuleWithProviders<RxLoggingModule>;
    constructor(rxLogService: RxLogService);
    static ɵfac: i0.ɵɵFactoryDeclaration<RxLoggingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RxLoggingModule, never, [typeof i1.CommonModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RxLoggingModule>;
}
