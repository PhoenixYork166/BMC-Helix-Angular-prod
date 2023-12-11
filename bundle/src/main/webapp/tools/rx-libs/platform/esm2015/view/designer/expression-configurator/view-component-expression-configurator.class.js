import { isFunction } from 'lodash';
import { switchMap } from 'rxjs/operators';
import { RxDefaultExpressionEvaluatorService, RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RxViewDataDictionaryService } from '../data-dictionary/view-data-dictionary.service';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
export class RxViewComponentExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(injector, componentGuid, componentModel, componentType) {
        super(injector);
        this.injector = injector;
        this.componentGuid = componentGuid;
        this.componentModel = componentModel;
        this.componentType = componentType;
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxViewComponentRegistryService = this.injector.get(RxViewComponentRegistryService);
        this.commonDataDictionary$ = this.rxViewDataDictionaryService.commonDataDictionary$;
    }
    getExpressionEvaluator(propertyName) {
        var _a;
        const propertyDescriptor = this.componentType &&
            this.rxViewComponentRegistryService
                .get(this.componentType)
                .properties.find((property) => property.name === propertyName);
        return isFunction((_a = propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.evaluatorService) === null || _a === void 0 ? void 0 : _a.parseExpression)
            ? propertyDescriptor.evaluatorService
            : this.rxDefaultExpressionEvaluatorService;
    }
    getCommonDataDictionary(componentBranchToReplace$, componentGuid = this.componentGuid) {
        return componentBranchToReplace$
            ? componentBranchToReplace$.pipe(switchMap((dataDictionary) => this.rxViewDataDictionaryService.getCommonDataDictionary({
                [componentGuid]: dataDictionary
            })))
            : this.commonDataDictionary$;
    }
    getComponentCommonDataDictionary(guid) {
        return this.rxViewDataDictionaryService.getComponentCommonDataDictionary(guid || this.componentGuid);
    }
}
//# sourceMappingURL=view-component-expression-configurator.class.js.map