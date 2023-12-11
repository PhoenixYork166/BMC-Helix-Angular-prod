import { Injector } from '@angular/core';
import { IFieldOptions } from '@helix/platform/config/api';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import * as i0 from "@angular/core";
export declare class BooleanFieldDefinitionService extends BaseFieldDefinitionService {
    dataType: string;
    constructor(injector: Injector);
    getFieldInspectorConfig(options: IFieldOptions): IFormBuilderConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<BooleanFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BooleanFieldDefinitionService>;
}
