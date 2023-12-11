import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { IModalConfig } from './modal.config.interfaces';
import * as i0 from "@angular/core";
export declare class RxModalComponent {
    context: ActiveModalRef;
    config: {
        modalType: string;
        modalConfig: IModalConfig;
    };
    answer: string;
    constructor(context: ActiveModalRef);
    onConfirm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxModalComponent, "rx-modal", never, {}, {}, never, never>;
}
