import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxDefinitionPickerScope, RxDefinitionPickerType, RxWizardModalComponent } from '@helix/platform/shared/components';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class RecordDefinitionsStepComponent implements OnInit, OnDestroy {
    private translateService;
    private rxWizardModalComponent;
    private destroyed$;
    private definitionPickerConfig;
    primaryDefinitionPickerConfig: {
        label: any;
        definitionType: RxDefinitionPickerType;
        availableDefinitionPickerStates?: {
            definitionButtonsGroups: RxDefinitionPickerScope[];
            search: RxDefinitionPickerScope;
        };
        tooltip?: import("@bmc-ux/adapt-angular").AdaptRxControlLabelTooltip;
        required?: boolean;
        bundleId?: string;
        beforeValueChange?: (oldValue: string, newValue: string) => Promise<boolean>;
        texts?: {
            placeholder?: string;
            noBundleDeployed?: string;
            noDefinitionsFound?: string;
        };
    };
    secondaryDefinitionPickerConfig: {
        label: any;
        definitionType: RxDefinitionPickerType;
        availableDefinitionPickerStates?: {
            definitionButtonsGroups: RxDefinitionPickerScope[];
            search: RxDefinitionPickerScope;
        };
        tooltip?: import("@bmc-ux/adapt-angular").AdaptRxControlLabelTooltip;
        required?: boolean;
        bundleId?: string;
        beforeValueChange?: (oldValue: string, newValue: string) => Promise<boolean>;
        texts?: {
            placeholder?: string;
            noBundleDeployed?: string;
            noDefinitionsFound?: string;
        };
    };
    joinTypes: RxSelectOption[];
    primaryRecordDefinitionNameFormControl: FormControl;
    secondaryRecordDefinitionNameFormControl: FormControl;
    joinTypeFormControl: FormControl;
    constructor(translateService: TranslateService, rxWizardModalComponent: RxWizardModalComponent);
    optionFormatter(selectOption: RxSelectOption): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordDefinitionsStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordDefinitionsStepComponent, "ax-record-definitions-step", never, {}, {}, never, never>;
}
