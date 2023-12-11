import { Component, Input } from '@angular/core';
import { ViewDesignerFacade } from '../../+state/view-designer.facade';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../+state/view-designer.facade";
import * as i2 from "@helix/platform/shared/components";
import * as i3 from "@angular/forms";
export class RxComponentPermissionEditorWidgetComponent {
    constructor(viewDesignerFacade) {
        this.viewDesignerFacade = viewDesignerFacade;
        this.permissions = [];
        this.destroyed$ = new ReplaySubject(1);
    }
    ngOnInit() {
        this.viewDesignerFacade
            .getComponentPermissions(this.options.componentGuid)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((permissions) => {
            this.permissions = permissions;
        });
    }
    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
    onPermissionsChange(permissions) {
        this.viewDesignerFacade.updateComponentModel(this.options.componentGuid, {
            permissions
        });
    }
}
RxComponentPermissionEditorWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetComponent, deps: [{ token: i1.ViewDesignerFacade }], target: i0.ɵɵFactoryTarget.Component });
RxComponentPermissionEditorWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: RxComponentPermissionEditorWidgetComponent, selector: "rx-component-permission-editor-widget", inputs: { options: "options", isDisabled: "isDisabled" }, ngImport: i0, template: "<rx-permission-editor\n  [options]=\"options\"\n  [disabled]=\"isDisabled\"\n  [(ngModel)]=\"permissions\"\n  (ngModelChange)=\"onPermissionsChange($event)\"\n></rx-permission-editor>\n", components: [{ type: i2.RxPermissionEditorComponent, selector: "rx-permission-editor", inputs: ["options"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxComponentPermissionEditorWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-component-permission-editor-widget',
                    templateUrl: './component-permission-editor-widget.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ViewDesignerFacade }]; }, propDecorators: { options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=component-permission-editor-widget.component.js.map