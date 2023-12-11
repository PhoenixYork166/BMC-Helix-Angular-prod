import { of } from 'rxjs';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxExpressionConfigurator } from '@helix/platform/shared/api';
export class RxShellMenuItemExpressionConfigurator extends RxExpressionConfigurator {
    constructor() {
        super(...arguments);
        this.commonDataDictionary$ = of([
            {
                label: 'General',
                expanded: true,
                children: [
                    {
                        label: 'Current person ID',
                        expression: '${keywords.personId}'
                    },
                    {
                        label: 'Current user ID',
                        expression: '${keywords.userId}'
                    }
                ]
            }
        ]);
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
}
//# sourceMappingURL=shell-menu-item-expression-configurator.class.js.map