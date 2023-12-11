import { Injector } from '@angular/core';
import { IFieldOptions } from '@helix/platform/config/api';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { IConfigFieldDefinitionModel } from '../config-designer.types';
import * as i0 from "@angular/core";
export declare class SelectionFieldDefinitionService extends BaseFieldDefinitionService {
    dataType: string;
    constructor(injector: Injector);
    getFieldInspectorConfig(options: IFieldOptions): IFormBuilderConfig;
    validate(fieldModel: IConfigFieldDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SelectionFieldDefinitionService>;
}
