import { Injector } from '@angular/core';
import { INamedListDefinition } from '@helix/platform/named-list/api';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { IDataDictionary, IExpressionConfiguratorDefaultPropertyConfig, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
export declare class RxNamedListExpressionConfigurator extends RxExpressionConfigurator {
    protected injector: Injector;
    rxRecordDefinitionCacheService: RxRecordDefinitionCacheService;
    translateService: TranslateService;
    commonDataDictionary$: Observable<IDataDictionary>;
    private readonly generalGroup;
    constructor(injector: Injector);
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
    namedListExpressionDataDictionary(namedListDefinition: INamedListDefinition): Observable<IDataDictionary>;
}
