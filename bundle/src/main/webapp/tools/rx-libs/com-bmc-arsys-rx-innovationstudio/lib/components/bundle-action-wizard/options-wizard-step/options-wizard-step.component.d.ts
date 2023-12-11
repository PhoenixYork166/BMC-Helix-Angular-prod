import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { IBundleDescriptor, IPlainObject } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class OptionsWizardStepComponent implements OnInit, OnDestroy {
    private rxWizardModalComponent;
    private translateService;
    options: IPlainObject;
    optionsForm: FormGroup;
    versionRegexp: RegExp;
    isApplication$: Observable<any>;
    bundlesList$: Observable<IBundleDescriptor[]>;
    private destroyed$;
    versionIncrementValidator: (fromVersionControl: any) => (control: AbstractControl) => ValidationErrors | null;
    constructor(rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    optionFormatter(field: IBundleDescriptor): string;
    private isValidateIncrementation;
    private getBaseVersion;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionsWizardStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionsWizardStepComponent, "ax-options-wizard-step", never, { "options": "options"; }, {}, never, never>;
}
