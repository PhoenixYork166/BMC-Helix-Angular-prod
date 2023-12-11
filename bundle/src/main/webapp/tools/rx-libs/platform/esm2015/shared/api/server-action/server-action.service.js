import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationIssueType } from '@helix/platform/ui-kit';
import { RxStringService } from '@helix/platform/utils';
import { RxDesignerCacheService } from '../caching/designer-cache.service';
import * as i0 from "@angular/core";
export class RxServerActionService {
    constructor(injector) {
        this.injector = injector;
        this.rxDesignerCacheService = this.injector.get(RxDesignerCacheService);
        this.rxStringService = this.injector.get(RxStringService);
        this.translateService = this.injector.get(TranslateService);
    }
    getActionTypeByName(actionTypeName) {
        return this.rxDesignerCacheService.getActionTypeByNameSync(actionTypeName);
    }
    // TODO-VS: update types
    getClassConfig(options) {
        const model = this.getModelFromDefinition({
            actionTypeName: options.actionTypeName
        });
        return {
            content: model.name,
            elementModel: model,
            icon: model.isDeprecated ? 'info' : null,
            position: options.position,
            type: model.type
        };
    }
    // TODO-VS: update availableCells type
    validateInputMap(model, availableCells) {
        return of([]);
    }
    // TODO-VS: update availableCells type
    validateServerAction(model, availableCells) {
        return this.validateInputMap(model, availableCells).pipe(map((inputMapValidationIssues) => {
            const validationIssues = [...inputMapValidationIssues];
            if (this.rxStringService.isEmptySafe(model.name)) {
                validationIssues.push({
                    type: ValidationIssueType.Error,
                    description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                        propertyName: this.translateService.instant('com.bmc.arsys.rx.client.common.label.label')
                    }),
                    data: {
                        guid: model.guid,
                        inspectorTabIndex: 1
                    }
                });
            }
            model.outputMap.forEach((output, index) => {
                if (this.rxStringService.isEmptySafe(output.assignTarget)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                            errorMessage: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.target.label')
                            })
                        }),
                        data: {
                            fieldName: 'assignTarget',
                            guid: model.guid,
                            index,
                            inspectorTabIndex: 1,
                            propertyName: 'outputMap'
                        }
                    });
                }
                if (this.rxStringService.isEmptySafe(output.expression)) {
                    validationIssues.push({
                        type: ValidationIssueType.Error,
                        description: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.output-map.message', {
                            errorMessage: this.translateService.instant('com.bmc.arsys.rx.client.designer.validation.cannot-be-blank.message', {
                                propertyName: this.translateService.instant('com.bmc.arsys.rx.client.designer.assignment-expression.source.label')
                            })
                        }),
                        data: {
                            fieldName: 'expression',
                            guid: model.guid,
                            index,
                            inspectorTabIndex: 1,
                            propertyName: 'outputMap'
                        }
                    });
                }
            });
            return validationIssues;
        }));
    }
}
RxServerActionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RxServerActionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxServerActionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=server-action.service.js.map