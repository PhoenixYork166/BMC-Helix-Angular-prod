import { of } from 'rxjs';
import { RxExpressionConfigurator } from '@helix/platform/shared/api';
export class RxRecordDataSetExpressionConfigurator extends RxExpressionConfigurator {
    constructor() {
        super(...arguments);
        this.commonDataDictionary$ = of([
            {
                label: 'Keywords',
                children: [
                    {
                        label: 'Current user',
                        icon: 'd-icon-dollar',
                        expression: `$USER$`
                    },
                    {
                        label: 'NULL',
                        icon: 'd-icon-dollar',
                        expression: '$NULL$',
                        hidden: true
                    },
                    {
                        label: 'Time stamp',
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    }
                ]
            }
        ]);
    }
}
//# sourceMappingURL=record-data-set-expression-configurator.class.js.map