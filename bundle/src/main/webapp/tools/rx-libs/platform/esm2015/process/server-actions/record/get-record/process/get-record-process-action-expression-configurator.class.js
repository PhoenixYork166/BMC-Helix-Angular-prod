import { RxProcessActionExpressionConfigurator } from '@helix/platform/process/elements';
import { RxRecordServerActionExpressionConfiguratorMixin } from '../../record-server-action-expression-configurator.mixin';
export class RxGetRecordProcessActionExpressionConfiguratorClass extends RxRecordServerActionExpressionConfiguratorMixin(RxProcessActionExpressionConfigurator) {
    constructor(injector) {
        super(injector);
        this.injector = injector;
    }
}
//# sourceMappingURL=get-record-process-action-expression-configurator.class.js.map