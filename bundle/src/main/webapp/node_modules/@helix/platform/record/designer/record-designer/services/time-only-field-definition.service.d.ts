import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injector } from '@angular/core';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import * as i0 from "@angular/core";
export declare class RxTimeOnlyFieldDefinitionService extends RxBaseFieldDefinitionService {
    resourceType: string;
    constructor(injector: Injector);
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxTimeOnlyFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxTimeOnlyFieldDefinitionService>;
}
