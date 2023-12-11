import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { forEach, map as _map } from 'lodash';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { AttachmentFormControlComponent, BooleanFormControlComponent, CounterFormControlComponent, DateFormControlComponent, DateTimeFormControlComponent, InputListFormControlComponent, RecordInstanceFormControlComponent, SelectFormControlComponent, TextFormControlComponent, TimeFormControlComponent } from '@helix/platform/shared/components';
import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
export class ProcessManagementService {
    constructor(rxNumberUtilsService) {
        this.rxNumberUtilsService = rxNumberUtilsService;
    }
    buildInputParamsControls(inputParams) {
        const propertyControls = [];
        forEach(inputParams, (inputParam) => {
            const config = {
                name: inputParam.name,
                options: {
                    label: inputParam.name,
                    required: inputParam.fieldOption === 'REQUIRED'
                },
                defaultValue: inputParam.defaultValue || null,
                dataType: inputParam.resourceType,
                validators: []
            };
            if (config.options.required) {
                config.validators.push(Validators.required);
            }
            switch (inputParam.resourceType) {
                case RX_RECORD_DEFINITION.resourceTypes.selection: {
                    const selectionInputParam = inputParam;
                    config.component = SelectFormControlComponent;
                    config.options = Object.assign(Object.assign({}, config.options), { options: _map(selectionInputParam.optionNamesById, (value, key) => ({
                            id: key,
                            name: value
                        })), emptyOption: !config.options.required });
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.recordInstance: {
                    config.component = RecordInstanceFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.character: {
                    config.component = TextFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.boolean: {
                    config.component = BooleanFormControlComponent;
                    config.options.label = '';
                    config.options.description = inputParam.name;
                    config.options.shouldDisplayAsCheckbox = config.options.required;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.decimal:
                case RX_RECORD_DEFINITION.resourceTypes.integer:
                case RX_RECORD_DEFINITION.resourceTypes.real: {
                    config.component = CounterFormControlComponent;
                    config.options.allowIntegerOnly = inputParam.resourceType === RX_RECORD_DEFINITION.resourceTypes.integer;
                    if (this.rxNumberUtilsService.isFiniteNumberString(inputParam.defaultValue)) {
                        config.defaultValue = Number(inputParam.defaultValue);
                    }
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.dateOnly: {
                    config.component = DateFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.dateTime: {
                    config.component = DateTimeFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.timeOnly: {
                    config.component = TimeFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.attachment: {
                    config.component = AttachmentFormControlComponent;
                    break;
                }
                case RX_RECORD_DEFINITION.resourceTypes.list: {
                    const listInputParam = inputParam;
                    if (listInputParam.subType === RX_PROCESS_DEFINITION.processVariableSubTypes.attachment) {
                        config.component = AttachmentFormControlComponent;
                        config.options.filesCount = '1000';
                    }
                    else {
                        config.component = InputListFormControlComponent;
                    }
                    break;
                }
                default: {
                    config.component = TextFormControlComponent;
                    break;
                }
            }
            propertyControls.push(config);
        });
        return propertyControls;
    }
    buildInputParamsModel(inputParams) {
        const propertyModel = {};
        forEach(inputParams, (inputParam) => {
            var _a;
            if (inputParam.resourceType === RX_RECORD_DEFINITION.resourceTypes.boolean) {
                if (inputParam.defaultValue === '1') {
                    propertyModel[inputParam.name] = true;
                }
                else if (inputParam.defaultValue === '0') {
                    propertyModel[inputParam.name] = false;
                }
                else {
                    propertyModel[inputParam.name] = inputParam.defaultValue;
                }
            }
            else {
                propertyModel[inputParam.name] = (_a = inputParam.defaultValue) !== null && _a !== void 0 ? _a : null;
            }
        });
        return propertyModel;
    }
}
/** @nocollapse */ ProcessManagementService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, deps: [{ token: i1.RxNumberUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ ProcessManagementService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: ProcessManagementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxNumberUtilsService }]; } });
//# sourceMappingURL=process-management.service.js.map