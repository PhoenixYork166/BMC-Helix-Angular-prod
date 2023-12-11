import { FormControl } from '@angular/forms';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { ISelectionFieldDefinition } from '@helix/platform/record/api';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { ISelectionFieldConfig } from './selection-field.types';
import * as i0 from "@angular/core";
export declare class SelectionFieldComponent extends BaseRecordEditorFieldComponent {
    fieldDefinition: ISelectionFieldDefinition;
    selectOptions: RxSelectOption[];
    isRadioButtonMode: boolean;
    selectFormControl: FormControl;
    getSelectValue(): RxSelectOption[];
    onConfigInitialized(config: ISelectionFieldConfig): void;
    generateControlOptions(fieldDefinition: ISelectionFieldDefinition): void;
    getDisplayValue(): string;
    optionFormatter(option: RxSelectOption): string;
    onPopupStatusChange(isOpen: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionFieldComponent, "rx-selection-field", never, {}, {}, never, never>;
}
