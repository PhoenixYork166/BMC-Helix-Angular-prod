import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { IExternalRecordWizardContext } from '../external-record-wizard.types';
import * as i0 from "@angular/core";
export declare class OperationSelectionStepComponent implements OnInit {
    private rxDefinitionNameService;
    private rxWizardModalComponent;
    private translateService;
    context: IExternalRecordWizardContext;
    availableOperationTypes: string[];
    availableRequests: RxSelectOption[];
    operationTypeFormControl: FormControl;
    operationTypeLabel: string;
    webApiRequestLabel: string;
    webApiRequestNameFormControl: FormControl;
    private destroyed$;
    optionFormatter: (option: RxSelectOption) => string;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OperationSelectionStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OperationSelectionStepComponent, "ax-operation-selection-step", never, { "context": "context"; }, {}, never, never>;
}
