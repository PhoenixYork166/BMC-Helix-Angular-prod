import { ViewDesignerFacade } from '../+state/view-designer.facade';
import { Observable } from 'rxjs';
import { IDataDictionary, IDataDictionaryBranch, RxDataDictionaryUtils } from '@helix/platform/shared/api';
import { RxViewDataDictionaryBuilderService } from '../core/view-data-dictionary-builder.service';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { RxObjectUtilsService } from '@helix/platform/utils';
import * as i0 from "@angular/core";
export declare class RxViewDataDictionaryService {
    private viewDesignerFacade;
    private rxViewDataDictionaryBuilderService;
    private rxViewComponentRegistryService;
    private rxObjectUtilsService;
    private rxDataDictionaryUtils;
    private componentsCommonDataDictionaryStateClone$;
    private viewCommonDataDictionaryStateClone$;
    commonDataDictionary$: Observable<IDataDictionary>;
    settablePropertiesDataDictionary$: Observable<IDataDictionary>;
    constructor(viewDesignerFacade: ViewDesignerFacade, rxViewDataDictionaryBuilderService: RxViewDataDictionaryBuilderService, rxViewComponentRegistryService: RxViewComponentRegistryService, rxObjectUtilsService: RxObjectUtilsService, rxDataDictionaryUtils: RxDataDictionaryUtils);
    getActionDataDictionary(guid: string): Observable<IDataDictionary>;
    getComponentCommonDataDictionary(guid: string): Observable<IDataDictionaryBranch>;
    getCommonDataDictionary(componentBranchToReplace?: {
        [guid: string]: IDataDictionaryBranch;
    }): Observable<IDataDictionary>;
    private getSettablePropsDataDictionary;
    private getSettablePropsDataDictionaryBranch;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDataDictionaryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDataDictionaryService>;
}
