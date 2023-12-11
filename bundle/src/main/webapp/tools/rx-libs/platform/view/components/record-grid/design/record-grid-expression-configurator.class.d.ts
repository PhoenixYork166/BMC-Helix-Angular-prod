import { Injector } from '@angular/core';
import { RxViewComponentExpressionConfigurator } from '@helix/platform/view/designer';
import { RecordGridDesignModel } from './record-grid-design.model';
export declare class RecordGridExpressionConfigurator extends RxViewComponentExpressionConfigurator {
    protected componentGuid: string;
    protected componentModel: RecordGridDesignModel;
    private rxDefinitionNameService;
    private rxRecordGridUtilsService;
    private rxRecordDefinitionCacheService;
    constructor(injector: Injector, componentGuid: string, componentModel: RecordGridDesignModel);
}
