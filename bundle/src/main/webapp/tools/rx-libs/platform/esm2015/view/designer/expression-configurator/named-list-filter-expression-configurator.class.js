import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { chain, map as _map } from 'lodash';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
import { RxViewDataDictionaryService } from '../data-dictionary/view-data-dictionary.service';
import { RxDefaultExpressionEvaluatorService } from '@helix/platform/view/api';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from '@helix/platform/shared/api';
import { RxRecordDefinitionCacheService, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { RxNamedListDefinitionCacheService } from '@helix/platform/named-list/api';
export class NamedListFilterExpressionConfigurator extends RxViewExpressionConfigurator {
    constructor(fieldDefinition, injector) {
        super(injector);
        this.fieldDefinition = fieldDefinition;
        this.injector = injector;
        this.rxNamedListDefinitionCacheService = this.injector.get(RxNamedListDefinitionCacheService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxViewDataDictionaryService = this.injector.get(RxViewDataDictionaryService);
        this.rxDefaultExpressionEvaluatorService = this.injector.get(RxDefaultExpressionEvaluatorService);
        this.commonDataDictionary$ = this.rxNamedListDefinitionCacheService
            .getNamedListDefinition(this.fieldDefinition.namedListDefinition)
            .pipe(switchMap((namedListDefinition) => this.rxRecordDefinitionCacheService.getRecordDefinition(namedListDefinition.recordDefinitionName)), switchMap((recordDefinition) => this.getNamedListBranch(recordDefinition)), withLatestFrom(this.rxViewDataDictionaryService.getCommonDataDictionary()), map(([namedListBranch, dataDictionary]) => [namedListBranch, ...dataDictionary]));
    }
    getExpressionEvaluator() {
        return this.rxDefaultExpressionEvaluatorService;
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllServer) });
    }
    getNamedListBranch(recordDefinition) {
        const namedListDictionaryNodes = chain(recordDefinition.fieldDefinitions)
            .reject({ resourceType: RX_RECORD_DEFINITION.resourceTypes.attachment })
            .map((fieldDefinition) => ({
            label: fieldDefinition.name,
            expression: `'${fieldDefinition.id}'`,
            icon: 'd-icon-file_o_gear',
            children: fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                ? [
                    {
                        label: 'Options',
                        children: _map(fieldDefinition.optionNamesById, (optionName, optionValue) => ({
                            label: optionName,
                            expression: optionValue,
                            icon: 'd-icon-file_o_gear'
                        }))
                    }
                ]
                : []
        }))
            .sortBy('label')
            .value();
        return of({
            label: 'Filter by',
            expanded: true,
            children: namedListDictionaryNodes
        });
    }
}
//# sourceMappingURL=named-list-filter-expression-configurator.class.js.map