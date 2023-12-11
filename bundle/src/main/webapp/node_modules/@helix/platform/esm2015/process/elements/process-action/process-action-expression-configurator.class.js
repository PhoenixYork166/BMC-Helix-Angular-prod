import { RxServerActionExpressionConfigurator } from '@helix/platform/shared/api';
import { RxProcessDataDictionaryService } from '@helix/platform/process/api';
export class RxProcessActionExpressionConfigurator extends RxServerActionExpressionConfigurator {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.configureForProperty({
            propertyPath: /outputMap\/.*/,
            dataDictionary$: this.getOutputMapDataDictionary()
        });
    }
    getDataDictionaryService() {
        return this.injector.get(RxProcessDataDictionaryService);
    }
    getOutputMapDataDictionary() {
        return this.commonDataDictionary$;
    }
}
//# sourceMappingURL=process-action-expression-configurator.class.js.map