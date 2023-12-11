import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveModalRef, DismissReasons } from '@bmc-ux/adapt-angular';
import { map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
import * as i4 from "@ngx-translate/core";
export class DevelopmentModeSelectorComponent {
    constructor(activeModalRef) {
        this.activeModalRef = activeModalRef;
        this.developmentModeFormControl = new FormControl(this.activeModalRef.getData().developmentMode);
        this.isSaveButtonDisabled$ = this.developmentModeFormControl.valueChanges.pipe(startWith(this.activeModalRef.getData().developmentMode), map((value) => value === this.activeModalRef.getData().developmentMode));
    }
    closeModal() {
        this.activeModalRef.dismiss(DismissReasons.CLOSE_BTN);
    }
    selectDevelopmentMode() {
        this.activeModalRef.close(this.developmentModeFormControl.value);
    }
}
DevelopmentModeSelectorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DevelopmentModeSelectorComponent, deps: [{ token: i1.ActiveModalRef }], target: i0.ɵɵFactoryTarget.Component });
DevelopmentModeSelectorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: DevelopmentModeSelectorComponent, selector: "rx-development-mode-selector", ngImport: i0, template: "<div class=\"modal-body p-0\">\n  <adapt-alert\n    [config]=\"{\n      content: 'com.bmc.arsys.rx.client.shell.development-mode.close-other-tabs.warning' | translate,\n      dismissible: false,\n      variant: 'warning',\n      type: 'page'\n    }\"\n  ></adapt-alert>\n\n  <div class=\"p-4\">\n    <div class=\"flex\">\n      <adapt-rx-radiobutton-group\n        [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.select.label' | translate\"\n        [autofocus]=\"true\"\n        [formControl]=\"developmentModeFormControl\"\n      >\n        <adapt-rx-radiobutton\n          value=\"1\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.best-practice.label' | translate\"\n        ></adapt-rx-radiobutton>\n        <adapt-rx-radiobutton\n          value=\"0\"\n          [label]=\"'com.bmc.arsys.rx.client.shell.development-mode.base.label' | translate\"\n        ></adapt-rx-radiobutton>\n      </adapt-rx-radiobutton-group>\n\n      <adapt-alert\n        *ngIf=\"developmentModeFormControl.value === '0' && developmentModeFormControl.dirty\"\n        [config]=\"{\n          type: 'inline',\n          variant: 'warning',\n          dismissible: false,\n          content: 'com.bmc.arsys.rx.client.shell.development-mode.system-upgrade.warning' | translate\n        }\"\n      ></adapt-alert>\n\n      <a\n        adapt-button\n        class=\"d-icon-pop_up pl-0 pb-0\"\n        btn-type=\"tertiary\"\n        size=\"large\"\n        target=\"_blank\"\n        href=\"https://docs.bmc.com/docs/display/helixplatform/Customization+layer\"\n      >\n        <span> {{ 'com.bmc.arsys.rx.client.common.learn-more.label' | translate }}</span>\n      </a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button\n    adapt-button\n    btn-type=\"primary\"\n    type=\"button\"\n    rx-id=\"save-button\"\n    (click)=\"selectDevelopmentMode()\"\n    [disabled]=\"isSaveButtonDisabled$ | async\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.select.label' | translate }}\n  </button>\n\n  <button adapt-button btn-type=\"secondary\" type=\"button\" rx-id=\"cancel-button\" (click)=\"closeModal()\">\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i1.AdaptAlertComponent, selector: "adapt-alert", inputs: ["config"], outputs: ["onClose"] }, { type: i1.AdaptRxRadiobuttonGroupComponent, selector: "adapt-rx-radiobutton-group", inputs: ["formControlName"] }, { type: i1.AdaptRxRadiobuttonComponent, selector: "adapt-rx-radiobutton", inputs: ["name", "label", "id", "value", "checked", "disabled", "ariaLabel", "ariaLabeledBy", "ariaDescribedBy", "testID", "tabIndex"], outputs: ["onFocus", "onBlur", "checkedChange"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["disabled", "formControl", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i4.TranslatePipe, "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: DevelopmentModeSelectorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-development-mode-selector',
                    templateUrl: './development-mode-selector.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveModalRef }]; } });
//# sourceMappingURL=development-mode-selector.component.js.map