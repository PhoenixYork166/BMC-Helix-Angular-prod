import { IFunctionDescriptor } from '../function/function-descriptor.interfaces';
import { IActionType } from '../action-type/action-type.interfaces';
import * as i0 from "@angular/core";
export declare class RxDesignerCacheService {
    private actionTypes;
    private functionDescriptors;
    getActionTypeByNameSync(actionTypeName: string): IActionType;
    getFunctionDescriptorsSync(): IFunctionDescriptor[];
    setActionTypes(actionTypes: IActionType[]): void;
    setFunctionDescriptors(functionDescriptors: IFunctionDescriptor[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxDesignerCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxDesignerCacheService>;
}
