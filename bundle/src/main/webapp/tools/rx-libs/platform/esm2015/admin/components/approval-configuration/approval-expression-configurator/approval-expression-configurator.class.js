import { flatten } from '@angular/compiler';
import { ErrorHandler } from '@angular/core';
import { RxAssociationNodeTreeDataPageService } from '@helix/platform/association/api';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { RxTreeService } from '@helix/platform/utils';
import { TranslateService } from '@ngx-translate/core';
import { find, flow, forEach } from 'lodash';
import { combineLatest, forkJoin, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { RxApprovalConfigurationService } from '../approval-configuration.service';
export class RxApprovalExpressionConfigurator extends RxExpressionConfigurator {
    constructor(injector) {
        super();
        this.injector = injector;
        this.translateService = this.injector.get(TranslateService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxAssociationNodeTreeDataPageService = this.injector.get(RxAssociationNodeTreeDataPageService);
        this.rxTreeService = this.injector.get(RxTreeService);
        this.rxApprovalConfigurationService = this.injector.get(RxApprovalConfigurationService);
        this.errorHandler = this.injector.get(ErrorHandler);
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
    approvalExpressionDataDictionary(currentRecordDefinitionName) {
        const queryParams = {
            recorddefinition: currentRecordDefinitionName
        };
        return combineLatest([
            this.rxAssociationNodeTreeDataPageService.get({ params: queryParams }),
            this.commonDataDictionary$
        ]).pipe(switchMap(([associationNodeTreeDataPage, commonDataDictionary]) => {
            const associations = associationNodeTreeDataPage.data;
            const associatedRecordDefinitionNames = flow((approvalAssociations) => approvalAssociations.map((tree) => this.rxTreeService.flattenTree(tree, 'children').map((association) => association.value)), flatten, (approvalAssociations) => approvalAssociations.map((association) => association.recordDefinitionName))(associations);
            const definitionRequests$ = [
                this.rxRecordDefinitionCacheService.getRecordDefinition(currentRecordDefinitionName)
            ];
            forEach(associatedRecordDefinitionNames, (definitionName) => {
                definitionRequests$.push(this.rxRecordDefinitionCacheService.getRecordDefinition(definitionName));
            });
            return forkJoin(definitionRequests$).pipe(map((definitions) => {
                const params = {
                    definitionName: currentRecordDefinitionName,
                    definitions,
                    associationsByDefinition: {
                        [currentRecordDefinitionName]: associations
                    }
                };
                return [
                    {
                        label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition.title'),
                        children: [
                            {
                                label: this.rxDefinitionNameService.getDisplayName(currentRecordDefinitionName),
                                children: this.getRecordDefinitionDataDictionary(params)
                            }
                        ]
                    },
                    ...commonDataDictionary
                ];
            }));
        }), shareReplay(1));
    }
    getRecordDefinitionDataDictionary(params) {
        const recordDefinition = find(params.definitions, { name: params.definitionName });
        const fields = recordDefinition.fieldDefinitions.map((field) => ({
            label: field.name,
            icon: 'd-icon-field_text',
            expression: params.association
                ? '${recordContext' +
                    `${params.parentAssociationExpression || ''}._associations.` +
                    `${params.association.value.associationDefintionGuid}.${params.association.value.nodeSide}[0].${field.id}}`
                : `'${field.name}'`
        }));
        if (params.associationsByDefinition && params.associationsByDefinition[recordDefinition.name]) {
            const associatedFields = this.getAssociationDataDictionary(params);
            if (associatedFields.length) {
                fields.unshift({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.expression-editor.data-dictionary.values.record-definition-associations.title'),
                    children: associatedFields
                });
            }
        }
        return fields;
    }
    getAssociationDataDictionary(params) {
        const associations = [];
        if (params.associationsByDefinition[params.definitionName].length) {
            forEach(params.associationsByDefinition[params.definitionName], (association) => {
                let parentAssociationExpression = '';
                const nextDefinitionAssociations = {};
                if (params.association) {
                    parentAssociationExpression = `._associations.${params.association.value.associationDefintionGuid}.${params.association.value.nodeSide}[0]`;
                }
                const currentAssociation = find(params.associationsByDefinition[params.definitionName], (item) => {
                    return item.value.recordDefinitionName === association.value.recordDefinitionName;
                });
                if (currentAssociation) {
                    nextDefinitionAssociations[association.value.recordDefinitionName] = currentAssociation.children;
                }
                associations.push({
                    label: association.value.nodeName !== association.value.recordDefinitionName
                        ? `${this.rxDefinitionNameService.getDisplayName(association.value.recordDefinitionName)} (${this.rxDefinitionNameService.getDisplayName(association.value.nodeName)})`
                        : this.rxDefinitionNameService.getDisplayName(association.value.nodeName),
                    children: this.getRecordDefinitionDataDictionary({
                        definitionName: association.value.recordDefinitionName,
                        definitions: params.definitions,
                        associationsByDefinition: nextDefinitionAssociations,
                        association,
                        parentAssociationExpression
                    }),
                    expression: `\${recordContext${parentAssociationExpression}._associations.` +
                        `${association.value.associationDefintionGuid}.${association.value.nodeSide}[0]}`
                });
            });
        }
        return associations;
    }
    getCtmPeopleFormFields(registeredRecordDefinitionName) {
        return combineLatest([
            this.rxApprovalConfigurationService
                .getCtmPeopleFormFields(this.rxDefinitionNameService.getBundleId(registeredRecordDefinitionName || ''))
                .pipe(catchError((error) => {
                this.errorHandler.handleError(error);
                return of(null);
            })),
            this.commonDataDictionary$
        ]).pipe(map(([ctmPeopleDefinition, commonDataDictionary]) => {
            const dictionary = [...commonDataDictionary];
            if (ctmPeopleDefinition) {
                dictionary.unshift({
                    label: this.translateService.instant('com.bmc.arsys.rx.client.approval.configuration.flow.approvers.types.people.label'),
                    children: ctmPeopleDefinition.fieldDefinitions.map((field) => ({
                        label: field.name,
                        icon: 'd-icon-field_text',
                        expression: `'${field.name}'`
                    }))
                });
            }
            return dictionary;
        }), shareReplay(1));
    }
}
//# sourceMappingURL=approval-expression-configurator.class.js.map