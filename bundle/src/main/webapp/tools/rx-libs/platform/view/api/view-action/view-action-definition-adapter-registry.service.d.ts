import { IDefinitionAdapter } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxViewActionDefinitionAdapterRegistryService {
    private runtimeAdapters;
    private designAdapters;
    registerRuntimeAdapter(actionName: string, adapter: IDefinitionAdapter): void;
    registerDesignAdapter(actionName: string, adapter: IDefinitionAdapter): void;
    getRuntimeAdapter(actionName: string): IDefinitionAdapter;
    getDesignAdapter(actionName: string): IDefinitionAdapter;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionDefinitionAdapterRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionDefinitionAdapterRegistryService>;
}
