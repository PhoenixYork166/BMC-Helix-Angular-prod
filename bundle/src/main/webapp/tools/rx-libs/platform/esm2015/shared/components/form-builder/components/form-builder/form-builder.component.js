import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxGuidService } from '@helix/platform/utils';
import { find, forEach, has, isEmpty, isEqual } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilderFactory } from '../../form-builder.factory';
import { FormBuilderService } from './form-builder.service';
import * as i0 from "@angular/core";
import * as i1 from "../../form-builder.factory";
import * as i2 from "@angular/forms";
import * as i3 from "@helix/platform/utils";
import * as i4 from "./form-builder.service";
import * as i5 from "../form-section/form-section.component";
import * as i6 from "@angular/common";
export class FormBuilderComponent {
    constructor(formBuilderFactory, formBuilder, rxGuidService, formBuilderService) {
        this.formBuilderFactory = formBuilderFactory;
        this.formBuilder = formBuilder;
        this.rxGuidService = rxGuidService;
        this.formBuilderService = formBuilderService;
        this.guid = this.rxGuidService.generate();
        this.modelChange = new EventEmitter();
        this.editorEvent = new EventEmitter();
        this.formInitialized = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
        this.formGroup = this.formBuilder.group({});
        this.subscribeOnFormDataChange();
    }
    ngOnInit() {
        if (this.focusEditor$) {
            this.focusEditor$.pipe(takeUntil(this.destroyed$)).subscribe((focusEditorEvent) => {
                this.formBuilderService.setFocusEditor(focusEditorEvent);
            });
        }
        this.formBuilderService.editorEvent$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            this.editorEvent.emit(event);
        });
    }
    ngOnChanges(changes) {
        if (changes.model &&
            changes.model.currentValue &&
            !isEqual(changes.model.currentValue, changes.model.previousValue)) {
            this.updateFormData(changes.model.currentValue);
        }
        if (changes.config) {
            this.prepareLayout(changes.config.currentValue || []);
        }
        if (changes.isReadOnly && changes.isReadOnly.isFirstChange() && changes.isReadOnly.currentValue) {
            this.formGroup.disable();
        }
    }
    ngAfterViewInit() {
        this.formInitialized.next();
    }
    trackByControl(index, item) {
        return `${this.guid}${item.label}`;
    }
    ngOnDestroy() {
        this.formSubscription.unsubscribe();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    dispatch(event) {
        this.formBuilderService.dispatch(event);
    }
    updateFormData(model) {
        this.formSubscription.unsubscribe();
        Object.keys(model).forEach((propertyName) => this.getFormControlByName(propertyName).setValue(model[propertyName]));
        Object.keys(this.formGroup.getRawValue())
            .filter((propertyName) => !has(model, propertyName))
            .forEach((propertyName) => this.formGroup.removeControl(propertyName));
        this.subscribeOnFormDataChange();
    }
    prepareLayout(config) {
        this.layout = {
            controls: config.map((section) => this.formBuilderFactory.section(Object.assign(Object.assign({}, section), { controls: section.controls.map((propertyControlConfig) => {
                    let model;
                    if (this.isFormControl(propertyControlConfig)) {
                        const control = this.getFormControlByName(propertyControlConfig.name);
                        this.isReadOnly || propertyControlConfig.isDisabled
                            ? control.disable({ emitEvent: false })
                            : control.enable({ emitEvent: false });
                        model = this.formBuilderFactory.control(propertyControlConfig, control);
                    }
                    else {
                        model = this.formBuilderFactory.widget(Object.assign(Object.assign({}, propertyControlConfig), { isDisabled: propertyControlConfig.isDisabled || this.isReadOnly }));
                    }
                    return model;
                }) })))
        };
    }
    getFormControlByName(name) {
        let control = this.formGroup.controls[name];
        if (!control) {
            let validators;
            forEach(this.config, (section) => {
                const formControlConfig = find(section.controls, { name });
                if (formControlConfig) {
                    validators = formControlConfig.validators;
                }
                return !formControlConfig;
            });
            control = this.formBuilder.control(null, validators || []);
            this.formGroup.addControl(name, control);
        }
        return control;
    }
    subscribeOnFormDataChange() {
        this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
            // Get a raw value for all form controls including disabled.
            const rawValue = this.formGroup.getRawValue();
            // Check if rawValue is not an empty object, in this case we don't
            // want to emit model change when current model value is null.
            const formData = isEmpty(rawValue) ? null : rawValue;
            if (!isEqual(formData, this.model)) {
                this.modelChange.emit(formData);
            }
        });
    }
    isFormControl(config) {
        return !!config.name;
    }
}
FormBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderComponent, deps: [{ token: i1.FormBuilderFactory }, { token: i2.FormBuilder }, { token: i3.RxGuidService }, { token: i4.FormBuilderService }], target: i0.ɵɵFactoryTarget.Component });
FormBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: FormBuilderComponent, selector: "rx-form-builder", inputs: { config: "config", model: "model", guid: "guid", isReadOnly: "isReadOnly", focusEditor$: "focusEditor$" }, outputs: { modelChange: "modelChange", editorEvent: "editorEvent", formInitialized: "formInitialized" }, providers: [FormBuilderService], usesOnChanges: true, ngImport: i0, template: "<form *ngIf=\"layout\">\n  <rx-form-section\n    *ngFor=\"let control of layout.controls; trackBy: trackByControl\"\n    [section]=\"control\"\n    [guid]=\"guid\"\n  ></rx-form-section>\n</form>\n", components: [{ type: i5.FormSectionComponent, selector: "rx-form-section", inputs: ["guid", "section"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FormBuilderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-form-builder',
                    templateUrl: './form-builder.component.html',
                    providers: [FormBuilderService]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilderFactory }, { type: i2.FormBuilder }, { type: i3.RxGuidService }, { type: i4.FormBuilderService }]; }, propDecorators: { config: [{
                type: Input
            }], model: [{
                type: Input
            }], guid: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }], focusEditor$: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], editorEvent: [{
                type: Output
            }], formInitialized: [{
                type: Output
            }] } });
//# sourceMappingURL=form-builder.component.js.map