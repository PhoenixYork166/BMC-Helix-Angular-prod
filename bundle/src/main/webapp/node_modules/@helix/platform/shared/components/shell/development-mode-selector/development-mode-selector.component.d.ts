import { FormControl } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import * as i0 from "@angular/core";
export declare class DevelopmentModeSelectorComponent {
    private activeModalRef;
    developmentModeFormControl: FormControl;
    isSaveButtonDisabled$: import("rxjs").Observable<boolean>;
    constructor(activeModalRef: ActiveModalRef);
    closeModal(): void;
    selectDevelopmentMode(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DevelopmentModeSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DevelopmentModeSelectorComponent, "rx-development-mode-selector", never, {}, {}, never, never>;
}
