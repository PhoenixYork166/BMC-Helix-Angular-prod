import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RxApplicationLoaderService } from './application-loader.service';
import * as i0 from "@angular/core";
export declare class RxApplicationLoaderResolver implements Resolve<void> {
    private rxApplicationLoaderService;
    constructor(rxApplicationLoaderService: RxApplicationLoaderService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxApplicationLoaderResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxApplicationLoaderResolver>;
}
