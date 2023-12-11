import { IAssociationDefinitionModel } from './association-designer.types';
import { Observable } from 'rxjs';
import { IRecordDefinition, RxRecordDefinitionCacheService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import { IAssociationDefinition } from '@helix/platform/association/api';
import * as i0 from "@angular/core";
export declare class AssociationDesignerService {
    private rxDefinitionNameService;
    private rxRecordDefinitionService;
    private rxRecordDefinitionCacheService;
    constructor(rxDefinitionNameService: RxDefinitionNameService, rxRecordDefinitionService: RxRecordDefinitionService, rxRecordDefinitionCacheService: RxRecordDefinitionCacheService);
    getDefinitionModelFromDefinition(definition: IAssociationDefinition): IAssociationDefinitionModel;
    getDefinitionFromDefinitionModel(model: IAssociationDefinitionModel): IAssociationDefinition;
    getRecordDefinition(name: string, forceReload?: boolean): Observable<IRecordDefinition>;
    getForeignKeyFieldName(definitionModel: IAssociationDefinitionModel): string;
    getForeignKeyFieldId(definitionModel: IAssociationDefinitionModel, forceReload?: boolean): Observable<number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociationDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AssociationDesignerService>;
}
