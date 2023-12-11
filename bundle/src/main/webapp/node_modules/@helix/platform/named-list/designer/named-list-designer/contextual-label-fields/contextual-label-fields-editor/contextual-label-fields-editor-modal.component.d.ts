import { AfterViewInit, Injector, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ISelectFormControlOptions } from '@helix/platform/shared/components';
import { RxGuidService } from '@helix/platform/utils';
import { IContextualLabelFieldsEditorConfig } from '../../../named-list-designer.types';
import * as i0 from "@angular/core";
interface IAccordionExpansionState {
    [guid: string]: boolean;
}
export declare class ContextualLabelFieldsEditorModalComponent extends RxModalClass implements OnInit, AfterViewInit {
    activeModalRef: ActiveModalRef;
    private formBuilder;
    private rxGuidService;
    private translateService;
    private accordionTabEls;
    config: IContextualLabelFieldsEditorConfig;
    fieldsFormArray: FormArray;
    accordionExpansionState: IAccordionExpansionState;
    fieldSelectionConfig: ISelectFormControlOptions;
    fieldNameById: any;
    isAddButtonDisabled$: import("rxjs").Observable<boolean>;
    constructor(activeModalRef: ActiveModalRef, formBuilder: FormBuilder, rxGuidService: RxGuidService, translateService: TranslateService, injector: Injector);
    ngOnInit(): void;
    isDirty(): boolean;
    ngAfterViewInit(): void;
    save(): void;
    cancel(): void;
    addField(): void;
    moveField(fromIndex: number, toIndex: number): void;
    onFieldDrop(event: CdkDragDrop<any[], any>): void;
    removeField(index: number): void;
    collapseAll(): void;
    expandAll(): void;
    onFieldSelect(formGroup: FormGroup, value: string): void;
    private getFormGroup;
    private isFieldIdUnknown;
    private isDoubleUsedField;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContextualLabelFieldsEditorModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContextualLabelFieldsEditorModalComponent, "rx-contextual-label-fields-editor-modal", never, {}, {}, never, never>;
}
export {};
