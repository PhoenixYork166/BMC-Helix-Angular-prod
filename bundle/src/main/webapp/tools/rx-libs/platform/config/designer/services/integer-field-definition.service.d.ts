import { IFieldOptions } from '@helix/platform/config/api';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { NumericFieldDefinitionService } from './numeric-field-definition.service';
import * as i0 from "@angular/core";
export declare class IntegerFieldDefinitionService extends NumericFieldDefinitionService {
    dataType: string;
    minValue: number;
    maxValue: number;
    getFieldInspectorConfig(options: IFieldOptions): IFormBuilderConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntegerFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IntegerFieldDefinitionService>;
}
