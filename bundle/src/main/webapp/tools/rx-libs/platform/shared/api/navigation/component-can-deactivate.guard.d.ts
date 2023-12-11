import { IComponentCanDeactivate } from './component-can-deactivate.interface';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RxModalService, RxUtilityModalsService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxComponentCanDeactivateGuard implements CanDeactivate<IComponentCanDeactivate> {
    private router;
    private rxModalService;
    private rxUtilityModalsService;
    pageComponent: IComponentCanDeactivate | undefined;
    private isEnabled;
    constructor(router: Router, rxModalService: RxModalService, rxUtilityModalsService: RxUtilityModalsService);
    canDeactivate(component?: IComponentCanDeactivate): Observable<boolean> | Promise<boolean> | boolean;
    setPageComponent(component: IComponentCanDeactivate): void;
    enable(): void;
    disable(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxComponentCanDeactivateGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxComponentCanDeactivateGuard>;
}
