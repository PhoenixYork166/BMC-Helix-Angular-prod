import { IDefinitionAdapter } from './definition-adapter.interface';
import * as i0 from "@angular/core";
export declare class RxDefinitionAdapterRegistryService {
    private runtimeAdapters;
    private designAdapters;
    registerRuntimeAdapter(type: string, adapter: IDefinitionAdapter): void;
    registerDesignAdapter(type: string, adapter: IDefinitionAdapter): void;
    getRuntimeAdapter(type: string): IDefinitionAdapter;
    getDesignAdapter(type: string): IDefinitionAdapter;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDefinitionAdapterRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDefinitionAdapterRegistryService>;
}
