import { IFieldOptions } from '@helix/platform/config/api';
import { IFormBuilderConfig } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { IValidationIssue } from '@helix/platform/ui-kit';
import { IConfigFieldDefinitionModel } from '../config-designer.types';
export declare abstract class BaseFieldDefinitionService {
    private injector;
    protected translateService: TranslateService;
    private readonly defaultFieldGroupName;
    abstract readonly dataType: string;
    constructor(injector: Injector);
    getNewFieldDefinitionModel(fieldProperties: Partial<IConfigFieldDefinitionModel>): IConfigFieldDefinitionModel;
    getFieldInspectorConfig(options: IFieldOptions): IFormBuilderConfig;
    validate(fieldModel: IConfigFieldDefinitionModel): IValidationIssue[];
}
