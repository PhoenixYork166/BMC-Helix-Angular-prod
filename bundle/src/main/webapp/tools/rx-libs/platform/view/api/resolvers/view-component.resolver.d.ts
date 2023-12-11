import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RxViewComponentRegistryService } from '../registries/view-component-registry.service';
import * as i0 from "@angular/core";
export declare class RxViewComponentResolver implements Resolve<any> {
    private rxViewComponentRegistryService;
    constructor(rxViewComponentRegistryService: RxViewComponentRegistryService);
    resolve(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewComponentResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewComponentResolver>;
}
