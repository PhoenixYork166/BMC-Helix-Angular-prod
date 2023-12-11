import { IDesignerElementRegistry, RxLogService } from '@helix/platform/shared/api';
import { IProcessElementDescriptor } from './process-element-descriptor.interface';
import * as i0 from "@angular/core";
export declare class RxProcessElementRegistryService implements IDesignerElementRegistry {
    private rxLogService;
    private elementDescriptors;
    constructor(rxLogService: RxLogService);
    get(type: string): IProcessElementDescriptor;
    getAll(): IProcessElementDescriptor[];
    register(descriptor: IProcessElementDescriptor): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxProcessElementRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxProcessElementRegistryService>;
}
