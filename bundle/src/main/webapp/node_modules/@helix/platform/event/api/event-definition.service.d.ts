import { Observable } from 'rxjs';
import { RxCommandFactoryService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxEventDefinitionService {
    private rxCommandFactoryService;
    private revertCustomizationCommand;
    constructor(rxCommandFactoryService: RxCommandFactoryService);
    revertCustomization(eventDefinitionName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxEventDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxEventDefinitionService>;
}
