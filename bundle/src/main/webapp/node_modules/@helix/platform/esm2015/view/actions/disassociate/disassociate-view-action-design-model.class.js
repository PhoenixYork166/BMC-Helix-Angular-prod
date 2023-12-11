import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import { ExpressionFormControlComponent, RxDefinitionPickerComponent, RxDefinitionPickerType, SelectFormControlComponent } from '@helix/platform/shared/components';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RX_ASSOCIATED_RECORD_NODE_SIDES, RxAssociatedRecordNodeSide, RxAssociationDefinitionService } from '@helix/platform/association/api';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap, map, withLatestFrom, shareReplay, skip } from 'rxjs/operators';
export class RxDisassociateViewActionDesignModel extends RxViewDesignerActionModel {
    constructor(injector, sandbox) {
        super(injector, sandbox);
        this.injector = injector;
        this.sandbox = sandbox;
        this.rxRecordDefinitionCacheService = this.injector.get(RxRecordDefinitionCacheService);
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.rxAssociationDefinitionService = this.injector.get(RxAssociationDefinitionService);
        const recordDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('recordDefinitionName'), distinctUntilChanged());
        const associationDefinitionName$ = this.sandbox.actionProperties$.pipe(pluck('associationDefinitionName'), distinctUntilChanged());
        const associationNameOptions$ = recordDefinitionName$.pipe(switchMap((recordDefinitionName) => recordDefinitionName
            ? this.rxRecordDefinitionCacheService.getRecordAssociationDefinitions(recordDefinitionName).pipe(map((associationDefinitions) => associationDefinitions[recordDefinitionName].map((recordDefinition) => ({
                id: recordDefinition.name,
                name: this.rxDefinitionNameService.getDisplayName(recordDefinition.name)
            }))))
            : of([])));
        const associationDefinition$ = associationDefinitionName$.pipe(switchMap((associationDefinitionName) => associationDefinitionName ? this.rxAssociationDefinitionService.get(associationDefinitionName) : of(null)), shareReplay(1));
        const isSymmetricalAssociation$ = associationDefinition$.pipe(map((association) => (association ? association.nodeAId === association.nodeBId : false)));
        const associationRoleOptions$ = associationDefinition$.pipe(map((association) => association
            ? [
                {
                    id: RxAssociatedRecordNodeSide.NodeA,
                    name: association.nodeAName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeA.defaultName
                },
                {
                    id: RxAssociatedRecordNodeSide.NodeB,
                    name: association.nodeBName || RX_ASSOCIATED_RECORD_NODE_SIDES.nodeB.defaultName
                }
            ]
            : []));
        // skip initial props set
        recordDefinitionName$.pipe(skip(1)).subscribe(() => {
            this.sandbox.updateActionProperties({
                associationDefinitionName: null,
                associationDefinitionRole: null
            });
        });
        associationDefinition$
            .pipe(
        // skip initial props set
        skip(1), withLatestFrom(isSymmetricalAssociation$, recordDefinitionName$))
            .subscribe(([associationDefinition, isSymmetricalAssociation, recordDefinitionName]) => {
            if (associationDefinition && !isSymmetricalAssociation) {
                const associationDefinitionRole = recordDefinitionName === associationDefinition.nodeAId
                    ? RxAssociatedRecordNodeSide.NodeA
                    : RxAssociatedRecordNodeSide.NodeB;
                this.sandbox.updateActionProperties({
                    associationDefinitionRole
                });
            }
            else {
                this.sandbox.updateActionProperties({
                    associationDefinitionRole: null
                });
            }
        });
        combineLatest([recordDefinitionName$, associationNameOptions$, associationRoleOptions$])
            .pipe(withLatestFrom(isSymmetricalAssociation$))
            .subscribe(([[recordDefinitionName, associationNameOptions, associationRoleOptions], isSymmetricalAssociation]) => {
            this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation));
        });
    }
    static getInitialProperties(initialProperties) {
        return Object.assign({ recordDefinitionName: null, associationDefinitionName: null, associationDefinitionRole: null, associatedRecordId: null, disassociatedRecordIds: null }, initialProperties);
    }
    getActionEditorConfig(recordDefinitionName, associationNameOptions, associationRoleOptions, isSymmetricalAssociation) {
        return [
            {
                name: 'recordDefinitionName',
                component: RxDefinitionPickerComponent,
                options: {
                    label: 'Record definition to disassociate',
                    definitionType: RxDefinitionPickerType.StandardDataRecord,
                    required: true
                }
            },
            ...(recordDefinitionName
                ? [
                    {
                        name: 'associationDefinitionName',
                        component: SelectFormControlComponent,
                        options: {
                            label: 'Association to use',
                            options: associationNameOptions,
                            required: true
                        }
                    },
                    {
                        name: 'associationDefinitionRole',
                        component: SelectFormControlComponent,
                        isDisabled: !isSymmetricalAssociation,
                        options: {
                            label: 'Associated record node side',
                            required: true,
                            options: associationRoleOptions
                        }
                    },
                    {
                        name: 'associatedRecordId',
                        component: ExpressionFormControlComponent,
                        options: {
                            label: 'Associated record ID',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    },
                    {
                        name: 'disassociatedRecordIds',
                        component: ExpressionFormControlComponent,
                        options: {
                            label: 'Records to disassociate',
                            dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                            operators: this.expressionConfigurator.getOperators(),
                            isRequired: true
                        }
                    }
                ]
                : [])
        ];
    }
}
//# sourceMappingURL=disassociate-view-action-design-model.class.js.map