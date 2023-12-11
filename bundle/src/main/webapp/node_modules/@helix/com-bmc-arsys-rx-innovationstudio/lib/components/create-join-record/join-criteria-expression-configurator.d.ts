import { Injector } from '@angular/core';
import { IRecordDefinition } from '@helix/platform/record/api';
import { IDataDictionary, IExpressionConfigurator, IExpressionConfiguratorDefaultPropertyConfig, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
export declare class JoinCriteriaExpressionConfigurator extends RxExpressionConfigurator implements IExpressionConfigurator {
    private primaryRecordDefinition$;
    private secondaryRecordDefinition$;
    private injector;
    private translateService;
    private rxDefinitionNameService;
    constructor(primaryRecordDefinition$: Observable<IRecordDefinition>, secondaryRecordDefinition$: Observable<IRecordDefinition>, injector: Injector);
    commonDataDictionary$: Observable<IDataDictionary>;
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
}
