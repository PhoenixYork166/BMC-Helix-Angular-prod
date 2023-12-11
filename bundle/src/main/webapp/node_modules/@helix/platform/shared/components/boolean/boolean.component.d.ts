import { ElementRef, EventEmitter, Injector, OnInit, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValueAccessor } from '../form-builder/value-accessor';
import * as i0 from "@angular/core";
export declare class RxBooleanComponent extends ValueAccessor<boolean> implements OnInit {
    private injector;
    shouldDisplayAsCheckbox: boolean;
    required: boolean;
    isDisabled: boolean;
    label: string;
    tooltip: string;
    rxBlur: EventEmitter<FocusEvent>;
    buttons: QueryList<ElementRef>;
    control: FormControl;
    constructor(injector: Injector);
    ngOnInit(): void;
    getButtonType(value: boolean): string;
    onButtonBlur(event: FocusEvent): void;
    setValue(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxBooleanComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RxBooleanComponent, "rx-boolean", never, { "shouldDisplayAsCheckbox": "shouldDisplayAsCheckbox"; "required": "required"; "isDisabled": "isDisabled"; "label": "label"; "tooltip": "tooltip"; }, { "rxBlur": "rxBlur"; }, never, never>;
}
