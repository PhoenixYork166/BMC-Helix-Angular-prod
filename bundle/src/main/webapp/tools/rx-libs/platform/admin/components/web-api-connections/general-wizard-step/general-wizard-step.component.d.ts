import { OnInit } from '@angular/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IAuthTypeDetails } from '../web-api-connections.interfaces';
import * as i0 from "@angular/core";
export declare class GeneralWizardStepComponent implements OnInit {
    private rxWizardModalComponent;
    context$: import("rxjs").Observable<import("@helix/platform/shared/api").IPlainObject>;
    savedAuthTypeCode: RxSelectOption;
    savedAuthTypeDetails: IAuthTypeDetails;
    constructor(rxWizardModalComponent: RxWizardModalComponent);
    ngOnInit(): void;
    onSelectionChange(selection: RxSelectOption): void;
    onFormStatusChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeneralWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GeneralWizardStepComponent, "rx-general-wizard-step", never, {}, {}, never, never>;
}
