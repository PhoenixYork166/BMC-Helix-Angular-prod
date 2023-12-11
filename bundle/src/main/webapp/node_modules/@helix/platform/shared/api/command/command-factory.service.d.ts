import { ICommand } from './command.interface';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class RxCommandFactoryService {
    private httpClient;
    constructor(httpClient: HttpClient);
    forResourceType(resourceType: string): ICommand;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCommandFactoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCommandFactoryService>;
}
