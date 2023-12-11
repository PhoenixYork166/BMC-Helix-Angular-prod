import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPage, IDataPageRequestConfiguration, IDataPageResult } from '../data-page';
import * as i0 from "@angular/core";
export declare class RxChatbotDefinitionDataPageService extends DataPage {
    private injector;
    constructor(injector: Injector);
    get(dataPageRequestConfiguration?: IDataPageRequestConfiguration): Observable<IDataPageResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxChatbotDefinitionDataPageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxChatbotDefinitionDataPageService>;
}
