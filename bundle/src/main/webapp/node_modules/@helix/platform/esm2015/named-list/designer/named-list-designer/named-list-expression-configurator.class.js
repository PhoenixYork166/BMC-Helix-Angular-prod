import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { compact, flow, map as _map } from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
export class RxNamedListExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.translateService = this.injector.get(TranslateService);
        this.commonDataDictionary$ = of([]);
        this.generalGroup = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
            hidden: true,
            children: [
                {
                    label: 'NULL',
                    icon: 'd-icon-dollar',
                    expression: '$NULL$'
                }
            ]
        };
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllClient) });
    }
    namedListExpressionDataDictionary(namedListDefinition) {
        const data = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.named-list-designer.expression-configurator.record-instance.label'),
            expanded: true
        };
        if (namedListDefinition.recordDefinitionName) {
            return this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName).pipe(map((recordDefinition) => {
                data.children = recordDefinition
                    ? flow((fieldDefinitions) => _map(fieldDefinitions, (fieldDefinition) => {
                        if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                            return {
                                label: fieldDefinition.name,
                                icon: 'd-icon-arrow_right_square_input',
                                expression: `'${fieldDefinition.name}'`
                            };
                        }
                    }), compact)(recordDefinition.fieldDefinitions)
                    : [];
                return [data, this.generalGroup];
            }));
        }
        else {
            return of([this.generalGroup]);
        }
    }
}
//# sourceMappingURL=named-list-expression-configurator.class.js.map