import { Component } from '@angular/core';
import { some } from 'lodash';
import { map, take } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "../web-api-connection-wizard-step-fields/web-api-connection-wizard-step-fields.component";
import * as i3 from "@angular/common";
export class AuthenticationWizardStepComponent {
    constructor(rxWizardModalComponent) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.context$ = this.rxWizardModalComponent.context$;
        this.isSaveButtonDisabled$ = this.rxWizardModalComponent.context$.pipe(map((context) => {
            const isDirty = some(context.wizardSteps, { isDirty: true });
            return some(context.wizardSteps, { isValid: false }) || !isDirty;
        }));
    }
    onFormStatusChange() {
        this.isSaveButtonDisabled$.pipe(take(1)).subscribe((isSaveButtonDisabled) => {
            if (isSaveButtonDisabled) {
                this.rxWizardModalComponent.api.disableFinishButton();
            }
            else {
                this.rxWizardModalComponent.api.enableFinishButton();
            }
        });
    }
}
AuthenticationWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AuthenticationWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
AuthenticationWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: AuthenticationWizardStepComponent, selector: "rx-authentication-wizard-step", ngImport: i0, template: "<ng-container *ngIf=\"context$ | async as context\">\n  <rx-web-api-connection-wizard-step-fields\n    [step]=\"context.wizardSteps[1]\"\n    [stepDetails]=\"context.webApiConnection.authTypeDetails\"\n    (formStatusChange)=\"onFormStatusChange()\"\n    [webApiConnection]=\"context.webApiConnection\"\n  >\n  </rx-web-api-connection-wizard-step-fields>\n</ng-container>\n", components: [{ type: i2.WebApiConnectionWizardStepFieldsComponent, selector: "rx-web-api-connection-wizard-step-fields", inputs: ["step", "webApiConnection", "stepDetails"], outputs: ["selectionChange", "formStatusChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AuthenticationWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-authentication-wizard-step',
                    templateUrl: './authentication-wizard-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }]; } });
//# sourceMappingURL=authentication-wizard-step.component.js.map