import { RxIdService } from '@helix/platform/utils';
import { RxFieldDefinitionService, RxRecordDefinitionService } from '@helix/platform/record/api';
import { TranslateService } from '@ngx-translate/core';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { IRecordDefinitionModel, IRecordFieldDefinitionModel } from '../../record-designer.types';
import { Injector } from '@angular/core';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { RxFieldDefinitionInspectorHelperService } from './field-definition-inspector-helper.service';
export declare abstract class RxBaseFieldDefinitionService {
    private injector;
    abstract readonly resourceType: string;
    protected translateService: TranslateService;
    protected rxIdService: RxIdService;
    protected rxFieldDefinitionService: RxFieldDefinitionService;
    protected rxFieldDefinitionInspectorHelperService: RxFieldDefinitionInspectorHelperService;
    protected rxRecordDefinitionService: RxRecordDefinitionService;
    constructor(injector: Injector);
    getNewFieldDefinitionModel(fieldProperties: Partial<IRecordFieldDefinitionModel>): IRecordFieldDefinitionModel;
    getFieldInspectorConfig(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel, isReadOnly: boolean): IFormBuilderConfig;
    validate(fieldModel: IRecordFieldDefinitionModel, definitionModel: IRecordDefinitionModel): IValidationIssue[];
}
