import { Injector } from '@angular/core';
import { RxRecordDefinitionCacheService } from '@helix/platform/record/api';
import { IDataDictionary, IExpressionConfiguratorDefaultPropertyConfig, RxExpressionConfigurator } from '@helix/platform/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IRecordDefinitionModel } from '../record-designer.types';
export declare class RecordDesignerExpressionConfigurator extends RxExpressionConfigurator {
    private injector;
    rxRecordDefinitionCacheService: RxRecordDefinitionCacheService;
    translateService: TranslateService;
    commonDataDictionary$: Observable<IDataDictionary>;
    private readonly generalGroup;
    constructor(injector: Injector);
    getDefaultConfig(): IExpressionConfiguratorDefaultPropertyConfig;
    recordExpressionDataDictionary(definitionModel: IRecordDefinitionModel, bundleId: string): Observable<IDataDictionary>;
}
