import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
import { concatMap, switchMap, map } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
export class AssociationExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    constructor(injector, componentGuid, componentModel) {
        super(injector, componentGuid, componentModel);
        this.injector = injector;
        this.componentGuid = componentGuid;
        this.componentModel = componentModel;
        this.rxDefinitionNameService = this.injector.get(RxDefinitionNameService);
        this.configureForProperty({
            propertyPath: 'recordId',
            dataDictionary$: componentModel.recordEditorGuid$.pipe(concatMap((recordEditorGuid) => this.getCommonDataDictionary(this.getRecordEditorBranch(recordEditorGuid), recordEditorGuid)))
        });
    }
    getRecordEditorBranch(recordEditorGuid) {
        const associationsBranch$ = this.componentModel.otherAssociationRecordEditorComponentGuids$.pipe(switchMap((guids) => guids.length
            ? combineLatest(guids.map((guid) => this.componentModel.sandbox
                .getComponentPropertyValue('associationDefinitionName', guid)
                .pipe(map((associationDefinitionName) => ({
                label: this.rxDefinitionNameService.getDisplayName(associationDefinitionName),
                children: [
                    {
                        label: 'First associated record',
                        children: [
                            {
                                label: 'ID',
                                expression: `\${view.components.${guid}.firstAssociatedRecord.id}`
                            }
                        ]
                    }
                ]
            }))))).pipe(map((children) => ({
                label: 'Associations',
                children
            })))
            : of(null)));
        return this.getComponentCommonDataDictionary(recordEditorGuid).pipe(switchMap((recordEditorBranch) => associationsBranch$.pipe(map((associationsBranch) => associationsBranch
            ? Object.assign(Object.assign({}, recordEditorBranch), { children: [associationsBranch, ...recordEditorBranch.children] }) : recordEditorBranch))));
    }
}
//# sourceMappingURL=association-expression-configurator.class.js.map