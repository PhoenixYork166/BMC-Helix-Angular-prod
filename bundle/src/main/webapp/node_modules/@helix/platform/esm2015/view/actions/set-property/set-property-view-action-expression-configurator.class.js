import { RxViewActionExpressionConfigurator, RxViewDataDictionaryService } from '@helix/platform/view/designer';
import { ExpressionOperatorGroup } from '@helix/platform/shared/api';
export class RxSetPropertyViewActionExpressionConfigurator extends RxViewActionExpressionConfigurator {
    constructor(injector, actionType, actionGuid) {
        super(injector, actionType, actionGuid);
        this.configureForProperty({
            propertyPath: 'propertyPath',
            dataDictionary$: injector.get(RxViewDataDictionaryService).settablePropertiesDataDictionary$,
            operators: this.getOperatorRowsByGroup(ExpressionOperatorGroup.MathClient)
        });
    }
}
//# sourceMappingURL=set-property-view-action-expression-configurator.class.js.map