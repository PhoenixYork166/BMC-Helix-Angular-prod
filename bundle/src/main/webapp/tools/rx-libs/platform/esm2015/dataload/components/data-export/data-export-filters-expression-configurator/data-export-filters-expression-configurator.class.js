import { RxDefinitionNameService, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { iif, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RxAssociationDefinitionCacheService } from '@helix/platform/association/api';
export class DataExportFiltersExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxAssociationDefinitionCacheService = this.injector.get(RxAssociationDefinitionCacheService);
        this.commonDataDictionary$ = of([
            {
                label: this.translateService.instant('com.bmc.arsys.rx.client.common.general-items.label'),
                children: [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-user.title'),
                        icon: 'd-icon-dollar',
                        expression: '$USER$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date.title'),
                        icon: 'd-icon-dollar',
                        expression: '$DATE$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIME$'
                    },
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.general-group.pill.current-date-time.title'),
                        icon: 'd-icon-dollar',
                        expression: '$TIMESTAMP$'
                    }
                ]
            }
        ]);
    }
    geDataDefinitionField(definitionType, recordOrAssociationDefinitionName) {
        if (recordOrAssociationDefinitionName) {
            return iif(() => definitionType === 'record', this.rxRecordDefinitionCacheService.getRecordDefinition(recordOrAssociationDefinitionName), this.rxAssociationDefinitionCacheService.getAssociationDefinition(recordOrAssociationDefinitionName).pipe(map((associationDefinitionResponse) => associationDefinitionResponse.nodeAId), switchMap((fetchedRecordDefinitionName) => this.rxRecordDefinitionCacheService.getRecordDefinition(fetchedRecordDefinitionName)))).pipe(withLatestFrom(this.commonDataDictionary$), map(([definitionResponse, commonDataDictionary]) => {
                return [
                    ...commonDataDictionary,
                    {
                        label: this.rxDefinitionNameService.getDisplayName(definitionResponse.name),
                        children: definitionResponse.fieldDefinitions.map((fieldDefinition) => ({
                            label: fieldDefinition.name,
                            icon: 'd-icon-field_text',
                            expression: `'${fieldDefinition.id}'`
                        }))
                    }
                ];
            }));
        }
        else {
            return of([]);
        }
    }
}
//# sourceMappingURL=data-export-filters-expression-configurator.class.js.map