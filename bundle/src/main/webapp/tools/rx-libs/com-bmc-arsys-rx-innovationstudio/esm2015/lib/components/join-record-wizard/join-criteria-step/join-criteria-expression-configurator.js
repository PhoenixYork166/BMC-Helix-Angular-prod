import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { chain } from 'lodash';
import { of } from 'rxjs';
export class JoinCriteriaExpressionConfigurator extends RxExpressionConfigurator {
    constructor(primaryRecordDefinition, secondaryRecordDefinition, injector) {
        super();
        this.commonDataDictionary$ = null;
        const translateService = injector.get(TranslateService);
        const rxDefinitionNameService = injector.get(RxDefinitionNameService);
        const records = [
            {
                recordDefinitionName: rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                label: `(${translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                fieldDefinitions: primaryRecordDefinition.fieldDefinitions
            },
            {
                recordDefinitionName: rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                label: `(${translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
            }
        ];
        this.commonDataDictionary$ = of(records.map((record) => ({
            label: `${record.recordDefinitionName} ${record.label}`,
            expanded: true,
            children: chain(record.fieldDefinitions)
                .map((fieldDefinition) => {
                if (fieldDefinition.resourceType !== RX_RECORD_DEFINITION.dataTypes.attachment.resourceType) {
                    return {
                        label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                        icon: 'd-icon-field_text',
                        expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                    };
                }
            })
                .compact()
                .sortBy((item) => item.label.toLocaleLowerCase())
                .value()
        })));
    }
}
//# sourceMappingURL=join-criteria-expression-configurator.js.map