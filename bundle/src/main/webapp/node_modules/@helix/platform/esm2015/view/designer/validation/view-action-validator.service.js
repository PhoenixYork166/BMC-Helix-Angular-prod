import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { flatten, flow, map as _map, compact, find } from 'lodash';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { RxStringService } from '@helix/platform/utils';
import { map } from 'rxjs/operators';
import { RxLogService } from '@helix/platform/shared/api';
import { RxViewExpressionValidatorService } from './view-expression-validator.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/utils";
import * as i3 from "@helix/platform/shared/api";
import * as i4 from "./view-expression-validator.service";
export class RxViewActionValidatorService {
    constructor(rxViewActionRegistryService, rxStringService, rxLogService, rxViewExpressionValidatorService) {
        this.rxViewActionRegistryService = rxViewActionRegistryService;
        this.rxStringService = rxStringService;
        this.rxLogService = rxLogService;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
    }
    validate(actionsDesignData, propertyName) {
        const issues = flow((actions) => actions.map(({ data }) => {
            const descriptor = this.rxViewActionRegistryService.get(data.name);
            return [
                of(this.validateRequiredProps(data, descriptor, propertyName)),
                this.performCustomValidation(data, descriptor, propertyName),
                this.validateExpressions(data, descriptor, propertyName)
            ];
        }), flatten)(actionsDesignData);
        return combineLatest([of(this.validateActionSequence(actionsDesignData, propertyName)), ...issues]).pipe(map(flatten));
    }
    performCustomValidation(actionProps, descriptor, issuePropertyName) {
        const designManager = this.rxViewActionRegistryService.getDesignManager(descriptor.name);
        return designManager
            ? designManager.validate(actionProps, issuePropertyName).pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { data: {
                    actionIndex: actionProps.index
                } })))))
            : of([]);
    }
    validateRequiredProps(actionProps, descriptor, issuePropertyName) {
        return flow((descriptorParams) => descriptorParams.filter((param) => param.isRequired === true && this.rxStringService.isEmptySafe(actionProps[param.name])), (descriptorParams) => descriptorParams.map((param) => ({
            type: 'error',
            description: `${descriptor.label} action: ${param.label || param.name} cannot be blank.`,
            propertyName: issuePropertyName,
            data: {
                actionIndex: actionProps.index
            }
        })))(descriptor.parameters);
    }
    validateExpressions(actionProps, descriptor, issuePropertyName) {
        const actionIssues = descriptor.parameters
            .filter((paramDescriptor) => paramDescriptor.enableExpressionEvaluation === true && actionProps[paramDescriptor.name])
            .map((paramDescriptor) => this.rxViewExpressionValidatorService
            .validate(actionProps[paramDescriptor.name], issuePropertyName, paramDescriptor.label || paramDescriptor.name, paramDescriptor.evaluatorService)
            .pipe(map((issues) => issues.map((issue) => (Object.assign(Object.assign({}, issue), { description: `${descriptor.label} action: ${issue.description}`, data: {
                actionIndex: actionProps.index
            } }))))));
        return actionIssues.length ? combineLatest(actionIssues).pipe(map(flatten)) : of([]);
    }
    validateActionSequence(actions, issuePropertyName) {
        return flow((actionsDesignData) => _map(actionsDesignData, ({ data }) => {
            const descriptor = this.rxViewActionRegistryService.get(data.name);
            return descriptor
                ? _map(data, (propertyValue, propertyName) => {
                    var _a;
                    if (((_a = descriptor.parameters.find((param) => param.name === propertyName)) === null || _a === void 0 ? void 0 : _a.enableExpressionEvaluation) &&
                        this.rxStringService.isNonEmptyString(propertyValue)) {
                        // Extract <ID> from ${view.components.<ID>.<Path>}
                        const matches = propertyValue.match(/\${view\.components\.([0-9a-z-]+)\..+}/);
                        if (matches && matches[1]) {
                            const referencedAction = find(actionsDesignData, { guid: matches[1] });
                            if (Number(referencedAction === null || referencedAction === void 0 ? void 0 : referencedAction.data.index) > Number(data.index)) {
                                return {
                                    type: 'error',
                                    description: `${descriptor.label} action: invalid expression for ${propertyName}.`,
                                    propertyName: issuePropertyName
                                };
                            }
                        }
                    }
                })
                : [];
        }), flatten, compact)(actions);
    }
}
RxViewActionValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, deps: [{ token: i1.RxViewActionRegistryService }, { token: i2.RxStringService }, { token: i3.RxLogService }, { token: i4.RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewActionValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewActionValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewActionRegistryService }, { type: i2.RxStringService }, { type: i3.RxLogService }, { type: i4.RxViewExpressionValidatorService }]; } });
//# sourceMappingURL=view-action-validator.service.js.map