import { RX_RECORD_DEFINITION, RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { iif, of } from 'rxjs';
import { map } from 'rxjs/operators';
export class RecordDesignerExpressionConfigurator extends RxExpressionConfigurator {
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
    recordExpressionDataDictionary(definitionModel, bundleId) {
        const data = {
            label: this.translateService.instant('com.bmc.arsys.rx.client.common.record-definition.label'),
            expanded: true
        };
        return iif(() => !!definitionModel.lastUpdateTime, this.rxRecordDefinitionCacheService.getRecordDefinition(`${bundleId}:${definitionModel.name}`).pipe(map((definition) => ({
            fields: definition.fieldDefinitions
        }))), of(definitionModel)).pipe(map((model) => {
            data.children = model.fields
                .filter((field) => field.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType)
                .map((field) => ({
                label: field.name,
                icon: 'd-icon-arrow_right_square_input',
                expression: `'${field.name}'`
            }));
            return [data, this.generalGroup];
        }));
    }
}
//# sourceMappingURL=record-designer-expression-configurator.class.js.map