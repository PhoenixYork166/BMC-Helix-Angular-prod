import { Observable } from 'rxjs';
import { IDefinition } from './definition.types';
export interface IDefinitionAdapter<TElementDefinitionType extends IDefinition = IDefinition, TEntityDefinitionType extends IDefinition = IDefinition> {
    adaptDefinition(elementDefinition: TElementDefinitionType, entityDefinition: TEntityDefinitionType): void | Observable<void>;
}
