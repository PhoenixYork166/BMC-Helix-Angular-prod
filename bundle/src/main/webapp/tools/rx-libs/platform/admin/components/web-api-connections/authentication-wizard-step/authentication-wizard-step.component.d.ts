import { RxWizardModalComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
export declare class AuthenticationWizardStepComponent {
    private rxWizardModalComponent;
    context$: import("rxjs").Observable<import("@helix/platform/shared/api").IPlainObject>;
    isSaveButtonDisabled$: import("rxjs").Observable<boolean>;
    constructor(rxWizardModalComponent: RxWizardModalComponent);
    onFormStatusChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthenticationWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AuthenticationWizardStepComponent, "rx-authentication-wizard-step", never, {}, {}, never, never>;
}
