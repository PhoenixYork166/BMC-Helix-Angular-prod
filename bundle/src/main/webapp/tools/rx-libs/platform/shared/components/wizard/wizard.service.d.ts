import { IWizardConfig } from './wizard.types';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxWizardService {
    private rxModalService;
    constructor(rxModalService: RxModalService);
    open<TContext>(config: IWizardConfig<TContext>): Promise<TContext>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxWizardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxWizardService>;
}
