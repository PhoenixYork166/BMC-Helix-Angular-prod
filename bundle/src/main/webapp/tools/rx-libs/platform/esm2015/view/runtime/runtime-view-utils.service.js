import { Injectable } from '@angular/core';
import { RxDefinitionAdapterRegistryService } from '@helix/platform/shared/api';
import { RxViewActionDefinitionAdapterRegistryService, RxViewComponentType, RxViewDefinitionCacheService, RxViewDefinitionParserService, RxViewDefinitionService } from '@helix/platform/view/api';
import { isEmpty, isString, head, chain, isObject, values } from 'lodash';
import { map, take } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { RX_GUID } from '@helix/platform/utils';
import * as i0 from "@angular/core";
import * as i1 from "@helix/platform/view/api";
import * as i2 from "@helix/platform/shared/api";
export class RxRuntimeViewUtilsService {
    constructor(rxViewDefinitionService, rxViewDefinitionParserService, rxDefinitionAdapterRegistryService, rxViewActionDefinitionAdapterRegistryService, rxViewDefinitionCacheService) {
        this.rxViewDefinitionService = rxViewDefinitionService;
        this.rxViewDefinitionParserService = rxViewDefinitionParserService;
        this.rxDefinitionAdapterRegistryService = rxDefinitionAdapterRegistryService;
        this.rxViewActionDefinitionAdapterRegistryService = rxViewActionDefinitionAdapterRegistryService;
        this.rxViewDefinitionCacheService = rxViewDefinitionCacheService;
    }
    isViewCancellable(viewDefinitionName) {
        if (isString(viewDefinitionName)) {
            return this.rxViewDefinitionCacheService
                .getViewDefinition(viewDefinitionName)
                .pipe(map((viewDefinition) => this.hasPageComponent(viewDefinition) || this.hasViewCancellingAction(viewDefinition)));
        }
        else {
            return of(this.hasPageComponent(viewDefinitionName) || this.hasViewCancellingAction(viewDefinitionName));
        }
    }
    runAdaptersForComponents(viewDefinition, containerViewComponentDefinition) {
        const componentPairs = this.rxViewDefinitionParserService.getComponents(containerViewComponentDefinition || viewDefinition);
        const regex = new RegExp(`\\$\{view.components.${RX_GUID.baseGuidPattern}.`);
        viewDefinition.viewComponentExpressions = chain(componentPairs)
            .map((component) => values(component.componentDefinition.propertiesByName))
            .flatten()
            .map((propertyValue) => (isObject(propertyValue) ? values(propertyValue) : propertyValue))
            .flatten()
            .filter(isString)
            .filter((propertyValue) => regex.test(propertyValue))
            .value();
        const result = componentPairs.reduce((adapterObservables$, { componentDefinition }) => {
            const adapter = componentDefinition.type === RxViewComponentType.Action
                ? this.rxViewActionDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.propertiesByName.name)
                : this.rxDefinitionAdapterRegistryService.getRuntimeAdapter(componentDefinition.type);
            if (adapter) {
                const result$ = adapter.adaptDefinition(componentDefinition, viewDefinition);
                adapterObservables$.push(result$ ? result$.pipe(take(1)) : EMPTY);
            }
            return adapterObservables$;
        }, []);
        return isEmpty(result) ? [EMPTY] : result;
    }
    hasViewCancellingAction(viewDefinition) {
        return Boolean(this.rxViewDefinitionParserService.findViewComponent(viewDefinition, (viewComponentDefinition) => viewComponentDefinition.type === RxViewComponentType.Action &&
            viewComponentDefinition.propertiesByName.name === 'rxCloseViewAction' &&
            viewComponentDefinition.propertiesByName.actAsCancel === 'true'));
    }
    hasPageComponent(viewDefinition) {
        var _a;
        return ((_a = head(viewDefinition.componentDefinitions)) === null || _a === void 0 ? void 0 : _a.type) === RxViewComponentType.Page;
    }
}
RxRuntimeViewUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, deps: [{ token: i1.RxViewDefinitionService }, { token: i1.RxViewDefinitionParserService }, { token: i2.RxDefinitionAdapterRegistryService }, { token: i1.RxViewActionDefinitionAdapterRegistryService }, { token: i1.RxViewDefinitionCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
RxRuntimeViewUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxRuntimeViewUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RxViewDefinitionService }, { type: i1.RxViewDefinitionParserService }, { type: i2.RxDefinitionAdapterRegistryService }, { type: i1.RxViewActionDefinitionAdapterRegistryService }, { type: i1.RxViewDefinitionCacheService }]; } });
//# sourceMappingURL=runtime-view-utils.service.js.map