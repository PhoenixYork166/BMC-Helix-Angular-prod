import { Injectable } from '@angular/core';
import { last, forEach, isEmpty, reduce } from 'lodash';
import { of, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RxProcessDefinitionCacheService, RxProcessInstanceService, RxProcessInstanceCommandsService, RX_PROCESS_DEFINITION } from '@helix/platform/process/api';
import { RxRecordDefinitionCacheService, RxRecordInstanceService } from '@helix/platform/record/api';
import { RxLogService } from '@helix/platform/shared/api';
import { RxJsonParserService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/utils";
import * as i2 from "@helix/platform/shared/api";
import * as i3 from "@helix/platform/process/api";
import * as i4 from "@helix/platform/record/api";
export class RxLaunchProcessViewActionService {
    constructor(rxJsonParserService, rxLogService, rxProcessDefinitionCacheService, rxRecordDefinitionCacheService, rxProcessInstanceCommandsService, rxProcessInstanceService, rxRecordInstanceService) {
        this.rxJsonParserService = rxJsonParserService;
        this.rxLogService = rxLogService;
        this.rxProcessDefinitionCacheService = rxProcessDefinitionCacheService;
        this.rxRecordDefinitionCacheService = rxRecordDefinitionCacheService;
        this.rxProcessInstanceCommandsService = rxProcessInstanceCommandsService;
        this.rxProcessInstanceService = rxProcessInstanceService;
        this.rxRecordInstanceService = rxRecordInstanceService;
    }
    execute(params) {
        let processId;
        let processDefinitionOutputParams;
        return this.rxProcessInstanceCommandsService
            .start(params.processDefinitionName, params.actionProcessInputParams)
            .pipe(switchMap((res) => {
            if (params.waitForProcessCompletion) {
                const location = res.headers.get('location');
                processId = location ? last(location.split('/')) : null;
                return this.rxProcessDefinitionCacheService.getOutputParams(params.processDefinitionName);
            }
            else {
                return of(null);
            }
        }), switchMap((plainOutputParams) => {
            if (!isEmpty(plainOutputParams)) {
                processDefinitionOutputParams = plainOutputParams.reduce((outputParams, value) => {
                    outputParams[value.name] = value;
                    return outputParams;
                }, {});
                return this.rxProcessInstanceService.get(params.processDefinitionName, `${processId}/processOutputVariables`);
            }
            else {
                return of(null);
            }
        }), switchMap((processOutputVariables) => {
            const outputResult = {};
            forEach(processOutputVariables, (variableValue, variableName) => {
                if (processDefinitionOutputParams[variableName].fieldTypeName ===
                    RX_PROCESS_DEFINITION.processVariableTypes.record) {
                    const recordInstanceOutputData = this.rxJsonParserService.tryParseJson(variableValue);
                    if (recordInstanceOutputData &&
                        recordInstanceOutputData.recordDefinitionName &&
                        recordInstanceOutputData.id) {
                        outputResult[variableName] = this.rxRecordInstanceService
                            .get(recordInstanceOutputData.recordDefinitionName, recordInstanceOutputData.id)
                            .pipe(map((recordInstance) => reduce(recordInstance.fieldInstances, (result, fieldInstance) => {
                            result[fieldInstance.id] = fieldInstance.value;
                            return result;
                        }, {})));
                    }
                    else {
                        this.rxLogService.warning('rxLaunchProcessAction: unknown format for record instance as output data for process');
                    }
                }
                else {
                    outputResult[variableName] = of(variableValue);
                }
            });
            return forkJoin(outputResult);
        }));
    }
}
RxLaunchProcessViewActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, deps: [{ token: i1.RxJsonParserService }, { token: i2.RxLogService }, { token: i3.RxProcessDefinitionCacheService }, { token: i4.RxRecordDefinitionCacheService }, { token: i3.RxProcessInstanceCommandsService }, { token: i3.RxProcessInstanceService }, { token: i4.RxRecordInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessViewActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxJsonParserService }, { type: i2.RxLogService }, { type: i3.RxProcessDefinitionCacheService }, { type: i4.RxRecordDefinitionCacheService }, { type: i3.RxProcessInstanceCommandsService }, { type: i3.RxProcessInstanceService }, { type: i4.RxRecordInstanceService }]; } });
//# sourceMappingURL=launch-process-view-action.service.js.map