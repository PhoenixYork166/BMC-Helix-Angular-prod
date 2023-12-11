import { NamedListFilterExpressionConfigurator, RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
import { filter, switchMap } from 'rxjs/operators';
import { ExpressionOperatorGroup, ExpressionOperatorRowsByGroup } from '@helix/platform/shared/api';
export class TextFieldExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    constructor(injector, componentGuid, componentModel) {
        super(injector, componentGuid, componentModel);
        this.injector = injector;
        this.componentGuid = componentGuid;
        this.componentModel = componentModel;
        const dataDictionary$ = this.componentModel.selectedFieldDefinition$.pipe(filter((fieldDefinition) => Boolean(fieldDefinition.namedListDefinition)), switchMap((fieldDefinition) => {
            const namedListFilterExpressionConfigurator = new NamedListFilterExpressionConfigurator(fieldDefinition, this.injector);
            return namedListFilterExpressionConfigurator.getDataDictionary();
        }));
        this.configureForProperty({
            propertyPath: 'additionalQueryCriteria',
            dataDictionary$,
            operators: ExpressionOperatorRowsByGroup.get(ExpressionOperatorGroup.AllServer)
        });
    }
}
//# sourceMappingURL=text-field-expression-configurator.js.map