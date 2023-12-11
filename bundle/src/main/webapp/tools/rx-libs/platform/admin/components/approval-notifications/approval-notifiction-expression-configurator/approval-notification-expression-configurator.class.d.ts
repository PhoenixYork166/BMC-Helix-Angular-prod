import { IDataDictionary, IExpressionConfigurator, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
export declare class RxApprovalNotificationExpressionConfigurator extends RxExpressionConfigurator implements IExpressionConfigurator {
    private injector;
    private translateService;
    private rxRecordDefinitionCacheService;
    constructor(injector: Injector);
    commonDataDictionary$: Observable<IDataDictionary>;
    approvalNotificationExpressionDataDictionary(recordDefinitionName: string, isSingleQuoteTextExpression: boolean): Observable<IDataDictionary>;
}
