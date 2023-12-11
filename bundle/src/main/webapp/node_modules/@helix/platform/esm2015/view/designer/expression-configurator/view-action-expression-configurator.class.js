import { RxDefaultExpressionEvaluatorService, RxViewActionRegistryService } from '@helix/platform/view/api';
import { get } from 'lodash';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
import { RxViewDataDictionaryService } from '../data-dictionary/view-data-dictionary.service';
export class RxViewActionExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(injector, actionType, actionGuid) {
        super(injector);
        this.injector = injector;
        this.actionType = actionType;
        this.actionGuid = actionGuid;
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.rxViewActionRegistryService = this.injector.get(RxViewActionRegistryService);
        this.commonDataDictionary$ = this.rxViewDataDictionaryService.getActionDataDictionary(this.actionGuid);
    }
    getExpressionEvaluator(propertyName) {
        const propertyDescriptor = this.rxViewActionRegistryService
            .get(this.actionType)
            .parameters.find((param) => param.name === propertyName);
        return get(propertyDescriptor, 'evaluatorService', this.rxDefaultExpressionEvaluatorService);
    }
}
//# sourceMappingURL=view-action-expression-configurator.class.js.map