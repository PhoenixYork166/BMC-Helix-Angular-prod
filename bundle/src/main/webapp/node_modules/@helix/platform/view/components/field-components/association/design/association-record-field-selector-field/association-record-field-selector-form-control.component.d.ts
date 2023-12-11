import { ElementRef, Renderer2 } from '@angular/core';
import { ValueAccessor } from '@helix/platform/shared/components';
import { IFormControlComponent, IFormFocusable } from '@helix/platform/shared/api';
import { IAssociatedRecordField, IAssociationRecordFieldSelectorFormControlOptions } from './association-record-field-selector-form-control.interface';
import { RxModalService } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class AssociationRecordFieldSelectorFormControlComponent extends ValueAccessor<IAssociatedRecordField[]> implements IFormControlComponent, IFormFocusable {
    private rxModalService;
    private renderer;
    options: IAssociationRecordFieldSelectorFormControlOptions;
    openModalButton: ElementRef;
    selectedFields: Array<IAssociatedRecordField & {
        label: string;
    }>;
    constructor(rxModalService: RxModalService, renderer: Renderer2);
    focus(): void;
    openFieldSelector(fieldToEdit?: IAssociatedRecordField): void;
    onSetValue(): void;
    onWriteValue(value: IAssociatedRecordField[]): void;
    removeField(guid: string): void;
    editField(field: IAssociatedRecordField): void;
    private updateSortedFieldList;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationRecordFieldSelectorFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AssociationRecordFieldSelectorFormControlComponent, "rx-association-record-field-selector-form-control", never, { "options": "options"; }, {}, never, never>;
}
