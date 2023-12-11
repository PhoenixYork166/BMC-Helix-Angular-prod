import { Injectable } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { every, filter as _filter, flatten, isEmpty, map as _map, merge as _merge } from 'lodash';
import { debounceTime, filter, map, publishReplay, refCount, skipWhile, switchMap, take, takeUntil } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { RxViewExpressionValidatorService } from './view-expression-validator.service';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "../+state/view-designer.facade";
import * as i3 from "./view-expression-validator.service";
export class RxViewExpressionValidatorRegistryService {
    constructor(rxViewComponentRegistryService, viewDesignerFacade, rxViewExpressionValidatorService) {
        this.rxViewComponentRegistryService = rxViewComponentRegistryService;
        this.viewDesignerFacade = viewDesignerFacade;
        this.rxViewExpressionValidatorService = rxViewExpressionValidatorService;
        this.issuesObservableMap = new Map();
    }
    registerComponents(guids) {
        guids.forEach((guid) => this.issuesObservableMap.set(guid, this.getComponentValidationIssues(guid)));
        this.initValidation();
    }
    unregisterComponents(guids) {
        guids.forEach((guid) => this.issuesObservableMap.delete(guid));
        this.initValidation();
    }
    unregisterAllComponents() {
        var _a;
        this.issuesObservableMap.clear();
        (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    initValidation() {
        var _a;
        (_a = this.validateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.validateSubscription = combineLatest(Array.from(this.issuesObservableMap.entries()).map(([guid, issues$]) => issues$.pipe(map((issues) => ({
            [guid]: issues
        })))))
            .pipe(map((issuesByComponentGuid) => _merge({}, ...issuesByComponentGuid)), skipWhile((issuesByComponentGuid) => every(Object.values(issuesByComponentGuid), isEmpty)), 
        // debounceTime will allow Set expression validation issues action to be executed once for improved performance.
        debounceTime(0))
            .subscribe((issues) => {
            this.viewDesignerFacade.setExpressionValidationIssues(issues);
        });
    }
    getComponentValidationIssues(guid) {
        return this.viewDesignerFacade.getComponentType(guid).pipe(take(1), switchMap((componentType) => {
            const descriptor = this.rxViewComponentRegistryService.get(componentType);
            const expressionProps = _filter(descriptor === null || descriptor === void 0 ? void 0 : descriptor.properties, {
                enableExpressionEvaluation: true
            });
            const expressionPropertyNames = _map(expressionProps, 'name');
            const descriptorPropMap = new Map(expressionProps.map((prop) => [prop.name, prop]));
            return expressionPropertyNames.length
                ? combineLatest(expressionPropertyNames.map((propertyName) => this.viewDesignerFacade
                    .getComponentPropertyValue(guid, propertyName)
                    .pipe(switchMap((propertyValue) => this.rxViewExpressionValidatorService
                    .validate(propertyValue, propertyName, descriptorPropMap.get(propertyName).label, descriptorPropMap.get(propertyName).evaluatorService)
                    .pipe(takeUntil(this.viewDesignerFacade.allComponentGuids$.pipe(filter((guids) => !guids.has(guid))))))))).pipe(map(flatten))
                : of([]);
        }), publishReplay(1), refCount());
    }
}
RxViewExpressionValidatorRegistryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, deps: [{ token: i1.RxViewComponentRegistryService }, { token: i2.ViewDesignerFacade }, { token: i3.RxViewExpressionValidatorService }], target: i0.ɵɵFactoryTarget.Injectable });
RxViewExpressionValidatorRegistryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxViewExpressionValidatorRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewComponentRegistryService }, { type: i2.ViewDesignerFacade }, { type: i3.RxViewExpressionValidatorService }]; } });
//# sourceMappingURL=view-expression-validator-registry.service.js.map