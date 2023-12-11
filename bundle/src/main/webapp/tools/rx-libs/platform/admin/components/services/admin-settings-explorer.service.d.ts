import { AdaptTreeNodeTyped } from '@bmc-ux/adapt-angular';
import { IAdminNavigationMenuItem, RxAdminSettingsService } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RxAdminSettingsExplorerService {
    private rxAdminSettingsService;
    constructor(rxAdminSettingsService: RxAdminSettingsService);
    getNavigationTreeConfig(): Observable<AdaptTreeNodeTyped<IAdminNavigationMenuItem>[]>;
    private buildTreeNodes;
    static ɵfac: i0.ɵɵFactoryDeclaration<RxAdminSettingsExplorerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RxAdminSettingsExplorerService>;
}
