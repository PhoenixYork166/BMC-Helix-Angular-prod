import { ICallActivityDescriptor } from './process-element.types';
import * as i0 from "@angular/core";
export declare class RxCallActivityRegistryService {
    private callActivityDescriptors;
    getRegisteredCallActivities(): IterableIterator<ICallActivityDescriptor>;
    register(...callActivityDescriptors: ICallActivityDescriptor[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxCallActivityRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxCallActivityRegistryService>;
}
