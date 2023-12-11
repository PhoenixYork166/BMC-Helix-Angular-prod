import { RuntimeViewModel } from './runtime-view.model';
import * as i0 from "@angular/core";
export declare class RxRuntimeViewRegistryService {
    private activeRuntimeViews;
    register(runtimeViewModel: RuntimeViewModel): void;
    getAll(): RuntimeViewModel[];
    unregister(runtimeViewModel: RuntimeViewModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRuntimeViewRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRuntimeViewRegistryService>;
}
