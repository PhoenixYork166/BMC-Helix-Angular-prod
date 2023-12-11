import { Component, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { map, pluck, take, takeUntil } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { RxIdService } from '@helix/platform/utils';
import { RxDesignerCacheService } from '@helix/platform/shared/api';
import { InspectorWidgetBase, RxExpressionEditorService } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/api";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@helix/platform/utils";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class RxExpressionInputMapInspectorWidgetComponent extends InspectorWidgetBase {
    constructor(renderer, rxDesignerCacheService, rxExpressionEditorService, rxIdService, injector) {
        super(injector);
        this.renderer = renderer;
        this.rxDesignerCacheService = rxDesignerCacheService;
        this.rxExpressionEditorService = rxExpressionEditorService;
        this.rxIdService = rxIdService;
        this.injector = injector;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.elementModel$ = this.designerItemModel.pipe(pluck('elementModel'), takeUntil(this.destroyed$));
        this.graph$ = this.designerItemModel.pipe(pluck('graph'), takeUntil(this.destroyed$));
        this.patchConfig(this.options);
    }
    ngOnChanges(changes) {
        if (!isEqual(changes.options.currentValue, changes.options.previousValue)) {
            this.patchConfig(changes.options.currentValue);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    openExpressionEditor(section, elementModel, inspectorElementRef) {
        this.graph$.pipe(take(1)).subscribe((graph) => {
            this.rxExpressionEditorService
                .openEditor({
                expressionConfigurator: this.options.expressionConfigurator,
                expressionPropertyNavigator: {
                    getProperties: this.getExpressionProperties.bind(this, elementModel, inspectorElementRef)
                },
                isReadOnly: false,
                property: {
                    path: `inputMap/${section.name}`,
                    value: elementModel.inputMap[section.name],
                    label: section.options.label
                }
            })
                .pipe(takeUntil(this.destroyed$))
                .subscribe((expression) => {
                const selectedElementCell = graph.getCell(this.rxIdService.getBase(elementModel.guid));
                selectedElementCell.prop(`elementModel/${expression.path}`, expression.value);
            });
        });
    }
    getExpressionProperties(elementModel, inspectorElementRef) {
        return of(elementModel.inputMap).pipe(map((modelProperties) => Array.from(this.renderer
            .selectRootElement(inspectorElementRef.nativeElement, true)
            .querySelectorAll('rx-expression-form-control')).map((element) => {
            const propertyPath = element.getAttribute('property-path');
            return {
                path: `inputMap/${propertyPath}`,
                value: modelProperties[propertyPath],
                label: element.getAttribute('property-label')
            };
        })));
    }
    patchConfig(options) {
        this.config = options.expressionInputMapInspectorOptions.map((expressionInputMapInspectorOption) => ({
            name: expressionInputMapInspectorOption.name,
            options: {
                label: expressionInputMapInspectorOption.label,
                dataDictionary$: options.expressionConfigurator.getDataDictionary(`inputMap/${expressionInputMapInspectorOption.name}`),
                operators: options.expressionConfigurator.getOperators(`inputMap/${expressionInputMapInspectorOption.name}`)
            }
        }));
    }
}
RxExpressionInputMapInspectorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetComponent, deps: [{ token: i0.Renderer2 }, { token: i1.RxDesignerCacheService }, { token: i2.RxExpressionEditorService }, { token: i3.RxIdService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RxExpressionInputMapInspectorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxExpressionInputMapInspectorWidgetComponent, selector: "rx-expression-input-map-inspector-widget", viewQueries: [{ propertyName: "expressionInputMapInspectorElementRef", first: true, predicate: ["expressionInputMapInspector"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"elementModel$ | async as elementModel\" #expressionInputMapInspector>\n  <rx-expression-form-control\n    *ngFor=\"let section of config\"\n    [options]=\"section.options\"\n    [propertyPath]=\"section.name\"\n    [ngModel]=\"elementModel.inputMap[section.name]\"\n    (events)=\"openExpressionEditor(section, elementModel, expressionInputMapInspectorElementRef)\"\n  >\n  </rx-expression-form-control>\n</div>\n", styles: [":host ::ng-deep rx-expression-form-control:not(:last-child) button{margin-bottom:5px}\n"], components: [{ type: i2.ExpressionFormControlComponent, selector: "rx-expression-form-control", inputs: ["options", "isDisabled", "propertyPath"], outputs: ["events"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i4.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionInputMapInspectorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-expression-input-map-inspector-widget',
                    templateUrl: './expression-input-map-inspector-widget.component.html',
                    styleUrls: ['./expression-input-map-inspector-widget.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.RxDesignerCacheService }, { type: i2.RxExpressionEditorService }, { type: i3.RxIdService }, { type: i0.Injector }]; }, propDecorators: { expressionInputMapInspectorElementRef: [{
                type: ViewChild,
                args: ['expressionInputMapInspector', { read: ElementRef }]
            }] } });
//# sourceMappingURL=expression-input-map-inspector-widget.component.js.map