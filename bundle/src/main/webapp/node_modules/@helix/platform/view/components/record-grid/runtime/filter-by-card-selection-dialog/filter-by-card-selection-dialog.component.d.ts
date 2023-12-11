import { ActiveModalRef, RxSelectOption } from '@bmc-ux/adapt-angular';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RxFilterByCardSelectionDialogComponent {
    context: ActiveModalRef;
    private translateService;
    options: RxSelectOption[];
    field: RxSelectOption;
    alertConfig: {
        content: any;
        type: string;
        dismissible: boolean;
        variant: string;
        icon: boolean;
    };
    constructor(context: ActiveModalRef, translateService: TranslateService);
    optionFormatter(option: RxSelectOption): string;
    apply(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxFilterByCardSelectionDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxFilterByCardSelectionDialogComponent, "rx-filter-by-card-selection", never, {}, {}, never, never>;
}
