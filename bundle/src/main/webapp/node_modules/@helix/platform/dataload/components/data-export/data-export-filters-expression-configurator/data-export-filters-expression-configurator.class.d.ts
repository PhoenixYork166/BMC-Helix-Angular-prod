import { IDataDictionary, IExpressionConfigurator, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
export declare class DataExportFiltersExpressionConfigurator extends RxExpressionConfigurator implements IExpressionConfigurator {
    private injector;
    private translateService;
    private rxDefinitionNameService;
    private rxRecordDefinitionCacheService;
    private rxAssociationDefinitionCacheService;
    constructor(injector: Injector);
    commonDataDictionary$: Observable<IDataDictionary>;
    geDataDefinitionField(definitionType: 'record' | 'association', recordOrAssociationDefinitionName: string): Observable<IDataDictionary>;
}
