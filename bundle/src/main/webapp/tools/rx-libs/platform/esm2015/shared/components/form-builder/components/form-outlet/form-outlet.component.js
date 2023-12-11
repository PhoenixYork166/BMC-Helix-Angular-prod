import { Component, ComponentFactoryResolver, Input, Renderer2, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEqual, kebabCase } from 'lodash';
import { ReplaySubject } from 'rxjs';
import { FormControlModel } from '../../models/form-control.model';
import { takeUntil } from 'rxjs/operators';
import { FormWidgetModel } from '../../models/form-widget.model';
import { FormBuilderService } from '../form-builder/form-builder.service';
import * as i0 from "@angular/core";
import * as i1 from "../form-builder/form-builder.service";
export class FormOutletComponent {
    constructor(cr, formBuilderService, renderer) {
        this.cr = cr;
        this.formBuilderService = formBuilderService;
        this.renderer = renderer;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const factory = this.cr.resolveComponentFactory(this.control.component);
        const controlName = this.getControlName(this.control);
        this.componentRef = this.container.createComponent(factory);
        this.renderer.setAttribute(this.componentRef.location.nativeElement, 'rx-id', kebabCase(controlName));
        this.instance = this.componentRef.instance;
        this.instance.options = this.control.options;
        this.instance.propertyPath = controlName;
        if (this.instance.events) {
            this.instance.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
                this.formBuilderService.dispatch(event);
            });
        }
        this.formBuilderService.focusEditor$.pipe(takeUntil(this.destroyed$)).subscribe(({ editorName, data }) => {
            if (controlName === editorName && this.isFocusable(this.instance)) {
                this.instance.focus(data);
            }
        });
    }
    getControlName(control) {
        if (control instanceof FormWidgetModel) {
            return control.component.name;
        }
        else if (control instanceof FormControlModel) {
            return control.name;
        }
        else {
            return '';
        }
    }
    ngOnChanges(changes) {
        if (changes.control && this.instance) {
            this.instance.options = changes.control.currentValue.options;
            if (this.isSupportChanges(this.instance)) {
                const onChanges = {};
                if (!isEqual(changes.control.previousValue.options, changes.control.currentValue.options)) {
                    onChanges.options = new SimpleChange(changes.control.previousValue.options, changes.control.currentValue.options, false);
                }
                if (changes.control.previousValue.isDisabled !== changes.control.currentValue.isDisabled) {
                    onChanges.disabled = new SimpleChange(changes.control.previousValue.isDisabled, changes.control.currentValue.isDisabled, false);
                }
                if (Object.keys(onChanges).length) {
                    this.instance.ngOnChanges(onChanges);
                }
            }
        }
    }
    ngOnDestroy() {
        this.componentRef.destroy();
        this.componentRef = null;
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    // proxy calls from ControlValueAccessor interface to control component
    writeValue(value) {
        this.instance.writeValue(value);
    }
    registerOnChange(fn) {
        this.instance.registerOnChange(fn);
    }
    registerOnTouched(fn) {
        this.instance.registerOnTouched(fn);
    }
    setDisabledState(isDisabled) {
        this.instance.setDisabledState(isDisabled);
    }
    isFocusable(instance) {
        return Boolean(instance.focus);
    }
    isSupportChanges(instance) {
        return Boolean(instance.ngOnChanges);
    }
}
FormOutletComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormOutletComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.FormBuilderService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
FormOutletComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormOutletComponent, selector: "rx-form-outlet", inputs: { control: "control" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FormOutletComponent,
            multi: true
        }
    ], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block;margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-outlet',
                    template: '<ng-container #container></ng-container>',
                    styleUrls: ['./form-outlet.component.scss'],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FormOutletComponent,
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.FormBuilderService }, { type: i0.Renderer2 }]; }, propDecorators: { control: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=form-outlet.component.js.map