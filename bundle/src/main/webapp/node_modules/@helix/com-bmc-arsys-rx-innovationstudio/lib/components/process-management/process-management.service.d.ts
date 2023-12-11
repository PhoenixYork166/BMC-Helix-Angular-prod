import { RxNumberUtilsService } from '@helix/platform/utils';
import { IPlainObject } from '@helix/platform/shared/api';
import { IFieldDefinitionLight } from '@helix/platform/process/api';
import * as i0 from "@angular/core";
export declare class ProcessManagementService {
    private rxNumberUtilsService;
    constructor(rxNumberUtilsService: RxNumberUtilsService);
    buildInputParamsControls(inputParams: IFieldDefinitionLight[]): IPlainObject[];
    buildInputParamsModel(inputParams: IFieldDefinitionLight[]): IPlainObject;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessManagementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProcessManagementService>;
}
