import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectTexts } from '@bmc-ux/adapt-angular';
import { IFieldDefinition, RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FieldSelectionStepComponent implements OnInit, OnDestroy {
    private rxWizardModalComponent;
    private translateService;
    private rxDefinitionNameService;
    private rxFieldDefinitionService;
    private rxGuidService;
    private rxRecordDefinitionService;
    private notificationMessage;
    private destroyed$;
    primaryAvailableFields$: Observable<IFieldDefinition[]>;
    secondaryAvailableFields$: Observable<IFieldDefinition[]>;
    selectLabel: string;
    hasDuplicates$: Observable<boolean>;
    alertConfig: {
        content: any;
        variant: string;
        type: string;
        dismissible: boolean;
    };
    selectTexts: SelectTexts;
    primarySelectedFieldsFormControl: FormControl;
    secondarySelectedFieldsFormControl: FormControl;
    constructor(rxWizardModalComponent: RxWizardModalComponent, translateService: TranslateService, rxDefinitionNameService: RxDefinitionNameService, rxFieldDefinitionService: RxFieldDefinitionService, rxGuidService: RxGuidService, rxRecordDefinitionService: RxRecordDefinitionService);
    ngOnInit(): void;
    optionFormatter(field: IFieldDefinition): string;
    private getJoinFieldDefinitions;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldSelectionStepComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldSelectionStepComponent, "ax-field-selection-step", never, {}, {}, never, never>;
}