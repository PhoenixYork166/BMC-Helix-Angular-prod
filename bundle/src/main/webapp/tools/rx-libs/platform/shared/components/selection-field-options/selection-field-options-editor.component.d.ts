import { Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActiveModalRef } from '@bmc-ux/adapt-angular';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxGuidService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { ISelectionOption } from './selection-field-options.interface';
import * as i0 from "@angular/core";
export declare class SelectionFieldOptionsEditorComponent extends RxModalClass {
    private activeModalRef;
    protected injector: Injector;
    private rxGuidService;
    private translateService;
    optionSelectionForm: NgForm;
    isReadOnly: any;
    selectionOptions: ISelectionOption[];
    private duplicateOptionNameMsg;
    private duplicateOptionIdMsg;
    constructor(activeModalRef: ActiveModalRef, injector: Injector, rxGuidService: RxGuidService, translateService: TranslateService);
    isDirty(): boolean;
    saveOptions(): void;
    addOption(): void;
    removeOption(index: number): void;
    expandAll(): void;
    collapseAll(): void;
    cancel(): void;
    private getDuplicateOptions;
    validateIdAndNames(type: 'name' | 'id'): void;
    isSaveButtonDisabled(): boolean;
    trackByIndex(index: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldOptionsEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionFieldOptionsEditorComponent, "rx-selection-field-options-editor", never, {}, {}, never, never>;
}
