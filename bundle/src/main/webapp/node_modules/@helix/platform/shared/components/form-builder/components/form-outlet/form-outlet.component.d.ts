import { ComponentFactoryResolver, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormControlModel } from '../../models/form-control.model';
import { FormWidgetModel } from '../../models/form-widget.model';
import { FormBuilderService } from '../form-builder/form-builder.service';
import * as i0 from "@angular/core";
export declare class FormOutletComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    private cr;
    private formBuilderService;
    private renderer;
    control: FormControlModel | FormWidgetModel;
    container: ViewContainerRef;
    private instance;
    private componentRef;
    private destroyed$;
    constructor(cr: ComponentFactoryResolver, formBuilderService: FormBuilderService, renderer: Renderer2);
    ngOnInit(): void;
    private getControlName;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private isFocusable;
    private isSupportChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormOutletComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormOutletComponent, "rx-form-outlet", never, { "control": "control"; }, {}, never, never>;
}
