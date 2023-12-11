import { IValueWithLabel } from '@helix/platform/utils';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class ReadOnlyFieldsModalComponent {
    private activeModalRef;
    fields: IValueWithLabel[];
    constructor(activeModalRef: ActiveModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadOnlyFieldsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadOnlyFieldsModalComponent, "rx-read-only-fields-modal", never, {}, {}, never, never>;
}
