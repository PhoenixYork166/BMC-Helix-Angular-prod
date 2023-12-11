import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup, RxDefinitionNameService, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { chain } from 'lodash';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
export class JoinCriteriaExpressionConfigurator extends RxExpressionConfigurator {
    constructor(primaryRecordDefinition$, secondaryRecordDefinition$, injector) {
        super();
        this.primaryRecordDefinition$ = primaryRecordDefinition$;
        this.secondaryRecordDefinition$ = secondaryRecordDefinition$;
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.commonDataDictionary$ = combineLatest([
            this.primaryRecordDefinition$,
            this.secondaryRecordDefinition$
        ]).pipe(map(([primaryRecordDefinition, secondaryRecordDefinition]) => {
            if (primaryRecordDefinition && secondaryRecordDefinition) {
                const records = [
                    {
                        recordDefinitionName: this.rxDefinitionNameService.getDisplayName(primaryRecordDefinition.name),
                        label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.primary.label')})`,
                        type: RX_RECORD_DEFINITION.sourceRecordTypes.primary,
                        fieldDefinitions: primaryRecordDefinition.fieldDefinitions
                    },
                    {
                        recordDefinitionName: this.rxDefinitionNameService.getDisplayName(secondaryRecordDefinition.name),
                        label: `(${this.translateService.instant('com.bmc.arsys.rx.innovation-studio.join-record-wizard.join-criteria.secondary.label')})`,
                        type: RX_RECORD_DEFINITION.sourceRecordTypes.secondary,
                        fieldDefinitions: secondaryRecordDefinition.fieldDefinitions
                    }
                ];
                return records.map((record) => ({
                    label: `${record.recordDefinitionName} ${record.label}`,
                    expanded: true,
                    children: chain(record.fieldDefinitions)
                        .reject({ resourceType: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType })
                        .map((fieldDefinition) => ({
                        label: `${record.recordDefinitionName}.${fieldDefinition.name}`,
                        icon: 'd-icon-field_text',
                        expression: `\${${record.recordDefinitionName}.${record.type}.${fieldDefinition.name}}`
                    }))
                        .sortBy((item) => item.label.toLocaleLowerCase())
                        .value()
                }));
            }
            else {
                return [];
            }
        }));
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllServer) });
    }
}
//# sourceMappingURL=join-criteria-expression-configurator.js.map