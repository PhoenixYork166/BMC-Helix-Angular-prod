import { Injector } from '@angular/core';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class InheritanceIssueInfoComponent extends RxModalClass {
    protected injector: Injector;
    private activeModalRef;
    overriddenRecordProperties: any;
    constructor(injector: Injector, activeModalRef: ActiveModalRef);
    close(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InheritanceIssueInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InheritanceIssueInfoComponent, "rx-localized-character-default-value-selector", never, {}, {}, never, never>;
}
