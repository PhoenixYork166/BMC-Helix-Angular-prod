import { RxBaseFieldDefinitionService } from './base-field-definition.service';
import { Injector } from '@angular/core';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { IValidationIssue } from '@helix/platform/ui-kit';
import * as i0 from "@angular/core";
export declare class RxSelectionFieldDefinitionService extends RxBaseFieldDefinitionService {
    resourceType: string;
    constructor(injector: Injector);
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxSelectionFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxSelectionFieldDefinitionService>;
}
