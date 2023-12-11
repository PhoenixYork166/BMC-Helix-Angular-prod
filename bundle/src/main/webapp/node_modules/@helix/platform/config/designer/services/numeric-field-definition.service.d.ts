import { Injector } from '@angular/core';
import { IConfigFieldDefinitionModel } from '../config-designer.types';
import { BaseFieldDefinitionService } from './base-field-definition.service';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxNumberUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare abstract class NumericFieldDefinitionService extends BaseFieldDefinitionService {
    private rxNumberUtilsService;
    abstract readonly minValue: number;
    abstract readonly maxValue: number;
    constructor(injector: Injector, rxNumberUtilsService: RxNumberUtilsService);
    validate(fieldModel: IConfigFieldDefinitionModel): IValidationIssue[];
    static ɵfac: i0.ɵɵFactoryDeclaration<NumericFieldDefinitionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NumericFieldDefinitionService>;
}
