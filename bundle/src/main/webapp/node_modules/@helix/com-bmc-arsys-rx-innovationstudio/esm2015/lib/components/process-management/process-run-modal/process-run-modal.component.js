import { Component } from '@angular/core';
import { DockedPanelContext } from '@bmc-ux/adapt-angular';
import { ProcessManagementService } from '../process-management.service';
import { isEmpty, has, isNull, isUndefined } from 'lodash';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import * as i0 from "@angular/core";
import * as i1 from "@bmc-ux/adapt-angular";
import * as i2 from "../process-management.service";
import * as i3 from "@helix/platform/shared/components";
import * as i4 from "@angular/common";
import * as i5 from "@ngx-translate/core";
export class ProcessRunModalComponent {
    constructor(context, manageProcessesService) {
        this.context = context;
        this.manageProcessesService = manageProcessesService;
        this.inputParamsControls = this.manageProcessesService.buildInputParamsControls(context.getData().inputParams);
        this.inputParamsModel = this.manageProcessesService.buildInputParamsModel(context.getData().inputParams);
    }
    onModelChange(model) {
        this.inputParamsModel = Object.assign(Object.assign({}, this.inputParamsModel), model);
    }
    startProcess() {
        this.onBeforeStart();
        this.context.close(this.inputParamsModel);
    }
    isRunButtonDisabled() {
        let isDisabled = false;
        this.inputParamsControls
            .filter((param) => param.options.required)
            .map((param) => {
            const value = this.inputParamsModel[param.name];
            switch (param.dataType) {
                case RX_RECORD_DEFINITION.resourceTypes.character:
                case RX_RECORD_DEFINITION.resourceTypes.object:
                    if (isEmpty(value) || (value === null || value === void 0 ? void 0 : value.trim().length) === 0) {
                        isDisabled = true;
                    }
                    break;
                case RX_RECORD_DEFINITION.resourceTypes.recordInstance:
                    if (isEmpty(value) ||
                        !has(value, 'id') ||
                        !has(value, 'recordDefinitionName') ||
                        isEmpty(value.id) ||
                        isEmpty(value.recordDefinitionName)) {
                        isDisabled = true;
                    }
                    break;
                default:
                    if (isNull(value) || isUndefined(value)) {
                        isDisabled = true;
                    }
                    break;
            }
        });
        return isDisabled;
    }
    onBeforeStart() {
        this.inputParamsControls.map((param) => {
            const value = this.inputParamsModel[param.name];
            switch (param.dataType) {
                case RX_RECORD_DEFINITION.resourceTypes.boolean: {
                    if (value === true) {
                        this.inputParamsModel[param.name] = '1';
                    }
                    else if (value === false) {
                        this.inputParamsModel[param.name] = '0';
                    }
                    else {
                        this.inputParamsModel[param.name] = value;
                    }
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.decimal:
                case RX_RECORD_DEFINITION.resourceTypes.integer:
                case RX_RECORD_DEFINITION.resourceTypes.real: {
                    this.inputParamsModel[param.name] = (value === null || value === void 0 ? void 0 : value.toString()) || null;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.character: {
                    this.inputParamsModel[param.name] = value === null || value === void 0 ? void 0 : value.trim();
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.object: {
                    this.inputParamsModel[param.name] = (value === null || value === void 0 ? void 0 : value.trim()) || null;
                    break;
                }
            }
        });
    }
}
/** @nocollapse */ ProcessRunModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalComponent, deps: [{ token: i1.DockedPanelContext }, { token: i2.ProcessManagementService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ ProcessRunModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.3", type: ProcessRunModalComponent, selector: "ax-process-run-modal", ngImport: i0, template: "<div class=\"modal-body\">\n  <rx-form-builder\n    *ngIf=\"inputParamsControls.length > 0\"\n    [config]=\"[{ controls: inputParamsControls }]\"\n    [model]=\"inputParamsModel\"\n    (modelChange)=\"onModelChange($event)\"\n  ></rx-form-builder>\n\n  <span *ngIf=\"inputParamsControls.length === 0\">{{\n    'com.bmc.arsys.rx.innovation-studio.process-management.run-process.no-input-params.label' | translate\n  }}</span>\n</div>\n\n<div class=\"modal-footer d-flex w-100\">\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"primary\"\n    rx-id=\"ok-button\"\n    [disabled]=\"isRunButtonDisabled()\"\n    (click)=\"startProcess()\"\n  >\n    {{ 'com.bmc.arsys.rx.innovation-studio.process-management.run-process.button.label' | translate }}\n  </button>\n\n  <button\n    adapt-button\n    type=\"button\"\n    btn-type=\"secondary\"\n    (click)=\"context.dismiss(0)\"\n    rx-id=\"cancel-button\"\n  >\n    {{ 'com.bmc.arsys.rx.client.common.cancel.label' | translate }}\n  </button>\n</div>\n", components: [{ type: i3.FormBuilderComponent, selector: "rx-form-builder", inputs: ["config", "model", "guid", "isReadOnly", "focusEditor$"], outputs: ["modelChange", "editorEvent", "formInitialized"] }, { type: i1.AdaptButtonComponent, selector: "adapt-button, button[adapt-button], a[adapt-button]", inputs: ["btn-type", "size", "disabled", "type", "tabIndex"], exportAs: ["adaptBtn"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "translate": i5.TranslatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessRunModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ax-process-run-modal',
                    templateUrl: './process-run-modal.component.html'
                }]
        }], ctorParameters: function () { return [{ type: i1.DockedPanelContext }, { type: i2.ProcessManagementService }]; } });
//# sourceMappingURL=process-run-modal.component.js.map