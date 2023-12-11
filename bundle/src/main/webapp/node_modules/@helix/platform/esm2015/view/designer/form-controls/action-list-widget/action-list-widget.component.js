import { Component, Injector, ViewChild } from '@angular/core';
import { InspectorWidgetBase } from '@helix/platform/shared/components';
import { RxViewComponentType } from '@helix/platform/view/api';
import { takeUntil } from 'rxjs/operators';
import { ActionListControlComponent } from '../action-list-control/action-list-control.component';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../action-list-control/action-list-control.component";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
export class ActionListWidgetComponent extends InspectorWidgetBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.actions = [];
        // @ts-ignore
        this.modelSandbox = this.designerItemModel.sandbox;
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        const actions$ = this.modelSandbox.getChildComponents();
        actions$.pipe(takeUntil(this.destroyed$)).subscribe((actions) => {
            this.actions = actions;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onActionsChange(actions) {
        this.modelSandbox.setChildren(this.getActionComponentPayloads(actions));
    }
    focus(data) {
        this.actionListControlComponent.focus(data);
    }
    getActionComponentPayloads(actionInspectorModels) {
        return actionInspectorModels.map((model) => (Object.assign({ type: RxViewComponentType.Action }, model)));
    }
}
ActionListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetComponent, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ActionListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ActionListWidgetComponent, selector: "rx-action-list-widget", viewQueries: [{ propertyName: "actionListControlComponent", first: true, predicate: ActionListControlComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<rx-action-list-control\n  [disabled]=\"modelSandbox.isViewReadOnly$ | async\"\n  [(ngModel)]=\"actions\"\n  (ngModelChange)=\"onActionsChange($event)\"\n  [tooltip]=\"options?.tooltip\"\n></rx-action-list-control>\n", components: [{ type: i1.ActionListControlComponent, selector: "rx-action-list-control", inputs: ["options", "tooltip"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ActionListWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-action-list-widget',
                    templateUrl: './action-list-widget.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { actionListControlComponent: [{
                type: ViewChild,
                args: [ActionListControlComponent]
            }] } });
//# sourceMappingURL=action-list-widget.component.js.map