import { Component, ComponentFactoryResolver, HostBinding, Input, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { FormWidgetModel } from '../../models/form-widget.model';
import { FormBuilderEvent } from '@helix/platform/shared/api';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilderService } from '../form-builder/form-builder.service';
import { isEqual } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../form-builder/form-builder.service";
export class FormWidgetComponent {
    constructor(componentFactoryResolver, formBuilderService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.formBuilderService = formBuilderService;
        this.destroyed$ = new ReplaySubject(1);
        this.isHidden = false;
    }
    ngOnInit() {
        var _a;
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);
        this.componentRef = this.container.createComponent(factory);
        this.formWidgetComponent = this.componentRef.instance;
        this.formWidgetComponent.options = this.widget.options;
        this.formWidgetComponent.isDisabled = this.widget.isDisabled;
        (_a = this.formBuilderService.focusEditor$) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroyed$)).subscribe(({ editorName, data }) => {
            if (editorName === this.widget.widgetName && this.isFocusable(this.formWidgetComponent)) {
                this.formWidgetComponent.focus(data);
            }
        });
    }
    ngAfterViewInit() {
        var _a;
        (_a = this.formWidgetComponent.events) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            if (event.type === FormBuilderEvent.HideWidget) {
                this.isHidden = event.payload;
            }
            else {
                this.formBuilderService.dispatch(event);
            }
        });
    }
    ngOnChanges(changes) {
        if (changes.widget && this.formWidgetComponent) {
            if (!isEqual(changes.widget.currentValue.component, changes.widget.previousValue.component)) {
                this.componentRef.destroy();
                const factory = this.componentFactoryResolver.resolveComponentFactory(changes.widget.currentValue.component);
                this.componentRef = this.container.createComponent(factory);
                this.formWidgetComponent = this.componentRef.instance;
            }
            this.formWidgetComponent.options = changes.widget.currentValue.options;
            this.formWidgetComponent.isDisabled = changes.widget.currentValue.isDisabled;
            if (this.isSupportChanges(this.formWidgetComponent)) {
                const onChanges = {};
                if (!isEqual(changes.widget.previousValue.options, changes.widget.currentValue.options)) {
                    onChanges.options = new SimpleChange(changes.widget.previousValue.options, changes.widget.currentValue.options, false);
                }
                if (changes.widget.previousValue.isDisabled !== changes.widget.currentValue.isDisabled) {
                    onChanges.isDisabled = new SimpleChange(changes.widget.previousValue.isDisabled, changes.widget.currentValue.isDisabled, false);
                }
                if (Object.keys(onChanges).length) {
                    this.formWidgetComponent.ngOnChanges(onChanges);
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
    isSupportChanges(instance) {
        return Boolean(instance.ngOnChanges);
    }
    isFocusable(instance) {
        return Boolean(instance.focus);
    }
}
FormWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormWidgetComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i1.FormBuilderService }], target: i0.ɵɵFactoryTarget.Component });
FormWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormWidgetComponent, selector: "rx-form-widget", inputs: { widget: "widget" }, host: { properties: { "class.isHidden": "this.isHidden" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-container #container></ng-container>', isInline: true, styles: [":host{display:block}:host:not(.isHidden){margin-bottom:1rem}:host:last-child{margin-bottom:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-widget',
                    template: '<ng-container #container></ng-container>',
                    styleUrls: ['./form-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.FormBuilderService }]; }, propDecorators: { widget: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], isHidden: [{
                type: HostBinding,
                args: ['class.isHidden']
            }] } });
//# sourceMappingURL=form-widget.component.js.map