import { Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxAssociationDefinitionDataPageService extends DataPage {
    private injector;
    constructor(injector: Injector);
    getRecordAssociationDefinitions(recordDefinitionNames: string | string[]): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAssociationDefinitionDataPageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAssociationDefinitionDataPageService>;
}
