import { AfterViewInit, ComponentFactoryResolver, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { FormWidgetModel } from '../../models/form-widget.model';
import { FormBuilderService } from '../form-builder/form-builder.service';
import * as i0 from "@angular/core";
export declare class FormWidgetComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private componentFactoryResolver;
    private formBuilderService;
    widget: FormWidgetModel;
    container: ViewContainerRef;
    private componentRef;
    private formWidgetComponent;
    private destroyed$;
    isHidden: boolean;
    constructor(componentFactoryResolver: ComponentFactoryResolver, formBuilderService: FormBuilderService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private isSupportChanges;
    private isFocusable;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormWidgetComponent, "rx-form-widget", never, { "widget": "widget"; }, {}, never, never>;
}
