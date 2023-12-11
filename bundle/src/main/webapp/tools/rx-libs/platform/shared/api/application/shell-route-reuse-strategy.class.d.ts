import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
export declare class ShellRouteReuseStrategy implements RouteReuseStrategy {
    shouldReuseRoute(current: ActivatedRouteSnapshot, next: ActivatedRouteSnapshot): boolean;
    shouldAttach(route: ActivatedRouteSnapshot): boolean;
    shouldDetach(route: ActivatedRouteSnapshot): boolean;
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void;
}
