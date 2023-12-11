import { RxStringService } from '@helix/platform/utils';
import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IFormControlComponent } from '@helix/platform/shared/api';
import { ValueAccessor } from '../../form-builder/value-accessor';
import { IListFormControlOptions } from './list-form-control-options.interface';
import { IPlainObject } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class ListFormControlComponent extends ValueAccessor<any[]> implements IFormControlComponent, OnInit, OnDestroy {
    private formBuilder;
    stringService: RxStringService;
    options: IListFormControlOptions;
    propertyPath: string;
    events: EventEmitter<any>;
    itemList: FormArray;
    private destroyed$;
    constructor(formBuilder: FormBuilder, stringService: RxStringService);
    ngOnInit(): void;
    setDisabledState(isDisabled: boolean): void;
    ngOnDestroy(): void;
    onWriteValue(modelValue: any): void;
    clearItems(): void;
    addItem(item: IPlainObject): void;
    createItemFormGroup(item: IPlainObject): FormGroup;
    onItemRemove(index: number): void;
    onAddItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListFormControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListFormControlComponent, "rx-list-form-control", never, { "options": "options"; "propertyPath": "propertyPath"; }, { "events": "events"; }, never, never>;
}
