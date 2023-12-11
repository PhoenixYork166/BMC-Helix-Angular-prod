import { Component, Injector, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { RxExpressionParserService } from '@helix/platform/shared/api';
import { RxModalClass } from '@helix/platform/ui-kit';
import { RxError } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { findIndex, sortBy } from 'lodash';
import { concat, EMPTY, of, throwError } from 'rxjs';
import { concatMap, finalize, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { RichExpressionEditorComponent } from './rich-expression-editor/rich-expression-editor.component';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "./rich-expression-editor/rich-expression-editor.component";
import * as i5 from "./data-dictionary/data-dictionary.component";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class ExpressionEditorComponent extends RxModalClass {
    constructor(activeModalRef, translateService, rxExpressionParserService, injector) {
        super(activeModalRef, injector);
        this.activeModalRef = activeModalRef;
        this.translateService = translateService;
        this.rxExpressionParserService = rxExpressionParserService;
        this.injector = injector;
        this.isPropertyContextReady = false;
        this.config = this.activeModalRef.getData();
        this.expressionConfigurator = this.config.expressionConfigurator;
        this.availableExpressionProperties = [];
        this.invalidExpressionMessage = this.translateService.instant('com.bmc.arsys.rx.client.expression-editor.invalid-expression.message');
    }
    get expression() {
        return this.currentProperty && this.currentProperty.value;
    }
    set expression(value) {
        if (this.currentProperty) {
            this.currentProperty.value = value;
        }
    }
    get isReadOnly() {
        return this.config.isReadOnly;
    }
    get isNavigationEnabled() {
        return this.isPropertyContextReady && (this.hasPreviousProperty() || this.hasNextProperty());
    }
    get isPreviousButtonDisabled() {
        return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasPreviousProperty();
    }
    get isNextButtonDisabled() {
        return !this.isPropertyContextReady || this.richExpressionEditorControl.invalid || !this.hasNextProperty();
    }
    ngOnInit() {
        super.ngOnInit();
        this.initialize(this.config.property).subscribe();
    }
    onSave() {
        this.writeValue().subscribe({
            complete: () => {
                this.activeModalRef.close();
            }
        });
    }
    onNodeSelected(node) {
        this.richExpressionEditor.insertHtml(node.data.expression);
    }
    navigateToNextProperty() {
        this.navigateToProperty(this.getCurrentPropertyIndex() + 1);
    }
    navigateToPreviousProperty() {
        this.navigateToProperty(this.getCurrentPropertyIndex() - 1);
    }
    cancelModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    isDirty() {
        return this.richExpressionEditorControl.dirty;
    }
    navigateToProperty(index) {
        this.isPropertyContextReady = false;
        concat(this.writeValue(), 
        // getPropertyByIndex must be called when writeValue observable will be
        // completed to make sure availableExpressionProperties are up to date.
        of(index).pipe(concatMap((i) => this.initialize(this.getPropertyByIndex(i)))))
            .pipe(finalize(() => {
            this.isPropertyContextReady = true;
            this.richExpressionEditorControl.control.markAsPristine();
        }))
            .subscribe();
    }
    initialize(property) {
        return concat(this.updateAvailableExpressionProperties(), this.expressionConfigurator.getDataDictionary(property.path).pipe(tap((dataDictionary) => {
            this.currentProperty = property;
            this.operatorRows = this.expressionConfigurator.getOperatorRows(property.path);
            this.dataDictionary = dataDictionary;
            this.legend = sortBy(this.config.legend, 'label');
            this.isPropertyContextReady = true;
        }), take(1), switchMapTo(EMPTY)));
    }
    writeValue() {
        return this.expressionConfigurator.validateProperty(this.currentProperty.path, this.currentProperty.value).pipe(tap((isValid) => {
            if (isValid) {
                this.config.api.writeValue(this.currentProperty.path, this.rxExpressionParserService.stripSpaces(this.currentProperty.value));
            }
            else {
                this.richExpressionEditorControl.control.setErrors({
                    invalidExpression: {
                        message: this.invalidExpressionMessage
                    }
                });
            }
        }), switchMap((isValid) => (isValid ? EMPTY : throwError(new RxError()))));
    }
    updateAvailableExpressionProperties() {
        return this.config.expressionPropertyNavigator
            ? this.config.expressionPropertyNavigator.getProperties().pipe(take(1), tap((properties) => {
                this.availableExpressionProperties = properties;
            }), switchMapTo(EMPTY))
            : EMPTY;
    }
    hasPreviousProperty() {
        const currentIndex = this.getCurrentPropertyIndex();
        return currentIndex > 0;
    }
    hasNextProperty() {
        const currentIndex = this.getCurrentPropertyIndex();
        return currentIndex !== this.availableExpressionProperties.length - 1 && currentIndex !== -1;
    }
    getCurrentPropertyIndex() {
        return findIndex(this.availableExpressionProperties, { path: this.currentProperty.path });
    }
    getPropertyByIndex(propertyIndex) {
        return this.availableExpressionProperties[propertyIndex];
    }
}
ExpressionEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorComponent, deps: [{ token: i1.ActiveModalRef }, { token: i2.TranslateService }, { token: i3.RxExpressionParserService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ExpressionEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ExpressionEditorComponent, selector: "rx-expression-editor", viewQueries: [{ propertyName: "richExpressionEditor", first: true, predicate: RichExpressionEditorComponent, descendants: true, static: true }, { propertyName: "richExpressionEditorControl", first: true, predicate: RichExpressionEditorComponent, descendants: true, read: NgModel, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"modal-body row\">\n  <div class=\"d-flex flex-column h-100\" [ngClass]=\"isReadOnly ? 'col' : 'col-6'\">\n    <div class=\"d-flex align-items-center\">\n      <ng-container *ngIf=\"isNavigationEnabled\">\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_left mr-1\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToPreviousProperty()\"\n          [disabled]=\"isPreviousButtonDisabled\"\n          rx-id=\"previous-button\"\n        ></button>\n\n        <button\n          type=\"button\"\n          class=\"d-icon-angle_right mr-2\"\n          adapt-button\n          btn-type=\"secondary\"\n          size=\"small\"\n          (click)=\"navigateToNextProperty()\"\n          [disabled]=\"isNextButtonDisabled\"\n          rx-id=\"next-button\"\n        ></button>\n      </ng-container>\n\n      <h5 class=\"m-0 text-truncate\">\n        {{\n          'com.bmc.arsys.rx.client.expression-editor.expression-for-property.label'\n            | translate: { propertyName: currentProperty?.label || (currentProperty?.path | titlecase) }\n        }}\n      </h5>\n    </div>\n\n    <div class=\"flex flex-grow-1 h-100 mt-2\">\n      <rx-rich-expression-editor\n        class=\"flex-grow-1 h-100\"\n        [dataDictionary]=\"dataDictionary\"\n        [(ngModel)]=\"expression\"\n        [operatorRows]=\"operatorRows\"\n        [disabled]=\"isReadOnly\"\n      ></rx-rich-expression-editor>\n    </div>\n  </div>\n\n  <div class=\"col-6 d-flex flex-column h-100 pr-0\" *ngIf=\"!isReadOnly\">\n    <ng-template #legendContentTemplate>\n      <div class=\"text-left p-2\">\n        <div *ngFor=\"let item of legend; let last = last\" [class.pb-2]=\"!last\">\n          <span class=\"legend-item-icon px-2 py-1\" [ngClass]=\"item.icon\"></span>\n          <span class=\"ml-2\">{{ item.label }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <h5 class=\"mt-0\">\n      {{ 'com.bmc.arsys.rx.client.expression-editor.available-values.label' | translate }}\n      <adapt-icon\n        name=\"info_circle_o_adapt\"\n        [adaptTooltip]=\"legendContentTemplate\"\n        width=\"260\"\n        placement=\"bottom\"\n      ></adapt-icon>\n    </h5>\n\n    <div class=\"data-dictionary-container flex-grow-1\">\n      <rx-data-dictionary\n        [dataDictionary]=\"dataDictionary\"\n        (nodeSelected)=\"onNodeSelected($event)\"\n      ></rx-data-dictionary>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    *ngIf=\"!isReadOnly\"\n    type=\"button\"\n    adapt-button\n    btn-type=\"primary\"\n    (click)=\"onSave()\"\n    [disabled]=\"richExpressionEditorControl.invalid || richExpressionEditorControl.pristine\"\n    rx-id=\"save-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.ok.label' | translate }}\n  </button>\n\n  <button type=\"button\" adapt-button btn-type=\"secondary\" (click)=\"cancelModal()\" rx-id=\"cancel-button\">\n    {{\n      (isReadOnly ? 'com.bmc.arsys.rx.client.common.close.label' : 'com.bmc.arsys.rx.client.common.cancel.label')\n        | translate\n    }}\n  </button>\n</div>\n", styles: [":root{--border-radius: 4px;--nav-background: var(--gray-900);--nav-links-color: var(--white);--font-family: \"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--color-primary-disabled-hover: #ff8d2a;--color-primary-disabled: #ff7d18;--color-primary: #f86e00;--color-primary-hover: #e45f00;--color-primary-active: #d05100;--color-primary-active-hover: #bc4300;--color-secondary-disabled-hover: #ffffff;--color-secondary-disabled: #ffffff;--color-secondary: #f9f9fa;--color-secondary-hover: #e5e5e6;--color-secondary-active: #d2d2d3;--color-secondary-active-hover: #c0c0c2;--color-active-disabled-hover: #45c8bd;--color-active-disabled: #2db7ad;--color-active: #00a79d;--color-active-hover: #00978e;--color-active-active: #00887f;--color-active-active-hover: #007970;--color-info-disabled-hover: #66d9f1;--color-info-disabled: #52c7df;--color-info: #3cb6ce;--color-info-hover: #21a6bd;--color-info-active: #0096ad;--color-info-active-hover: #00879e;--color-success-disabled-hover: #aae860;--color-success-disabled: #99d550;--color-success: #89c341;--color-success-hover: #7ab232;--color-success-active: #6ba122;--color-success-active-hover: #5d9110;--color-warning-disabled-hover: #ffda46;--color-warning-disabled: #ffc734;--color-warning: #f1b521;--color-warning-hover: #dea406;--color-warning-active: #cc9400;--color-warning-active-hover: #ba8400;--color-danger-disabled-hover: #ff5323;--color-danger-disabled: #ff4313;--color-danger: #f83200;--color-danger-hover: #e31f00;--color-danger-active: #cd0500;--color-danger-active-hover: #b80000;--dense-spacing-custom: false;--table-scroll-width: 0}:host{display:block;height:706px}.modal-body{min-height:calc(100% - 61px)!important;height:calc(100% - 61px)}.data-dictionary-container{overflow-y:auto;padding-right:15px}:host::ng-deep .expression-node{display:flex;border:0;overflow:hidden;border-radius:.125rem}:host::ng-deep .expression-node-icon{color:#fff;background-color:#3cb6ce;padding:.25rem .5rem}:host::ng-deep .expression-node-label{background-color:#d6d7d8;padding:.25rem .5rem}.legend-item-icon{display:inline-block;background:#00a79d;border-radius:var(--border-radius) 0 0 var(--border-radius);width:1.75rem;text-align:center}\n"], components: [{ type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }, { type: i4.RichExpressionEditorComponent, selector: "rx-rich-expression-editor", inputs: ["dataDictionary", "operatorRows"] }, { type: i1.AdaptIconComponent, selector: "adapt-icon", inputs: ["name", "classList", "description", "testID"] }, { type: i5.DataDictionaryComponent, selector: "rx-data-dictionary", inputs: ["dataDictionary"], outputs: ["nodeSelected", "dragStart"] }], directives: [{ type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.AdaptTooltipDirective, selector: "[adaptTooltip]", inputs: ["popupDelay", "placement", "width", "minWidth", "useWidthFitting", "adaptRadarDisableEventSending", "adaptTooltip", "manual"], outputs: ["shown", "hidden"], exportAs: ["tooltip"] }], pipes: { "translate": i2.TranslatePipe, "titlecase": i6.TitleCasePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ExpressionEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-editor',
                    templateUrl: './expression-editor.component.html',
                    styleUrls: ['./expression-editor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }, { type: i2.TranslateService }, { type: i3.RxExpressionParserService }, { type: i0.Injector }]; }, propDecorators: { richExpressionEditor: [{
                type: ViewChild,
                args: [RichExpressionEditorComponent, { static: true }]
            }], richExpressionEditorControl: [{
                type: ViewChild,
                args: [RichExpressionEditorComponent, { read: NgModel, static: true }]
            }] } });
//# sourceMappingURL=expression-editor.component.js.map