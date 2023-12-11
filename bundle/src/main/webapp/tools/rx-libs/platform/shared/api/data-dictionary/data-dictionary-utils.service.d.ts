import { IFunctionDescriptor } from '../function/function-descriptor.interfaces';
import { IDataDictionary, IDataDictionaryBranch, IFunctionDataDictionaryDescriptor } from './data-dictionary.types';
import * as i0 from "@angular/core";
export declare class RxDataDictionaryUtils {
    addTooltips(dataDictionary: IDataDictionary, parentNodeLabel?: string): Array<IDataDictionaryBranch & {
        tooltip: string;
    }>;
    getFunctionsDataDictionaryBranch(functionDescriptors: IFunctionDataDictionaryDescriptor[]): IDataDictionaryBranch[];
    getFunctionDataDictionaryBranch(functionDescriptors: IFunctionDescriptor[]): IDataDictionaryBranch[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDataDictionaryUtils, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDataDictionaryUtils>;
}
