import { Injectable } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { combineLatest, of } from 'rxjs';
import { RxViewExpressionValidatorService } from '@helix/platform/view/designer';
import { RxProcessDefinitionService } from '@helix/platform/process/api';
import { defaultIfEmpty, map, switchMap } from 'rxjs/operators';
import { flatten, forEach, isEmpty } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/process/api";
import * as i2 from "@helix/platform/view/api";
import * as i3 from "@helix/platform/view/designer";
export class RxLaunchProcessViewActionDesignManagerService {
    constructor(rxProcessDefinitionService, rxViewActionRegistryService, rxViewExpressionValidatorService) {
        this.rxProcessDefinitionService = rxProcessDefinitionService;
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
    }
    validate(properties, propertyName) {
        if (properties.processDefinitionName) {
            return this.rxProcessDefinitionService.get(properties.processDefinitionName).pipe(switchMap((processDefinition) => combineLatest([
                this.validateInputParams(properties, propertyName, processDefinition.inputParams),
                this.validateInputParamExpressions(properties, propertyName, processDefinition.inputParams)
            ])), map(flatten));
        }
        else {
            return of([]);
        }
    }
    validateInputParamExpressions(actionParams, issuePropertyName, processInputParams) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
        const issues = processInputParams
            .filter((processInputParam) => actionParams[`actionProcessInputParams.${processInputParam.name}`])
            .map((processInputParam) => this.rxViewExpressionValidatorService
            .validate(actionParams[`actionProcessInputParams.${processInputParam.name}`], issuePropertyName, actionDescriptor.label)
            .pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { description: `${actionDescriptor.label} action: ${issue.description}` }))))));
        return combineLatest(issues).pipe(defaultIfEmpty([]), map(flatten));
    }
    validateInputParams(actionParams, issuePropertyName, processInputParams) {
        const actionDescriptor = this.rxViewActionRegistryService.get(actionParams.name);
        const validationIssues = [];
        forEach(processInputParams, (processInputParam) => {
            const actionParamName = `actionProcessInputParams.${processInputParam.name}`;
            if (processInputParam.fieldOption === 'REQUIRED' && isEmpty(actionParams[actionParamName])) {
                validationIssues.push({
                    type: 'error',
                    description: `${actionDescriptor.label}: ${processInputParam.name} cannot be blank.`,
                    propertyName: issuePropertyName
                });
            }
        });
        return of(validationIssues);
    }
}
RxLaunchProcessViewActionDesignManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService, deps: [{ token: i1.RxProcessDefinitionService }, { token: i2.RxViewActionRegistryService }, { token: i3.RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxLaunchProcessViewActionDesignManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxLaunchProcessViewActionDesignManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RxProcessDefinitionService }, { type: i2.RxViewActionRegistryService }, { type: i3.RxViewExpressionValidatorService }]; } });
//# sourceMappingURL=launch-process-view-action-design-manager.service.js.map