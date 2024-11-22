import { Injector } from '@angular/core';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import { IViewComponent } from '@helix/platform/view/runtime';
import { BaseRecordEditorFieldComponent } from '../../base-record-editor-field/runtime/base-record-editor-field-component.class';
import { RxNamedListDefinitionService, RxNamedListService } from '@helix/platform/named-list/api';
import { Observable } from 'rxjs';
import { IRxSelectWithPaginationOption, IRxSelectWithPaginationOptionsPage, RxSelectWithPaginationComponent } from '@helix/platform/shared/components';
import { IRxTextFieldConfig } from './text-field-config.interface';
import * as i0 from "@angular/core";
export declare class TextFieldComponent extends BaseRecordEditorFieldComponent implements IViewComponent {
    private fieldDefinitionService;
    private rxNamedListDefinitionService;
    private rxNamedListService;
    isPasswordField: boolean;
    isNamedListAttached: boolean;
    isMultipleSelectionEnabled: boolean;
    maxLength: number;
    showDefaultTitle: boolean;
    selectWithPaginationComponent: RxSelectWithPaginationComponent;
    optionLoaderFunc: any;
    viewToModelValueAdapterFunc: any;
    modelToViewValueAdapterFunc: any;
    private displayValue;
    private selectedOptions;
    private namedListDefinition;
    private namedListDefinitionName;
    private namedListFormattedValue;
    private multiSelectDelimiter;
    private isDropdownOpen;
    private additionalQueryCriteria;
    constructor(injector: Injector, fieldDefinitionService: RxFieldDefinitionService, rxNamedListDefinitionService: RxNamedListDefinitionService, rxNamedListService: RxNamedListService);
    onConfigInitialized(config: IRxTextFieldConfig): void;
    getDisplayValue(): string;
    getNamedListOptionPage(startIndex: number, pageSize: number, searchQuery?: string): Observable<IRxSelectWithPaginationOptionsPage>;
    viewToModelValueAdapter(selectedOptions: IRxSelectWithPaginationOption[]): string;
    modelToViewValueAdapter(modelValue: string): IRxSelectWithPaginationOption[];
    onToggleDropdown(isOpen: boolean): void;
    private getOptionValues;
    private updateSelection;
    private updateNamedListFormattedValue;
    private triggerModelToViewValueUpdate;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextFieldComponent, "rx-text-field", never, {}, {}, never, never>;
}
