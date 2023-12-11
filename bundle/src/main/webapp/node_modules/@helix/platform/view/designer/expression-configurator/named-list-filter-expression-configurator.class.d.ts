import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
import { IExpressionEvaluator } from '@helix/platform/view/api';
import { IDataDictionaryBranch, IExpressionConfiguratorDefaultPropertyConfig } from '@helix/platform/shared/api';
import { IFieldDefinition } from '@helix/platform/record/api';
export declare class NamedListFilterExpressionConfigurator extends RxViewExpressionConfigurator {
    private fieldDefinition;
    protected injector: Injector;
    private rxNamedListDefinitionCacheService;
    private rxRecordDefinitionCacheService;
    private rxViewDataDictionaryService;
    private rxDefaultExpressionEvaluatorService;
    constructor(fieldDefinition: IFieldDefinition, injector: Injector);
    commonDataDictionary$: Observable<IDataDictionaryBranch[]>;
    getExpressionEvaluator(): IExpressionEvaluator;
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
    private getNamedListBranch;
}
