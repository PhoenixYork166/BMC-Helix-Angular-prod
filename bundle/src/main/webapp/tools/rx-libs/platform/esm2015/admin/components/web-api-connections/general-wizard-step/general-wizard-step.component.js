import { Component } from '@angular/core';
import { find, isEqual, cloneDeep } from 'lodash';
import { take } from 'rxjs/operators';
import { RxWizardModalComponent } from '@helix/platform/shared/components';
import { RX_WEB_API_CONNECTIONS } from '../web-api-connections.constant';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/shared/components";
import * as i2 from "../web-api-connection-wizard-step-fields/web-api-connection-wizard-step-fields.component";
import * as i3 from "@angular/common";
export class GeneralWizardStepComponent {
    constructor(rxWizardModalComponent) {
        this.rxWizardModalComponent = rxWizardModalComponent;
        this.context$ = this.rxWizardModalComponent.context$;
    }
    ngOnInit() {
        this.context$.pipe(take(1)).subscribe((context) => {
            if (context.isEditMode) {
                this.rxWizardModalComponent.api.enableNextButton();
                this.savedAuthTypeCode = context.webApiConnection.authTypeCode;
                this.savedAuthTypeDetails = context.webApiConnection.authTypeDetails;
            }
        });
    }
    onSelectionChange(selection) {
        this.context$.pipe(take(1)).subscribe((context) => {
            if (selection['fieldName'] === 'authTypeCode') {
                const authTypeId = selection['selection'][0].id;
                const newWizardSteps = cloneDeep(context.wizardSteps);
                newWizardSteps[1].fields = find(RX_WEB_API_CONNECTIONS.authTypeFields, { id: authTypeId }).fields;
                this.rxWizardModalComponent.api.updateContext({
                    wizardSteps: newWizardSteps
                });
                if (this.savedAuthTypeCode && isEqual(selection['selection'][0], this.savedAuthTypeCode[0])) {
                    this.rxWizardModalComponent.api.updateContext({
                        webApiConnection: this.savedAuthTypeDetails
                    });
                }
                else {
                    const newWebApiConnection = cloneDeep(context.webApiConnection);
                    newWebApiConnection.authTypeDetails = {
                        username: '',
                        credentials: '',
                        httpHeaders: [],
                        queryParams: [],
                        tokenFetchMechanism: 0,
                        additionalFormParams: [],
                        grantType: [RX_WEB_API_CONNECTIONS.grantTypeOptions[0]]
                    };
                    this.rxWizardModalComponent.api.updateContext({
                        webApiConnection: newWebApiConnection
                    });
                }
            }
        });
    }
    onFormStatusChange() {
        this.rxWizardModalComponent.context$.pipe(take(1)).subscribe((context) => {
            if (context.wizardSteps[0].isValid) {
                this.rxWizardModalComponent.api.enableNextButton();
                if (context.wizardSteps[0].isDirty && context.isEditMode) {
                    this.rxWizardModalComponent.api.enableFinishButton();
                }
            }
            else {
                this.rxWizardModalComponent.api.disableNextButton();
            }
            if (context.wizardSteps[0].isDirty) {
                this.rxWizardModalComponent.api.markDirty();
            }
        });
    }
}
GeneralWizardStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GeneralWizardStepComponent, deps: [{ token: i1.RxWizardModalComponent }], target: i0.ɵɵFactoryTarget.Component });
GeneralWizardStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: GeneralWizardStepComponent, selector: "rx-general-wizard-step", ngImport: i0, template: "<ng-container *ngIf=\"context$ | async as context\">\n  <rx-web-api-connection-wizard-step-fields\n    [step]=\"context.wizardSteps[0]\"\n    [stepDetails]=\"context.webApiConnection\"\n    (selectionChange)=\"onSelectionChange($event)\"\n    (formStatusChange)=\"onFormStatusChange()\"\n    [webApiConnection]=\"context.webApiConnection\"\n  >\n  </rx-web-api-connection-wizard-step-fields>\n</ng-container>\n", components: [{ type: i2.WebApiConnectionWizardStepFieldsComponent, selector: "rx-web-api-connection-wizard-step-fields", inputs: ["step", "webApiConnection", "stepDetails"], outputs: ["selectionChange", "formStatusChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: GeneralWizardStepComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rx-general-wizard-step',
                    templateUrl: './general-wizard-step.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxWizardModalComponent }]; } });
//# sourceMappingURL=general-wizard-step.component.js.map