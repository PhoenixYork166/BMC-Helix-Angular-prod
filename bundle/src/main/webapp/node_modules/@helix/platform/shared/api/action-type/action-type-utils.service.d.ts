import { IBundleDescriptor } from '../bundle';
import { RxDefinitionNameService } from '../definition/definition-name.service';
import { IActionType } from './action-type.interfaces';
import * as i0 from "@angular/core";
export declare class RxActionTypeUtilsService {
    private rxDefinitionNameService;
    constructor(rxDefinitionNameService: RxDefinitionNameService);
    getActionTypeBundleFriendlyName(bundleDescriptors: IBundleDescriptor[], actionType: IActionType): string;
    isActionParameterArrayOrList(actionParameter: any): boolean;
    prettifyActionTypeName(actionTypeName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxActionTypeUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxActionTypeUtilsService>;
}
