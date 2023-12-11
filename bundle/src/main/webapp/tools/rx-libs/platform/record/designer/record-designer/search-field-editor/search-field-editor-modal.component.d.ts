import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxModalClass } from '@helix/platform/ui-kit';
import { ActiveModalRef, RxSelectOption } from '@bmc-ux/adapt-angular';
import { SearchFieldEditorModalStore } from './search-field-editor-modal.store';
import { RxFieldDefinitionService } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
export declare class SearchFieldEditorModalComponent extends RxModalClass implements OnInit, OnDestroy {
    private readonly searchFieldsEditorModalStore;
    private activeModalRef;
    private formBuilder;
    protected injector: Injector;
    private rxFieldDefinitionService;
    readonly vm$: import("rxjs").Observable<{
        availableFields: import("@helix/platform/record/api").IFieldDefinition[];
        searchFields: import("@angular/forms").AbstractControl[];
        isDirty: boolean;
        isValid: boolean;
    }>;
    private destroyed$;
    private recordDefinition;
    isReadOnly: any;
    constructor(searchFieldsEditorModalStore: SearchFieldEditorModalStore, activeModalRef: ActiveModalRef, formBuilder: FormBuilder, injector: Injector, rxFieldDefinitionService: RxFieldDefinitionService);
    cancel(): void;
    ngOnInit(): void;
    optionFormatter(selectOption: RxSelectOption): string;
    toggleOpen(toggleValue: boolean): void;
    addNewSearchField(): void;
    onSelectedFieldChange(field: RxSelectOption): void;
    onSearchCategoryChange(): void;
    onRemoveSearchField(fieldIndex: number): void;
    saveSearchFields(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFieldEditorModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFieldEditorModalComponent, "rx-search-field-editor-modal", never, {}, {}, never, never>;
}
