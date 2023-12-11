import { Injector } from '@angular/core';
import { IFieldOptions } from '@helix/platform/config/api';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import { IConfigFieldDefinitionModel } from '../config-designer.types';
import * as i0 from "@angular/core";
export declare class CharacterFieldDefinitionService extends BaseFieldDefinitionService {
    private rxNumberUtilsService;
    dataType: string;
    constructor(injector: Injector, rxNumberUtilsService: RxNumberUtilsService);
    getFieldInspectorConfig(options: IFieldOptions): IFormBuilderConfig;
    validate(fieldModel: IConfigFieldDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CharacterFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CharacterFieldDefinitionService>;
}
