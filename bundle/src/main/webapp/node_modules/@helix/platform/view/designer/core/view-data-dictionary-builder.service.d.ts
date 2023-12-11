import { IDataDictionary, IDataDictionaryBranch } from '@helix/platform/shared/api';
import { IViewComponentDesignCommonDataDictionaryBranch } from '../public-interfaces/view-component-design-common-data-dictionary.interfaces';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '../public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { IViewActionOutputDataDictionary } from '@helix/platform/view/api';
import * as i0 from "@angular/core";
export declare class RxViewDataDictionaryBuilderService {
    private componentIcon;
    private componentPropertyIcon;
    private settablePropertiesIcon;
    private actionOutputIcon;
    getActionOutputDataDictionaryBranch(actionName: string, dataDictionary: IViewActionOutputDataDictionary): IDataDictionaryBranch;
    getComponentCommonDataDictionaryBranch(branch: IViewComponentDesignCommonDataDictionaryBranch): IDataDictionaryBranch;
    getSettablePropertiesDataDictionary(branches: IViewComponentDesignSettablePropertiesDataDictionary): IDataDictionary;
    private buildDataDictionaryBranch;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewDataDictionaryBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewDataDictionaryBuilderService>;
}
