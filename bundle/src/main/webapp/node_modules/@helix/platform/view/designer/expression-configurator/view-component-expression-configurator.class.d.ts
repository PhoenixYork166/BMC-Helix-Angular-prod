import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpressionEvaluator, IViewDesignerComponentModel } from '@helix/platform/view/api';
import { RxViewExpressionConfigurator } from './view-expression-configurator.class';
import { IViewComponentDesignCommonDataDictionary, IViewComponentDesignCommonDataDictionaryBranch } from '../public-interfaces';
export declare class RxViewComponentExpressionConfigurator extends RxViewExpressionConfigurator {
    protected injector: Injector;
    protected componentGuid: string;
    protected componentModel: IViewDesignerComponentModel;
    protected componentType?: string;
    private rxDefaultExpressionEvaluatorService;
    private rxViewDataDictionaryService;
    private rxViewComponentRegistryService;
    readonly commonDataDictionary$: Observable<import("@helix/platform/shared/api").IDataDictionary>;
    constructor(injector: Injector, componentGuid: string, componentModel: IViewDesignerComponentModel, componentType?: string);
    getExpressionEvaluator(propertyName: string): IExpressionEvaluator;
    getCommonDataDictionary(componentBranchToReplace$?: Observable<IViewComponentDesignCommonDataDictionaryBranch>, componentGuid?: string): Observable<IViewComponentDesignCommonDataDictionary>;
    getComponentCommonDataDictionary(guid?: string): Observable<IViewComponentDesignCommonDataDictionaryBranch>;
}
