import { RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
import { ExpressionOperatorGroup, RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxRecordDefinitionCacheService, RX_RECORD_DEFINITION } from '@helix/platform/record/api';
import { forkJoin, of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { RxRecordGridUtilsService } from '../common/services/record-grid-utils.service';
import { map as _map } from 'lodash';
import { RX_RECORD_GRID_DESIGN } from './record-grid-design.constant';
export class RecordGridExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    constructor(injector, componentGuid, componentModel) {
        super(injector, componentGuid, componentModel);
        this.componentGuid = componentGuid;
        this.componentModel = componentModel;
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxRecordGridUtilsService = this.injector.get(RxRecordGridUtilsService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        const filterExpressionBranch$ = this.getComponentCommonDataDictionary().pipe(switchMap((componentCommonBranch) => componentCommonBranch
            ? componentModel.recordDefinition$.pipe(concatMap((recordDefinition) => this.rxRecordGridUtilsService.getAssociationDescriptors(recordDefinition.name).pipe(concatMap((associationDescriptors) => associationDescriptors.length
                ? forkJoin(associationDescriptors.map((associationDescriptor) => this.rxRecordDefinitionCacheService
                    .getRecordDefinition(associationDescriptor.recordDefinitionName)
                    .pipe(map((associationRecordDefinition) => (Object.assign(Object.assign({}, associationDescriptor), { recordDefinition: associationRecordDefinition }))))))
                : of([])), map((associationDescriptors) => recordDefinition
                ? {
                    label: 'Filter by',
                    children: [
                        {
                            label: this.rxDefinitionNameService.getDisplayName(recordDefinition.name),
                            icon: 'd-icon-file_o_gear',
                            children: recordDefinition.fieldDefinitions.map((fieldDefinition) => {
                                const selectionList = fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                                    ? _map(fieldDefinition.optionNamesById, (optionName, optionValue) => ({
                                        label: optionName,
                                        expression: `\${view.components.${componentGuid}.recordDefinition.fieldDefinitionsById[${fieldDefinition.id}].optionsById[${optionValue}].id}`
                                    }))
                                    : undefined;
                                return {
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-file_o_gear',
                                    expression: `'${fieldDefinition.id}'`,
                                    children: fieldDefinition.resourceType === RX_RECORD_DEFINITION.resourceTypes.selection
                                        ? [
                                            {
                                                label: 'Options',
                                                children: selectionList
                                            }
                                        ]
                                        : null,
                                    autocompleteOptions: selectionList
                                };
                            })
                        },
                        ...(associationDescriptors
                            ? associationDescriptors.map((descriptor) => ({
                                label: this.rxDefinitionNameService.getDisplayName(descriptor.associationDefinition.name),
                                icon: 'd-icon-file_o_gear',
                                children: descriptor.recordDefinition.fieldDefinitions.map((fieldDefinition) => ({
                                    label: fieldDefinition.name,
                                    icon: 'd-icon-file_o_gear',
                                    expression: `'\${recordContext._associations.${descriptor.associationDefinition.guid}.${descriptor.nodeSide}[0].${fieldDefinition.id}}'`
                                }))
                            }))
                            : [])
                    ]
                }
                : []))), map((filterByBranch) => (Object.assign(Object.assign({}, componentCommonBranch), { children: [filterByBranch, ...componentCommonBranch.children] }))))
            : of(null)));
        this.configureForProperty({
            propertyPath: 'filterExpression',
            operators: this.getOperatorRowsByGroup(ExpressionOperatorGroup.AllServer),
            dataDictionary$: this.getCommonDataDictionary(filterExpressionBranch$).pipe(map((dataDictionary) => [
                RX_RECORD_GRID_DESIGN.keywords,
                ...(dataDictionary.filter((dataDictionaryBranch) => dataDictionaryBranch.label !== 'General' && dataDictionaryBranch.label !== 'Functions') || [])
            ]))
        });
    }
}
//# sourceMappingURL=record-grid-expression-configurator.class.js.map