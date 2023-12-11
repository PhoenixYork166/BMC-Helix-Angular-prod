import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RxSelectOption } from '@bmc-ux/adapt-angular';
import { IFormFocusable } from '@helix/platform/shared/api';
import { RxModalService } from '@helix/platform/ui-kit';
import { ValueAccessor } from '@helix/platform/shared/components';
import { INamedListField } from '@helix/platform/named-list/api';
import * as i0 from "@angular/core";
interface IViewModel {
    fieldNames: string[];
    isEditorDisabled: boolean;
    isFieldRemovable: boolean;
}
export declare class ContextualLabelFieldsComponent extends ValueAccessor<INamedListField[]> implements IFormFocusable, OnChanges, OnInit {
    private rxModalService;
    private translateService;
    options: {
        options: RxSelectOption[];
    };
    private vmSubject;
    vm$: import("rxjs").Observable<IViewModel>;
    constructor(rxModalService: RxModalService, translateService: TranslateService);
    ngOnInit(): void;
    focus(data: {
        fieldIndex: number;
    }): void;
    onWriteValue(value: INamedListField[]): void;
    ngOnChanges(changes: SimpleChanges): void;
    private updateViewValues;
    openContextualLabelFieldsEditor(activeFieldIndex?: number): void;
    editContextualLabelField(activeFieldIndex: number): void;
    removeContextualLabelField(activeFieldIndex: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContextualLabelFieldsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContextualLabelFieldsComponent, "rx-contextual-label-fields", never, { "options": "options"; }, {}, never, never>;
}
export {};
