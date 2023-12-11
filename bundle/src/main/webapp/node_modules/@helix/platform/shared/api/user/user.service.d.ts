import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RxUrlUtilsService } from '@helix/platform/utils';
import { Observable } from 'rxjs';
import { RxFeatureService } from '../services/feature/feature.service';
import { IUser } from './user.interface';
import * as i0 from "@angular/core";
export declare class RxUserService {
    private httpClient;
    private rxFeatureService;
    private router;
    private rxUrlUtilsService;
    constructor(httpClient: HttpClient, rxFeatureService: RxFeatureService, router: Router, rxUrlUtilsService: RxUrlUtilsService);
    getUser(id: string, bundleId?: string): Observable<IUser>;
    getCurrentUser(): Observable<IUser>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxUserService>;
}
