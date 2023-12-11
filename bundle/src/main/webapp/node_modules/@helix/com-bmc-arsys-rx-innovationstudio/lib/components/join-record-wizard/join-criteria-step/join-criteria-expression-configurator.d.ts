import { Injector } from '@angular/core';
import { IRecordDefinition } from '@helix/platform/record/api';
import { RxExpressionConfigurator } from '@helix/platform/shared/api';
export declare class JoinCriteriaExpressionConfigurator extends RxExpressionConfigurator {
    commonDataDictionary$: any;
    constructor(primaryRecordDefinition: IRecordDefinition, secondaryRecordDefinition: IRecordDefinition, injector: Injector);
}
