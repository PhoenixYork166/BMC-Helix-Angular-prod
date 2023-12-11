import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class RxIpaasBaseApisService {
    private httpClient;
    constructor(httpClient: HttpClient);
    renameApiGroup(resourceType: string, oldGroupName: string, newGroupName: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxIpaasBaseApisService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxIpaasBaseApisService>;
}
