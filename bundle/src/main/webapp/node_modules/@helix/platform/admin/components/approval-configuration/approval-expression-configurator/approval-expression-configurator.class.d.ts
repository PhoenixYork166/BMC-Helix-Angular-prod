import { Injector } from '@angular/core';
import { IDataDictionary, IExpressionConfigurator, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
export declare class RxApprovalExpressionConfigurator extends RxExpressionConfigurator implements IExpressionConfigurator {
    private injector;
    private translateService;
    private rxDefinitionNameService;
    private rxRecordDefinitionCacheService;
    private rxAssociationNodeTreeDataPageService;
    private rxTreeService;
    private rxApprovalConfigurationService;
    private errorHandler;
    constructor(injector: Injector);
    commonDataDictionary$: Observable<IDataDictionary>;
    approvalExpressionDataDictionary(currentRecordDefinitionName: any): Observable<IDataDictionary>;
    private getRecordDefinitionDataDictionary;
    private getAssociationDataDictionary;
    getCtmPeopleFormFields(registeredRecordDefinitionName: string): Observable<IDataDictionary>;
}
