import { IDataPageRequestConfiguration } from './data-page-request-configuration.interface';
import { DataPage } from './data-page.class';
import { Injector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RxDataPageFactoryService {
    private injector;
    constructor(injector: Injector);
    withType(dataPageType: string, defaultDataPageRequestConfiguration?: IDataPageRequestConfiguration): DataPage;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDataPageFactoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDataPageFactoryService>;
}
