import { RxFieldDefinitionService } from '@helix/platform/record/api';
import { IValidationIssueSection } from '@helix/platform/ui-kit';
import { IRecordDefinitionModel } from '../record-designer.types';
import { TranslateService } from '@ngx-translate/core';
import { RxFieldDefinitionManagerService } from './services/field-definition-manager.service';
import { RxDefinitionNameService } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export declare class RxRecordDefinitionValidatorService {
    private rxFieldDefinitionService;
    private translateService;
    private rxDefinitionNameService;
    private rxFieldDefinitionManagerService;
    constructor(rxFieldDefinitionService: RxFieldDefinitionService, translateService: TranslateService, rxDefinitionNameService: RxDefinitionNameService, rxFieldDefinitionManagerService: RxFieldDefinitionManagerService);
    validate(definitionModel: IRecordDefinitionModel): IValidationIssueSection[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxRecordDefinitionValidatorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxRecordDefinitionValidatorService>;
}
