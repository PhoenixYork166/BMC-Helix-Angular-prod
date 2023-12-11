import { Injector } from '@angular/core';
import { ActiveModalRef, RxSelectionChangeEvent, RxSelectOption } from '@bmc-ux/adapt-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxModalClass, RxModalService } from '@helix/platform/ui-kit';
import { ICustomizationOptionsEditorData, IScopeSelectionOption } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class CoarseGrainedCustomizationOptionsEditorComponent extends RxModalClass {
    private formBuilder;
    private rxModalService;
    activeModalRef: ActiveModalRef;
    protected injector: Injector;
    data: ICustomizationOptionsEditorData;
    scopeSelectionOptions: IScopeSelectionOption[];
    customizationOptionsForm: FormGroup;
    isDisabled: boolean;
    constructor(formBuilder: FormBuilder, rxModalService: RxModalService, activeModalRef: ActiveModalRef, injector: Injector);
    isDirty(): boolean;
    isPublic(): boolean;
    optionFormatter(option: RxSelectOption): string;
    submit(): void;
    onScopeChange(rxSelectionChangeEvent: RxSelectionChangeEvent): void;
    closeModal(): void;
    private initForm;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoarseGrainedCustomizationOptionsEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CoarseGrainedCustomizationOptionsEditorComponent, "rx-scope-customization-modal", never, {}, {}, never, never>;
}
