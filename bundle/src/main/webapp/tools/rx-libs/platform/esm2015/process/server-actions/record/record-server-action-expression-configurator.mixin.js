import { of } from 'rxjs';
import { RX_RECORD_SERVER_ACTION } from './record-server-action.constant';
export function RxRecordServerActionExpressionConfiguratorMixin(Base) {
    return class RxRecordServerActionExpressionConfigurator extends Base {
        constructor(...args) {
            super(...args);
        }
        validateInputMapExpression(propertyName, expression) {
            let isValid = true;
            if (propertyName === 'recordDefinitionName' &&
                expression &&
                !expression.match(RX_RECORD_SERVER_ACTION.dynamicRecordDefinitionNameRegex)) {
                isValid = false;
            }
            return of(isValid);
        }
    };
}
//# sourceMappingURL=record-server-action-expression-configurator.mixin.js.map