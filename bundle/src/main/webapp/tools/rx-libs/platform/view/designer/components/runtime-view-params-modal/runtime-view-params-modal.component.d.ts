import { Injector } from '@angular/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RuntimeViewParamsModalComponent extends RxModalClass {
    activeModalRef: ActiveModalRef;
    protected injector: Injector;
    inputParamNames: string[];
    inputParams: {
        [inputName: string]: string;
    };
    constructor(activeModalRef: ActiveModalRef, injector: Injector);
    isDirty(): boolean;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RuntimeViewParamsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RuntimeViewParamsModalComponent, "rx-runtime-view-params-modal", never, {}, {}, never, never>;
}
