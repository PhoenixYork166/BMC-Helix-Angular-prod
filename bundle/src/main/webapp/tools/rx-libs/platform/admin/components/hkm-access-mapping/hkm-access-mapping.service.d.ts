import { HttpClient } from '@angular/common/http';
import { IDataPageResult } from '@helix/platform/shared/api';
import { IHkmFolder, IHkmMappingConfiguration, IHkmPortal, IItsmCompany } from './hkm-access-mapping.types';
import * as i0 from "@angular/core";
export declare class RxHkmAccessMappingService {
    private httpClient;
    constructor(httpClient: HttpClient);
    private readonly knowledgeApi;
    private readonly folderCache;
    callItsmMappingApi(): import("rxjs").Observable<IDataPageResult<IItsmCompany>>;
    callHkmMappingApi(): import("rxjs").Observable<IHkmPortal[]>;
    getFolderAccess(userGroupId: number, portalId: number, nodeId: number): import("rxjs").Observable<IHkmFolder[]>;
    deleteAccessMappings(hkmGroupMappingIds: string[]): import("rxjs").Observable<void>;
    saveAccessMappings(hkmGroupMappings: IHkmMappingConfiguration[]): import("rxjs").Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxHkmAccessMappingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxHkmAccessMappingService>;
}
