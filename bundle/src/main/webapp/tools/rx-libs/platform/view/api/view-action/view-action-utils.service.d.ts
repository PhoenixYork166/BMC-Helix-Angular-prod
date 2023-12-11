import { Router } from '@angular/router';
import { RxStringService, RxUrlUtilsService } from '@helix/platform/utils';
import { RecordsSource } from './view-action.types';
import { IPlainObject, RxBundleCacheService } from '@helix/platform/shared/api';
import { IViewInputParams } from '../domain/view-input-params.interface';
import * as i0 from "@angular/core";
export declare class RxViewActionUtilsService {
    private rxBundleCacheService;
    private router;
    private rxStringService;
    private rxUrlUtilsService;
    constructor(rxBundleCacheService: RxBundleCacheService, router: Router, rxStringService: RxStringService, rxUrlUtilsService: RxUrlUtilsService);
    generateViewUrl(viewDefinitionName: string, inputParams?: IViewInputParams): string;
    extractRecordIds(source: RecordsSource): string[];
    getIdsFromGridRows(rows: IPlainObject[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<RxViewActionUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxViewActionUtilsService>;
}
