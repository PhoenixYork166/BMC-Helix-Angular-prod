import { IDataDictionaryBranch } from '@helix/platform/shared/api';
import { ISetSettablePropertiesDataDictionaryItem } from '../+state/view-component.types';
import { IViewDesignerActionOutputDataDictionaryState } from '../interfaces/view-designer-action-output-data-dictionary-state.interface';
import { IViewDesignerComponentsCommonDataDictionaryState } from '../interfaces/view-designer-components-data-dictionary-state.interface';
import { IViewDesignerViewCommonDataDictionaryState } from '../interfaces/view-designer-view-data-dictionary-state.interface';
import { IViewDesignerSettablePropertiesDataDictionaryState } from '../interfaces/view-designer-settable-properties-data-dictionary.state';
import * as i0 from "@angular/core";
export declare class RxViewDataDictionaryStoreService {
    private componentsCommon;
    private componentsCommonSubject;
    componentsCommon$: import("rxjs").Observable<IViewDesignerComponentsCommonDataDictionaryState>;
    private viewCommon;
    private viewCommonSubject;
    viewCommon$: import("rxjs").Observable<IViewDesignerViewCommonDataDictionaryState>;
    private actionsOutput;
    private actionsOutputSubject;
    actionsOutput$: import("rxjs").Observable<IViewDesignerActionOutputDataDictionaryState[]>;
    private settableProperties;
    private settablePropertiesSubject;
    settableProperties$: import("rxjs").Observable<IViewDesignerSettablePropertiesDataDictionaryState>;
    setCommonDataDictionaryBranch(guid: string, dataDictionaryBranch: IDataDictionaryBranch): void;
    setViewCommonDataDictionaryBranch(dataDictionaryBranch: IDataDictionaryBranch): void;
    setSettablePropertiesDataDictionary(items: ISetSettablePropertiesDataDictionaryItem[]): void;
    removeDataDictionaryForComponents(guids: string[]): void;
    setActionOutputDataDictionaryBranch(guid: string, index: number, dataDictionaryBranch: IDataDictionaryBranch): void;
    updateActionOutputDataDictionaryBranchOrder(actions: {
        [guid: string]: number;
    }): void;
    removeActionOutputDataDictionaryBranch(guid: string): void;
    removeAllActionOutputDataDictionaryBranches(): void;
    clear(): void;
    private setComponentCommon;
    private setViewCommon;
    private setActionsOutput;
    private setSettableProperties;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDataDictionaryStoreService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDataDictionaryStoreService>;
}
